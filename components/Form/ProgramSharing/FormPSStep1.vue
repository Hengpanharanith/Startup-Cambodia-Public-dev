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
              :value="form.title"
              v-model="form.title"
              label="Program Title"
              :error-messages="errors"
            />
          </ValidationProvider>
          <v-row>
            <v-col cols="6" v-if="showFields">
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
            <v-col cols="6" v-if="showFields">
              <ValidationProvider
                name="Phone Number"
                rules="numeric"
                v-slot="{ errors }"
              >
                <v-text-field
                  v-model="form.phone"
                  label="Phone Number"
                  :error-messages="errors"
                />
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="8">
              <v-row>
                <v-col cols="12">
                  <ValidationProvider
                    name="Program Type"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-select
                      v-model="form.program_type"
                      :items="programTypes"
                      item-text="label"
                      item-value="value"
                      label="Program Type"
                      :error-messages="errors"
                      :loading="loadingProgramTypes"
                      :disabled="loadingProgramTypes"
                      attach
                      class="category-dropdown"
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider
                    name="Program Category"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-select
                      v-model="form.category"
                      :items="programCategories"
                      item-text="label"
                      item-value="value"
                      label="Program Category"
                      :error-messages="errors"
                      attach
                      class="category-dropdown"
                      :loading="loadingProgramCategories"
                      :disabled="loadingProgramCategories"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="4" class="mt-6">
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
                    v-model="form.is_local"
                    class="custom-radio"
                    :error-messages="errors"
                  >
                    <v-radio
                      v-for="type in programCoverages"
                      :key="type.value"
                      :label="type.label"
                      :value="type.value"
                      color="primary"
                      class="py-2"
                    />
                  </v-radio-group>
                </div>
              </ValidationProvider>
            </v-col>
          </v-row>
          <ValidationProvider
            name="Thumbnail"
            rules="required|imageType|maxSize:1"
            v-slot="{ errors }"
          >
            <v-img
              v-if="imagePreview"
              :src="imagePreview"
              height="200"
              class="mb-2 w-100"
              aspect-ratio="16/9"
              gradient="to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%"
              contain
            >
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular indeterminate color="primary" />
                </div>
              </template>
            </v-img>

            <v-file-input
              v-model="form.image"
              label="Upload Thumbnail"
              prepend-icon="mdi-upload"
              :error-messages="errors"
              show-size
              clearable
              @change="handleImageChange"
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
                  attach
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.start_date"
                      label="Start Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :error-messages="errors"
                    />
                  </template>
                  <v-date-picker
                    v-model="form.start_date"
                    @input="menuStart = false"
                    :min="minDate"
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
                  attach
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.end_date"
                      label="End Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :error-messages="errors"
                    />
                  </template>
                  <v-date-picker
                    v-model="form.end_date"
                    @input="menuEnd = false"
                    :min="form.start_date"
                  />
                </v-menu>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ValidationProvider
                name="URL"
                rules="required|web_url"
                v-slot="{ errors }"
              >
                <v-text-field
                  v-model="form.apply_url"
                  label="URL"
                  :error-messages="errors"
                />
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ValidationProvider name="Address" v-slot="{ errors }">
                <v-text-field
                  v-model="form.address"
                  label="Address"
                  :error-messages="errors"
                />
              </ValidationProvider>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <div>
                <label class="editor-label font-weight-light"
                  >Description</label
                >
                <ValidationProvider
                  name="Description"
                  rules="required"
                  v-slot="{ errors, validate }"
                >
                  <Editor
                    ref="descriptionProvider"
                    class="editor-textarea mt-2"
                    :detail="form.description"
                    @editorDetail="
                      (val) => {
                        form.description = val;
                        validate(val); // trigger VeeValidate manually
                      }
                    "
                    :theme="'bubble'"
                  />

                  <span
                    v-if="errors.length && !form.description"
                    class="red--text text-sm mt-2 d-block"
                  >
                    {{ errors[0] }}
                  </span>
                </ValidationProvider>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <div class="mt-2 mb-8">
                <label class="editor-label font-weight-light">Content</label>
                <ValidationProvider
                  name="Content"
                  rules="required"
                  v-slot="{ errors, validate }"
                  ref="contentProvider"
                >
                  <Editor
                    class="editor-textarea mt-2"
                    :detail="form.content"
                    @editorDetail="
                      (val) => {
                        form.content = val;
                        validate(val); // manually trigger validation
                      }
                    "
                    :theme="'snow'"
                  />

                  <span
                    v-if="errors.length && !form.content"
                    class="red--text text-sm mt-12 d-block"
                  >
                    {{ errors[0] }}
                  </span>
                </ValidationProvider>
              </div>
            </v-col>
          </v-row>

          <v-row class="mt-8 mb-4">
            <v-col cols="12" class="d-flex justify-end">
              <v-btn outlined large text type="button" @click="$emit('close')"
                >Cancel</v-btn
              >
              <v-btn
                large
                color="primary"
                class="ml-2"
                @click="handleSubmit(validate)"
              >
                Next
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
  data() {
    return {
      step: 1,
      minDate: new Date().toISOString().substr(0, 10),
      localImagePreview: this.imagePreview,
    };
  },
  props: {
    form: Object,
    menuEnd: {
      type: Boolean,
      default: false,
    },
    menuStart: {
      type: Boolean,
      default: false,
    },
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
    programCoverages: {
      type: Array,
      required: true,
    },
    showFields: {
      type: Boolean,
      default: true,
    },
    imagePreview: String,
  },
  watch: {
    "form.image"(file) {
      if (file instanceof File) {
        this.imagePreview = URL.createObjectURL(file);
      } else {
        this.imagePreview = null;
      }
      this.$emit("update:form", this.form);
      this.$emit("update:imagePreview", this.imagePreview);
    },
  },

  methods: {
    handleImageChange(file) {
      this.form.image = file;

      if (!file) {
        this.imagePreview = null;
      } else if (file instanceof File) {
        this.imagePreview = URL.createObjectURL(file);
      } else if (typeof file === "string") {
        this.imagePreview = file;
      }
    },
    handleSubmit(validate) {
      validate().then((valid) => {
        if (valid) this.$emit("submit");
      });
    },
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
        start_date: "",
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
};
</script>
<style>
.category-dropdown .v-list-item__title {
  font-size: 16px !important; /* or your desired size */
}
</style>
