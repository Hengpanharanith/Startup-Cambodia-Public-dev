<template>
  <div
    class="d-flex justify-center align-center fill-height"
    style="
      background-image: url('https://startupcambodia.gov.kh/images/about/pattern.svg');
      background-position: center center;
      background-repeat: repeat;
    "
  >
    <v-container>
      <div v-if="loading" class="text-center py-6">
        <v-progress-circular indeterminate color="primary" size="40" />
        <div class="mt-4 grey--text text-subtitle-1">
          Loading program details...
        </div>
      </div>
      <ValidToken v-if="!isInvalid && !loading" :program="program" />
      <InvalidToken v-if="isInvalid" />
    </v-container>
  </div>
</template>

<script>
import InvalidToken from "@/components/TokenVerify/InvalidToken.vue";
import ValidToken from "../../components/TokenVerify/ValidToken.vue";

export default {
  name: "submission",
  layout: "blank", // Nuxt 2 specific
  components: {
    InvalidToken,
    ValidToken,
  },

  data() {
    return {
      loading: false,
      isInvalid: false, // true = token invalid, false = token valid
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

  async mounted() {
    const token = this.$route.params.token || this.$route.query.token;
    console.log("Token:", token);
    if (token) {
      await this.fetchProgramSubmission(token);
    }
  },
  methods: {
    async fetchProgramSubmission(token) {
      this.loading = true;
      try {
        const res = await this.$axios.get(
          `/api/v1/program/submission/${encodeURIComponent(token)}`
        );
        console.log("API response:", res.data);

        if (res && res.data && res.data.status === true && res.data.data) {
          this.program = res.data.data;
          this.isInvalid = false;
        } else {
          this.isInvalid = true;
        }
      } catch (error) {
        console.error("Failed to fetch program data:", error);
        this.isInvalid = true;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
