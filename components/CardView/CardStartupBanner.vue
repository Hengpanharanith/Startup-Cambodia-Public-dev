<template>
  <v-card class="flex-md-row relative" rounded="lg" outlined>
    <v-layout class="flex-md-row fill-height grey lighten-4 pa-4">
      <v-img :src="logo" height="200" contain />
    </v-layout>
    <v-card-title
      class="text-break text-capitalize justify-center justify-md-start"
    >
      {{ name }}
    </v-card-title>
    <v-card-text class="text-center text-md-start">
      <v-btn v-if="urlFacebook" :href="urlFacebook" target="_blank" icon>
        <v-icon>mdi-facebook</v-icon>
      </v-btn>

      <v-btn v-if="urlLinkedin" :href="urlLinkedin" target="_blank" icon>
        <v-icon>mdi-linkedin</v-icon>
      </v-btn>

      <v-btn v-if="urlWeb" :href="urlWeb" target="_blank" icon>
        <v-icon>mdi-web</v-icon>
      </v-btn>
      <p style="font-size: 16px" v-html="founderInfo"></p>
    </v-card-text>
    <v-card-actions class="pa-4 pt-0" v-if="!isLoggedIn">
      <v-btn
        @click="setAuthDialogVisibility(true)"
        color="primary"
        elevation="0"
        block
      >
        {{ $t("ecosystem.startup.detail.claim") }}
      </v-btn>
    </v-card-actions>
    <v-card-actions class="pa-4 pt-0" v-else-if="!hasOwner">
      <v-btn v-if="isLoggedIn && profileInfo.is_claimed" color="primary" elevation="0" block disabled>
        {{ $t("ecosystem.startup.detail.requested")  }}
      </v-btn>
      <v-btn v-else @click="claim" color="primary" elevation="0" block >
        {{$t("ecosystem.startup.detail.claim") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CardStartupBanner",
  props: {
    name: String,
    email: String,
    urlFacebook: String,
    urlLinkedin: String,
    urlWeb: String,
    hasOwner: Boolean,
    isLoggedIn: Boolean,
    logo: { type: String, default: "/images/default-image.png" },
    profileInfo: { type: Object, default: () => {} },
    isClaimed: Boolean,
  },
  methods: {
    ...mapActions("app", ["setAuthDialogVisibility"]),
    claim() {
      return this.$emit("claim-startup");
    },
  },
  computed: {
    founderInfo() {
      let template = `<span>
           ${this.$t("number_of_founders")}:
            <b>
            ${this.profileInfo.number_of_founder || this.$t("n_a")}
            </b>
          </span>
          <span>
            (${this.$t("female_founders")}:
            <b>
            ${this.profileInfo.number_of_female || this.$t("n_a")}
            </b>
            ${this.$t("tech_founders")}:
            <b>
            ${this.profileInfo.number_of_tech_founder || this.$t("n_a")}
            </b>
            )
          </span>
          `;
      return template;
    },
  },
};
</script>

<style></style>
