<template>
  <v-container class="event-detail pt-6 mb-6">
    <BreadcrumbsAdvanced :breadcrumb-items="breadCrumbs" />
    <v-progress-linear
      v-show="isLoading"
      color="primary"
      indeterminate
    ></v-progress-linear>
    <br />
    <v-row v-if="event">
      <v-col cols="12" lg="7">
        <v-expand-transition>
          <v-card v-if="showContent" rounded="lg" flat>
            <v-img
              :aspect-ratio="16 / 9"
              :src="thumbnail"
              class="mb-4"
              alt=""
              cover
            />
            <div class="blog-details__date bg-primary">
              {{ startDate }}
            </div>
            <v-card-title class="blog-details__title text-capitalize mb-0"
              >{{ event.title }}
            </v-card-title>
            <v-card-text>
              <div v-html="event.detail" class="ql-editor"></div>
            </v-card-text>
          </v-card>
        </v-expand-transition>
      </v-col>
      <v-col cols="12" lg="5">
        <v-expand-transition>
          <div v-if="showContent">
            <v-card class="mb-5" rounded="lg" flat>
              <v-card-text>
                <v-list>
                  <v-subheader class="font-weight-bold"
                    >{{ $t("organize_by") }} &nbsp;
                    <a
                      v-if="event.host_by_source"
                      :href="event.host_by_source"
                      target="_blank"
                      >{{ event.host_by || $t("n_a") }}</a
                    >
                    <span v-else>{{ event.host_by || $t("n_a") }}</span>
                  </v-subheader>
                  <v-list-item v-if="startDate && endDate">
                    <v-list-item-icon class="mr-4">
                      <v-icon>mdi-calendar</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content
                      >{{ startDate }} -
                      {{ endDate }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="startDate && endDate">
                    <v-list-item-icon class="mr-4">
                      <v-icon>mdi-clock-outline </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content
                      >{{ displayTime }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon class="mr-4">
                      <v-icon>mdi-map-marker-outline </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <!-- {{
                          event.address || $t("n_a")
                        }} -->

                      <a
                        v-if="event.address_link"
                        :href="event.address_link"
                        target="_blank"
                        >{{ event.address || $t("n_a") }}</a
                      >
                      <span v-else> {{ event.address || $t("n_a") }}</span>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-btn
                      :href="event.join_url"
                      target="_blank"
                      elevation="0"
                      class="rounded-lg"
                      color="primary"
                      :disabled="!event.join_url || isBeforeNow"
                    >
                      {{ $t("joinHere") }}
                    </v-btn>
                    <v-btn
                      @click.prevent="toggleSave"
                      :loading="isSaving"
                      class="mx-2"
                      elevation="0"
                      color="primary"
                      icon
                      tile
                    >
                      <v-icon>
                        {{ saveIcon }}
                      </v-icon>
                    </v-btn>
                    <v-menu>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          class="mx-2"
                          elevation="0"
                          color="primary"
                          icon
                          tile
                        >
                          <v-icon> mdi-share-variant </v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="(item, index) in shareOptions"
                          :key="index"
                          @click.stop="shareTo(event, item.type)"
                        >
                          <v-list-item-icon class="mr-2">
                            <v-icon>{{ item.icon }} </v-icon>
                          </v-list-item-icon>
                          <v-list-item-title
                            >{{ item.text }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
            <div v-if="event.upcomming_events && event.upcomming_events.length">
              <h3 class="sidebar__title mb-4">
                {{ $t("event.upcoming") }}
              </h3>
              <div
                class="mb-6"
                v-for="event in event.upcomming_events"
                :key="event.id"
              >
                <nuxt-link
                  :to="`/event/${event.id}`"
                  class="text-decoration-none w-100"
                >
                  <CardEvent
                    class="h-100"
                    :label="event.title"
                    :datetime="event.start_datetime"
                    :hostBy="event.host_by"
                  />
                </nuxt-link>
              </div>
            </div>
          </div>
        </v-expand-transition>
      </v-col>
    </v-row>

    <template v-if="showInterest">
      <v-row class="px-4">
        <h3 class="sidebar__title">
          {{ $t("eventYouMightBeIn") }}
        </h3>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="4"
          v-for="event in event.you_may_interest"
          :key="event.id"
        >
          <nuxt-link
            :to="`/event/${event.id}`"
            class="text-decoration-none w-100 fill-height"
          >
            <CardEvent
              class="fill-height"
              :label="event.title"
              :datetime="event.start_datetime"
              :hostBy="event.host_by"
            />
          </nuxt-link>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>
<script>
import PageHeader from "@/components/Common/PageHeader";
import CardViewEvent from "@/components/CardView/CardViewEvent";
import { mapActions, mapState } from "vuex";
import BreadcrumbsBar from "../../components/bars/BreadcrumbsBar.vue";

export default {
  head() {
    let img = this.event.image;
    let title = this.event.title || "Event Detail";
    const descHtml = this.event.detail || "";
    const desc = descHtml.replace(/<[^>]+>/g, "").slice(0, 255);
    return {
      title,
      meta: [
        { hid: "og:title", property: "og:title", content: title },
        { hid: "og:type", property: "og:type", content: "article" },
        { hid: "image", name: "image", content: img },
        { hid: "og:image", property: "og:image", content: img },
        { hid: "description", name: "description", content: desc },
        {
          hid: "og:description",
          property: "og:description",
          content: desc,
        },
        {
          hid: "twitter:image",
          property: "twitter:image",
          content: img,
        },
        {
          hid: "twitter:title",
          property: "twitter:title",
          content: title,
        },
        {
          hid: "twitter:description",
          property: "twitter:description",
          content: desc,
        },
        {
          hid: "twitter:card",
          property: "twitter:card",
          content: "summary_large_image",
        },
      ],
    };
  },
  components: {
    PageHeader,
    CardViewEvent,
    BreadcrumbsBar,
  },
  data() {
    return {
      bannerUrl: "/images/program/banner.png",
      event: {},
    };
  },
  computed: {
    ...mapState("saving-list", { isSaving: "isLoading" }),
    ...mapState("event", { eventList: "dataList", isLoading: "isLoading" }),
    ...mapState("user", ["currentUser"]),

    thumbnail() {
      return this.event?.image || "/images/default-image.png";
    },
    showInterest() {
      return !!this.event?.you_may_interest?.length;
    },
    breadCrumbs() {
      let breadcrumb = [
        { homePage: true, text: this.$t("breadcrumb.home"), to: "/" },
        { text: this.$t("breadcrumb.events"), to: "/event" },
      ];
      if (!this.event.title) breadcrumb;
      breadcrumb.push({ text: this.event.title, disabled: true });
      return breadcrumb;
    },
    startDate() {
      let isKm = this.$i18n.locale == "km";
      let date = this.event.start_datetime || new Date();
      if (isKm) return this.$moment(date).locale("km").format("DD MMM YYYY");
      return this.$moment(date).format("MMMM DD, YYYY");
    },
    endDate() {
      let isKm = this.$i18n.locale == "km";
      let date = this.event.end_datetime || new Date();
      if (isKm) return this.$moment(date).locale("km").format("DD MMM YYYY");
      return this.$moment(date).format("MMMM DD, YYYY");
    },
    isBeforeNow() {
      // check if current date time is before event start date time
      let date = this.event.end_datetime;
      return this.$moment(date).isBefore(new Date());
    },
    showContent() {
      let hasContent = Object.keys(this.event).length > 0;
      return !this.isLoading && hasContent;
    },
    displayTime() {
      const { start_datetime, end_datetime } = this.event;
      return `${this.$moment(start_datetime).format(
        "hh:mm A"
      )} - ${this.$moment(end_datetime).format("hh:mm A")}`;
    },
    shareOptions() {
      return [
        {
          text: this.$t("menu.share_to.linkedin"),
          icon: "mdi-linkedin",
          type: "linkedin",
        },
        {
          text: this.$t("menu.share_to.facebook"),
          icon: "mdi-facebook",
          type: "facebook",
        },
        {
          text: this.$t("menu.share_to.twitter"),
          icon: "mdi-twitter",
          type: "twitter",
        },
        {
          text: this.$t("menu.share_to.telegram"),
          icon: "mdi-send-circle",
          type: "telegram",
        },
      ];
    },
    saveIcon() {
      return this.event?.is_saved ? "mdi-bookmark" : "mdi-bookmark-outline";
    },
  },
  async fetch() {
    await this.getEvent();
  },
  methods: {
    ...mapActions("saving-list", { toggleBookmark: "create" }),
    ...mapActions("event", { getEventById: "getById" }),
    ...mapActions("app", ["setAuthDialogVisibility"]),
    getEvent() {
      const { eventId } = this.$route.params;
      let eve = this.getEventById({ id: eventId });
      eve.then((res) => {
        this.event = Object.assign({}, res);
      });
      return eve;
    },
    initSlider() {
      this.swiperEvent = new this.$swiper(".swiperRelatedEvent", {
        slidesPerView: 3,
        spaceBetween: 16,
        // slidesPerGroup: 3,
        loop: true,
        loopFillGroupWithBlank: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          "@0.00": { slidesPerView: 2, spaceBetween: 20 },
          "@0.75": { slidesPerView: 3, spaceBetween: 30 },
          "@1.00": { slidesPerView: 4, spaceBetween: 40 },
          "@1.50": { slidesPerView: 5, spaceBetween: 50 },
        },
      });
    },
    shareTo(event, type) {
      const DOMAIN2SHARE = this.$config.SHARE_URL || window?.location?.origin;
      let url = DOMAIN2SHARE + "/event/" + this.event.id;
      let text = event.title;
      const shareURL = {
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&title=${text}&url=${url}`,
        facebook: `https://facebook.com/sharer/sharer.php?u=${url}`,
        twitter: `https://twitter.com/share?url=${url}&text=${text}`,
        telegram: `https://t.me/share/url?url=${url}&text=${text}`,
      };

      if (!!shareURL[type]) window.open(shareURL[type]);
    },
    toggleSave() {
      

      if (!this.currentUser) {
        
        this.setAuthDialogVisibility(true);
        return;
      }

      if (!this.currentUser) {
        
        this.setAuthDialogVisibility(true);
        return;
      }
      const payload = { type: "event", ref_id: this.event.id };
      this.toggleBookmark({ payload })
        .then(() => {
          this.event.is_saved = !this.event.is_saved;
          this.$toast.show(this.$t("success"));
        })
        .catch((error) => {
          let message = error.response?.data?.message;
          this.$toast.error(message);
        });
    },
  },
};
</script>

<style scoped>
.list-group-item {
  border: none !important;
}

.event-detail {
  min-height: 50vh;
}

.card-event__wrapper {
  height: 320px;
}
</style>
