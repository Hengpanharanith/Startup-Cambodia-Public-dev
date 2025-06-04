<template>
  <v-list dense class="nested-menu">
    <v-hover
      v-for="item in items"
      :key="item.id"
      close-delay="200"
      open-on-hover
      open-delay="200"
      v-slot="{ hover }"
    >
      <v-list v-if="item.subitems" nav>
        <v-list-item>
          <v-list-item-title>
            <!-- <v-icon>add icon here</v-icon> -->
            {{ item.text }}
          </v-list-item-title>

          <v-list-item-action>
            <v-icon right>mdi-menu-right</v-icon>
            <!-- use normal arrow icon <v-icon>add icon here</v-icon> -->
          </v-list-item-action>

          <!-- Here is one more level -->
          <NestedMenu v-if="hover" :items="item.subitems"></NestedMenu>
        </v-list-item>
      </v-list>

      <v-sheet v-else max-height="10rem" class="overflow-y-auto">
        <v-list v-ripple class="overflow-auto">
          <v-list-item>
            <v-list-item-title>
              <!-- <v-icon>add icon here</v-icon> -->
              {{ item.text }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-hover>
  </v-list>
</template>

<script>
export default {
  components: { NestedMenu: () => import("./NestedMenu") },
  props: ["items"],
};
</script>

<style lang="scss">
//.v-btn__content {
//  position: relative;
//}
//
//.v-list__tile {
//  position: relative;
//}
//
//.v-list--dense .v-list__tile:not(.v-list__tile--avatar) {
//  height: 28px;
//}
//
//.v-list__tile__action {
//  min-width: 32px;
//}

.nested-menu {
  z-index: 999;
  position: absolute;
  top: calc(100% + 8px);
  //left: -16px;
  border: 2px solid darkgrey;
  height: 15rem;

  & & {
    top: 0;
    right: initial;
    left: 100%;
  }
}
</style>
