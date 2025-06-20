<template>
  <section>
    <v-container>
      <p class="justify-md-center block-title__text text-break">
        {{ $t("about.section.onboarding.title") }}
      </p>
      <v-card flat>
        <v-card-text>
          <v-stepper
            v-model="currentStep"
            non-linear
            flat
            style="font-size: 16px"
            class="pa-8"
          >
            <v-stepper-header class="font-weight-bold" style="box-shadow: none">
              <v-stepper-step editable step="1" @click="currentStep = 1">
                {{ $t("about.section.onboarding.signup") }}
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step editable step="2" @click="currentStep = 2">
                {{ $t("about.section.onboarding.create_profile") }}
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3" editable @click="currentStep = 3">
                {{ $t("about.section.onboarding.fill_info") }}
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="4" editable @click="currentStep = 4">
                {{ $t("about.section.onboarding.submit") }}
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="5" editable @click="currentStep = 5">
                {{ $t("about.section.onboarding.start_connect") }}
              </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items class="d-none">
              <v-stepper-content step="1">
                <v-card
                  class="mb-12"
                  flat
                  height="100px"
                  title="Create Camdigikey account"
                >
                  <v-card-title> Create Camdigikey Account </v-card-title>
                  <v-card-text>
                    To log into Startup Cambodia users are required to have a
                    Camdigikey account. If you don't have one, you can create
                    one. See
                    <a
                      href="https://camdigikey.gov.kh/file/007_CAMDIGIKEY_V2_USER_GUILDE_.pdf"
                      >CamDigikey user guide</a
                    >
                    for more detail.
                  </v-card-text>
                </v-card>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card class="mb-12" flat height="100px">
                  <v-card-title> Profile creation </v-card-title>
                  <v-card-text>
                    Once you have an account, navigate to profile page and click
                    on profile tab (Startup, Mentor, Investor) and click on
                    create profile button.
                  </v-card-text>
                </v-card>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card class="mb-12" flat height="100px">
                  <v-card-title> Fill in info </v-card-title>
                  <v-card-text>
                    Fill in the required information for your profile.
                  </v-card-text>
                </v-card>
              </v-stepper-content>

              <v-stepper-content step="4">
                <v-card class="mb-12" flat height="100px">
                  <v-card-title> Application Submission </v-card-title>
                  <v-card-text>
                    Review and submit your application.
                  </v-card-text>
                </v-card>
              </v-stepper-content>

              <v-stepper-content step="5">
                <v-card class="mb-12" flat height="100px">
                  <v-card-text>
                    <v-card-actions class="justify-center">
                      <nuxt-link
                        to="/ecosystem/discover/category/startup"
                        class="mx-auto"
                      >
                        <ButtonPrimary
                          :title="$t('landing.ecosystem.button.explore')"
                        />
                      </nuxt-link>
                    </v-card-actions>
                  </v-card-text>
                </v-card>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card-text>
      </v-card>

      <!-- Image Display Container -->
      <v-container class="text-center mt-8">
        <v-card flat style="background: transparent">
          <div class="image-container">
            <v-img
              :key="currentStep"
              class="fit-image"
              :src="stepImages[currentStep]"
              :alt="`Step ${currentStep} illustration`"
              contain
              rounded="lg"
              data-aos="fade-zoom-in"
              data-aos-duration="700"
              data-aos-easing="ease-in-out"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </div>
        </v-card>
      </v-container>
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
  mounted() {
    AOS.init({ once: false });
    AOS.refresh();
  },
};
</script>

<style scoped>
.image-container {
  width: 100%;
  height: 600px;
  position: relative;
}
.fit-image {
  width: 100%;
  height: 600px;
  border-radius: 12px;
}
.v-img {
  transition: all 0.3s ease-in-out;
}
</style>
