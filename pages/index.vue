<template>
  <div
    style="
      background-image: url('https://startupcambodia.gov.kh/images/about/pattern.svg');
      background-position: center center;
      background-repeat: repeat;
    "
  >
    <MainPageHeader :banners="landingBanners" />
    <!--    <LandingWhatWeDo/>-->

    <LandingEcosystem
      :items="ecosystemData"
      :showCaption="false"
      :showButton="true"
      :animationEnabled="false"
    />

    <EcosystemStartup />
    <CardProgramSharingLanding />
    <EcosystemMentor />
    <!-- <EcosystemProgramEvent /> -->
    <EcosystemInvestor :items="[...featuredInvestors, ...featuredInvestors]" />
    <EcosystemStakeholder />

    <!--    <template v-if="highlightItems.length>0">-->
    <!--      <Highlight  :highlights="highlightItems" />-->
    <!--    </template>-->

    <!--    <LandingEcosystem :items="landingEcosystem"/>-->

    <!--    <client-only>-->
    <!--      <h1 class="text-center my-4">-->
    <!--       {{$t('ourPartner')}}-->
    <!--      </h1>-->
    <!--      <OurPartner-->
    <!--          :title="$t('ourPartner')"-->
    <!--          :partner-list="partnerList"-->
    <!--          class="section-padding"-->
    <!--      />-->
    <!--    </client-only>-->

    <LandingProgram :programs="recentPrograms" />
    <template v-if="recentEvents.length > 0">
      <LandingEvent :eventList="recentEvents" />
    </template>
    <template v-if="recentPosts.length > 0">
      <LandingPost :posts="recentPosts" />
    </template>

    <h1 class="text-center my-4">{{ $t("visitor") }}</h1>
    <VisitorView
      :title="$t('visitor')"
      :animationEnabled="true"
      :visitor-list="visitorData"
    />
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import MainPageHeader from "@/components/Banner/MainPageHeader";
import LandingProgram from "@/components/Common/LandingProgram";
import LandingEvent from "@/components/Common/LandingEvent";
import LandingWhatWeDo from "@/components/Common/LandingWhatWeDo";
import LandingPost from "@/components/Common/LandingPost";
import OurPartner from "@/components/Common/OurPartner";
import LandingEcosystem from "@/components/Common/LandingEcosystem";
import VisitorView from "@/components/Common/VisitorView";

