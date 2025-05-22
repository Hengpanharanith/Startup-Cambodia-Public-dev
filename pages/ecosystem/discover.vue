<template>
  <v-container class="px-0">
    <v-layout class="gap" no-gutters>
      <v-col
        class="d-none d-md-block"
        style="position: relative"
        cols="12"
        md="4"
        lg="3"
        xl="2"
      >
        <v-card
          class="custom-shadow"
          style="position: sticky; top: 6rem"
          rounded="lg"
        >
          <v-subheader class="px-2">{{ $t("ecosystem") }}</v-subheader>
          <v-list color="transparent" nav>
            <v-list-item
              v-for="(item, key) in ecosystemMenu"
              :key="`mene-item-${key}`"
              :to="item.to"
              class="px-4"
              rounded="lg"
            >
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-subheader class="px-4">
            {{ $t("menu.other_stakeholders") }}
          </v-subheader>
          <v-list color="transparent" nav>
            <v-list-item
              v-for="(item, key) in stakeholderMenu"
              :key="`mene-subitem-${key}`"
              :to="item.to"
              class="px-4"
            >
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="8" lg="9" xl="10">
        <portal-target name="breadcrumb"> </portal-target>
        <br />
        <nuxt />
      </v-col>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";

export default {
  computed: {
    category() {
      const { path, params } = this.$route;
      const { networkCategory, pathMatch } = params;
      return networkCategory || pathMatch || path.split("/")[4];
    },

    ecosystemMenu() {
      return [
        {
          to: "/ecosystem/discover/category/startup",
          text: this.$t("startup"),
        },
        {
          to: "/ecosystem/discover/category/mentor",
          text: this.$t("mentor"),
        },
        {
          to: "/ecosystem/discover/category/investor",
          text: this.$t("investor"),
        },
        {
          to: "/ecosystem/discover/category/eso",
          text: "ESO"
        },
      ];
    },
    stakeholderMenu() {
      // {
      //     to: "",
      //     text: this.,
      //     subitems:
      return [
        {
          to: "/ecosystem/discover/category/academic-institution",
          text: this.$t("menu.academic-institution"),
        },
        {
          to: "/ecosystem/discover/category/co-working-space",
          text: this.$t("menu.co-working-space"),
        },
        {
          to: "/ecosystem/discover/category/community-and-association",
          text: this.$t("menu.community-and-association"),
        },
        {
          to: "/ecosystem/discover/category/corporate",
          text: this.$t("menu.corporate"),
        },
        {
          to: "/ecosystem/discover/category/development-partner",
          text: this.$t("menu.development-partner"),
        },
        {
          to: "/ecosystem/discover/category/government-institution",
          text: this.$t("menu.government-institution"),
        },
        {
          to: "/ecosystem/discover/category/incubator-and-accelerator",
          text: this.$t("menu.incubator-and-accelerator"),
        },
        {
          to: "/ecosystem/discover/category/service-provider",
          text: this.$t("menu.service-provider"),
        },
        {
          to: "/ecosystem/discover/category/media",
          text: this.$t("menu.media"),
        },
      ];
    },
  },
  watch: {
    category() {
      const { query } = this.$route;
      this.$router.replace({ query: { ...query, visible_search: undefined } });
    },
  },
  mounted() {
    this.getIndustry({ params: { page_size: 999 } });
    this.getExpertise({ params: { page_size: 999 } });
  },
  methods: {
    ...mapActions("industry", { getIndustry: "get" }),
    ...mapActions("expertise", { getExpertise: "get" }),
  },
};
</script>

<style></style>
