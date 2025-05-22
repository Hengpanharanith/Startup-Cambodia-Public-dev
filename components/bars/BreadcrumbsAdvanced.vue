<template>
  <v-card class="custom-shadow" rounded="lg">
    <v-container>
      <v-layout class="gap" align-center wrap>
        <v-breadcrumbs :items="breadcrumbItems" class="py-2 pl-0">
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
        <slot name="right"></slot>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "BreadcrumbsAdvanced",
  props: {
    breadcrumbItems: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style></style>
