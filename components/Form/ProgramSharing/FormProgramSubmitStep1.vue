<template>
  <v-card-text class="px-8">
    <ValidationObserver ref="observer" v-slot="{ validate }">
      <v-form>
        <v-row>
          <!-- Program Title -->
          <v-col cols="12">
            <ValidationProvider
              name="Program Title"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="form.programTitle"
                label="Program Title"
                :error-messages="errors"
                required
              />
            </ValidationProvider>
          </v-col>
          <!-- Email -->
          <v-col cols="12">
            <ValidationProvider
              name="Email"
              rules="required|email"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="form.email"
                label="Email"
                :error-messages="errors"
                required
              />
            </ValidationProvider>
          </v-col>
          <!-- Phone Number -->
          <v-col cols="12">
            <ValidationProvider
              name="Phone Number"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="form.phoneNumber"
                label="Phone Number"
                :error-messages="errors"
                required
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row>
          <!-- Program Coverage -->
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
          <!-- Program Category -->
          <v-col cols="4">
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
          <!-- Program Type -->
          <v-col cols="4">
            <ValidationProvider
              name="Program Type"
              rules="required"
              v-slot="{ errors }"
            >
              <v-select
                class="mt-2"
                v-model="form.programType"
                :items="programTypes"
                label="Program Type"
                :error-messages="errors"
                attach
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <!-- Thumbnail Picker -->
        <v-row>
          <v-col cols="12">
            <ValidationProvider
              name="Thumbnail"
              rules="required"
              v-slot="{ errors }"
            >
              <div>
                <label class="editor-label mb-2 font-weight-medium"
                  >Upload Thumbnail</label
                >
                <!-- Replace with your ImagePicker if needed -->
                <v-file-input
                  v-model="form.thumbnail"
                  label="Upload Thumbnail"
                  prepend-icon="mdi-upload"
                  accept="image/*"
                  :error-messages="errors"
                />
                <div
                  v-if="errors && errors.length"
                  class="error--text text-caption mt-1"
                >
                  {{ errors[0] }}
                </div>
              </div>
            </ValidationProvider>
          </v-col>
        </v-row>
        <!-- Dates -->
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
        <!-- URL -->
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="form.url" label="URL" />
          </v-col>
        </v-row>
        <!-- Description & Content -->
        <div>
          <label class="editor-label font-weight-light">Description</label>
          <Editor
            class="editor-textarea mt-2"
            :detail="form.description"
            @editorDetail="form.description = $event"
            :theme="'bubble'"
          />
        </div>
        <div class="mt-4">
          <label class="editor-label font-weight-light">Content</label>
          <Editor
            class="editor-textarea mt-2"
            :detail="form.content"
            @editorDetail="form.content = $event"
            :theme="'snow'"
          />
        </div>
        <!-- Recaptcha -->
        <div class="mt-16">
          <Recaptcha
            @verify="onCaptchaVerified"
            @expired="onCaptchaExpired"
            attach
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
        <!-- Slot for actions (Submit/Cancel) -->
        <slot :validate="validate"></slot>
      </v-form>
    </ValidationObserver>
  </v-card-text>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import Editor from "@/components/inputs/Editor.vue";
import Recaptcha from "@nuxtjs/recaptcha/lib/Recaptcha.vue";

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    Editor,
    Recaptcha,
  },
  props: {
    form: Object,
    programCoverages: Array,
    programCategories: Array,
    programTypes: Array,
    menuStart: Boolean,
    menuEnd: Boolean,
    recaptchaError: Boolean,
    onCaptchaVerified: Function,
    onCaptchaExpired: Function,
    validate: Function,
  },
};
</script>
