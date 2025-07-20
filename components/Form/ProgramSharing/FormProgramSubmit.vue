<template>
  <v-container class="pa-8">
    <v-dialog
      :value="visible"
      max-width="800px"
      @input="$emit('close')"
      persistent
    >
      <v-card class="pa-8" elevation="0">
        <v-card class="input-card1" elevation="0">
          <!-- Stepper Header -->
          <v-row
            no-gutters
            class="py-8"
            align="center"
            justify="center"
            ref="dialogTop"
          >
            <!-- Step 1 -->
            <v-col cols="12" md="3" class="text-center">
              <v-btn
                fab
                :color="step >= 1 ? 'primary' : 'grey lighten-2'"
                :outlined="step === 1"
                class="mb-3"
                @click="goToStep1"
              >
                <v-icon :color="step >= 1 ? 'black' : 'grey'">
                  {{ step > 1 ? "mdi-check" : "mdi-pencil" }}
                </v-icon>
              </v-btn>

              <div
                class="body-2 font-weight-medium"
                :class="step >= 1 ? 'primary--text' : 'grey--text'"
              >
                Describe Your Program
              </div>
            </v-col>

            <!-- Connector -->
            <v-col
              cols="12"
              md="1"
              class="d-none d-md-flex justify-center align-center"
            >
              <v-divider></v-divider>
            </v-col>

            <!-- Step 2 -->
            <v-col cols="12" md="3" class="text-center">
              <v-btn
                fab
                :color="step >= 2 ? 'primary' : 'grey lighten-2'"
                :outlined="step === 2"
                class="mb-3"
                :disabled="step < 2"
              >
                <v-icon :color="step >= 2 ? 'black' : 'grey'">
                  {{ step > 2 ? "mdi-check" : "mdi-eye" }}
                </v-icon>
              </v-btn>

              <div
                class="body-2 font-weight-medium"
                :class="step >= 2 ? 'primary--text' : 'grey--text'"
              >
                Preview Your Program
              </div>
            </v-col>

            <!-- Connector -->
            <v-col
              cols="12"
              md="1"
              class="d-none d-md-flex justify-center align-center"
            >
              <v-divider></v-divider>
            </v-col>

            <!-- Step 3 -->
            <v-col cols="12" md="3" class="text-center">
              <v-btn
                fab
                :color="step >= 3 ? 'primary' : 'grey lighten-2'"
                :outlined="step === 3"
                class="mb-3"
                :disabled="step < 3"
              >
                <v-icon :color="step >= 3 ? 'black' : 'grey'">
                  {{ step > 3 ? "mdi-check" : "mdi-magnify" }}
                </v-icon>
              </v-btn>

              <div
                class="body-2 font-weight-medium"
                :class="step >= 3 ? 'primary--text' : 'grey--text'"
              >
                Checking
              </div>
            </v-col>
          </v-row>

          <v-divider></v-divider>

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
            @update:imagePreview="imagePreview = $event"
            :image-preview="imagePreview"
          />
          <CardProgramSubmissionStep2
            ref="step2"
            v-if="step === 2"
            :form="previewFormData"
            :programCoverages="programCoverages"
            @back="goToStep1"
            @submit="submitProgram"
            :loadingProgramCategories="loadingProgramCategories"
            :loadingProgramTypes="loadingProgramTypes"
            :programCategories="programCategories"
            :programTypes="programTypes"
            :image-preview="imagePreview"
            :loading="loadingSubmit"
          />
          <FormPSStep3
            ref="step3"
            v-if="step === 3"
            :form="form"
            @continue="goHome"
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
import FormPSStep3 from "./FormPSStep3.vue";
import CardProgramSubmissionStep2 from "../../CardView/CardProgramSubmissionStep2.vue";

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
    FormPSStep3,
    CardProgramSubmissionStep2,
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
      loadingSubmit: false,
      step: 1,
      menuStart: false,
      imagePreview: null,
      menuEnd: false,
      previewFormData: null, // Add this to store the resolved data
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
        this.previewFormData = null; // Reset preview data
        this.resetForm();
      }
    },
  },
  methods: {
    goToStep1() {
      this.step = 1;
      this.$nextTick(() => {
        // Wait for step 1 form to render
        setTimeout(() => {
          const formStep1Ref = this.$refs.formStep1;
          if (formStep1Ref && formStep1Ref.triggerEditorSync) {
            formStep1Ref.triggerEditorSync();
          }
        }, 50);
      });
      this.scrollToTop();
    },
    goToStep2() {
      // console.log("Form valid, moving to step 2", this.form);
      // console.log("Preview form data:", this.previewFormData);
      const categoryObj =
        this.programCategories.find((c) => c.id === this.form.category) || null;
      const programTypeObj =
        this.programTypes.find((t) => t.id === this.form.program_type) || null;
      this.previewFormData = {
        ...this.form,
        category: categoryObj,
        program_type: programTypeObj,
        imagePreview: this.imagePreview,
      };
      this.previewFormData = JSON.parse(JSON.stringify(this.form));
      this.step = 2;
      this.scrollToTop();
    },
    submitProgram() {
      this.loadingSubmit = true;
      setTimeout(() => {
        this.step = 3;
        this.scrollToTop;
        this.$emit("submitProgram", this.form);
        this.loadingSubmit = false;
      }, 2000);
    },

    goHome() {
      this.resetForm();
      this.$router.replace("/");
    },
    scrollToTop() {
      this.$nextTick(() => {
        const top = this.$refs.dialogTop;
        if (top && typeof top.scrollIntoView === "function") {
          top.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    },
    resetForm() {
      // Reset form to initial state
      Object.assign(this.form, {
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
        apply_url: "",
        image: null,
      });

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
