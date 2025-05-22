<template>
  <section class="service-one py-3" id="services">
    <div class="container">
      <div class="block-title">
        <div class="block-title__text text-center">
          <span>{{ title }}</span> <br />
        </div>
      </div>
      <div class="row mb-5">
        <div
          class="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-4"
          id="cardContainer"
          v-for="item in categoryList"
          :key="item.id"
        >
          <div
            class="service-one__single card-program h-100"
            :title="item.name"
          >
            <img :src="item.icon" class="mb-2 card-program__thumbnail" />
            <h3 class="blog-one__title card-program__title mb-2">
              <span>{{ item.name }}</span>
            </h3>
            <p class="service-one__text card-program__text">
              {{ item.description }}
            </p>
            <nuxt-link
              :to="{ path: '/program/category', query: { id: item.id } }"
              class="
                button_link
                service-one__link
                float-right
                card-program__link
                text-decoration-none
              "
            >
              <i class="nonid-icon-left-arrow"></i>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div v-if="categoryList.length" class="row d-flex justify-content-center">
        <a href="/program" class="button_link">
          <ButtonPrimary :title="$t('seeMore')" />
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import ButtonPrimary from "../Button/ButtonPrimary";

export default {
  components: {
    ButtonPrimary,
  },
  props: {
    title: String,
    categoryList: { type: Array, default: () => [] },
  },
  name: "Program",
};
</script>
<style scoped>
.card-program__title,
.card-program__text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.card-program__text {
  -webkit-line-clamp: 3;
}
.card-program__link {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
}
.card-program.service-one__single:hover .card-program__title {
  color: white;
}
.card-program__thumbnail {
  width: 64px;
  height: 64px;
}
</style>

