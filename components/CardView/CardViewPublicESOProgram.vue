<template>
  <v-card outlined class="px-3 py-2 rounded-xl">
    <div class="d-flex flex-wrap flex-md-nowrap">
      <!--      <p>{{item}}</p>-->
      <div class="mt-1">
        <v-img :src="item.logo" width="120px" height="120px" class="rounded-xl">
        </v-img>
      </div>

      <div class="pl-0 pl-md-3 pr-0 py-0" style="width: 100%">
        <div class="d-flex">
          <v-card-title class="px-0 py-0" style="color: #000000">
            {{ item.name }}</v-card-title
          >
          <v-spacer></v-spacer>
        </div>
        <div class="mb-1">
          <v-chip-group>
            <v-chip color="primary" small>
              {{ item.cohorts?.length }} x Cohorts
            </v-chip>

            <v-chip color="primary" small> Publishing </v-chip>
          </v-chip-group>
        </div>
        <span> {{ item.description }} </span>

        <!--                Cohort List                   -->

        <div v-if="item.cohorts?.length > 0 && isShowingCohort" class="mt-4">
          <v-card
            flat
            v-for="(cohort, index) in item.cohorts"
            :key="index"
            class="rounded-xl py-3 px-3 mb-3 card-cohort"
            elevation="0"
            @click="viewCohortDetail(cohort)"
          >
            <div class="d-flex flex-wrap flex-md-nowrap" style="width: 100%">
              <div>
                <v-img
                  :src="cohort.program_display.image"
                  width="140px"
                  :aspect-ratio="16 / 9"
                  class="rounded-xl mt-1"
                >
                </v-img>
              </div>
              <div class="pl-0 pl-md-3 pr-0 py-0" style="width: 100%">
                <div class="d-flex" style="width: 100%">
                  <v-card-title class="px-0 py-0" style="color: #000000">
                    {{ cohort.program_display.title }}
                  </v-card-title>
                  <v-spacer></v-spacer>
                </div>
                <div class="mb-1">
                  <v-chip-group class="pt-0">
                    <v-chip color="primary" small>
                      <v-icon class="mr-2" small>
                        mdi-calendar-clock-outline
                      </v-icon>
                      {{ cohort.program_display.start_date }}
                      -
                      {{ cohort.program_display.end_date }}
                    </v-chip>

                    <v-chip color="primary" small> Publishing </v-chip>
                  </v-chip-group>
                </div>
                <p v-html="cohort.program_display.description"></p>
              </div>
            </div>
          </v-card>
        </div>

        <div v-if="item.cohorts?.length > 0" class="mt-2">
          <v-btn
            v-if="!isShowingCohort"
            @click="isShowingCohort = !isShowingCohort"
            block
            elevation="0"
            rounded
          >
            <v-icon> mdi-chevron-double-down </v-icon>
            Show Cohort
          </v-btn>
          <!--          <v-btn v-else @click="isShowingCohort = !isShowingCohort" block elevation="0" rounded>-->
          <!--            <v-icon>-->
          <!--              mdi-chevron-double-up-->
          <!--            </v-icon>-->
          <!--            Hide Cohort-->
          <!--          </v-btn>-->
        </div>

        <div v-else class="mt-2">
          <v-btn
            color="primary"
            block
            elevation="0"
            rounded
            @click="handleOpenCreateCohortDialog(item)"
          >
            <v-icon class="mr-2"> mdi-plus </v-icon>
            Add First Cohort
          </v-btn>
        </div>
      </div>
    </div>

    <DialogESOProgramEditInfo
      ref="dialogEditProgramInfo"
      @saved-update="() => {}"
    >
    </DialogESOProgramEditInfo>

    <DialogESOCohortCreate
      ref="dialogCreateCohortInfo"
      @saved-update="() => {}"
    >
    </DialogESOCohortCreate>

    <DialogESOCohortEdit ref="dialogEditCohortInfo" @saved-update="() => {}">
    </DialogESOCohortEdit>
  </v-card>
