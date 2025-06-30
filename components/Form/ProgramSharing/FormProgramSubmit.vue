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
          <div v-if="step === 1" data-aos="fade-right" data-aos-duration="500">
            <v-card-title class="ml-4 font-weight-bold primary--text text-h5">
              Program Sharing Details</v-card-title
            >
            <v-card-subtitle class="ml-4 font-weight-semibold pri">
              You can fill in a form to suggest your event. Events will be
              curated to be listed and are subjected to approval.
            </v-card-subtitle>
            <FormProgramSubmitStep1
              :form="form"
              :programCoverages="programCoverages"
              :programCategories="programCategories"
              :programTypes="programTypes"
              :menuStart="menuStart"
              :menuEnd="menuEnd"
              :recaptchaError="recaptchaError"
              :onCaptchaVerified="onCaptchaVerified"
              :onCaptchaExpired="onCaptchaExpired"
              ref="step1"
            >
              <template #default="{ validate }">
                <v-card-actions>
                  <v-spacer />
                  <v-btn text @click="gotoVerify">Cancel</v-btn>
                  <v-btn
                    color="primary"
                    @click="
                      () => validate().then((valid) => valid && goToStep2())
                    "
                  >
                    Submit
                  </v-btn>
                </v-card-actions>
              </template>
            </FormProgramSubmitStep1>
          </div>

          <!-- Step 2: Confirmation -->
          <div v-if="step === 2">
            <FormProgramSubmitStep2
              :email="form.email"
              @continue="submitProgram"
            />
          </div>
        </v-card>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import AOS from "aos";
import Recaptcha from "@nuxtjs/recaptcha/lib/Recaptcha.vue";
import "aos/dist/aos.css";
import axios from "axios";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required, email, numeric } from "vee-validate/dist/rules";
import Editor from "@/components/inputs/Editor.vue";
import FormProgramSubmitStep1 from "./FormProgramSubmitStep1.vue";
import FormProgramSubmitStep2 from "./FormProgramSubmitStep2.vue";
extend("required", required);
extend("email", email);
extend("numeric", numeric);
const gotoVerify = () => {
  window.location.href = "/programsharing/ProgramSubmitVerify";
};
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    Recaptcha,
    Editor,
    FormProgramSubmitStep1,
    FormProgramSubmitStep2,
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
