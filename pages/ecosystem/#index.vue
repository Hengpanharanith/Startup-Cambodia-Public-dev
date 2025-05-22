<template>
  <div>
    <PageHeader :bannerUrl="bannerUrl" />
    <BreadcrumbsBar :breadcrumb-items="breadCrumbs" />
    <LandingEcosystem
      :ecosystem="landingEcosystem"
      :showCaption="false"
      :showButton="false"
      :animationEnabled="false"
    />
    <div
      id="ecoSystemContainer"
      class="py-16 white"
    >
      <v-container>
        <v-card
          rounded="xl"
          outlined
        >
          <v-card-text>
            <v-row
              class="align-center flex-column-reverse flex-md-row"
              style="min-height:calc(50vh)"
              no-gutters
            >
              <v-col
                cols="12"
                md="6"
                offset-md="1"
              >
                <v-card
                  rounded="lg"
                  flat
                >
                  <v-layout
                    style="min-height:200px"
                    column
                  >
                    <v-card-title class="font-weight-normal text-break text-md-h4 grey--text text--darken-3">{{ $t("ecosystem.discover.desc") }}</v-card-title>
                    <v-card-actions class="mt-auto py-4">
                      <v-spacer class="d-md-none"></v-spacer>
                      <v-btn
                        to="/ecosystem/discover/category/startup/"
                        class="rounded-lg pulse-button pulse-button--rounded ml-2 px-4"
                        color="primary"
                        elevation="0"
                        large
                      >{{ $t("ecosystem.discover.title") }}</v-btn>
                    </v-card-actions>
                  </v-layout>
                </v-card>
              </v-col>
              <v-img
                src="/icons/discover.svg"
                min-width="300"
                max-width="400"
              ></v-img>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
    </div>

    <v-container class="py-16">
      <v-card
        class="py-16"
        rounded="xl"
        flat
      >
        <v-layout justify-center>
          <v-card
            max-width="960"
            color="transparent"
            class="mb-16"
            flat
          >
            <v-card-title
              class="text-break text-center justify-center text-h5 text-md-h4"
              style="color: #2e3d62"
            >{{ $t("ecosystem.featured_text") }} </v-card-title>
          </v-card>
        </v-layout>
        <v-layout
          v-if="isEmptyStakholders"
          data-aos="fade-up"
          data-aos-duration="500"
          justify-center
        >
          <v-btn
            @click="goToSection('featuredList')"
            class="pulse-button"
            color="primary"
            elevation="0"
            fab
          >
            <v-icon class="fa">mdi-chevron-down</v-icon>
          </v-btn>

          <!-- <div class="arrow-container animated fadeInDown pointer position-relative"> -->

          <!-- <div class="arrow-1 animated hinge infinite zoomIn"></div> -->
          <!-- </div> -->
        </v-layout>
      </v-card>
    </v-container>

    <section
      class="landing-network d-flex align-items-center"
      id="featuredList"
    >
      <v-container>
        <v-row ref="featuredList">
          <v-container class="px-4">
            <div
              id="featuredStartup"
              v-if="featuredStartups.length"
              data-aos="fade-up"
              data-aos-duration="500"
            >
              <div class="block-title__text py-8 text-center">
                {{ $t("ecosystem.featured_startup") }}
              </div>
              <v-row
                justify="center"
                class="mb-4"
              >
                <v-col
                  v-for="(item, key) in featuredStartups"
                  :key="'startup-' + key"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="4"
                >
                  <CardViewStartup
                    :id="item.id"
                    :to="`/ecosystem/discover/category/startup/${item.id}`"
                    :fundingAmount="item.funding_amount"
                    :fundingCurrency="item.funding_currency"
                    :thumbnail="item.logo"
                    :text-title="item.name"
                    :incorporated-at="item.date_incorporated"
                    :establish-year="item.year_of_establishment"
                    :sectors="item.industry"
                    :models="item.business_model"
                    class="fill-height"
                  />
                </v-col>
              </v-row>
            </div>

            <div
              id="featuredInvestor"
              v-if="featuredInvestors.length"
              data-aos="fade-up"
              data-aos-duration="500"
            >
              <div class="block-title__text py-8 text-center">
                {{ $t("ecosystem.featured_investor") }}
              </div>
              <v-row
                justify="center"
                class="mb-4"
              >
                <v-col
                  v-for="(item, key) in featuredInvestors"
                  :key="'startup-' + key"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="4"
                >
                  <CardViewInvestor
                    :item="item.id"
                    :to="`/ecosystem/discover/category/investor/${item.id}`"
                    :thumbnail="item.logo"
                    :text-title="item.name"
                    :incorporated-at="item.date_incorporated"
                    :sectors="item.industry"
                    class="fill-height"
                  />
                </v-col>
              </v-row>
            </div>

            <div
              id="featuredMentor"
              v-if="featuredMentors.length"
              data-aos="fade-up"
              data-aos-duration="500"
            >
              <div class="block-title__text py-8 text-center">
                {{ $t("ecosystem.featured_mentor") }}
              </div>
              <v-row
                justify="center"
                class="mb-4"
              >
                <v-col
                  v-for="(item, key) in featuredMentors"
                  :key="'mentor-' + key"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                >
                  <CardViewMentor
                    class="fill-height"
                    :id="item.id"
                    :to="`/ecosystem/discover/category/mentor/${item.id}`"
                    :thumbnail="item.profile"
                    :full-name="`${item.first_name} ${item.last_name}`"
                    :interest="item.interest"
                    :position="item.role"
                    :company="item.company"
                    :expertise="item.expertise"
                  />
                </v-col>
              </v-row>
            </div>
          </v-container>
        </v-row>
      </v-container>
    </section>
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
    landingEcosystem() {
      return this.landingData.ecosystem_overview || {};
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
  },
  methods: {
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
<style scoped lang='sass'>
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
