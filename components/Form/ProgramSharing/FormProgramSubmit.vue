<template>
  <v-container class="pa-8">
    <v-dialog :value="visible" max-width="800px" @input="$emit('close')">
      <v-card class="pa-8" elevation="0">
        <v-card class="input-card1" elevation="0">
          <!-- Stepper Header -->
          <v-row no-gutters class="py-8" align="center" justify="space-between">
            <!-- Step 1 -->
            <v-col
              cols="5"
              class="text-center"
              style="cursor: pointer"
              @click="goToStep1"
            >
              <v-avatar
                size="40"
                :color="step === 1 ? 'primary' : 'grey lighten-1'"
                class="mb-2"
              >
                <v-icon dark>mdi-pencil</v-icon>
              </v-avatar>
              <div
                :class="
                  step === 1 ? 'font-weight-medium primary--text' : 'grey--text'
                "
              >
                Fill In
              </div>
            </v-col>
            <!-- Step 2 -->
            <v-col cols="5" class="text-center">
              <v-avatar
                size="40"
                :color="step === 2 ? 'primary' : 'grey lighten-1'"
                class="mb-2"
              >
                <v-icon dark>mdi-check</v-icon>
              </v-avatar>
              <div
                :class="
                  step === 2 ? 'font-weight-medium primary--text' : 'grey--text'
                "
              >
                Verify
              </div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <!-- <v-divider></v-divider> -->
          <!-- Step 1: Form -->
          <FormPSStep1
            ref="step1"
            v-if="step === 1"
            :form="form"
            :programCoverages="programCoverages"
            @close="$emit('close')"
            @submit="goToStep2"
            :loadingProgramCategories="loadingProgramCategories"
            :loadingProgramTypes="loadingProgramTypes"
            :programCategories="programCategories"
            :programTypes="programTypes"
          />

          <!-- Step 2: Confirmation -->
          <FormPSStep2
            ref="step2"
            v-if="step === 2"
            :form="form"
            @continue="submitProgram"
          />
        </v-card>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";

import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required, email, numeric, max, min } from "vee-validate/dist/rules";
import FormPSStep1 from "./FormPSStep1.vue";
import FormPSStep2 from "./FormPSStep2.vue";
extend("required", required);
extend("email", email);
extend("numeric", numeric);
extend("min", min);
extend("max", max);
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    FormPSStep1,
    FormPSStep2,
  },
  props: {
    programTypes: {
      type: Array,
      default: () => [],
    },
    programCategories: {
      type: Array,
      default: () => [],
    },
    loadingProgramTypes: {
      type: Boolean,
      default: false,
    },
    loadingProgramCategories: {
      type: Boolean,
      default: false,
    },
    form: {
      type: Object,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      step: 1,
      menuStart: false,
      menuEnd: false,
      programCoverages: [
        { label: "National", value: true },
        { label: "International", value: false },
      ],
    };
  },
  watch: {
    visible(val) {
      if (!val) {
        this.step = 1;
        this.resetForm();
      }
    },
  },
  methods: {
    goToStep1() {
      this.step = 1;

      this.$nextTick(() => {
        if (this.$refs.step1?.resetValidation) {
          this.$refs.step1.resetValidation();
        }

        // Also reset the individual fields for rich text editors
        const step1 = this.$refs.step1;

        step1?.$refs.descriptionProvider?.reset?.();
        step1?.$refs.contentProvider?.reset?.();
      });
    },
    onCaptchaVerified(token) {
      console.log("Token received:", token); // ✅ You should see this in browser console
      this.recaptchaToken = token;
      this.recaptchaError = false;
    },
    onCaptchaExpired() {
      this.recaptchaToken = null;
      this.recaptchaError = true;
    },

    goToStep2() {
      console.log("Form valid, moving to step 2");
      this.step = 2;
    },

    submitProgram() {
      this.$emit("submitProgram", this.form);
    },

    resetForm() {
      this.form = {
        address: "",
        email: "",
        phone: "",
        title: "",
        content: "",
        description: "",
        program_type: null,
        category: null,
        is_local: null,
        start_date: "",
        end_date: "",
        address: "",
        apply_url: "",
        image: null,
      };

      this.$nextTick(() => {
        if (this.$refs.step1 && this.$refs.step1.resetValidation) {
          this.$refs.step1.resetValidation();
        }
      });
    },
  },
  mounted() {
    AOS.init({ once: false });
    this.$nextTick(() => {
      AOS.refresh();
    });
  },
};
</script>

<style>
.form-step {
  border-bottom: 1px solid #b0b0b0;
}
.v-dialog::-webkit-scrollbar {
  display: none;
}
.v-dialog {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.confirmation-card {
  border: 1px solid #b0b0b0;
}
.input-card1 {
  border: 1px solid #b0b0b0 !important;
}
.editor-label {
  font-size: 16px;
  color: #707070;
  margin-top: 8px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
