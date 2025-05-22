<template>
  <div>
    <PageHeader :bannerUrl="bannerUrl" />
    <BreadcrumbsBar :breadcrumb-items="breadCrumbs" />
    <v-divider></v-divider>
    <v-container class="pt-4">
      <v-layout wrap>
        <v-col style="position: relative" cols="12" md="4" lg="3">
          <v-card rounded="lg" flat>
            <v-card-text>
              <v-layout class="gap" column>
                <DateRangePickerDialog
                  type="month"
                  :disable="filter.type == 'all'"
                  :value.sync="search.month_range"
                  @cleared="onFilterDate"
                  @picked="onFilterDate"
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
                      @change="(v) => onFilterChange(v, item.value)"
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
                            v-text="subitem.title"
                            class="py-1"
                          />
                        </template>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-layout>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="8" lg="9">
          <v-progress-linear
            v-show="isLoading"
            color="primary"
            indeterminate
          ></v-progress-linear>

          <v-card v-if="visibleSpotlight" class="mb-6" rounded="lg" flat>
            <v-carousel
              class="event-carousel"
              height="auto"
              hide-delimiter-background
              show-arrows-on-hover
              hide-delimiters
              cycle
            >
              <v-carousel-item v-for="(item, i) in spotlightsList" :key="i">
                <CardViewSpotLight
                  :thumbnail="item.image"
                  :label="item.title"
                  :start-datetime="item.start_datetime"
                  :end-datetime="item.end_datetime"
                  :event="item"
                />
              </v-carousel-item>
            </v-carousel>
          </v-card>
          <v-card rounded="lg" flat>
            <v-tabs-items
              :value="eventType"
              class="overflow-visible transparent"
              id="cardContainer"
              touchless
            >
              <v-tab-item :transition="false" class="transparent" value="all">
                <v-sheet
                  v-for="(events, key) in eventList"
                  :key="`event-${key}`"
                  class="mb-4"
                  color="transparent"
                  flat
                >
                  <v-card-title>{{
                    $moment(key).format("MMMM, YYYY")
                  }}</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col
                        v-for="(item, subKey) in events"
                        :key="`event-${key}-${subKey}`"
                        cols="12"
                        md="6"
                        lg="4"
                        xl="3"
                      >
                        <nuxt-link
                          :to="`/event/${item.id}`"
                          style="text-decoration: none"
                          class="fill-height"
                        >
                          <CardEvent
                            class="fill-height"
                            :label="item.title"
                            :datetime="item.start_datetime"
                            :hostBy="item.host_by"
                          />
                        </nuxt-link>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-sheet>
                <CardNoItem :visible="isEmpty" />
              </v-tab-item>
              <v-tab-item
                :transition="false"
                class="transparent"
                value="upcoming"
              >
                <v-sheet
                  v-for="(events, key) in upComingEventList"
                  :key="`upcoming-event-${key}`"
                  class="mb-4"
                  color="transparent"
                  flat
                >
                  <v-card-title>{{
                    $moment(key).format("MMMM, YYYY")
                  }}</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col
                        :key="`upcoming-event-${key}-${subKey}`"
                        v-for="(item, subKey) in events"
                        cols="12"
                        md="6"
                        lg="4"
                        xl="3"
                      >
                        <nuxt-link
                          :to="`/event/${item.id}`"
                          style="text-decoration: none"
                          class="fill-height"
                        >
                          <CardEvent
                            class="fill-height"
                            :label="item.title"
                            :datetime="item.start_datetime"
                            :hostBy="item.host_by"
                          />
                        </nuxt-link>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-sheet>
                <CardNoItem :visible="noUpcoming" />
              </v-tab-item>
              <v-tab-item :transition="false" class="transparent" value="past">
                <v-sheet
                  v-for="(events, key) in pastEventList"
                  :key="`past-event-${key}`"
                  class="mb-4"
                  color="transparent"
                  flat
                >
                  <v-card-title>{{
                    $moment(key).format("MMMM, YYYY")
                  }}</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col
                        :key="`past-event-${key}-${subKey}`"
                        v-for="(item, subKey) in events"
                        cols="12"
                        md="6"
                        lg="4"
                        xl="3"
                      >
                        <nuxt-link
                          :to="`/event/${item.id}`"
                          style="text-decoration: none"
                          class="fill-height"
                        >
                          <CardEvent
                            class="fill-height"
                            :label="item.title"
                            :datetime="item.start_datetime"
                            :hostBy="item.host_by"
                          />
                        </nuxt-link>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-sheet>
                <CardNoItem :visible="noPastEvent" />
              </v-tab-item>
            </v-tabs-items>
            <v-card-text v-if="search.totalPage > 1">
              <v-pagination
                @input="onPageChange"
                :value="currentPage"
                :total-visible="7"
                :length="search.totalPage"
                :disabled="isLoading"
                class="mb-8"
              ></v-pagination>
            </v-card-text>
          </v-card>
        </v-col>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import CardEvent from "@/components/CardView/CardEvent";