</template>
<script>
import DialogESOProgramEditInfo from "@/components/dialogs/DialogESOProgramEditInfo.vue";
import DialogESOCohortCreate from "@/components/dialogs/DialogESOCohortCreate";
import DialogESOCohortEdit from "@/components/dialogs/DialogESOCohortEdit";

import { mapActions } from "vuex";

export default {
  name: "CardViewESOProgram",
  components: {
    DialogESOProgramEditInfo,
    DialogESOCohortCreate,
    DialogESOCohortEdit,
  },
  data() {
    return {
      isShowingCohort: false,
      actionMenus: [
        { title: this.$t("edit"), action: 1, icon: "mdi-pencil" },
        { title: this.$t("delete"), action: 2, icon: "mdi-delete" },
      ],
    };
  },
  props: {
    expanded: Boolean,
    to: { type: String, default: "" },
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    esoId() {
      return this.$route.params.esoId;
    },
  },
  mounted() {
    if (this.expanded) {
      this.isShowingCohort = true;
    }
  },
  methods: {
    ...mapActions("eso-program", {
      getProgram: "get",
    }),
    handleOpenEditProgramDialog(item) {
      this.$refs.dialogEditProgramInfo.openForm(item);
    },
    handleOpenCreateCohortDialog(item) {
      this.$refs.dialogCreateCohortInfo.openForm({
        program: item.id,
        eso: this.esoId,
      });
    },
    handleOpenEditCohortDialog(item) {
      this.$refs.dialogEditCohortInfo.openForm({ ...item, eso: this.esoId });
    },
    handleDeleteProgram() {
      this.$swal
        .fire({
          type: "info",
          text: this.$t("startup.page.question.delete"),
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonText: this.$t("dialog.cancel"),
          confirmButtonText: this.$t("dialog.yes"),
          reverseButtons: true,
        })
        .then(({ value }) => {
          if (!value) return;

          let uri = `/api/v1/eso-program/${this.item.id}/`;

          this.$axios
            .delete(uri)
            .then((response) => {
              const _title = this.$t("common.deleted_successful");
              const Toast = this.$swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
              });
              Toast.fire("", _title, "success");
              this.getProgram({ params: { eso: this.esoId } });
            })
            .catch((error) => {
              const _title = this.$t("common.error");
              this.$swal.fire(_title, error.toString(), "error");
            });
        });
    },

    handleDeleteCohort(cohortId) {
      this.$swal
        .fire({
          type: "info",
          text: this.$t("startup.page.question.delete"),
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonText: this.$t("dialog.cancel"),
          confirmButtonText: this.$t("dialog.yes"),
          reverseButtons: true,
        })
        .then(({ value }) => {
          if (!value) return;

          let uri = `/api/v1/eso-cohort/${cohortId}/`;

          this.$axios
            .delete(uri)
            .then((response) => {
              const _title = this.$t("common.deleted_successful");
              const Toast = this.$swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
              });
              Toast.fire("", _title, "success");
              this.getProgram({ params: { eso: this.esoId } });
            })
            .catch((error) => {
              const _title = this.$t("common.error");
              this.$swal.fire(_title, error.toString(), "error");
            });
        });
    },

    viewCohortDetail(cohort) {
      console.log("viewCohortDetail", cohort.program_display.id);

      this.$router.push(`/program/${cohort.program_display.id}`);
      // this.$router.push({path:`/program`, params: {id: cohort.program_display.id}});
      // this.$router.push({path: '/program', params: {id: "278"}});

      // if(cohort?.program_display)  this.$router.push({path: '/program', params: {id: cohort.program_display.id}});
    },
  },
};
</script>
<style lang="scss">
.card-cohort {
  background-color: #f6f6f6 !important;
  //
  //&:hover {
  //  cursor: pointer;
  //}
}
</style>
