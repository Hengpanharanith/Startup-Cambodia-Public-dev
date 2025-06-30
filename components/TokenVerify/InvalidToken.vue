<template>
  <v-card class="invalid-token-card pa-6" elevation="3">
    <v-card-title class="text-h6 font-weight-bold text-error">
      Invalid or Expired Token
    </v-card-title>
    <v-card-text class="text-body-1 text--secondary">
      The token is invalid, expired, or already used. Please request a new one.
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="goHome">Go Home</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Redirects the user to the homepage.
 */

/*******  6e0bc2cb-e8b9-4a11-b854-1767feed0d77  *******/ const goHome = () => {
  window.location.href = "/";
};
</script>

<style scoped>
.invalid-token-card {
  border: 2px solid #ff4d4f;
  border-radius: 16px;
  background-color: #fff5f5;
}
</style>
