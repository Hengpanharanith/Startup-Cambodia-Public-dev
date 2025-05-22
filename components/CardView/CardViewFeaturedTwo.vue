<template>
  <v-card
    class="blog-one__single text-dark card-mentor pa-2 pointer"
    rounded="lg"
  >
    <v-avatar
      size="100"
      color="grey lighten-4"
    >
      <img
        :src="profile.profile || thumbnail"
        alt=""
      >
    </v-avatar>
    <v-card-title class="font-weight-normal line-clamp-2">{{ profile.first_name }} {{ profile.last_name }}</v-card-title>
    <v-card-subtitle class="font-weight-normal text-capitalize line-clamp-3"><small v-if="profile.role">{{ profile.role }}</small>
      <small v-if="profile.company">at {{ profile.company }}</small>
    </v-card-subtitle>
    <v-card-subtitle
      class="font-weight-normal"
      v-if="profile.expertise && profile.expertise.length"
    >
      <v-chip
        color="#FEEBCA"
        small
        v-for="s in profile.expertise"
        v-bind:key="s.id"
      >{{ s.name }}</v-chip>
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: "CardViewFeaturedTwo",
  props: {
    profile: { type: Object, default: () => ({}) },
    thumbnail: { type: String, default: "/images/default-image.png" },
  },
};
</script>