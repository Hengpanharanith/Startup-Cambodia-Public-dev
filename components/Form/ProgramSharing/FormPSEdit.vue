<template>
  <div data-aos="fade-right" data-aos-duration="500">
    <v-card-title class="ml-4 font-weight-bold primary--text text-h5">
      Program Sharing Details
    </v-card-title>
    <v-card-subtitle class="ml-4 font-weight-semibold text-subtitle-h6">
      You can edit the details of your submitted event. Changes will be reviewed
      and are subject to approval.
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
                      class="mb-2"
                    />
                  </v-radio-group>
                </div>
              </ValidationProvider>
            </v-col>
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
              <v-row> </v-row>
            </v-col>
          </v-row>
          <ValidationProvider
            name="Thumbnail"
            rules="imageType|imageType|maxSize:1"
            v-slot="{ errors }"
          >
            <div>
              <v-img
                v-if="typeof form.image === 'string'"
                :src="form.image"
                height="120"
                contain
                class="mb-2"
              />
              <v-file-input
                v-model="form.imageFile"
                label="Upload Thumbnail"
                prepend-icon="mdi-upload"
                :error-messages="errors"
                placeholder="Select a file"
                @change="onImageChange"
                show-size
                clearable
              />
            </div>
          </ValidationProvider>
          <v-row>
            <v-col cols="6">
              <ValidationProvider
                name="Start Date"
                rules="required"
                v-slot="{ errors }"
              >
                <v-menu
                  v-model="localMenuStart"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  attach
                  @input="toggleMenuStart"
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
                    @input="closeMenuStart"
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
                  v-model="localMenuEnd"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  attach
                  @input="toggleMenuEnd"
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
                    @input="closeMenuEnd"
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
              <div>
                <label class="editor-label font-weight-light"
                  >Description</label
                >
                <ValidationProvider
                  name="Description"
                  rules="required"
                  v-slot="{ errors, validate }"
                  ref="descriptionProvider"
                >
                  <Editor
                    class="editor-textarea mt-2"
                    :detail="form.description"
                    @editorDetail="
                      (val) => {
                        form.description = val;
                        validate(val);
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
              <div class="mt-4 mb-8">
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
                    class="red--text text-sm mt-2 d-block"
                  >
                    {{ errors[0] }}
                  </span>
                </ValidationProvider>
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
                @click="handleSubmit(validate)"
              >
                Confirm Edit
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
      localMenuEnd: this.menuEnd,
      localMenuStart: this.menuStart,
      step: 1,
      minDate: new Date().toISOString().substr(0, 10),
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
    programCoverages: Array,
    showFields: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    menuEnd(newVal) {
      this.localMenuEnd = newVal;
    },
    menuStart(newVal) {
      this.localMenuStart = newVal;
    },
  },
  methods: {
    handleSubmit(validate) {
      // console.log("Form data before validation:", this.form);
      validate().then((valid) => {
        // console.log("Validation result:", valid);
        if (valid) {
          this.$emit("submit-edit", this.form);
        } else {
          console.warn("Validation failed", this.form);
          this.$nextTick(() => {
            const observer = this.$refs.observer;
            if (observer) {
              console.log("Validation errors:", observer.errors);
            }
          });
        }
      });
    },
    toggleMenuStart(val) {
      this.localMenuStart = val;
      this.$emit("update:menuStart", val);
    },
    toggleMenuEnd(val) {
      this.localMenuEnd = val;
      this.$emit("update:menuEnd", val);
    },
    closeMenuEnd() {
      this.localMenuEnd = false;
      this.$emit("update:menuEnd", false);
    },
    closeMenuStart() {
      this.localMenuStart = false;
      this.$emit("update:menuStart", false);
    },
    //Handle for image change in local and preview on Form
    onImageChange(file) {
      if (!file) return;

      // Clean old preview if exists
      if (this.form._previewUrl) {
        URL.revokeObjectURL(this.form._previewUrl);
      }
      const previewUrl = URL.createObjectURL(file);
      this.form.image = previewUrl;
      this.form._previewUrl = previewUrl;
    },
    // Add a method to manually validate the form
    validateForm() {
      if (this.$refs.observer) {
        return this.$refs.observer.validate();
      }
      return Promise.resolve(false);
    },

    resetValidation() {
      if (this.$refs.observer) {
        this.$refs.observer.reset();
      }
    },

    resetForm() {
      this.form = {
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
