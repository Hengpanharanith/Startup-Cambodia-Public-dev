<template>
  <div>
    <portal to="breadcrumb">
      <div class="py-1"></div>
      <BreadcrumbsAdvanced :breadcrumb-items="breadCrumbs"/>
      <v-progress-linear
          v-show="isLoading"
          color="primary"
          indeterminate
      ></v-progress-linear>
    </portal>
    <CardNoItem :visible="notFound"/>
    <v-row>
      <v-col cols="12" md="7">
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
                <v-icon> mdi-alert-circle-outline</v-icon>
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
          <template>
            <div class="py-0">
              <v-card-text class="py-0">
                <v-list class="py-0">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>
                        {{ $t("investment_stage") }}
                      </v-list-item-subtitle>
                      <v-list-item-title>
                        <v-chip
                            class="mx-1 my-1 text-capitalize"
                            color="orange lighten-4"
                            v-for="(item, key) in investmentStages"
                            :key="`item-${key}`"
                        >
                          {{ displayInvestmentStage(item) }}
                        </v-chip>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </div>
          </template>

          <template v-if="notableInvestees.length > 0">
            <div class="py-0">
              <v-card-text class="py-0 ">
                <v-list class="py-0">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>
                        {{ $t("notable_investee") }}
                      </v-list-item-subtitle>
                      <v-list-item-title>
                        <v-row class="py-3 px-3">
                          <v-col
                              md="3"
                              v-for="item in notableInvestees"
                              :key="'team' + item.id"
                              class=""
                          >
                            <v-card class="text-center px-0 py-0 handle-card-hover" outlined elevation="0"
                                      :to="`/ecosystem/discover/category/startup/${item.id}`">
                                <v-img
                                    class="img-fluid my-2 mx-auto"
                                    :src="item.logo"
                                    width="84"
                                    height="84"
                                />
                                <v-divider/>
                                <h6 class="card-title py-2">
                                  {{ item.name }}
                                </h6>
                              </v-card>
                          </v-col>
                        </v-row>
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
              }}
            </v-card-title>
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
                      class="border img-fluid ml-2 mb-2"
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
      <v-col cols="12" md="5">
        <v-card rounded="lg" flat>
          <v-card-title class="pb-0">
            {{ $t("industry") }}
          </v-card-title>

          <v-card-text v-if="industries.length">
            <v-chip
                class="ma-2 px-2"
                color="#FEEBCA"
                small
                v-for="item in industries"
                :key="item.id"
            >
              {{ item.name }}
            </v-chip>
          </v-card-text>
          <v-card-text v-else>
            {{ $t("n_a1") }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--    <AuthenticationForm :value="true"/>-->

    <FormReportProfile ref="formReport"/>
  </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from "vuex";
import CardNoItem from "@/components/CardView/CardNoItem.vue";
import BreadcrumbsBar from "@/components/bars/BreadcrumbsBar.vue";
import VideoEmbed from "@/components/Custom/embed";
import CardStartupOutlined from "@/components/CardView/CardStartupOutlined";

import {getInvestorTypeById} from "@/api/investor_type";
import {getInvestmentStageById} from "@/api/investment_stage";

export default {
  head() {
    let url = "https://startupcambodia.gov.kh/";
    if (process.browser) url = window.location.href;

    let img = this.profileInfo?.logo;
    let title = this.profileInfo?.name || "Startup Detail";
    const desc = (this.profileInfo?.description || "").slice(0, 128);
    return {
      meta: [
        {hid: "og:url", content: url},
        {hid: "og:title", property: "og:title", content: title},
        {hid: "og:type", property: "og:type", content: "article"},
        {hid: "image", name: "image", content: img},
        {hid: "og:image", property: "og:image", content: img},
        {hid: "description", name: "description", content: desc},
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
    CardStartupOutlined
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
      profileInfo: {},
      industries: [],
      investmentStages: [],
    };
  },
  computed: {
    ...mapState("user", ["currentUser"]),
    ...mapState("stakeholder", ["isLoading"]),
    ...mapGetters("auth", ["isAuthenticated"]),
    ...mapState("app", ["visibleAuthDialog"]),
    breadCrumbs() {
      const crumbs = [
        {homePage: true, text: this.$t("breadcrumb.home"), to: "/"},
        {text: this.$t("breadcrumb.ecosystem"), to: "/ecosystem"},
        {
          text: this.$t(`breadcrumb.network.investor`),
          to: `/ecosystem/discover/category/investor`,
        },
        {text: this.profileInfo.name, disable: true},
      ];
      return crumbs;
    },
    notableInvestees() {
      return this.profileInfo?.notable_investees || [];
    },
    category() {
      return this.$route.params.networkCategory || "";
    },
    categoryName() {
      return this.category.split("-").join(" ");
    },
    investorId() {
      return this.$route.params.investorId;
    },
    hasOwner() {
      return !!this.profileInfo?.owner;
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
      const socialUrl = this.profileInfo.social_media_url || "";
      if (socialUrl.includes("facebook")) {
        icon = "facebook";
      } else if (socialUrl.includes("linkedin")) {
        icon = "linkedin";
      } else {
        icon = "link";
      }
      return icon;
    },

    investorInfo() {
      const _pf = this.profileInfo;
      return [
        {text: this.$t("general_info")},
        {
          children: [
            {
              text: this.$t("establishment_year"),
              value: _pf.year_of_establishment
                  ? this.$localeNumb(_pf.year_of_establishment)
                  : this.$t("n_a"),
            },
            {
              text: this.$t("date_incorporated"),
              value: _pf.date_incorporated
                  ? this.$moment(_pf.date_incorporated).format("DD-MMMM-YYYY")
                  : this.$t("n_a"),
            },
            {text: this.$t("address"), value: _pf.address},
            {text: this.$t("description"), value: _pf.description},
          ],
        },
        {text: this.$t("investment_info")},
        {
          children: [
            {
              text: this.$t("investor_type"),
              value: getInvestorTypeById(_pf.investor_type),
              // isChip: true,
              // isObject: true
            },
            // {
            //   text: this.$t("investment_stage"),
            //   value: Array.isArray(_pf.investment_stage)
            //     ? _pf.investment_stage.map((item) =>
            //         getInvestmentStageById(item)
            //       )
            //     : this.$t("n_a"),
            //   isChip: true,
            // },
            // {
            //   text: this.$t("industry"),
            //   value: Array.isArray(_pf.industry)
            //     ? _pf.industry
            //     : this.$t("n_a"),
            //   isChip: true,
            // },
          ],
        },
      ];
    },

    connectionStatus() {
      return this.profileInfo?.connection_request_status;
    },
  },
  watch: {
    investorId: {
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
    ...mapActions("connection", {requestConnection: "create"}),
    getDetail() {
      const {category, investorId: id} = this;
      return this.getStakeHolderDetail({id, category: "investor"})
          .then((data) => {
            this.profileInfo = Object.assign({}, data);

            this.industries = Object.assign([], data.industry);
            this.investmentStages = Object.assign([], data.investment_stage);
          })
          .catch((e) => {
            this.notFound = true;
          });
    },
    getUsername(item = {}) {
      const {first_name, first_name_kh, last_name, last_name_kh} = item;
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
      const payload = {user: this.profileInfo.owner?.id};

      this.requestConnection({payload})
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
    _showReportForm() {
      this.$refs.formReport.openForm(this.profileInfo.id, "investor");
    },

    displayInvestmentStage(id) {
      return getInvestmentStageById(id);
    },
  },
};
</script>

<style lang="scss">
.badge.badge-custom {
  background-color: #fbc76759;
}

.handle-card-hover{
  transition: 200ms;
  &:hover {
    box-shadow: rgba(17, 12, 46, 0.15) 0px 6px 10px 0px !important;
    transition: 200ms;
  }
}
</style>
