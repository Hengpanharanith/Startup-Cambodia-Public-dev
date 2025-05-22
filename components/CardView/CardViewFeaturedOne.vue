<template>
  <v-card class="blog-one__single" rounded="lg">
    <div class="d-flex flex-md-row">
      <v-avatar class="ma-3" size="125" rounded="lg">
        <v-img :src="profile.logo || profile.profile || thumbnail"></v-img>
      </v-avatar>
      <div>
        <v-card-title class="text-h5">
          {{ profile.name }}
        </v-card-title>

        <!-- <v-card-text v-if="profile.year_of_establishment">
          Year of establishment
          <v-icon> mdi-dots-horizontal </v-icon>
          <v-chip class="ma-2" color="#FEEBCA" small>
            {{ profile.year_of_establishment }}
          </v-chip>
        </v-card-text> -->

        <v-card-text class="text-center">
          <span v-for="(s, index) in profile.industry" v-bind:key="s.id">
            <template v-if="index <= 2">
              <!-- <v-chip class="ma-2" color="#FEEBCA" small v-if="index == 2">
                <v-icon> mdi-dots-horizontal </v-icon>
              </v-chip> -->
              <v-chip class="ma-2 px-2" color="#FEEBCA" small>
                {{ s.name }}
              </v-chip>
            </template>
            <!-- <template v-if="index == 2">
              <v-chip class="ma-2" color="#FEEBCA" small>
                <v-icon> mdi-dots-horizontal </v-icon>
              </v-chip>
            </template> -->
          </span>
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "CardViewFeaturedOne",
  props: {
    profile: { type: Object, default: () => ({}) },
    thumbnail: { type: String, default: "/images/default-image.png" },
  },
};
</script>