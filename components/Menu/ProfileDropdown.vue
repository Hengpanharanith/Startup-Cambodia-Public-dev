<template>
  <v-btn @click="login" v-if="!isAuth" class="d-none d-lg-flex" outlined tile>
    <v-icon>mdi-account-circle</v-icon>
    {{ $t("signInSignUp") }}
  </v-btn>
  <v-menu
    max-width="300"
    max-height="550"
    rounded="lg"
    offset-y
    bottom
    left
    v-else
  >
    <template v-slot:activator="{ on, attrs }">
      <v-badge
        v-show="totalNotification > 0"
        color="error"
        :content="totalNotification"
      />
      <v-avatar
        class="d-none d-lg-block"
        v-bind="attrs"
        v-on="on"
        size="40"
        color="grey lighten-4"
      >
        <v-img :src="profile.photo" alt="" />
      </v-avatar>
    </template>

    <v-list dense nav>
      <v-list-item to="/user/profile/bio">
        <v-list-item-avatar class="mr-4">
          <v-img :src="profile.photo" alt="" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            class="text-h6"
            style="line-height: 1.5"
            v-text="profile.username"
          />
          <v-list-item-subtitle v-text="profile.email" />
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-1" />

      <v-list-item
        v-for="({ title, icon, href }, key) in menuItems"
        :key="`pf-menu-item-${key}`"
        :to="href"
      >
        <v-list-item-icon class="mr-4">
          <v-badge
            color="error"
            :content="totalNotification"
            v-if="title == $t('notification') && totalNotification > 0"
          >
            <v-icon v-text="icon"></v-icon>
          </v-badge>
          <v-icon v-text="icon" v-else></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="title"> </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-1" />

      <v-list-item>
        <v-list-item-content>
          <v-btn block @click="logoutUser" outlined color="error">
            {{ $t("dialog.logout") }}
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "ProfileDropdown",
  props: {
    isAuth: Boolean,
  },
  computed: {
    ...mapState("user", ["currentUser"]),
    ...mapState("notification", ["totalNotification"]),
    profile() {
      const { first_name, first_name_kh, last_name, last_name_kh } =
        this.currentUser || {};
      return {
        photo: this.currentUser?.photo || "/images/default-user.png",
        username: this.$isKm()
          ? [first_name_kh, last_name_kh].join(" ")
          : [first_name, last_name].join(" "),
        email: this.currentUser?.email,
      };
    },
    menuItems() {
      return [
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
        {
          title: this.$t("startup"),
          href: "/user/profile/startup",
          icon: "mdi-rocket-launch",
        },
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
      ];
    },
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    login() {
      this.$emit("login");
    },
    async logoutUser() {
      this.$swal
        .fire({
          text: this.$t("dialog.question.logout"),
          type: "info",
          showCancelButton: true,
          reverseButtons: true,
          width: 400,
          confirmButtonColor: "#d33",
          cancelButtonText: this.$t("dialog.cancel"),
          confirmButtonText: this.$t("dialog.logout"),
        })
        .then((result) => {
          if (!result.value) return;
          this.logout().then((response) => {
            window.location.reload();
          });
        });
    },
  },
};
</script>

<style></style>
