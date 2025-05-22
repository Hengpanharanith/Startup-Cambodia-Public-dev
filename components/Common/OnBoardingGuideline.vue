<template>
  <section>
    <v-container>
      <p class="justify-md-center block-title__text text-break">
        {{ $t("about.section.onboarding.title") }}
      </p>
      <v-card flat>
        <v-card-text>
          <v-stepper non-linear flat style="font-size: 16px" class="pa-8">
            <v-stepper-header class="font-weight-bold" style="box-shadow: none">
              <v-stepper-step editable step="1">
                {{ $t("about.section.onboarding.signup") }}
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step editable step="2">
                {{ $t("about.section.onboarding.create_profile") }}
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3" editable>
                {{ $t("about.section.onboarding.fill_info") }}
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="4" editable>
                {{ $t("about.section.onboarding.submit") }}
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="5" editable>
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
                    Camdigikey account. If you don’t have one, you can create
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
    </v-container>
  </section>
</template>
<script setup lang="ts"></script>
