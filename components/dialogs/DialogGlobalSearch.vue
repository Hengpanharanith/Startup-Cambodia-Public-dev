<template>
  <v-dialog
    :value="isVisible"
    max-width="768px"
    overlay-color="black"
    overlay-opacity=".7"
    content-class="elevation-0 align-self-start"
    scrollable
    persistent
  >
    <v-card
      color="transparent"
      flat
    >
      <v-card-actions class="align-center pb-6 px-0">
        <v-spacer></v-spacer>
        <v-btn
          @click="closeSearch"
          color="white"
          icon
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-actions
        class="align-center py-4 white"
        style="border-radius: 4px 4px 0 0"
      >
        <v-text-field
          v-model="search.keyword"
          :placeholder="$t('form.common.label.type2search')"
          prepend-inner-icon="mdi-magnify"
          name="keyword"
          id="keyword"
          autofocus
          hide-details
          clearable
          outlined
          dense
        ></v-text-field>
      </v-card-actions>
      <div class="white pa-0">
        <v-divider></v-divider>
        <v-tabs
          v-model="activeTab"
          slider-color="primary"
          color="primary"
        >
          <v-tab>{{$t('global.search.tab.title.all')}}</v-tab>
          <v-tab
            v-for="item in stakeholderMenu"
            :key="'tab-'+item.key"
          >{{item.text}}</v-tab>
        </v-tabs>

        <v-divider></v-divider>
        <v-card
          height="4px"
          flat
        >
          <v-progress-linear
            v-if="isSearching"
            color="primary"
            indeterminate
          ></v-progress-linear>
        </v-card>
      </div>
      <v-card-text class="pa-0 white">
        <v-tabs-items v-model="activeTab">
          <v-tab-item>
            <v-list>
              <v-list-item
                v-if="!hasResultAllTab"
                class="text-center justify-center"
              >
                <v-img
                  src="/icons/404-error-animate.svg"
                  alt="404-not-found"
                  max-width="200"
                />
              </v-list-item>
              <v-list-item-group
                v-for="(item, key) in stakeholderMenu"
                :key="`${item.key}-header-${key}`"
              >
                <v-subheader class="text-uppercase black--text">{{item.text}}</v-subheader>
                <v-divider></v-divider>
                <SearchResultItem
                  v-for="(subItem, subKey ) in (results[item.key] ||[])"
                  :key="`${item.key}-tab-list-item-${subKey}`"
                  :to="getURL(item.key, subItem.id)"
                  :thumbnail="subItem.image"
                  :title="subItem.name"
                  :description="subItem.description"
                />
              </v-list-item-group>
            </v-list>
          </v-tab-item>
          <v-tab-item
            v-for="item in stakeholderMenu"
            :key="'tab-content-'+item.key"
          >
            <v-list>
              <template v-if="results[item.key]&&results[item.key].length">
                <SearchResultItem
                  v-for="(listItem, subKey ) in results[item.key]"
                  :key="`tab-list-item-${item.key}-${subKey}`"
                  :to="getURL(item.key, listItem.id)"
                  :thumbnail="listItem.image"
                  :title="listItem.name"
                  :description="listItem.description"
                />
              </template>
              <v-list-item
                v-else
                class="text-center justify-center"
              >
                <v-img
                  src="/icons/404-error-animate.svg"
                  alt="404-not-found"
                />
              </v-list-item>
            </v-list>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
