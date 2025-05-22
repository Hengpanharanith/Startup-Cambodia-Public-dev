<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="800px"
    scrollable
  >
    <v-card rounded="lg">
      <v-card-title class="text-h5">{{$t('route.user-profile-mentor')}} <v-spacer></v-spacer>
        <v-btn
          @click="dialog = false"
          class="rounded-lg"
          color="primary"
          tabindex="-1"
          icon
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form
          ref="form"
          id="form"
          v-model="valid"
          lazy-validation
        >

          <v-row>
            <v-col cols="12">
              <v-layout column>
                <v-avatar
                  size="110"
                  class="align-self-center my-4"
                >
                  <v-img
                    :src="imageUrl"
                    v-if="imageUrl"
                  />
                  <img
                    src="/images/default-image.png"
                    alt="Profile"
                    v-else
                  />
                </v-avatar>

                <v-text-field
                  v-model="imageName"
                  @click="pickFile"
                  :label="$t('get_listed.form.label.select_image')"
                  prepend-icon="mdi-file-image-plus"
                  readonly
                  dense
                ></v-text-field>

                <input
                  type="file"
                  style="display: none"
                  ref="image"
                  accept="image/*"
                  name="profile"
                  @change="onFilePicked"
                />
              </v-layout>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="mentorProfile.first_name_kh"
                name="first_name_kh"
                label="First Name"
                outlined
                dense
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="mentorProfile.last_name_kh"
                name="last_name_kh"
                label="Last Name"
                outlined
                dense
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="mentorProfile.first_name"
                name="first_name"
                label="First Name (Latin)"
                outlined
                dense
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="mentorProfile.last_name"
                name="last_name"
                label="Last Name (Latin)"
                outlined
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="mentorProfile.email"
                name="email"
                label="Email"
                outlined
                dense
                disabled
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-autocomplete
                :label="$t('get_listed.form.label.country_code')"
                :items="countries"
                :rules="$formRules.selectRequired"
                v-model="mentorProfile.country_code"
                name="country_code"
                item-text="name_dial_code"
                item-value="dial_code"
                ref="country_code"
                required
                outlined
                dense
              >
                <template
                  slot="item"
                  slot-scope="data"
                >
                  <!-- HTML that describe how select should render items when the select is open -->
                  {{ data.item.name }}
                  {{ data.item.dial_code }}
                </template>
                <template
                  slot="selection"
                  slot-scope="data"
                >
                  <!-- HTML that describe how select should render selected items -->
                  {{ data.item.dial_code }}
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="8">
              <v-text-field
                v-model="mentorProfile.phone"
                name="phone"
                label="Phone Number"
                outlined
                dense
              >

              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="mentorProfile.bio"
                clearable
                no-resize
                name="bio"
                clear-icon="mdi-close-circle"
                label="Bio"
                rows="2"
                row-height="20"
                outlined
                dense
              ></v-textarea>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="mentorProfile.company"
                name="company"
                label="Company"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="mentorProfile.role"
                name="role"
                label="Role"
                outlined
                dense
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="mentorProfile.language_speak"
                name="language_speak"
                label="Spoken Languages"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="mentorProfile.interest"
                name="interest"
                label="Interests"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                name="fb_social_url"
                :label="$t('get_listed.form.label.fb_url')"
                v-model="mentorProfile.fb_social_url"
                :rules="$formRules.url"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                name="linkedin_url"
                :label="$t('get_listed.form.label.linkedin_url')"
                v-model="mentorProfile.linkedin_social_url"
                :rules="$formRules.url"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-combobox
                name="industry"
                ref="industry"
                :items="industryList"
                v-model="mentorProfile.industry"
                :rules="$formRules.selectRequiredMin"
                :label="$t('get_listed.form.label.industry')"
                class="input-group--focused"
                item-text="name"
                item-value="id"
                chips
                outlined
                small-chips
                multiple
                required
                dense
              ></v-combobox>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-combobox
                name="expertise"
                ref="expertise"
                :items="expertiseList"
                v-model="mentorProfile.expertise"
                :rules="$formRules.selectRequiredMin"
                :label="$t('get_listed.form.label.expertise')"
                class="input-group--focused"
                item-text="name"
                item-value="id"
                chips
                small-chips
                outlined
                multiple
                required
                dense
              ></v-combobox>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-switch
                name="previous_entrepreneur"
                :label="$t('previous_entrepreneur')"
                v-model="mentorProfile.previous_entrepreneur"
              ></v-switch>

            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-switch
                name="investor"
                :label="$t('is_investor')"
                v-model="mentorProfile.investor"
              ></v-switch>

            </v-col>
            <v-col
                cols="12"
                md="6"
            >
              <v-switch
                  name="previous_startup"
                  :label="$t('previous_startup')"
                  v-model="mentorProfile.previous_startup"
              ></v-switch>

            </v-col>

          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="saveProfile()"
          color="primary"
        > {{$t('save_change')}} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { MentorProfile } from "@/models/index";
