<template>
  <v-container
    class="d-flex justify-center align-center fill-height"
    style="background-color: transparent"
  >
    <v-card class="pa-6 elevation-3">
      <!-- Title -->
      <v-card-title
        class="text-h4 font-weight-bold primary--text justify-space-between"
      >
        Program Submission Verification
      </v-card-title>
      <v-card-subtitle>
        <div class="text-subtitle-2 black--text">
          Please review the program details below before submitting. You may
          edit any information if needed.
        </div>
      </v-card-subtitle>

      <v-divider class="mb-4"></v-divider>

      <!-- Card Body -->
      <v-card-text>
        <div v-if="loading" class="text-center py-6">
          <v-progress-circular indeterminate color="primary" size="40" />
          <div class="mt-4 grey--text text-subtitle-1">
            Loading program details...
          </div>
        </div>

        <div v-else>
          <!-- Program Detail View -->
          <CardProgramSubmissionDetail
            :programTitle="program.programTitle"
            :email="program.email"
            :phoneNumber="program.phoneNumber"
            :programCoverage="program.programCoverage"
            :programCategory="program.programCategory"
            :programType="program.programType"
            :startDate="program.startDate"
            :endDate="program.endDate"
            :address="program.address"
            :status="program.status"
            :url="program.url"
            :description="program.description"
            :content="program.content"
            :thumbnail="program.thumbnail"
          />
        </div>
        <v-btn block elevation="1" outlined @click="editDialog = true"
          ><v-icon left dark>mdi-pencil</v-icon>Edit</v-btn
        >
      </v-card-text>

      <!-- Card Footer Buttons -->
      <v-divider class="my-2"></v-divider>
      <v-card-actions class="justify-end pt-4">
        <v-btn @click="cancelSubmit" elevation="1">Cancel</v-btn>
        <v-btn
          elevation="1"
          color="primary"
          @click="confirmSubmit"
          :loading="submitting"
        >
          Confirm Submit
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Edit Dialog -->
    <v-container class="pa-8">
      <v-dialog v-model="editDialog" max-width="700px">
        <v-card>
          <v-card-title class="font-weight-bold text-h6">
            Edit Program Detail
          </v-card-title>
          <v-divider></v-divider>
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
  </v-container>
</template>

<script>
import axios from "axios";
import CardProgramSubmissionDetail from "@/components/CardView/CardProgramSubmissionDetail.vue";
import FormPSStep1 from "@/components/Form/ProgramSharing/FormPSStep1.vue";
// const API_BASE = "/public/api/v1/startup-program";

export default {
  components: { CardProgramSubmissionDetail, FormPSStep1 },
  data() {
    return {
      loading: false, // set to false to show content immediately
      submitting: false,
      program: {
        programTitle: "Startup Bootcamp 2025",
        by: "Startup Cambodia",
        date: "2025-07-02",
        programCategory: "Entrepreneurship Education",
        programCoverage: true,
        programType: "Workshop",
        startDate: "2025-08-01",
        endDate: "2025-08-10",
        address: "Phnom Penh, Cambodia",
        status: "Pending",
        url: "https://www.facebook.com/panharanith.heng.1/",
        thumbnail:
          "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra.",
        content:
          "Join us for a 10-day intensive program to kickstart your startup journey.",
      },
      editDialog: false,
      editForm: {
        programTitle: "Startup Bootcamp 2025",
        by: "Startup Cambodia",
        date: "2025-07-02",
        programCategory: "Entrepreneurship Education",
        programCoverage: true,
        programType: "Workshop",
        startDate: "2025-08-01",
        endDate: "2025-08-10",
        address: "Phnom Penh, Cambodia",
        status: "Pending",
        url: "https://www.facebook.com/panharanith.heng.1/",
        thumbnail:
          "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra.",
        content:
          "Join us for a 10-day intensive program to kickstart your startup journey.",
      },
      menuStart: false,
      menuEnd: false,
      programCoverages: true,
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
      programTypes: ["Workshop"],
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
