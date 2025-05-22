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
          <div v-if="filterItems.length">
            <v-label class="mb-2">{{ $t("button.filter") }}</v-label>
            <v-layout class="gap" wrap>
              <v-menu
                v-for="(item, key) in filterItems"
                :key="`filter-menu-${key}`"
                :close-on-content-click="false"
                max-height="30rem"
                max-width="600px"
                offset-y
                right
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" class="rounded pr-2" text>
                    {{ item.title }}
                    <span v-if="search[item.value].length">
                      ({{ search[item.value].length }})
                    </span>
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-card class="custom-shadow" rounded="lg">
                  <v-card-title>
                    {{ item.title }}
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-item-group
                      v-model="search[item.value]"
                      :multiple="item.multiple"
                    >
                      <v-row dense>
                        <v-col
                          v-for="subitem in item.items"
                          :key="`v-item-${item.value}-${subitem.value}`"
                          cols="12"
                          md="6"
                        >
                          <v-item
                            v-slot="{ active, toggle }"
                            :value="subitem.value"
                          >
                            <v-card class="d-flex align-start" flat>
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
                                class="cursor-pointer pt-2"
                                v-text="subitem.name"
                              />
                            </v-card>
                          </v-item>
                        </v-col>
                      </v-row>
                    </v-item-group>
                  </v-card-text>
                </v-card>
              </v-menu>
            </v-layout>
          </div>
          <v-divider class="mb-2"></v-divider>
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
            <v-expand-transition>
              <div v-show="showTags">
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
                        v-for="subitem in search[item.value]"
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
                <v-divider class="my-0"></v-divider>
              </div>
            </v-expand-transition>

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

    <v-expand-transition>
      <v-progress-linear
        v-show="isLoading"
        indeterminate
        color="primary"
      ></v-progress-linear>
    </v-expand-transition>
    <v-card-text>
      <v-row justify="center">
        <v-col
          v-for="(item, key) in networks"
          :key="'startup-' + key"
          cols="12"
          sm="6"
          md="6"
        >
          <!--          sm="6"-->
          <!--          md="6"-->

          <CardViewInvestorCompact
            :id="item.id"
            :to="`/ecosystem/discover/category/investor/${item.id}`"
            :thumbnail="item.logo"
            :type="item.investor_type"
            :text-title="item.name"
            :incorporated-at="item.date_incorporated"
            :investment-stage="item.investment_stage"
            :sectors="item.industry"
            @click-stage="onClickStage"
            @click-industry="onClickIndustry"
            class="fill-height"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <CardNoItem :visible="noItem" />
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
import { mapActions, mapState } from "vuex";
import CardViewInvestor from "@/components/CardView/CardViewInvestor";
import BreadcrumbsBar from "@/components/bars/BreadcrumbsBar.vue";
import CardNoItem from "@/components/CardView/CardNoItem.vue";

