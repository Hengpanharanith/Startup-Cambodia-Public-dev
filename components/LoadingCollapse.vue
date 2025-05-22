<template>
  <v-expand-transition>
    <v-layout
      v-if="visible"
      justify-center
      align-center
    >
      <v-progress-linear
        style="width: 150px;"
        class="mb-6 mt-2"
        buffer-value="0"
        height="10"
        reverse
        stream
      ></v-progress-linear>
    </v-layout>
  </v-expand-transition>
</template>

<script>
export default {
  name: "LoadingCollapse",
  props: {
    visible: Boolean,
  },
};
</script>

<style>
</style>