<template>
  <v-dialog
    v-model="dialog"
    width="768"
    persistent
    scrollable
  >
    <v-card rounded="lg">
      <v-card-title flat>
        <span>{{$t('startup_profile.form.title.your_pf')}}</span>
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
      <div class="flex-grow-0">
        <v-tabs
          v-model="tabs"
          active-class="primary white--text"
        >
          <v-tabs-slider></v-tabs-slider>
          <v-tab>
            <label>{{this.$t('startup_profile.form.tab.title.basic_info')}}</label>
          </v-tab>

          <v-tab>
            <label> {{this.$t('startup_profile.form.tab.title.startup_info')}}</label>
          </v-tab>
        </v-tabs>
        <v-divider></v-divider>
      </div>
      <v-card-text>
        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <v-form
              ref="formBasicInfo"
              id="formBasicInfo"
            >
              <v-card flat>
                <v-card-text>

                  <v-row>
                    <v-col cols="12">
                      <v-layout justify-center>
                        <v-avatar size="110px">
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
                        v-model="startupProfile.name"
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
                      <v-text-field
                        v-model="startupProfile.address"
                        :rules="$formRules.required"
                        :label="$t('get_listed.form.label.address')"
                        name="address"
                        ref="address"
                        dense
                        outlined
                        required
                        type="text"
                      ></v-text-field>
                    </v-col>
                   
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="startupProfile.email"
                        :rules="$formRules.emailRequired"
                        :label="$t('get_listed.form.label.email')"
                        ref="email"
                        name="email"
                        outlined
                        dense
                        required
                        type="email"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-row>
                        <v-col
                          cols="6"
                          md="5"
                        >
                          <v-autocomplete
                            :label="$t('get_listed.form.label.country_code')"
                            :items="countries"
                            :rules="$formRules.selectRequired"
                            v-model="startupProfile.country_code"
                            name="country_code"
                            dense
                            outlined
                            item-text="name_dial_code"
                            item-value="dial_code"
                            ref="country_code"
                            required
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
                        <v-col
                          cols="6"
                          md="7"
                        >
                          <v-text-field
                            v-model="startupProfile.phone"
                            :rules="$formRules.phoneRequired"
                            :label="$t('get_listed.form.label.phone_number')"
                            name="phone"
                            ref="phone"
                            type="text"
                            dense
                            outlined
                            required
                          ></v-text-field>
                        </v-col>
                        
                        

                       
                      </v-row>
                    </v-col>

                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-text-field
                        v-model="startupProfile.year_of_establishment"
                        :label="$t('get_listed.form.label.year_establish')"
                        ref="year_of_establishment_e"
                        :rules="$formRules.numberRule"
                        name="year_of_establishment"
                        v-mask="'####'"
                        dense
                        outlined
                        required
                        type="text"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-autocomplete
                        ref="business_model"
                        name="business_model"
                        :rules="$formRules.selectRequired"
                        :label="$t('get_listed.form.label.business_model')"
                        class="input-group--focused"
                        :items="businessModels"
                        item-text="value"
                        item-value="key"
                        v-model="startupProfile.business_model"
                        chips
                        small-chips
                        outlined
                        multiple
                        required
                        dense
                      ></v-autocomplete>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-combobox
                        ref="industry"
                        name="industry"
                        :items="industryList"
                        v-model="startupProfile.industry"
                        :rules="$formRules.selectRequired"
                        required
                        :label="$t('get_listed.form.label.industry')"
                        class="input-group--focused"
                        item-text="name"
                        item-value="id"
                        chips
                        small-chips
                        outlined
                        multiple
                        dense
                      ></v-combobox>
                    </v-col>
                   
                 
                  </v-row>
                </v-card-text>
              </v-card>
            </v-form>
          </v-tab-item>

          <v-tab-item>
            <v-form
              ref="formCompanyInfo"
              id="formCompanyInfo"
            >
              <v-card flat>
                <v-card-text>
                  <v-row class="mt-8">
                  
                    
                    
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="startupProfile.date_incorporated"
                        v-mask="'####-##-##'"
                        :label="$t('get_listed.form.label.date_incorporated')"
                        placeholder="YYYY-MM-DD"
                        name="date_incorporated"
                        dense
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-autocomplete
                        class="input-group--focused"
                        item-text="value"
                        item-value="key"
                        name="looking_at"
                        :rules="$formRules.selectRequired"
                        :label="$t('get_listed.form.label.looking_at')"
                        :items="lookingAtList"
                        v-model="startupProfile.looking_at"
                        chips
                        small-chips
                        outlined
                        multiple
                        required
                        dense

                      >
                      </v-autocomplete>
                    </v-col>
                    <v-col
                        cols="12"
                        md="3"
                    >
                      <v-autocomplete
                          :label="$t('get_listed.form.label.employee_range')"
                          :items="employeeRangeList"
                          v-model="startupProfile.employee_range"
                          item-text="name"
                          item-value="name"
                          name="employee_range"
                          dense
                          outlined
                      >
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                          v-model="startupProfile.number_of_founder"
                          v-mask="'####'"
                          :label="$t('number_of_founders')"
                          placeholder="0"
                          name="number_of_founder"
                          dense
                          outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                          v-model="startupProfile.number_of_female"
                          v-mask="'####'"
                          :label="$t('female_founders')"
                          placeholder="0"
                          name="number_of_female"
                          dense
                          outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                          v-model="startupProfile.number_of_tech_founder"
                          v-mask="'####'"
                          :label="$t('tech_founders')"
                          placeholder="0"
                          name="number_of_tech_founder"
                          dense
                          outlined
                      ></v-text-field>
                    </v-col>
                    
                    
                 

                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-text-field
                        v-model="startupProfile.fb_social_url"
                        :rules="$formRules.url"
                        :label="$t('get_listed.form.label.fb_url')"
                        name="fb_social_url"
                        dense
                        outlined
                        ref="fb_social_url"
                        required
                        type="text"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-text-field
                        v-model="startupProfile.linkedin_social_url"
                        ref="linkedin_social_url"
                        :rules="$formRules.url"
                        :label="$t('get_listed.form.label.linkedin_url')"
                        name="linkedin_social_url"
                        type="text"
                        dense
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-text-field
                        v-model="startupProfile.website"
                        :rules="$formRules.url"
                        :label="$t('get_listed.form.label.website')"
                        name="website"
                        dense
                        outlined
                        ref="website"
                        required
                        type="text"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        name="description"
                        v-model="startupProfile.description"
                        :label="$t('get_listed.form.label.desc')"
                        rows="3"
                        type="text"
                        dense
                        outlined
                        no-resize
                      ></v-textarea>
                    </v-col>

                  </v-row>
                </v-card-text>
              </v-card>
            </v-form>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="saveForm()"
        >{{$t('save_change')}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Countries from "@/api/country_code";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import "vue-loading-overlay/dist/vue-loading.css";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import { LookingAt, getLookingAtById } from "@/api/looking_at";
import { BusinessModel, getBusinessModelById } from "@/api/business_model";
import { InvestorType, getInvestorTypeById } from "@/api/investor_type";
import {
  InvestmentStage,
  getInvestmentStageById,
} from "@/api/investment_stage";
import { StakeholderType, getStakeholderById } from "@/api/stakeholder_type.js";

export default {
  name: "FormEditStartupInfo",
  props: {
    // startupProfile: { type: Object, default: {} },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    ...mapState("user", ["currentUser"]),
    ...mapGetters({
      requesting: "startupPage/getLoading",
      product: "startupPage/getProduct",
    }),
    // ...mapState("interest", { interestList: "dataList" }),
    ...mapState("industry", { industryList: "dataList" }),
    // ...mapState("expertise", { expertiseList: "dataList" }),
    fullName() {
      const first_name = this.currentUser.first_name || "";
      const last_name = this.currentUser.last_name || "";
      return [first_name, last_name].join(" ").trim() || "-";
    },
    modalLabel() {
      return this.$t("update_profile");
      return this.startupProfile.product.id
        ? "Update Startup Profile"
        : "Add New Startup Profile";
    },
  },
  mounted() {


  },
  created() {
    this.isUpdateProfile = this.startupPages ? true : false;
  },

  data() {
    return {
      profileImage: null,
      startupProfile: {}, // for loading profile into the view
      startup: {},
      fullPage: true,
      isUpdateProfile: false,
      value: [],
      options: [],
      dialog: false,
      tabs: null,
      countries: Countries,
      businessModels: BusinessModel,
      employeeRangeList: ["1-10", "11-50", "51-100", "Above 100"],
      lookingAtList: LookingAt,
      investor_type: InvestorType,
      investment_stage: InvestmentStage,
      stakeholder_type: StakeholderType,
      imageName: "",
      imageUrl: "",
      imageFile: "",
      editedItem: {}, // For compare phone and email edits
    };
  },
  async fetch() {
    await this.getIndustry({ params: { page_size: 999 } })
  },
  methods: {
    ...mapActions("startupPage", [
      "setStartupPage",
      "createProduct",
      "updateStartupPage",
      "setProduct",
      "updateProduct",
      "setStartupArea",
      "createStartupPage",
    ]),
    ...mapActions("startupPage", ["setSelectedStartupPage"]),
    ...mapActions("startup-profile", ["updateProfile"]),
    ...mapActions("industry", { getIndustry: "get" }),

    openForm(item) {
      this.startupProfile = this.$common.cloneJSON(item);
      this.imageUrl = this.startupProfile.logo;
      this.editedItem = this.$common.cloneJSON(item);
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

    // getInterestOptions(id) {
    //   return this.interestList.find((item) => item.id == id) || {};
    // },

    // removeInterest(id) {
    //   const index = this.startupProfile.startup_areas.findIndex(
    //     (item) => item == id
    //   );
    //   if (index > -1) {
    //     this.startupProfile.startup_areas.splice(index, 1);
    //   }
    // },

    handleSubmit() {
      // TODO: Check form validation before submit

      this.$refs.startupInfoFormObserver.validate().then((valid) => {
        if (!valid) return;
        const formData = {
          ...this.startupProfile,
          area_of_interests: this.startupProfile.startup_areas.map((i) => i.id),
        };

        this._updateProduct();
        return;
      });
    },

    _updateProduct: async function () {
      
      const formData = new FormData(this.$refs.startupBizForm);
      if (this.profileImage) {
        formData.append("photo", this.profileImage);
      }
      const headers = { "Content-Type": "multipart/form-data" };

      const payload = formData;

      if (this.startupProfile.product) {
        const productId = this.startupProfile.product.id;
        this.updateProduct({ id: productId, payload: payload })
          .then((response) => {
            this.setProduct(productId);

            // update product info into startup page
            this.updateStartupPage({
              type: "startupArea",
              startup_areas: this.startupProfile.startup_areas.map((i) => i.id),
              id: this.startupPageId,
            }).then((response) => {
              const Toast = this.$swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });
              Toast.fire("", this.$t("user.profile.save_success"), "success");
              this.showModal = false;
              this.setSelectedStartupPage(this.startupProfile);
              this.$emit("saved-update");

              // setTimeout(() => {
              //   window.location.reload();
              // }, 500);
            });
          })
          .catch((error) => {
            const message = error.response.data.message || error;
            const Toast = this.$swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            });
            Toast.fire(this.$t("msg.failed"), message, "error");
          });
      }
    },

    saveForm() {
      if (this.tabs == 0) {
        this.saveBasicInfo();
        return;
      }
      this.saveCompanyInfo();
    },
    closeForm() {
      this.dialog = false;
      // this.imageName = "";
      // this.imageUrl = "";
      // this.imageFile = "";
      // this.$refs.form.reset();
      // this.$refs.formBasicInfo.reset();
      // this.$refs.formCompanyInfo.reset();
    },

    saveBasicInfo() {
      let valid = this.$refs.formBasicInfo.validate();
      if (!valid) return;
      const formData = new FormData(document.getElementById("formBasicInfo"));
      
      
      formData.append("id", this.editedItem.id);
      // return
      if (formData.get("email") == this.editedItem.email) {
        formData.delete("email");
      }
      if (formData.get("phone") == this.editedItem.phone) {
        formData.delete("phone");
      }

      if (this.startupProfile.industry) {
        formData.delete("industry");
        this.startupProfile.industry.map((item) => {
          formData.append("industry", item.id);
        });
      }

      if (this.startupProfile.business_model) {
        formData.delete("business_model");
        this.startupProfile.business_model.map((item) => {
          formData.append("business_model", item);
        });
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
    saveCompanyInfo() {
      let valid = this.$refs.formCompanyInfo.validate();
      if (!valid) return;

      const formData = new FormData(document.getElementById("formCompanyInfo"));

      
      if (this.startupProfile.looking_at) {
        
        formData.delete("looking_at");
        this.startupProfile.looking_at.map((item) => {
          
          if(item.key){
            formData.append("looking_at", item.key);
          }else{
            formData.append("looking_at", item);
          }
          
          
        });


      }

      // return
      formData.append("id", this.editedItem.id);

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
          const message = error.data.message || error;
          // const message = error
          const Toast = this.$swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          Toast.fire(this.$t("msg.failed"), message, "error");
        });
    },
    getLookingAtById(id) {
      return getLookingAtById(id);
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

    getStakeholderById(id) {
      return getStakeholderById(id);
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
