<template>
  <div
    class="d-flex justify-center align-center fill-height"
    style="
      background-image: url('https://startupcambodia.gov.kh/images/about/pattern.svg');
      background-position: center center;
      background-repeat: repeat;
    "
  >
    <v-container class="d-flex justify-center align-center fill-height">
      <div v-if="loading" class="text-center py-6">
        <v-progress-circular indeterminate color="primary" size="40" />
        <div class="mt-4 grey--text text-subtitle-1">
          Loading program details...
        </div>
      </div>

      <ValidToken
        v-else-if="!isInvalid"
        :program="program"
        :token="token"
        :edit="editMode"
        @confirm-submit="handleConfirmSubmit"
        @submit-edit="handleEditSubmit"
      />

      <InvalidToken v-if="isInvalid" />
    </v-container>

    <!-- Vuetify Snackbar for notifications -->
    <v-snackbar
      v-model="snackbar.show"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      bottom
      right
    >
      {{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import InvalidToken from "~/components/TokenVerify/InvalidToken.vue";
import ValidToken from "~/components/TokenVerify/ValidToken.vue";

export default {
  name: "submission",
  layout: "blank",
  components: {
    InvalidToken,
    ValidToken,
  },
  data() {
    return {
      token: null,
      loading: false,
      isInvalid: false,
      program: {
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
      },
      snackbar: {
        show: false,
        message: "",
        color: "success",
        timeout: 3000,
      },
    };
  },
  computed: {
    editMode() {
      return this.$route.query.edit === "true";
    },
  },
  async mounted() {
    this.token = this.$route.params.token || this.$route.query.token;
    if (this.token) {
      await this.fetchProgramSubmission(this.token);
    }
  },
  methods: {
    showSnackbar(message, color = "success", timeout = 1500) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.timeout = timeout;
      this.snackbar.show = true;
    },
    async fetchProgramSubmission(token) {
      this.loading = true;
      try {
        const res = await this.$axios.get(
          `/api/v1/program/submission/${encodeURIComponent(token)}`
        );
        if (res?.data?.status === true && res.data.data) {
          this.program = res.data.data;
          this.isInvalid = false;
        } else {
          this.isInvalid = true;
        }
      } catch (error) {
        console.error("Fetch failed:", error);
        this.isInvalid = true;
      } finally {
        this.loading = false;
      }
    },
    async handleConfirmSubmit() {
      this.loading = true;
      if (!this.token) {
        this.showSnackbar("Missing token", "error");
        this.loading = false;
        return;
      }
      try {
        await this.$axios.put(
          `/api/v1/program/submission/${encodeURIComponent(this.token)}/`
        );
        this.showSnackbar("Confirmed!", "success");
        setTimeout(() => this.$router.push("/"), 1500);
        await this.fetchProgramSubmission(this.token);
      } catch (err) {
        console.error(err);
        this.showSnackbar("Failed to confirm.", "error");
      } finally {
        this.loading = false;
      }
    },
    async handleEditSubmit(updatedForm) {
      this.program = { ...updatedForm };
      this.editDialog = false; // assuming you have this; if not, remove or handle accordingly
      this.$router.replace({ query: {} });
      this.showSnackbar("Changes saved.", "success");
      // Optional: make a PUT request here to save changes automatically if needed
    },
  },
};
</script>
