<template>
  <v-data-table
    :headers="tableHeaders"
    :items="dataList"
    :server-items-length="dataList.length"
    hide-default-footer
  >
    <template #[`item.source`]="{ item }">
      {{ item.source || $t("n_a") }}
    </template>
    <template #[`item.action`]="{ item }">
      <v-layout>
        <v-btn @click="onEdit(item)" class="rounded" small icon :disabled="allowEdit">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        <v-btn @click="onDelete(item)" class="rounded" small icon :disabled="allowEdit">
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </v-layout>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "TableUserStartupFundingStage",
  props: {
    dataList: { type: Array, default: () => [] },
    allowEdit: {type:Boolean, default: () => false}
  },
  data() {
    return {
      totalItems: 25,
      rowsPerPageItems: [25, 50, 100],
    };
  },
  computed: {
    tableHeaders() {
      return [
        {
          text: this.$t("user.profile.startup.announced_date"),
          value: "announced_date",
          sortable: false,
        },
        {
          text: this.$t("user.profile.startup.amount_raise"),
          value: "amount_raise",
          sortable: false,
        },
        {
          text: this.$t("user.profile.startup.funding_type"),
          value: "funding_type",
          sortable: false,
        },
        {
          text: this.$t("user.profile.startup.source"),
          value: "source",
          sortable: false,
        },
        {
          text: this.$t("action"),
          value: "action",
          width: 50,
          sortable: false,
        },
      ];
    },
  },
  methods: {
    onEdit(item) {
      this.$emit("edit", item);
    },
    onDelete(item) {
      this.$emit("remove", item);
    },
  },
};
</script>

<style></style>
