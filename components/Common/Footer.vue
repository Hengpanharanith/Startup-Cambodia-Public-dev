<template>
  <v-footer class="main-footer flex-column" padless dark>
    <v-card width="100%" class="d-none" flat>
      <div class="main-footer__subscribe st-bg-secondary">
        <div class="container">
          <div class="block-title text-center">
            <div class="block-title__text">
              <span>{{ title }}</span> <br />
              <span>to get new updates</span>
            </div>
            <!-- /.block-title__text -->
          </div>
          <!-- /.block-title -->
          <form action="#" class="main-footer__subscribe-form">
            <input type="text" name="email" placeholder="Enter your email" />
            <button type="submit" class="btn-gradient">
              {{ $t("get_listed.label.get_started") }}
            </button>
          </form>
        </div>
      </div>
    </v-card>
    <v-container class="pa-0">
      <v-card color="transparent" dark flat tile>
        <v-card-text>
          <v-row no-gutters>
            <v-col
              v-for="(item, index) in footerMenus"
              :key="`menu-${index}`"
              cols="12"
              sm="4"
              md="2"
              lg="3"
            >
              <v-card-title
                class="primary--text text-break title-font align-start pb-0"
                style="height: 75px"
                >{{ item.text }}</v-card-title
              >
              <v-list color="transparent" flat>
                <v-list-item-group>
                  <v-list-item
                    v-for="(subitem, subindex) in item.children"
                    :key="`submenu-${index}-${subindex}`"
                    :to="subitem.to"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="pl-1">{{
                        subitem.title
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
            <v-col cols="12" md="6" lg="3">
              <nuxt-link to="/" class="mx-auto">
                <img
                  src="/main/startup-cambodia-logo.svg"
                  class="img-fluid mt-3"
                  alt="Awesome Image"
                  width="200"
                />
              </nuxt-link>
              <v-card-text class="pl-0">
                <p class="white--text">{{ $t("footer.address") }}</p>
                <div class="d-flex">
                  <v-btn
                    href="https://www.facebook.com/startupcambodia.gov.kh"
                    target="_blank"
                    icon
                  >
                    <v-icon size="24px">mdi-facebook</v-icon>
                  </v-btn>
                  <v-btn
                    href="https://www.linkedin.com/company/startupcambodia"
                    target="_blank"
                    icon
                  >
                    <v-icon size="24px">mdi-linkedin</v-icon>
                  </v-btn>
                </div>
              </v-card-text>
              <div>
                <h2 class="text-h6 text-capitalize mb-4 white--text">
                  {{ $t("footer.coordinatedBy") }}
                </h2>
                <v-layout wrap>
                  <v-col style="max-width: 125px">
                    <a
                      href="https://mef.gov.kh/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <v-img aspect-ratio="1" src="/logo/mef.png" contain />
                    </a>
                  </v-col>
                  <v-col style="max-width: 125px">
                    <a
                      href="https://www.techostartup.center/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <v-img aspect-ratio="1" src="/logo/tsc.png" contain />
                    </a>
                  </v-col>
                  <v-col style="max-width: 125px">
                    <a
                      href="https://khmerenterprise.info/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <v-img :aspect-ratio="1" src="/logo/ke.png" contain />
                    </a>
                  </v-col>
                </v-layout>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider class="my-0"></v-divider>
        <v-card-actions class="justify-center text-center">{{
          $t("footer.copyright", { year: currentYear })
        }}</v-card-actions>
      </v-card>
    </v-container>
    <v-btn
      @click="scrollTop"
      :class="{ 'd-none': !scrollBtn }"
      color="primary"
      fixed
      right
      bottom
      fab
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-footer>
</template>
<script>
export default {
  props: ["title"],
  name: "MainFooter",
  data() {
    return {
      scrollBtn: false,
    };
  },
  computed: {
    footerMenus() {
      return [
        {
          text: this.$t("startup_cambodia"),
          children: [
            { title: this.$t("programs"), to: "/program" },
            { title: this.$t("event.title"), to: "/event" },
            {
              title: this.$t("footer.menu.posts"),
              to: "/resource/category/blog",
            },
            {
              title: this.$t("footer.menu.files"),
              to: "/resource/category/file",
            },
          ],
        },
        {
          text: this.$t("footer.ecosystem"),
          children: [
            { title: this.$t("footer.menu.stakeholders"), to: "/ecosystem" },
            {
              title: this.$t("footer.menu.startups"),
              to: "/ecosystem/discover/category/startup",
            },
            {
              title: this.$t("footer.menu.mentors"),
              to: "/ecosystem/discover/category/mentor",
            },
            {
              title: this.$t("footer.menu.investors"),
              to: "/ecosystem/discover/category/investor",
            },
          ],
        },
        {
          text: this.$t("footer.info"),
          children: [
            { title: this.$t("footer.menu.about"), to: "/about" },
            { title: this.$t("footer.menu.contact"), to: "/contact" },
            { title: this.$t("footer.menu.term_of_us"), to: "/terms-of-use" },
            { title: this.$t("footer.menu.privacy"), to: "/privacy-policy" },
          ],
        },
      ];
    },
    currentYear() {
      return this.$localeNumb(new Date().getFullYear());
    },
  },

  methods: {
    handleScroll() {
      if (window.scrollY > 70) {
        this.scrollBtn = true;
      } else if (window.scrollY < 70) {
        this.scrollBtn = false;
      }
    },
    scrollTop() {
      this.$vuetify.goTo(0, {
        duration: 500,
        offset: 0,
        easing: "easeInOutCubic",
      });
    },
  },
};
</script>

<style scoped>
.footer-widget__link-list li a {
  color: rgb(255, 255, 255) !important;
}

.footer-link:hover {
  transform: none !important;
}
.footer-link::before {
  content: none !important;
}

.theme--dark.v-footer.main-footer {
  background: black;
  background-size: cover;
  background-position: center;
}

.main-footer .title-font {
  font-family: Arial, Helvetica, KantumruyPro-Bold, sans-serif;
}
.main-footer .v-list-item .v-list-item__title {
  line-height: 1.6;
}
</style>
