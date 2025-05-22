<template>
  <v-card class="custom-shadow" rounded="lg">
    <v-container class="pa-0">
      <v-card-title v-if="title" class="pb-0">{{ title }} </v-card-title>
      <v-breadcrumbs :items="breadcrumbItems">
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
  </v-card>
</template>

<script>
export default {
  name: "BreadcrumbsTitle",
  props: {
    title: String,
    breadcrumbItems: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style></style>
