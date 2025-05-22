<template>
  <section class="landing-we-do d-flex align-items-center">
    <v-container class="text-md-center overflow-hidden">
      <v-card
        color="transparent"
        flat
      >
        <v-card-title class="justify-md-center  block-title__text text-break">{{$t("landing.section_what_we_do.title")}}</v-card-title>
        <v-card-text>
          <div
            class="text-h5 mx-auto text-subtitle-1 text-break"
            style="max-width: 800px"
          >{{ $t("landing.section_what_we_do.subtitle") }}</div>
        </v-card-text>
      </v-card>
      <v-row
        cols="2"
        cols-lg="4"
        class="justify-content-center text-left"
      >
        <v-col
          cols="6"
          lg="3"
          class="mb-4"
          :key="key"
          :data-aos-delay="50*(key)"
          data-aos="fade-up"
          data-aos-duration="500"
          v-for="(item, key) in itemList"
        >
          <div style="max-width: 150px">
            <Lottie
                :options="{animationData:item.lottie,loop:false}"
                :height="150"
                :width="150"
                class="mb-4 ml-md-0"
            />
          </div>
          <h3 class="blog-one__title card-simple__title mb-2">{{item.title}}</h3>
          <p class="blog-one__text card-simple__text">{{ item.text }}</p>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import SimpleCard from "@/components/CardView/SimpleCard.vue";
import lottieGateway from "@/assets/animations/lottie-gateway.json";
import lottieExpose from "@/assets/animations/lottie-expose.json";
import lottieResource from "@/assets/animations/lottie-resource.json";
import lottieConnectivity from "@/assets/animations/lottie-connectivity.json";

export default {
  name: "LandingWhatWeDo",
  components: { SimpleCard },
  data() {
    return {
      itemList: [
        {
          title: this.$t("landing.section_what_we_do.gateway"),
          text: this.$t("landing.section_what_we_do.gateway_text"),
          lottie: lottieGateway,
        },
        {
          title: this.$t("landing.section_what_we_do.connectivity"),
          text: this.$t("landing.section_what_we_do.connectivity_text"),
          lottie: lottieConnectivity,
        },
        {
          title: this.$t("landing.section_what_we_do.expose"),
          text: this.$t("landing.section_what_we_do.expose_text"),
          lottie: lottieExpose,
        },
        {
          title: this.$t("landing.section_what_we_do.resources"),
          text: this.$t("landing.section_what_we_do.resources_text"),
          lottie: lottieResource,
        },
      ],
    };
  },
};
</script>
<style scoped>
.landing-we-do {
  padding: 1rem 0;
}

</style>

