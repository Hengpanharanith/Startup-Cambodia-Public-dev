<template>
  <div
    class="d-flex justify-center align-center fill-height"
    style="background: #f8f9fa"
  >
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card class="pa-6" elevation="2">
            <v-card-title class="text-h5 font-weight-bold">
              Program Submission Verification
            </v-card-title>
            <v-card-text>
              <div v-if="loading" class="text-center">
                <v-progress-circular indeterminate color="primary" size="40" />
                <div class="mt-4">Loading program details...</div>
              </div>
              <div v-else>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-bold"
                        >Title</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        program.programTitle
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-bold"
                        >Email</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        program.email
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-bold"
                        >Phone Number</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        program.phoneNumber
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-bold"
                        >Coverage</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        program.programCoverage
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-bold"
                        >Category</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        program.programCategory
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-bold"
                        >Type</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        program.programType
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-bold"
                        >Start Date</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        program.startDate
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-bold"
                        >End Date</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        program.endDate
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-bold"
                        >URL</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        program.url
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-bold"
                        >Description</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        program.description
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-bold"
                        >Content</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        program.content
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-img
                  v-if="program.thumbnail"
                  :src="program.thumbnail"
                  max-width="200"
                  class="my-4"
                  contain
                />
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="info" @click="editDialog = true">Edit</v-btn>
              <v-btn
                color="primary"
                @click="confirmSubmit"
                :loading="submitting"
                >Confirm Submit</v-btn
              >
              <v-btn color="error" @click="cancelSubmit">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Edit Dialog -->
      <v-dialog v-model="editDialog" max-width="700px">
        <v-card>
          <v-card-title>Edit Program Detail</v-card-title>
          <v-card-text>
            <FormPSStep1
              :form="editForm"
              :programCoverages="programCoverages"
              :programCategories="programCategories"
              :programTypes="programTypes"
              :menuStart="menuStart"
              :menuEnd="menuEnd"
              @submit="saveEdit"
              @close="editDialog = false"
            />
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import FormPSStep1 from "@/components/Form/ProgramSharing/FormPSStep1.vue";

const API_BASE = "/public/api/v1/startup-program";

export default {
  components: { FormPSStep1 },
  data() {
    return {
      loading: true,
      submitting: false,
      program: {},
      editDialog: false,
      editForm: {},
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
      programTypes: [
        "Workshop",
        "Seminar",
        "Webinar",
        "Bootcamp",
        "Hackathon",
        "Meetup",
        "Conference",
        "Other",
      ],
    };
  },
  async mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const id = this.$route.params.programId;
    try {
      const res = await axios.get(`${API_BASE}/${id}`, { params: { token } });
      this.program = res.data;
      this.editForm = { ...res.data };
    } catch (e) {
      // this.$router.replace("/invalid-token");
    } finally {
      this.loading = false;
    }
  },
  methods: {
    editProgram() {
      this.editForm = { ...this.program };
      this.editDialog = true;
    },
    async saveEdit() {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      const id = this.$route.params.programId;
      try {
        await axios.put(`${API_BASE}/${id}`, this.editForm, {
          params: { token },
        });
        this.program = { ...this.editForm };
        this.editDialog = false;
      } catch (e) {
        alert("Failed to save changes.");
      }
    },
    async confirmSubmit() {
      this.submitting = true;
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      const id = this.$route.params.programId;
      try {
        await axios.post(`${API_BASE}/${id}/verify`, { token });
        alert("Program verified and submitted!");
        this.$router.replace("/success");
      } catch (e) {
        alert("Verification failed.");
      } finally {
        this.submitting = false;
      }
    },
    cancelSubmit() {
      this.$router.replace("/");
    },
  },
};
</script>
