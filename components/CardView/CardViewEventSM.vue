<template>
  <div
    class="blog-one__single card-sm hover blog-one__single-inner-block p-0 card-horizontal mb-0"
    :title="title"
  >
    <div
      class="col vertical-center blog-one__date"
      style="max-width:100px"
    >
      <h2 class="text-center">
        <span>{{ displayDate }}</span>
        <small> {{ displayMonth }}</small>
      </h2>
    </div>
    <div class="col blog-one__text py-3 m-0 d-flex flex-column justify-content-around">
      <div class="card-sm__title mb-auto">{{ title }}</div>
      <p class="card-sm__text text-uppercase mb-0">
        <small>{{$t('by')}}</small>
        <small>{{ hostBy }}</small>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "CardViewEventSM",
  props: {
    event: { type: Object, default: () => {} },
  },
  data() {
    return {};
  },
  computed: {
    title() {
      return this.event.title;
    },
    hostBy() {
      return this.event.host_by;
    },
    lang() {
      return this.$i18n.locale;
    },
    displayDate() {
      let date = this.event.start_datetime || new Date();
      return this.$moment(date).locale(this.lang).format("DD");
    },
    displayMonth() {
      let date = this.event.start_datetime || new Date();
      return this.$moment(date).locale(this.lang).format("MMM");
    },
  },
};
</script>

<style>
.blog-one__single.card-sm {
  height: 130px;
}
.card-sm__title,
.card-sm__text {
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>