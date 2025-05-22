<template>
  <v-card
    :dark="dark"
    :color="color"
    class="card-hero fill-height"
    rounded="lg"
    flat

  >
    <v-card-text class="subtitle text-center py-0" v-if="thumbnail">
      <br />
      <br />
      <br />
      <v-img :src="thumbnail" max-height="250" contain />
    </v-card-text>
    <v-card-title class="title">
      {{ title }}
    </v-card-title>
    <v-card-text class="subtitle text-center" :class="textClass">
      {{ subtitle }}
    </v-card-text>
    <v-overlay absolute :value="loading" opacity="0.2">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
    <br />
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
    subtitle: String,
    loading: Boolean,
    dark: Boolean,
    color: String,
    thumbnail: String,
    textClass: String,
  },
};
</script>

<style lang="scss">
.v-card.card-hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  .v-card__title.title {
    font-size: 1.75rem !important;
    line-height: 1.25;
    word-break: keep-all;
    font-weight: 600;
  }
  .subtitle {
    font-size: 1.25rem;
    line-height: 1.25;
  }
}
</style>
