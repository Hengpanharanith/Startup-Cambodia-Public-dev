<template>
  <v-card
    :to="to"
    class="card-investor d-flex flex-column"
    rounded="lg"
    outlined
  >
    <v-layout class="fill-height">
      <div>
        <v-avatar :size="100" :tile="isCapital" class="d-block ma-4 mr-0">
          <img
            :src="thumbnailUrl"
            @error="onLoadImgError"
            :style="{ objectFit: isCapital ? 'contain' : 'cover' }"
          />
        </v-avatar>
      </div>
      <div
        class="d-flex flex-column flex-fill align-items-center justify-center flex-grow-0"
      >
        <v-card-title
          class="flex-fill line-clamp-2 font-weight-normal text-break"
          v-text="textTitle"
        />
        <div class="mb-2 px-4">
          <v-chip
            v-show="!!type?.name"
            color="success"
            class="font-weight-normal text-uppercase text-center"
            v-text="type?.name"
            outlined
            small
          />
        </div>

        <div class="mb-2 px-4">
          {{ $t("investment_stage") }}: {{ stage || $t("n_a") }}
        </div>

        <v-layout
          v-if="!!investmentStage.length"
          class="overflow-hidden px-4"
          style="gap: 0.5rem; max-height: 3.75rem"
          align-center
          wrap
        >
          <v-chip
            @click.stop.prevent="onClickStage(item)"
            v-for="item in investmentStage"
            :key="`stage-${item.key}`"
            class="font-weight-normal text-capitalize"
            color="orange lighten-4"
            v-html="item.name"
            small
          />
        </v-layout>
      </div>
    </v-layout>
    <template v-if="!!sectors.length">
      <v-divider></v-divider>
      <v-layout
        class="d-flex overflow-hidden pa-4 pt-2 overflow-hidden justify-center"
        style="gap: 0.5rem; max-height: 1rem"
        align-center
        justify-start
        wrap
      >
        <v-chip
          @click.stop.prevent="onClickIndustry(item)"
          v-for="item in sectors"
          :key="`sector-${item.name}`"
          class="font-weight-normal text-capitalize"
          color="orange lighten-4"
          v-html="item.name"
          small
        />
      </v-layout>
    </template>

    <FormReportProfile ref="formReport" />
  </v-card>
</template>

<script>
export default {
  name: "CardViewInvestor",
  props: {
    id: Number,
    to: String,
    textTitle: String,
    incorporatedAt: String,
    type: { type: Object, default: () => ({}) },
    investmentStage: { type: Array, default: () => [] },
    thumbnail: { type: String, default: "/images/default-image.png" },
    sectors: { type: Array, default: () => [] },
    stage: String,
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
    _showReportForm() {
      this.$refs.formReport.openForm(this.id, "investor");
    },
    onLoadImgError(e) {
      e.target.src = "/images/default-image.png";
    },
  },
};
</script>

<style lang="scss">
.card-investor {
  // transition: 200ms;
  &__thumbnail.fit-contain img {
    object-fit: contain;
  }
  transition: 200ms;
  &:hover {
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    transition: 200ms;
  }
  .badge.badge-custom {
    background-color: #fbc76759;
  }
}
</style>
