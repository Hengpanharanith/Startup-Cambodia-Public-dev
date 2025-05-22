<template>
  <v-card :to="to" class="card-stakeholder-outlined" rounded="lg" outlined>
    <v-layout column class="fill-height">
      <v-card-text class="flex-grow-1 pb-0">
        <v-layout class="gap">
          <div class="flex-grow-0 flex-shrink-0">
            <v-img
              :src="thumbnail"
              class="mb-2"
              height="75"
              width="75"
              contain
            />
          </div>
          <v-col class="pa-0">
            <v-card-title class="text-break pt-0">
              <span class="line-clamp-2">{{ title }}</span>
            </v-card-title>
           
            <v-card-subtitle class="py-3">
              <span class="mr-2 text-uppercase">
                {{ $t("establishment_year") }}:
              </span>
              <strong class="text-secondary">
                {{ establishYear ? $localeNumb(establishYear) : $t("n_a") }}
              </strong> <br>
              <span class="mr-2 text-uppercase">
                {{ $t("date_corporate") }}:
              </span>
              <strong class="text-secondary">
                {{ cooperateDate ? $localeNumb(cooperateDate) : $t("n_a") }}
              </strong>
            </v-card-subtitle>

            <!-- <v-card-subtitle class="pt-2">
              <div class="line-clamp-3">{{ descriptor }}</div>
            </v-card-subtitle> -->
          </v-col>
        </v-layout>
      </v-card-text>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: "CardViewStakeholder",
  props: {
    id: Number,
    to: String,
    type: { type: String, default: "" },
    title: String,
    descriptor: String,
    cooperateDate: String,
    establishYear: [String, Number],
    sectors: { type: Array, default: () => [] },
    thumbnail: { type: String, default: "/images/default-image.png" },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {},
  methods: {
    onClickStage(item) {
      this.$emit("click-stage", item);
    },
    onClickIndustry(item) {
      this.$emit("click-industry", item);
    },
  },
};
</script>

<style lang="scss">
.card-stakeholder-outlined {
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
