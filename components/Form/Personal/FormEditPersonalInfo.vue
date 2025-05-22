<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
    persistent
    scrollable
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">{{$t('edit')}}</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-row>
            <v-col cols="12">
              <v-layout justify-center>
                <v-avatar size="110px">
                  <v-img
                    v-if="imageUrl"
                    :src="imageUrl"
                  />
                  <v-img
                    src="/images/default-image.png"
                    alt="Profile"
                    v-else
                  />
                </v-avatar>
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
                name="photo"
                @change="onFilePicked"
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                name="first_name"
                :label="$t('personal.form.label.first_name')"
                v-model="profile.first_name_kh"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                  :label="$t('personal.form.label.last_name')"
                v-model="profile.last_name_kh"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                  :label="$t('personal.form.label.first_name_latin')"
                v-model="profile.first_name"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                  :label="$t('personal.form.label.last_name_latin')"
                v-model="profile.last_name"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                  :label="$t('personal.form.label.email')"
                v-model="profile.email"
                disabled
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="profile.date_of_birth"
                    :label="$t('personal.form.label.dob')"
                    prepend-icon="mdi-calendar"
                    readonly
                    disabled
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="profile.date_of_birth"
                  :active-picker.sync="activePicker"
                  :max="
                        new Date(
                          Date.now() - new Date().getTimezoneOffset() * 60000
                        )
                          .toISOString()
                          .substr(0, 10)
                      "
                  min="1950-01-01"
                  @change="saveDate"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-select
                  :label="$t('personal.form.label.gender')"
                :items="genderOptions"
                item-text="title"
                item-value="value"
                v-model="profile.gender"
              >
              </v-select>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                  :label="$t('personal.form.label.occupation')"
                v-model="profile.occupation"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                  :label="$t('personal.form.label.phone')"
                v-model="profile.phone_number"
                required
              ></v-text-field>
            </v-col>

            <v-col
                cols="12"
            >
              <v-combobox
                  name="expertise"
                  ref="expertise"
                  :items="expertiseList"
                  v-model="profile.skills"
                  :label="$t('skills')"
                  item-text="name"
                  item-value="id"
                  multiple
                  required
                  chips
                  small-chips

              ></v-combobox>
            </v-col>
            <v-col
                cols="12"
            >
              <v-textarea
                  :label="$t('bio')"
                  v-model="profile.bio"
                  rows="3"

              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="dialog = false"
          outlined
        > {{$t('dialog.close')}} </v-btn>
        <v-btn
          @click="save()"
          color="primary"
        > {{$t('dialog.save')}} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
const moment = require("moment");
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "EditPersonalInfoForm",
  props:{
    personalProfile:{type:Object, default:()=>{}}
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    activePicker: null,
    date: null,
    menu: false,
    dialog: false,
    profileImage: null,
    profile: {
      photo: "",
      email: "",
      first_name: "",
      last_name: "",
      date_of_birth: "",
      first_name_kh: "",
      last_name_kh: "",
      phone_number: "",
      occupation: "",
      gender: "",
    },
    selectedOccupation: "",

    genderOptions: [
      { title: "Male", value: "m" },
      { title: "Female", value: "f" },
    ],
    occupationsOptions: [
      "Software Engineer",
      "Data Science",
      "Student",
      "Others",
    ],

    modelConfig: {
      type: "string",
      mask: "YYYY-MM-DD", // Uses 'iso' if missing
    },
    valid: true,
    imageName: "",
    imageUrl: "",
    imageFile: "",
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  computed: {
    // ...mapGetters({
    //   profile: "personalProfile/getProfile",
    // }),
    ...mapState("user", ["isLoading"]),
    ...mapState("expertise", { expertiseList: "dataList" }),
  },
  mounted() {
    this.resetFormUser();
    this.getExpertise();
  },
  methods: {
    ...mapActions("user", ["getCurrentUser", "updateUserProfile"]),
    ...mapActions("expertise", { getExpertise: "get" }),
    moment: function () {
      return moment();
    },
    disabledDate(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return date >= new Date(today.getTime());
    },
    resetFormUser() {
      this.profileImage = null;
      const user = {
        photo: this.personalProfile.photo,
        email: this.personalProfile.email,
        first_name: this.personalProfile.first_name,
        last_name: this.personalProfile.last_name,
        date_of_birth: this.personalProfile.date_of_birth,
        first_name_kh: this.personalProfile.first_name_kh,
        last_name_kh: this.personalProfile.last_name_kh,
        phone_number: this.personalProfile.phone_number,
        gender: this.personalProfile.gender,
        occupation: this.personalProfile.occupation,
      };
      this.formData = Object.assign({}, this.$common.cloneJSON(user));
      // this.getCurrentUser().then((res) => {
      //   const user = {
      //     photo: personalProfile.photo,
      //     email: personalProfile.email,
      //     first_name: personalProfile.first_name,
      //     last_name: personalProfile.last_name,
      //     date_of_birth: personalProfile.date_of_birth,
      //     first_name_kh: personalProfile.first_name_kh,
      //     last_name_kh: personalProfile.last_name_kh,
      //     phone_number: personalProfile.phone_number,
      //     gender: personalProfile.gender,
      //     occupation: personalProfile.occupation,
      //   };
      //   this.formData = Object.assign({}, this.$common.cloneJSON(user));
      // });
    },
    pickFile() {
      this.$refs.image.click();
    },

    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
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
    saveDate(date) {
      this.$refs.menu.save(date);
    },
    save() {
      if (!this.$refs.form.validate()) return;
      // return;
      const formData = new FormData();


      for (var key in this.profile) {
        if (this.profile[key] !== "" && this.profile[key] !== null)
          formData.append(key, this.profile[key]);
      }
      delete formData.delete("skills");

      

      if (this.formData.date_of_birth) {
        formData.append(
          "date_of_birth",
          // moment(this.formData.date_of_birth).format("YYYY-MM-DD")
          this.formData.date_of_birth
        );
      }

      if(this.profile.skills){
        for (let key in this.profile.skills) {
          let obj = this.profile.skills[key];
          formData.append("skills", obj.id);
        }
      }

      const headers = { "Content-Type": "multipart/form-data" };
      if (this.imageFile !== "") {
        formData.append("photo", this.imageFile);
        formData.append("photo_thumbnail", this.imageFile);
      } else {
        delete formData.delete("photo");
        delete formData.delete("photo_thumbnail");
      }

      this.updateUserProfile({ payload: formData, options: { headers } })
        .then((response) => {
          const Toast = this.$swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          Toast.fire("", this.$t("user.profile.save_success"), "success");
          this.$emit("saved-update");
        })
        .catch((error) => {
          const Toast = this.$swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          const message = error.response.data.message || error;
          Toast.fire(this.$t("msg.failed"), message, "error");
        });
    },

    openEdit(item) {
      this.profile = this.$common.cloneJSON(item);
      this.imageUrl = this.profile.photo;
      this.dialog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-picker.profile-image {
  border-radius: 100%;
}
</style>
