<template>
  <v-dialog
      v-model="dialog"
      width="768"
      persistent
      scrollable
  >
    <v-card rounded="lg">
      <v-card-title flat>
        <span> Program </span>
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
                    <div style="width:150px" class="text-center mx-auto">
                      <v-img
                          :src="imageUrl"
                          v-if="imageUrl"
                          :aspect-ratio="1/1"
                          width="150px"
                          class="rounded-lg"
                      />
                      <v-img
                          v-else
                          src="/images/default-image.png"
                          alt="Profile"
                          :aspect-ratio="1/1"
                          width="150px"
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
                      v-model="esoProgram.name"
                      :label="$t('get_listed.form.label.name')"
                      :rules="$formRules.required"
                      dense
                      outlined
                      ref="name"
                      name="name"
                      required
                      type="text"
                  ></v-text-field>
                </v-col>

                <v-col
                    cols="12"
                >
                  <v-textarea
                      v-model="esoProgram.description"
                      :rules="$formRules.required"
                      :label="$t('get_listed.form.label.desc')"
                      name="description"
                      ref="description"
                      dense
                      outlined
                      required
                      type="text"
                  ></v-textarea>
                </v-col>

                <v-col
                    cols="12"
                    md="6"
                >
                  <v-text-field
                      dense
                      outlined
                      v-model="esoProgram.website_url"
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
                    md="6"
                >
                  <v-text-field
                      dense
                      outlined
                      v-model="esoProgram.facebook_social_url"
                      ref="facebook_social_url"
                      :rules="$formRules.url"
                      required
                      hide-details
                      :label="$t('get_listed.form.label.facebook_social_url')"
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
                      v-model="esoProgram.linkedin_social_url"
                      ref="linkedin_social_url"
                      :rules="$formRules.url"
                      required
                      hide-details
                      :label="$t('get_listed.form.label.linkedin_social_url')"
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
                      v-model="esoProgram.x_social_url"
                      ref="x_social_url"
                      :rules="$formRules.url"
                      required
                      hide-details
                      :label="$t('get_listed.form.label.x_social_url')"
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
                      v-model="esoProgram.youtube_social_url"
                      ref="youtube_social_url"
                      :rules="$formRules.url"
                      required
                      hide-details
                      :label="$t('get_listed.form.label.youtube_social_url')"
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
                      v-model="esoProgram.telegram_social_url"
                      ref="telegram_social_url"
                      :rules="$formRules.url"
                      required
                      hide-details
                      :label="$t('get_listed.form.label.telegram_social_url')"
                      type="text"
                  ></v-text-field>
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

export default {
  name: "DialogESOProgramCreate",
  props: {
    // esoProgram: { type: Object, default: {} },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    ...mapState("user", ["currentUser"]),
    ...mapState("industry", {industryList: "dataList"}),
    fullName() {
      const first_name = this.currentUser.first_name || "";
      const last_name = this.currentUser.last_name || "";
      return [first_name, last_name].join(" ").trim() || "-";
    },
  },
  mounted() {
  },
  created() {
  },
  data() {
    return {
      profileImage: null,
      esoProgram: {},
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
      createProgram: 'create',
      getProgram: 'get'
    }),
    openForm() {
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
      this.sweetAlertLoading()
      const formData = new FormData(document.getElementById("formProgramInfo"));
      formData.append("eso", this.$route.params.esoId)
      formData.append("name", this.esoProgram.name)
      formData.append("description", this.esoProgram.description)

      formData.append("website_url", this.esoProgram.website_url|| '')
      formData.append("telegram_social_url", this.esoProgram.telegram_social_url|| '')
      formData.append("x_social_url", this.esoProgram.x_social_url|| '')
      formData.append("youtube_social_url", this.esoProgram.youtube_social_url|| '')
      formData.append("linkedin_social_url", this.esoProgram.linkedin_social_url|| '')
      formData.append("facebook_social_url", this.esoProgram.facebook_social_url|| '')
      this.createProgram({payload: formData})
          .then((res) => {
            this.sweetAlertLoadingClose()

            this.getProgram({params: {eso: this.esoId}})
            this.closeForm();
            this.$swal.fire(
                `${this.$t("get_listed.dialog.title.success")}!`,
                `${this.$t("get_listed.dialog.title.success.message")}`,
                "success"
            );
          })
          .catch((error) => {
            this.sweetAlertLoadingClose()

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
