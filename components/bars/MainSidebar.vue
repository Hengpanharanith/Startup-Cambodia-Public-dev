<template>
  <v-navigation-drawer @input="toggle" :value="visible" class="main-sidebar" width="100%" color="black" temporary dark
    app right>

    <template #prepend>
      <v-app-bar color="black" flat class="py-2">
        <div>
          <NuxtLink to="/" class="flex-grow-0">
            <img src="/main/startup-cambodia-logo.svg" class="d-inline-block align-top" alt="startup-cambodia"
              height="42" aspect-ratio="0" contain />
          </NuxtLink>
        </div>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon class="mr-1" @click="toggle(false)" >
          <v-icon>mdi-close</v-icon>
        </v-app-bar-nav-icon>
      </v-app-bar>

    </template>

    <v-list dense>
      <v-list-item v-if="!isAuth">
        <v-list-item-content>
          <v-btn @click="login" outlined block tile>
            <v-icon>mdi-account-circle</v-icon> {{ $t("signInSignUp") }}
          </v-btn>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-else to="/user/profile/bio">
        <v-list-item-content>
          <v-list-item-title class="text-h6"> {{ userName }}
            <v-badge color="error" :content="totalNotification" v-show="totalNotification > 0" overlap>
              <v-icon>
                mdi-bell
              </v-icon>
            </v-badge> </v-list-item-title>
          <v-list-item-subtitle>{{ userEmail }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <NestedSidebar :items="navMenu" />
      <!--      <template v-for="(item, key) in navMenu">-->

      <!--        <v-list-item-->
      <!--          v-if="item.type!='group'"-->
      <!--          :key="`item-${key}`"-->
      <!--          :to="item.to"-->
      <!--          link-->
      <!--        >-->
      <!--          <v-list-item-content>-->
      <!--            <v-list-item-title>{{ item.text }}</v-list-item-title>-->
      <!--          </v-list-item-content>-->
      <!--        </v-list-item>-->
      <!--        <v-list-group-->
      <!--          v-else-->
      <!--          :key="`item-group-${key}`"-->
      <!--          :value="true"-->
      <!--        >-->
      <!--          <template v-slot:activator>-->
      <!--            <v-list-item-title>{{item.text}}</v-list-item-title>-->
      <!--          </template>-->
      <!--          <v-list-item-->
      <!--            v-for="(subitem, sub_key) in item.subitems"-->
      <!--            :key="`subitem-${key}-${sub_key}`"-->
      <!--            :to="subitem.to"-->
      <!--          >-->
      <!--            <v-list-item-action class="mr-2">-->
      <!--              <v-icon>mdi-chevron-right</v-icon>-->
      <!--            </v-list-item-action>-->
      <!--            <v-list-item-title v-text="subitem.text"></v-list-item-title>-->

      <!--          </v-list-item>-->

      <!--        </v-list-group>-->

      <!--      </template>-->

      <v-divider></v-divider>
      <v-list-item @click="$changeI18nLocale($isKm() ? 'en' : 'km')">
        <v-list-item-icon class="my-auto">

          <v-img :aspect-ratio="16 / 9" width="1.75rem" :src="$isKm() ? '/icons/flags/en.svg' : '/icons/flags/km.svg'"
            alt="" contain />
        </v-list-item-icon>
        <v-list-item-content>{{ $isKm()?$t('en'): $t('km')}}</v-list-item-content>
      </v-list-item>
    </v-list>

    <template #append v-if="isAuth">
      <div class="pa-2">
        <v-btn @click="logout" class="warning" block>{{ $t('dialog.logout') }}</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import NestedSidebar from "@/components/bars/NestedSidebar";

export default {
  name: "MainSidebar",
  components: { NestedSidebar },
  props: {
    visible: Boolean,
    isAuth: Boolean,
    user: { type: Object, default: () => ({}) },
    navMenu: { type: Array, default: () => [] },
  },
  computed: {

    ...mapState("notification", ["totalNotification"]),
    userName() {
      const { first_name, first_name_kh, last_name, last_name_kh } =
        this.user || {};
      return this.$isKm()
        ? [first_name_kh, last_name_kh].join(" ")
        : [first_name, last_name].join(" ");
    },
    userEmail() {
      return this.user?.email;
    },

  },
  methods: {
    toggle(v) {
      this.$emit("update:visible", v);
    },
    login() {
      this.$emit("open-login");
      this.$emit("update:visible", false);
    },
    logout() {
      this.$emit("logout");
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style>
.v-navigation-drawer.main-sidebar {
  z-index: 200;
}

.v-navigation-drawer.main-sidebar .v-btn,
.v-navigation-drawer.main-sidebar .v-list-item__title {
  font-family: Arial, Helvetica, KantumruyPro-Bold, sans-serif;
  font-size: 1.1rem;
  line-height: 2;
}
</style>
