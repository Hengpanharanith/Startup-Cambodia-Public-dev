<template>
  <v-card class="landing-network d-flex align-items-center" flat>
    <v-img src="images/about/pattern.svg ">
      <v-container class="py-8 overflow-hidden">
        <v-card color="transparent" flat>
          <v-card-title class="justify-md-center  block-title__text">{{
            $t("landing.ecosystem.title")
          }} </v-card-title>
          <v-card-text v-if="showCaption" class="mb-4">
            <div
              class="text-h5 mx-auto text-subtitle-1"
              style="max-width: 768px"
            >
              {{ $t("landing.ecosystem.subtitle") }}
            </div>
          </v-card-text>
          <v-card-text v-if="showCounter" class="pa-0">
            <v-card
              :data-aos="animationEnabled ? 'fade-in' : null"
              :data-aos-duration="animationEnabled ? 500 : null"
              :data-aos-id="animationEnabled ? 'ecoAnimated' : null"
              color="transparent"
              flat
            >
              <v-card-text>
                <v-row class="fill-height mt-5">
                  <v-col
                    v-for="(item, idx) in items"
                    :key="idx"
                    cols="6"
                    sm="4"
                    md="2"
                  >
                    <CardStakeholderCounter
                      class="fill-height"
                      :refresh="counting"
                      :icon="item.icon"
                      :label="item.title"
                      :amount="item.count"
                      :color="item.color"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-card-text>
          <v-card-actions v-if="showButton" class="justify-center">
            <nuxt-link to="/ecosystem/discover/category/startup" class="mx-auto">
              <ButtonPrimary :title="$t('landing.ecosystem.button.explore')" />
            </nuxt-link>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-img>
  </v-card>
</template>

<script>
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import CardStakeholderCounter from "@/components/CardView/CardStakeholderCounter.vue";
export default {
  name: "LandingEcosystem",
  components: { CardStakeholderCounter, ButtonPrimary },
  props: {
    ecosystem: { type: Object, default: () => ({}) },
    items: { type: Array, default: () => [] },
    showCaption: { type: Boolean, default: () => true },
    showButton: { type: Boolean, default: () => true },
    animationEnabled: { type: Boolean, default: () => true },
  },
  data() {
    return {
      counting: false,
    };
  },
  computed: {
    showCounter() {
      return !!this.items.length;
    },
  },
  mounted() {
    document.addEventListener("aos:in:ecoAnimated", () => {
      this.counting = true;
      setTimeout(() => {
        this.counting = false;
      }, 3000);
    });
  },
  beforeDestroy() {
    window.removeEventListener("aos:in:ecoAnimated", () => {});
  },
};
</script>

<style></style>
