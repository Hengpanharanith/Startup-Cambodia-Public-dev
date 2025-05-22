<template>
  <v-card
    :to="to"
    class="text-dark card-startup d-flex flex-column"
    rounded="lg"
    outlined
    elevation="0"
  >
    <v-tooltip v-model="show" left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click.prevent.stop="_showReportForm"
          v-bind="attrs"
          v-on="on"
          style="top: 0; right: 0"
          absolute
          icon
        >
          <v-icon color="grey lighten-1"> mdi-alert-circle-outline </v-icon>
        </v-btn>
      </template>
      <span>{{ $t("report.form.label.suggestEdit") }}</span>
    </v-tooltip>
    <v-layout>
      <v-avatar :size="96" class="d-block ma-4 mr-0" tile>
        <img
          :src="thumbnail"
          @error="onLoadImgError"
          alt=""
          style="object-fit: contain"
        />
      </v-avatar>
      <div class="flex-fill d-flex flex-column">
        <v-card-title
          class="black--text font-weight-normal text-break flex-fill"
        >
          <span class="line-clamp-2">{{ title }} </span>
        </v-card-title>
        <div class="px-4">
          <p class="text-secondary text-capitalize font-weight-light mb-2">
            <span>{{ $t("establishment_year") }}</span>
            <span class="font-weight-bold">
              {{ establishYear || $t("n_a") }}
            </span>
          </p>
          <p class="text-secondary text-capitalize font-weight-light mb-2">
            <span>{{ $t("biz_model") }}:</span>
            <span class="font-weight-bold">
              {{ bizModel || $t("n_a") }}
            </span>
          </p>
        </div>
      </div>
    </v-layout>
    <v-layout
      class="align-center overflow-hidden pa-4 pt-2"
      style="gap: 0.5rem; max-height: 1rem"
      v-if="models.length"
      wrap
    >
      <v-chip
        @click.stop.prevent="clickModel(item)"
        v-for="(item, key) in models"
        v-show="item.name"
        :key="`business-model-${key}`"
        class="font-weight-normal text-uppercase"
        color="orange lighten-4"
        small
      >
        {{ item.name }}
      </v-chip>
    </v-layout>
    <FormReportProfile ref="formReport" />
  </v-card>
</template>
<script>
import FormReportProfile from "@/components/Form/Report/FormReportProfile";
export default {
  components: { FormReportProfile },
  data() {
    return {
      show: false,
    };
  },
  props: {
    id: Number,
    to: { type: String, default: "" },
    stage: Object,
    title: String,
    incorporatedAt: String,
    bizModel: String,
    establishYear: [String, Number],
    models: { type: Array, default: () => [] },
    thumbnail: { type: String, default: "/images/default-image.png" },
    sectors: { type: Array, default: () => [] },
  },
  computed: {
    noSector() {
      return !this.sectors.length;
    },
    noModel() {
      return !this.models.length;
    },
    stages() {
      return {
        pre_seed: { id: "pre_seed", name: "Pre Seed" },
        seed: { id: "seed", name: "Seed" },
        pre_series_a: { id: "pre_series_a", name: "Pre Series A" },
        series_a: { id: "series_a", name: "Series A" },
        series_b: { id: "series_b", name: "Series B" },
        series_c: { id: "series_c", name: "Series C" },
      };
    },
    fundingStage() {
      return this.stages[this.stage] || { id: this.stage, name: this.stage };
    },
  },
  methods: {
    clickStage() {
      this.$emit("click-stage", this.stage);
    },
    clickSector(item) {
      this.$emit("click-industry", item);
    },
    clickModel(item) {
      this.$emit("click-model", item);
    },
    _showReportForm() {
      this.$refs.formReport.openForm(this.id, "startup");
    },
    onLoadImgError(e) {
      e.target.src = "/images/default-image.png";
    },
  },
};
</script>
<style lang="scss">
.card-startup {
  transition: 200ms;
  .v-card__title {
    line-height: 1.25;
  }
  &:hover {
    transform: scale(1.02);
    transition: 200ms;
    cursor: pointer;
  }
}
</style>