import CardViewSpotLight from "@/components/CardView/CardViewSpotLight";
import CardViewInfo from "@/components/CardView/CardViewInfo";
import PageHeader from "@/components/Common/PageHeader";
import LoadingCollapse from "@/components/LoadingCollapse";
import CardNoItem from "@/components/CardView/CardNoItem";

import { mapActions, mapState } from "vuex";
import BreadcrumbsBar from "../../components/bars/BreadcrumbsBar.vue";
import DateRangePickerDialog from "../../components/pickers/DateRangePickerDialog.vue";

export default {
  head: {
    title: "Program",
    meta: [
      {
        hid: "og:image",
        property: "og:image",
        content: "/images/community-calendar.jpeg",
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: "/images/community-calendar.jpeg",
      },
      {
        hid: "description",
        name: "description",
        content: "Startup Cambodia - Event",
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "Startup Cambodia - Event",
      },
    ],
  },
  layout: "common",
  components: {
    CardViewSpotLight,
    CardEvent,
    PageHeader,
    CardViewInfo,
    LoadingCollapse,
    CardNoItem,
    BreadcrumbsBar,
    DateRangePickerDialog,
  },
  data() {
    return {
      search: {
        month_range: [],
        eventTab: 0,
        currentPage: 1,
        totalPage: 1,
      },
      bannerUrl:
        "https://media.startupcambodia.gov.kh/platform/public-assets/banners/event.png",
      spotlightEvents: [],
      eventList: {},
      upComingEventList: {},
      pastEventList: {},
      filter: {
        type: "all",
      },
    };
  },
  async mounted() {
    await this.getSpotlights();
  },
  computed: {
    ...mapState("static", ["months"]),
    ...mapState("event", ["isLoading"]),
    ...mapState("event", { spotlightsList: "spotlights" }),
    visibleSpotlight() {
      return !!this.spotlightsList?.length;
    },
    isEmpty() {
      return !this.isLoading && !Object.keys(this.eventList).length;
    },
    noPastEvent() {
      return !this.isLoading && !Object.keys(this.pastEventList).length;
    },
    noUpcoming() {
      return !this.isLoading && !Object.keys(this.upComingEventList).length;
    },
    breadCrumbs() {
      return [
        { homePage: true, text: this.$t("breadcrumb.home"), to: "/" },
        { text: this.$t("breadcrumb.events"), disabled: true },
      ];
    },
    eventType() {
      return this.$route.query.type || "all";
    },
    currentPage() {
      return Number(this.$route.query.page || 1);
    },
    filterItems() {
      return [
        {
          title: this.$t("program_type"),
          name: "type",
          value: "type",
          items: [
            { title: this.$t("all"), value: "all" },
            { title: this.$t("upComingEvent"), value: "upcoming" },
            { title: this.$t("pastEvent"), value: "past" },
          ],
        },
      ];
    },
  },
  watch: {
    eventType(value) {
      this.search.month_range = Object.assign([]);
      this.filter.type = value || "all";
    },
    currentPage: {
      immediate: true,
      handler(v) {
        this.handleFilter();
      },
    },
  },
  methods: {
    ...mapActions("event", { getEvents: "get" }),
    ...mapActions("event", ["getSpotlights"]),
    onFilterChange(value, parent) {
      console.log(value, parent);
      if (parent == "type") this.changeEventView(value);
    },
    linkClass(idx) {
      if (this.search.eventTab == idx) {
        return "bg-primary white--text text-capitalize border-0 rounded-lg";
      }
      return "bg-transparent text-dark text-capitalize";
    },
    changeEventView(type) {
      const { query } = this.$route;
      let page = this.currentPage;
      if (page > 1) page = undefined;
      this.$router.push({ query: { ...query, type, page } });
      setTimeout(() => {
        this.handleFilter();
      }, 200);
    },
    handleFilter() {
      const type = this.eventType;
      if (type == "all") return this.getFilterEvent();
      if (type == "upcoming") return this.getUpcomingEvent();
      return this.getPastEvent();
    },
    getUpcomingEvent(page = 1) {
      this.getEvents({ params: { page, upcoming: true } })
        .then(({ total_page, data }) => {
          this.upComingEventList = Object.assign({}, data);
          this.search.totalPage = total_page;
        })
        .catch();
    },
    getPastEvent(page = 1) {
      this.getEvents({ params: { page, past: true } })
        .then(({ total_page, data }) => {
          this.pastEventList = Object.assign({}, data);
          this.search.totalPage = total_page;
        })
        .catch();
    },
    getFilterEvent() {
      const { month_range } = this.search;
      const page = this.currentPage;
      const rankStr = month_range.join();
      const month_year = rankStr == "," || rankStr == "" ? undefined : rankStr;
      this.getEvents({ params: { page, month_year } })
        .then(({ total_page, data }) => {
          this.eventList = Object.assign({}, data);
          this.search.totalPage = total_page;
        })
        .catch();
    },
    onFilterDate() {
      if (this.currentPage > 1) {
        const { query } = this.$route;
        this.$router.push({ query: { ...query, page: undefined } });
        return;
      }
      this.handleFilter();
    },
    onPageChange(page) {
      if (page == this.currentPage) return;
      const { query } = this.$route;
      this.$router.push({ query: { ...query, page } });
      this.goTop();
    },
    goTop() {
      let options = { duration: 300, offset: 70, easing: "linear" };
      this.$vuetify.goTo("#cardContainer", options);
    },
  },
};
</script>
<style>
#cardContainer {
  min-height: 40vh;
}

