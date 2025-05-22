<template>
  <div class="flex-md-row relative" rounded="lg" flat>
   
    <v-card-text class="pb-0">
      <v-card rounded="lg" flat>
        <v-img :src="logo" :aspect-ratio="16 / 9" contain/>
      </v-card>
    </v-card-text>
    <v-card-title class="justify-space-between align-start pb-2">
      <div>
       
        <p class="mb-1">{{ name }}</p>

        <div>
          <v-btn v-if="urlFacebook" :href="urlFacebook" target="_blank" icon>
            <v-icon size="32" color="#3b5998">mdi-facebook</v-icon>
          </v-btn>

          <v-btn v-if="urlLinkedin" :href="urlLinkedin" target="_blank" icon>
            <v-icon size="32" color="#0e76a8">mdi-linkedin</v-icon>
          </v-btn>

          <v-btn v-if="urlWeb" :href="urlWeb" target="_blank" icon>
            <v-icon size="32">mdi-web</v-icon>
          </v-btn>
        </div>
      </div>
      <v-layout class="flex-grow-0 gap">
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              @click.prevent.stop="onReport"
              class="primary white--text"
              outlined
              icon
              small
            >
              <v-icon> mdi-alert-circle-outline </v-icon>
            </v-btn>
          </template>
          <span>{{ $t("report.form.label.suggestEdit") }}</span>
        </v-tooltip>
        <v-btn
          v-if="!isLoggedIn && !hasOwner"
          @click="setAuthDialogVisibility(true)"
          color="primary"
          elevation="0"
          rounded
          small
        >
          {{ $t("ecosystem.startup.detail.claim") }}
        </v-btn>

        <v-btn
          v-else-if="!hasOwner"
          @click="claim"
          color="primary"
          elevation="0"
          rounded
          small
        >
          {{ $t("ecosystem.startup.detail.claim") }}
        </v-btn>
      </v-layout>
    </v-card-title>
    <v-card-text>
      <p style="font-size: 16px" v-html="founderInfo"></p>
    </v-card-text>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CardStartupBannerFlat",
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
  },
  methods: {
    ...mapActions("app", ["setAuthDialogVisibility"]),
    claim() {
      return this.$emit("claim-startup");
    },
    onReport() {
      return this.$emit("report");
    },

    getUsername(item = {}) {
      const { first_name, first_name_kh, last_name, last_name_kh } = item;
      if (!this.$isKm()) return [first_name, last_name].join(" ");
      return [first_name_kh || first_name, last_name_kh || last_name].join(" ");
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
