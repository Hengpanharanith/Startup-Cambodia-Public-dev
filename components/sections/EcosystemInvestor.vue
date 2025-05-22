<template>
  <v-container>
    <h1 class="text-center my-4">Investor Funding Sources</h1>
    <!-- <v-row>
      <v-col>
        <CardPieChart title="EXTERNAL INVESTMENT FUND" />
      </v-col>
      <v-col>
        <CardPieChart title="STARTUP PROGRAMS SUPPORTED FUND" />
      </v-col>
      <v-col>
        <CardPieChart title="CAMBODIA DIGITAL AWARDS" />
      </v-col>
    </v-row> -->
    <br />
    <client-only>
      <v-card elevation="0">
        <!-- <v-card-title
          class="tex-break text-uppercase justify-center text-center"
        >
          <h3>{{ $t("insight.mentor.featured") }}</h3>
        </v-card-title> -->
        <template v-if="items.length">
          <client-only>
            <swiper-container
              pagination="true"
              pagination-clickable="true"
              :slides-per-view="items.length > 4 ? 4 : items.length"
              autoplay-delay="2500"
              class="flex-fill"
              space-between="4"
              loop="true"
            >
              <swiper-slide
                v-for="(item, idx) in items"
                :key="`item-${idx}`"
                class="my-auto text-center"
              >
                <v-img
                  class="mx-auto"
                  width="150"
                  min-height:40
                  :src="item.logo"
                  :alt="item.name"
                  contain
                />
              </swiper-slide>
            </swiper-container>
          </client-only>
        </template>
      </v-card>
    </client-only>
  </v-container>
</template>

<script>
export default {
  props: {
    items: { type: Array, default: () => [] },
  },
  data() {
    return {};
  },
};
</script>
