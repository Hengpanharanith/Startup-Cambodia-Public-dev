<template>
  <section
    class="blog-one py-3"
    id="blog"
  >
    <div class="container">
      <div class="block-title text-center">
        <div class="block-title__text">
          <span>{{ title }}</span>
        </div>
      </div>
      <div class="row mb-4">
        <div
          class="col-lg-4 mb-4"
          v-for="item in eventList"
          :key="'event-' + item.id"
        >
          <div class="blog-one__single card-event h-100" :title="item.title">
            <div class="blog-one__single-inner-block h-100">
              <div class="blog-one__date">
                {{ $moment(item.start_datetime).format("DD MMMM, YYYY") }}
              </div>
              <span class="blog-one__author" style="line-height: 1rem">{{getCreatorName(item.host_by || {})}}</span>
              <h3 class="blog-one__title card-event__title">
                <nuxt-link :to="'/event/' + item.id" style="" class="card-event__title text-decoration-none">{{item.title}}</nuxt-link>
              </h3>
              <p class="blog-one__text card-event__text">{{ item.detail }}</p>
              <nuxt-link :to="'/event/' + item.id" class="blog-one__link text-decoration-none"
                ><i class="nonid-icon-left-arrow"></i
              ></nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="row d-flex justify-content-center">
        <nuxt-link
          to="/event"
          class="button_link"
        >
          <ButtonPrimary :title="$t('seeMore')" />
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import ButtonPrimary from "../Button/ButtonPrimary";

export default {
  props: {
    title: String,
    eventList: { type: Array, default: () => [] },
  },
  name: "RecentEvent",
  components: {
    ButtonPrimary,
  },
  methods: {
    getCreatorName(by) {
      if (!by) return "";
      return [this.$t("organize_by"), [by]].join(" ").trim();
    },
  },
};
</script>

<style scoped>
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
