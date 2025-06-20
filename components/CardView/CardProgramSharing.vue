<template>
  <v-card
    id="program-suggest"
    class="pa-2 mt-5 rounded-lg d-flex flex-column"
    height="240"
    style="
      background-image: url('/images/ps-bg.svg');
      background-size: cover;
      background-position: center;
    "
    elevation="0"
  >
    <v-card-title class="white--text">
      <div>
        <div class="text-h6 font-weight-black mt-0">
          {{ $t("programSharing.suggestTitle") }}
        </div>
        <div
          class="subtitle-responsive text-subtitle-2 mt-2 font-weight-regular"
          :style="{ width: $i18n.locale === 'km' ? '212px' : '200px' }"
        >
          {{ $t("programSharing.suggestDescription") }}
        </div>
      </div>
    </v-card-title>

    <v-spacer></v-spacer>

    <v-card-actions>
      <v-btn
        elevation="1"
        @click="gotoForm"
        v-ripple="{ class: 'custom-ripple' }"
        class="rounded-lg text-decoration-none"
        width="100%"
      >
        <span class="submit-btn font-weight-bold">
          {{ $t("programSharing.submitBtn") }}
        </span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "CardProgramSharing",
  methods: {
    gotoForm() {
      this.$router.push({
        name: "program",
        query: { ...this.$route.query, showForm: "true" },
      });
    },
  },
};
</script>
<style>
.submit-btn {
  background: linear-gradient(90deg, #f07900, #ffa500);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  display: inline-block;
  text-transform: none;
}
.inner-shadow-btn {
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.25);
}
</style>
