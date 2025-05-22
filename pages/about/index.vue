<template>
  <div>
    <PageHeader :bannerUrl="bannerUrl" />
    <BreadcrumbsBar :breadcrumb-items="breadCrumbs" />
    <v-divider></v-divider>

    <v-container class="py-6 d-none">
      <v-card class="card-quote" rounded="lg" outlined>
        <v-row
          align="center"
          justify="center"
          class="pa-6"
          data-aos-delay="50"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          <v-col cols="12">
            <p class="text-left quoteText">
              <span class="text-primary quote-sign">
                <v-icon class="text-primary quote-sign"
                  >mdi-format-quote-open</v-icon
                >
              </span>

              {{ $t("about.section.testimonial.quote") }}
              <span class="text-primary quote-sign">
                <v-icon class="text-primary quote-sign"
                  >mdi-format-quote-close</v-icon
                >
              </span>
            </p>
            <p class="text-right pt-6 dpmTitle">
              <b>{{ $t("about.section.testimonial.author") }}</b>
            </p>
            <p class="text-right dpmTitle">
              {{ $t("about.section.testimonial.author_title") }}
            </p>
          </v-col>
        </v-row>
      </v-card>

      <!--      <v-row>-->
      <!--        <v-col-->
      <!--          cols="12"-->
      <!--          md="10"-->
      <!--          class="mx-auto"-->
      <!--        >-->

      <!--          <v-card-->
      <!--            class="card-quote"-->
      <!--            rounded="lg"-->
      <!--            outlined-->
      <!--          >-->
      <!--            <v-row-->
      <!--              align="center"-->
      <!--              justify="center"-->
      <!--              class="pa-6"-->
      <!--              data-aos-delay="50"-->
      <!--              data-aos="fade-up"-->
      <!--              data-aos-duration="500"-->
      <!--            >-->
      <!--              <v-col cols="12">-->
      <!--                <p class="text-left quoteText">-->
      <!--                  <span class="text-primary quote-sign">-->
      <!--                    <v-icon class="text-primary quote-sign">mdi-format-quote-open</v-icon>-->
      <!--                  </span>-->

      <!--                  {{ $t("about.section.testimonial.quote") }}-->
      <!--                  <span class="text-primary quote-sign">-->
      <!--                    <v-icon class="text-primary quote-sign">mdi-format-quote-close</v-icon>-->
      <!--                  </span>-->
      <!--                </p>-->
      <!--                <p class="text-right pt-6 dpmTitle">-->
      <!--                  <b>{{ $t("about.section.testimonial.author") }}</b>-->
      <!--                </p>-->
      <!--                <p class="text-right dpmTitle">-->
      <!--                  {{ $t("about.section.testimonial.author_title") }}-->
      <!--                </p>-->
      <!--              </v-col>-->
      <!--            </v-row>-->
      <!--          </v-card>-->
      <!--        </v-col>-->
      <!--      </v-row>-->
    </v-container>

    <v-container>
      <v-card flat>
        <v-card-text>
          <!-- src="/images/default-user.png"-->

          <v-img
            class="d-none d-sm-block rounded-sm"
            src="images/about/startup_rocket.png"
            width="20%"
            style="position: absolute; bottom: 0px; left: 0%"
          ></v-img>
          <v-row>
            <v-col cols="12" sm="9" class="mx-auto">
              <div class="block-title text-center mt-8">
                <v-card-title
                  class="block-title__text text-capitalize justify-center"
                >
                  <span class="dark--text text--primary">{{
                    $t("about.section_header.about")
                  }}</span>
                </v-card-title>
                <!-- /.block-title__text -->
              </div>
              <p class="blockquote">
                <span class="font-weight-bold">{{
                  paragraphs[0].content
                }}</span>
                <span class="">{{ paragraphs[1].content }}</span>

                <span class="font-weight-bold">{{
                  paragraphs[2].content
                }}</span>

                <span>{{ paragraphs[3].content }}</span>
                <span class="font-weight-bold">{{
                  paragraphs[4].content
                }}</span>

                <span>
                  {{ paragraphs[5].content }}
                </span>
              </p>
              <p class="blockquote">
                <span class="">{{ paragraphs[6].content }}</span>
              </p>

              <p class="blockquote">
                {{ $t("about.section.about_startup_cambodia_paragraph_two") }}
              </p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>

    <v-container>
      <v-card flat>
        <v-card-text>
          <LandingWhatWeDo />
        </v-card-text>
      </v-card>
    </v-container>

    <v-container>
      <OnBoardingGuideline />
    </v-container>

    <v-container>
      <client-only>
        <h1 class="text-center my-4">{{ $t("ourPartner") }}kljasd</h1>
        <OurPartner
          :title="$t('ourPartner')"
          :partner-list="partnerList"
          class="section-padding"
        />
      </client-only>
    </v-container>
    <!--    <MileStone />-->
  </div>
