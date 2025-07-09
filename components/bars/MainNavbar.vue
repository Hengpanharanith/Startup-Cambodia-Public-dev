<template>
  <v-app-bar
    :color="isTop ? 'transparent' : 'black'"
    class="main-navbar"
    height="75px"
    fixed
    dark
    flat
    app
  >
    <v-container class="pa-0 align-center d-flex flex-nowrap align-center">
      <NuxtLink to="/">
        <nuxt-img
          src="/main/startup-cambodia-logo.svg"
          class="d-inline-block align-top"
          alt="startup-cambodia"
          height="42"
          width="175"
        />
      </NuxtLink>
      <v-spacer></v-spacer>
      <div class="d-none d-lg-flex">
        <!-- <template v-for="item in navMenu">-->
        <!--          <v-hover :key="item.id" close-delay="200" open-delay="200" v-slot="{ hover }">-->
        <!--            <v-btn text x-large v-if="item.subitems" :ripple="false" :to="item.to">-->
        <!--              {{ item.text }}-->

        <!--              <NestedMenu :items="item.subitems" v-if="hover"></NestedMenu>-->
        <!--            </v-btn>-->

        <!--            <v-btn v-else text x-large :to="item.to"> {{ item.text }}</v-btn>-->
        <!--          </v-hover>-->
        <!--        </template> -->
        <v-tabs
          class="navigator-hidden flex-grow-1 flex-shrink-1 py-0"
          background-color="transparent"
          active-class="primary--text"
          hide-slider
          optional
          right
          height="36"
        >
          <template v-for="(item, key) in navMenu">
            <v-tab
              v-if="item.type != 'group'"
              :key="'tab-' + key"
              :to="item.to"
              class="text-body-1 px-2"
              >{{ item.text }}
            </v-tab>
            <NestedNavMenu
              :key="'submenu-' + key"
              v-else
              :to="item.to"
              :items="item.subitems"
              :label="item.text"
              class="text-body-1 px-2"
              prevent
            />
          </template>
        </v-tabs>
      </div>
      <v-btn @click="openSearch" icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn
        @click="$changeI18nLocale('en')"
        v-if="$isKm()"
        class="mx-2 flex-shrink-0 d-none d-lg-flex"
        text
      >
        <v-img
          :aspect-ratio="16 / 9"
          width="2rem"
          src="/icons/flags/en.svg"
          alt=""
          contain
        />
      </v-btn>
      <v-btn
        @click="$changeI18nLocale('km')"
        v-else
        class="mx-2 flex-shrink-0 d-none d-lg-flex"
        text
      >
        <v-img
          :aspect-ratio="16 / 9"
          width="1.75rem"
          src="/icons/flags/km.svg"
          alt=""
          contain
        />
      </v-btn>
      <MenuProfileDropdown @login="login" :isAuth="isAuth" />
      <v-app-bar-nav-icon @click="toggleDrawer" class="d-lg-none" />
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from "vuex";
import NestedMenu from "@/components/Menu/NestedMenu";
import NestedNavMenu from "@/components/bars/NestedNavMenu";

export default {
  name: "MainNavbar",
  components: { NestedNavMenu, NestedMenu },
  props: {
    isTop: Boolean,
    isAuth: Boolean,
    navMenu: { type: Array, default: () => [] },
  },
  data() {
    return {
      fullMenu: false,
    };
  },
  computed: {
    ...mapState("user", ["isLoading"]),
    ...mapState("user", ["currentUser"]),
    ...mapState("notification", ["totalNotification"]),
  },
  async fetch() {
    this.getNotificationCount();
  },
  methods: {
    ...mapActions("notification", ["getNotificationCount"]),

    toggleDrawer() {
      this.$emit("toggle-drawer");
    },
    login() {
      this.$emit("open-login");
    },
    openSearch() {
      this.$emit("open-search");
    },
  },
  watch: {
    $route: {
      handler(value) {
        if (this.currentUser) {
          if (!!this.searchTimer) {
            clearTimeout(this.searchTimer);
            this.searchTimer = null;
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style>
.v-tap {
  cursor: pointer;
}

.v-app-bar.v-app-bar--fixed.main-navbar {
  z-index: 100;
}

.v-app-bar.main-navbar .v-tab {
  font-family: "KantumruyPro-Regular", sans-serif !important;
  /* font-size: 1.2rem; */
  font-size: 20px !important;
  text-transform: none !important;
  padding: 20px !important;
}

.v-app-bar.main-navbar
  .theme--dark.v-tabs
  > .v-tabs-bar
  .v-tab:not(.v-tab--active) {
  color: white;
}
.v-app-bar.main-navbar {
  background-color: transparent;
  transition: background-color 0.5s ease-in-out;
}
</style>
