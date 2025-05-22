<template>
  <div>
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
          <v-divider />
          <v-layout column outlined>
            <div class="pt-2 mb-2">{{ $t("form.common.label.sort_by") }} :</div>
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
        <v-progress-linear
          v-show="isLoading"
          indeterminate
          color="primary"
        ></v-progress-linear>
      </v-expand-transition>
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
                    {{ decodeURIComponent(getChipLabel(item.value, subitem)) }}
                  </v-chip>
                </template>
              </v-layout>
            </v-card-text>
            <v-divider class="my-0"></v-divider>
          </div>
        </v-expand-transition>
        <v-card-text v-if="networks.length" class="text-center">
          {{ $t("network.showing") }}
          <strong>{{ networks.length }} </strong> {{ $t("network.of") }}
          {{ itemCount }} {{ $t("network.result") }}
        </v-card-text>
        <v-card-text v-else class="text-center">{{ $t("noItem") }}</v-card-text>
      </v-card>
    </portal>
    <v-card
      :disabled="isLoading"
      class="custom-shadow"
      color="white"
      rounded="lg"
    >
      <v-card-text>
        <v-row justify="center">
          <v-col
            v-for="(item, key) in networks"
            :key="'startup-' + key"
            cols="12"
            sm="6"
            lg="4"
          >
            <CardStartupOutlined
              :to="`/ecosystem/discover/category/startup/${item.id}`"
              :id="item.id"
              :fundingAmount="item.funding_amount"
              :fundingCurrency="item.funding_currency"
              :thumbnail="item.logo"
              :text-title="item.name"
              :incorporated-at="item.date_incorporated"
              :establish-year="item.year_of_establishment"
              :sectors="item.industry"
              :models="item.business_model"
              @click-stage="onClickStage"
              @click-industry="onClickIndustry"
              @click-model="onClickModel"
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

    <!-- </v-container> -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CardViewStartup from "@/components/CardView/CardViewStartup";
import BreadcrumbsBar from "@/components/bars/BreadcrumbsBar.vue";
import CardNoItem from "@/components/CardView/CardNoItem.vue";

