<template>
  <v-card
    class="landing-post"
    flat
  >
    <v-img
      src="/images/bg2.jpg"
      aspect-ratio="unset"
    >
      <div class="white--text landing-post__header">
        <svg id="sky2">
          <circle
            v-for="item in num"
            :key="item"
            :cx="getRandomX()"
            :cy="getRandomY()"
            :r="randomRadius()"
            stroke="none"
            strokeWidth="0"
            fill="white"
            class="star"
          />
        </svg>
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
                <v-card-title class="text-h4 block-title__text text-break white--text">{{$t('landing.blog.title')}}</v-card-title>
                <v-card-text class="white--text">
                  <div
                    class="text-h5 mx-auto text-subtitle-1"
                    style="max-width: 768px"
                  >{{$t('landing.blog.subtitle')}}</div>
                </v-card-text>
                <v-card-actions class="justify-center justify-md-start">
                  <nuxt-link to="/resource/category/file">
                    <ButtonPrimary :title="$t('landing.blog.button.explore')" />
                  </nuxt-link>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col
              cols="12"
              md="6"
              class="py-4 text-center"
              data-aos="fade-left"
              data-aos-duration="500"
            >
              <v-img
                src="/icons/posts.svg"
                alt=""
                height="250px"
                class="landing-post__header-thumbnail"
                contain
              />
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div class="landing-post__list">
        <v-container>

          <v-card
            color="transparent"
            flat
          >
            <v-card-title class="justify-md-center text-h4 block-title__text text-break mb-6">{{$t('landing.blog.recent')}}</v-card-title>
            <v-card-text>
              <v-row justify="center">
                <v-col
                  v-for="(item, idx) in postList"
                  :key="idx"
                  :data-aos-delay="50*(idx)"
                  data-aos="fade-up"
                  data-aos-duration="500"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                >
                  <nuxt-link
                    class="text-decoration-none fill-height"
                    :to="getURL(item)"
                  >
                    <SimpleCard
                      :label="item.name"
                      :thumbnail="item.thumbnail"
                      :description="item.description"
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
import anime from "animejs";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import SimpleCard from "@/components/CardView/SimpleCard.vue";

export default {
  name: "LandingPost",
  components: { ButtonPrimary, SimpleCard },
  props: {
    posts: { type: Array, default: () => [] },
  },
  data() {
    return {
      num: 60,
    };
  },
  computed: {
    postList() {
      return this.posts.slice(0, 4);
    },
    vw() {
      if (!process.browser) return 0;
      return Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );
    },
    vh() {
      if (!process.browser) return 0;
      return Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      );
    },
  },
  methods: {
    getURL(item) {
      if (!item.category?.slug) return "";
      return `/resource/category/${item.category.slug}/${item.id}`;
    },
    starryNight() {
      anime({
        targets: ["#sky2 .star"],
        opacity: [
          {
            duration: 700,
            value: "0",
          },
          {
            duration: 700,
            value: "1",
          },
        ],
        easing: "linear",
        loop: true,
        delay: (el, i) => 50 * i,
      });
    },
    randomRadius() {
      return Math.random() * 0.7 + 1;
    },
    getRandomX() {
      return Math.floor(Math.random() * Math.floor(this.vw)).toString();
    },
    getRandomY() {
      return Math.floor(Math.random() * Math.floor(this.vh)).toString();
    },
  },
  mounted() {
    this.starryNight();
  },
};
</script>

<style>
.landing-post__list {
  padding: 2rem 0;
  /* background-image: url("/images/bg2.jpg"); */
  /* background-size: cover; */
}
.landing-post__header {
  padding: 2rem 0;
  position: relative;
  background-image: linear-gradient(to right, #df7954 0%, #ff9f4d 100%);
}

.landing-post__header-thumbnail-bg {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: white;
  transform: translate(-2rem, 2rem);
}
.landing-post__header-thumbnail {
  max-width: 100% !important;
}
#sky2 {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
@media (min-width: 768px) {
  .landing-post .card-columns {
    column-count: 4;
  }
}
</style>