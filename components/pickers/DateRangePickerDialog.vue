<template>
  <v-dialog v-model="visible" ref="dialogDate" persistent width="290px">
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator" :on="on" :attrs="attrs">
        <div class="" :class="contentClass">
          <label v-if="label">{{ label }}</label>
          <v-text-field
            v-bind="attrs"
            v-on="on"
            :value="value"
            :placeholder="$t('form.common.label.dateFromTo')"
            class="rounded-lg"
            :style="{ 'max-width': width }"
            prepend-inner-icon="mdi-calendar"
            hide-details
            clearable
            outlined
            dense
            readonly
            @click:clear="clear"
            :disabled="disabled"
          ></v-text-field>
        </div>
      </slot>
    </template>
    <v-date-picker
      @input="onInput"
      :value="value"
      :show-current="false"
      :type="type"
      color="primary"
      range
      scrollable
      no-title
    >
      <v-spacer></v-spacer>
      <v-btn text @click="visible = false">{{ $t("dialog.cancel") }}</v-btn>
      <v-btn @click="saveDate" color="primary" elevation="0">{{
        $t("dialog.ok")
      }}</v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
import StartupTeamForm from "../Form/Startup/StartupTeamForm.vue";
export default {
  components: { StartupTeamForm },
  name: "DateRangePickerDialog",
  props: {
    label: String,
    contentClass: String,
    range: Boolean,
    disabled: Boolean,
    width: { type: [Number, String], default: "16.5rem" },
    type: { type: String, default: "date" },
    value: [Array, String],
  },
  data() {
    return {
      visible: false,
    };
  },
  watch: {
    value(v) {
      if (!v.length) this.$refs.dialogDate.save(this.value);
    },
  },
  methods: {
    onInput(v) {
      if (Array.isArray(v) && v.length == 2) {
        const [date1, date2] = v;
        if (new Date(date1).getTime() > new Date(date2).getTime()) {
          this.$emit("update:value", [date2, date1]);
          return;
        }
      }
      this.$emit("update:value", v);
    },
    clear() {
      this.$emit("update:value", []);
      this.$emit("cleared");
      this.$refs.dialogDate.save(this.value);
    },
    saveDate() {
      this.$emit("picked");
      this.$refs.dialogDate.save(this.value);
    },
  },
};
</script>

<style></style>
