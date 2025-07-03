<template>
  <header class="main-header">
    <client-only>
      <svg id="sky">
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
          data-aos="fade-in"
          data-aos-duration="1000"
        />
        `
      </svg>

      <div id="shootingstars">
        <div
          v-for="item in num"
          :key="item"
          :style="{ left: `${getRandomY()}px`, top: `${getRandomX()}px` }"
          class="wish"
        />
      </div>
    </client-only>
    <div class="container pt-5">
      <div
        class="d-flex flex-column flex-md-row-reverse align-items-center describe-grid"
      >
        <div
          class="d-none d-md-block mt-10 mb-5 describe-grid__thumbnail col-12 col-md-6"
        >
          <v-responsive :aspect-ratio="1" class="overflow-visible">
            <Lottie
              :options="{ animationData: rocketAnimation }"
              style="position: absolute; top: 10; left: 0; right: 0; bottom: 0"
            />
            <div
              v-if="$isKm()"
              v-html="rocketIconKm"
              class="rocked-svg rocked-svg-km"
            ></div>
            <div v-else v-html="rocketIcon" class="rocked-svg"></div>
          </v-responsive>
        </div>
        <div
          class="text-left describe-grid__text col-12 col-md-6 d-flex"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <v-carousel
            class="header-carousel my-auto"
            height="auto"
            show-arrows-on-hover
            hide-delimiters
            cycle
          >
            <template v-slot:prev="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon>
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </template>
            <template v-slot:next="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </template>
            <v-carousel-item v-for="(item, key) in sliderList" :key="key">
              <v-sheet
                height="100%"
                color="transparent"
                class="white--text justify-center align-center"
              >
                <h1
                  class="mb-6"
                  style="
                    line-height: 1.5;
                    font-family: 'KantumruyPro-Bold', sans-serif;
                  "
                >
                  {{ item.title }}
                </h1>
                <p class="text-h6">{{ item.text }}</p>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </div>
      </div>
    </div>

    <!-- Scroll Down Icon with Title -->
    <div class="scroll-down-indicator">
      <v-icon large style="opacity: 1" class="white--text"
        >mdi-chevron-down</v-icon
      >
      <div class="scroll-down-title white--text font-weight-regular">
        Scroll Down
      </div>
    </div>
  </header>
</template>

<script>
import anime from "animejs";
import AOS from "aos";
import "aos/dist/aos.css";
import rocketIcon from "@/static/icons/Cover_Rocket.svg?raw";
import rocketIconKm from "@/static/icons/Cover_Rocket_km.svg?raw";
import rocketAnimation from "@/assets/animations/rocket-in-space.json";

export default {
  name: "MainPageHeader",
  props: { banners: { type: Array, default: () => [] } },
  data() {
    return {
      rocketIcon,
      rocketIconKm,
      rocketAnimation,
      num: 60,
    };
  },
  computed: {
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
    sliderList() {
      return [
        {
          title: this.$t("landing.section_header.slider_title_1"),
          text: this.$t("landing.section_header.slider_text_1"),
          thumbnail: "/animated/final.gif",
          href: "#",
        },
        {
          title: this.$t("landing.section_header.slider_title_2"),
          text: this.$t("landing.section_header.slider_text_2"),
          thumbnail: "/animated/final.gif",
          href: "#",
        },
      ];
    },
  },
  methods: {
    starryNight() {
      anime({
        targets: ["#sky .star"],
        opacity: [
          { duration: 700, value: "0" },
          { duration: 700, value: "1" },
        ],
        easing: "linear",
        loop: true,
        delay: (el, i) => 50 * i,
      });
    },
    shootingStars: () => {
      anime({
        targets: ["#shootingstars .wish"],
        easing: "linear",
        loop: true,
        delay: (el, i) => 1000 * i,
        opacity: [{ duration: 500, value: "1" }],
        width: [{ value: "150px" }, { value: "0px" }],
        translateX: 350,
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
    if (process.browser) {
      setTimeout(() => {
        this.starryNight();
        this.shootingStars();
        AOS.refresh();
      }, 100);
    }
    AOS.init({ once: true });
  },
};
</script>

<style>
.main-header {
  height: 100vh; /*Make Backgroud Height full screen*/
  display: flex;
  align-items: center;
  position: relative;
  background-image: url("/images/banner.svg");
  /* background-image: linear-gradient(to left, #df7954 0%, #ff9f4d 100%); */
  overflow: hidden;
}

#sky {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

#shootingstars {
  margin: 0;
  padding: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  transform: translatex(calc(50vw - 50%)) translatey(calc(50vh - 50%))
    rotate(120deg);
}

.wish {
  height: 4px;
  border-radius: 8px;
  top: 300px;
  width: 100px;
  margin: 0;
  opacity: 0;
  padding: 0;
  background-color: white;
  position: absolute;
  background: linear-gradient(-45deg, white, rgba(0, 0, 255, 0));
  filter: drop-shadow(0 0 6px white);
  overflow: hidden;
}
.describe-grid {
  gap: 3rem;
}
.describe-grid .describe-grid__thumbnail {
  flex: 1;
}
.describe-grid .describe-grid__text {
  flex: 1;
}

.rocked-svg {
  transform: rotate(17deg);
}
.rocked-svg svg .cls-1 {
  fill: white !important;
}
.rocked-svg-km svg text.st10 {
  font-family: Arial, Helvetica, "KantumruyPro-Bold", sans-serif;
}

.v-carousel.header-carousel .v-window__container {
  padding-bottom: 2rem;
}

.v-carousel.header-carousel .v-window__container .v-window__prev,
.v-carousel.header-carousel .v-window__container .v-window__next {
  top: unset;
  bottom: 0;
  margin: 0;
}

.v-carousel.header-carousel .v-window__container .v-window__prev {
  right: 3rem;
  left: unset;
}
.v-window--show-arrows-on-hover.v-carousel.header-carousel .v-window__prev,
.v-window--show-arrows-on-hover.v-carousel.header-carousel .v-window__next {
  transform: translateY(100%);
}
.v-window--show-arrows-on-hover.v-carousel.header-carousel:hover
  .v-window__next,
.v-window--show-arrows-on-hover.v-carousel.header-carousel:hover
  .v-window__prev {
  transform: translateY(0);
}

.v-window--show-arrows-on-hover.v-carousel.header-carousel .v-window__next,
.v-window--show-arrows-on-hover.v-carousel.header-carousel .v-window__prev {
  transition: 0.2s transform cubic-bezier(0.25, 0.8, 0.5, 1);
}

.scroll-down-indicator {
  position: absolute;
  left: 50%;
  bottom: 32px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}

.scroll-down-indicator .v-icon {
  animation: bounce 1.2s infinite;
  font-size: 2.5rem;
}

.scroll-down-title {
  margin-top: 4px;
  font-size: 1.1rem;
  color: #000000;
  font-weight: 600;
  letter-spacing: 1px;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(0);
  }
  70% {
    transform: translateY(10px);
  }
}

@media screen and (min-width: 768px) {
  .main-header {
    background-repeat: no-repeat;
    background-size: cover;
    align-items: center;
  }
}
</style>
