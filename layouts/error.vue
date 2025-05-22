<template>
  <v-layout class="fill-height error-page" justify-center align-center column>
    <v-card class="mb-8" color="transparent" flat>
      <v-img
        src="/icons/undraw_taken_re_yn20.svg"
        width="100%"
        max-width="20rem"
      />
      <h1 class="error-page__status-code display-4 mb-0 primary--text">
        {{ $localeNumb(error.statusCode) }}
      </h1>
    </v-card>
    <v-btn
      v-if="error.statusCode == 404"
      color="primary"
      to="/"
      rounded
      x-large
      >{{ $t("return_homepage") }}</v-btn
    >
  </v-layout>
</template>

<script>
export default {
  props: ["error"],
  layout: "blank",
  head() {
    return {
      title: "Startup Cambodia",
    };
  },
};
</script>

<style>
.error-page {
  background-image: url("/images/about/pattern.svg");
  background-size: cover;
}
.error-page__status-code {
  /* margin-top: -1rem; */
  position: absolute;
  bottom: -0.75rem;
}
</style>
