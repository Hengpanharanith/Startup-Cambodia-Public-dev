<template>
  <v-card
    :to="linkTo"
    class="mx-auto custom-shadow overflow-hidden"
    rounded="lg"
    outlined
  >
    <v-chip class="program-card__type" color="primary" label small>{{
      programType
    }}</v-chip>
    <v-layout class="fill-height" column>
      <div>
        <v-img
          style="aspect-ratio: 16/9; object-fit: cover"
          :aspect-ratio="16 / 9"
          :src="thumbnail"
          :alt="title"
          class="rounded-lg"
        />
      </div>

      <v-card-title>
        <p class="text-break line-clamp-3 mb-0">{{ title }}</p>
      </v-card-title>

      <!--            <v-card-text class="flex-fill" v-if="description" v-html="description">-->

      <!--            </v-card-text>-->
      <v-spacer></v-spacer>
      <v-card-actions class="pa-0 card-resource-file__footer">
        <div class="px-4">
          <v-chip
            v-if="isActive"
            class="program-card__status"
            color="success"
            label
            small
          >
            {{ $t("program.status.active") }}
          </v-chip>
          <v-chip
            v-else
            class="program-card__status"
            color="grey lighten-2"
            label
            small
          >
            {{ $t("program.status.inactive") }}
          </v-chip>
        </div>

        <v-spacer></v-spacer>
        <v-btn
          @click.prevent="saveToList"
          :loading="isSaving"
          elevation="0"
          color="primary"
          large
          icon
          tile
        >
          <v-icon small>{{ saveIcon }}</v-icon>
        </v-btn>
        <v-menu left top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              v-on:click.prevent
              elevation="0"
              color="primary"
              large
              icon
              tile
            >
              <v-icon small>mdi-share-variant</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in shareOptions"
              :key="index"
              @click.stop="shareTo(item.type)"
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
    </v-layout>
  </v-card>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "CardViewProgram",
  props: {
    title: String,
    programId: [String, Number],
    description: String,
    isActive: Boolean,
    thumbnail: { type: String, default: "/images/default-image.png" },
    isSaved: Boolean,
    programType: String,
  },
  data() {
    return {
      isSaving: false,
    };
  },
  computed: {
    ...mapState("user", ["currentUser"]),
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
      return { path: `/program/${this.programId}` };
    },
    saveIcon() {
      return this.isSaved ? "mdi-bookmark" : "mdi-bookmark-outline";
    },
  },
  methods: {
    ...mapActions("saving-list", { toggleBookmark: "create" }),
    ...mapActions("startup-program", ["toggleSaveProps"]),
    saveToList() {
      if (!this.currentUser) {
        this.setAuthDialogVisibility(true);
        return;
      }

      this.isSaving = true;
      const payload = { type: "program", ref_id: this.programId };
      this.toggleBookmark({ payload })
        .then((res) => {
          this.toggleSaveProps({ id: this.programId });
          this.isSaving = false;
          this.$toast.show(this.$t("success"));
        })
        .catch((error) => {
          let message = error.response?.data?.message || error;
          this.$toast.error(message);
          this.isSaving = false;
        });
    },
    copyLink() {
      const DOMAIN2SHARE = this.$config.SHARE_URL || window?.location?.origin;
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
      const DOMAIN2SHARE = this.$config.SHARE_URL || window?.location?.origin;
      let url = DOMAIN2SHARE + "/program?id=" + this.programId;
      let text = this.title;
      const shareURL = {
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&title=${text}&url=${url}`,
        facebook: `https://facebook.com/sharer/sharer.php?u=${url}`,
        twitter: `https://twitter.com/share?url=${url}&text=${text}`,
        telegram: `htt  ps://t.me/share/url?url=${url}&text=${text}`,
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

.program-card__type {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
}
</style>
