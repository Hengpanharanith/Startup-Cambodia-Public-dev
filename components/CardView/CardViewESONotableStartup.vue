<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-card v-bind="attrs"
              v-on="on" class="card-startup mr-2" rounded="lg" outlined>
        <v-menu :close-on-content-click="false" offset-y rounded="xl" bottom left>
          <template v-slot:activator="{ on : menuOn }">
            <div v-on="menuOn" style="width: 54px"
                 :key="startup.id">
              <v-img :aspect-ratio="1/1" :src="startup.logo"></v-img>
            </div>
          </template>
          <v-sheet class="pb-3 pt-3" style="max-width: 250px">
                        <span class="px-3 text-gray">
                          Action
                        </span>
            <v-divider class="mt-2 mb-4" horizontal></v-divider>
            <v-row class="px-3">

              <v-col cols="12">
                <v-btn elevation="0" block outlined small color="primary"
                       :to="`/ecosystem/discover/category/startup/${startup.id}`">
                  <v-icon class="mr-2" small>
                    mdi-open-in-new
                  </v-icon>
                  {{ $t('detail') }}
                </v-btn>
              </v-col>

              <v-col cols="12" class="pt-0">
                <v-btn elevation="0" block outlined small color="primary" disabled>
                  <v-icon class="mr-2" small>
                    mdi-pencil-box-outline
                  </v-icon>

                  {{ $t('edit') }}

                </v-btn>
              </v-col>

              <v-col cols="12">
                <v-btn color="red" dark small outlined block rounded @click="onDeleteMember">
                  <v-icon class="mr-2" small>
                    mdi-trash-can
                  </v-icon>
                  {{ $t('delete') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-sheet>
        </v-menu>
      </v-card>
    </template>
    <span>{{ startup.name }}</span>
  </v-tooltip>
</template>
<script>
import {mapActions} from "vuex";

export default {
  name: "CardViewESONotableStartup",
  data() {
    return {
      show: false,
    };
  },
  props: {
    cohort: {
      type: Object,
      required: true,
    },
    startup: {
      type: Object,
      required: true,
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
    onDeleteMember() {
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

            let uri = `/api/v1/eso/${this.esoId}/cohorts/${this.cohort.id}/notable-startup/${this.startup.id}`;

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
.card-startup {
  transition: 100ms;

  &:hover {
    transform: scale(1.2);
    transition: 100ms;
    cursor: pointer;
  }
}
</style>

