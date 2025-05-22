<template>
  <v-layout
    v-if="state =='error'"
    class="fill-height error-page"
    justify-center
    align-center
    column
  >
    <v-card
      class="mb-8"
      color="transparent"
      flat
    >
      <v-img
        src="/icons/undraw_taken_re_yn20.svg"
        width="100%"
        max-width="20rem"
      />
      <h1 class="error-page__status-code display-4 mb-0 primary--text"> {{$localeNumb(error.statusCode)}} </h1>
    </v-card>
    <!-- <v-alert>{{error.message}}</v-alert> -->
    <v-container>
      <v-layout justify-center>
        <v-alert
          type="warning"
          min-width="350"
          rounded="lg"
          outlined
          text
        >
          <p>{{error.message}}</p>
          <v-btn
            @click="reAuth"
            color="warning"
            elevation="0"
          >{{$t('re_auth')}}</v-btn>
        </v-alert>
      </v-layout>
    </v-container>

    <v-btn
      v-if="error.statusCode==404"
      color="primary"
      to="/"
      rounded
      x-large
    >{{$t('return_homepage')}}</v-btn>
  </v-layout>
  <v-layout
    class="fill-height error-page"
    column
    v-else-if="state=='success'"
  >
  </v-layout>
  <v-layout
    v-else
    class="fill-height error-page"
    justify-center
    align-center
  >
    <v-progress-circular
      :width="4"
      :size="100"
      indeterminate
    ></v-progress-circular>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
export default {
  layout: "blank",
  data() {
    return {
      state: "Loading",
      error: {
        statusCode: null,
        message: "",
      },
    };
  },
  computed: {
    authToken() {
      return this.$route.query.authToken;
    },
  },
  mounted() {
    this.verifyCamDigiKeyToken({ token: this.authToken })
      .then((res) => {
        this.state = "success";
        this.$swal.fire({
          icon: "success",
          type: "success",
          title: this.$t("success"),
          showConfirmButton: false,
          timer: 5000,
        });
        setTimeout(() => {
          let _path = localStorage.redirect || "/";
          localStorage.removeItem("redirect");
          window.location.replace(_path);
        }, 1000);
      })
      .catch((e) => {
        this.error.statusCode = e.response?.status || "";
        this.error.message = e.response?.data?.message || "Unknown Error";
        this.state = "error";
      });
  },
  methods: {
    ...mapActions("auth", ["verifyCamDigiKeyToken", "getCamDigiKeyAuthURL"]),
    reAuth() {
      this.getCamDigiKeyAuthURL()
        .then((res) => {
          localStorage.redirect = this.$route.fullPath;
          window.location.href = res.login_url;
        })
        .catch(() => {});
    },
  },
};
</script>

<style>
</style>
