<template>
  <v-card
    :to="to"
    class="custom-shadow text-dark card-mentor-outlined text-center align-center"
    body-class="text-center"
    rounded="lg"
    outlined
  >
    <div>
      <v-avatar :size="100" class="d-block mx-auto my-4" color="grey lighten-4">
        <v-img :src="thumbnail" />
      </v-avatar>
    </div>
    <v-card-title
      class="font-weight-normal text-capitalize text-break line-clamp-2 justify-center pb-2"
    >
      {{ fullName }}
    </v-card-title>
    <v-card-text>
      <span>{{ position }}</span>
      <br />
      <span>{{ company }}</span>
    </v-card-text>
    <div>
      <v-layout
        class="px-4 pb-2 justify-center overflow-hidden"
        style="gap: 0.5em; height: 1rem"
        wrap
      >
        <v-chip
          @click.stop.prevent="onClickTag(item)"
          v-for="item in expertiseList"
          :key="`sector-${item.name}`"
          class="font-weight-normal text-capitalize flex-shrink-0"
          color="orange lighten-4"
          small
        >
          <span class="text-truncate">{{ item.name }}</span>
        </v-chip>
      </v-layout>
    </div>
  </v-card>
</template>
<script>
export default {
  name: "CardViewMentor",
  data() {
    return {
      show: false,
    };
  },
  props: {
    id: Number,
    to: { type: String, default: "" },
    fullName: String,
    position: String,
    company: String,
    interest: String,
    expertise: { type: Array, default: () => [] },
    thumbnail: { type: String, default: "/images/default-user.png" },
  },
  computed: {
    expertiseList() {
      if (!this.expertise?.length) return [];
      return [this.expertise[0]];
    },
  },
  methods: {
    onClickTag(item) {
      this.$emit("click-expertise", item);
    },
  },
};
</script>

<style lang="scss">
.card-mentor-outlined {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  transition: 200ms;
  &:hover {
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    transition: 200ms;
  }
  .v-image {
    margin-top: -1px;
  }
}
</style>