const SEARCH_TYPE = {
  BLOGS: "blogs",
  FILES: "files",
  EVENTS: "events",
  PROGRAMS: "programs",
};
const PREFIX_ROUTES = {
  blogs: "/resource/category/blog/",
  files: "/resource/file/",
  events: "/event/",
  programs: "/program?id=",
  startup: "/ecosystem/discover/category/startup/",
  mentor: "/ecosystem/discover/category/mentor/",
  investor: "/ecosystem/discover/category/investor/",
  academic_institution: "/ecosystem/discover/category/academic-institution/",
  co_working_space: "/ecosystem/discover/category/co-working-space/",
  community_and_association:
    "/ecosystem/discover/category/community-and-association/",
  corporate: "/ecosystem/discover/category/corporate/",
  development_partner: "/ecosystem/discover/category/development-partner/",
  government_institution:
    "/ecosystem/discover/category/government-institution/",
  incubator_and_accelerator:
    "/ecosystem/discover/category/incubator-and-accelerator/",
  service_provider: "/ecosystem/discover/category/service-provider/",
  media: "/ecosystem/discover/category/media/",
};
export default {
  name: "DialogGlobalSearch",
  props: {
    isVisible: Boolean,
  },
  data() {
    return {
      SEARCH_TYPE,
      activeTab: "",
      isSearching: false,
      search: {
        keyword: "",
      },
      results: {
        blogs: [],
        files: [],
        events: [],
        programs: [],
      },
    };
  },
  computed: {
    hasResultAllTab() {
      return !!this.stakeholderMenu.length;
    },
    hasBlogResults() {
      return !!this.results.blogs?.length;
    },
    hasFileResults() {
      return !!this.results.files?.length;
    },
    hasEventResults() {
      return !!this.results.events?.length;
    },
    hasProgramResults() {
      return !!this.results.programs?.length;
    },

    stakeholderMenu() {
      let items = [
        {
          text: this.$t("global.search.tab.title.blogs"),
          key: SEARCH_TYPE.BLOGS,
        },
        {
          text: this.$t("global.search.tab.title.files"),
          key: SEARCH_TYPE.FILES,
        },
        {
          text: this.$t("global.search.tab.title.events"),
          key: SEARCH_TYPE.EVENTS,
        },
        {
          text: this.$t("global.search.tab.title.programs"),
          key: SEARCH_TYPE.PROGRAMS,
        },
        {
          text: this.$t("menu.startup"),
          key: "startup",
        },
        {
          text: this.$t("menu.mentor"),
          key: "mentor",
        },
        {
          text: this.$t("menu.investor"),
          key: "investor",
        },
        {
          text: this.$t("menu.academic-institution"),
          key: "academic_institution",
        },
        {
          text: this.$t("menu.co-working-space"),
          key: "co_working_space",
        },
        {
          text: this.$t("menu.community-and-association"),
          key: "community_and_association",
        },
        {
          text: this.$t("menu.corporate"),
          key: "corporate",
        },
        {
          text: this.$t("menu.development-partner"),
          key: "development_partner",
        },
        {
          text: this.$t("menu.government-institution"),
          key: "government_institution",
        },
        {
          text: this.$t("menu.incubator-and-accelerator"),
          key: "incubator_and_accelerator",
        },
        {
          text: this.$t("menu.service-provider"),
          key: "service_provider",
        },
        {
          text: this.$t("menu.media"),
          key: "media",
        },
      ];
      return items.filter((item) => this.results[item.key]?.length);
    },
  },
  watch: {
    "search.keyword"(v) {
      if (this.searchTimer) {
        clearTimeout(this.searchTimer);
        this.searchTimer = null;
      }
      this.searchTimer = setTimeout(() => {
        this.doSearch();
      }, 800);
    },
    $route() {
      this.closeSearch();
    },
  },
  methods: {
    closeSearch() {
      this.$emit("update:isVisible", false);
    },
    doSearch() {
      this.isSearching = true;
      const options = { params: { search: this.search.keyword } };
      this.$axios
        .$get("/api/v1/search/", options)
        .then((res) => {
          this.results = Object.assign({}, this.$common.cloneJSON(res));
          this.isSearching = false;
        })
        .catch((e) => {
          this.isSearching = false;
        });
    },
    getURL(type, id) {
      const _prefix = PREFIX_ROUTES[type];
      if (!_prefix || !id) return undefined;
      return _prefix + id;
    },
  },
};
</script>

<style>
</style>