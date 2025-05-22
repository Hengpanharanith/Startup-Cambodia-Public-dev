<template>
  <section class="brand-style-one py-5">
    <v-container class="mt-5">
      <v-card
        class="fill-height card-pie-chart d-flex flex-column"
        elevation="0"
        bn
      >
        <!--        <h1 class="text-center my-4">-->
        <!--          {{title}}-->
        <!--        </h1>-->
        <!--        <v-card-title class="justify-md-center text-h5 block-title__text text-break mb-6">{{title}}</v-card-title>-->
      </v-card>
      <v-card
        class="fill-height card-pie-chart d-flex flex-column"
        elevation="0"
      >
        <v-card-text>
          <div class="swiper swiperPartner">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="item in partnerList"
                :key="item.id"
              >
                <v-img :src="item.thumbnail" alt="" height="100%" contain />
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "OurPartner",
  props: {
    title: String,
    partnerList: { type: Array, default: () => [] },
  },
  data() {
    return {};
  },
  mounted() {},
  watch: {
    partnerList() {
      setTimeout(() => {
        this.initSlider();
      }, 100);
    },
  },
  methods: {
    initSlider() {
      this.swiperPartner = new this.$swiper(".swiperPartner", {
        slidesPerView: 2,
        spaceBetween: 10,
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        breakpoints: {
          "@0.00": { slidesPerView: 2, spaceBetween: 20 },
          "@0.75": { slidesPerView: 3, spaceBetween: 30 },
          "@1.00": { slidesPerView: 4, spaceBetween: 40 },
          "@1.50": { slidesPerView: 5, spaceBetween: 50 },
        },
      });
    },
  },
  beforeDestroy() {
    this.swiperPartner?.destroy();
  },
};
</script>

<style scoped>
.swiper.swiperPartner {
  width: 100%;
  height: 150px;
}

.swiper.swiperPartner .swiper-slide {
  text-align: center;
  font-size: 18px;
  justify-content: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
/* .swiper.swiperPartner .swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
} */
</style>
