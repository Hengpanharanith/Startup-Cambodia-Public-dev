<template>
  <div
    class="text-center pa-8"
    data-aos="fade-right"
    data-aos-duration="500"
  >
    <div class="mb-6">
      <v-icon size="64" color="grey darken-2"
        >mdi-check-circle-outline</v-icon
      >
    </div>
    <h2
      class="text-h5 font-weight-bold mb-6 black--text text--darken-2"
    >
      Verification Email Sent
    </h2>
    <p
      class="text-body-1 grey--text text--darken-2 mb-8 line-height-relaxed"
    >
      Please check your inbox at
      <b class="black--text font-weight-semibold">{{ form.email }}</b>
      and click "Verify" to continue. Email verification is required to
      submit your program.
    </p>
    <v-btn
      color="primary"
      large
      block
      depressed
      class="rounded-md text-capitalize font-weight-semibold py-3"
      @click="$emit('continue')"
    >
      Continue
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    form: Object,
  },
};
</script>