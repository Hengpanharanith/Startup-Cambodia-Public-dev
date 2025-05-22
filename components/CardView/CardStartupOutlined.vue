<template>
  <v-card :to="to" class="card-startup-outlined" rounded="lg" outlined>
    <v-img :aspect-ratio="16 / 9" :src="thumbnail" alt="" contain></v-img>
    <v-card-title class="text-break body-1">
      <span class="line-clamp-2">{{ textTitle }} </span>
    </v-card-title>
    <v-card-subtitle class="text-secondary text-capitalize">
      <span>{{ $t("establishment_year") }}</span>
      <strong> {{ establishYear || $t("n_a") }} </strong> <br>
      <template v-if="!!incorporatedAt">
        <!-- <span class="px-1"></span> -->
        <span>{{ $t("incorporated_at") }}</span>
        <strong>{{ incorporatedAt }}</strong>
      </template>
    </v-card-subtitle>
    <v-divider class="my-0"></v-divider>
    <v-card-actions class="flex-column flex-md-row pa-4" style="gap: 1rem">
      <v-layout
        class="align-center overflow-hidden"
        style="gap: 0.5rem; max-height: 3.75rem"
        wrap
      >
        <small class="text-secondary text-uppercase text-nowrap">
          {{ $t("biz_model") }}:
        </small>
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
        <small class="text-secondary" v-show="noModel">{{ $t("n_a") }}</small>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>
<script>
import FormReportProfile from "@/components/Form/Report/FormReportProfile";
export default {
  name: "CardStartupOutlined",
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
    textTitle: String,
    incorporatedAt: String,
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
  },
};
</script>
<style lang="scss" scoped>
.card-startup-outlined {
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
