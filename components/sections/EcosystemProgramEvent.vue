<template>
  <v-container>
    <h1 class="text-center my-4">
      {{ $t("insight.program_event.section_title") }}
    </h1>
    <v-row>
      <v-col cols="12" md="4">
        <CardHero
          :title="$t('insight.program_event.title')"
          :subtitle="$t('insight.program_event.description')"
        />
        <!-- thumbnail="/images/ecosystem/undraw_Team_page_re_cffb.png" -->
      </v-col>
      <!-- <v-col cols="12" md="8">
        <v-row> -->
      <v-col cols="12" sm="4">
        <CardPieChart
            @click-chart-item="onProgramTypeClick"
          :title="$t('insight.program_event.program.title')"
          :dataset="programs.dataset"
          :loading="loading"
          :colors="[
            '#ffa600',
            '#ff8337',
            '#ff6358',
            '#f44c76',
            '#d4458e',
            '#a8489d',
            '#744da2',
            '#4160c0',
            '#334d9a',
          ]"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <CardPieChart
          :title="$t('insight.program_event.event.text')"
          :dataset="events.dataset"
          :loading="loading"
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
        />
      </v-col>
      <v-col cols="12" sm="8">
        <CardSwiperGrid
          @click-chart-item="onTreeMapItemClick"
          :title="$t('insight.program_event.program.by_field')"
          :dataset="programs.datasetByFields"
          :loading="loading"
          cols="3"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <CardHighlightedEvent
          :items="events.highlights"
          style="min-height: 400px"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      programs: {
        dataset: [],
        datasetByFields: [],
      },
      events: {
        dataset: [],
        highlights: [],
      },
    };
  },
  computed: {
    iconsList() {
      return [
        require("@/static/icons/ecosystem/Incubator_Black.svg?raw"),
        require("@/static/icons/ecosystem/Investor_Black.svg?raw"),
        require("@/static/icons/ecosystem/Rocket.svg?raw"),
        require("@/static/icons/ecosystem/Corporate_Black.svg?raw"),
        require("@/static/icons/ecosystem/Media_Black.svg?raw"),
        require("@/static/icons/ecosystem/Service Provider_Black.svg?raw"),
        require("@/static/icons/ecosystem/Development Partner.svg?raw"),
        require("@/static/icons/ecosystem/Co Working Space_Black.svg?raw"),
        require("@/static/icons/ecosystem/Community_Black.svg?raw"),
      ];
    },
  },

  methods: {
    fetchOverview() {
      this.loading = true;
      this.$axios
        .get("/api/v1/data_insight/program", {
          params: { highlighted_count: 16 },
        })
        .then((response) => {
          const programs = response.data?.program_by_type?.data || [];
          console.log("programs=====", programs);
          const programByFields = response.data?.program_by_fields?.data || [];
          const eventByFields = response.data?.event_by_fields?.data || [];
          const events = response.data?.highlighted_events || [];
          this.programs.dataset = programs.map((item) => ({
            ...item,
            name: item.name,
            value: item.total,
          }));
          this.programs.datasetByFields = programByFields.map(
            (item, index) => ({
              name: item.name || this.$t("others"),
              icon: this.iconsList[index],
              name_en: item.name_en,
              value: item.total,
              slug: item.slug,
            })
          );
          this.events.dataset = eventByFields.map((item) => ({
            name: item.name,
            value: item.total,
          }));

          this.events.highlights = events;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onTreeMapItemClick(item) {
      this.$router.push({
        path: "/program",
        query: { category: encodeURIComponent(item.slug) },
      });
    },
    onProgramTypeClick(item) {
      let _type = "";
      if (item.name_en == "National") _type = "NTL";
      if (item.name_en == "International") _type = "GLO";

      this.$router.push({ path: "/program", query: { program_type: _type } });
    },
  },
  mounted() {
    this.fetchOverview();
  },
};
</script>
