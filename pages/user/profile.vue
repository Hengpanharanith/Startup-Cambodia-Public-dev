<template>
  <v-container class="py-6 fill-height">
    <v-row class="fill-height">
      <v-col cols="12" md="5" lg="4">
        <v-card class="py-5 text-center" rounded="lg" outlined>
          <v-avatar size="75px" class="my-0">
            <v-img :src="profileImage" alt="" />
          </v-avatar>
          <v-list class="pb-0">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title
                  class="text-h6 text--black mb-2"
                  :title="userName"
                >
                  {{ userName }}
                </v-list-item-title>
                <v-list-item-subtitle :title="userName">
                  {{ userEmail }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
        <v-card class="mt-6 d-none d-md-block" rounded="lg" outlined>
          <v-list>
            <v-list-item-group :value="0" color="primary">
              <template
                v-for="({ title, icon, isHeader, href }, key) in profileMenu"
              >
                <v-subheader v-if="isHeader" :key="`pf-menu-header-${key}`">
                  {{ title }}
                </v-subheader>
                <v-list-item
                  v-else
                  :key="`pf-menu-item-${key}`"
                  :disabled="isHeader"
                  :to="href"
                >
                  <v-list-item-icon>
                    <v-badge
                      color="error"
                      :content="totalNotification"
                      v-if="
                        title == $t('notification') && totalNotification > 0
                      "
                    >
                      <v-icon v-text="icon"></v-icon>
                    </v-badge>
                    <v-icon v-text="icon" v-else></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="title"> </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="7" lg="8">
        <v-card
          class="mb-6 overflow-hidden profile-tab-menu d-md-none"
          rounded="lg"
          outlined
        >
          <v-tabs
            background-color="transparent"
            active-class="primary white--text"
            hide-slider
            show-arrows
            width="100%"
          >
            <template
              v-for="({ title, icon, isHeader, href }, key) in profileMenu"
            >
              <v-tab v-if="!isHeader" :key="`pf-menu-tab${key}`" :to="href">
                <v-icon left>{{ icon }}</v-icon>

                <v-badge
                  color="error"
                  :content="totalNotification"
                  v-if="title == $t('notification') && totalNotification > 0"
                >
                </v-badge>
              </v-tab>
            </template>
          </v-tabs>
        </v-card>
        <nuxt />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import PageHeaderUser from "@/components/Common/PageHeaderUser";

import { mapActions, mapState } from "vuex";
export default {
  middleware: "authenticated",
  layout: "default",
  components: {
    PageHeaderUser,
  },
  data() {
    return {
      showProfileSidebar: false,
      mobileToggle: false,
      // activeItem: this.$store.getters.getActiveMenu
      //   ? this.$store.getters.getActiveMenu
      //   : "personalProfile",
    };
  },
  computed: {
    ...mapState("user", ["currentUser"]),
    ...mapState("notification", ["totalNotification"]),
    profileMenu() {
      return [
        // { title: this.$t("basic_info"), isHeader: true, icon: "" },

        {
          title: this.$t("personal_info"),
          href: "/user/profile/bio",
          icon: "mdi-text-account",
        },

        { title: this.$t("profile"), isHeader: true, icon: "" },
        {
          title: this.$t("startup"),
          href: "/user/profile/startup",
          icon: "mdi-rocket-launch",
        },
        // { title: this.$t("investor"), href: "/user/profile/investor" },
        {
          title: this.$t("mentor"),
          href: "/user/profile/mentor",
          icon: "mdi-human-male-board",
        },
        {
          title: this.$t("investor"),
          href: "/user/profile/investor",
          icon: "mdi-account-tie",
        },
        {
          title: this.$t("eso.title"),
          href: "/user/profile/eso",
          icon: "mdi-handshake",
        },
        { title: this.$t("network"), isHeader: true },
        {
          title: this.$t("notification"),
          href: "/user/profile/notification",
          icon: "mdi-bell-ring",
        },
        {
          title: this.$t("connection"),
          href: "/user/profile/connection",
          icon: "mdi-account-group",
        },
        { title: this.$t("others"), isHeader: true },
        {
          title: this.$t("save_list"),
          href: "/user/profile/save_list",
          icon: "mdi-bookmark-multiple-outline",
        },
        // {
        //   title: this.$t("inbox"),
        //   href: "/user/profile/inbox",
        //   icon: "mdi-email",
        // },
        // { title: "Account", isHeader: true },
        // {
        //   title: "Change Password",
        //   href: "/user/profile/change_password",
        //   icon: "mdi-lock-reset",
        // },
        // { title: "Network", isHeader: true },
        // { title: "Connections", href: "/user/profile/ecosystem/connection" },
        // { title: "Inbox", isHeader: true },
        // { title: "Invitation", href: "/user/profile/inbox/notification" },
        // { title: "Messages", href: "/user/profile/inbox" },
      ];
    },
    profileImage() {
      return this.currentUser?.photo || "/images/default-user.png";
    },
    userName() {
      const { first_name, first_name_kh, last_name, last_name_kh } =
        this.currentUser || {};
      return this.$isKm()
        ? [first_name_kh, last_name_kh].join(" ")
        : [first_name, last_name].join(" ");
    },
    userEmail() {
      return this.currentUser.email || "";
    },
    // profileMenu() {
    //   return [
    //     { title: this.$t("bio") },
    //     { title: this.$t("footer.menu.startups") },
    //     { title: this.$t("footer.menu.mentors") },
    //     { title: this.$t("footer.menu.investors") },
    //     { title: this.$t("footer.menu.stakeholders") },
    //   ];
    // },
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    // ...mapActions("notification",['getNotificationCount']),
  },
};
</script>

<style lang="scss">
#profile-sidebar .sidebar__category-menu-caption,
.profile-content .sidebar__category-menu-caption {
  margin: 0;
  font-size: 20px;
  line-height: 34px;
  font-weight: 600;
  margin-top: 40px;
  margin-bottom: 10px;
}
#profile-sidebar .sidebar__category-menu-caption:first-child,
.profile-content .sidebar__category-menu-caption:first-child {
  margin-top: 0;
}
.profile-info {
  position: relative;
  .profile__edit {
    position: absolute;
    top: -2rem;
    right: -2rem;
    z-index: 1;
    padding: 0.2rem 0.8rem;
  }
}
.user-profile-card {
  margin-top: -5rem;
}

.nav-pills .nav-link {
  color: gray;
}
.nav-pills .nav-link.active {
  /* background-color: #2e3d62 !important; */
  color: #2e3d62;
}

/* .nav-pills .nav-link.active {
  background: none;
  border-bottom: 5px solid #2e3d62 !important;
} */
.profile-content {
  position: relative;
  /* min-height: 100vh; */
}

.profile-content.container {
  min-height: 52vh;
}
.sidebar-toggler {
  position: sticky;
  top: 8rem;
  z-index: 9;
  display: block;
  margin-left: auto;
}
.profile-content .b-sidebar-outer.profile-sidebar {
  pointer-events: none;
  position: absolute !important;
  top: 0;
  left: 0;
  height: 100% !important;
  z-index: 99;
}
.profile-sidebar .b-sidebar {
  position: absolute !important;
  height: 100% !important;
  pointer-events: initial;
}
.profile-sidebar .b-sidebar-backdrop {
  position: absolute !important;
  height: 100% !important;
  pointer-events: initial;
}
.profile-content-layout {
  min-height: 50vh;
}
.breadcrumb__profile .breadcrumb-item .nuxt-link-active {
  color: #343a40;
}
.profile-tab-menu
  .v-tabs:not(.v-tabs--vertical):not(.v-tabs--right)
  > .v-slide-group--is-overflowing.v-tabs-bar--is-mobile:not(
    .v-slide-group--has-affixes
  )
  .v-slide-group__prev {
  display: none;
}
</style>
