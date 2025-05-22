<template>
  <v-card :disabled="isLoading" color="white" rounded="lg" flat>
    <portal to="breadcrumb">
      <div id="top-container" class="py-1"></div>
      <BreadcrumbsAdvanced :breadcrumb-items="breadCrumbs" class="mb-4">
        <template #right>
          <v-layout class="ml-auto gap" align-center justify-end>
            <SearchBar
              v-model="search.keyword"
              :readonly="isLoading"
              class="flex-grow-1"
              width="10rem"
            />
          </v-layout>
        </template>
      </BreadcrumbsAdvanced>
      <v-card
        style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
        rounded="lg"
        flat
      >
        <v-card-text>
          <v-layout column outlined>
            <div class="mb-2">{{ $t("form.common.label.sort_by") }} :</div>
            <v-item-group v-model="search.sort">
              <v-layout class="px-4 gap-lg" wrap>
                <div
                  v-for="sort in orderItems"
                  :key="`sort-by-${sort.value}`"
                  cols="6"
                  md="3"
                >
                  <v-layout class="gap" items-center>
                    <span>{{ sort.text }}</span>
                    <v-btn
                      @click="selectOrdering(sort.value)"
                      :color="activeSortColor(sort.value)"
                      class="rounded"
                      outlined
                      x-small
                      icon
                    >
                      <v-icon v-text="sort.iconAsc" small />
                    </v-btn>
                    <v-btn
                      v-if="sort.iconDesc"
                      @click="selectOrdering('-' + sort.value)"
                      :color="activeSortColor('-' + sort.value)"
                      class="rounded"
                      outlined
                      x-small
                      icon
                    >
                      <v-icon v-text="sort.iconDesc" small />
                    </v-btn>
                  </v-layout>
                </div>
              </v-layout>
            </v-item-group>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-expand-transition>
        <div>
          <v-card rounded="lg" flat>
            <v-card-text class="text-center" v-if="networks.length">
              {{ $t("network.showing") }}
              <strong>{{ networks.length }} </strong>
              {{ $t("network.of") }} {{ itemCount }}
              {{ $t("network.result") }}
            </v-card-text>
            <v-card-text v-else class="text-center">{{
              $t("noItem")
            }}</v-card-text>
          </v-card>
        </div>
      </v-expand-transition>
    </portal>
    <v-card-text id="top-container">
      <v-expand-transition>
        <v-progress-linear
          v-show="isLoading"
          indeterminate
          color="primary"
        ></v-progress-linear>
      </v-expand-transition>
      <v-card :disabled="isLoading" color="transparent" flat>
        <v-row justify="center">
          <v-col
            v-for="(item, key) in networks"
            :key="'startup-' + key"
            cols="12"
            sm="6"
          >
            <CardViewStakeholder
              class="fill-height"
              :id="item.id"
              :type="stakeholderType"
              :to="`/ecosystem/discover/category/${categoryName}/${item.id}`"
              :thumbnail="item.logo"
              :title="item.name"
              :descriptor="item.description"
              :establish-year="item.year_of_establishment"
              :cooperate-date="item.date_incorporated"
            />
          </v-col>
        </v-row>
      </v-card>
      <CardNoItem :visible="noItem" />
    </v-card-text>
    <v-card-actions class="justify-center pb-4" v-if="showPagination">
      <v-pagination
        @input="onPageChange"
        :value="currentPage"
        :total-visible="7"
        :length="totalPage"
        :disabled="isLoading"
      ></v-pagination>
    </v-card-actions>
  </v-card>
</template>
<script>
import PageHeader from "@/components/Common/PageHeader";
import CardViewStakeholder from "@/components/CardView/CardViewStakeholder";
import CardViewMentor from "@/components/CardView/CardViewMentor";
import CardViewInvestor from "@/components/CardView/CardViewInvestor";
import CardViewEvent from "@/components/CardView/CardViewEvent";
import CardViewInfo from "@/components/CardView/CardViewInfo";
import NetworkSubNavbar from "@/components/Common/NetworkSubNavbar";
import LoadingCollapse from "@/components/LoadingCollapse";

import { mapActions, mapState } from "vuex";

