<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card-text>
      <div>
        <CardProgramSubmissionDetail
          :program="program"
          @confirm-submit="$emit('confirm-submit')"
          @edit="$emit('edit')"
          :loadingbtn="loadingsubmit"
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
    loadingsubmit: {
      type: Boolean,
      default: false,
    },
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
