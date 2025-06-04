<template>
  <v-card
    class="blog-one__single card-simple elevation-0"
    rounded="lg"
    outlined
  >
    <div class="blog-one__single-inner-block fill-height">
      <v-img :src="thumbnail" :aspect-ratio="16 / 9" alt="" />
      <v-card-title class="blog-one__title card-simple__title text-break"
        ><span class="line-clamp-2">{{ label }}</span></v-card-title
      >
      <v-card-text v-if="description">
        <p class="blog-one__text card-simple__text">
          {{ description }}
        </p>
      </v-card-text>
    </div>
  </v-card>
</template>
<script>
export default {
  name: "SimpleCard",
  props: {
    label: String,
    description: String,
    datetime: String,
    thumbnail: { type: String, default: "/images/default-image.png" },
    thumbnailAspect: { type: String, default: "1" },
  },
  computed: {
    startDate() {
      let isKm = this.$i18n.locale == "km";
      let date = this.datetime || new Date();
      if (isKm) return this.$moment(date).locale("km").format("DD MMM YYYY");
      return this.$moment(date).format("MMMM DD, YYYY");
    },
  },
};
</script>

<style>
.blog-one__single.card-simple {
  border-radius: 8px;
  margin-bottom: 0;
}

.blog-one__single.card-simple .blog-one__single-inner-block {
  border-radius: 8px;
  padding: 0;
}

.blog-one__single.card-simple .card-simple__body {
  padding: 1rem;
}

.blog-one__single.card-simple .blog-one__date {
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
}
.blog-one__single.card-simple .blog-one__date,
.blog-one__single.card-simple:hover .blog-one__single-inner-block {
  background-color: #2e3d62;
}

.blog-one__single.card-simple:hover .blog-one__date {
  color: #2e3d62;
  background-color: white;
}

.blog-one__single.card-simple .blog-one__author,
.blog-one__single.card-simple .blog-one__title.card-simple__title {
  color: #2e3d62;
}
.blog-one__single.card-simple:hover .blog-one__author,
.blog-one__single.card-simple:hover .blog-one__title.card-simple__title {
  color: white;
}

.card-simple__title,
.card-simple__text {
  line-height: 1.5;
  margin-bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.card-simple__text {
  -webkit-line-clamp: 3;
}
.blog-one__link {
  position: absolute;
  right: 2rem;
  bottom: 2rem;
}
</style>
