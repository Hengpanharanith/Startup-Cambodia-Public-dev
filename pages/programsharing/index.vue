<template>
  <div
    style="
      background-image: url('https://startupcambodia.gov.kh/images/about/pattern.svg');
      background-position: center center;
      background-repeat: repeat;
    "
  >
    <div class="hero-section">
      <!-- Background image layer -->
      <div class="hero-bg"></div>

      <!-- Content layer -->
      <v-row
        class="fill-height hero-content"
        align="center"
        justify="center"
        no-gutters
      >
        <v-col cols="12" class="text-center">
          <h1
            class="hero-title white--text mb-4 font-weight-bold text-h7"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            {{ $t("programSharing.heroTitle") }}
          </h1>
          <p
            class="hero-subtitle white--text mb-6 font-weight-light text-body-1 text-medium-emphasis"
            data-aos="fade-up"
            data-aos-duration="900"
          >
            {{ $t("programSharing.heroSubtitle") }}
          </p>

          <v-btn
            large
            class="submit-btn1 rounded-pill"
            @click="goToForm"
            elevation="3"
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            {{ $t("programSharing.submitBtn") }}
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <!-- About Sharing Program Section -->
    <v-container class="pa-12 position-relative">
      <v-row justify="center">
        <v-col cols="12" md="10">
          <v-card
            class="about-card rounded-lg pa-8"
            elevation="2"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <!-- Rocket image as background decoration (behind) -->
            <v-img
              data-aos="fade-up"
              data-aos-duration="1000"
              src="/images/programsharing/rocket-right-ps.svg"
              class="bg-image1"
              cover
            ></v-img>
            <div class="about-card-inner">
              <v-row style="position: relative; z-index: 2">
                <v-col cols="12">
                  <!-- Centered Title -->
                  <h2 class="section-title mb-6 text-center">
                    {{ $t("programSharing.aboutTitle") }}
                  </h2>
                </v-col>

                <v-col cols="12" md="12">
                  <div class="about-content rounded-lg">
                    <p class="mb-4">
                      <strong>Program Submission</strong
                      >{{ $t("programSharing.aboutParagraph1") }}
                    </p>
                    <p>
                      {{ $t("programSharing.aboutParagraph2") }}
                    </p>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Why Share Your Program Section -->
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <h2 class="section-title">
            {{ $t("programSharing.whyShareTitle") }}
          </h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="3"
          v-for="(benefit, idx) in benefits"
          :key="benefit.title"
        >
          <v-card
            class="benefit-card text-center pa-8 rounded-lg"
            elevation="0"
            :data-aos="idx % 2 == 0 ? 'fade-up' : 'fade-down'"
            :data-aos-duration="1000"
          >
            <v-img
              :src="benefit.image"
              max-width="150"
              max-height="150"
              class="mx-auto mb-4"
            ></v-img>
            <h3 class="benefit-title text-left mb-2">{{ benefit.title }}</h3>
            <p class="benefit-description text-left">
              {{ benefit.description }}
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- How to Submit Section -->
    <v-container>
      <EcosystemProgramEvent />
      <v-row>
        <v-col cols="12" class="text-center mb-8">
          <h2 class="section-title">
            {{ $t("programSharing.howToSubmitTitle") }}
          </h2>
        </v-col>
      </v-row>

      <v-row justify="center" align="center">
        <v-col cols="12" md="8">
          <v-timeline>
            <v-timeline-item
              v-for="(step, index) in submissionSteps"
              :key="index"
              :color="step.color"
              large
            >
              <template v-slot:icon>
                <nuxt-link
                  v-if="index === 0"
                  to="/program"
                  style="display: inline-block"
                >
                  <v-icon color="white">{{ step.icon }}</v-icon>
                </nuxt-link>
                <v-icon v-else color="white">{{ step.icon }}</v-icon>
              </template>
              <v-card
                class="rounded-lg"
                elevation="2"
                :data-aos="index % 2 == 0 ? 'fade-right' : 'fade-left'"
                :data-aos-duration="1000"
              >
                <v-card-title class="headline">{{ step.title }}</v-card-title>
                <v-card-text>{{ step.description }}</v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
