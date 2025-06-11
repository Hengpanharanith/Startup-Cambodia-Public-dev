<template>
  <v-container class="pa-8">
    <v-dialog :value="visible" max-width="800px" @input="$emit('close')">
      <v-card class="pa-8" elevation="0">
        <v-card class="input-card1" elevation="0">
          <v-row
            no-gutters
            class="form-step py-8"
            align="center"
            justify="space-between"
            elevation="2"
          >
            <v-col cols="6" class="text-center">
              <v-icon color="primary">mdi-pencil</v-icon>
              <div class="font-weight-medium">Fill In</div>
              <v-divider
                class="mx-auto mt-1"
                style="background-color: #f57c00; height: 2px; width: 60%"
              />
            </v-col>
            <v-col cols="6" class="text-center">
              <v-icon :color="confirmationDialog ? 'primary' : 'grey'"
                >mdi-check</v-icon
              >
              <div
                :class="
                  confirmationDialog ? 'font-weight-medium' : 'grey--text'
                "
              >
                Verify
              </div>
            </v-col>
          </v-row>

          <!-- Form header -->
          <v-card-title class="ml-4">Program Sharing Details</v-card-title>
          <v-card-subtitle class="ml-4">
            You can fill in a form to suggest your event. Events will be curated
            to be listed and are subjected to approval.
          </v-card-subtitle>

          <!-- Form content -->
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

                <!-- Program Type & Program Category -->
                <v-row>
                  <v-col cols="6">
                    <ValidationProvider
                      name="Program Type"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-select
                        v-model="form.programType"
                        :items="programTypes"
                        label="Program Type"
                        :error-messages="errors"
                      />
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="6">
                    <ValidationProvider
                      name="Program Category"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-select
                        v-model="form.programCategory"
                        :items="programCategories"
                        label="Program Category"
                        :error-messages="errors"
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

                <!-- Date & URL -->
                <v-row>
                  <v-col cols="6">
                    <ValidationProvider
                      name="Date"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="form.date"
                            label="Start / End Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            :error-messages="errors"
                          />
                        </template>
                        <v-date-picker
                          v-model="form.date"
                          @input="menu = false"
                        />
                      </v-menu>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="form.url" label="URL" />
                  </v-col>
                </v-row>

                <!-- Description & Content -->
                <v-textarea
                  v-model="form.description"
                  label="Description"
                  auto-grow
                  rows="2"
                />
                <v-textarea
                  v-model="form.content"
                  label="Content"
                  auto-grow
                  rows="4"
                />
              </v-form>

              <!-- Buttons -->
              <v-card-actions>
                <v-spacer />
                <v-btn text @click="$emit('close')">Cancel</v-btn>
                <v-btn
                  color="primary"
                  @click="
                    () =>
                      validate().then((valid) => valid && openConfirmation())
                  "
                  >Submit</v-btn
                >
              </v-card-actions>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-card>
    </v-dialog>

    <!-- Confirmation Step -->
    <v-dialog v-model="confirmationDialog" max-width="500px">
      <v-card class="rounded-md pa-8" elevation="0">
        <div class="confirmation-card pa-8 rounded-md text-center">
          <!-- Icon -->
          <div class="mb-6">
            <v-icon size="64" color="grey darken-2"
              >mdi-check-circle-outline</v-icon
            >
          </div>

          <!-- Title -->
          <h2
            class="text-h5 font-weight-semibold mb-6 grey--text text--darken-4"
          >
            Verification Email Sent
          </h2>

          <!-- Description -->
          <p
            class="text-body-1 grey--text text--darken-2 mb-8 line-height-relaxed"
          >
            Please check your inbox at <b>[{{ form.email }}]</b> and click
            "Verify" to continue. Email verification is required to submit your
            program.
          </p>

          <!-- Action Button -->
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
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";

extend("required", required);
extend("email", email);

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      confirmationDialog: false,
      menu: false,
      programTypes: ["Workshop", "Webinar", "Seminar"],
      programCategories: ["Technology", "Education", "Health"],
      form: {
        programTitle: "",
        email: "",
        programType: null,
        programCategory: null,
        thumbnail: null,
        date: "",
        url: "",
        description: "",
        content: "",
      },
    };
  },
  methods: {
    openConfirmation() {
      const formData = new FormData();
      formData.append("programTitle", this.form.programTitle);
      formData.append("email", this.form.email);
      formData.append("programType", this.form.programType);
      formData.append("programCategory", this.form.programCategory);
      formData.append("thumbnail", this.form.thumbnail); // assuming it's a File
      formData.append("date", this.form.date);
      formData.append("url", this.form.url);
      formData.append("description", this.form.description);
      formData.append("content", this.form.content);

      // Console log each field to verify
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      // Simulate confirmation dialog without API call
      this.$emit("close");
      this.confirmationDialog = true;
    },

    //   submitProgram() {
    //     this.confirmationDialog = false;
    //     alert("Program submitted successfully!");
    //     // Optional: Reset the form
    //     this.resetForm();
    //   },
    //   async submitProgram() {
    //   try {
    //     this.confirmationDialog = false;

    //     const formData = new FormData();
    //     formData.append("programTitle", this.form.programTitle);
    //     formData.append("email", this.form.email);
    //     formData.append("programType", this.form.programType);
    //     formData.append("programCategory", this.form.programCategory);
    //     formData.append("thumbnail", this.form.thumbnail); // assuming File object
    //     formData.append("date", this.form.date);
    //     formData.append("url", this.form.url);
    //     formData.append("description", this.form.description);
    //     formData.append("content", this.form.content);

    //     const response = await axios.post("https://your-backend.com/api/programs/", formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     });

    //     console.log("API Response:", response.data);
    //     alert("Program submitted successfully!");

    //     // Optional: reset form
    //     this.resetForm();

    //   } catch (error) {
    //     console.error("Submission error:", error.response?.data || error.message);
    //     alert("Failed to submit program. Please try again.");
    //   }
    // },

    resetForm() {
      this.form = {
        programTitle: "",
        email: "",
        programType: null,
        programCategory: null,
        thumbnail: null,
        date: "",
        url: "",
        description: "",
        content: "",
      };
    },
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
</style>
