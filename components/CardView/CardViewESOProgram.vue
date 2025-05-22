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
          <v-card-title class="px-0 py-0" style="color: #000000"> {{ item.name }}</v-card-title>
          <v-spacer></v-spacer>
          <div>
            <v-menu :close-on-content-click="false" offset-x offset-y rounded="lg" bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    text
                    icon
                    v-bind="attrs"
                    v-on="on"
                >
                  <v-icon>
                    mdi-dots-horizontal
                  </v-icon>
                </v-btn>
              </template>
              <v-sheet class="py-3" style="max-width: 250px">
                <span class="px-3 text-grey">
                  {{$t('action')}}
                </span>
                <v-divider class="mt-2 mb-4" horizontal></v-divider>
                <v-row class="px-3">

                  <v-col cols="12">
                    <v-btn small elevation="0" block color="primary" outlined>
                      <v-icon class="mr-2" small>
                        mdi-open-in-new
                      </v-icon>
                      {{$t('detail')}}
                    </v-btn>
                  </v-col>

                  <v-col cols="12" class="pt-0">
                    <v-btn small elevation="0" color="primary" outlined block
                           @click="handleOpenEditProgramDialog(item)">
                      <v-icon class="mr-2" small>
                        mdi-pencil-box-outline
                      </v-icon>
                      {{$t('edit')}}
                    </v-btn>
                  </v-col>

                  <v-col cols="12" class="pt-0">
                    <v-btn small elevation="0" color="primary" outlined block
                           @click="handleOpenCreateCohortDialog(item)">
                      <v-icon class="mr-2" small>
                        mdi-plus
                      </v-icon>
                      {{$t('eso_profile.add_new_cohort')}}
                    </v-btn>
                  </v-col>

                  <v-col cols="12">
                    <v-btn color="red" small dark outlined block rounded @click="handleDeleteProgram">
                      <v-icon class="mr-2" small>
                        mdi-trash-can
                      </v-icon>
                      {{$t('delete')}}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-menu>
          </div>
        </div>
        <div class="mb-1">
          <v-chip-group>
            <v-chip color="primary" small>
              {{ item.cohorts?.length }} x Cohorts
            </v-chip>

            <v-chip color="primary" small class="text-uppercase">
              {{$t('publishing')}}
            </v-chip>
          </v-chip-group>
        </div>
        <span> {{ item.description }} </span>

        <!--                Cohort List                   -->

        <div v-if="item.cohorts?.length > 0 && isShowingCohort" class="mt-4">
          <v-card
              flat v-for="(cohort, index) in item.cohorts" :key="index"
              class="rounded-xl py-3 px-3 mb-3 card-cohort" elevation="0"
          >
            <div class="d-flex flex-wrap flex-md-nowrap" style="width: 100%">
              <div>
                <v-img :src="cohort.program_display.image" width="140px" :aspect-ratio="16/9" class="rounded-lg mt-1">
                </v-img>
              </div>
              <div class="pl-0 pl-md-3 pr-0 py-0" style="width: 100%">
                <div class="d-flex" style="width: 100%">
                  <v-card-title class="px-0 py-0" style="color: #000000"> {{
                      cohort.program_display.title
                    }}
                  </v-card-title>
                  <v-spacer></v-spacer>

                  <div>
                    <v-menu :close-on-content-click="false" offset-x offset-y rounded="xl" bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            text
                            icon
                            v-bind="attrs"
                            v-on="on"
                        >
                          <v-icon>
                            mdi-dots-horizontal
                          </v-icon>
                        </v-btn>
                      </template>
                      <v-sheet class="pb-3 pt-3" style="max-width: 250px">
                        <span class="px-3 text-gray">
                         {{$t('action')}}
                        </span>
                        <v-divider class="mt-2 mb-4" horizontal></v-divider>
                        <v-row class="px-3">

                          <v-col cols="12">
                            <v-btn elevation="0" block outlined small color="primary">
                              <v-icon class="mr-2" small>
                                mdi-open-in-new
                              </v-icon>
                              {{$t('detail')}}
                            </v-btn>
                          </v-col>

                          <v-col cols="12" class="pt-0">
                            <v-btn elevation="0" block outlined small color="primary"
                                   @click="handleOpenEditCohortDialog({...cohort, program: item?.id})">
                              <v-icon class="mr-2" small>
                                mdi-pencil-box-outline
                              </v-icon>
                              {{$t('edit')}}
                            </v-btn>
                          </v-col>

                          <v-col cols="12" class="pt-0">

                            <v-btn elevation="0" block outlined small color="primary"
                                   @click="handleOpenESOStartupInvitation(cohort)">
                              <v-icon class="mr-2" small>
                                mdi-star-plus
                              </v-icon>
                              {{$t('eso_profile.invite_notable_startup')}}
                            </v-btn>
                          </v-col>

                          <v-col cols="12">
                            <v-btn color="red" dark small outlined block rounded @click="handleDeleteCohort(cohort.id)">
                              <v-icon class="mr-2" small>
                                mdi-trash-can
                              </v-icon>
                              {{$t('delete')}}
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-sheet>
                    </v-menu>
                  </div>
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

                    <v-chip v-if="getMinutesDifference(cohort?.program_display?.logic_published_date) === 0"
                            color="primary" small class="text-uppercase">
                      {{$t('publishing')}}
                    </v-chip>
                    <v-chip v-else color="primary" small outlined>
                      Publishing in {{getMinutesDifference(cohort?.program_display?.logic_published_date)}} minutes
                    </v-chip>

                  </v-chip-group>
                </div>
                <p v-html="cohort.program_display.description"></p>

                <p class="mb-1">{{$t('eso_profile.notable_startup')}}</p>

                <div class="d-flex flex-wrap flex-md-nowrap" style="width: 100%">
                  <CardViewESONotableStartup
                      :startup="startup" v-for="startup in cohort.notable_startups"
                      :key="startup.id"
                      :cohort="cohort"
                  />
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs"
                             v-on="on"Notable Startup Invitation
                             color="primary"
                             outlined
                             icon
                             x-large
                             elevation="0"
                             @click="handleOpenESOStartupInvitation(cohort)">
                        <v-icon>
                          mdi-plus
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>
                      {{$t('eso_profile.invite_notable_startup')}}
                    </span>
                  </v-tooltip>
                </div>
              </div>
            </div>

          </v-card>
        </div>

        <div v-if="item.cohorts?.length > 0" class="mt-2">
          <v-btn v-if="!isShowingCohort" @click="isShowingCohort = !isShowingCohort" block outlined elevation="0" rounded>
            <v-icon>
              mdi-chevron-double-down
            </v-icon>
            {{$t('eso_profile.show_cohort')}}
          </v-btn>
          <!--          <v-btn v-else @click="isShowingCohort = !isShowingCohort" block elevation="0" rounded>-->
          <!--            <v-icon>-->
          <!--              mdi-chevron-double-up-->
          <!--            </v-icon>-->
          <!--            Hide Cohort-->
          <!--          </v-btn>-->
        </div>

        <div v-else class="mt-2">
          <v-btn color="primary" block elevation="0" rounded @click="handleOpenCreateCohortDialog(item)">
            <v-icon class="mr-2">
              mdi-plus
            </v-icon>
            Add First Cohort
          </v-btn>
        </div>
      </div>
    </div>

    <DialogESOProgramEditInfo
        ref="dialogEditProgramInfo"
        @saved-update="()=>{}">
    </DialogESOProgramEditInfo>

    <DialogESOCohortCreate
        ref="dialogCreateCohortInfo"
        @saved-update="()=>{}">
    </DialogESOCohortCreate>

    <DialogESOCohortEdit
        ref="dialogEditCohortInfo"
        @saved-update="()=>{}">
    </DialogESOCohortEdit>

    <DialogESOStartupInvitation
        ref="dialogEditStartupInvitation"
        :stakeholder-id="esoId"
    />
  </v-card>
