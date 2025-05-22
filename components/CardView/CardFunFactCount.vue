<template>
  <div class="fun-fact-one__single justify-content-center">
    <nuxt-link :to="to">
      <div class="inner-block">
        <h3 class="fun-fact-one__title counter">
          <countTo :startVal="0" :endVal="total" :duration="3000"></countTo>
        </h3>
        <p class="fun-fact-one__text">{{ text }}</p>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import countTo from "vue-count-to";
export default {
  name: "CardFunFactCount",
  components: { countTo },
  props: {
    text: String,
    total: { type: Number, default: 0 },
    to: { type: [String, Object], default: "#" },
  },
};
</script>

<style>
</style>