<template>
  <v-card
    :to="to"
    class="card-investor"
    rounded="lg"
    outlined
  >
    <v-layout
      class="fill-height"
      column
    >
      <v-card-text class="flex-grow-1">
        <v-layout
          align-center
          column
          wrap
        >
          <v-avatar
            :size="100"
            :tile="isCapital"
            color="grey"
          >
            <v-img
              :src="thumbnail"
              :contain="isCapital"
            />
          </v-avatar>
        </v-layout>
      </v-card-text>
      <v-card-title class="line-clamp-2 font-weight-normal text-break justify-center text-center">{{textTitle}}</v-card-title>
      <v-card-subtitle
        v-show="!incorporatedAt"
        class="text-center text--secondary py-2"
      >{{ $t("incorporated_at") }} {{ incorporatedAt }}</v-card-subtitle>
      <template v-if="hasSectors">
        <v-card-actions
          class="flex-column flex-md-row px-4"
          style="gap: 1rem;"
        >
          <v-layout
            class="overflow-hidden"
            style="gap: 0.5rem; max-height:3.75rem"
            justify-center
            align-center
            wrap
          >
            <v-chip
              v-for="item in sectors"
              :key="`sector-${item.name}`"
              class="font-weight-normal text-capitalize"
              color="orange lighten-4"
              small
            >{{ item.name }}</v-chip>
          </v-layout>
        </v-card-actions>
      </template>
    </v-layout>
    <FormReportProfile ref="formReport" />
  </v-card>

</template>

<script>
export default {
  name: "CardViewInvestorVertical",
  props: {
    id: Number,
    to: String,
    textTitle: String,
    incorporatedAt: String,
    investmentStage: { type: Array, default: () => [] },
    thumbnail: { type: String, default: "/images/default-image.png" },
    sectors: { type: Array, default: () => [] },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    hasSectors() {
      return !!this.sectors.length;
    },
    hasStage() {
      return this.investmentStage.length;
    },
    hasType() {
      return this.type?.name;
    },
    isCapital() {
      return this.type == "capital";
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
  },
};
</script>

<style lang="scss">
.card-investor {
  transition: 200ms;
  &__thumbnail.fit-contain img {
    object-fit: contain;
  }
  &:hover {
    transform: scale(1.02);
    transition: 200ms;
  }
  .badge.badge-custom {
    background-color: #fbc76759;
  }
}
</style>
