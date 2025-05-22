<template>
  <v-parallax
    :src="bannerUrl"
    height="250"
    class="headerParallax grey lighten-1"
    dark
  >
    <v-layout
      column
      align-center
      justify-center
      class="headerParallax__content pt-16 "
    >
      <h1 class="text-h4 mb-0 mt-8 text-shadow">{{ title }}</h1>
      <v-card-text
        style="max-width:768px"
        class="text-shadow text-center text-h6"
      >{{description}}</v-card-text>
      <v-breadcrumbs
        :items="breadcrumbItems"
        dark
      >
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            :to="item.to"
            :disabled="item.disabled"
            :class="{ 'font-weight-bolder': !item.disabled }"
            class="text-capitalize text-shadow"
            exact
          >
            <span class="mr-2">
              <v-icon v-show="item.homePage">mdi-home</v-icon>
            </span>
            <span class="white--text">{{ item.text }}</span>
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </v-layout>
  </v-parallax>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    title: String,
    description: String,
    bannerUrl: { type: String, default: "/images/home/startup-header.png" },
    breadcrumbItems: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    style() {
      return {
        background: `url(${this.bannerUrl})`,
        "background-size": "cover",
        "background-repeat": "no-repeat",
        "background-position": "center",
      };
    },
  },
};
</script>

<style>
.v-parallax.headerParallax .v-parallax__content {
  padding: 0;
}
.v-parallax.headerParallax .headerParallax__content {
  padding: 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}
.text-shadow {
  text-shadow: 1px 1px 2px rgba(17, 11, 11, 0.75);
}
</style>
