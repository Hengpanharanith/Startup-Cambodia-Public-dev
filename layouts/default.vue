<template>
  <v-app style="background-color: #f2f2f2">
    <MainNavbar
      @open-search="openSearch"
      @logout="logoutUser"
      @open-login="openLogin"
      @toggle-drawer="toggleDrawer"
      :is-auth="!!accessToken"
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
    <v-main>
      <nuxt />
    </v-main>
    <DialogGlobalSearch :is-visible.sync="isSearchVisible" />
    <AuthenticationForm />
    <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition">
      <Footer title="Subscribe for news letter" />
    </v-lazy>
  </v-app>
</template>

<script>
import MainNavbar from "@/components/bars/MainNavbar";
import Footer from "@/components/Common/Footer";
import MainSidebar from "../components/bars/MainSidebar.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "DefaultLayout",
  components: {
    MainNavbar,
    Footer,
    MainSidebar,
  },
  data() {
    return {
      drawer: false,
      isSearchVisible: false,
    };
  },
  mounted() {
    if (process.browser) this.$ga.page(this.$router);
  },
  computed: {
    ...mapState("user", ["currentUser"]),
    ...mapState("resource-page", { resourcePageList: "dataList" }),
    accessToken() {
      return this.$cookiz.get("access_token");
    },
    navMenu() {
      return [
        { text: this.$t("about"), to: "/about" },
        {
          text: this.$t("programs"),
          to: "/program",
          type: "group",
          subitems: [
            {
              text: this.$t("programSharing.navbar_title"),
              to: "/programsharing",
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
  },
  methods: {
    ...mapActions("app", ["setAuthDialogVisibility"]),
    ...mapActions("user", ["getCurrentUser"]),
    ...mapActions("auth", ["logout"]),
    initialize() {
      return this.getCurrentUser((res) => {}).catch((error) => {
        if (error.response.status == 401 || error.response.status == 403) {
          this.setAuthDialogVisibility(true);
        }
      });
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
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
  async fetch() {
    const token = this.$cookiz.get("access_token");
    if (!!token) {
      this.$axios.setToken(this.accessToken, "Bearer");
      await this.initialize();
    }
  },
};
</script>

<style></style>
