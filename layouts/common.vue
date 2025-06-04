<template>
  <div v-if="$nuxt.isOffline">You are offline</div>
  <v-app style="background-color: #f2f2f2" v-else>
    <MainNavbar
      @open-search="openSearch"
      @logout="logoutUser"
      @open-login="openLogin"
      @toggle-drawer="toggleDrawer"
      :is-auth="!!accessToken"
      :is-top="isTop"
      :nav-menu="navMenu"
      :user="currentUser"
    />
    <MainSidebar
      @logout="logoutUser"
      @open-login="openLogin"
      :visible.sync="drawer"
      :is-auth="!!accessToken"
      :nav-menu="navMenu"
      :user="currentUser"
    />
    <v-main class="pt-0">
      <nuxt />
    </v-main>
    <DialogGlobalSearch :is-visible.sync="isSearchVisible" />
    <AuthenticationForm />
    <Footer title="Subscribe for news letter" />
  </v-app>
</template>

<script>
import MainSidebar from "@/components/bars/MainSidebar";
import Footer from "@/components/Common/Footer";
import { mapActions, mapState } from "vuex";
import MainNavbar from "@/components/bars/MainNavbar";

export default {
  name: "CommonLayout",
  components: {
    MainNavbar,
    MainSidebar,
    Footer,
  },
  middleware: "default",
  data() {
    return {
      isTop: true,
      drawer: false,
      dialogLogin: false,
      lastScrollTop: 0,
      scrollAction: undefined,
      isSearchVisible: false,
    };
  },
  computed: {
    ...mapState("user", ["currentUser"]),
    ...mapState("notification", ["totalNotification"]),
    ...mapState("resource-page", { resourcePageList: "dataList" }),
    accessToken() {
      return this.$cookiz.get("access_token");
    },
    navMenu() {
      return [
        { text: this.$t("about"), to: "/about" },
        {
          text: this.$t("programs"),
          to: "/programsharing",
          type: "group",
          subitems: [
            {
              text: this.$t("programSharing.navbar_title"),
              to: "/program",
            },
          ],
        },
        { text: this.$t("event.title"), to: "/event" },
        {
          text: this.$t("resource"),
          type: "group",
          to: "/resource/category",

          subitems: this.resourcePageList.map((e) => ({
            to: `/resource/category/${e.slug}`,
            text: this.$t(`menu.resource.${e.slug}`),
          })),
        },
        {
          text: this.$t("ecosystem"),
          to: "/ecosystem",
          type: "group",
          subitems: [
            {
              to: "/ecosystem/discover/category/startup",
              text: this.$t("startup"),
            },
            {
              to: "/ecosystem/discover/category/mentor",
              text: this.$t("mentor"),
            },
            {
              to: "/ecosystem/discover/category/investor",
              text: this.$t("investor"),
            },
            {
              text: this.$t("eso.title"),
              to: "/ecosystem/discover/category/eso",
            },
            {
              to: "",
              text: this.$t("menu.other_stakeholders"),
              type: "group",
              subitems: [
                {
                  to: "/ecosystem/discover/category/academic-institution",
                  text: this.$t("menu.academic-institution"),
                },
                {
                  to: "/ecosystem/discover/category/co-working-space",
                  text: this.$t("menu.co-working-space"),
                },
                {
                  to: "/ecosystem/discover/category/community-and-association",
                  text: this.$t("menu.community-and-association"),
                },
                {
                  to: "/ecosystem/discover/category/corporate",
                  text: this.$t("menu.corporate"),
                },
                {
                  to: "/ecosystem/discover/category/development-partner",
                  text: this.$t("menu.development-partner"),
                },
                {
                  to: "/ecosystem/discover/category/government-institution",
                  text: this.$t("menu.government-institution"),
                },
                {
                  to: "/ecosystem/discover/category/incubator-and-accelerator",
                  text: this.$t("menu.incubator-and-accelerator"),
                },
                {
                  to: "/ecosystem/discover/category/service-provider",
                  text: this.$t("menu.service-provider"),
                },
                {
                  to: "/ecosystem/discover/category/media",
                  text: this.$t("menu.media"),
                },
              ],
            },
          ],
        },
      ];
    },
    scrolledDown() {
      return this.scrollAction == "down";
    },
  },
  created() {
    if (process.browser) {
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  destroyed() {
    if (process.browser) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  },
  mounted() {
    this.$ga.page("/");
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      this.handleScroll();
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
    this.initialize();
    if (process.browser) this.$ga.page(this.$router);
  },
  watch: {
    "$route.query.action"(v) {
      if (v == "login") {
        this.setAuthDialogVisibility(true);
      }
    },
  },
  methods: {
    ...mapActions("app", ["setAuthDialogVisibility"]),
    ...mapActions("user", ["getCurrentUser"]),
    ...mapActions("auth", ["logout"]),
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    initialize() {
      if (!this.accessToken) return;
      this.$axios.setToken(this.accessToken, "Bearer");
      this.getCurrentUser().catch((error) => {
        if (error.response.status == 401 || error.response.status == 403) {
          this.setAuthDialogVisibility(true);
        }
      });
    },
    handleScroll() {
      let st = window.pageYOffset || document.documentElement.scrollTop;
      const { lastScrollTop } = this;
      const tracked =
        st > lastScrollTop + 40 || st < lastScrollTop - 40 || st == 0;
      this.isTop = st < 40;
      if (!tracked) return;
      this.lastScrollTop = st;
      this.scrollAction = st > lastScrollTop ? "down" : "up";
    },
    openLogin() {
      this.setAuthDialogVisibility(true);
    },
    async logoutUser() {
      this.logout().then((response) => {
        window.location.reload();
      });
    },
    openSearch() {
      this.isSearchVisible = true;
    },
  },
};
</script>
<style lang="scss"></style>
