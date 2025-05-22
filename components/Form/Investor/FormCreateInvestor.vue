<template>
  <v-dialog
    v-model="dialog"
    width="768"
    persistent
    scrollable
  >
    <v-card rounded="lg">
      <v-card-title> {{ $t("get_listed.investor.title") }}
        <v-spacer></v-spacer>
        <v-btn
          @click="closeForm"
          class="rounded-lg"
          color="primary"
          icon
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-stepper
        v-model="stepper"
        class="flex-grow-0 flex-shrink-0"
        flat
      >
        <v-stepper-header class="elevation-0">
          <v-stepper-step
            :complete="stepper > 1"
            step="1"
          >
            {{$t("get_listed.label.get_started")}}
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            :complete="stepper > 2"
            step="2"
          >{{ $t("get_listed.investor.stepper.header.basic_info") }}</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            :complete="stepper > 3"
            step="3"
          >{{ $t("get_listed.investor.stepper.header.investment_info") }}</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4">
            {{
                $t("get_listed.investor.stepper.header.verify_info")
              }}</v-stepper-step>
        </v-stepper-header>
      </v-stepper>
      <v-divider></v-divider>
      <v-card-text class="px-0">
        <v-stepper
          flat
          v-model="stepper"
          class="mx-auto"
        >
          <v-form ref="form">
            <v-stepper-items>
              <v-stepper-content :step="1">
                <v-label>{{$t('email')}}</v-label>
                <v-text-field
                  v-model="editedItem.email"
                  :rules="$formRules.emailRequired"
                  :hint="$t('investor.dialog_form.email_hint')"
                  prepend-inner-icon="mdi-email"
                  type="email"
                  persistent-hint
                  outlined
                  dense
                ></v-text-field>
              </v-stepper-content>
              <v-stepper-content :step="2">

                <v-layout
                  v-if="stepper == 2"
                  column
                  class="mb-4"
                >
                  <v-avatar
                    size="110"
                    class="align-self-center mb-4"
                  >
                    <v-img
                      :src="imageUrl"
                      v-if="imageUrl"
                    />
                    <v-img
                      src="/images/default-image.png"
                      alt="Profile"
                      v-else
                    />
                  </v-avatar>

                  <v-text-field
                    flat solo single-line
                    class="mx-auto centered-input"
                    v-model="imageName"
                    @click="pickFile"
                    :rules="$formRules.required"
                  >
                    <template v-slot:label>
                      <span class="ml-8">{{$t('get_listed.form.label.select_image')}}</span>
                      <v-icon style="vertical-align: middle">
                        mdi-file-find
                      </v-icon>
                    </template>

                  </v-text-field>
                  <input
                    type="file"
                    style="display: none"
                    ref="image"
                    accept="image/png, image/jpeg"
                    @change="onFilePicked"

                  />
                </v-layout>
                <v-row v-if="stepper == 2">
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      dense
                      outlined
                      v-model="editedItem.name"
                      ref="name"
                      :rules="$formRules.required"
                      required
                      :label="$t('get_listed.form.label.name')"
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
                      v-model="editedItem.email"
                      ref="email"
                      :rules="$formRules.emailRequired"
                      required
                      :label="$t('get_listed.form.label.email')"
                      type="email"
                      disabled
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-row>
                      <v-col
                        cols="6"
                        md="4"
                      >
                        <v-autocomplete
                          dense
                          outlined
                          :label="$t('get_listed.form.label.country_code')"
                          :items="countries"
                          v-model="editedItem.country_code"
                          item-text="name_dial_code"
                          item-value="dial_code"
                          ref="country_code"
                          :rules="$formRules.selectRequired"
                          required
                        >
                          <template
                            slot="item"
                            slot-scope="data"
                          >
                            <!-- HTML that describe how select should render items when the select is open -->
                            {{ data.item.name }} {{ data.item.dial_code }}
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
                        md="8"
                      >
                        <v-text-field
                          dense
                          outlined
                          v-model="editedItem.phone"
                          ref="phone"
                          :rules="$formRules.phoneRequired"
                          required
                          :label="$t('get_listed.form.label.phone_number')"
                          type="text"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      dense
                      outlined
                      v-model="editedItem.fb_social_url"
                      ref="fb_social_url"
                      :rules="$formRules.url"
                      required
                      :label="$t('get_listed.form.label.fb_url')"
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
                      v-model="editedItem.linkedin_social_url"
                      ref="linkedin_social_url"
                      :rules="$formRules.url"
                      required
                      :label="$t('get_listed.form.label.linkedin_url')"
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
                      v-model="editedItem.website"
                      ref="website"
                      :rules="$formRules.url"
                      required
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
                      v-model="editedItem.address"
                      ref="address"
                      :rules="$formRules.required"
                      required
                      :label="$t('get_listed.form.label.address')"
                      type="text"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-stepper-content>
              <v-stepper-content :step="3">
                <v-row
                  v-if="stepper == 3"
                  class="mt-8"
                >
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      dense
                      outlined
                      v-model="editedItem.year_of_establishment"
                      :label="$t('get_listed.form.label.year_establish')"
                      ref="year_of_establishment"
                      :rules="$formRules.numberRule"
                      v-mask="'####'"
                      required
                      type="text"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      :label="$t('get_listed.form.label.date_incorporated')"
                      dense
                      outlined
                      v-model="editedItem.date_incorporated"
                      v-mask="'####-##-##'"
                      placeholder="YYYY-MM-DD"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-combobox
                      ref="industry"
                      class="input-group--focused"
                      :items="industryList"
                      :label="$t('get_listed.form.label.industry')"
                      :rules="$formRules.selectRequiredMin"
                      v-model="editedItem.industry"
                      item-text="name"
                      item-value="id"
                      dense
                      chips
                      outlined
                      multiple
                      required
                    ></v-combobox>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-autocomplete
                      class="input-group--focused"
                      ref="business_model"
                      v-model="editedItem.business_model"
                      :rules="$formRules.selectRequiredMin"
                      :label="$t('get_listed.form.label.business_model')"
                      :items="businessModels"
                      item-value="key"
                      item-text="value"
                      required
                      chips
                      outlined
                      multiple
                      dense
                    ></v-autocomplete>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-autocomplete
                      dense
                      outlined
                      :label="$t('get_listed.form.label.investor_type')"
                      class="input-group--focused"
                      :items="investor_type"
                      item-text="name"
                      item-value="id"
                      v-model="editedItem.investor_type"
                    >
                    </v-autocomplete>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-autocomplete
                      dense
                      outlined
                      :label="$t('get_listed.form.label.investment_stage')"
                      class="input-group--focused"
                      multiple
                      autocomplete
                      :items="investment_stage"
                      item-text="name"
                      item-value="id"
                      v-model="editedItem.investment_stage"
                    >
                    </v-autocomplete>
                  </v-col>
                </v-row>
              </v-stepper-content>

              <!-- summary -->
              <v-stepper-content :step="4">
                <v-layout
                  class="mb-4"
                  column
                >
                  <v-avatar
                    size="110"
                    class="align-self-center mb-4"
                  >
                    <v-img
                      :src="editedItem.logo || imageUrl"
                      alt="Profile"
                    />
                  </v-avatar>
                </v-layout>
                <v-row>
                  <v-col cols="4">{{$t("get_listed.form.label.name")}}</v-col>
                  <v-col cols="8">{{ editedItem.name }}</v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">{{$t("get_listed.form.label.email")}}</v-col>
                  <v-col cols="8">{{ editedItem.email }}</v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">{{$t("get_listed.form.label.phone_number")}}</v-col>
                  <v-col cols="8">{{ editedItem.country_code }}
                    {{ editedItem.phone }}</v-col>
                </v-row>
                <v-row v-if="editedItem.website">
                  <v-col cols="4">{{$t("get_listed.form.label.website")}}</v-col>
                  <v-col cols="8">{{ editedItem.website }}</v-col>
                </v-row>
                <v-row v-if="editedItem.fb_social_url">
                  <v-col cols="4">{{$t("get_listed.form.label.fb_url")}}</v-col>
                  <v-col cols="8">{{ editedItem.fb_social_url }}</v-col>
                </v-row>
                <v-row v-if="editedItem.linkedin_social_url">
                  <v-col cols="4">{{$t("get_listed.form.label.linkedin_url")}}</v-col>
                  <v-col cols="8">{{ editedItem.linkedin_social_url }}</v-col>
                </v-row>
                <v-row v-if="editedItem.year_of_establishment">
                  <v-col cols="4">{{$t("get_listed.form.label.year_establish")}}</v-col>
                  <v-col cols="8">{{editedItem.year_of_establishment}}</v-col>
                </v-row>
                <v-row v-if="editedItem.date_incorporated">
                  <v-col cols="4">{{$t("get_listed.form.label.date_incorporated")}}</v-col>
                  <v-col cols="8">{{ editedItem.date_incorporated }}</v-col>
                </v-row>
                <v-row v-if="editedItem.employee_range">
                  <v-col cols="4">{{$t("get_listed.form.label.employee_range")}}</v-col>
                  <v-col cols="8">{{ editedItem.employee_range }}</v-col>
                </v-row>
                <v-row v-if="editedItem.industry && editedItem.industry.length">
                  <v-col cols="4">{{$t("get_listed.form.label.industry")}}</v-col>
                  <v-col cols="8">
                    <v-chip
                      class="mx-1"
                      small
                      v-for="s in editedItem.industry"
                      v-bind:key="s.id"
                    >{{ s.name }}</v-chip>
                  </v-col>
                </v-row>
                <v-row v-if="
                      editedItem.business_model &&
                      editedItem.business_model.length
                    ">
                  <v-col cols="4">{{$t("get_listed.form.label.business_model")}}</v-col>
                  <v-col cols="8">
                    <v-chip
                      class="mx-1"
                      small
                      v-for="s in editedItem.business_model"
                      v-bind:key="s.id"
                    >{{ getBusinessModelById(s) }}</v-chip>
                  </v-col>
                </v-row>

                <v-row v-if="editedItem.investor_type">
                  <v-col cols="4">{{$t("get_listed.form.label.investor_type")}}</v-col>
                  <v-col cols="8">
                    <v-chip small>{{getInvestorTypeById(editedItem.investor_type)}}</v-chip>
                  </v-col>
                </v-row>

                <v-row v-if="editedItem.investment_stage && editedItem.investment_stage.length">
                  <v-col cols="4">{{$t("get_listed.form.label.investment_stage")}}</v-col>
                  <v-col cols="8">
                    <v-chip
                      class="mx-1"
                      small
                      v-for="s in editedItem.investment_stage"
                      v-bind:key="s.id"
                    >{{ getInvestmentStageById(s) }}</v-chip>
                  </v-col>
                </v-row>
              </v-stepper-content>
            </v-stepper-items>
          </v-form>
        </v-stepper>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="stepper -= 1"
          v-if="stepper != 1"
          :hidden="isMatched"
          outlined
        >{{ $t("get_listed.form.btn.back") }}</v-btn>
        <v-btn
          @click="stepper == 4 ? submitForm() : saveForm(stepper + 1)"
          color="primary"
          depressed
        >{{ stepper == 4 ? isMatched ? "Claim" : $t("get_listed.form.btn.submit") : $t("get_listed.form.btn.next")}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Countries from "@/api/country_code";
import { BusinessModel, getBusinessModelById } from "@/api/business_model";
import { getLookingAtById, LookingAt } from "@/api/looking_at";
import { getInvestorTypeById, InvestorType } from "@/api/investor_type";
import {
  getInvestmentStageById,
  InvestmentStage,
} from "@/api/investment_stage";
import { getStakeholderById, StakeholderType } from "@/api/stakeholder_type";
import { mapActions, mapState } from "vuex";

export default {
  name: "FormCreateInvestor",
  components: {
    ButtonPrimary,
  },
  data() {
    return {
      editedItem: {
        country_code:'+855'
      },
      imageName: "",
      imageUrl: "",
      imageFile: "",
      countries: Countries,
      dialog: false,
      activeStep: 1,
      businessModels: BusinessModel,
      employeeRangeList: ["1-10", "11-50", "51-100", "Above 100"],
      lookingAtList: LookingAt,
      investor_type: InvestorType,
      investment_stage: InvestmentStage,
      stakeholder_type: StakeholderType,
      stepper: 1,
      isMatched: false,
    };
  },
  methods: {
    ...mapActions("industry", { getIndustry: "get" }),
    ...mapActions("expertise", { getExpertise: "get" }),
    ...mapActions("investor-profile", {
      createProfile: "createProfile",
      matchProfile: "matchingProfile",
    }),
    ...mapActions("stakeholder", { claimProfile: "claimRequest" }),

    openForm(email = "") {
      this.editedItem.email = email;
      this.dialog = true;
    },
    saveForm(nextStep) {
      let valid = this.$refs.form.validate();
      if (!valid) return;
      if (this.stepper == 1) {
        this.fetchProfile();
      } else {
        this.stepper = nextStep;
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
    closeForm() {
      this.dialog = false;
      this.activeElement = 0;
      this.stepper = 1;
      this.editedItem = {};
      this.imageName = "";
      this.imageUrl = "";
      this.imageFile = "";
      this.$refs.form.reset();
    },

    fetchProfile() {
      this.matchProfile({ email: this.editedItem.email })
        .then((res) => {
          if (res) {
            this.editedItem = Object.assign({}, res);
            this.isMatched = true;
            this.stepper = 4;
          }
        })
        .catch((error) => {
          if (error.status == 404) {
            this.stepper += 1;
            this.isMatched = false;
          }
        });
    },
    getLookingAtById(id) {
      return getLookingAtById(id);
    },

    submitForm() {
      const formData = new FormData();
      if (this.imageFile !== "") formData.append("logo", this.imageFile);
      else delete formData.delete("logo");

      formData.append("name", this.editedItem.name);
      formData.append("email", this.editedItem.email);
      formData.append("address", this.editedItem.address);
      formData.append("phone", this.editedItem.phone);
      formData.append("country_code", this.editedItem.country_code);
      if (this.editedItem.year_of_establishment) {
        formData.append(
          "year_of_establishment",
          this.editedItem.year_of_establishment
        );
      }

      if (this.editedItem.date_incorporated) {
        formData.append("date_incorporated", this.editedItem.date_incorporated);
      }
      if (this.editedItem.industry) {
        this.editedItem.industry.forEach((element) => {
          formData.append("industry", element.id);
        });
      }

      // if (this.editedItem.looking_at) {
      //   this.editedItem.looking_at.forEach((element) => {
      //     formData.append("looking_at", element);
      //   });
      // }

      if (this.editedItem.fb_social_url) {
        formData.append("fb_social_url", this.editedItem.fb_social_url);
      }

      if (this.editedItem.linkedin_social_url) {
        formData.append(
          "linkedin_social_url",
          this.editedItem.linkedin_social_url
        );
      }

      if (this.editedItem.investor_type) {
        formData.append("investor_type", this.editedItem.investor_type);
      }

      if (this.editedItem.investment_stage) {
        formData.append("investment_stage", this.editedItem.investment_stage);
      }

      if (this.isMatched) {
        let payload = {
          stakeholder: this.editedItem.id,
          type: "investor",
          option: "claim",
        };
        this.claimProfile(payload)
          .then((res) => {
            this.$swal.fire(
              `${this.$t("get_listed.dialog.title.success")}!`,
              `${this.$t("get_listed.dialog.title.success.message")}`,
              "success"
            );
            this.closeForm();
            this.$emit("saved-update");
          })
          .catch((error) => {
            const message = error.response.data.message || error;
            this.$swal.fire(
              `${this.$t("get_listed.dialog.title.fail")}!`,
              message,
              "error"
            );
          });
      } else {
        this.createProfile(formData)
          .then((res) => {
            this.$swal.fire(
              `${this.$t("get_listed.dialog.title.success")}!`,
              `${this.$t("get_listed.dialog.title.success.message")}`,
              "success"
            );

            this.closeForm();

            this.$emit("saved-update");
          })
          .catch((error) => {
            const message = error.response.data.message || error;
            this.$swal.fire(
              `${this.$t("get_listed.dialog.title.fail")}!`,
              message,
              "error"
            );

            
          
          });
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

    getStakeholderById(id) {
      return getStakeholderById(id);
    },
  },
  mounted() {
    this.getIndustry({ params: { page_size: 999 } });
    this.getExpertise({ params: { page_size: 999 } });
  },
  computed: {
    ...mapState("interest", { interestList: "dataList" }),
    ...mapState("industry", { industryList: "dataList" }),
    ...mapState("expertise", { expertiseList: "dataList" }),
  },
};
</script>
<style scoped>
.centered-input >>> * {
  text-align: center
}
</style>
