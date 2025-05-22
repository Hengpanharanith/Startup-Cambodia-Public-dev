<template>
  <v-card
    :to="to"
    class="text-dark card-startup d-flex flex-column"
    rounded="lg"
    outlined
  >
    <v-tooltip
      v-model="show"
      left
    >

      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click.prevent.stop="_showReportForm"
          v-bind="attrs"
          v-on="on"
          absolute
          icon
          right
          top
        >
          <v-icon color="grey lighten-1">
            mdi-alert-circle-outline
          </v-icon>
        </v-btn>
      </template>
      <span>{{$t("report.form.label.suggestEdit")}}</span>
    </v-tooltip>
    <v-card-text class="text-center text-md-left flex-grow-1">

      <v-layout
        class="align-items-center align-md-start flex-column flex-md-row"
        style="gap: 0.5rem"
      >
        <v-avatar
          :size="150"
          tile
          class="d-block mx-auto my-4"
        >
          <v-img
            :src="thumbnail"
            alt=""
            contain
          />
        </v-avatar>
        <v-col class="pa-0">
          <v-card-title class="black--text font-weight-normal text-break justify-center justify-md-start"><span class="line-clamp-2">{{ textTitle }}</span></v-card-title>
          <v-card-subtitle class="text-secondary text-capitalize font-weight-light"><span>{{ $t("establishment_year") }}</span>
            <span class="font-weight-bold">{{establishYear || $t("n_a")}}</span>
          </v-card-subtitle>
          <template v-if="!!incorporatedAt">
            <v-card-subtitle class="text-secondary text-capitalize font-weight-light">
              <span>{{ $t("incorporated_at") }}</span>
              <span class="font-weight-bold">{{ incorporatedAt }}</span>
            </v-card-subtitle>
          </template>
        </v-col>
      </v-layout>
    </v-card-text>
    <v-divider class="my-0"></v-divider>
    <v-card-actions
      class="flex-column flex-md-row px- 4"
      style="gap: 1rem"
    >
      <v-layout
        class="align-center overflow-hidden"
        style="gap: 0.5rem; max-height:3.75rem"
        wrap
      >
        <small class="text-secondary text-uppercase text-nowrap">{{ $t("biz_model") }}:</small>
        <v-chip
          @click.stop.prevent="clickModel(item)"
          v-for="(item, key) in models"
          v-show="item.name"
          :key="`business-model-${key}`"
          class="font-weight-normal text-uppercase"
          color="orange lighten-4"
          small
        >{{ item.name }}</v-chip>
        <small
          class="text-secondary"
          v-show="noModel"
        >{{ $t("n_a") }}</small>
      </v-layout>
    </v-card-actions>
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
<style lang="scss">
.card-startup {
  transition: 200ms;
  &:hover {
    transform: scale(1.02);
    transition: 200ms;
    cursor: pointer;
  }
}
</style>