export default {
  name: "ProgramSharingPage",
  layout: "common",

  computed: {
    benefits() {
      return [
        {
          title: this.$t("programSharing.benefit1.title"),
          description: this.$t("programSharing.benefit1.description"),
          image: "/images/programsharing/benifit1.svg",
        },
        {
          title: this.$t("programSharing.benefit2.title"),
          description: this.$t("programSharing.benefit2.description"),
          image: "/images/programsharing/benifit2.svg",
        },
        {
          title: this.$t("programSharing.benefit3.title"),
          description: this.$t("programSharing.benefit3.description"),
          image: "/images/programsharing/benifit3.svg",
        },
        {
          title: this.$t("programSharing.benefit4.title"),
          description: this.$t("programSharing.benefit4.description"),
          image: "/images/programsharing/benefit4.svg",
        },
      ];
    },
    submissionSteps() {
      return [
        {
          title: this.$t("programSharing.step1.title"),
          description: this.$t("programSharing.step1.description"),
          icon: "mdi-form-select",
          color: "orange",
        },
        {
          title: this.$t("programSharing.step2.title"),
          description: this.$t("programSharing.step2.description"),
          icon: "mdi-email-check",
          color: "orange",
        },
        {
          title: this.$t("programSharing.step3.title"),
          description: this.$t("programSharing.step3.description"),
          icon: "mdi-clock-outline",
          color: "orange",
        },
      ];
    },
  },
  methods: {
    goToForm() {
      this.$router.push({
        name: "program",
        query: { ...this.$route.query, showForm: "true" },
      });
    },
  },
  mounted() {
    AOS.init({ once: false });
    this.$nextTick(() => {
      AOS.refresh();
    });
  },
};
</script>

<style>
.hero-section {
  position: relative;
  height: 55vh;
  width: 100%;
  overflow: hidden;
}

/* .hero-bg {
  position: absolute;
  background-position: center 30%;
  inset: 0; 
  background: linear-gradient(180deg, #ff6b35 25%, #f7931e 100%);
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 1;
  z-index: 0;
} */
.hero-bg {
  position: absolute;
  background-position: center 30%;
  inset: 0;
  background-image: url("/images/programsharing/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.8;
  z-index: 0;
}
.hero-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.373); 
}

.hero-content {
  position: relative;
  z-index: 1; /* Ensures content appears above background */
}

.hero-title {
  font-size: 2.5rem !important;
  font-weight: 700px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1rem !important;
  /* font-weight: 300px !important; */
  max-width: 700px;
  margin: 0 auto;
}

.submit-btn1 {
  padding: 24px 40px !important;
  font-size: 1rem !important;
  border-radius: 25px;
  background-color: #f7931e !important;
  color: #fff !important; /* Set text color to white */ /* Remove underline/decoration */
}

.about-card {
  position: relative;
  z-index: 4;
  overflow: visible;
}

.about-card-inner {
  border: 3px dashed #f7931e !important;
  border-radius: 16px;
  /* background: #fff; */
  background: transparent;
  position: relative;
  z-index: 2;
  padding: 48px;
}

.bg-image1 {
  position: absolute;
  bottom: -15px;
  right: -15px;
  width: 130px;
  height: 290px;
  opacity: 1;
  z-index: 1;
  pointer-events: none;
  transition: all 0.3s ease !important;
}

.section-title {
  font-size: 2rem;
  font-weight: 700px;
  color: #000000;
}

.about-content p {
  line-height: 1.6;
  font-size: 1.2rem;
  color: #000000;
}
.benefit-card {
  transition: transform 0.3s ease;
  height: auto;
}

.benefit-card:hover {
  transform: translateY(-5px);
}

.benefit-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #000000;
}

.benefit-description {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
}

.social-links .v-btn {
  margin-right: 8px;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }
  .about-card-inner {
    padding: 16px !important;
  }
  .about-content {
    padding: 2px !important;
  }
}
@media (max-width: 600px) {
  .about-card {
    padding: 0 !important;
  }
  .about-card-inner {
    padding: 12px !important;
    border-width: 2px !important;
    border-radius: 12px !important;
  }
  .about-content {
    padding: 0 4px !important;
  }
  .section-title {
    font-size: 1.2rem !important;
    margin-bottom: 1rem !important;
  }
  .about-content p {
    font-size: 1rem !important;
  }
  .bg-image1 {
    width: 80px !important;
    height: 120px !important;
    bottom: 0px !important;
    right: -5px !important;
  }
}
body {
  background-image: url("/images/programsharing/bg-pattern.svg");
  background-repeat: no-repeat;
  background-position: center;
}
.v-container {
  background-color: transparent !important;
}
</style>
