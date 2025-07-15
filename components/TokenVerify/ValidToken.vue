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
          @edit="$emit('edit')"
        />
      </div>
    </v-card-text>
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

  },
  data() {
    return {
      editDialog: false,
      editForm: {},
      menuStart: false,
      menuEnd: false,
      showFields: true,
      loading: false,
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
    gotoEditForm() {
      this.$router.push({
        path: `/program/submission/${this.token}`,
        query: { editForm: "true" },
      });
    },
  },
};
</script>

<style scoped>
.form-card {
  border: 1px solid #b0b0b0 !important;
}
</style>