export default {
  head: { title: "Ecosystem" },
  layout: "common",
  components: {
    CardViewInvestor,
    BreadcrumbsBar,
    CardNoItem,
  },
  data() {
    return {
      search: {
        advanced: false,
        keyword: "",
        sort: "",
        investment_stage: [],
        industry: [],
      },
      filterOptions: {},
      networks: [],
      totalPage: 1,
      itemCount: 0,
      noItem: false,
      cohorts: [
        { header: "Today" },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Brunch this weekend?",
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Oui oui",
          subtitle:
            '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          title: "Birthday gift",
          subtitle:
            '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          title: "Recipe to try",
          subtitle:
            '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
    };
  },
  async fetch() {
    await this.getFilterOptions({ params: { stakeholder: "investor" } }).then(
      (result) => {
        const opts = { ...result };
        delete opts.status_code;
        this.filterOptions = Object.assign({}, opts);
      }
    );
    const { page, search, sort, investment_stage, industry } =
      this.$route.query;
    this.search.keyword = search;
    this.search.sort = sort;
    this.search.investment_stage = investment_stage?.split(",") || [];
    this.search.industry = industry?.split(",") || [];
    await this.getStakeHolder(page);
  },
  computed: {
    ...mapState("stakeholder", ["isLoading"]),
    breadCrumbs() {
      return [
        { homePage: true, text: this.$t("breadcrumb.home"), to: "/" },
        { text: this.$t("breadcrumb.ecosystem"), to: "/ecosystem" },
        {
          text: this.$t("breadcrumb.network.investor"),
          to: `/ecosystem/discover/category/investor`,
          disabled: true,
        },
      ];
    },
    currentPage() {
      return Number(this.$route.query.page || 1);
    },
    visibleSearch() {
      let { visible_search } = this.$route.query;
      return !!visible_search;
    },
    showTags() {
      const { investment_stage, industry } = this.search;
      return !!investment_stage.length || !!industry.length;
    },
    showPagination() {
      return this.totalPage > 1;
    },
    filterItems() {
      return Object.entries(this.filterOptions).map(([key, items]) => ({
        title: this.$t("form.common." + key),
        name: key,
        value: key,
        multiple: true,
        items: items.map((item) => ({
          ...item,
          value: encodeURIComponent(item.key),
        })),
      }));
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
          text: this.$t("date_incorporated	"),
          value: "date_incorporated	",
          iconAsc: "mdi-sort-calendar-ascending",
          iconDesc: "mdi-sort-calendar-descending",
        },
      ];
    },
    investmentStages() {
      return {
        pre_seed: { name: "Pre Seed", id: "pre_seed" },
        seed: { name: "Seed", id: "seed" },
        pre_series_a: { name: "Pre Series A", id: "pre_series_a" },
        series_a: { name: "Series A", id: "series_a" },
        series_b: { name: "Series B", id: "series_b" },
        series_c: { name: "Series C", id: "series_c" },
      };
    },
    investorTypes() {
      return {
        angel: { name: "Angel", id: "angel" },
        corporate_vc: { name: "Corporate VC", id: "corporate_vc" },
        crowdfunding_platform: {
          name: "Crowdfunding Platform",
          id: "crowdfunding_platform",
        },
        government_linked: {
          name: "Government Linked",
          id: "government_linked",
        },
        private_equity: { name: "Private Equity", id: "private_equity" },
        venture_capital: { name: "Venture Capital", id: "venture_capital" },
      };
    },
    sortText() {
      const item = this.orderItems.find((i) => i.value == this.search.sort);
      return item?.text || this.$t("form.common.label.default");
    },
  },
  watch: {
    currentPage(pageNumber) {
      this.getStakeHolder(pageNumber);
      this.goTop();
    },
    visibleSearch(v) {
      if (!v) return;
      this.goTop();
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
    "search.sort"(v) {
      this.onFilterChange("sort", v);
    },
    "search.investment_stage"(v) {
      this.onFilterChange("investment_stage", v.join(","));
    },
    "search.industry"(v) {
      this.onFilterChange("industry", v.join(","));
    },
    "$route.query.search"(v) {
      this.search.keyword = v || undefined;
      this.searchStakeholder();
    },
    "$route.query.sort"(v) {
      this.search.sort = v || undefined;
      this.searchStakeholder();
    },
    "$route.query.investment_stage"(v) {
      this.search.investment_stage = Object.assign([], v ? v.split(",") : []);
      this.searchStakeholder();
    },
    "$route.query.industry"(v) {
      this.search.industry = Object.assign([], v ? v.split(",") : []);
      this.searchStakeholder();
    },
  },
  methods: {
    ...mapActions("stakeholder", ["getStakeholderByCategory"]),
    ...mapActions("filter-option", { getFilterOptions: "get" }),
    advanceOptions() {
      const { investment_stage, industry } = this.$route.query;
      return { investment_stage, industry };
    },
    async getStakeHolder(page = 1) {
      const { keyword: search, sort } = this.search;
      const ordering = sort || undefined;
      let options = { params: { page_size: 12, page, search, ordering } };
      options.params = { ...options.params, ...this.advanceOptions() };
      return await this.getStakeholderByCategory({
        category: "investor",
        options,
      })
        .then((res) => {
          this.networks = Object.assign([], res.data);
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
    clearSearch() {
      this.$router.push({});
    },
    onFilterChange(key, val) {
      const { query } = this.$route;
      this.$router.push({ query: { ...query, [key]: val || undefined } });
    },
    searchStakeholder() {
      if (this.currentPage != 1) {
        const { query } = this.$route;
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
    deselectFilter(prop, subitem) {
      if (!subitem || !prop || !this.search[prop]) return;
      const idx = this.search[prop].findIndex((item) => subitem == item);
      if (idx == -1) return;
      this.search[prop].splice(idx, 1);
    },
    onClickStage(item) {
      const { query } = this.$route;
      this.$router.push({ query: { ...query, visible_search: true } });
      setTimeout(() => {
        this.search.investment_stage = Object.assign([], [item.key]);
      }, 50);
    },
    onClickIndustry(item) {
      const { query } = this.$route;
      this.$router.push({ query: { ...query, visible_search: true } });
      setTimeout(() => {
        this.search.industry = Object.assign([], [item.key]);
      }, 50);
    },
    onPageChange(page) {
      if (page != this.currentPage) {
        const { query } = this.$route;
        this.$router.push({ query: { ...query, page } });
      }
    },
    goTop() {
      let options = { duration: 300, offset: 75, easing: "linear" };
      this.$vuetify.goTo("#top-container", options);
    },
    getChipLabel(item, subitem) {
      let found = this.filterOptions[item]?.find((opt) => opt.key == subitem);
      return found?.name || subitem;
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
<style></style>
