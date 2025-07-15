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
        @edit="handleEditForm"
        @confirm-submit="handleConfirmSubmit"
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
    <v-dialog v-model="editDialog" max-width="900px">
      <v-card class="pa-8" elevation="0">
        <v-card class="form-card rounded-md" elevation="0">
          <v-card-text>
            <FormPSEdit
              ref="formEdit"
              :form.sync="editForm"
              :programTypes="programTypes"
              :programCategories="programCategories"
              :programCoverages="programCoverages"
              :loadingProgramTypes="loadingProgramTypes"
              :loadingProgramCategories="loadingProgramCategories"
              :menuStart.sync="menuStart"
              :menuEnd.sync="menuEnd"
              :showFields="showFields"
              @submit-edit="handleConfirmEdit"
              @close="handleClose"
            />
          </v-card-text>
        </v-card>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import InvalidToken from "~/components/TokenVerify/InvalidToken.vue";
import ValidToken from "~/components/TokenVerify/ValidToken.vue";
import FormPSEdit from "~/components/Form/ProgramSharing/FormPSEdit.vue";
export default {
  name: "submission",
  layout: "blank",
  components: {
    InvalidToken,
    ValidToken,
    FormPSEdit,
  },
  data() {
    return {
      editDialog: false,
      editForm: {},
      token: null,
      image: null,
      loading: false,
      isInvalid: false,
      menuStart: false,
      menuEnd: false,
      showFields: false,
      programTypes: [],
      programCategories: [],
      programCoverages: [
        { label: "National", value: true },
        { label: "International", value: false },
      ],
      loadingProgramTypes: false,
      loadingProgramCategories: false,
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
  watch: {
    editDialog(val) {
      if (!val) {
        this.$router.replace({ query: {} }); // remove ?edit=true
      }
    },
    "$route.query.edit"(newVal) {
      this.editDialog = newVal === "true";
    },
  },
  async mounted() {
    this.fetchProgramTypes(),
      this.fetchProgramCategories(),
      (this.token = this.$route.params.token || this.$route.query.token);
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
    async fetchProgramTypes() {
      this.loadingProgramTypes = true;
      try {
        const res = await this.$axios.get(
          "public/api/v1/startup-program-type/"
        );

        this.programTypes = res.data.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
      } catch (error) {
        console.error("Failed to fetch program types:", error);
      } finally {
        this.loadingProgramTypes = false;
      }
    },
    async fetchProgramCategories() {
      this.loadingProgramCategories = true;
      try {
        const res = await this.$axios.get(
          "public/api/v1/startup-program-category/"
        );

        this.programCategories = res.data.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
      } catch (error) {
        console.error("Failed to fetch program types:", error);
      } finally {
        this.loadingProgramCategories = false;
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
        const formData = new FormData();
        for (const [key, value] of Object.entries(this.editForm)) {
          if (key === "program_type" || key === "category") {
            formData.append(key, value?.value ?? value ?? "");
          } else if (key !== "image" && key !== "imageFile") {
            formData.append(key, value ?? "");
          }
        }
        if (this.editForm.imageFile) {
          formData.append("image", this.editForm.imageFile);
        }
        await this.$axios.put(
          `/api/v1/program/submission/${encodeURIComponent(this.token)}/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        this.showSnackbar("Confirmed!", "success");

        setTimeout(() => this.$router.push("/"), 1500);
        await this.fetchProgramSubmission(this.token);
      } catch (err) {
        console.error("Error response data:", err.response?.data);
        this.showSnackbar("Failed to confirm.", "error");
      } finally {
        this.loading = false;
      }
    },
    handleEditForm() {
      // Populate editForm with current program data,
      // but do NOT copy the image file here, just the URL if needed for preview
      this.editForm = {
        ...this.program,
        program_type:
          this.programTypes.find(
            (item) =>
              item.id === this.program.program_type?.id ||
              item.value === this.program.program_type?.id
          ) ?? null,

        category:
          this.programCategories.find(
            (item) =>
              item.id === this.program.category?.id ||
              item.value === this.program.category?.id
          ) ?? null,

        is_local: this.program.is_local ?? null,

        // For the file input, keep a separate field for selected file, initially null
        imageFile: null,
      };

      this.editDialog = true;
      this.$router.replace({ query: { edit: "true" } });

      this.$nextTick(() => {
        this.$refs.formEdit?.$refs?.observer?.validate();
      });
    },

    handleConfirmEdit() {
      const programType = this.editForm.program_type;
      const category = this.editForm.category;

      this.program = {
        ...this.editForm,
        program_type:
          typeof programType === "object" && programType !== null
            ? programType
            : this.programTypes.find(
                (item) => item.value === programType || item.id === programType
              ) ?? null,

        category:
          typeof category === "object" && category !== null
            ? category
            : this.programCategories.find(
                (item) => item.value === category || item.id === category
              ) ?? null,
        // Preserve original image URL if no new file selected,
        // otherwise do not overwrite image URL here
        image: this.editForm.imageFile
          ? this.program.image
          : this.editForm.image,
      };

      console.log("Normalized program:", this.program);
      this.showSnackbar("Changes saved", "success", 1500);
      this.editDialog = false;
      this.$router.replace({ query: {} });
    },

    handleClose() {
      this.editDialog = false;
      this.$router.replace({ query: {} });
    },
  },
};
</script>
