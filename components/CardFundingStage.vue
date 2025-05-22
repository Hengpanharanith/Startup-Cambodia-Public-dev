<template>
  <v-card class="card-funding-round" rounded="lg" dark flat>
    <v-card-title class="pb-0"> {{ title }} <v-spacer></v-spacer> <span v-if="isCurrent"><small>{{$t(`common.current`)}}</small></span> </v-card-title>
    <v-divider></v-divider>
    <v-list color="transparent">
      <v-list-item>
        <v-list-item-content class="py-1">
          <v-list-item-subtitle>Date</v-list-item-subtitle>
          <v-list-item-title> {{ displayDate }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content class="py-1">
          <v-list-item-subtitle>Amount</v-list-item-subtitle>
          <v-list-item-title class="display-1">
            {{ displayAmount }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "CardFundingStage",
  props: {
    title: String,
    timestamp: String,
    amount: {
      type: [String, Number],
      default: 0,
    },
    isCurrent: false
  },
  computed: {
    displayDate() {
      if (!this.timestamp) return "-";
      return this.$moment(this.timestamp).format("MMMM DD, YYYY");
    },
    displayAmount() {
      return this.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style>
.card-funding-round {
  background: #f46b45; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #eea849,
    #f46b45
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #eea849,
    #f46b45
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
