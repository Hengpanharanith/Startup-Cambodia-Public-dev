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
          <v-row v-if="program?.status === 'PENDING_APPROVAL'">
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
                    Submit Again
                  </span>
                </nuxt-link>
              </p>
            </v-col>
          </v-row>
          <!-- Text for Rejected status -->
          <v-row v-if="program?.status === 'REJECTED'">
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
          <v-row v-if="program?.status === 'PENDING_CONFIRM_EMAIL'">
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
          <v-row v-if="program?.status === 'APPROVED'">
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
                <nuxt-link :to="`/program/${program.ref_id}`">
                  <span
                    class="orange--text font-weight-bold"
                    style="text-decoration: underline"
                  >
                    <br />Your Program
                  </span>
                </nuxt-link>

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

          <div class="d-flex justify-space-between mb-6">
            <h2 class="text-h4 font-weight-bold orange--text">
              {{ program?.title }}
            </h2>

            <v-btn
              v-if="program?.status === 'PENDING_CONFIRM_EMAIL'"
              elevation="0"
              outlined
              color="grey-darken-2"
              @click="$emit('edit')"
              class="text-capitalize"
            >
              <v-icon left small>mdi-pencil</v-icon>
              Edit
            </v-btn>
          </div>

          <!-- Thumbnail -->
          <v-img
            v-if="program?.image"
            :src="program?.image"
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
              {{ program?.is_local ? "National" : "International" }}
            </v-chip>
            <v-chip
              color="green"
              text-color="white"
              label
              small
              class="px-3 ml-2"
            >
              {{ program.category?.name }}
            </v-chip>
            <v-chip
              color="green"
              text-color="white"
              label
              small
              class="px-3 ml-2"
            >
              {{ program.program_type?.name }}
            </v-chip>
          </div>
          <div class="mb-6">
            <div class="d-flex align-center mb-3">
              <v-icon class="mr-3" small color="orange"
                >mdi-calendar-range</v-icon
              >
              <span class="text-body-1"
                >{{ program.start_date }} To {{ program.end_date }}</span
              >
            </div>
            <div class="d-flex align-center mb-3">
              <v-icon class="mr-3" small color="orange">mdi-map-marker</v-icon>
              <span class="text-body-1">{{
                program?.address || "Not provided"
              }}</span>
            </div>
            <div class="d-flex align-center mb-3">
              <v-icon class="mr-3" small color="orange"
                >mdi-link-variant</v-icon
              >
              <a
                :href="program?.apply_url"
                target="_blank"
                class="text-body-1 text-decoration-underline primary--text"
                >{{ program.apply_url }}</a
              >
            </div>
          </div>

          <!-- Description and Content -->
          <div class="mb-8">
            <span class="text-h6 orange--text mb-3 font-weight-bold">
              Description
            </span>

            <div v-if="program?.description" v-html="program.description" />
            <span class="text-h6 orange--text mb-3 font-weight-bold">
              Content
            </span>
            <div v-if="program?.content" v-html="program.content" />
          </div>
          <v-divider
            v-if="program?.status === 'PENDING_CONFIRM_EMAIL'"
          ></v-divider>
          <!-- Confirm Submit Button -->
          <v-row class="mt-8">
            <v-col
              cols="12"
              class="d-flex justify-end"
              v-if="program?.status === 'PENDING_CONFIRM_EMAIL'"
            >
              <v-btn
                color="primary"
                class="white--text text-capitalize font-weight-bold px-8 py-3 d-flex"
                large
                elevation="0"
                @click="$emit('confirm-submit')"
              >
                <v-icon left small v-if="!loadingbtn">mdi-check</v-icon>
                <template v-if="loadingbtn">
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
    </v-container>
  </div>
</template>

<script>
export default {
  name: "CardProgramSubmissionDetail",
  props: {
    program: Object,
    loadingbtn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      error: null,
      editForm: false,
    };
  },
  method: {
    gotoEditForm() {
      this.$router.push({
        path: `/program/submission/${this.token}`,
        query: { edit: "true" },
      });
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
.disabled-btn {
  background-color: #b0bec5 !important;
  color: #eceff1 !important;
  cursor: not-allowed !important;
}
</style>
