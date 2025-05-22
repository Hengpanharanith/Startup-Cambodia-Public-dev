<template>
  <div>
    <v-list-item
        :to="to"
        three-line
    >
      <v-list-item-avatar
          color="grey lighten-4"
          rounded
      >
        <v-img
            :src="thumbnail"
            alt=""
        />
      </v-list-item-avatar>
      <v-list-item-content class="search-item">
        <v-list-item-title>{{title}}</v-list-item-title>
        <v-list-item-subtitle v-html="description"></v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-icon class="my-auto">
        <v-icon>mdi-chevron-right</v-icon>
      </v-list-item-icon>

    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  name: "SearchResultItem",
  props: {
    title: String,
    description: String,
    thumbnail: String,
    to: String,
  },
};
</script>

<style lang="sass">
.search-item .v-list-item__subtitle p
  margin: 0
</style>
