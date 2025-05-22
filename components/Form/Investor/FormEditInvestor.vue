<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="768"
    scrollable
  >
    <v-card>
      <v-card-title class="text-h5">{{$t('route.user-profile-investor')}}
        <v-spacer></v-spacer>
        <v-btn
          @click="dialog = false"
          class="rounded-lg"
          color="primary"
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
              <v-layout
                class="my-4"
                column
              >
                <v-avatar
                  size="110"
                  class="align-self-center mb-4"
                >
                  <img
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
              </v-layout>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="investorProfile.name"
                name="name"
                label="Name"
                outlined
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="investorProfile.email"
                name="email"
                label="Email"
                disabled
                outlined
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-autocomplete
                :label="$t('get_listed.form.label.country_code')"
                :items="countries"
                :rules="$formRules.selectRequired"
                v-model="investorProfile.country_code"
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
                name="phone"
                :label="$t('get_listed.form.label.phone_number')"
                v-model="investorProfile.phone"
                :rules="$formRules.phoneRequired"
                outlined
                dense
              >

              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                clearable
                no-resize
                name="description"
                clear-icon="mdi-close-circle"
                label="Description"
                rows="2"
                row-height="20"
                v-model="investorProfile.description"
                outlined
                dense
              ></v-textarea>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                name="address"
                :label="$t('get_listed.form.label.address')"
                v-model="investorProfile.address"
                outlined
                dense
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                name="website"
                :label="$t('get_listed.form.label.website')"
                v-model="investorProfile.website"
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
                name="video_link"
                label="Video Link"
                v-model="investorProfile.video_link"
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
                name="fb_social_url"
                :label="$t('get_listed.form.label.fb_url')"
                v-model="investorProfile.fb_social_url"
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
                name="linkedin_social_url"
                :label="$t('get_listed.form.label.linkedin_url')"
                v-model="investorProfile.linkedin_social_url"
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
              <v-autocomplete
                v-model="investorProfile.employee_range"
                name="employee_range"
                :label="$t('get_listed.form.label.employee_range')"
                class="input-group--focused"
                :items="employeeRangeList"
                item-value="id"
                item-text="name"
                autocomplete
                outlined
                dense
              >
              </v-autocomplete>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="investorProfile.year_of_establishment"
                :label="$t('get_listed.form.label.year_establish')"
                ref="year_of_establishment"
                :rules="$formRules.numberRule"
                v-mask="'####'"
                required
                outlined
                dense
                type="text"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                :label="$t('get_listed.form.label.date_incorporated')"
                v-model="investorProfile.date_incorporated"
                v-mask="'####-##-##'"
                placeholder="YYYY-MM-DD"
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
                  v-model="investorProfile.industry"
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
                name="investment_stage"
                ref="investment_stage"
                :items="investmentStageList"
                v-model="investmentStage"

                :label="$t('get_listed.form.label.investment_stage')"
                class="input-group--focused"
                item-text="name"
                item-value="id"
                item
                chips
                small-chips
                multiple
                required
                outlined
                dense
              ></v-combobox>
            </v-col>


            <v-col
              cols="12"
              md="6"

            >
              <v-autocomplete
                name="investor_type"
                class="input-group--focused"
                v-model="investorProfile.investor_type"
                :label="$t('get_listed.form.label.investor_type')"
                :items="investorTypeList"
                item-text="name"
                item-value="id"
                outlined
                dense
              >
              </v-autocomplete>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-autocomplete
                name="looking_at"
                label="Looking At"
                class="input-group--focused"
                v-model="investorProfile.looking_at"
                :items="lookingAtList"
                item-text="name"
                item-value="id"
                outlined
                dense
              >
              </v-autocomplete>
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
        > {{$t('dialog.save')}} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Countries from "@/api/country_code";
