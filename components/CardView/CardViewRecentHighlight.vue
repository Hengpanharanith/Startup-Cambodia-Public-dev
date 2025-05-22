<template>
  <v-card
      class="mx-auto custom-shadow overflow-hidden card-hover"
      rounded="lg"
      outlined
      min-height="270px"
      height="100%"
      @click.prevent="readMore"

  >
    <v-layout class="fill-height" column>
      <v-card-text class="py-0 px-0 card-resource-file__thumbnail-wrapper">
        <v-img
            :aspect-ratio="1"
            :src="thumbnail"
            :alt="title"
            class="rounded-lg-top"

        />
      </v-card-text>


      <v-card-title>
        <p class="text-break line-clamp-3 mb-0">{{ title }}</p>
      </v-card-title>
      <v-card-text class="flex-fill" v-if="description">
        {{ description }}
      </v-card-text>
<!--      <v-spacer></v-spacer>-->
<!--      <v-card-actions class="px-0 card-resource-file__footer">-->
<!--        <v-spacer></v-spacer>-->
<!--        <v-btn-->
<!--            @click.prevent="readMore"-->
<!--            elevation="0"-->
<!--            color="primary"-->
<!--            large-->
<!--            text-->

<!--        >-->
<!--          Read more-->
<!--        </v-btn>-->
<!--      </v-card-actions>-->

    </v-layout>

  </v-card>
</template>
<script>
export default {
  name: "CardViewRecentHighlight",
  props: {
    title: String,
    programId: [String, Number],
    description: String,
    isActive: Boolean,
    thumbnail: { type: String, default: "/images/default-image.png" },
    isSaved: Boolean,
    isSaving: Boolean,
  },
  data() {
    return {};
  },
  computed: {
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
        {
          text: this.$t("menu.share_to.clipboard"),
          key: "menu.share_to.copy",
          icon: "mdi-content-copy",
          type: "copy",
        },
      ];
    },

    linkTo() {
      const { programId, $route } = this;
      return { query: { ...$route.query, id: programId } };
    },
    saveIcon() {
      return this.isSaved ? "mdi-bookmark" : "mdi-bookmark-outline";
    },
  },
  methods: {
    readMore() {
      // this.$toast.show(`Item ${this.title}`)
      this.$emit("view-detail");
    },
    copyLink() {
      const DOMAIN2SHARE =
          this.$config.SHARE_URL || window?.location?.origin;
      const url = DOMAIN2SHARE + "/program/?id=" + (this.programId || "");
      if (!process.browser) return;
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url);
        this.$toast.show(this.$t("message.copied"));
        return;
      }

      const input = document.createElement("input");
      input.value = url;
      input.style.position = "fixed";
      input.style.left = "-999999px";
      input.style.top = "-999999px";
      document.body.appendChild(input);
      input.focus();
      input.select();
      document.execCommand("copy");
      input.remove();
      this.$toast.show(this.$t("message.copied"));
    },

    shareTo(type) {
      if (type == "copy") {
        this.copyLink();
        return;
      }
      //
      const DOMAIN2SHARE =
          this.$config.SHARE_URL || window?.location?.origin;
      let url = DOMAIN2SHARE + "/program?id=" + this.programId;
      let text = this.title;
      const shareURL = {
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&title=${text}&url=${url}`,
        facebook: `https://facebook.com/sharer/sharer.php?u=${url}`,
        twitter: `https://twitter.com/share?url=${url}&text=${text}`,
        telegram: `https://t.me/share/url?url=${url}&text=${text}`,
      };

      if (!!shareURL[type]) window.open(shareURL[type]);
    },
  },
};
</script>
<style scoped>
.card-program__image {
  object-fit: cover;
  object-position: center;
}
</style>
