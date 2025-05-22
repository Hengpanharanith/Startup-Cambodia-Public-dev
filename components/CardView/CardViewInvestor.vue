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
            right
            top
            icon
          >
            <v-icon color="grey lighten-1">
              mdi-alert-circle-outline
            </v-icon>
          </v-btn>
        </template>
        <span>{{$t("report.form.label.suggestEdit")}}</span>
      </v-tooltip>
      <v-card-text class="flex-grow-1">
        <v-layout
          column
          wrap
          align-center
          class="flex-md-row"
        >
          <v-avatar
            :size="100"
            :tile="isCapital"
          >
            <v-img
              :src="thumbnailUrl"
              :contain="isCapital"
            />
          </v-avatar>
          <v-col class="ml-3 d-flex flex-column align-items-center justify-center">
            <v-card-title class="line-clamp-2 font-weight-normal text-break text-center text-md-start">{{textTitle}}</v-card-title>
            <v-card-subtitle
              class="font-weight-normal text-center text-md-start"
              v-show="!!incorporatedAt"
            >{{ $t("incorporated_at") }} {{ incorporatedAt }}</v-card-subtitle>
          </v-col>
          <v-col
            class="ml-3 d-flex justify-center"
            v-if="type && type.name"
          >
<!--            <v-card-subtitle class="text-secondary font-weight-normal mb-2">{{-->
<!--                $t("investor_type")-->
<!--              }}</v-card-subtitle>-->
            <!-- @click.stop.prevent="onClickType" -->
            <v-chip
              color="success"
              class="font-weight-normal text-uppercase mb-2 text-center"
              outlined
              small

            >{{ type.name }}</v-chip>
          </v-col>
        </v-layout>
      </v-card-text>
      <v-divider class="my-0"></v-divider>
      <v-card-actions
        class="flex-column flex-md-row px-4"
        style="gap: 1rem;"
      >
        <v-layout
          class="overflow-hidden"
          style="gap: 0.5rem; max-height:3.75rem"
          align-center
          justify-start
          wrap
        >
          <small class="text-uppercase">{{ $t("sector") }}:</small>
          <v-chip
            @click.stop.prevent="onClickIndustry(item)"
            v-for="item in sectors"
            :key="`sector-${item.name}`"
            class="font-weight-normal text-capitalize"
            color="orange lighten-4"
            small
          >{{ item.name }}</v-chip>
          <small
            class="text-secondary"
            v-show="noSector"
          >{{$t("n_a")}}</small>
        </v-layout>
        <v-layout
          v-if="!!investmentStage.length"
          class="overflow-hidden"
          style="gap: 0.5rem; max-height:3.75rem"
          align-center
          wrap
        >
          <small class="text-uppercase text-no-wrap">{{ $t("investment_stage") }}:</small>
          <v-chip
            @click.stop.prevent="onClickStage(item)"
            v-for="item in investmentStage"
            :key="`stage-${item.key}`"
            class="font-weight-normal text-capitalize"
            color="orange lighten-4"
            small
          >{{ item.name || $t("n_a") }}</v-chip>
        </v-layout>
      </v-card-actions>
    </v-layout>
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
    thumbnailUrl(){
      if(this.thumbnail && this.thumbnail != ""){
        return this.thumbnail
      }else{
        return "/images/default-image.png";
      }
    }
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
