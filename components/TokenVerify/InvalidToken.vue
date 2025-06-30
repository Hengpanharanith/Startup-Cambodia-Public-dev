<template>
  <v-card class="invalid-token-card pa-6" elevation="3">
    <v-card-title class="text-h6 font-weight-bold text-error primary--text">
      Invalid or Expired Token
    </v-card-title>
    <v-card-text class="text-subtitle-1 text--secondary">
      Oops! It looks like your verification link has expired or is no longer
      valid. Please resubmit your program to get a new one.
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn large color="primary" @click="goHome">Go Home</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const goHome = () => {
  window.location.href = "/";
};
</script>

<style scoped>
.invalid-token-card {
  align-items: center;
  border: 2px solid color-primary;
  border-radius: 16px;
  background-color: #fff5f5;
  height: auto;
  max-width: 500px;
}
</style>
