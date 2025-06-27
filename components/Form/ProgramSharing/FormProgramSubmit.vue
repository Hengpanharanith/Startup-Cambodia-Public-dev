<template>
  <v-container class="pa-8">
    <v-dialog :value="visible" max-width="800px" @input="$emit('close')">
      <v-card class="pa-8" elevation="0">
        <v-card class="input-card1" elevation="0">
          <!-- Stepper Header -->
          <v-row
            no-gutters
            class="form-step py-8"
            align="center"
            justify="space-between"
            elevation="2"
          >
            <v-col cols="6" class="text-center">
              <v-icon :color="step === 1 ? 'primary' : 'grey'"
                >mdi-pencil</v-icon
              >
              <div :class="step === 1 ? 'font-weight-medium' : 'grey--text'">
                Fill In
              </div>
            </v-col>
            <v-divider
              class="mx-auto mt-1"
              style="background-color: #f57c00; height: 2px; width: 60%"
            />
            <v-col cols="6" class="text-center">
              <v-icon :color="step === 2 ? 'primary' : 'grey'"
                >mdi-check</v-icon
              >
              <div :class="step === 2 ? 'font-weight-medium' : 'grey--text'">
                Verify
              </div>
            </v-col>
          </v-row>

          <!-- Step 1: Form -->
          <FormPSStep1
            v-if="step === 1"
            :form="form"
            :menuStart="menuStart"
            :menuEnd="menuEnd"
            :programCoverages="programCoverages"
            :programCategories="programCategories"
            :programTypes="programTypes"
            :recaptchaError="recaptchaError"
            @close="$emit('close')"
            @submit="goToStep2"
            @captcha-verified="onCaptchaVerified"
            @captcha-expired="onCaptchaExpired"
          />

          <!-- Step 2: Confirmation -->
          <FormPSStep2
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
import axios from "axios";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required, email, numeric } from "vee-validate/dist/rules";
import FormPSStep1 from "./FormPSStep1.vue";
import FormPSStep2 from "./FormPSStep2.vue";
extend("required", required);
extend("email", email);
extend("numeric", numeric);

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    FormPSStep1,
    FormPSStep2,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      step: 1,
      recaptchaToken: null,
      recaptchaError: false,
      menuStart: false,
      menuEnd: false,
      programCoverages: ["National", "International"],
      programCategories: [
        "Entrepreneurship Education",
        "Angel Invester and Venure Capital Networks",
        "Co-Working Spaces and Inovation Hubs",
        "Startup Competitions and Pitching Events",
        "Internationalization Startup Support",
        "Startup Support Programs",
        "Mentoship and Coaching Programs",
        "Startup Incubator and Accelerator",
        "Others",
      ],
      form: {
        programTitle: "",
        email: "",
        phoneNumber: "",
        programCoverage: null,
        programCategory: null,
        thumbnail: null,
        startDate: "",
        endDate: "",
        url: "",
        description: "",
        content: "",
      },
    };
  },
  watch: {
    visible(val) {
      if (!val) {
        this.step = 1;
        this.resetForm();
        this.recaptchaToken = null;
      }
    },
  },
  methods: {
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
      if (!this.recaptchaToken) {
        this.recaptchaError = true;
        return;
      } else if (this.recaptchaToken) {
        this.recaptchaError = false;
      }
      alert("Captcha verified, form submitted!");
      const formData = new FormData();
      for (const key in this.form) {
        formData.append(key, this.form[key]);
      }
      console.log("Form submitted:", Object.fromEntries(formData));
      this.step = 2;
    },
    // Simulate form submission
    submitProgram() {
      alert("Program submitted successfully!");
      this.resetForm();
      this.$emit("close");
      this.step = 1;
    },
    resetForm() {
      this.recaptchaError = false;
      this.form = {
        programTitle: "",
        email: "",
        phoneNumber: "",
        programCoverage: null,
        programCategory: null,
        thumbnail: null,
        startDate: "",
        endDate: "",
        url: "",
        description: "",
        content: "",
      };
      this.recaptchaToken = null;
      this.$nextTick(() => {
        if (this.$refs.observer) {
          this.$refs.observer.reset();
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
