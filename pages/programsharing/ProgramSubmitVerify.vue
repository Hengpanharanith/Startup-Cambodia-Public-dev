<template>
  <div
    class="d-flex justify-center align-center fill-height"
    style="
      background-image: url('https://startupcambodia.gov.kh/images/about/pattern.svg');
      background-position: center center;
      background-repeat: repeat;
    "
  >
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6" class="align-self-center">
          <!-- Loading Spinner -->
          <v-card v-if="loading" class="pa-8 text-center" elevation="2">
            <v-progress-circular indeterminate color="primary" size="40" />
            <div class="mt-4">Verifying token...</div>
          </v-card>

          <!-- <InvalidToken v-else-if="isInvalid" /> -->

          <!-- Invalid Token -->

          <!-- Success Component -->
          <ValidToken v-if="isInvalid" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import InvalidToken from "@/components/TokenVerify/InvalidToken.vue";
import ValidToken from "../../components/TokenVerify/ValidToken.vue";
// import SuccessComponent from "@/components/Success.vue";

export default {
  name: "ProgramSubmitVerify",
  layout: "blank", // Nuxt 2 specific
  components: {
    InvalidToken,
    ValidToken,
  },
  data() {
    return {
      loading: false,
      isInvalid: true,
    };
  },
  // mounted() {
  //   const token = new URLSearchParams(window.location.search).get("token");

  //   if (!token) {
  //     this.isInvalid = true;
  //     this.loading = false;
  //     return;
  //   }

  //   axios
  //     .post("/api/verify-token", { token })
  //     .then(() => {
  //       this.isInvalid = false;
  //     })
  //     .catch(() => {
  //       this.isInvalid = true;
  //     })
  //     .finally(() => {
  //       this.loading = false;
  //     });
  // },
};
</script>
