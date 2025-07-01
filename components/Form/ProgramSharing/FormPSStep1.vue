<template>
  <div data-aos="fade-right" data-aos-duration="500">
    <v-card-title class="ml-4 font-weight-bold primary--text text-h5">
      Program Sharing Details
    </v-card-title>
    <v-card-subtitle class="ml-4 font-weight-semibold text-subtitle-h6">
      You can fill in a form to suggest your event. Events will be curated to be
      listed and are subjected to approval.
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
                rules="numeric"
                v-slot="{ errors }"
              >
                <v-text-field
                  v-model="form.phoneNumber"
                  label="Phone Number"
                  :error-messages="errors"
                />
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <ValidationProvider
                name="Program Coverage"
                rules="required"
                v-slot="{ errors }"
              >
                <div>
                  <label class="editor-label mb-2 font-weight-medium"
                    >Program Coverage</label
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
            <v-col cols="4">
              <ValidationProvider
                name="Program Category"
                rules="required"
                v-slot="{ errors }"
              >
                <v-select
                  class="category-dropdown mt-2"
                  v-model="form.programCategory"
                  :items="programCategories"
                  label="Program Category"
                  :error-messages="errors"
                  :menu-props="{ maxWidth: '550', offsetY: true }"
                  attach
                />
              </ValidationProvider>
            </v-col>
            <v-col cols="4">
              <ValidationProvider
                name="Program Type"
                rules="required"
                v-slot="{ errors }"
              >
                <v-select
                  class="category-dropdown mt-2"
                  :menu-props="{ maxWidth: '400', offsetY: true }"
                  v-model="form.programType"
                  :items="programTypes"
                  label="Program Type"
                  :error-messages="errors"
                  attach
                />
              </ValidationProvider>
            </v-col>
          </v-row>
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
          <v-row>
            <v-col cols="12">
              <div>
                <label class="editor-label font-weight-light"
                  >Description</label
                >
                <Editor
                  class="editor-textarea mt-2"
                  :detail="form.description"
                  @editorDetail="form.description = $event"
                  :theme="'bubble'"
                />
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <div class="mt-4 mb-8">
                <label class="editor-label font-weight-light">Content</label>
                <Editor
                  class="editor-textarea mt-2"
                  :detail="form.content"
                  @editorDetail="form.content = $event"
                  :theme="'snow'"
                />
              </div>
            </v-col>
          </v-row>

          <v-row class="mt-8 mb-4">
            <v-col cols="12" class="d-flex justify-end">
              <v-btn large text @click="$emit('close')">Cancel</v-btn>
              <v-btn
                large
                color="primary"
                class="ml-2"
                @click="
                  () => validate().then((valid) => valid && $emit('submit'))
                "
              >
                Submit
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </ValidationObserver>
    </v-card-text>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import Editor from "@/components/inputs/Editor.vue";

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    Editor,
  },
  props: {
    form: Object,
    menuStart: Boolean,
    menuEnd: Boolean,
    programCoverages: Array,
    programCategories: Array,
    programTypes: Array,
  },
  methods: {
    resetValidation() {
      if (this.$refs.observer) {
        this.$refs.observer.reset();
      }
    },
    resetForm() {
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
    onCaptchaVerified(token) {
      this.$emit("captcha-verified", token);
    },
    onCaptchaExpired() {
      this.$emit("captcha-expired");
    },
  },
};
</script>
<style>
.category-dropdown .v-list-item__title {
  font-size: 14px !important; /* or your desired size */
}
</style>
