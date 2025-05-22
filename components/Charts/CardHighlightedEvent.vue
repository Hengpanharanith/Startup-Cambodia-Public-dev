<template>
  <v-card class="fill-height card-pie-chart d-flex flex-column" rounded="lg" elevation="0">
    <v-card-title class="justify-center text-center text-break text-uppercase">
      <h3>{{ $t("insight.program_event.event.highlight") }}</h3>
    </v-card-title>
    <v-card-text class="flex-fill d-flex flex-column pa-0 px-1">
      <template v-if="swiperItems.length">
        <client-only>
          <swiper-container
            pagination="true"
            pagination-clickable="true"
            slides-per-view="3"
            class="flex-fill"
            space-between="4"
          >
            <swiper-slide
              v-for="(subitems, idx) in swiperItems"
              :key="`item-${idx}`"
            >
              <v-layout
                class="flex-column fill-height pb-4"
                style="min-height: 250px"
              >
                <v-card
                  class="flex-fill d-flex mb-1"
                  v-for="(subitem, subIdx) in subitems"
                  :to="`/event/${subitem.id}`"
                  :img="subitem.image"
                  :key="`subitem-${idx}-${subIdx}`"
                  outlined
                  tile
                >
                  <v-overlay class="align-end" opacity="0.2" absolute>
                    <p
                      class="line-clamp-3 px-2 text-body-2 mt-auto"
                      style="line-height: 1.5"
                    >
                      {{ subitem.title }}
                    </p>
                  </v-overlay>
                </v-card>
              </v-layout>
            </swiper-slide>
          </swiper-container>
        </client-only>
      </template>
    </v-card-text>

    <v-overlay absolute :value="loading" opacity="0.2">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
    loading: Boolean,
    items: { type: Array, default: () => [] },
  },
  data() {
    return {
      chart: undefined,
    };
  },
  computed: {
    swiperItems() {
      if (!this.items.length) return [];

      const items = [[this.items[0]]];
      let tempIdx = 1;
      let tempCount = 2;
      while (tempIdx < this.items.length) {
        items.push(this.items.slice(tempIdx, tempIdx + tempCount));
        tempIdx += tempCount;
        if (tempCount === 2) {
          tempCount = 3;
        } else {
          tempCount = 2;
        }
      }
      return items;
    },
  },
  methods: {},
};
</script>

<style lang="scss">
.card-pie-chart {
  .total-count {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    gap: 8px;
    pointer-events: none;
  }
  .label {
    font-size: 0.75rem;
  }
}
</style>