import { BusinessModel, getBusinessModelById } from "@/api/business_model";
import { LookingAt } from "@/api/looking_at";
import { getInvestorTypeById, InvestorType } from "@/api/investor_type";
import {
  getInvestmentObjectById,
  getInvestmentStageById,
  InvestmentStage,
} from "@/api/investment_stage";
import { getStakeholderById, StakeholderType } from "@/api/stakeholder_type";
export default {
  name: "FormEditInvestor",
  props: {
    visible: { type: Boolean, default: false },
  },
  data() {
    return {
      dialog: false,
      tabs: null,
      profileImage: null,
      investorProfile: {}, // for loading profile into the view
      editedItem: {}, // For compare phone and email edits
      valid: true,
      countries: Countries,
      imageName: "",
      imageUrl: "",
      imageFile: "",
      businessModels: BusinessModel,
      employeeRangeList: ["1-10", "11-50", "51-100", "Above 100"],
      lookingAtList: LookingAt,
      investorTypeList: InvestorType,
      investmentStageList: InvestmentStage,
      stakeholderTypeList: StakeholderType,
      investmentStage:[]
    };
  },
  computed: {
    ...mapState("user", ["currentUser"]),
    ...mapState("interest", { interestList: "dataList" }),
    ...mapState("expertise", { expertiseList: "dataList" }),
    ...mapState("industry", { industryList: "dataList" }),
    modalLabel() {
      return this.editedItem.id
        ? this.$t("investor.dialog_form.title")
        : this.$t("investor.dialog_form.title2");
    },
  },
  watch: {},
  mounted() {
    this.getExpertise();
    this.getIndustry();
  },
  methods: {
    ...mapActions("interest", { getInterest: "get" }),
    ...mapActions("expertise", { getExpertise: "get" }),
    ...mapActions("industry", { getIndustry: "get" }),
    ...mapActions("investor-profile", {
      updateProfile: "updateProfile",
    }),

    // UIs
    // resetForm(investor) {
    //   if (!investor) {
    //     this.editedItem = this.$common.cloneJSON(InvestorProfile);
    //     return;
    //   }
    //   this.editedItem = this.$common.cloneJSON({
    //     ...investor,
    //     photo: investor.photo || "",
    //   });
    //   this.$refs.investorFormObserver?.reset();
    // },
    openForm(item) {
      this.investmentStage = []
      this.investorProfile = this.$common.cloneJSON(item);
      if(this.investorProfile.investment_stage){
        for(item of this.investorProfile.investment_stage){
          this.investmentStage.push(getInvestmentObjectById(item))
        }
      }
      
      this.imageUrl = this.investorProfile.logo;
      this.editedItem = this.$common.cloneJSON(item);
      this.dialog = true;
    },
    closeForm(){
      this.dialog = false;
    },
    pickProfile(file) {
      this.profileImage = file;
      this.editedItem.photo = URL.createObjectURL(file);
      this.editedItem.image = file.name;
    },
    getInterestOptions(id) {
      return this.interestList.find((item) => item.id == id) || {};
    },
    removeInterest(id) {
      const index = this.editedItem.area_of_interests.findIndex(
        (item) => item == id
      );
      if (index > -1) {
        this.editedItem.area_of_interests.splice(index, 1);
      }
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
    getBusinessModelById(id) {
      return getBusinessModelById(id);
    },

    getInvestorTypeById(id) {
      return getInvestorTypeById(id);
    },
    getInvestmentStageById(id) {
      
      return getInvestmentStageById(id);
    },
    getInvestmentObjectById(id){
      return getInvestmentObjectById(id)
    },

    getStakeholderById(id) {
      return getStakeholderById(id);
    },
    //APIs
    // save() {
    //   this.$refs.investorFormObserver.validate().then((valid) => {
    //     if (!valid) return;
    //     const formData = {
    //       ...this.editedItem,
    //       area_of_interests: this.editedItem.area_of_interests.map((i) => i.id),
    //     };
    //
    //     const { id } = this.editedItem;
    //     if (!id) {
    //       formData.user = this.currentUser.id;
    //       this.saveNew(formData);
    //       return;
    //     }
    //     delete formData.user;
    //     this.saveUpdate(id, formData);
    //     return;
    //   });
    // },
    // saveNew(payload) {
    //   this.registerInvestor({ payload })
    //     .then((res) => {
    //       let message = this.$t("investor.message.profile_requested");
    //       this.$swal.fire("", message, "success");
    //       this.$router.replace("/user/profile/investor/" + res.id);
    //       this.showModal = false;
    //     })
    //     .catch((error) => {
    //       const message = error.response.data.message || error;
    //       this.$swal.fire(this.$t("msg.failed"), message, "error");
    //     });
    // },
    // saveUpdate(id, payload) {
    //
    //   this.updateInvestor({ id, payload })
    //     .then((res) => {
    //       let message = this.$t("investor.message.profile_updated");
    //       this.$swal.fire("", message, "success");
    //       this.showModal = false;
    //       this.$emit("saved-update");
    //     })
    //     .catch((error) => {
    //       const message = error.response.data.message || error;
    //       this.$swal.fire(this.$t("msg.failed"), message, "error");
    //     });
    // },
    saveProfile() {
      let valid = this.$refs.form.validate();
      if (!valid) return;


      const formData = new FormData();
      for (const key in this.investorProfile) {

        if (
            this.investorProfile[key] !== "" &&
            this.investorProfile[key] !== null
        )
          formData.append(key, this.investorProfile[key]);
      }
      delete formData.delete("id");
      delete formData.delete("owner");
      delete formData.delete("notable_investees");
      delete formData.delete("industry");
      delete formData.delete("investment_stage");

      if (this.imageFile !== "") formData.append("logo", this.imageFile);
      else delete formData.delete("logo");

      if (formData.get("email") == this.investorProfile.email) {
        formData.delete("email");
      }
      if (formData.get("phone") == this.investorProfile.phone) {
        formData.delete("phone");
      }


      for (let key in this.investorProfile.industry) {
        let obj = this.investorProfile.industry[key];
        formData.append("industry", obj.id);
      }

      for (let key in this.investmentStage) {

        let obj = this.investmentStage[key];
        
        formData.append("investment_stage", obj.id);
      }

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

<style>
</style>
