<template>
  <v-card :to="to" class="card-investor-outlined" rounded="lg" outlined>
    <v-layout class="fill-height" column>
      <v-card-text>
        <v-layout class="flex-grow-0">
          <v-avatar :size="100" :tile="isCapital" class="mx-auto" tile>
            <v-img :src="thumbnailUrl" :contain="isCapital" contain/>
          </v-avatar>
          <v-layout column>
            <v-card-title class="line-clamp-2 body-1 text-break">
              {{ textTitle }}
            </v-card-title>
            <v-card-subtitle v-show="!!incorporatedAt" class="pb-2">
              <span class="text--secondary">
                {{ $t("incorporated_at") }}:
              </span>
              <strong>{{ incorporatedAt }}</strong>
            </v-card-subtitle>
            <v-card-subtitle v-if="type && type.name" class="py-0">
              <v-chip color="success" class="text-uppercase" label small>
                {{ type.name }}
              </v-chip>
            </v-card-subtitle>
          </v-layout>
        </v-layout>
      </v-card-text>
      <v-spacer></v-spacer>
      <v-divider class="my-0"></v-divider>
      <v-card-text class="py-2">
        <template v-if="noSector">
          <span class="text-uppercase ma-1 ml-0">{{ $t("sector") }}:</span>
          <span class="text-secondary">{{ $t("n_a") }} </span>
        </template>
        <v-chip-group v-else style="max-height: 72px" disabled column>
          <span class="text-uppercase ma-1 ml-0">{{ $t("sector") }}:</span>
          <v-chip
            @click.stop.prevent="onClickIndustry(item)"
            v-for="item in sectors.slice(0, 2)"
            :key="`sector-${item.name}`"
            class="font-weight-normal text-capitalize flex-shrink-0"
            color="orange lighten-4"
            small
          >
            {{ item.name }}
          </v-chip>
          <v-chip v-if="sectors.length - 2>0"  class="font-weight-normal text-capitalize flex-shrink-0"
            color="orange lighten-4"
            small>
            +{{ sectors.length - 2 }} {{ $t('others') }}
          </v-chip>
        </v-chip-group>
        <template v-if="!!investmentStage.length">
          <v-chip-group style="max-height: 72px" disabled column>
            <span class="text-uppercase ma-1 ml-0">
              {{ $t("investment_stage") }}:
            </span>
            <v-chip
              @click.stop.prevent="onClickStage(item)"
              v-for="item in investmentStage.slice(0, 2)"
              :key="`stage-${item.key}`"
              class="font-weight-normal text-capitalize"
              color="orange lighten-4"
              small
            >
              {{ item.name || $t("n_a") }}
            </v-chip>
            <v-chip v-if="investmentStage.length - 2>0"  class="font-weight-normal text-capitalize flex-shrink-0"
            color="orange lighten-4"
            small>
            +{{ investmentStage.length - 2 }} {{ $t('others') }}
          </v-chip>
          </v-chip-group>
        </template>
      </v-card-text>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: "CardViewInvestorCompact",
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
.card-investor-outlined {
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
