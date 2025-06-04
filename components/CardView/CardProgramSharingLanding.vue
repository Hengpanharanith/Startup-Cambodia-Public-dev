<template>
  <div class="landing-programsharing px-12">
    <v-card class="landing-programsharing mt-8 rounded-lg py-4" flat>
      <div class="">
        <v-container class="overflow-hidden">
          <v-row class="align-center justify-center" no-gutters>
            <v-col
              cols="12"
              md="5"
              sm="12"
              class="text-center mb-8 mb-md-0"
              data-aos="fade-right"
              data-aos-duration="500"
            >
              <div class="illustration-container">
                <v-img
                  src="/images/programsharing/Sharing.svg"
                  alt="Program Sharing Illustration"
                  height="350px"
                  width="350px"
                  class="mx-auto"
                  contain
                />
              </div>
            </v-col>
            <v-col
              cols="12"
              md="7"
              sm="12"
              class="text-center text-md-left pl-md-8"
              data-aos="fade-left"
              data-aos-duration="500"
            >
              <v-card color="transparent" flat>
                <v-card-title
                  class="programsharing-title text-break font-weight-bold justify-center justify-md-start pa-0 mb-4"
                >
                  {{ $t("programSharing.programsharing_landing_title") }}
                </v-card-title>
                <v-card-text class="pa-0 mb-8">
                  <div
                    class="text-subtitle program-description text-center text-md-left font-weight-regular"
                  >
                    {{ $t("programSharing.programsharing_landing_subtitle") }}
                  </div>
                </v-card-text>
                <v-card-actions class="justify-center justify-md-start pa-0">
                  <nuxt-link to="/program">
                    <v-btn
                      class="suggest-btn mr-4 rounded-pill"
                      color="primary"
                      large
                      elevation="0"
                    >
                      {{
                        $t("programSharing.programsharing_landing_primary_btn")
                      }}
                    </v-btn></nuxt-link
                  >
                  <nuxt-link to="/programsharing">
                    <v-btn
                      class="explore-btn rounded-pill"
                      color="secondary"
                      large
                      outlined
                    >
                      {{
                        $t(
                          "programSharing.programsharing_landing_secondary_btn"
                        )
                      }}
                    </v-btn></nuxt-link
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  computed: {
    programList() {
      return this.programs.slice(0, 4);
    },
  },  
};
</script>

<style scoped>
.programsharing-title {
  /* font-family: "KantumruyPro-Bold", sans-serif !important; */
  font-size: 2.2rem !important;
  color: #000000;
  line-height: 1.3;
}

.program-description {
  color: #000000;
  font-size: 1rem;
  line-height: 1.6;
  max-width: 600px;
}

.suggest-btn {
  padding: 12px 32px !important;
  font-size: 1rem;
  letter-spacing: 0;
  transition: all 0.3s ease;
}

.explore-btn {
  padding: 12px 32px !important;
  font-size: 1rem;
  letter-spacing: 0;
  color: #f59336 !important;
  transition: all 0.3s ease;
}

.illustration-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

/* Ensure cards have equal height */
.d-flex {
  display: flex;
}

.w-100 {
  width: 100%;
}

/* Button spacing */
.mr-4 {
  margin-right: 1rem !important;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .block-title__text {
    font-size: 1.8rem !important;
    text-align: center !important;
  }

  .program-description {
    text-align: center !important;
    margin: 0 auto;
  }

  .v-card-actions {
    justify-content: center !important;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .mr-4 {
    margin-right: 0 !important;
    margin-bottom: 0.5rem;
  }

  .pl-md-8 {
    padding-left: 0 !important;
  }
}

@media (max-width: 600px) {
  .block-title__text {
    font-size: 1.5rem !important;
  }

  .v-card-actions {
    flex-direction: column;
    align-items: center;
  }

  .v-card-actions .v-btn {
    width: 200px;
    margin-bottom: 0.5rem;
  }

  .mr-4 {
    margin-right: 0 !important;
  }
}
</style>