export default {
  head: { title: "Ecosystem Detail" },
  layout: "common",
  components: {
    PageHeader,
    CardViewStakeholder,
    CardViewMentor,
    CardViewInvestor,
    CardViewEvent,
    CardViewInfo,
    NetworkSubNavbar,
    LoadingCollapse,
  },
  data() {
    return {
      search: {
        advanced: false,
        keyword: "",
        sort: "",
      },
      networks: [],
      totalPage: 1,
      itemCount: 0,
      noItem: false,
    };
  },
  async fetch() {
    const { page, search, sort } = this.$route.query;
    this.search.keyword = search;
    this.search.sort = sort;
    await this.getStakeHolder(page);
  },
  computed: {
    ...mapState("stakeholder", ["isLoading"]),
    breadCrumbs() {
      return [
        { homePage: true, text: this.$t("breadcrumb.home"), to: "/" },
        { text: this.$t("breadcrumb.ecosystem"), to: "/ecosystem" },
        {
          text: this.$t("breadcrumb.network." + this.categoryName),
          to: `/ecosystem/discover/category/startup`,
          disabled: true,
        },
      ];
    },
    visibleSearch() {
      let { visible_search } = this.$route.query;
      return !!visible_search;
    },
    categoryName() {
      let category = this.$route.params.networkCategory;
      if (!category) {
        return this.$t("all");
      }
      return category;
    },
    stakeholderType() {
      let category = this.$route.params.networkCategory.replace("-", "_");
      if (!category) {
        return "";
      }
      return category;
    },
    orderItems() {
      return [
        {
          text: this.$t("form.common.label.default"),
          value: "",
          iconAsc: "mdi-sort",
        },
        {
          text: this.$t("form.common.label.name"),
          value: "name",
          iconAsc: "mdi-sort-alphabetical-descending",
          iconDesc: "mdi-sort-alphabetical-ascending",
        },
        // {
        //   text: this.$t("investment_stage"),
        //   value: "investment_stage",
        //   iconAsc: "mdi-sort-ascending",
        //   iconDesc: "mdi-sort-descending",
        // },
        {
          text: this.$t("establishment_year"),
          value: "year_of_establishment",
          iconAsc: "mdi-sort-calendar-ascending",
          iconDesc: "mdi-sort-calendar-descending",
        },
      ];
    },
    sortText() {
      const item = this.orderItems.find((i) => i.value == this.search.sort);
      return item?.text || "Default";
    },
    showPagination() {
      return this.totalPage > 1;
    },
    currentPage() {
      return Number(this.$route.query.page || 1);
    },
  },
  watch: {
    currentPage(page) {
      this.getStakeHolder(page);
    },
    visibleSearch(v) {
      if (!v) return;
      this.goTop();
    },
    categoryName(v) {
      this.getStakeHolder(1);
    },
    "search.sort"(v) {
      this.onFilterChange("sort", v);
    },
    "search.keyword"(v) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.onFilterChange("search", v);
      }, 800);
    },
    "$route.query.search"(v) {
      this.search.keyword = v || undefined;
      this.searchStakeholder();
    },
    "$route.query.sort"(v) {
      this.search.sort = v || undefined;
      this.searchStakeholder();
    },
  },
  methods: {
    ...mapActions("stakeholder", ["getStakeholderByCategory"]),
    async getStakeHolder(page = 1) {
      const { keyword: search, sort } = this.search;
      const ordering = sort || undefined;
      let category = this.categoryName;
      let options = { params: { page_size: 16, page, search, ordering } };

      return this.getStakeholderByCategory({ category, options })
        .then((res) => {
          this.networks = res.data;
          this.totalPage = res.total_page;
          this.itemCount = res.item_count;
          this.noItem = !res.data.length;
        })
        .catch((e) => {
          this.noItem = true;
          this.networks = [];
          this.totalPage = 1;
        });
    },
    selectOrdering(value) {
      this.search.sort = value;
    },
    linkGen(pageNum) {
      return `?page=${pageNum}`;
    },
    toggleAdvanceSearch() {
      this.search.advanced = !this.search.advanced;
    },
    onFilterChange(key, val) {
      const { query } = this.$route;
      this.$router.push({ query: { ...query, [key]: val || undefined } });
    },
    searchStakeholder() {
      const { query } = this.$route;
      if (query.page != 1) {
        this.$router.replace({ query: { ...query, page: 1 } });
        return;
      }

      if (this.searchTimer) {
        clearTimeout(this.searchTimer);
        this.searchTimer = null;
      }
      this.searchTimer = setTimeout(() => {
        this.getStakeHolder();
      }, 100);
    },
    onPageChange(page) {
      if (page != this.currentPage) {
        const { query } = this.$route;
        this.$router.push({ query: { ...query, page } });
        this.goTop();
      }
    },
    goTop() {
      let options = { duration: 300, offset: 75, easing: "linear" };
      this.$vuetify.goTo("#top-container", options);
    },
    activeSortColor(value = "") {
      const s = this.search.sort || "";
      if (s == value) return "primary";
    },
    selectOrdering(value) {
      this.search.sort = value;
    },
  },
};
</script>
<style>
.page-item > :not(.nuxt-link-exact-active) {
  color: black !important;
}
</style>
