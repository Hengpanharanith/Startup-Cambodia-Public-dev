<template>
  <v-toolbar
    class="position-sticky network-navbar border-bottom border-top"
    flat
  >
    <v-container>
      <v-spacer></v-spacer>
      <v-btn
        v-for="{ to, text } in networkCategories"
        :active="currentRoute == to"
        :to="to"
        :key="to"
        text
      >{{ text }}</v-btn>
    </v-container>
  </v-toolbar>
</template>

<script>
export default {
  name: "NetworkSubNavbar",
  computed: {
    networkCategories() {
      return [
        { to: "/ecosystem/", text: "Overview" },
        { to: "/ecosystem/discover/category/startup", text: "Startup" },
        { to: "/ecosystem/discover/category/mentor", text: "Mentor" },
        { to: "/ecosystem/discover/category/investor", text: "Investor" },
        { to: "/ecosystem/discover/category/eso", text: "ESO" },
        {
          to: "/ecosystem/discover/category/academic-institution",
          text: "Academic Institution",
        },
        {
          to: "/ecosystem/discover/category/co-working-space",
          text: "Co-Working Space",
        },
        {
          to: "/ecosystem/discover/category/community-and-association",
          text: "Community & Association",
        },
        { to: "/ecosystem/discover/category/corporate", text: "Cooperate" },
        {
          to: "/ecosystem/discover/category/development-partner",
          text: "Development Partner ",
        },
        {
          to: "/ecosystem/discover/category/government-institution",
          text: "Government Institution",
        },
        {
          to: "/ecosystem/discover/category/incubator-and-accelerator",
          text: "Incubator & Accelerator",
        },
        {
          to: "/ecosystem/discover/category/service-provider",
          text: "Service Provider",
        },
      ];
    },
    currentRoute() {
      const { path } = this.$route;
      return path;
    },
  },
};
</script>

<style scoped>
.network-navbar {
  /* z-index below main navigation overlay */
  z-index: 1;
  padding: 0;
  top: 73.13px;
  background-color: white;
}
</style>
