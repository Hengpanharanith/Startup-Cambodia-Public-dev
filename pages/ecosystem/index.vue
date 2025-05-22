<template>
  <div style="background-color: #06083d">
    <PageHeader :bannerUrl="bannerUrl" />
    <BreadcrumbsBar :breadcrumb-items="breadCrumbs" />
    <LandingEcosystem
      :items="ecosystemData"
      :showCaption="false"
      :showButton="false"
      :animationEnabled="false"
    />

    <EcosystemStartup />
    <EcosystemMentor />
    <EcosystemProgramEvent />
    <EcosystemInvestor :items="[...featuredInvestors, ...featuredInvestors]" />
    <EcosystemStakeholder />

    <br />
    <br />
    <br />
  </div>
</template>
<script>
import LandingEcosystem from "@/components/Common/LandingEcosystem";
import PageHeader from "@/components/Common/PageHeader";
import NetworkSubNavbar from "@/components/Common/NetworkSubNavbar";
import CardViewFeaturedOne from "@/components/CardView/CardViewFeaturedOne";
import CardViewFeaturedTwo from "@/components/CardView/CardViewFeaturedTwo";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import { mapState, mapActions } from "vuex";
import BreadcrumbsBar from "../../components/bars/BreadcrumbsBar.vue";
export default {
  layout: "common",
  head: {
    title: "Ecosystem",
    meta: [
      {
        hid: "og:image",
        property: "og:image",
        content: "/images/about/for-start-up.png",
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: "/images/about/for-start-up.png",
      },
      {
        hid: "description",
        name: "description",
        content: "Startup Cambodia - Ecosystem",
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "Startup Cambodia - Ecosystem",
      },
    ],
  },
  components: {
    PageHeader,
    NetworkSubNavbar,
    CardViewFeaturedOne,
    CardViewFeaturedTwo,
    ButtonPrimary,
    LandingEcosystem,
    BreadcrumbsBar,
  },
  data() {
    return {
      bannerUrl:
        "https://media.startupcambodia.gov.kh/platform/public-assets/banners/discover.png",
      title: "Ecosystem",
      isLoading: false,
      landingData: {},
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
    ecosystemActions() {
      return [
        {
          id: 1,
          title: this.$t("ecosystem.discover.title"),
          desc: this.$t("ecosystem.discover.desc"),
          to: "/ecosystem/discover/category/startup/",
          thumbnail: "/icons/ecosystem/discover.svg",
        },
        // {
        //   id: 2,
        //   title: this.$t("ecosystem.get_listed.title"),
        //   desc: this.$t("ecosystem.get_listed.desc"),
        //   to: "/ecosystem/get-listed",
        //   thumbnail: "/icons/ecosystem/get_listed.svg",
        // },
      ];
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

    isEmptyStakholders() {
      return (
        this.featuredStartups.length ||
        this.featuredInvestors.length ||
        this.featuredMentors.length
      );
    },
  },
  mounted() {
    this.getLandingData();
    this.fetchOverviewData();
  },
  methods: {
    ...mapActions("ecosystem-page", { getEcosystemPage: "get" }),
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

    openNetworkPage() {
      this.$router.push({ path: "/ecosystem/discover/category/startup/" });
    },
    goToSection(sectionId) {
      var scrollDiv = document.getElementById(sectionId).offsetTop;
      window.scrollTo({ top: scrollDiv, behavior: "smooth" });
    },
  },
};
</script>
<style scoped lang="sass">
.blog-one__single.card-event
  border-radius: 0.5rem

  & .blog-one__single-inner-block
    border-radius: 0.5rem
    padding: 1rem 2rem
    padding-top: 4rem

  & .blog-one__date
    padding-top: 0.5rem !important
    padding-bottom: 0.5rem !important

  & .blog-one__date,

  &:hover .blog-one__single-inner-block
    background-color: #2e3d62

  &:hover .btn__action
    background: rgb(251, 199, 103)
    color: white
    border-color: white

  &:hover .blog-one__date
    color: #2e3d62
    background-color: white

  & .blog-one__author,

  & .blog-one__title.card-event__title
    color: #2e3d62

  &:hover .blog-one__author,

  &:hover .blog-one__title.card-event__title
    color: white

.card-event__title,
.card-event__text
  overflow: hidden
  text-overflow: ellipsis
  display: -webkit-box
  -webkit-line-clamp: 2
  -webkit-box-orient: vertical

  &
    -webkit-line-clamp: 3

.blog-one__link
  position: absolute
  right: 2rem
  bottom: 2rem

.btn
  border: 2px solid rgba(46.000001057982445, 61.00000016391277, 98.00000175833702, 1)
  color: rgba(46.000001057982445, 61.00000016391277, 98.00000175833702, 1)
  cursor: pointer

.arrow-container
  width: 100px
  height: 100px
  margin: 0 auto
  left: 0
  right: 0

.arrow-1
  width: 100px
  height: 100px
  background: rgb(251, 199, 103)
  color: white
  border-color: white
  opacity: 0.5
  border-radius: 50%
  position: absolute

.arrow-2
  width: 60px
  height: 60px
  background: rgb(251, 199, 103)
  color: white
  border-color: white
  border-radius: 50%
  position: absolute
  top: 20px
  left: 20px
  z-index: 1
  display: flex
  justify-content: center
  align-items: center

  &:before
    width: 52px
    height: 52px
    content: ""
    border-radius: 50%
    position: absolute
    top: 2px
    left: 2px

  & i.fa
    font-size: 30px
    display: table-cell
    vertical-align: middle
    text-align: center
    color: white
    margin-bottom: 2px

.animated.hinge
  -webkit-animation-duration: 2s
  animation-duration: 2s

.zoomIn
  -webkit-animation-name: zoomIn
  animation-name: zoomIn

.blog-one__single.card-actor:hover.blog-one__single-inner-block
  background-color: #f2a047 !important
  color: white

.pulse-button
  position: relative
  z-index: 2

  &::after
    content: ""
    z-index: -1
    position: absolute
    width: 100%
    height: 100%
    border-radius: 100%
    -webkit-animation: pulse 1.5s infinite
    -animation: pulse 1.5s infinite

  &--rounded::after
    border-radius: 8px

  &:hover
    &::after
      -webkit-animation: none
      -animation: none

@keyframes pulse
  0%
    box-shadow: 0 0 0 0 rgba(#f79b36, 1)
  100%
    box-shadow: 0 0 0 20px rgba(#f79b36, 0)
</style>
