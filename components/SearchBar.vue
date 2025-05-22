<template>
  <v-sheet max-width="20rem">
    <v-text-field
      @input="onInput"
      :value="value"
      :readonly="readonly"
      :placeholder="_placeholder"
      class="rounded-lg align-self-stretch search-bar"
      name="search"
      id="search"
      clearable
      hide-details
      outlined
      dense
    >
      <template #append>
        <v-btn
          class="rounded-lg"
          color="primary"
          elevation="0"
          width="32"
          height="32"
          fab
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>
  </v-sheet>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    value: String,
    readonly: Boolean,
    placeholder: { type: String, default: "" },
  },
  computed: {
    _placeholder() {
      return this.placeholder || this.$t("form.common.label.type2search");
    },
  },
  methods: {
    onInput(v) {
      this.$emit("input", v);
    },
  },
};
</script>

<style lang="scss">
.v-input.search-bar.v-text-field--enclosed.v-input--dense:not(.v-text-field--solo).v-text-field--outlined {
  .v-input__append-inner {
    margin: 0.25rem 0;
  }
  .v-input__slot {
    padding-right: 0.25rem;
  }
}
</style>
