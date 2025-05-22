<template>
  <v-card flat >
    <v-card-title>
      <h1><countTo
          :startVal='0'
          :endVal='amount'
          :duration='3000'
          ref="numbCountTo"
          class="counter__amount"
      ></countTo></h1>
    </v-card-title>
    <v-card-text>
      {{label}}
    </v-card-text>
  </v-card>
</template>
<script>

import countTo from "vue-count-to";

export default {
  name:"CardVisitorCounter",
  props: {
    label: String,
    refresh: Boolean,
    amount: { type: Number, default: 0 },

  },
  components: { countTo },
  watch: {
    refresh(v) {
      if (v) {
        this.$refs.numbCountTo.start();
        return;
      }
    },
  },
}
</script>
