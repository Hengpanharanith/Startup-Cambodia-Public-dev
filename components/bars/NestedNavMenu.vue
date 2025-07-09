<template>
  <v-menu
    v-model="visible"
    @input="onInputMenu"
    :open-on-hover="!visible"
    :close-on-content-click="false"
    :offset-y="prevent"
    :offset-x="!prevent"
    :z-index="200"
    content-class="nested-menu-content"
    rounded="lg"
    bottom
    right
    origin="center center"
    transition="scale-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-tab v-if="prevent" v-bind="attrs" v-on="on" :to="to" :block="block">
        {{ label }}
        <v-icon right>mdi-menu-down</v-icon>
      </v-tab>
      <v-hover v-slot="{ hover }" v-else>
        <v-list-item
          v-bind="attrs"
          v-on="on"
          :block="block"
          :class="{ 'hover-effect': hover }"
        >
          <v-list-item-content>{{ label }}</v-list-item-content>
          <v-list-item-action>
            <v-icon right>mdi-menu-right</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-hover>
    </template>

    <v-list class="overflow-auto" style="max-height: 35rem; z-index: 200" nav>
      <template v-for="(subitem, key) in items">
        <v-list-item
          :key="'nested-' + key"
          v-if="subitem.subitems"
          class="nested-item"
          @click.stop
        >
          <NestedNavMenu
            :items="subitem.subitems"
            :label="subitem.text"
            :block="true"
            @input="onListenInputMenu"
            @navigate="navigateTO"
          />
        </v-list-item>
        <v-list-item
          :key="'item-nested-' + key"
          v-else
          :to="subitem.to"
          link
          @click="navigateTO(subitem.to)"
        >
          {{ subitem.text }}
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "NestedNavMenu",
  props: {
    to: String,
    label: String,
    prevent: Boolean,
    block: Boolean,
    items: { type: Array, default: () => [] },
  },
  data() {
    return {
      visible: false,
      menuTimeout: null,
    };
  },
  mounted() {
    // Using correct this.label instead of this.props
    console.log("NestedNavMenu", this.label);
  },
  computed: {
    ...mapState("user", ["isLoading"]),
    ...mapState("user", ["currentUser"]),
    ...mapState("notification", ["totalNotification"]),

    userPhoto() {
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
      return this.currentUser?.email;
    },
  },
  methods: {
    ...mapActions("notification", ["getNotificationCount"]),
    toggleDrawer() {
      this.$emit("toggle-drawer");
    },
    login() {
      this.$emit("open-login");
    },
    logout() {
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
          if (result.value) {
            this.$emit("logout");
          }
        });
    },
    navigateTO(to) {
      // Emit the event to parent component
      this.$emit("navigate", to);
      // Close the menu
      this.visible = false;

      // If the 'to' parameter is a valid route, navigate to it
      if (to && this.$router) {
        try {
          this.$router.push(to).catch((err) => {
            if (err.name !== "NavigationDuplicated") {
              console.error("Navigation error:", err);
            }
          });
        } catch (e) {
          console.error("Router navigation error:", e);
        }
      }
    },
    openSearch() {
      this.$emit("open-search");
    },
    onInputMenu(v) {
      this.$emit("input", v);
    },
    onListenInputMenu(v) {
      // subscribe to own event
      this.visible = v;
    },
  },
  watch: {
    $route: {
      handler(value) {
        if (this.currentUser) {
          if (this.searchTimer) {
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

<style scoped>
.v-app-bar.v-app-bar--fixed.main-navbar {
  z-index: 100;
}

.v-app-bar.main-navbar .v-tab {
  font-size: 16px;
}

.v-app-bar.main-navbar
  .theme--dark.v-tabs
  > .v-tabs-bar
  .v-tab:not(.v-tab--active) {
  color: white !important;
}

/* Add these new styles */
.nested-menu-content {
  z-index: 200 !important;
  pointer-events: auto !important;
}

.v-list-item__content {
  pointer-events: auto !important;
}

/* Ensure menu items are clickable */
.v-list-item {
  cursor: pointer;
  padding-left: 8px !important; /* Adjust padding as needed */
  font-size: 16px;
}
.v-list-item

/* Prevent menu from closing during transitions */
.v-menu__content {
  pointer-events: auto;
}

/* Ensure hoverable area extends to entire menu */
.v-list {
  pointer-events: auto;
}
</style>
