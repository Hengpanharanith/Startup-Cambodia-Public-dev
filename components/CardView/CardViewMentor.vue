<template>
  <v-card
    :to="to"
    class="custom-shadow text-dark card-mentor-outlined text-center"
    body-class="text-center"
    rounded="lg"
    outlined
  >
    <v-card-text>
      <v-avatar :size="100" class="d-block mx-auto my-4" color="grey lighten-4">
        <v-img :src="thumbnail" />
      </v-avatar>
    </v-card-text>
    <v-card-title
      class="font-weight-normal text-capitalize text-break line-clamp-2 justify-center"
      >{{ fullName }}</v-card-title
    >
    <v-card-subtitle>{{ jobDescription }}</v-card-subtitle>
    <v-card-text class="flex-grow-1 py-0"></v-card-text>
    <v-card-subtitle class="font-weight-normal py-0">{{
      $t("expertise")
    }}</v-card-subtitle>
    <v-card-actions
      class="pa-4 align-center justify-center flex-wrap overflow-hidden"
      style="gap: 0.5rem; max-height: 5rem"
    >
      <v-chip
        @click.stop.prevent="onClickTag(item)"
        v-for="item in expertise"
        :key="`sector-${item.name}`"
        class="font-weight-normal text-capitalize"
        color="orange lighten-4"
        small
        ><span class="text-truncate">{{ item.name }}</span></v-chip
      >
      <span class="text-secondary" v-show="noExpertise">{{ $t("n_a") }}</span>
    </v-card-actions>
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
    noExpertise() {
      return !this.expertise.length;
    },
    jobDescription() {
      const { position, company } = this;
      if (position && company) return `${position} at ${company}`;
      return position || company || "-";
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
