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
      if (!this.token) return this.$toast.error("Missing token");
      try {
        await this.$axios.put(
          `/api/v1/program/submission/${encodeURIComponent(this.token)}/`
        );
        this.$toast.success("Confirmed!");
        setTimeout(() => this.$router.push("/"), 1000);
        await this.fetchProgramSubmission(this.token);
      } catch (err) {
        console.error(err);
        this.$toast.error("Failed to confirm.");
      } finally {
        this.loading = false;
      }
    },
    async handleEditSubmit(updatedForm) {
      // handle saving logic here
      this.program = { ...updatedForm }; // update local data so card updates
      this.editDialog = false; // close the edit dialog
      this.$router.replace({ query: {} });
      // optionally make PUT request here if you want to auto-save
    },
  },
};
</script>
