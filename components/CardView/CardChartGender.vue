<template>
  <v-card class="card-gender fill-height d-flex flex-column" rounded="lg" elevation="0">
    <v-card-title class="justify-center text-break text-uppercase">
      <h3>{{ title }}</h3>
    </v-card-title>
    <v-card-text class="subtitle text-center my-auto">
      <v-card color="#D5EBFE" rounded="lg" flat>
        <v-card-text>
          <v-rating
            :length="5"
            :size="64"
            :value="ratingValue"
            active-color="#C0C7FF"
            empty-icon="mdi-account-tie"
            full-icon="mdi-account-tie-woman"
            readonly
          />
        </v-card-text>
      </v-card>
      <div
        class="counter__title my-4"
        v-html="
          $t('insight.mentor.female_count', {
            percentage: $localeNumb(percentage),
            total: $localeNumb(total),
          })
        "
      />
    </v-card-text>
    <v-overlay absolute :value="loading" opacity="0.2">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
import { count } from "d3";

export default {
  props: {
    title: String,
    subtitle: String,
    loading: Boolean,
    dark: Boolean,
    color: String,
    total: { type: Number, default: 0 },
    femaleCount: { type: Number, default: 0 },
  },
  computed: {
    percentage() {
      if (!this.total) return 0;
      return +((this.femaleCount / this.total) * 100).toFixed(2);
    },
    ratingValue() {
      if (!this.total) return 0;
      return Math.ceil((this.femaleCount / this.total) * 5);
    },
  },
};
</script>

<style lang="scss">
.v-card.card-gender {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .counter__title {
    color: #2e3d62dd;
    line-height: 1.5;
    font-size: 1.5em;
  }
}
</style>
