<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card-text>
      <div v-if="loading" class="text-center py-6">
        <v-progress-circular indeterminate color="primary" size="40" />
        <div class="mt-4 grey--text text-subtitle-1">
          Loading program details...
        </div>
      </div>

      <div v-else>
        <CardProgramSubmissionDetail
          :program="program"
          @confirm-submit="$emit('confirm-submit')"
          @edit="gotoEditForm"
        />
      </div>
    </v-card-text>

    <!-- Edit Form Dialog -->
    <v-container>
      <v-dialog v-model="editDialog" max-width="900px">
        <v-card class="pa-8" elevation="0">
          <v-card class="form-card rounded-md" elevation="0">
            <v-card-text>
              <FormPSEdit
                :form.sync="editForm"
                :programTypes="programTypes"
                :programCategories="programCategories"
                :programCoverages="programCoverages"
                :loadingProgramTypes="loadingProgramTypes"
                :loadingProgramCategories="loadingProgramCategories"
                :menuStart.sync="menuStart"
                :menuEnd.sync="menuEnd"
                :showFields="showFields"
                @submit="handleEditSubmit"
                @close="handleClose"
              />
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
  props: {
    program: Object,
    token: String,
    edit: Boolean,
  },
  data() {
    return {
      editDialog: false,
      editForm: {},
      menuStart: false,
      menuEnd: false,
      showFields: true,
      loading: false,
      submitting: false,
      programTypes: [],
      programCategories: [],
      programCoverages: [],
      loadingProgramTypes: false,
      loadingProgramCategories: false,
    };
  },
  watch: {
    edit(val) {
      if (val) {
        this.openEditDialog();
      } else {
        this.editDialog = false;
      }
    },
  },
  mounted() {
    if (this.edit) {
      this.openEditDialog();
    }
  },
  methods: {
    openEditDialog() {
      this.editForm = { ...this.program };
      this.editDialog = true;
    },
    handleClose() {
      this.editDialog = false;
      this.$router.replace({ path: this.$route.path, query: {} });
    },
    gotoEditForm() {
      this.$router.push({
        path: `/program/submission/${this.token}`,
        query: { edit: "true" },
      });
    },
    handleEditSubmit(editedData) {
      this.program = { ...editedData };
      this.editDialog = false;
      this.$router.replace({ path: this.$route.path, query: {} });
      this.$toast.success("Program details updated!");
    },
  },
};
</script>

<style scoped>
.form-card {
  border: 1px solid #b0b0b0 !important;
}
</style>
