<template>
  <div>
    <template v-for="(item, key) in items">

      <v-list-item
          v-if="!item.subitems"
          :key="`item-${key}`"
          :to="item.to"
          link
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-group
          v-else
          :key="`item-group-${key}`"

      >
        <template v-slot:activator>
<!--          <v-list-item-title >{{ item.text }}</v-list-item-title>-->
          <v-btn :to="item.to" class="px-0" text>{{item.text}}</v-btn>
        </template>

        <v-list-item
            v-for="(subitem, sub_key) in item.subitems"
            :key="`subitem-${key}-${sub_key}`"
            :to="subitem.to"
        >
          <div v-if="subitem.subitems">
            <v-list-item-title >{{ subitem.text }}</v-list-item-title>
            <NestedSidebar
                :items="subitem.subitems"
            />
          </div>
          <v-list-item-title v-else>{{ subitem.text }}</v-list-item-title>
        </v-list-item>

      </v-list-group>

    </template>
  </div>
</template>
<script>
export default {
  name: "NestedSidebar",
  props: {
    label: String,
    items: {type: Array, default: () => []},
  }
}
</script>
