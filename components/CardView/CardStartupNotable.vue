<template>
  <v-card class="card-notable-startup rounded" rounded="lg" :to="url" outlined>
    <div style="background-color: whitesmoke" class="pa-4">
      <v-img :src="logo" :alt="name" height="150" contain />
    </div>
    <v-card-title class="justify-center text-center" v-text="name" />
  </v-card>
</template>
<script>
export default {
  name: "CardStartupNotable",
  props: {
    id: [String, Number],
    name: String,
    logo: { type: String },
  },
  computed: {
    url() {
      return `/ecosystem/discover/category/startup/${this.id}`;
    },
  },
};
</script>
<style lang="scss">
.card-notable-startup {
  transition: 200ms;
  &:hover {
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    transition: 200ms;
  }
}
</style>
