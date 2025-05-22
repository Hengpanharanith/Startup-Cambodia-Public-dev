<template >
  <v-app>
    <div v-if="$nuxt.isOffline">You are offline</div>
    <div v-else>
      <MainNavbar :nav-menu="navMenu" />

      <nuxt />

    </div>
  </v-app>
</template>

<script>
import "vue-loading-overlay/dist/vue-loading.css";

export default {


  head() {
    return {
      title: "Startup Cambodia",
    };
  },
  computed: {
    navMenu() {
      return [
        { text: this.$t("programs"), to: "/program" },
        { text: this.$t("event.title"), to: "/event" },
        { text: this.$t("ecosystem"), to: "/ecosystem" },
        { text: this.$t("resource"), to: "/resource/category/blog" },
        { text: this.$t("about"), to: "/about" },
        { text: this.$t("contact"), to: "/contact" },
      ];
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
  },
};
</script>
