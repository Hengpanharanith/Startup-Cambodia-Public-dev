<template>
  <v-container >
    <h1 class=" text-center my-4">
      {{ $t("insight.startup.title") }}
    </h1>

    <v-row>
      <v-col cols="12" sm="6" md="4">
        <CardPieChart
            @click-chart-item="onClickChartOverviewItem"
            :colors="['#334d9a', '#df6e5b', '#eb8d50', '#fcc055', '#4fb1a1']"
            :title="titleStartup.overview"
            :dataset="startupByCategory"
            :loading="category.loading"
        />
      </v-col>
      <!-- // $t('insight.startup.top_count_sector', { count: $localeNumb(10) }) -->
      <v-col cols="12" sm="6" md="4">
        <CardColumnChart2
            @click-chart-item="onClickChartStartupStageItem"
            :title="titleStartup.stage"
            :dataset="stages.dataset"
            :loading="stages.loading"
            :colors="['#df6e5b', '#eb8d50', '#fcc055', '#4fb1a1', '#326199', '#4f51b1']"
            sortColor
        />

      </v-col>
      <v-col cols="12" md="4">
        <CardBarChart
            @click-chart-item="onClickChartSectorItem"
            :title="
            $t('insight.startup.top_count_sector', { count: $localeNumb(5) })
          "
            :dataset="sectorList"
            :loading="sector.loading"
            :colors="[
            '#334d9a',
            '#4160c0',
            '#744da2',
            '#a8489d',
            '#d4458e',
            '#f44c76',
            '#ff6358',
            '#ff8337',
            '#ffa600',
          ]"
            sortColor
        />
      </v-col>
    </v-row>
    <br/>
    <client-only>
      <FeaturedSlider
          :title="$t('insight.startup.featured')"
          :items="featured.dataset"
      >
        <template v-slot="{ item }">
          <CardStartup
              :title="item.name"
              :thumbnail="item.logo"
              :models="item.industry"
              :establish-year="item.year_of_establishment"
              :incorporated-at="item.date_incorporated"
              :to="`/ecosystem/discover/category/startup/${item.id}`"
              :bizModel="item.business_model?.[0]"
              class="mb-8"
              style="height: 180px"
          />
        </template>
      </FeaturedSlider>
    </client-only>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      category: {
        loading: false,
        dataset: [],
      },
      sector: {
        loading: false,
        total: 0,
        dataset: [],
      },
      featured: {
        loading: false,
        dataset: [],
      },
      stages: {
        loading: false,
        dataset: [],
      },
    };
  },
  computed: {
    titleStartup() {
      return this.$t("insight.startup");
    },
    startupByStage() {
      return [
        {
          key: "IDEATION_CONCEPT",
          name: this.titleStartup.stage_1,
          value: 50,
        },
        {
          key: "PROTOTYPE",
          name: this.titleStartup.stage_2,
          value: 20,
        },
        {
          key: "EARLY_OPERATIONAL",
          name: this.titleStartup.stage_3,
          value: 30,
        },
        {
          key: "OPERATION",
          name: this.titleStartup.stage_4,
          value: 90,
        },
        {
          key: "SCALING_EXPANSION",
          name: this.titleStartup.stage_5,
          value: 10,
        },
      ];
    },
    startupByCategory() {
      return this.category.dataset.filter(
          ({name}) => name != "Tech-Enabled-Inactivated"
      );
    },
    sectorList() {
      return this.sector.dataset.filter(({industry}) => !!industry?.id);
    },
  },
  methods: {
    fetchOverview() {
      this.category.loading = true;
      this.$axios
          .get("/api/v1/data_insight/startup")
          .then((response) => {
            const _data = response.data.data || [];
            this.category.dataset = _data.map((item) => ({
              ...item,
              value: item.total,
            }));
          })
          .finally(() => {
            this.category.loading = false;
          });
    },
    fetchStatisticBySectors() {
      this.sector.loading = true;
      return this.$axios
          .get("/api/v1/data_insight/startup-sector", {
            params: {
              limit: 6,
            },
          })
          .then((response) => {
            const _data = response.data.data || [];
            this.sector.total = response.data.total_startup || 0;
            const dataset = _data
                .filter(({industry}) => !!industry?.id)
                .map((item) => ({
                  ...item,
                  name: item.industry?.name,
                  value: item.total,
                }));
            this.sector.dataset = dataset;
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            this.sector.loading = false;
          });
    },

    fetchFeaturedStartups() {
      this.featured.loading = true;
      this.$axios
          .get("/api/v1/data_insight/startup-highlighted")
          .then((response) => {
            this.featured.dataset = response.data.data || [];
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            this.featured.loading = false;
          });
    },
    fetchStartupStage() {
      this.stages.loading = true;
      this.$axios
          .get("/api/v1/data_insight/startup-stages")
          .then((response) => {
            let data = response.data.data || [];
            const mapper = {
              "IDEATION_CONCEPT_km": "គំនិតផ្តួចផ្តើមធុរកិច្ចថ្មី",
              "PROTOTYPE_km": "គម្រោងធុរកិច្ចថ្មី",
              "EARLY_OPERATIONAL_km": "ប្រតិបត្តិការដំបូង",
              "OPERATION_km": "ដំណើរការប្រតិបត្តិការ",
              "SCALING_EXPANSION_km": "ការធ្វើមាត្រដ្ឋាន និងពង្រីក",
              "NO_SPECIFIED_km": "មិនបានបញ្ជាក់",
              "IDEATION_CONCEPT_en": "Ideation & Concept",
              "PROTOTYPE_en": "Prototype",
              "EARLY_OPERATIONAL_en": "Early Operational",
              "OPERATION_en": "Operational",
              "SCALING_EXPANSION_en": "Scaling & Expansion",
              "NO_SPECIFIED_en": "Not specified",
            }

            this.stages.dataset = data.map((item) => ({
              ...item,
              name: mapper[`${item.key}_${this.$i18n.locale || 'en'}`],
            }));
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            this.stages.loading = false;
          });
    },
    onClickChartSectorItem(item) {
      const _name = item?.industry?.name_en || "";
      let url = `/ecosystem/discover/category/startup`;
      if (_name && _name != "Not Specified") {
        url += `?industry=${_name}`;
      }
      window.open(url);
    },
    onClickChartStartupStageItem(item) {
      const _name = item?.key || "";
      let url = `/ecosystem/discover/category/startup`;
      if (_name && _name != "Not Specified") {
        url += `?startup_stage=${_name}`;
      }
      window.open(url);
    },
    onClickChartOverviewItem(item) {
      let url = `/ecosystem/discover/category/startup?${item.params}`;
      window.open(url);
    },
  },
  mounted() {
    this.fetchOverview();
    this.fetchStatisticBySectors();
    this.fetchFeaturedStartups();
    this.fetchStartupStage();
  },
};
</script>
