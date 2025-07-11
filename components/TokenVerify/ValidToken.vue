<template>
  <v-container class="d-flex justify-center align-center fill-height">
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
          :title="program.title"
          :is_local="program.is_local"
          :category="program.category?.name"
          :program_type="program.program_type?.name"
          :startDate="program.start_date"
          :endDate="program.end_date"
          :address="program.address"
          :status="program.status"
          :applyUrl="program.apply_url"
          :description="program.description"
          :content="program.content"
          :image="program.image"
        />
      </div>
    </v-card-text>

    <!-- Edit Dialog -->
    <v-container>
      <v-dialog v-model="editDialog" max-width="900px">
        <v-card class="pa-8" elevation="0">
          <v-card class="form-card rounded-md" elevation="0">
            <v-card-title class="font-weight-bold text-h5 pb-2 black--text">
              Edit Program Detail
            </v-card-title>
            <v-divider class="mb-4"></v-divider>
            <v-card-text>
              <!-- Form edit  -->
            </v-card-text>
          </v-card>
        </v-card>
      </v-dialog>
    </v-container>
  </v-container>
</template>

<script>
import CardProgramSubmissionDetail from "@/components/CardView/CardProgramSubmissionDetail.vue";
import FormPSEdit from "@/components/Form/ProgramSharing/FormPSEdit.vue";

export default {
  components: { CardProgramSubmissionDetail, FormPSEdit },
  data() {
    return {
      loading: false,
      submitting: false,
      program: {},
      editDialog: false,
      editForm: {
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

  watch: {
    "$route.query.edit"(newVal) {
      if (newVal === "true") {
        this.editDialog = true;
      } else {
        this.editDialog = false;
      }
    },
  },
  mounted() {
    const editMode = this.$route.query.edit === "true";
    if (editMode) {
      this.editDialog = true;
    }
  },
  
  // editProgram() {
  //   this.editForm = { ...this.program };
  //   this.editDialog = true;
  // },
  handleClose() {
    this.editDialog = false;
    this.$router.replace({ path: this.$route.path, query: {} });
  },
};
</script>
<style>
.form-card {
  border: 1px solid #b0b0b0 !important;
}
</style>
