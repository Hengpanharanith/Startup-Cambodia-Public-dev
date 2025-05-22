<template>

  <v-card
      class="blog-one__single card-event blog-one__single-inner-block pa-0 rounded-lg mb-0"
      flat
      outlined
  >

    <v-layout class="fill-height">
      <div
          class="blog-one__date flex-shrink-0 rounded-0"
          style="width: 120px;"
      >
        <v-layout
            class="fill-height text-center"
            justify-center
            column
        >
          <h2 class="mb-1">{{ displayDate }}</h2>
          <h2> {{ displayMonth }}</h2>
        </v-layout>
      </div>
      <v-col class="blog-one__text fill-height py-3 d-flex flex-column">
        <div class="card-event__title mb-auto">{{ label }}</div>
        <p class="card-event__by mb-0">
          <small>{{ $t("organize_by") }} {{ hostBy }}</small>
        </p>
      </v-col>
    </v-layout>

  </v-card>
</template>
<script>
export default {
  name: "CardEvent",
  props: {
    label: String,
    hostBy: String,
    description: String,
    datetime: String,

  },
  methods:{
    shareTo(resource, type) {
      let url = this.fileURL;
      let text = resource.name;
      const shareURL = {
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&title=${text}&url=${url}`,
        facebook: `https://facebook.com/sharer/sharer.php?u=${url}`,
        twitter: `https://twitter.com/share?url=${url}&text=${text}`,
        telegram: `https://t.me/share/url?url=${url}&text=${text}`,
      };

      if (!!shareURL[type]) window.open(shareURL[type]);
    },
  },
  computed: {
    lang() {
      return this.$i18n.locale;
    },
    displayDate() {
      let date = this.datetime || new Date();
      return this.$moment(date).locale(this.lang).format("DD");
    },
    displayMonth() {
      let date = this.datetime || new Date();
      return this.$moment(date).locale(this.lang).format("MMM");
    },
    shareOptions() {
      return [
        {
          text: this.$t("menu.share_to.linkedin"),
          icon: "mdi-linkedin",
          type: "linkedin",
        },
        {
          text: this.$t("menu.share_to.facebook"),
          icon: "mdi-facebook",
          type: "facebook",
        },
        {
          text: this.$t("menu.share_to.twitter"),
          icon: "mdi-twitter",
          type: "twitter",
        },
        {
          text: this.$t("menu.share_to.telegram"),
          icon: "mdi-send-circle",
          type: "telegram",
        },
      ];
    },
  },
};
</script>

<style>
.card-event__by,
.card-event__title,
.card-event__text {
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.card-event__by {
  line-height: 1.1;
}

.blog-one__single.card-event .blog-one__date {
  background-color: #f79b36;
}
.blog-one__single.card-event:hover.blog-one__single-inner-block {
  background-color: #f79b36;
}

.blog-one__single.card-event:hover .blog-one__author,
.blog-one__single.card-event:hover .blog-one__title.card-event__title {
  color: white;
}

.blog-one__single.card-event:hover .blog-one__date {
  color: #f79b36;
  background-color: white;
}

.card-horizontal {
  min-height: auto;
}

.blog-one__single.card-event {
  min-height: 120px;
}
</style>
