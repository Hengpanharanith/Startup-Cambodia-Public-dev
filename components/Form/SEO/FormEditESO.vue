<template>
  <v-dialog
      v-model="dialog"
      width="768"
      persistent
      scrollable
  >
    <v-card rounded="lg">
      <v-card-title flat>
        <span>ESO Profile</span>
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
            <label>{{ this.$t('startup_profile.form.tab.title.basic_info') }}</label>
          </v-tab>

          <v-tab>
            <label> {{ this.$t('startup_profile.form.tab.title.startup_info') }}</label>
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
                          <v-img
                              cover
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
                          v-model="esoProfile.name"
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
                        md="6"
                    >
                      <v-text-field
                          v-model="esoProfile.email"
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
                              v-model="esoProfile.country_code"
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
                              v-model="esoProfile.phone"
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
                          dense
                          outlined
                          v-model="esoProfile.website"
                          ref="website"
                          :rules="$formRules.url"
                          required
                          :label="$t('get_listed.form.label.website')"
                          type="text"
                      ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        md="4"
                    >
                      <v-text-field
                          dense
                          outlined
                          v-model="esoProfile.linkedin_social_url"
                          ref="linkedin_social_url_e"
                          :rules="$formRules.url"
                          required
                          :label="$t('get_listed.form.label.linkedin_url')"
                          type="text"
                      ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        md="4"
                    >
                      <v-text-field
                          dense
                          outlined
                          v-model="esoProfile.fb_social_url"
                          ref="fb_social_url"
                          :rules="$formRules.url"
                          required
                          :label="$t('get_listed.form.label.fb_url')"
                          type="text"
                      ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                    >
                      <v-textarea
                          dense
                          outlined
                          v-model="esoProfile.description"
                          ref="bio"
                          :rules="$formRules.required"
                          required
                          rows="2"
                          :label="$t('get_listed.form.label.bio')"
                          type="text"
                      ></v-textarea>
                    </v-col>

                    <v-col
                        cols="12"
                    >
                      <v-textarea
                          dense
                          outlined
                          v-model="esoProfile.address"
                          ref="address"
                          :rules="$formRules.required"
                          required
                          rows="2"
                          :label="$t('get_listed.form.label.address')"
                          type="text"
                      ></v-textarea>
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
                          dense
                          outlined
                          v-model="esoProfile.date_incorporated"
                          v-mask="'####-##-##'"
                          :label="$t('get_listed.form.label.date_incorporated')"
                          placeholder="YYYY-MM-DD"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        md="6"
                    >
                      <v-text-field
                          dense
                          outlined
                          v-model="esoProfile.year_of_establishment"
                          :label="$t('get_listed.form.label.year_establish')"
                          ref="year_of_establishment"
                          :rules="$formRules.numberRule || $formRules.required"
                          v-mask="'####'"
                          required
                          type="text"
                      ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                    >
                      <v-combobox
                          color="primary"
                          :dense="!esoProfile.industry"
                          outlined
                          multiple
                          ref="industry"
                          :items="industryList"
                          v-model="esoProfile.industry"
                          :rules="$formRules.selectRequiredMin"
                          required
                          :label="$t('get_listed.form.label.industry')"
                          class="input-group--focused"
                          item-text="name"
                      >
                        <template v-slot:selection="data">
                          <v-chip
                              v-bind="data.attrs"
                              :input-value="data.selected"
                              @click="data.select"
                              small
                              color="primary"
                          >
                            {{ data.item.name }}
                          </v-chip>
                        </template>
                      </v-combobox>
                    </v-col>
                    <v-col
                        cols="12"
                    >
                      <v-autocomplete
                          outlined
                          color="primary"
                          :dense="!esoProfile.looking_at"
                          multiple
                          :label="$t('get_listed.form.label.looking_at')"
                          class="input-group--focused"
                          :items="lookingAtList"
                          v-model="esoProfile.looking_at"
                          item-text="value"
                          item-value="key"
                          return-object
                      >
                        <template v-slot:selection="data">
                          <v-chip
                              v-bind="data.attrs"
                              :input-value="data.selected"
                              @click="data.select"
                              small
                              color="primary"
                          >
                            {{ data.item.value }}
                          </v-chip>
                        </template>
                      </v-autocomplete>
                    </v-col>

                    <v-col
                        cols="12"
                    >
                      <v-autocomplete
                          dense
                          outlined
                          color="primary"
                          :dense="!esoProfile.cohort_size"
                          :label="$t('get_listed.form.label.cohort_size')"
                          :items="cohortRangeList"
                          v-model="esoProfile.cohort_size"
                          item-text="name"
                          item-value="name"
                      >
                        <template v-slot:selection="data">
                          <v-chip
                              v-bind="data.attrs"
                              :input-value="data.selected"
                              @click="data.select"
                              small
                              color="primary"
                          >
                            {{ data.item }}
                          </v-chip>
                        </template>
                      </v-autocomplete>
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
        >{{ $t('save_change') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Countries from "@/api/country_code";
import {ValidationProvider, ValidationObserver, extend} from "vee-validate";
import "vue-loading-overlay/dist/vue-loading.css";
import {mapGetters, mapActions, mapMutations, mapState} from "vuex";
import {LookingAt, getLookingAtById} from "@/api/looking_at";
import {InvestorType, getInvestorTypeById} from "@/api/investor_type";
import {
  InvestmentStage,
  getInvestmentStageById,
} from "@/api/investment_stage";
import {StakeholderType, getStakeholderById} from "@/api/stakeholder_type.js";

export default {
  name: "FormEditESO",
  props: {},
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
    this.isUpdateProfile = this.startupPages ? true : false;
  },

  data() {
    return {
      profileImage: null,
      esoProfile: {}, // for loading profile into the view
      startup: {},
      fullPage: true,
      isUpdateProfile: false,
      value: [],
      options: [],
      dialog: false,
      tabs: null,
      countries: Countries,
      investor_type: InvestorType,
      investment_stage: InvestmentStage,
      imageName: "",
      imageUrl: "",
      imageFile: "",
      cohortRangeList: ["1-10", "11-20", "21-31", "31-50", "Above 50"],
      lookingAtList: LookingAt,
      editedItem: {}
    };
  },
  async fetch() {
    await this.getIndustry({params: {page_size: 999}})
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
    ...mapActions("eso-profile",
        {
          "updateProfile": "updateProfile",
        }),
    ...mapActions("industry", {getIndustry: "get"}),

    openForm(item) {
      this.esoProfile = this.$common.cloneJSON(item);
      this.imageUrl = this.esoProfile.logo;
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

    saveForm() {
      let validFormBasicInfo = this.$refs.formBasicInfo.validate();
      if (!validFormBasicInfo) {
        this.tabs = 0
        return;
      }

      try {
        // this try for case tab 1 never render

        let validFormCompanyInfo = this.$refs.formCompanyInfo.validate();
        if (!validFormCompanyInfo) {
          this.tabs = 1
          return;
        }
      }catch {}

      this.sweetAlertLoading();

      const formData = new FormData();
      formData.append("id", this.esoProfile.id);

      if (this.imageFile !== "") formData.append("logo", this.imageFile);
      else delete formData.delete("logo");
      formData.append("name", this.esoProfile.name);
      if (formData.get("email") == this.editedItem.email) {
        formData.delete("email");
      }
      if (formData.get("phone") == this.editedItem.phone) {
        formData.delete("phone");
      }
      formData.append("address", this.esoProfile.address);
      formData.append("country_code", this.esoProfile.country_code);

      if (this.esoProfile.description) {
        formData.append("description", this.esoProfile.description);
      }

      formData.append("website", this.esoProfile.website || '');

      formData.append("linkedin_social_url", this.esoProfile.linkedin_social_url || '');

      formData.append("fb_social_url", this.esoProfile.fb_social_url || '');

      if (this.esoProfile.year_of_establishment) {
        formData.append(
            "year_of_establishment",
            this.esoProfile.year_of_establishment
        );
      }

      if (this.esoProfile.date_incorporated) {
        formData.append("date_incorporated", this.esoProfile.date_incorporated);
      }

      if (this.esoProfile.cohort_size) {
        formData.append("cohort_size", this.esoProfile.cohort_size);
      }


      if (this.esoProfile.industry) {
        this.esoProfile.industry.forEach((element) => {
          formData.append("industry", element.id);
        });
      }

      if (this.esoProfile.looking_at) {
        this.esoProfile.looking_at.forEach((element) => {
          formData.append("looking_at", element.key);
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
            this.sweetAlertLoadingClose();
            Toast.fire("", this.$t("user.profile.save_success"), "success");
            this.$emit("saved-update");
            this.closeForm()
          })
          .catch((error) => {
            this.sweetAlertLoadingClose();
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
    closeForm() {
      this.dialog = false;
      // this.imageName = "";
      // this.imageUrl = "";
      // this.imageFile = "";
      // this.$refs.form.reset();
      // this.$refs.formBasicInfo.reset();
      // this.$refs.formCompanyInfo.reset();
    },
    getLookingAtById(id) {
      return getLookingAtById(id);
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
