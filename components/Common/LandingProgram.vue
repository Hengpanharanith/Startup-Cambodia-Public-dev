<template>
  <v-card
    class="landing-program"
    flat
  >
    <v-img
      src="/images/bg2.jpg"
      content-class="landing-program__mask"
      aspect-ratio="unset"
    >
      <div class="landing-program__header">
        <v-container class="overflow-hidden">
          <v-row
            class="align-items-center"
            no-gutters
          >
            <v-col
              cols="12"
              md="6"
              data-aos="fade-right"
              data-aos-duration="500"
            >
              <v-card
                color="transparent"
                flat
              >
                <v-card-title class="block-title__text text-break">{{$t('landing.program.title')}}</v-card-title>
                <v-card-text>
                  <div
                    class="text-h5 mx-auto text-subtitle-1"
                    style="max-width: 768px"
                  >{{$t('landing.program.subtitle')}}</div>
                </v-card-text>
                <v-card-actions class="justify-center justify-md-start">
                  <nuxt-link to="/program">
                    <ButtonPrimary :title="$t('landing.program.button.explore')" />
                  </nuxt-link>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="py-4 text-right fill-height"
            >
              <v-img
                src="/icons/programs.svg"
                alt=""
                height="250px"
                data-aos="fade-left"
                data-aos-duration="500"
                contain
              />
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div class="landing-program__list" v-if="programList.length">
        <v-container>
          <v-card
            color="transparent"
            flat
          >
            <v-card-title class="justify-md-center  block-title__text text-break mb-6">{{$t('landing.program.recent')}}</v-card-title>
            <v-card-text>
              <v-row justify="center">
                <v-col
                  v-for="(item, key) in programList"
                  :key="key"
                  :data-aos-delay="50*(key)"
                  cols="13"
                  sm="6"
                  md="4"
                  lg="3"
                  data-aos="fade-up"
                  data-aos-duration="500"
                >
                  <nuxt-link
                    :to="`/program?id=${item.id}`"
                    class="text-decoration-none"
                  >
                    <SimpleCard
                      :label="item.title"
                      :thumbnail="item.image"
                      thumbnail-aspect="16/9"
                      class="fill-height"
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
import SimpleCard from "@/components/CardView/SimpleCard.vue";
import ButtonPrimary from "@/components/Button/ButtonPrimary";

export default {
  components: { ButtonPrimary, SimpleCard },
  props: {
    title: String,
    programs: { type: Array, default: () => [] },
  },
  computed: {
    programList() {
      return this.programs.slice(0, 4);
    },
  },
};
</script>
<style>
.landing-program__list {
  padding: 2rem 0;
}
.v-responsive__content.landing-program__mask {
  background-color: #f79b361a;
}

.landing-program__header {
  padding: 2rem 0;
  position: relative;
  position: relative;
}
</style>

