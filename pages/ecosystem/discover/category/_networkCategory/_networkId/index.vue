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
    <v-row>
      <v-col cols="12">
        <v-card
          v-if="!!profileInfo.name && !notFound"
          class="mb-8 flex-md-row"
          rounded="lg"
          flat
        >
          <v-card-text class="pa-md-10">
            <v-layout class="flex-md-row align-stretch" align-center column>
              <v-layout class="flex-md-row align-center" column>
                <v-avatar v-if="profileInfo.rounded" size="120">
                  <v-img
                    :src="profileInfo.logo || '/images/default-user.png'"
                  />
                </v-avatar>
                <div v-else>
                  <v-img
                    :src="profileInfo.logo || '/images/default-image.png'"
                    width="150px"
                    contain
                  />
                </div>
                <v-col class="mx-md-4 pa-0">
                  <v-card-title
                    class="text-break text-capitalize justify-center justify-md-start"
                    >{{ profileInfo.name }}
                  </v-card-title>
                  <v-card-text class="text-center text-md-start">
                    <v-btn
                      v-if="profileInfo.fb_social_url"
                      :href="profileInfo.fb_social_url"
                      target="_blank"
                      icon
                    >
                      <v-icon color="#3b5998">mdi-facebook</v-icon>
                    </v-btn>

                    <v-btn
                      v-if="profileInfo.linkedin_social_url"
                      :href="profileInfo.linkedin_social_url"
                      target="_blank"
                      icon
                    >
                      <v-icon color="#0e76a8">mdi-linkedin</v-icon>
                    </v-btn>

                    <b-btn
                      v-if="profileInfo.social_media_url"
                      :href="profileInfo.social_media_url"
                      target="_blank"
                      icon
                    >
                      <v-icon color="#0e76a8">mdi-web</v-icon>
                    </b-btn>
                  </v-card-text>
                </v-col>
              </v-layout>
              <v-card
                class="float-md-right d-none"
                min-width="270"
                rounded="lg"
                outlined
              >
                <v-card-title>{{ $t("contact_info") }}</v-card-title>
                <v-divider class="my-0"></v-divider>
                <v-list>
                  <v-list-item-group>
                    <v-list-item>
                      <v-list-item-icon class="mr-4">
                        <v-icon>mdi-email</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>
                          <a
                            class="text-decoration-none"
                            href="mailto:info@techostartup.center"
                          >
                            {{ profileInfo.email }}
                          </a>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-layout>
          </v-card-text>

          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click.prevent.stop="_showReportForm"
                v-bind="attrs"
                v-on="on"
                absolute
                right
                top
                icon
                outlined
                small
                class="primary white--text"
              >
                <v-icon> mdi-alert-circle-outline </v-icon>
              </v-btn>
            </template>
            <span>{{ $t("report.form.label.suggestEdit") }}</span>
          </v-tooltip>
        </v-card>

        <v-card v-if="!isLoading && !notFound" rounded="lg" flat>
          <template v-for="(item, key) in investorInfo">
            <div v-if="!item.children" :key="`title-${key}`">
              <v-card-title class="blog-one__title text-uppercase mb-0 py-2">
                {{ item.text }}
              </v-card-title>
            </div>
            <div v-else :key="`item-${key}`">
              <v-card-text>
                <v-list class="py-0" three-line>
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

          <template v-if="profileInfo.video_link">
            <v-card-title class="px-md-10 pt-md-5">{{
              $t("video")
            }}</v-card-title>
            <v-card-text class="px-md-10">
              <v-card max-width="500px" rounded="lg">
                <v-responsive :aspect-ratio="16 / 9">
                  <video-embed :src="profileInfo.video_link"></video-embed>
                  <!-- <div
                    class="d-flex fill-height justify-content-center align-items-center"
                    v-else
                  >{{$t("no_vdo")}}</div> -->
                </v-responsive>
              </v-card>
            </v-card-text>
          </template>
          <v-card-text>
            <div
              class="blog-one__title text-uppercase border-bottom my-4 d-none"
              v-if="profileInfo.team && profileInfo.team.length"
            >
              <span>{{ $t("member") }}</span>
            </div>
            <v-row class="d-none">
              <v-col
                md="3"
                v-for="item in profileInfo.team"
                :key="'team' + item.id"
              >
                <v-card class="text-center">
                  <img
                    class="rounded-circle border img-fluid ml-2 mb-2"
                    src="/images/default-user.png"
                    width="50"
                    height="50"
                  />
                  <h6 class="card-title">
                    {{ item.first_name_en }} {{ item.last_name_en }}
                  </h6>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- <v-col cols="12" md="5">
        <v-card rounded="lg" flat >
          
        </v-card>
      </v-col> -->
    </v-row>
    <v-card-text> </v-card-text>

    <!--    <AuthenticationForm :value="true"/>-->
    <FormReportProfile ref="formReport" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import CardNoItem from "@/components/CardView/CardNoItem.vue";
