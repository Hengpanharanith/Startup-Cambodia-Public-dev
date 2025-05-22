<template>
  <v-dialog :value="visible" width="480" persistent scrollable>
    <v-card rounded="lg">
      <v-card-title>
        {{ dialogTitle }}
        <v-spacer></v-spacer>
        <v-btn
          @click="closeDialog"
          tabindex="-1"
          color="primary"
          class="rounded-lg"
          right
          icon
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>
      <v-card-text class="pt-4">
        <v-form v-model="formValid" ref="editedForm">
          <v-row dense>
            <v-col cols="12">
              <v-menu
                ref="date"
                v-model="showDateMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                min-width="auto"
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-bind="attrs"
                    v-on="on"
                    :value="editedItem.announced_date"
                    :label="$t('user.profile.startup.announced_date')"
                    :rules="$formRules.required"
                    append-icon="mdi-calendar"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="editedItem.announced_date"
                  @change="showDateMenu = false"
                  ref="datePicker"
                  scrollable
                  no-title
                >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.amount_raise"
                :label="$t('user.profile.startup.amount_raise')"
                :rules="$formRules.required"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="editedItem.funding_type"
                :label="$t('user.profile.startup.funding_type')"
                :items="fundingType"
                :rules="$formRules.required"
                item-text="text"
                item-value="value"
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.source"
                :label="$t('user.profile.startup.source')"
                :rules="$formRules.required"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="submit" color="primary">{{ $t("dialog.save") }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DialogUserFundingStageEdit",
  props: {
    visible: Boolean,
    editedItem: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      formValid: false,
      isSearching: false,
      showDateMenu: false,
    };
  },
  computed: {
    dialogTitle() {
      return !this.editedItem.id
        ? this.$t("user.profile.startup.funding.create")
        : this.$t("user.profile.startup.funding.update");
    },
    fundingType() {
      return [
        {
          text: this.$t("user.profile.startup.funding.pre_seed"),
          value: "pre_seed",
        },
        {
          text: this.$t("user.profile.startup.funding.seed"),
          value: "seed",
        },
        {
          text: this.$t("user.profile.startup.funding.pre_series_a"),
          value: "pre_series_a",
        },
        {
          text: this.$t("user.profile.startup.funding.series_a"),
          value: "series_a",
        },
        {
          text: this.$t("user.profile.startup.funding.series_b"),
          value: "series_b",
        },
        {
          text: this.$t("user.profile.startup.funding.series_c"),
          value: "series_c",
        },
      ];
    },
  },
  watch: {},
  methods: {
    closeDialog() {
      this.$emit("update:visible", false);
    },
    submit() {
      if (!this.$refs.editedForm.validate()) return;
      this.$emit("save", this.editedItem);
    },
  },
};
</script>

<style></style>