export default {
  layout: "common",
  components: {
    MainPageHeader,
    OurPartner,
    LandingProgram,
    LandingEvent,
    LandingWhatWeDo,
    LandingPost,
    LandingEcosystem,
    VisitorView,
  },
  head() {
    title: "Home";
  },
  data() {
    return {
      isLoading: false,
      landingData: {},
      visitorData: {},
      slider: [
        "red",
        "green",
        "orange",
        "blue",
        "pink",
        "purple",
        "indigo",
        "cyan",
        "deep-purple",
        "light-green",
        "deep-orange",
        "blue-grey",
      ],
      dialogPreview: false,
      preview: null,
      highlightItems: [],
      options: {
        autoplay: true,
        loop: true,
        perPage: 4,
        paginationEnabled: false,
        autoplayTimeout: 5000,
        perPageCustom: [
          [480, 1],
          [768, 4],
        ],
        navigationEnabled: true,
        autoplayHoverPause: true,
      },
      nextLabel: "⬅️",
      prevLabel: "<<",
      overview: {
        loading: false,
        startup: 0,
        program: 0,
        event: 0,
        mentor: 0,
        investor: 0,
        stakeholder: 0,
      },
    };
  },
  computed: {
    ...mapState("partner", { partnerList: "dataList" }),
    ...mapState("highlight", { highlightList: "dataList" }),
    landingBanners() {
      return this.landingData.banners || [];
    },
    landingEcosystem() {
      return this.landingData.ecosystem_overview || {};
    },
    recentPrograms() {
      return this.landingData.recent_programs || [];
    },
    recentPosts() {
      return this.landingData.recent_resources || [];
    },
    recentEvents() {
      return this.landingData.recent_events || [];
    },
    columns() {
      if (this.$vuetify.breakpoint.xl) {
        return 4;
      }

      if (this.$vuetify.breakpoint.lg) {
        return 4;
      }

      if (this.$vuetify.breakpoint.md) {
        return 2;
      }

      return 1;
    },
    selectedId() {
      return this.$route.query.id;
    },

    ecosystemData() {
      return [
        {
          title: this.$t("ecosystem.startups"),
          icon: require("@/static/icons/ecosystem/Rocket.svg?raw"),
          color: "#FEEAA5",
          count: this.overview.startup || 0,
        },
        {
          title: this.$t("ecosystem.mentors"),
          icon: require("@/static/icons/ecosystem/Mentor_Black.svg?raw"),
          color: "#ECC3FF",
          count: this.overview.mentor || 0,
        },
        {
          title: this.$t("ecosystem.events"),
          icon: require("@/static/icons/ecosystem/Media_Black.svg?raw"),
          color: "#C0C7FF",
          count: this.overview.event || 0,
        },
        {
          title: this.$t("ecosystem.programs"),
          icon: require("@/static/icons/ecosystem/Service Provider_Black.svg?raw"),
          color: "#93CCFC",
          count: this.overview.program || 0,
        },
        {
          title: this.$t("ecosystem.stakeholder"),
          icon: require("@/static/icons/ecosystem/Institution_Black.svg?raw"),
          color: "#FFB496",
          count: this.overview.stakeholder,
        },
        {
          title: this.$t("ecosystem.investors"),
          icon: require("@/static/icons/ecosystem/Investor_Black.svg?raw"),
          color: "#B3B6FF",
          count: this.overview.investor || 0,
        },
      ];
    },

    featuredStartups() {
      return this.landingData.featured_startups || [];
    },

    featuredMentors() {
      return this.landingData.featured_mentors || [];
    },

    featuredInvestors() {
      return this.landingData.featured_investors || [];
    },
    breadCrumbs() {
      return [
        { homePage: true, text: this.$t("breadcrumb.home"), to: "/" },
        { text: this.$t("breadcrumb.ecosystem"), disabled: true },
      ];
    },
  },
  mounted() {
    this.getLandingData();
    this.fetchOverviewData();
    this.getPartner();
    this.getVisitorData();
    this.getHighlight().then((response) => {
      this.highlightItems = response.data;
    });
  },
  methods: {
    ...mapActions("partner", { getPartner: "get" }),
    ...mapActions("highlight", { getHighlight: "get" }),
    ...mapActions("ecosystem-page", { getEcosystemPage: "get" }),

    getLandingData() {
      this.isLoading = true;
      this.getEcosystemPage()
        .then((response) => {
          this.landingData = Object.assign({}, response);
        })
        .catch((error) => {
          this.isLoading = false;
        });
    },

    fetchOverviewData() {
      this.$axios.get("/api/v1/data_insight/overview").then((response) => {
        this.overview.startup = response.data.data?.startup || 0;
        this.overview.program = response.data.data?.program || 0;
        this.overview.event = response.data.data?.event || 0;
        this.overview.mentor = response.data.data?.mentor || 0;
        this.overview.investor = response.data.data?.investor || 0;
        this.overview.stakeholder = response.data.data?.stakeholder || 0;
      });
    },
    getVisitorData() {
      this.isLoading = true;
      this.$axios
        .$get("/public/api/v1/visitor")
        .then((res) => {
          this.visitorData = Object.assign({}, res);
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    previewHighlight(item) {
      this.preview = Object.assign({}, item);
      this.dialogPreview = true;
    },
  },

  watch: {
    dialogPreview(v) {
      if (!v) {
        // this.preview = null;
      }
    },
  },
};
</script>
<style>
.section-padding {
  padding-top: 110px !important;
  padding-bottom: 120px !important;
}

.block-title__text {
  font-size: 36px;
}

.myCarousel .v-window__prev {
  /*position: absolute;*/
  top: 0;
  left: 84%;
}

.myCarousel .v-window__next {
  position: absolute;
  top: 0;
  right: 0rem;
}

.VueCarousel-navigation .VueCarousel-navigation-prev {
  position: absolute;
  top: -10%;
  left: 98%;
  font-size: 1.5rem;
  color: slategray;
}

.VueCarousel-navigation .VueCarousel-navigation-next {
  position: absolute;
  top: -10%;
  right: 2%;
  font-size: 1.5rem;
  color: slategray;
}
</style>
<style lang="scss">
.card-hover {
  transition: 200ms;

  &:hover {
    transform: scale(1.02);
    transition: 200ms;
  }
}
</style>
