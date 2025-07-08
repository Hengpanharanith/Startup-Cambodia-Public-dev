<template>
  <div class="cardContainer pa-0" elevation="3">
    <!-- Header Bar with Centered Logo -->
    <v-app-bar
      color="black"
      height="112"
      flat
      dense
      class="justify-center rounded-top-lg"
    >
      <v-container
        class="d-flex justify-center align-center fill-height pa-0 ma-0"
        fluid
      >
        <NuxtLink to="/">
          <v-img
            src="/main/startup-cambodia-logo.svg"
            height="48"
            contain
            alt="Startup Cambodia"
          />
        </NuxtLink>
      </v-container>
    </v-app-bar>

    <!-- Header Text with Illustration -->
    <v-container class="pa-12" style="min-height: 430px">
      <v-row>
        <v-col cols="12" md="9">
          <h2 class="font-weight-bold black--text text-h4 mb-12 mt-2">
            Program Submission Verification
          </h2>

          <!-- Text for Under Review status -->
          <v-row v-if="status === 'under_review'">
            <v-col cols="10" md="10">
              <p
                class="text-body-1 font-weight-regular grey--text text--darken-1 mb-4"
              >
                Your program submission status is
                <strong class="black--text font-weight-bold"
                  >"Under Review"</strong
                >. Please review your program details — you can fill out the
                form and submit again.
              </p>
              <p class="text-body-1 grey--text text--darken-1">
                <span class="font-weight-regular">*Note:</span> Your program is
                currently under review. Our team will verify the details before
                publishing. However, you can start exploring our website in the
                meantime. If any issues are found, we'll notify you to resubmit.
                <nuxt-link to="/">
                  <span
                    style="text-decoration: underline"
                    class="text-underline orange--text font-weight-bold"
                  >
                    Start now
                  </span>
                </nuxt-link>
              </p>
            </v-col>
          </v-row>
          <!-- Text for Rejected status -->
          <v-row v-if="status === 'rejected'">
            <v-col cols="10" md="10">
              <p
                class="text-body-1 font-weight-regular grey--text text--darken-1 mb-4"
              >
                Your program submission status is
                <strong class="red--text font-weight-bold">“Rejected”</strong>.
                Please review your program details — you can fill out the form
                and submit again.
              </p>
              <p class="text-body-1 grey--text text--darken-1">
                <span class="font-weight-regular">*Note:</span> There was a
                problem with the information you provided. Please review your
                details carefully before submitting again.
                <nuxt-link to="/">
                  <span
                    style="text-decoration: underline"
                    class="text-underline orange--text font-weight-bold"
                  >
                    Start again
                  </span>
                </nuxt-link>
              </p>
            </v-col>
          </v-row>
          <!-- Text for Pending Confirm status -->
          <v-row v-if="status === 'pending_confirm'">
            <v-col cols="10" md="10">
              <p
                class="text-body-1 font-weight-regular grey--text text--darken-1 mb-4"
              >
                Your program submission status is
                <strong class="primary--text font-weight-bold"
                  >“Pending Confirmation.” </strong
                >. Please review your program details — you can still make
                edits.
              </p>
              <p class="text-body-1 grey--text text--darken-1">
                <span class="font-weight-regular">*Note:</span>This program will
                remain in pending status until you click

                <span class="orange--text font-weight-bold">
                  CONFIRM SUBMIT
                </span>
                below the program details.
              </p>
            </v-col>
          </v-row>

          <!-- Text for Successfully -->
          <v-row v-if="status === 'success'">
            <v-col cols="10" md="10">
              <p
                class="text-body-1 font-weight-regular grey--text text--darken-1 mb-4"
              >
                Your program submission status is
                <strong class="green--text font-weight-bold"
                  >“Submitted Successfully.”</strong
                >. Please review your program details — you can still make
                edits.
              </p>
              <p class="text-body-1 grey--text text--darken-1">
                <span class="font-weight-regular">*Note:</span>Your program has
                been submitted successfully and is now published. Please click
                <a href="https://startupcambodia.gov.kh/program/428">
                  <span
                    class="orange--text font-weight-bold"
                    style="text-decoration: underline"
                  >
                    Your Program
                  </span>
                </a>
                to view it in the program list.
              </p>
            </v-col>
          </v-row>
        </v-col>

        <!-- Illustration Column -->
        <v-col cols="12" md="3" class="text-right">
          <v-img
            src="/images/programsharing/preview-img.svg"
            height="280"
            width="280"
            contain
            alt="People illustration"
            class="mx-auto"
          />
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="mt-8">
        <v-col cols="12" md="12">
          <!-- Title + Edit Button -->
          <div class="d-flex align-center justify-space-between mb-6">
            <h2 class="text-h4 font-weight-bold orange--text">Program Title</h2>
            <nuxt-link
              :to="{
                path: '/programsharing/ProgramSubmitVerify',
                query: { edit: true },
              }"
            >
              <v-btn
                elevation="0"
                outlined
                color="grey-darken-2"
                @click="$emit('open-edit', editForm)"
                class="text-capitalize"
              >
                <v-icon left small>mdi-pencil</v-icon>
                Edit
              </v-btn>
            </nuxt-link>
          </div>

          <!-- Thumbnail -->
          <v-img
            v-if="thumbnail"
            :src="thumbnail"
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
          </div>

          <div class="mb-6 d-flex flex-wrap">
            <v-chip color="orange" text-color="white" label small class="px-3">
              {{
                programCoverage === true
                  ? "International"
                  : programCoverage === false
                  ? "National"
                  : programCoverage
              }}
            </v-chip>
            <v-chip
              color="green"
              text-color="white"
              label
              small
              class="px-3 ml-2"
            >
              {{ programCategory }}
            </v-chip>
            <v-chip
              color="green"
              text-color="white"
              label
              small
              class="px-3 ml-2"
            >
              {{ programType }}
            </v-chip>
          </div>
          <div class="mb-6">
            <div class="d-flex align-center mb-3">
              <v-icon class="mr-3" small color="orange"
                >mdi-calendar-range</v-icon
              >
              <span class="text-body-1">{{ startDate }} To {{ endDate }}</span>
            </div>
            <div class="d-flex align-center mb-3">
              <v-icon class="mr-3" small color="orange">mdi-map-marker</v-icon>
              <span class="text-body-1">{{ address }}</span>
            </div>
            <div class="d-flex align-center mb-3">
              <v-icon class="mr-3" small color="orange"
                >mdi-link-variant</v-icon
              >
              <a
                :href="url"
                target="_blank"
                class="text-body-1 text-decoration-none grey--text text--darken-2"
                >{{ url }}</a
              >
            </div>
          </div>

          <!-- Description and Content -->
          <div class="mb-8">
            <span class="text-h6 orange--text mb-3 font-weight-bold">
              Description:
            </span>

            <div
              class="text-body-1 grey--text text--darken-2 mb-6 line-height-1-6"
            >
              {{ description }}
            </div>

            <span class="text-h6 orange--text mb-3 font-weight-bold">
              Content:
            </span>
            <div class="text-body-1 grey--text text--darken-2 line-height-1-6">
              {{ content }}
            </div>
          </div>
          <v-divider></v-divider>
          <!-- Confirm Submit Button -->
          <v-row class="mt-8">
            <v-col cols="12" class="d-flex justify-end">
              <v-btn
                color="primary"
                class="white--text text-capitalize font-weight-bold px-8 py-3 d-flex"
                large
                elevation="0"
              >
                CONFIRM SUBMIT
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!-- Program Info Section -->
  </div>
