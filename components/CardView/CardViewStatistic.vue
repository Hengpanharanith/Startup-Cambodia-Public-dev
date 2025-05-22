<template>
  <section class="py-5 m-3">
    <div class="block-title text-center">
      <div class="block-title__text">
        <span>{{ title }}</span>
      </div>
    </div>
    <div class="container service-one__single">
      <LoadingCollapse :visible="loading" />
      <div class="row text-center justify-content-center">
        <div
          class="py-3 col-sm-6 col-md-3"
          v-if="ecosystemDetail.startup_count"
        >
          <span class="cardTitle display-3">{{
            ecosystemDetail.startup_count
          }}</span>
          <br />
          <span class="cardSubTitle">{{ $t("startup") }}</span>
        </div>

        <div
          class="py-3 col-sm-6 col-md-3"
          v-if="ecosystemDetail.program_count"
        >
          <span class="cardTitle display-3">{{
            ecosystemDetail.program_count
          }}</span>
          <br />
          <span class="cardSubTitle">{{ $t("investor") }}</span>
        </div>
        <div
          class="py-3 col-sm-6 col-md-3"
          v-if="ecosystemDetail.program_count"
        >
          <span class="cardTitle display-3">{{
            ecosystemDetail.program_count
          }}</span>
          <br />
          <span class="cardSubTitle">{{ $t("programs") }}</span>
        </div>
        <div
          class="py-3 col-sm-6 col-md-3"
          v-if="ecosystemDetail.government_count"
        >
          <span class="cardTitle display-3">{{
            ecosystemDetail.government_count
          }}</span>
          <br />
          <span class="cardSubTitle">{{ $t("goverment") }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import LoadingCollapse from "../LoadingCollapse.vue";
export default {
  name: "CardViewStatistic",
  props: {
    title: String,
    loading: Boolean,
    ecosystemDetail: { type: Object, default: () => ({}) },
  },
  components: { LoadingCollapse },
};
</script>
<style scoped>
.cardTitle {
  color: rgba(46.000001057982445, 61.00000016391277, 98.00000175833702, 1);
  text-align: center;
  font-size: 36px;
  letter-spacing: 0;
}

.cardSubTitle {
  color: rgba(46.000001057982445, 61.00000016391277, 98.00000175833702, 1);
  text-align: center;
  font-size: 20px;
  letter-spacing: 0;
}

.cardItemBorderRight {
  border-right: 1px solid
    rgba(196.00000351667404, 196.00000351667404, 196.00000351667404, 1);
}

.cardContainer {
  /* position: absolute;
		top: 80%;
		left: 50%;
		transform: translate(-50%, -50%); */
  border: 1px solid
    rgba(196.00000351667404, 196.00000351667404, 196.00000351667404, 1);
  border-radius: 8px;
}
</style>