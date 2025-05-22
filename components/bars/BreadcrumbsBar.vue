<template>
  <v-toolbar
    height="auto"
    flat
    light
  >
    <v-container class="py-0">
      <v-breadcrumbs
        :items="breadcrumbItems"
        class="justify-lg-center px-0"
      >
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            :to="item.to"
            :disabled="item.disabled"
            :class="{ 'font-weight-bolder': !item.disabled }"
            class="text-capitalize"
            exact
          >
            <span class="mr-2">
              <v-icon v-show="item.homePage">mdi-home</v-icon>
            </span>
            <span class="text-secondary">{{ item.text }}</span>
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </v-container>
  </v-toolbar>
</template>

<script>
export default {
  name: "BreadcrumbsBar",
  props: {
    breadcrumbItems: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
</style>