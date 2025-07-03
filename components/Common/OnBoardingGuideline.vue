<template>
  <section>
    <v-container>
      <!-- Title -->
      <p class="text-center text-h5 font-weight-bold mb-8">
        {{ $t("about.section.onboarding.title") }}
      </p>

      <!-- Stepper Card -->
      <v-card elevation="1" class="pa-4 pa-md-8">
        <v-stepper v-model="currentStep" non-linear flat>
          <!-- Stepper Header -->
          <v-stepper-header class="font-weight-bold">
            <template v-for="n in 5">
              <v-stepper-step
                :key="n"
                :step="n"
                editable
                @click="currentStep = n"
              >
                {{ getStepLabel(n) }}
              </v-stepper-step>
              <v-divider v-if="n < 5" :key="`divider-${n}`" />
            </template>
          </v-stepper-header>

          <!-- Stepper Content -->
          <v-stepper-items>
            <v-stepper-content v-for="n in 5" :key="n" :step="n" class="pa-4">
              <v-card outlined class="pa-4 pa-md-6 mb-8 rounded-lg">
                <v-row wrap align="center">
                  <!-- Text Section -->
                  <v-col cols="12" md="6" class="pb-4 pb-md-0">
                    <h3 class="text-h6 font-weight-bold mb-2">
                      {{ getStepTitle(n) }}
                    </h3>
                    <p class="text-body-1 grey--text text--darken-1">
                      {{ getStepDescription(n) }}
                    </p>

                    <div v-if="n === 5" class="mt-4">
                      <nuxt-link to="/programsharing">
                        <ButtonPrimary :title="$t('button.startnow')" />
                      </nuxt-link>
                    </div>
                  </v-col>

                  <!-- Image Section -->
                  <v-col cols="12" md="6" class="text-center">
                    <v-img
                      :src="stepImages[n]"
                      :alt="`Step ${n} illustration`"
                      max-width="100%"
                      max-height="300"
                      contain
                      rounded="lg"
                      class="elevation-0"
                      data-aos="fade-zoom-in"
                      data-aos-duration="1000"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular indeterminate color="primary" />
                        </v-row>
                      </template>
                    </v-img>
                  </v-col>
                </v-row>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card>
    </v-container>
  </section>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  data() {
    return {
      currentStep: 1,
      stepImages: {
        1: "/images/guideline/guide1.png",
        2: "/images/guideline/guide2.png",
        3: "/images/guideline/guide3.png",
        4: "/images/guideline/default.jpg",
        5: "/images/guideline/default.jpg",
      },
    };
  },
  methods: {
    getStepLabel(n) {
      const labels = [
        this.$t("about.section.onboarding.signup"),
        this.$t("about.section.onboarding.create_profile"),
        this.$t("about.section.onboarding.fill_info"),
        this.$t("about.section.onboarding.submit"),
        this.$t("about.section.onboarding.start_connect"),
      ];
      return labels[n - 1];
    },
    getStepTitle(n) {
      const titles = [
        "Create Camdigikey Account",
        "Profile Creation",
        "Fill In Information",
        "Submit Application",
        "Start Connecting",
      ];
      return titles[n - 1];
    },
    getStepDescription(n) {
      const descriptions = [
        "To log into Startup Cambodia, you must have a Camdigikey account. If you don’t have one yet, you can create one. See the user guide for help.",
        "After logging in, go to the profile page and click the 'Create Profile' button under your role: Startup, Mentor, or Investor.",
        "Fill out all the required fields in the profile form with accurate and complete information.",
        "Review your application details carefully before submitting.",
        "You're all set! Start exploring the Startup Cambodia ecosystem and connect with others.",
      ];
      return descriptions[n - 1];
    },
  },
  mounted() {
    AOS.init({ once: false });
    AOS.refresh();
  },
};
</script>

<style scoped>
h3 {
  line-height: 1.4;
}
.v-img {
  border-radius: 12px;
}
</style>