.v-carousel.event-carousel .v-window__container {
  padding-bottom: 2rem;
}

.v-carousel.event-carousel .v-window__container .v-window__prev,
.v-carousel.event-carousel .v-window__container .v-window__next {
  top: unset;
  bottom: 12.5rem;
  margin-right: 1rem;
}

.v-carousel.event-carousel .v-window__container .v-window__prev {
  right: 0;
  left: unset;
  bottom: 12.5rem;
  bottom: 10rem;
}

.v-window--show-arrows-on-hover.v-carousel.event-carousel .v-window__prev,
.v-window--show-arrows-on-hover.v-carousel.event-carousel .v-window__next {
  transform: translateY(0%);
  transform: translateX(200%);
}
.v-window--show-arrows-on-hover.v-carousel.event-carousel:hover .v-window__next,
.v-window--show-arrows-on-hover.v-carousel.event-carousel:hover
  .v-window__prev {
  transform: translateY(0%);
  transform: translateX(0%);
}

.v-window--show-arrows-on-hover.v-carousel.event-carousel .v-window__next,
.v-window--show-arrows-on-hover.v-carousel.event-carousel .v-window__prev {
  transition: 0.2s transform cubic-bezier(0.25, 0.8, 0.5, 1);
}
.v-window--show-arrows-on-hover.v-carousel.event-carousel .v-window__prev {
  transition: 0.4s transform cubic-bezier(0.25, 0.8, 0.5, 1);
}
</style>
