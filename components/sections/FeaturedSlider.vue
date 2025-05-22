<template>
  <v-card rounded="lg" elevation="0">
    <v-card-title class="tex-break text-uppercase">
      <h3>{{ title }}</h3>
    </v-card-title>
    <v-card-text>
      <client-only>
        <swiper-container
          ref="featuredSlider"
          init="false"
          pagination="true"
          pagination-clickable="true"
          autoplay-delay="3000"
          class="flex-fill"
          space-between="24"
          loop="true"
        >
          <swiper-slide
            v-for="(item, idx) in items"
            :key="`item-${idx}`"
            class="py-2"
          >
            <slot :item="item" :index="idx" />
          </swiper-slide>
        </swiper-container>
      </client-only>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
    items: {
      type: Array,
      default: () => [],
    },
    breakpoints: {
      type: Object,
      default: () => ({
        1024: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 2,
        },
        640: {
          slidesPerView: 2,
        },
        0: {
          slidesPerView: 1,
        },
      }),
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initSwiper();
    });
  },
  watch: {
    item() {
      this.initSwiper();
    },
  },
  methods: {
    initSwiper() {
      const el = this.$refs.featuredSlider;
      Object.assign(el, {
        spaceBetween: 24,
        autoplayDelay: 2500,
        loop: true,
        pagination: {
          clickable: true,
        },
        breakpoints: this.breakpoints,
      });
      el.initialize();
    },
  },
};
</script>
