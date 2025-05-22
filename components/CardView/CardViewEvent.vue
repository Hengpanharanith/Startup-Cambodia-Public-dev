<template>
  <div class="blog-one__single card-even text-left ">
    <div class="blog-one__single-inner-block h-100 p-4">
      <div class="blog-one__date py-1 ">{{ startDate }}</div>
      <span class="blog-one__author card-event__title mt-4">{{ $t("organize_by") }} {{ event.host_by || "n/a" }}</span>
      <h3 class="blog-one__title card-event__title">
        <nuxt-link
          :to="'/event/' + event.id"
          class="card-event__title text-decoration-none"
        >{{ event.title }}</nuxt-link>
      </h3>
      <p class="blog-one__text card-event__text">{{ event.detail }}</p>
      <nuxt-link
        :to="'/event/' + event.id"
        class="blog-one__link text-decoration-none"
      ><i class="nonid-icon-left-arrow"></i></nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "CardViewEvent",
  props: { event: { type: Object, default: () => ({}) } },
  computed: {
    startDate() {
      let isKm = this.$i18n.locale == "km";
      let date = this.event.start_datetime || new Date();
      if (isKm) return this.$moment(date).locale("km").format("DD MMM YYYY");
      return this.$moment(date).format("MMMM DD, YYYY");
    },
  },
};
</script>

<style>
.card-event__title,
.card-event__text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.card-event__text {
  -webkit-line-clamp: 3;
}
.blog-one__link {
  position: absolute;
  right: 2rem;
  bottom: 2rem;
}
</style>