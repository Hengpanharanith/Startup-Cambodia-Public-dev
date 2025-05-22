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
    <v-row >
      <v-col cols="12" md="7">
       
        <v-card
          v-if="!isLoading && !notFound"
          class="mb-8 flex-md-row custom-shadow"
          rounded="lg"
        >
          <div v-if="!!profileInfo.name && !notFound">
            <CardStartupBannerFlat
              @report="_showReportForm"
              @claim-startup="checkStartupStatus"
              :name="profileInfo.name"
              :email="profileInfo.email"
              :url-facebook="profileInfo.fb_social_url"
              :url-linkedin="profileInfo.linkedin_social_url"
              :url-web="profileInfo.social_media_url"
              :logo="profileInfo.logo"
              :is-logged-in="!!currentUser"
              :has-owner="hasOwner"
              :profileInfo="profileInfo"

            />
          </div>
          <template v-for="(item, key) in startupInfo">
            <div v-if="!item.children" :key="`title-${key}`">
              <v-card-title class="blog-one__title text-uppercase mb-0 py-0">
                {{ item.text }}
              </v-card-title>
            </div>
            <div v-else :key="`item-${key}`">
              <v-card-text>
                <v-list class="py-0">
                  <v-list-item
                    v-for="(subitem, sub_key) in item.children"
                    :key="`m-desc-${key}-${sub_key}`"
                  >
                    <v-list-item-content>
                      <v-list-item-subtitle>
                        {{ subitem.text }}
                      </v-list-item-subtitle>
                      <v-list-item-title class="text-wrap">
                        <div v-if="!subitem.listItems" class="py-0">
                          <v-chip
                            v-if="subitem.isChip"
                            class="mx-1 my-1 text-capitalize"
                            color="orange lighten-4"
                          >
                            {{ subitem.value || $t("n_a") }}
                          </v-chip>
                          <p class="mb-0" v-else>
                            {{ subitem.value || $t("n_a") }}
                          </p>
                        </div>
                        <div v-else class="py-0">
                          <v-chip
                            class="mx-1 my-1 text-capitalize"
                            color="orange lighten-4"
                            v-for="(listItem, key) in subitem.listItems"
                            :key="`listItem-${key}`"
                          >
                            {{ listItem }}
                          </v-chip>
                        </div>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </div>
          </template>
          <v-card-title class="blog-one__title text-uppercase mb-0 py-0">
            {{ $t("funding_stage") }}
          </v-card-title>

          <v-card-text class="pa-6">
            <v-row v-if="fundingStageList.length">
              <v-col
                v-for="(item, key) in fundingStageList"
                :key="`funding-${key}`"
                cols="12"
                sm="6"
              >
                <CardFundingStage
                  :isCurrent="key == 0"
                  :amount="item.amount_raise"
                  :timestamp="item.announced_date"
                  :title="
                    $t(`user.profile.startup.funding.${item.funding_type}`)
                  "
                />
              </v-col>
            </v-row>
            <p class="text-center mb-0" v-else>{{ $t("n_a") }}</p>
          </v-card-text>

          <v-card-title class="blog-one__title text-uppercase mb-0 py-0">
            {{ $t("member") }}
          </v-card-title>
          <template >
            <v-card-text class="pa-6" v-if="startupMembers.length">
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  lg="6"
                  v-for="item in startupMembers"
                  :key="`member-${item.user.id}`"
                >
                  <CardViewStartupMember
                    :to="`/ecosystem/discover/category/individuals/${item.user.id}`"
                    :name="getUsername(item.user)"
                    :thumbnail="item.user.photo_thumbnail"
                    :is-owner="item.is_owner"
                    :is-client-page="true"
                    :role = "item.role"
                    class="fill-height"
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-else>
              <v-img
                max-width="150"
                src="/images/no_data.png"
                alt="Not Found"
                class="d-block mx-auto"
              ></v-img>
              <p class="text-center mb-0">
                {{ $t("startup.member.message.no_member") }}
              </p>
            </v-card-text>
          </template>
          <!-- <v-card-text v-else class="px-6">
            <CardAuthorizationInfo />
          </v-card-text> -->
        </v-card>
      </v-col>
      <v-col cols="12" md="5">
        <v-card rounded="lg" flat>
          <v-card-title class="pb-0">
            {{ $t("contact_detail") }}
          </v-card-title>
          <v-list>
            <v-list-item>
              <v-list-item-icon class="mr-2">
                <v-icon> mdi-map-marker-outline </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-if="profileInfo.address">{{
                  profileInfo.address
                }}</v-list-item-title>
                <v-list-item-title v-else>{{ $t("n_a") }}</v-list-item-title>
                <!--                              <v-list-item-subtitle>Mobile</v-list-item-subtitle>-->
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon class="mr-2">
                <v-icon> mdi-at </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-if="profileInfo.email"
                  ><a
                    :href="`mailto://${profileInfo.email}`"
                    class="text-decoration-none black--text"
                    >{{ profileInfo.email }}</a
                  ></v-list-item-title
                >
                <v-list-item-title v-else>{{ $t("n_a") }}</v-list-item-title>
                <!--                              <v-list-item-subtitle>Mobile</v-list-item-subtitle>-->
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon class="mr-2">
                <v-icon> mdi-earth </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-if="profileInfo.website"
                  ><a
                    :href="`${profileInfo.website}`"
                    class="text-decoration-none"
                    >{{ profileInfo.website }}</a
                  ></v-list-item-title
                >
                <v-list-item-title v-else>{{ $t("n_a") }}</v-list-item-title>
                <!--                              <v-list-item-subtitle>Mobile</v-list-item-subtitle>-->
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <FormClaimStartupProfile
      ref="formClaimStartupProfile"
      @saved-update="onClaimed"
    />
    <FormReportProfile ref="formReport" />
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

    let img = this.profileInfo?.logo;
    let title = this.profileInfo?.name || "Startup Detail";
    const desc = (this.profileInfo?.description || "").slice(0, 128);
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
      profileInfo: {},
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
          text: this.$t(`breadcrumb.network.startup`),
          to: `/ecosystem/discover/category/startup`,
        },
        { text: this.profileInfo.name, disable: true },
      ];
    },
    startupId() {
      return this.$route.params.startupId;
    },
    startupProduct() {
      return this.profileInfo.product || {};
    },
    teamMembers() {
      return this.profileInfo.team_members || [];
    },
    startupAreas() {
      return this.profileInfo.startup_areas || [];
    },
    fundingStageList() {
      return this.profileInfo.funding_round_raises || [];
    },
    hasOwner() {
     
      return !!this.profileInfo?.owner
    
    },
    startupInfo() {
      const _pf = this.profileInfo;
      
      

      return [
        { text: this.$t("general_info") },
        {
          children: [
            {
              text: this.$t("date_incorporated"),
              value: _pf.date_incorporated
                ? this.$moment(_pf.date_incorporated).format("DD-MMMM-YYYY")
                : this.$t("n_a"),
            },
            {
              text: this.$t("employee_range"),
              value: _pf.employee_range
                ? `${_pf.employee_range} ${this.$t("people")}`
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
              text: this.$t("biz_model"),
              listItems:
                Array.isArray(_pf.business_model) && _pf.business_model.length
                  ? _pf.business_model.map((item) => item?.toUpperCase())
                  : undefined,
              value: this.$t("n_a"),
            },
            {
              text: this.$t("description"),
              value: _pf.description,
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
          ],
        },
      ];
    },
    connectionStatus() {
      return this.profileInfo?.connection_request_status;
    },
    startupMembers() {
      return this.profileInfo?.team || [];
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
      return this.getStakeHolderDetail({ id, category: "startup" })
        .then((data) => {
          this.profileInfo = Object.assign({}, data);
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
      this.$refs.formClaimStartupProfile.openForm(this.profileInfo);
    },

    onClaimed() {
      this.getDetail();
    },
    _showReportForm() {
      this.$refs.formReport.openForm(this.profileInfo.id, "startup");
    },
  },
};
</script>

<style lang="scss">
.badge.badge-custom {
  background-color: #fbc76759;
}
</style>