</template>
<script>
import DialogESOProgramEditInfo from "@/components/dialogs/DialogESOProgramEditInfo.vue";
import DialogESOCohortCreate from "@/components/dialogs/DialogESOCohortCreate"
import DialogESOCohortEdit from "@/components/dialogs/DialogESOCohortEdit"

import {mapActions} from "vuex";

export default {
  name: "CardViewESOProgram",
  components: {DialogESOProgramEditInfo, DialogESOCohortCreate, DialogESOCohortEdit},
  data() {
    return {
      menu: false,
      isShowingCohort: false,
      dialogInvitation: false,
      actionMenus: [
        {title: this.$t("edit"), action: 1, icon: "mdi-pencil"},
        {title: this.$t("delete"), action: 2, icon: "mdi-delete"},
      ],
    };
  },
  props: {
    to: {type: String, default: ""},
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    esoId() {
      return this.$route.params.esoId;
    },
  },
  mounted() {
  },
  methods: {
    ...mapActions("eso-program", {
      'getProgram': 'get'
    }),
    getMinutesDifference(timestamp) {
      const givenTime = new Date(timestamp);
      const currentTime = new Date();
      const gap =  givenTime - currentTime
      if (gap <= 0) return 0
      return Math.floor(gap / 60000);
    },
    handleOpenEditProgramDialog(item) {
      this.$refs.dialogEditProgramInfo.openForm(item);
    },
    handleOpenCreateCohortDialog(item) {
      this.$refs.dialogCreateCohortInfo.openForm({program: item.id, eso: this.esoId});
    },
    handleOpenEditCohortDialog(item) {
      this.$refs.dialogEditCohortInfo.openForm({...item, eso: this.esoId});
    },
    handleOpenESOStartupInvitation(item) {
      this.$refs.dialogEditStartupInvitation.openForm(item)
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
          .then(({value}) => {
            if (!value) return;

            let uri = `/api/v1/eso-program/${this.item.id}/`;

            this.$axios
                .delete(uri)
                .then((response) => {
                  const _title = this.$t("common.deleted_successful");
                  const Toast = this.$swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                  });
                  Toast.fire("", _title, "success");
                  this.getProgram({params: {eso: this.esoId}})
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
          .then(({value}) => {
            if (!value) return;

            let uri = `/api/v1/eso-cohort/${cohortId}/`;

            this.$axios
                .delete(uri)
                .then((response) => {
                  const _title = this.$t("common.deleted_successful");
                  const Toast = this.$swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                  });
                  Toast.fire("", _title, "success");
                  this.getProgram({params: {eso: this.esoId}})
                })
                .catch((error) => {
                  const _title = this.$t("common.error");
                  this.$swal.fire(_title, error.toString(), "error");
                });
          });
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

