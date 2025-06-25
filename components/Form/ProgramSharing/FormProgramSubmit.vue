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

            <v-card-text class="px-8">
              <ValidationObserver ref="observer" v-slot="{ validate }">
                <v-form>
                  <!-- Program Title -->
                  <ValidationProvider
                    name="Program Title"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="form.programTitle"
                      label="Program Title"
                      :error-messages="errors"
                    />
                  </ValidationProvider>

                  <v-row>
                    <v-col cols="6">
                      <!-- Email -->
                      <ValidationProvider
                        name="Email"
                        rules="required|email"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          v-model="form.email"
                          label="Email"
                          :error-messages="errors"
                        />
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="6">
                      <ValidationProvider
                        name="Phone Number"
                        rules="required|numeric"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          v-model="form.phoneNumber"
                          label="Phone Number"
                          :error-messages="errors"
                        /> </ValidationProvider
                    ></v-col>
                    <!--phonenumber-->
                  </v-row>

                  <!-- Program Type & Program Category -->
                  <v-row>
                    <v-col cols="6">
                      <ValidationProvider
                        name="Program Type"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <div>
                          <label class="editor-label mb-2 font-weight-medium"
                            >Program Type</label
                          >

                          <v-radio-group
                            v-model="form.programCoverage"
                            class="custom-radio"
                          >
                            <v-radio
                              v-for="type in programCoverages"
                              :key="type"
                              :label="type"
                              :value="type"
                              color="primary"
                              class="mb-2"
                            />
                          </v-radio-group>

                          <div
                            v-if="errors && errors.length"
                            class="error--text text-caption mt-1"
                          >
                            {{ errors[0] }}
                          </div>
                        </div>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="6">
                      <ValidationProvider
                        name="Program Category"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <v-select
                          class="mt-2"
                          v-model="form.programCategory"
                          :items="programCategories"
                          label="Program Category"
                          :error-messages="errors"
                          attach
                        />
                      </ValidationProvider>
                    </v-col>
                  </v-row>

                  <!-- Thumbnail -->
                  <ValidationProvider
                    name="Thumbnail"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-file-input
                      v-model="form.thumbnail"
                      label="Upload Thumbnail"
                      prepend-icon="mdi-upload"
                      accept="image/*"
                      :error-messages="errors"
                    />
                  </ValidationProvider>

                  <!-- Start Date & End Date -->
                  <v-row>
                    <v-col cols="6">
                      <ValidationProvider
                        name="Start Date"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <v-menu
                          v-model="menuStart"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.startDate"
                              label="Start Date"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              :error-messages="errors"
                            />
                          </template>
                          <v-date-picker
                            v-model="form.startDate"
                            @input="menuStart = false"
                          />
                        </v-menu>
                      </ValidationProvider>
                    </v-col>

                    <v-col cols="6">
                      <ValidationProvider
                        name="End Date"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <v-menu
                          v-model="menuEnd"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.endDate"
                              label="End Date"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              :error-messages="errors"
                            />
                          </template>
                          <v-date-picker
                            v-model="form.endDate"
                            @input="menuEnd = false"
                          />
                        </v-menu>
                      </ValidationProvider>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="form.url" label="URL" />
                    </v-col>
                  </v-row>
                  <!-- Description & Content -->
                  <div>
                    <label class="editor-label font-weight-light"
                      >Description</label
                    >

                    <Editor
                      class="editor-textarea mt-2"
                      :detail="form.description"
                      @editorDetail="form.description = $event"
                    />
                  </div>

                  <div class="mt-4">
                    <label class="editor-label font-weight-light"
                      >Content</label
                    >
                    <Editor
                      class="editor-textarea mt-2"
                      :detail="form.content"
                      @editorDetail="form.content = $event"
                    />
                  </div>
                </v-form>
                <div class="mt-4">
                  <recaptcha
                    @verify="onCaptchaVerified"
                    @expired="onCaptchaExpired"
                  />

                  <p
                    v-if="recaptchaError"
                    class="red--text"
                    data-aos="fade-right"
                    data-aos-duration="500"
                  >
                    Please verify you are not a robot.
                  </p>
                </div>
                <!-- Buttons -->
                <v-card-actions>
                  <v-spacer />
                  <v-btn text @click="$emit('close')">Cancel</v-btn>
                  <v-btn
                    color="primary"
                    @click="
                      () => validate().then((valid) => valid && goToStep2())
                    "
                  >
                    Submit
                  </v-btn>
                </v-card-actions>
              </ValidationObserver>
            </v-card-text>
          </div>

          <!-- Step 2: Confirmation -->
          <div
            v-if="step === 2"
            class="text-center pa-8"
            data-aos="fade-right"
            data-aos-duration="500"
          >
            <div class="mb-6">
              <v-icon size="64" color="grey darken-2"
                >mdi-check-circle-outline</v-icon
              >
            </div>
            <h2
              class="text-h5 font-weight-bold mb-6 black--text text--darken-2"
            >
              Verification Email Sent
            </h2>
            <p
              class="text-body-1 grey--text text--darken-2 mb-8 line-height-relaxed"
            >
              Please check your inbox at
              <b class="black--text font-weight-semibold">{{ form.email }}</b>
              and click "Verify" to continue. Email verification is required to
              submit your program.
            </p>
            <v-btn
              color="primary"
              large
              block
              depressed
              class="rounded-md text-capitalize font-weight-semibold py-3"
              @click="submitProgram"
            >
              Continue
            </v-btn>
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
extend("required", required);
extend("email", email);
extend("numeric", numeric);

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    Recaptcha,
    Editor,
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
