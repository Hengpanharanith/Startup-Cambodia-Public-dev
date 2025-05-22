<template>
  <div>
    <BreadcrumbsBar :breadcrumb-items="breadCrumbs" />
    <v-divider />
    <v-container id="resourceToolbar">
      <v-layout wrap>
        <v-col style="position: relative" cols="12" md="4" lg="3">
          <v-card rounded="lg" flat>
            <v-card-text>
              <v-layout class="gap" column>
                <SearchBar
                  v-model="filter.keyword"
                  :readonly="isLoading"
                  class="flex-grow-1"
                  width="10rem"
                />
                <v-layout
                  v-for="(item, key) in filterItems"
                  :key="`filter-menu-${key}`"
                  column
                >
                  <div class="pt-2">{{ item.title }} :</div>

                  <v-list dense>
                    <v-list-item-group
                      v-model="filter[item.value]"
                      :multiple="item.multiple"
                    >
                      <v-list-item
                        v-for="(subitem, subindex) in item.items"
                        :key="`sort-by-${key}-${subindex}`"
                        class="px-0"
                        :value="subitem.value"
                        active-class="transparent"
                        style="min-height: 24px"
                      >
                        <template v-slot:default="{ active }">
                          <v-list-item-action class="mr-2 my-1">
                            <v-checkbox
                              :input-value="active"
                              :ripple="false"
                              color="primary"
                              dense
                            />
                          </v-list-item-action>
                          <v-list-item-content
                            v-text="subitem.name"
                            class="py-1"
                          />
                        </template>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>

                  <v-dialog v-model="dialog[item.value]" width="768" scrollable>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="mx-auto"
                        v-bind="attrs"
                        v-on="on"
                        text
                        small
                      >
                        {{ $t("button.more") }}
                        <v-icon>mdi-chevron-down</v-icon>
                      </v-btn>
                    </template>

                    <v-card>
                      <v-card-title v-text="item.name" />
                      <v-divider />
                      <v-card-text>
                        <v-item-group
                          v-model="filter[item.value]"
                          :multiple="item.multiple"
                        >
                          <v-row dense>
                            <v-col
                              v-for="subitem in item.moreItems"
                              :key="`v-item-${item.value}-${subitem.value}`"
                              cols="12"
                              md="4"
                            >
                              <v-item
                                v-slot="{ active, toggle }"
                                :value="subitem.value"
                              >
                                <v-card class="d-flex align-center" flat>
                                  <v-checkbox
                                    :input-value="active"
                                    :ripple="false"
                                    @click="toggle"
                                    class="ml-2 no-message"
                                    color="primary"
                                    dense
                                  />
                                  <span
                                    @click="toggle"
                                    class="cursor-pointer"
                                    v-text="subitem.name"
                                  />
                                </v-card>
                              </v-item>
                            </v-col>
                          </v-row>
                        </v-item-group>
                      </v-card-text>
                      <v-divider />
                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          @click="dialog[item.value] = false"
                          color="primary"
                          >{{ $t("button.done") }}</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-layout>
              </v-layout>
            </v-card-text>
            <v-divider />
            <v-card-text class="text-center">
              {{ $t("network.showing") }}
              <strong>{{ resources.length }} </strong>
              {{ $t("network.of") }} {{ itemCount }}
              {{ $t("network.result") }}
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="8" lg="9">
          <v-progress-linear
            v-show="isLoading"
            color="primary"
            indeterminate
          ></v-progress-linear>
          <div id="top-container"></div>

          <v-expand-transition>
            <div v-show="showTags">
              <v-card class="mb-4" rounded="lg" flat>
                <v-card-text>
                  <v-layout justify-space-between>
                    <label class="d-block mb-4 grey--text darken-3">
                      {{ $t("selected") }}
                    </label>
                    <v-btn @click="clearSearch" color="warning" outlined small>
                      {{ $t("form.common.label.clear_filter") }}
                    </v-btn>
                  </v-layout>
                  <v-layout wrap>
                    <template v-for="item in filterItems">
                      <v-chip
                        @click:close="deselectFilter(item.value, subitem)"
                        v-for="subitem in filter[item.value]"
                        :key="`selected-${item.value}-${subitem}`"
                        class="ma-1"
                        color="warning"
                        small
                        close
                      >
                        {{
                          decodeURIComponent(getChipLabel(item.value, subitem))
                        }}
                      </v-chip>
                    </template>
                  </v-layout>
                </v-card-text>
              </v-card>
            </div>
          </v-expand-transition>

          <v-card rounded="lg" flat>
            <v-card-text>
              <div v-if="categorySlug == 'file'">
                <v-row class="mb-8">
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    v-for="(item, key) in resources"
                    v-bind:key="`resource-${key}-${item.id}`"
                    outline
                  >
                    <CardViewResourceFile
                      @toggle-save="toggleSaveFile(item)"
                      v-bind:resource="item"
                      :is-saving="savingFileId == item.id"
                      :is-saved="item.is_saved"
                    />
                  </v-col>
                </v-row>
              </div>
              <div v-else>
                <v-row class="mb-4">
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    v-for="(item, key) in resources"
                    v-bind:key="`resource-${key}-${item.id}`"
                  >
                    <CardViewBlog
                      @toggle-save="toggleSave(item)"
                      v-bind:resource="item"
                      :is-saving="savingId == item.id"
                      :is-saved="item.is_saved"
                    />
                  </v-col>
                </v-row>
              </div>

              <CardNoItem :visible="noItem" />
              <div v-if="showPagination">
                <v-pagination
                  @input="onPageChange"
                  :value="currentPage"
                  :total-visible="7"
                  :length="totalPage"
                  :disabled="isLoading"
                ></v-pagination>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  head() {
    let img =
      "https://startup-cambodia-dev.s3.amazonaws.com/core/resource/thumbnails/Top_5_Startups_in_Cambodia.png";
    let desc = "Startup Cambodia - " + (this.categorySlug || "Resources");
    return {
      title: "Resources",
      meta: [
        {
          hid: "og:image",
          property: "og:image",
          content: img,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: img,
        },
        {
          hid: "description",
          name: "description",
          content: desc,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: desc,
        },
      ],
    };
  },
  data() {
    return {
      savingId: null,
      savingFileId: null,
      filterOptions: {},
      resources: [],
      filter: {
        keyword: "",
        sort: "",
        type: undefined,
        expertise: [],
        sectors: [],
      },
      dialog: {
        sectors: false,
      },
      itemCount: 0,
      totalPage: 1,
      noItem: false,
    };
  },
  async fetch() {
    const { page, search, sectors } = this.$route.query;
    this.filter.keyword = search;
    this.filter.sectors = sectors?.split(",") || [];
    await this.searchResource(page);
  },
  computed: {
    ...mapState("resource", ["isLoading"]),

    ...mapState("industry", { industryList: "dataList" }),

    filterItems() {
      return [
        {
          title: this.$t("industry"),
          name: "sectors",
          value: "sectors",
          multiple: true,
          items: this.industryList.slice(0, 10).map((item) => ({
            ...item,
            value: encodeURIComponent(item.name),
          })),
          moreItems: this.industryList.slice(10).map((item) => ({
            ...item,
            value: encodeURIComponent(item.name),
          })),
        },
      ];
    },

    // filterItems() {
    //   return [
    //     {
    //       title: this.$t("program_type"),
    //       name: "type",
    //       value: "type",
    //       items: [
    //         { title: this.$t("all"), value: "all" },
    //         { title: this.$t("upComingEvent"), value: "upcoming" },
    //         { title: this.$t("pastEvent"), value: "past" },
    //       ],
    //     },
    //   ];
    // },

    visibleSearch() {
      let { visible_search } = this.$route.query;
      return !!visible_search;
    },
    currentQuery() {
      const { query } = this.$route;
      return query;
    },
    currentPage() {
      return Number(this.$route.query.page || 1);
    },
    categorySlug() {
      let slug = this.$route.params.resource;

      if (!slug) return;
      //
      return slug;
    },

    showPagination() {
      return this.totalPage > 1;
    },

    showTags() {
      const { sectors } = this.filter;
      return !!sectors.length;
    },

    breadCrumbs() {
      return [
        { homePage: true, text: this.$t("breadcrumb.home"), to: "/" },
        {
          text: this.$t("breadcrumb.resources"),
          disabled: true,
        },
        {
          text: this.$route.params.resource
            ? this.$t(`menu.resource.${this.$route.params.resource}`)
            : "",
          disabled: true,
        },
      ];
    },
  },
  watch: {
    visibleSearch(v) {
      if (v) this.goTop();
    },
    currentPage: {
      handler(page) {
        this.searchResource(page);
      },
    },
    "filter.keyword"(v) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.onFilterChange("search", v);
      }, 800);
    },
    "filter.sectors"(v) {
      this.onFilterChange("sectors", v.join(","));
    },
    "$route.query.search"(v) {
      this.handleSearch();
    },
    "$route.query.sectors"(v = "") {
      this.handleSearch();
    },
    "$route.params.resource"(v) {
      this.handleSearch();
    },
  },
  methods: {
    ...mapActions("saving-list", { toggleBookmark: "create" }),
    ...mapActions("resource", ["getResourceByCategory"]),
    ...mapActions("resource-page", { getResourcePage: "get" }),
    goTop() {
      let options = { duration: 300, offset: 70, easing: "linear" };
      this.$vuetify.goTo("#resourceToolbar", options);
    },
    getBlogRoute(id) {
      return `${this.currentRoute}/${id}`;
    },
    onFilterChange(key, val) {
      const { query } = this.$route;
      this.$router.push({ query: { ...query, [key]: val || undefined } });
    },
    handleSearch() {
      const { query } = this.$route;
      if (this.currentPage != 1) {
        this.$router.replace({ query: { ...query, page: 1 } });
        return;
      }
      if (this.searchTimer) {
        clearTimeout(this.searchTimer);
        this.searchTimer = null;
      }
      this.searchTimer = setTimeout(() => {
        this.searchResource();
      }, 100);
    },
    async searchResource(page = 1) {
      const category = this.categorySlug;
      const { search, sectors } = this.$route.query;
      let options = {
        params: { category, search, page, sectors, page_size: 16 },
      };
      return await this.getResourceByCategory(options)
        .then((res) => {
          this.resources = this.$common.cloneJSON(res.data);
          this.totalPage = res.total_page;
          this.itemCount = res.item_count;
          this.noItem = !res.data.length;
        })
        .catch((e) => {
          this.noItem = true;
          this.resources = Object.assign([], []);
          this.totalPage = 1;
        });
    },
    clearSearch() {
      this.filter.sectors = [];
      this.filter.keyword = "";
      // this.$router.push({ query: {} });
    },
    deselectFilter(prop, name) {
      if (!name || !prop || !this.filter[prop]) return;
      const idx = this.filter[prop].findIndex((itm) => name == itm);
      if (idx == -1) return;
      this.filter[prop].splice(idx, 1);
    },
    onPageChange(page) {
      if (page == this.currentPage) return;
      const { query } = this.$route;
      this.$router.push({ query: { ...query, page } });
      this.goTop();
    },
    toggleSave(item) {
      this.savingId = item.id;
      const payload = { type: "blog", ref_id: item.id };
      this.toggleBookmark({ payload })
        .then(() => {
          const index = this.resources.findIndex((re) => re.id == item.id);
          let resource = this.resources[index];
          resource.is_saved = !item.is_saved;
          this.savingId = null;
          this.$toast.show(this.$t("success"));
        })
        .catch((error) => {
          let message = error.response?.data?.message || error;
          this.$toast.error(message);
          this.savingId = null;
        });
    },
    toggleSaveFile(item) {
      this.savingFileId = item.id;
      const payload = { type: "file", ref_id: item.id };
      this.toggleBookmark({ payload })
        .then(() => {
          const index = this.resources.findIndex((re) => re.id == item.id);
          let resource = this.resources[index];
          resource.is_saved = !item.is_saved;
          this.savingFileId = null;
          this.$toast.show(this.$t("success"));
        })
        .catch((error) => {
          let message = error.response?.data?.message || error;
          this.$toast.error(message);
          this.savingFileId = null;
        });
    },
    getChipLabel(item, subitem) {
      let found = this.filterOptions[item]?.find((opt) => opt.key == subitem);
      return found?.name || subitem;
    },
    closeFilterDialog(ref) {
      console.log(ref);
    },
  },
};
</script>

<style lang="scss">
.card-hover {
  transition: 200ms;

  &:hover {
    transform: scale(1.02);
    transition: 200ms;
  }
}
</style>