export default {
  head: { title: "Ecosystem" },
  components: {
    CardViewStartup,
    BreadcrumbsBar,
    CardNoItem,
  },
  data() {
    return {
      search: {
        keyword: "",
        sort: "",
        industry: [],
        business_model: [],
        funding_stage: [],
        looking_at: [],
        startup_stage: [],
      },
      dialog: {},
      filterOptions: {},
      networks: [],
      totalPage: 1,
      itemCount: 0,
      noItem: false,
    };
  },
  async fetch() {
    const {
      page,
      search,
      sort,
      industry,
      business_model,
      funding_stage,
      looking_at,
      startup_stage,
    } = this.$route.query;
    this.search.keyword = search;
    this.search.sort = sort;
    this.search.industry = industry?.split(",") || [];
    this.search.business_model = business_model?.split(",") || [];
    this.search.funding_stage = funding_stage?.split(",") || [];
    this.search.looking_at = looking_at?.split(",") || [];
    this.search.startup_stage = startup_stage?.split(",") || [];
    await this.getStakeHolder(page);
  },
  computed: {
    ...mapState("stakeholder", ["isLoading"]),
    ...mapState("expertise", { expertiseList: "dataList" }),
    breadCrumbs() {
      return [
        { homePage: true, text: this.$t("breadcrumb.home"), to: "/" },
        { text: this.$t("breadcrumb.ecosystem"), to: "/ecosystem" },
        {
          text: this.$t("breadcrumb.network.startup"),
          to: `/ecosystem/discover/category/startup`,
          disabled: true,
        },
      ];
    },
    visibleSearch() {
      let { visible_search } = this.$route.query;
      return !!visible_search;
    },
    currentPage() {
      return Number(this.$route.query.page || 1);
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
          iconAsc: "mdi-sort-alphabetical-ascending",
          iconDesc: "mdi-sort-alphabetical-descending",
        },
        {
          text: this.$t("date_incorporated	"),
          value: "date_incorporated	",
          iconAsc: "mdi-sort-calendar-ascending",
          iconDesc: "mdi-sort-calendar-descending",
        },
        {
          text: this.$t("establishment_year"),
          value: "year_of_establishment",
          iconAsc: "mdi-sort-calendar-ascending",
          iconDesc: "mdi-sort-calendar-descending",
        },
      ];
    },
    showPagination() {
      return this.totalPage > 1;
    },
    showTags() {
      const {
        industry,
        business_model,
        funding_stage,
        looking_at,
        startup_stage,
      } = this.search;
      return (
        !!business_model.length ||
        !!funding_stage.length ||
        !!industry.length ||
        !!looking_at.length ||
        !!startup_stage.length
      );
    },
  },
  watch: {
    currentPage: {
      handler(pageNumber) {
        this.getStakeHolder(pageNumber);
      },
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
    "search.industry"(v) {
      this.onFilterChange("industry", v.join(","));
    },
    "search.business_model"(v) {
      this.onFilterChange("business_model", v.join(","));
    },
    "search.startup_stage"(v) {
      this.onFilterChange("startup_stage", v.join(","));
    },
    "search.funding_stage"(v) {
      this.onFilterChange("funding_stage", v.join(","));
    },
    "search.looking_at"(v) {
      this.onFilterChange("looking_at", v.join(","));
    },
    "$route.query.search": {
      handler(v) {
        this.search.keyword = v || undefined;
        this.searchStakeholder();
      },
    },
    "$route.query.sort": {
      handler(v) {
        this.search.sort = v || undefined;
        this.searchStakeholder();
      },
    },
    "$route.query.industry": {
      handler(v) {
        this.search.industry = Object.assign([], v ? v.split(",") : []);
        this.searchStakeholder();
      },
    },
    "$route.query.business_model": {
      handler(v) {
        this.search.business_model = Object.assign([], v ? v.split(",") : []);
        this.searchStakeholder();
      },
    },
    "$route.query.funding_stage": {
      handler(v) {
        this.search.funding_stage = Object.assign([], v ? v.split(",") : []);
        this.searchStakeholder();
      },
    },
    "$route.query.startup_stage": {
      handler(v) {
        this.search.startup_stage = Object.assign([], v ? v.split(",") : []);
        this.searchStakeholder();
      },
    },
    "$route.query.looking_at": {
      handler(v) {
        this.search.looking_at = Object.assign([], v ? v.split(",") : []);
        this.searchStakeholder();
      },
    },
  },
  mounted() {
    this.getFilterOptions({
      params: { page_size: 999, stakeholder: "startup" },
    }).then((result) => {
      const opts = { ...result };
      delete opts.status_code;

      if (this.$i18n.locale == "km") {
        const mapper = {
          IDEATION_CONCEPT: "គំនិតផ្តួចផ្តើមធុរកិច្ចថ្មី",
          PROTOTYPE: "គម្រោងធុរកិច្ចថ្មី",
          EARLY_OPERATIONAL: "ប្រតិបត្តិការដំបូង",
          OPERATION: "ដំណើរការប្រតិបត្តិការ",
          SCALING_EXPANSION: "ការធ្វើមាត្រដ្ឋាន និងពង្រីក",
          NO_SPECIFIED: "មិនបានបញ្ជាក់",
        };

        opts.startup_stage = opts.startup_stage.map((item) => ({
          ...item,
          name: mapper[item.key] || item.name,
        }));
      }

      this.filterOptions = Object.assign({}, opts);
    });
  },
  methods: {
    ...mapActions("stakeholder", ["getStakeholderByCategory"]),
    ...mapActions("filter-option", { getFilterOptions: "get" }),
    advanceOptions() {
      const {
        industry,
        business_model,
        funding_stage,
        looking_at,
        startup_stage,
      } = this.$route.query;
      return {
        industry,
        business_model,
        funding_stage,
        looking_at,
        startup_stage,
      };
    },
    selectOrdering(value) {
      this.search.sort = value;
    },
    selectFiltering(value) {
      this.search.filter = value;
    },
    clearSearch() {
      this.$router.push({});
    },
    async getStakeHolder(page = 1) {
      const { keyword: search, sort } = this.search;
      const ordering = sort || undefined;
      let options = {
        params: {
          page_size: 12,
          page,
          search,
          ordering,
          ...this.advanceOptions(),
        },
      };

      return await this.getStakeholderByCategory({
        category: "startup",
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
    onFilterChange(key, val) {
      const { query } = this.$route;

      this.$router.push({ query: { ...query, [key]: val || undefined } });
    },
    searchStakeholder() {
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
      this.setFilter("funding_stage", [item.key]);
    },
    onClickIndustry(item) {
      this.setFilter("industry", [item.key]);
    },
    onClickModel(item) {
      this.setFilter("business_model", [item.key]);
    },
    setFilter(prop, items = []) {
      const { query } = this.$route;
      this.$router.push({ query: { ...query, visible_search: true } });
      setTimeout(() => {
        this.search[prop] = Object.assign([], items);
      }, 50);
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