</template>
<script>
import PageHeader from "@/components/Common/PageHeader";
import OurPartner from "@/components/Common/OurPartner";
import MileStone from "@/components/Common/MileStone";
import { mapState, mapActions } from "vuex";
import BreadcrumbsBar from "../../components/bars/BreadcrumbsBar.vue";
import rocketIcon from "@/static/icons/Cover_Rocket.svg?raw";
import rocketIconKm from "@/static/icons/Cover_Rocket_km.svg?raw";

export default {
  head: { title: "About Us" },
  layout: "common",
  components: {
    PageHeader,
    OurPartner,
    BreadcrumbsBar,
    MileStone,
  },
  data() {
    return {
      bannerUrl:
        "https://media.startupcambodia.gov.kh/platform/public-assets/banners/about.png",
      bannerSubtitle: `Startup Cambodia is a joint initiative between Techo Startup Center (TSC) and Khmer Enterprise (KE) under the Ministry of Economy and Finance (MEF), serving as a national digital platform for startup and entrepreneurship ecosystem in Cambodia.`,
      rocketIcon,
      rocketIconKm,
      e1: 1,
    };
  },
  mounted() {
    this.getPartner();
  },
  methods: {
    ...mapActions("partner", { getPartner: "get" }),
  },
  computed: {
    ...mapState("partner", { partnerList: "dataList" }),
    ...mapState("partner", { partnerList: "dataList" }),
    breadCrumbs() {
      return [
        { homePage: true, text: this.$t("breadcrumb.home"), to: "/" },
        { text: this.$t("about"), disabled: true },
      ];
    },
    testimonialText() {
      return {
        content: this.$t("about.section.testimonial.quote"),
        author: this.$t("about.section.testimonial.author"),
        authorTitle: this.$t("about.section.testimonial.author_title"),
      };
    },
    paragraphs() {
      return [
        {
          id: 1,
          content: this.$t(
            "about.section.about_startup_cambodia_paragraph_one_p1"
          ),
        },
        {
          id: 2,
          content: this.$t(
            "about.section.about_startup_cambodia_paragraph_one_p2"
          ),
        },
        {
          id: 3,
          content: this.$t(
            "about.section.about_startup_cambodia_paragraph_one_p3"
          ),
        },
        {
          id: 4,
          content: this.$t(
            "about.section.about_startup_cambodia_paragraph_one_p4"
          ),
        },
        {
          id: 5,
          content: this.$t(
            "about.section.about_startup_cambodia_paragraph_one_p5"
          ),
        },
        {
          id: 6,
          content: this.$t(
            "about.section.about_startup_cambodia_paragraph_one_p6"
          ),
        },
        {
          id: 7,
          content: this.$t(
            "about.section.about_startup_cambodia_paragraph_one_p7"
          ),
        },
        {
          id: 8,
          content: this.$t(
            "about.section.about_startup_cambodia_paragraph_two"
          ),
        },
      ];
    },
  },
};
</script>
<style>
.block-title__text {
  text-align: center !important;
}

p.quoteText {
  font-size: 1.25rem;
  line-height: 2.5rem;
  font-style: italic;
}
.card-quote .quoteText .quote-sign {
  font-size: 2.5rem;
  opacity: 0.5 !important;
  font-weight: bold;
}

p.dpmTitle {
  font-size: 1rem;
  /* line-height: 2.5rem; */
  /* font-style: italic; */
}
.blockquote {
  line-height: 1.5rem;
  color: black;
}
</style>
