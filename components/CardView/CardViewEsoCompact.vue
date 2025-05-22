<template>
  <v-card class="eso-card" :to="to" outlined rounded="lg" :title="textTitle">
    <v-img :aspect-ratio="16 / 9" :src="cover" class="card-cover" />
    <div style="margin-top: -32px">
      <v-avatar class="card-avatar bordered elevation" size="64" bordered>
        <v-img :src="thumbnail" />
      </v-avatar>
      <v-card-title class="py-2 line-clamp-1">
        {{ textTitle }}
      </v-card-title>
      <v-card-subtitle v-show="!!incorporatedAt" class="py-2">
        <span class="text--secondary"> {{ $t("incorporated_at") }}: </span>
        <strong>{{ incorporatedAt }}</strong>
      </v-card-subtitle>

      <v-card-text v-if="description" class="pt-0">
        <div class="line-clamp-3">{{ description }}</div>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "CardViewEsoCompact",
  props: {
    id: Number,
    to: String,
    textTitle: String,
    description: String,
    incorporatedAt: String,
    type: { type: Object, default: () => ({}) },
    investmentStage: { type: Array, default: () => [] },
    cover: String,
    thumbnail: { type: String, default: "/images/default-image.png" },
    sectors: { type: Array, default: () => [] },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    noSector() {
      return !this.sectors.length;
    },
    hasStage() {
      return this.investmentStage.length;
    },
    isCapital() {
      return this.type == "capital";
    },
    thumbnailUrl() {
      if (this.thumbnail && this.thumbnail != "") {
        return this.thumbnail;
      } else {
        return "/images/default-image.png";
      }
    },
  },
  methods: {
    onClickStage(item) {
      this.$emit("click-stage", item);
    },
    onClickIndustry(item) {
      this.$emit("click-industry", item);
    },
    onClickType() {
      this.$emit("click-type", this.type);
    },
  },
};
</script>

<style lang="scss" scoped>
.eso-card {
  transition: 200ms;
  &:hover {
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    transition: 200ms;
  }
  .card-avatar {
    border: 2px solid #e9e9e9;
    margin-left: 1rem;
    background-image: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  }

  .card-cover {
    background-image: linear-gradient(135deg, #2b74e1 0%, #a406ff 100%);
  }
}
</style>
