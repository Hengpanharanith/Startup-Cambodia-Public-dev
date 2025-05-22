<template>
  <v-card
    class="blog-details__content sport-light text-left"
    flat
  >
    <v-img
      v-if="!!thumbnail"
      :src="thumbnail"
      :aspect-ratio="3 / 1"
      min-height="15rem"
      alt="Event Image"
    />
    <v-divider></v-divider>
    <div class="blog-details__date bg-primary">
      <span class="text-break">{{ $t("spotlight") }}</span>
    </div>
    <v-card-title primary-title>{{ label }}</v-card-title>
    <v-card-subtitle class="pb-2"><span class="
          blog-details__meta-link
          primary--text
          text-uppercase
          font-weight-bold
        ">{{ $t("organize_by") }} {{ event.host_by }}</span></v-card-subtitle>
    <v-card-text>
      <p
        v-if="!!displayDate"
        class="mb-2 mb-md-0"
      >
        <v-icon>mdi-calendar</v-icon> {{ displayDate }}
      </p>
      <v-btn
        :to="`/event/${event.id}`"
        class="rounded-lg d-md-none"
        color="primary"
        elevation="0"
        block
      >{{ $t("findOutMore") }}</v-btn>
      <v-btn
        :to="`/event/${event.id}`"
        class="rounded-lg d-none d-md-inline-flex"
        color="primary"
        elevation="0"
        absolute
        bottom
        right
      >{{ $t("findOutMore") }}</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import ButtonPrimary from "../Button/ButtonPrimary";
export default {
  name: "CardViewSpotLight",
  components: { ButtonPrimary },
  props: {
    label: String,
    thumbnail: String,
    startDatetime: String,
    endDatetime: String,
    event: { type: Object, default: () => {} },
  },
  data() {
    return {};
  },
  computed: {
    displayDate() {
      const { startDatetime, endDatetime } = this;
      if (!startDatetime) return;

      let dateFormat = this.$isKm() ? "DD MMM YYYY " : "MMMM DD, YYYY ";
      let startDate = this.$moment(startDatetime).format(dateFormat);
      let startTime = this.$moment(startDatetime).format("hh:mm a");
      let at = this.$t("common.time_at");
      if (!endDatetime) return `${startDate} ${at} ${startTime}`;

      let sameDay = this.$moment(startDatetime).isSame(endDatetime, "day");
      let toH = this.$t("common.time_to_h");
      let endTime = this.$moment(endDatetime).format("hh:mm a");
      if (sameDay) return `${startDate} ${at} ${startTime} ${toH} ${endTime}`;

      let to = this.$t("common.time_to");
      let endDate = this.$moment(startDatetime).format(dateFormat);
      return `${startDate} ${at} ${startTime} ${to} ${endDate} ${at} ${endTime}`;
    },
  },
};
</script>

<style>
</style>