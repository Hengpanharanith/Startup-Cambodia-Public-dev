<template>
  <v-dialog
      v-model="dialog"
      width="768"
      persistent
      scrollable
  >
    <v-card rounded="lg">
      <v-card-title flat>
        <span> Program Cohort </span>
        <v-spacer></v-spacer>
        <v-btn
            @click="closeForm"
            tabindex="-1"
            color="primary"
            class="rounded-lg"
            right
            icon
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form
            ref="formProgramInfo"
            id="formProgramInfo"
        >
          <v-card flat>
            <v-card-text>

              <v-row>
                <v-col cols="12">
                  <v-layout justify-center class="pb-3">
                    <div style="width:300px" class="text-center mx-auto">
                      <v-img
                          :src="imageUrl"
                          v-if="imageUrl"
                          :aspect-ratio="16/9"
                          class="rounded-lg"
                      />
                      <v-img
                          v-else
                          src="/images/default-image.png"
                          alt="Profile"
                          :aspect-ratio="16/9"
                          class="rounded-lg"
                      />
                    </div>
                  </v-layout>

                  <v-text-field
                      :label="$t('get_listed.form.label.select_image')"
                      v-model="imageName"
                      @click="pickFile"
                      prepend-icon="mdi-file-image-plus"
                      readonly
                      dense
                  ></v-text-field>

                  <input
                      type="file"
                      style="display: none"
                      ref="image"
                      accept="image/*"
                      name="logo"
                      @change="onFilePicked"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      v-model="programDisplay.title"
                      :label="$t('get_listed.form.label.title')"
                      :rules="$formRules.required"
                      dense
                      outlined
                      ref="name"
                      name="title"
                      required
                      type="text"
                      hide-details
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-menu
                      ref="cohortDateMenu"
                      v-model="menuDateRange"
                      :close-on-content-click="false"
                      :return-value.sync="programDisplay.dates"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-bind="attrs"
                          v-on="on"
                          v-model="dateRangeText"
                          :rules="$formRules.required"
                          label="Start/end Date"
                          append-icon="mdi-calendar"
                          class="required"
                          outlined
                          readonly
                          dense
                          hide-details
                      ></v-text-field>
                    </template>
                    <v-date-picker
                        @change="$refs.cohortDateMenu.save(programDisplay.dates)"
                        v-model="programDisplay.dates"
                        no-title
                        scrollable
                        range
                    >
                    </v-date-picker>
                  </v-menu>
                  <input
                      :value="startDate"
                      type="hidden"
                      name="start_date"
                      id="start_date"
                  />
                  <input
                      :value="endDate"
                      type="hidden"
                      name="end_date"
                      id="start_date"
                  />
                </v-col>


                <v-col cols="12" md="6">
                  <v-autocomplete
                      v-model="programDisplay.program_type"
                      :items="programTypesList"
                      :rules="$formRules.required"
                      class="required"
                      label="Program Type"
                      item-text="name"
                      item-value="id"
                      small-chips
                      dense
                      hide-details
                      outlined
                  ></v-autocomplete>
                  <input
                      v-if="programDisplay.program_type"
                      :value="programDisplay.program_type.id"
                      type="hidden"
                      name="program_type"
                      id="program_type"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-autocomplete
                      v-model="programDisplay.category"
                      :items="programCategoryList"
                      :rules="$formRules.required"
                      class="required"
                      label="Category"
                      item-text="name"
                      item-value="id"
                      small-chips
                      dense
                      hide-details
                      outlined
                  ></v-autocomplete>
                  <input
                      v-if="programDisplay.category"
                      :value="programDisplay.category.id"
                      type="hidden"
                      name="category"
                      id="category"
                  />
                </v-col>

                <v-col
                    cols="12"
                    md="6"
                >
                  <v-text-field
                      dense
                      outlined
                      v-model="programDisplay.apply_url"
                      ref="apply_url"
                      :rules="$formRules.url"
                      required
                      hide-details
                      :label="$t('get_listed.form.label.apply_url')"
                      type="text"
                  ></v-text-field>
                </v-col>


                <v-col
                    cols="12"
                    md="6"
                >
                  <v-text-field
                      dense
                      outlined
                      v-model="programDisplay.website_url"
                      ref="website_url"
                      :rules="$formRules.url"
                      required
                      hide-details
                      :label="$t('get_listed.form.label.website')"
                      type="text"
                  ></v-text-field>
                </v-col>

                <v-col
                    cols="12"
                >
                  <v-text-field
                      dense
                      outlined
                      v-model="programDisplay.address"
                      ref="address"
                      required
                      hide-details
                      :label="$t('get_listed.form.label.address')"
                      type="text"
                  ></v-text-field>
                </v-col>

                <v-col
                    cols="12"
                >
                  <v-textarea
                      v-model="programDisplay.description"
                      :rules="$formRules.required"
                      :label="$t('get_listed.form.label.desc')"
                      name="description"
                      ref="description"
                      dense
                      outlined
                      required
                      type="text"
                      hide-details
                  ></v-textarea>
                </v-col>

                <v-col cols="12">
                  <p class="mb-3">Content</p>
                  <Editor :detail="editorText" :editorInit="editorInit" @editorDetail="editorDetail"/>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            @click="saveForm()"
        >{{ $t('save_change') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import {ValidationProvider, ValidationObserver, extend} from "vee-validate";
import "vue-loading-overlay/dist/vue-loading.css";
import {mapGetters, mapActions, mapMutations, mapState} from "vuex";
import Editor from '@/components/inputs/Editor.vue'

export default {
  name: "DialogesoCohortCreate",
  props: {
    // esoCohort: { type: Object, default: {} },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    Editor
  },
  computed: {
    ...mapState("user", ["currentUser"]),
    ...mapState("industry", {industryList: "dataList"}),
    ...mapState("startup-program-category", { programCategoryList: "dataList" }),
    fullName() {
      const first_name = this.currentUser.first_name || "";
      const last_name = this.currentUser.last_name || "";
      return [first_name, last_name].join(" ").trim() || "-";
    },
    dateRangeText() {
      return this.programDisplay.dates?.sort().join(" to ");
    },
    programTypesList(){
      return [
        {id:1, name: this.$i18n.locale === 'km' ? "កម្មវិធីជាតិ":"National", name_km:"ជាតិ", code: "NTL", description: "National Program"},
        {id:2, name: this.$i18n.locale === 'km'  ? "កម្មវិធីអន្តរជាតិ":"International", name_km:"អន្តរជាតិ", code: "GLO", description: "International Program"},
      ]
    },
    esoId() {
      return this.$route.params.esoId;
    },
  },
  mounted() {
    this.fetchProgramCategory();
  },
  created() {
  },
  data() {
    return {
      editorInit: false,
      editorText: "",
      startDate: '',
      endDate: '',
      menuDateRange: false,
      profileImage: null,
      esoCohort: {
      },
      programDisplay: {
        dates: ['','']
      },
      fullPage: true,
      value: [],
      options: [],
      dialog: false,
      imageName: "",
      imageUrl: "",
      imageFile: "",
      editedItem: {},
    };
  },
  async fetch() {
  },
  methods: {
    ...mapActions("eso-program", {
      getProgram: 'get'
    }),
    ...mapActions("eso-cohort", {
      createCohort : 'create'
    }),
    ...mapActions("startup-program-category", { fetchProgramCategory: "get" }),
    editorDetail(value) {
      this.programDisplay.content = value;
    },
    openForm(item) {
      this.esoCohort = this.$common.cloneJSON(item);
      this.dialog = true;
    },

    pickFile() {
      this.$refs.image.click();
    },

    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        if (files[0].size > 1000000) {
          const Toast = this.$swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          Toast.fire(this.$t("msg.failed"), "File size must be below 1MB", "error");

          return;
        }
        this.imageName = files[0].name;

        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }


        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {

          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });

      } else {

        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    saveForm() {
      this.saveBasicInfo();
    },
    closeForm() {
      this.dialog = false;
    },
    saveBasicInfo() {
      let valid = this.$refs.formProgramInfo.validate();
      if (!valid) return;
      const formData = new FormData();
      formData.append("eso", this.esoCohort.eso)
      formData.append("program", this.esoCohort.program)

      for (var key in this.programDisplay) {
        if (this.programDisplay[`${key}`] !== "" && this.programDisplay[`${key}`] !== null){
          formData.append(`program_display.${key}`, this.programDisplay[key]);
        }
      }

      if (this.imageFile) formData.append("program_display.image", this.imageFile);
      else delete formData.delete("program_display.image");


      formData.append("program_display.start_date", this.programDisplay.dates[0]);
      formData.append("program_display.end_date", this.programDisplay.dates[1]);


      this.createCohort({payload: formData})
          .then((res) => {
            this.$swal.fire(
                `${this.$t("get_listed.dialog.title.success")}!`,
                `${this.$t("get_listed.dialog.title.success.message")}`,
                "success"
            );
            this.$emit("saved-update");
            this.getProgram({params: {eso: this.esoId}})
            this.closeForm();
          })
          .catch((error) => {
            const message = error.message || error;
            const Toast = this.$swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            });
            Toast.fire(this.$t("msg.failed"), message, "error");
          });
    },
  },
};
</script>
<style>
.user-info {
  padding: 0.5rem;
}

.user-info .user-info__name {
  margin-bottom: 0.75rem;
  text-transform: uppercase;
}

.user-info .user-info__text {
  margin-bottom: 0.5rem;
}
</style>
