<template>
  <div>
    <portal to="breadcrumb">
      <div class="py-1"></div>
      <BreadcrumbsAdvanced :breadcrumb-items="breadCrumbs" />
      <v-progress-linear
        v-show="isLoading"
        color="primary"
        indeterminate
      ></v-progress-linear>
    </portal>
    <CardNoItem :visible="notFound" />

    <template v-if="!isLoading && !notFound">
      <CardEsoProfile
        :id="profile.id"
        :thumbnail="profile.logo"
        :name="profile.name"
        :status="profile.status"
        :description="profile.description"
        :email="profile.email"
        :phone="phoneNumber"
        :address="profile.address"
        :website="profile.website"
        :industries="profile?.industry || []"
        :lookingAt="profile?.looking_at || []"
        :incorporatedDate="profile.date_incorporated"
        :establishYear="profile.year_of_establishment"
        showReport
        class="mb-4"
      />
      <CardEsoSectionMembers
        @updated="fetchStartupProfile()"
        :members="profile?.teams || []"
      />
      <v-card class="mb-8 flex-md-row" rounded="lg" outlined>
        <v-card-title class="text-uppercase"> Programs </v-card-title>
        <v-divider />
        <v-card-text>
          <v-row>
            <template v-for="(item, key) in programInfo">
              <v-col cols="12">
                <CardViewPublicESOProgram :expanded="key == 0" :item="item" />
              </v-col>
            </template>
          </v-row>
        </v-card-text>
      </v-card>
    </template>
    <FormClaimStartupProfile
      ref="formClaimStartupProfile"
      @saved-update="onClaimed"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "PageStartupDetail",
  layout: "common",
  head() {
    let url = "https://startupcambodia.gov.kh/";
    if (process.browser) url = window.location.href;

    let img = this.profile?.logo;
    let title = this.profile?.name || "Startup Detail";
    const desc = (this.profile?.description || "").slice(0, 128);
    return {
      meta: [
        { hid: "og:url", content: url },
        { hid: "og:title", property: "og:title", content: title },
        { hid: "og:type", property: "og:type", content: "article" },
        { hid: "image", name: "image", content: img },
        { hid: "og:image", property: "og:image", content: img },
        { hid: "description", name: "description", content: desc },
        {
          hid: "og:description",
          property: "og:description",
          content: desc,
        },
        {
          hid: "twitter:image",
          property: "twitter:image",
          content: img,
        },
        {
          hid: "twitter:title",
          property: "twitter:title",
          content: title,
        },
        {
          hid: "twitter:description",
          property: "twitter:description",
          content: desc,
        },
        {
          hid: "twitter:card",
          property: "twitter:card",
          content: "summary_large_image",
        },
      ],
    };
  },
  data() {
    return {
      notFound: false,
      makingConnection: false,
      profile: {},
    };
  },
  computed: {
    ...mapState("user", ["currentUser"]),
    ...mapState("stakeholder", ["isLoading"]),
    breadCrumbs() {
      return [
        { homePage: true, text: this.$t("breadcrumb.home"), to: "/" },
        { text: this.$t("breadcrumb.ecosystem"), to: "/ecosystem" },
        {
          text: "ESO",
          to: `/ecosystem/discover/category/eso`,
        },
        { text: this.profile.name, disable: true },
      ];
    },
    startupId() {
      return this.$route.params.esoId;
    },
    startupProduct() {
      return this.profile.product || {};
    },
    teamMembers() {
      return this.profile.team_members || [];
    },
    startupAreas() {
      return this.profile.startup_areas || [];
    },
    fundingStageList() {
      return this.profile.funding_round_raises || [];
    },
    hasOwner() {
      return !!this.profile?.owner;
    },
    esoInfo() {
      const _pf = this.profile;

      console.log("esoInfo=====", _pf);

      return [
        { text: this.$t("general_info") },
        {
          children: [
            {
              text: this.$t("address"),
              value: _pf.address ? `${_pf.address}` : this.$t("n_a"),
            },
            {
              text: this.$t("email"),
              value: _pf.email ? `${_pf.email}` : this.$t("n_a"),
            },
            {
              text: this.$t("date_incorporated"),
              value: _pf.date_incorporated
                ? this.$moment(_pf.date_incorporated).format("DD-MMMM-YYYY")
                : this.$t("n_a"),
            },
            {
              text: "Cohort size",
              value: _pf.cohort_size
                ? `${_pf.cohort_size} ${this.$t("people")}`
                : this.$t("n_a"),
            },
            {
              text: this.$t("looking_at"),
              listItems:
                Array.isArray(_pf.looking_at) && _pf.looking_at.length
                  ? _pf.looking_at.map((item) => item.value)
                  : undefined,
              value: this.$t("n_a"),
            },
            {
              text: this.$t("industry"),
              listItems:
                Array.isArray(_pf.industry) && _pf.industry.length
                  ? _pf.industry.map((item) => {
                      return item.name;
                    })
                  : undefined,
              isList: true,
            },

            // {
            //   text: this.$t("description"),
            //   value: _pf.description,
            // },
          ],
        },
      ];
    },

    programInfo() {
      const _program = this.profile.programs || [];
      // return [
      //   {text: "Programs"},
      //   {children:[
      //       {
      //         text: "PROGRAMS",
      //         value: _program || this.$t("n_a")
      //       }
      //     ]}
      // ]

      return this.profile.programs || [];
    },
    connectionStatus() {
      return this.profile?.connection_request_status;
    },
    esoTeams() {
      return this.profile?.teams || [];
    },
    phoneNumber() {
      const { phone, country_code } = this.profile || {};
      if (!phone) return "";
      return `${country_code || "0"}${phone}`;
    },
  },
  watch: {
    startupId: {
      handler(v) {
        if (!!v) {
          this.getDetail();
          return;
        }
        this.$router.replace(`/ecosystem/discover/category/startup`);
      },
    },
  },
  async fetch() {
    await this.getDetail();
  },
  methods: {
    ...mapActions("startup", {
      matchProfile: "matchingProfile",
    }),
    ...mapActions("stakeholder", ["getStakeHolderDetail"]),
    ...mapActions("app", ["setAuthDialogVisibility"]),
    ...mapActions("connection", { requestConnection: "create" }),
    getDetail() {
      const { startupId: id } = this;
      return this.getStakeHolderDetail({ id, category: "eso" })
        .then((data) => {
          this.profile = Object.assign({}, data);
        })
        .catch((e) => {
          this.notFound = true;
        });
    },
    getUsername(item = {}) {
      const { first_name, first_name_kh, last_name, last_name_kh } = item;
      if (!this.$isKm()) return [first_name, last_name].join(" ");
      return [first_name_kh || first_name, last_name_kh || last_name].join(" ");
    },
    checkStartupStatus() {
      this.$refs.formClaimStartupProfile.openForm(this.profile);
    },

    onClaimed() {
      this.getDetail();
    },
  },
};
</script>

<style lang="scss">
.badge.badge-custom {
  background-color: #fbc76759;
}
</style>