</template>

<script>
export default {
  name: "CardProgramSubmissionDetail",
  props: {
    programTitle: String,
    email: String,
    phoneNumber: String,
    programCoverage: [String, Boolean],
    programCategory: String,
    programType: String,
    startDate: {
      type: String,
      default: "2025-08-01",
    },
    endDate: {
      type: String,
      default: "2025-08-10",
    },
    address: {
      type: String,
      default: "2 College Ave W, Stephen Riady Centre Singapore 138607",
    },
    status: String,
    url: {
      type: String,
      default: "your-url.com",
    },
    description: {
      type: String,
      default:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra.",
    },
    content: String,
    thumbnail: String,
  },
  data() {
    return {
      editDialog: false,
    };
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
  align-items: center;
  justify-content: center;
  border: 2px dashed #ddd;
}

.speaker-list {
  list-style: none;
  padding: 0;
}

.speaker-list li {
  position: relative;
  padding-left: 16px;
}

.speaker-list li:before {
  content: "•";
  color: #ff9800;
  font-weight: bold;
  position: absolute;
  left: 0;
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
.rounded-top-lg {
  border-radius: 12px 12px 0 0 !important;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .text-h4 {
    font-size: 1.75rem !important;
  }

  .text-h6 {
    font-size: 1.125rem !important;
  }
}
</style>
