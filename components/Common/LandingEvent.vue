<template>
  <v-card
    class="landing-event"
    flat
  >

    <v-img src="/images/bg2.jpg" aspect-ratio="unset">
      <div class="landing-event__header">
        <v-container class="container overflow-hidden">
          <v-row
            class="align-items-center"
            no-gutters
          >

            <v-col
              cols="12"
              md="6"
              class="text-center mb-6"
              data-aos="fade-right"
              data-aos-duration="500"
            >
              <v-img
                src="/icons/events.svg"
                height="250px"
                alt=""
                contain
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
              data-aos="fade-left"
              data-aos-duration="500"
            >
              <v-card
                color="transparent"
                flat
              >
                <v-card-title class="text-h4 block-title__text">{{$t('landing.event.title')}}</v-card-title>
                <v-card-text>
                  <div
                    class="text-h5 mx-auto text-subtitle-1"
                    style="max-width: 768px"
                  >{{$t('landing.event.subtitle')}}</div>
                </v-card-text>
                <v-card-actions class="justify-center justify-md-start">
                  <nuxt-link to="/event">
                    <ButtonPrimary :title="$t('landing.event.button.explore')" />
                  </nuxt-link>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div class="landing-event__list">
        <v-container>
          <v-card
            color="transparent"
            flat
          >
            <v-card-title class="justify-md-center text-h4 block-title__text text-break mb-6">{{$t('landing.event.recent')}}</v-card-title>
            <v-card-text>
              <v-row class="justify-content-center">
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  v-for="(item, key) in events"
                  :key="key"
                  :data-aos-delay="50*(key)"
                  data-aos="fade-up"
                  data-aos-duration="500"
                >
                  <nuxt-link
                    :to="`/event/${item.id}`"
                    class="text-decoration-none"
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
          </v-card>
        </v-container>
      </div>
    </v-img>
  </v-card>

</template>

<script>
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import CardEvent from "@/components/CardView/CardEvent.vue";
import CardViewEventSM from "@/components/CardView/CardViewEventSM";

export default {
  name: "LandingEvent",
  components: { CardEvent, ButtonPrimary, CardViewEventSM },
  props: {
    title: String,
    eventList: { type: Array, default: () => [] },
  },
  computed: {
    events() {
      return this.eventList.slice(0, 6);
    },
  },
};
</script>
<style>
.landing-event__list {
  padding: 2rem 0;
}
.landing-event__header {
  position: relative;
  padding: 2rem 0;
}
</style>