import Countries from "@/api/country_code";

export default {
  name: "FormEditMentor",
  props: {
    visible: { type: Boolean, default: false },
  },
  data() {
    return {
      profileImage: null,
      mentorProfile: {}, // for loading profile into the view
      editedItem: {}, // For compare phone and email edits
      dialog: false,
      tabs: null,
      options: [
        { text: "Yes", value: true },
        { text: "No", value: false },
      ],
      isClaimProfile: false,
      valid: true,
      countries: Countries,
      imageName: "",
      imageUrl: "",
      imageFile: "",
    };
  },
  computed: {
    ...mapState("static", ["languages"]),
    ...mapState("user", ["currentUser"]),
    ...mapState("interest", { interestList: "dataList" }),
    ...mapState("expertise", { expertiseList: "dataList" }),
    ...mapState("industry", { industryList: "dataList" }),

    modalLabel() {
      if (this.isClaimProfile) {
        this.$t("mentor.dialog_form.title3");
      } else {
        return this.editedItem.id
          ? this.$t("mentor.dialog_form.title")
          : this.$t("mentor.dialog_form.title2");
      }
    },
    languageOptions() {
      let options = this.languages.map((item) => ({
        ...item,
        title: this.$t(item.key),
      }));
      let optionsAll = { title: this.$t("all"), value: "" };
      options.unshift(optionsAll);
      return options;
    },
    profileNameKh() {
      const { first_name_kh, last_name_kh } = this.editedItem;
      if (!first_name_kh || !first_name_kh) return this.$t("n_a");
      return [first_name_kh, last_name_kh].join(" ");
    },

    profileNameEn() {
      const { first_name, last_name } = this.editedItem;
      if (!first_name || !last_name) return this.$t("n_a");
      return [first_name, last_name].join(" ");
    },
  },
  watch: {},
  mounted() {
    // this.resetForm();
    // this.getInterest();
    this.getExpertise();
    this.getIndustry();
  },
  methods: {
    ...mapActions("interest", { getInterest: "get" }),
    ...mapActions("expertise", { getExpertise: "get" }),
    ...mapActions("industry", { getIndustry: "get" }),
    ...mapActions("mentor-profile", {
      updateProfile: "updateProfile",
    }),

    ...mapActions("stakeholder", {
      claimRequest: "claimRequest",
      matchProfile: "matchProfile",
    }),
    // UIs
    openForm(item) {

      this.mentorProfile = this.$common.cloneJSON(item);
      
      this.imageUrl = this.mentorProfile.profile;
      this.editedItem = this.$common.cloneJSON(item);
      this.dialog = true;
    },
    closeForm(){
      this.dialog = false;
    },
    pickProfile(file) {
      if (file.size > 1000000) {
        this.$swal.fire("", "File size must be below 1MB", "fail");
        return;
      }
      this.profileImage = file;
      this.editedItem.profile = URL.createObjectURL(file);
    },
    phoneFormatter(value) {
      var input = value.replace(/\D/g, "");
      var size = input.length;
      if (size > 0) {
        input = "(" + input;
      }
      if (size > 1) {
        input = input.slice(0, 2) + ")" + input.slice(2, 11);
      }
      return input;
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

    // API

    saveProfile() {
      let valid = this.$refs.form.validate();
      if (!valid) return;
      // const formData = new FormData(document.getElementById("form"))
      const formData = new FormData();
      for (var key in this.mentorProfile) {
        if (this.mentorProfile[key] !== "" && this.mentorProfile[key] !== null)
          formData.append(key, this.mentorProfile[key]);
      }

      delete formData.delete("expertise");
      delete formData.delete("industry");
      delete formData.delete("id");
      delete formData.delete("owner");

      if (formData.get("email") == this.mentorProfile.email) {
        formData.delete("email");
      }
      if (formData.get("phone") == this.mentorProfile.phone) {
        formData.delete("phone");
      }

      for (let key in this.mentorProfile.expertise) {
        let obj = this.mentorProfile.expertise[key];
        formData.append("expertise", obj.id);
      }

      for (let key in this.mentorProfile.industry) {
        let obj = this.mentorProfile.industry[key];
        formData.append("industry", obj.id);
      }

      if (this.imageFile !== "") formData.append("profile", this.imageFile);
      else delete formData.delete("profile");

      this.updateProfile(formData)
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
          
          const message = error.data?.message || error;
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

<style lang="scss" scoped>
.avatar-picker.profile-image {
  border-radius: 100%;
}

.badge.badge-custom {
  background-color: #fbc76759;
}
</style>
