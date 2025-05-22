<template>
  <v-container>
    <BreadcrumbsAdvanced :breadcrumb-items="breadCrumbs" />
    <br />
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="2">
        <v-card rounded="lg" flat>
          <v-img :src="fileInfo.thumbnail" min-height="100"></v-img>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!downloadURL"
              :href="downloadURL"
              target="_blank"
              elevation="0"
              class="rounded-lg"
              icon
            >
              <v-icon>mdi-download</v-icon>
            </v-btn>
            <v-btn
              @click="toggleSave"
              :color="isSaved ? 'primary' : ''"
              :loading="isSaving"
              elevation="0"
              class="rounded-lg"
              icon
            >
              <v-icon>
                {{ saveIcon }}
              </v-icon>
            </v-btn>
            <v-menu left top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="dark"
                  class="rounded-lg ml-2"
                  icon
                >
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in shareOptions"
                  :key="index"
                  @click.stop="shareTo(item, item.type)"
                >
                  <v-list-item-icon class="mr-2">
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="8" lg="10">
        <v-card class="" rounded="lg" flat>
          <v-card-title class="pb-4 text--primary text-break">
            {{ fileInfo.name }}
          </v-card-title>
          <v-card-subtitle class="text--primary text-break">
            <span>{{ $t("publish_date") }}:</span>
            <strong>{{ displayDate }}</strong>
            <span>{{ $t("publisher") }}:</span>
            <strong>
              {{ displayPublisher }}
            </strong>
          </v-card-subtitle>
          <v-card-text class="text--primary body-1">
            <div v-html="fileInfo.detail" style="line-height: 1.75"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--      <v-snackbar v-model="snackbar" :timeout="2000" light>-->
    <!--        {{ $t("message.copied") }}-->
    <!--      </v-snackbar>-->
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  head() {
    let url = "https://startupcambodia.gov.kh/";
    if (process.browser) url = window.location.href;

    let img = this.fileInfo?.thumbnail;
    let title = this.fileInfo?.name || "Resource Detail";
    const descHtml = this.fileInfo?.description || "";
    const desc = descHtml.replace(/<[^>]+>/g, "").slice(0, 255);

    return {
      title,
      meta: [
        { hid: "og:url", content: url },
        { hid: "og:title", property: "og:title", content: title },
        { hid: "og:type", property: "og:type", content: "article" },
        { hid: "image", name: "image", content: img },
        { hid: "og:image", property: "og:image", content: img },
        { hid: "description", name: "description", content: desc },
        {
          hid: "og:description",
          property: "og:description",
          content: desc,
        },
        {
          hid: "twitter:image",
          property: "twitter:image",
          content: img,
        },
        {
          hid: "twitter:title",
          property: "twitter:title",
          content: title,
        },
        {
          hid: "twitter:description",
          property: "twitter:description",
          content: desc,
        },
        {
          hid: "twitter:card",
          property: "twitter:card",
          content: "summary_large_image",
        },
      ],
    };
  },
  data() {
    return {
      snackbar: false,
      fileInfo: {},
    };
  },
  computed: {
    ...mapState("saving-list", { isSaving: "isLoading" }),
    isSaved() {
      return this.fileInfo?.is_saved;
    },
    saveIcon() {
      return this.isSaved ? "mdi-bookmark" : "mdi-bookmark-outline";
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
        {
          text: this.$t("menu.share_to.clipboard"),
          key: "menu.share_to.copy",
          icon: "mdi-content-copy",
          type: "copy",
        },
      ];
    },
    fileId() {
      return this.$route.params.fileId;
    },
    breadCrumbs() {
      return [
        { homePage: true, text: this.$t("breadcrumb.home"), to: "/" },
        {
          text: this.$t("breadcrumb.resources"),
          to: "/resource/category/file",
        },
        {
          text: this.$t("menu.resource.file"),
          to: "/resource/category/file",
        },
      ];
    },
    downloadURL() {
      return this.fileInfo.file?.url;
    },
    localeURL() {
      return "/resource/file/" + this.fileInfo.id;
    },
    fileURL() {
      const DOMAIN2SHARE = this.$config.SHARE_URL || window?.location?.origin;
      return DOMAIN2SHARE + "/resource/file/" + this.fileInfo.id;
    },
    displayDate() {
      const _date = this.fileInfo?.published_date;
      return _date
        ? this.$moment(_date).format("dddd DD, MMMM YYYY")
        : this.$t("n_a1");
    },
    displayPublisher() {
      return this.fileInfo?.author == null
        ? this.$t("n_a1")
        : this.fileInfo.author;
    },
  },
  async fetch() {
    await this.getFileById({ id: this.fileId })
      .then((res) => {
        this.fileInfo = Object.assign({}, res);
        this.goTop();
      })
      .catch((e) => {});
  },
  methods: {
    ...mapActions("saving-list", { toggleBookmark: "create" }),
    ...mapActions("resource", { getFileById: "getById" }),
    copyLink() {
      const url = this.fileURL;
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
      this.snackbar = true;
    },
    toggleSave() {
      this.$toast.show(this.$t("success"));
      const payload = { type: "file", ref_id: this.fileInfo.id };
      this.toggleBookmark({ payload })
        .then(() => {
          this.fileInfo.is_saved = !this.fileInfo.is_saved;
          this.$toast.show(this.$t("success"));
        })
        .catch((error) => {
          let message = error.response?.data?.message;
          this.$toast.error(message);
        });
    },

    shareTo(resource, type) {
      if (type == "copy") {
        this.copyLink();
        return;
      }

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
};
</script>

<style></style>
