<template>
  <div
    class="cardContainer pa-0"
    elevation="3"
    data-aos="fade-right"
    data-aos-duration="250"
  >
    <v-container class="pa-12" style="min-height: 430px">
      <!-- Loading State -->
      <div v-if="!form || loadingProgramCategories || loadingProgramTypes">
        <v-row align="center" justify="center">
          <v-col cols="12" class="text-center">
            <v-progress-circular indeterminate color="primary" size="50" />
            <p class="mt-4 text-body-1">Loading preview...</p>
          </v-col>
        </v-row>
      </div>

      <!-- Content -->
      <div v-else>
        <v-row>
          <v-col cols="12">
            <h2 class="font-weight-bold black--text text-h4 mt-2 mb-2">
              Program Submission Preview
            </h2>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="mt-2">
          <v-col cols="12">
            <!-- Program Title -->
            <div class="d-flex justify-space-between align-center mb-6">
              <h5 class="text-h4 font-weight-bold orange--text">
                {{ form.title || "Program Title" }}
              </h5>
            </div>

            <!-- Program Image -->
            <v-img
              v-if="imagePreview || form.image"
              :src="imagePreview || form.image"
              class="rounded-lg mb-6"
              height="350"
              gradient="to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%"
              contain
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5" />
                </v-row>
              </template>
            </v-img>

            <div v-else class="thumbnail-placeholder mb-6">
              <v-icon size="64" color="grey lighten-2">mdi-image</v-icon>
              <p class="mt-2 grey--text">No image uploaded</p>
            </div>

            <!-- Program Tags -->
            <div class="mb-6 d-flex flex-wrap gap-2">
              <v-chip
                color="orange"
                text-color="white"
                label
                small
                class="px-3"
              >
                {{ getCoverageLabel }}
              </v-chip>
              <v-chip
                color="green"
                text-color="white"
                label
                small
                class="px-3 ml-2"
              >
                {{ getCategoryName }}
              </v-chip>
              <v-chip
                color="blue"
                text-color="white"
                label
                small
                class="px-3 ml-2"
              >
                {{ getProgramTypeName }}
              </v-chip>
            </div>

            <!-- Program Details -->
            <div class="mb-6">
              <!-- Date Range -->
              <div class="d-flex align-center mb-3">
                <v-icon class="mr-3" small color="orange"
                  >mdi-calendar-range</v-icon
                >
                <span class="text-body-1">
                  {{ getFormattedDateRange }}
                </span>
              </div>

              <!-- Address -->
              <div class="d-flex align-center mb-3">
                <v-icon class="mr-3" small color="orange"
                  >mdi-map-marker</v-icon
                >
                <span class="text-body-1">
                  {{ form.address || "Address not provided" }}
                </span>
              </div>

              <!-- Email -->
              <div v-if="form.email" class="d-flex align-center mb-3">
                <v-icon class="mr-3" small color="orange">mdi-email</v-icon>
                <span class="text-body-1">
                  {{ form.email }}
                </span>
              </div>

              <!-- Phone -->
              <div v-if="form.phone" class="d-flex align-center mb-3">
                <v-icon class="mr-3" small color="orange">mdi-phone</v-icon>
                <span class="text-body-1">
                  {{ form.phone }}
                </span>
              </div>

              <!-- Apply URL -->
              <div v-if="form.apply_url" class="d-flex align-center mb-3">
                <v-icon class="mr-3" small color="orange"
                  >mdi-link-variant</v-icon
                >
                <a
                  :href="form.apply_url"
                  target="_blank"
                  class="text-body-1 text-decoration-none orange--text"
                >
                  {{ form.apply_url }}
                </a>
              </div>
            </div>

            <v-divider class="my-6"></v-divider>

            <!-- Description Section -->
            <div v-if="form.description" class="mb-6">
              <h3 class="text-h6 orange--text mb-3 font-weight-bold">
                Description
              </h3>
              <div
                class="text-body-1 line-height-1-6"
                v-html="form.description"
              ></div>
            </div>

            <!-- Content Section -->
            <div v-if="form.content" class="mb-6">
              <h3 class="text-h6 orange--text mb-3 font-weight-bold">
                Content
              </h3>
              <div
                class="text-body-1 line-height-1-6"
                v-html="form.content"
              ></div>
            </div>

            <!-- If no description or content -->
            <div v-if="!form.description && !form.content" class="mb-6">
              <p class="grey--text text-center py-4">
                No description or content provided
              </p>
            </div>

            <v-divider></v-divider>
            <v-row>
              <v-col cols="12">
                <v-checkbox
                  v-model="checked"
                  :label="`Please confirm that this email ${form.email} exists and is your own.`"
                />
              </v-col>
            </v-row>
            <!-- Action Buttons -->
            <v-row class="mt-2">
              <v-col cols="12" class="d-flex justify-space-between">
                <v-btn
                  color="grey darken-2"
                  outlined
                  large
                  class="text-capitalize font-weight-medium px-8 py-3"
                  @click="$emit('back')"
                >
                  <v-icon left small>mdi-arrow-left</v-icon>
                  Back
                </v-btn>

                <v-btn
                  :disabled="!checked || loading"
                  :class="{ 'disabled-btn': !checked }"
                  color="primary"
                  class="white--text text-capitalize font-weight-bold px-8 py-3"
                  large
                  elevation="0"
                  @click="$emit('submit')"
                >
                  <v-icon left small v-if="!loading">mdi-check</v-icon>

                  <template v-if="loading">
                    <v-progress-circular
                      indeterminate
                      color="white"
                      size="18"
                      width="2"
                      class="mr-2"
                    />
                    Submitting...
                  </template>

                  <template v-else> CONFIRM SUBMIT </template>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
    };
  },
  name: "CardProgramSubmissionStep2",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    imagePreview: {
      type: String, // or null
      default: null,
    },
    previewFormData: Object,
    form: {
      type: Object,
      required: true,
    },
    programCategories: {
      type: Array,
      default: () => [],
    },
    programTypes: {
      type: Array,
      default: () => [],
    },
    programCoverages: {
      type: Array,
      default: () => [],
    },
    loadingProgramCategories: {
      type: Boolean,
      default: false,
    },
    loadingProgramTypes: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getCategoryName() {
      const form = this.previewFormData || this.form; // fallback if needed

      if (form?.category?.name || form?.category?.label) {
        return form.category.name || form.category.label;
      }

      const category = this.programCategories.find(
        (c) => c.id === form?.category || c.value === form?.category
      );
      return category?.name || category?.label || "Category not found";
    },

    getProgramTypeName() {
      const form = this.previewFormData || this.form;

      if (form?.program_type?.name || form?.program_type?.label) {
        return form.program_type.name || form.program_type.label;
      }

      const programType = this.programTypes.find(
        (t) => t.id === form?.program_type || t.value === form?.program_type
      );
      return (
        programType?.name || programType?.label || "Program type not found"
      );
    },

    getCoverageLabel() {
      // Check if enriched data exists
      if (this.form?.coverageObj) {
        return this.form.coverageObj.label || "Coverage";
      }

      // Fallback logic
      if (this.form?.is_local === true) {
        return "National";
      } else if (this.form?.is_local === false) {
        return "International";
      }
      return "Coverage not specified";
    },

    getFormattedDateRange() {
      if (!this.form?.start_date || !this.form?.end_date) {
        return "Dates not specified";
      }

      try {
        const startDate = new Date(this.form.start_date);
        const endDate = new Date(this.form.end_date);

        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };

        const start = startDate.toLocaleDateString("en-US", options);
        const end = endDate.toLocaleDateString("en-US", options);

        return `${start} to ${end}`;
      } catch (error) {
        return `${this.form.start_date} to ${this.form.end_date}`;
      }
    },
  },
  watch: {
    form: {
      handler(newVal) {
        console.log("Form data received in step 2:", newVal);
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped>
.cardContainer {
  padding: 0px !important;
  background-color: white !important;
  min-height: 100vh;
}

.line-height-1-6 {
  line-height: 1.6;
}

.thumbnail-placeholder {
  height: 300px;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ddd;
}

.gap-2 {
  gap: 8px;
}

.v-chip {
  font-weight: 500;
}

.v-btn {
  border-radius: 8px;
}

a {
  text-decoration: none;
}

.v-icon {
  font-size: 18px;
}

.cardContainer {
  border-radius: 8px !important;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .text-h4 {
    font-size: 1.75rem !important;
  }

  .text-h6 {
    font-size: 1.125rem !important;
  }

  .d-flex.justify-space-between {
    flex-direction: column;
    gap: 16px;
  }

  .v-btn {
    width: 100%;
  }
}

/* Style for parent form */
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

.input-card1 {
  border: 1px solid #b0b0b0 !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.disabled-btn {
  background-color: #b0bec5 !important;
  color: #eceff1 !important;
  cursor: not-allowed !important;
}
</style>
