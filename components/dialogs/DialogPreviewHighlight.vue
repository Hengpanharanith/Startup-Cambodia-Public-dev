<template>
  <v-dialog
      @input="visibleChange"
      :value="visible"
      width="40rem"
      scrollable
  >
    <v-card
        :disabled="loading"
        rounded="lg"
        min-height="calc(50vh)"
    >
      <div
          class="position-absolute d-flex justify-center align-center"
          style="top:0; left:0; right:0; bottom:0"
          v-if="loading"
      >
        <LoadingCollapse :visible="loading"/>
      </div>
      <template v-if="!!detail">
        <v-card-text class="pa-0">
          <v-card-text class="pa-0">
            <template v-if="hasVideo" >

                <!--video embed-->
                <custom-video-embed
                    v-if="visible"
                    :src="detail.video_embedded_url"></custom-video-embed>

            </template>
            <v-responsive v-else :aspect-ratio="16 / 9">
              <v-img

                     :lazy-src="detail.thumbnail"
                     :src="detail.thumbnail"
                     :alt="detail.title"
                     height="20rem"
                     contain


              />
            </v-responsive>

          </v-card-text>
          <v-card-title class="text-break pb-2">{{ detail.title }}</v-card-title>

          <v-card-text
              class="quill-editor"
              v-html="detail.description"
          />

        </v-card-text>

      </template>
      <v-card-actions class="pb-4">

        <v-spacer></v-spacer>
        <!-- <v-btn @click="visibleChange()" outlined text>{{
          $t("dialog.close")
        }}</v-btn> -->

        <v-btn
            class="elevation-0 rounded-lg"
            color="info"
            text
            v-if="originUrl"
            :href="originUrl"
            target="_blank"



        >
          {{$t("landing.recent_highlights.view_source")}} <v-icon>mdi-open-in-new</v-icon>
        </v-btn>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import LoadingCollapse from "../LoadingCollapse.vue";
import VideoEmbed from "@/plugins/video-embed";
export default {
  name: "DialogPreviewHighlight",
  props: {
    parent: String,
    loading: Boolean,
    visible: Boolean,
    detail: Object,
  },

  methods: {
    visibleChange(v = false) {
      this.$emit("update:visible", v);
      
    },
    shareTo(type) {
      const DOMAIN2SHARE = this.$config.SHARE_URL || window?.location?.origin;
      let url = DOMAIN2SHARE + "/program?id=" + this.$route.query.id;
      let text = this.detail.title;
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
    hasVideo() {
      return this.detail?.video_embedded_url;

    },

    originUrl() {
      return this.detail?.origin_url;
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
  components: {LoadingCollapse, VideoEmbed},
};
</script>

<style lang="sass">
.quill-editor
  p
    margin-bottom: .25rem

  img
    max-width: 100%

  .v-expansion-panel-content__wrap
    padding: .5rem
</style>