import BreadcrumbsBar from "@/components/bars/BreadcrumbsBar.vue";
import VideoEmbed from "@/components/Custom/embed";

export default {
  head() {
    let url = "https://startupcambodia.gov.kh/";
    if (process.browser) url = window.location.href;

    let img = this.networkProfile?.logo;
    let title = this.networkProfile?.name || "Stakeholder Detail";
    const desc = (this.networkProfile?.description || "").slice(0, 128);
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
  name: "NetworkDetail",
  layout: "common",
  components: {
    CardNoItem,
    BreadcrumbsBar,
    VideoEmbed,
  },
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      signUp: {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        confirmPassword: "",
      },
      notFound: false,
      makingConnection: false,
      networkProfile: {},
    };
  },
  computed: {
    ...mapState("user", ["currentUser"]),
    ...mapState("stakeholder", ["isLoading"]),
    ...mapGetters("auth", ["isAuthenticated"]),
    ...mapState("app", ["visibleAuthDialog"]),
    breadCrumbs() {
      const crumbs = [
        { homePage: true, text: this.$t("breadcrumb.home"), to: "/" },
        { text: this.$t("breadcrumb.ecosystem"), to: "/ecosystem" },
        {
          text: this.$t(`breadcrumb.network.${this.category}`),
          to: `/ecosystem/discover/category/${this.category}`,
        },
        { text: this.profileInfo.name, disable: true },
      ];
      return crumbs;
    },
    category() {
      return this.$route.params.networkCategory || "";
    },
    categoryName() {
      return this.category.split("-").join(" ");
    },
    stakeholderType() {
      return this.category.replaceAll("-", "_");
    },
    profileInfo() {
      const { profile, email, logo } = this.networkProfile;
      const { linkedin_social_url, website, fb_social_url } =
        this.networkProfile;
      const { name, first_name, last_name } = this.networkProfile;
      const roundedTypes = ["mentor", "investor"];
      const rounded = roundedTypes.includes(this.category);
      const info = {
        rounded,
        name,
        logo,
        linkedin_social_url,
        website,
        fb_social_url,
        email: email || this.$t("n_a"),
      };

      if (this.category == "mentor") {
        info.name = `${first_name || ""} ${last_name || ""}`;
        info.name = info.name.trim();
        info.logo = profile;
      }
      return info;
    },
    networkId() {
      return this.$route.params.networkId;
    },
    startupProduct() {
      return this.networkProfile.product || {};
    },
    teamMembers() {
      return this.networkProfile.team_members || [];
    },
    startupAreas() {
      return this.networkProfile.startup_areas || [];
    },
    fundingStage() {
      return this.networkProfile.funding_stage || {};
    },
    hasOwner() {
      return !!this.networkProfile?.owner;
    },
    isMentor() {
      return this.category == "mentor";
    },
    isMyMentorProfile() {
      return this.networkProfile?.owner?.id == this.currentUser?.id;
    },
    isStartup() {
      return this.category == "startup";
    },
    isInvestor() {
      return this.category == "investor";
    },

    isStakeholder() {
      return !this.isMentor && !this.isStartup && !this.isInvestor;
    },
    socialMediaIcon() {
      var icon = "";
      const socialUrl = this.networkProfile.social_media_url || "";
      if (socialUrl.includes("facebook")) {
        icon = "facebook";
      } else if (socialUrl.includes("linkedin")) {
        icon = "linkedin";
      } else {
        icon = "link";
      }
      return icon;
    },
    startupInfo() {
      const networkProfile = this.networkProfile;
      return [
        { text: this.$t("general_info") },
        {
          children: [
            {
              text: this.$t("date_incorporated"),
              value: networkProfile.date_incorporated
                ? this.$moment(networkProfile.date_incorporated).format(
                    "DD-MMMM-YYYY"
                  )
                : this.$t("n_a"),
            },
            {
              text: this.$t("employee_range"),
              value:
                networkProfile.employee_range + " " + this.$t("individuals"),
            },
            {
              text: this.$t("female_founders"),
              value:
                networkProfile.number_of_female + " " + this.$t("individuals"),
            },
            {
              text: this.$t("tech_founders"),
              value:
                networkProfile.number_of_tech_founder +
                " " +
                this.$t("individuals"),
            },
            {
              text: this.$t("looking_at"),
              value: Array.isArray(networkProfile.looking_at)
                ? networkProfile.looking_at.join(", ").replaceAll("_", " ")
                : this.$t("n_a"),
              isChip: true,
            },
            {
              text: this.$t("biz_model"),
              value: Array.isArray(networkProfile.business_model)
                ? networkProfile.business_model
                    .join(", ")
                    .replaceAll("_", " ")
                    .toUpperCase()
                : this.$t("n_a"),
              isChip: true,
            },
            { text: this.$t("description"), value: networkProfile.description },
            {
              text: this.$t("industry"),
              value: Array.isArray(networkProfile.industry)
                ? networkProfile.industry
                    .map((item) => item.name)
                    .join(", ")
                    .replaceAll("_", " ")
                : this.$t("n_a"),
              isChip: true,
            },
          ],
        },
        { text: this.$t("funding_overview") },
        {
          children: [
            {
              text: this.$t("funding_stage"),
              value: networkProfile.funding_stage,
            },
          ],
        },
      ];
    },
    mentorInfo() {
      const networkProfile = this.networkProfile;
      return [
        { text: this.$t("general_info") },
        {
          children: [
            {
              text: this.$t("bio"),
              value: networkProfile.bio,
            },
            { text: this.$t("company"), value: networkProfile.company },
            { text: this.$t("industry"), value: networkProfile.industry?.name },
            { text: this.$t("role"), value: networkProfile.role },
          ],
        },
        { text: this.$t("entrepreneurship") },
        {
          children: [
            {
              text: this.$t("investor"),
              value: networkProfile.investor ? this.$t("yes") : this.$t("no"),
            },
            {
              text: this.$t("previous_entrepreneur"),
              value: networkProfile.previous_entrepreneur
                ? this.$t("yes")
                : this.$t("no"),
            },
            {
              text: this.$t("previous_startup"),
              value: networkProfile.previous_startup
                ? this.$t("yes")
                : this.$t("no"),
            },
            { text: this.$t("interest"), value: networkProfile.interest },
          ],
        },
        { text: this.$t("expertise") },
        {
          children: [
            {
              text: this.$t("expertise"),
              value: Array.isArray(networkProfile.expertise)
                ? networkProfile.expertise
                    .map((item) => item.name)
                    .join(", ")
                    .replaceAll("_", " ")
                : this.$t("n_a"),
              isChip: true,
              hideTitle: true,
            },
          ],
        },
      ];
    },
    investorInfo() {
      const networkProfile = this.networkProfile;
      return [
        { text: this.$t("general_info") },
        {
          children: [
            {
              text: this.$t("establishment_year"),
              value: networkProfile.year_of_establishment
                ? this.$localeNumb(networkProfile.year_of_establishment)
                : this.$t("n_a"),
            },
            {
              text: this.$t("date_incorporated"),
              value: networkProfile.date_incorporated
                ? this.$moment(networkProfile.date_incorporated).format(
                    "DD-MMMM-YYYY"
                  )
                : this.$t("n_a"),
            },
            {
              text: this.$t("employee_range"),
              value: networkProfile.employee_range,
            },
            { text: this.$t("description"), value: networkProfile.description },

            { text: this.$t("address"), value: networkProfile.address },
          ],
        },
        // { text: this.$t("investment_info") },
        // {
        //   children: [
        //     {
        //       text: this.$t("investor_type"),
        //       value: networkProfile.investor_type,
        //       isChip: false,
        //       isObject: true,
        //     },
        //     {
        //       text: this.$t("investment_stage"),
        //       value: Array.isArray(networkProfile.investment_stage)
        //         ? networkProfile.investment_stage
        //         : this.$t("n_a"),
        //       isChip: true,
        //     },
        //     { text: this.$t("industry"), value: networkProfile.industry?.name },
        //   ],
        // },
      ];
    },
    stakeholderProfile() {
      const networkProfile = this.networkProfile;
      return [
        { text: this.$t("about") },
        {
          children: [
            { text: this.$t("description"), value: networkProfile.description },
            { text: this.$t("address"), value: networkProfile.address },
            {
              text: this.$t("establishment_year"),
              value: networkProfile.year_of_establishment
                ? this.$localeNumb(networkProfile.year_of_establishment)
                : this.$t("n_a"),
            },
            {
              text: this.$t("date_incorporated"),
              value: networkProfile.date_incorporated
                ? this.$moment(networkProfile.date_incorporated).format(
                    "DD-MMMM-YYYY"
                  )
                : this.$t("n_a"),
            },
            {
              text: this.$t("employee_range"),
              value: networkProfile.employee_range,
            },
            { text: this.$t("description"), value: networkProfile.description },
          ],
        },
        // { text: this.$t("investment_info") },
        // {
        //   children: [
        //     {
        //       text: this.$t("investor_type"),
        //       value: networkProfile.investor_type,
        //     },
        //     {
        //       text: this.$t("investment_stage"),
        //       value: networkProfile.investment_stage,
        //     },
        //     { text: this.$t("industry"), value: networkProfile.industry?.name },
        //   ],
        // },
      ];
    },
    profileDetails() {
      if (this.isStartup) return this.startupInfo;
      if (this.isMentor) return this.mentorInfo;
      if (this.isInvestor) return this.investorInfo;

      return this.stakeholderProfile;
    },

    connectionStatus() {
      return this.networkProfile?.connection_request_status;
    },
    startupMembers() {
      return this.networkProfile?.team || [];
    },
  },
  watch: {
    networkId: {
      handler(v) {
        if (!!v) {
          this.getDetail();
          return;
        }
        this.$router.replace(`/ecosystem/discover/category/${this.category}`);
      },
    },
  },
  async fetch() {
    await this.getDetail();
  },
  methods: {
    ...mapActions("stakeholder", ["getStakeHolderDetail"]),
    ...mapActions("app", ["setAuthDialogVisibility"]),
    ...mapActions("connection", { requestConnection: "create" }),
    _showReportForm() {
      this.$refs.formReport.openForm(this.networkId, this.stakeholderType);
    },
    getDetail() {
      const { category, networkId: id } = this;
      return this.getStakeHolderDetail({ id, category })
        .then((data) => {
          this.networkProfile = Object.assign({}, data);
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
    makeConnection() {
      const isLogin = !!this.$cookiz.get("access_token");
      this.makingConnection = true;
      if (!isLogin) {
        this.setAuthDialogVisibility(true);
        this.makingConnection = false;
        return;
      }
      const payload = { user: this.networkProfile.owner?.id };

      this.requestConnection({ payload })
        .then((res) => {
          this.makingConnection = false;
          this.getDetail();

          this.$swal.fire(
            `${this.$t("get_listed.dialog.title.success")}!`,
            "",
            "success"
          );
        })
        .catch((error) => {
          this.makingConnection = false;
          const message = error.response.data.message || error;
          this.$swal.fire(
            `${this.$t("get_listed.dialog.title.fail")}!`,
            message,
            "error"
          );
        });
    },
    closeDialog(v) {
      this.setAuthDialogVisibility(false);
    },
  },
};
</script>

<style lang="scss">
.badge.badge-custom {
  background-color: #fbc76759;
}
</style>
