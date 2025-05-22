<template>
  <v-expand-transition>
    <v-card
      v-if="visible"
      color="transparent"
      flat
    >
      <v-img
        max-width="300"
        src="/images/Item Not Found.png"
        alt="Not Found"
        class="d-block mx-auto"
      ></v-img>
    </v-card>
  </v-expand-transition>
</template>

<script>
export default {
  name: "CardNoItem",
  props: {
    visible: Boolean,
  },
};
</script>

<style>
</style>