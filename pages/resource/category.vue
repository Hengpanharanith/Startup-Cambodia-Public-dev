<template>
  <div style="position: relative">
    <PageHeader v-bind:bannerUrl="bannerUrl" />
    <nuxt />
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  head: { title: "Resources" },
  layout: "common",

  data() {
    return {
      bannerUrl:
        "https://media.startupcambodia.gov.kh/platform/public-assets/banners/resource.png",
    };
  },
  async fetch() {
    await this.getIndustries({ params: { page_size: 999 } });
  },
  methods: {
    ...mapActions("industry", { getIndustries: "get" }),
  },
};
</script>
<style scoped></style>
