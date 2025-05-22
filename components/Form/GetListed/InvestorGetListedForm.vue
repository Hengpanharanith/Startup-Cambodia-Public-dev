<template>
  <v-dialog
    v-model="dialog"
    persistent
    width="70%"
    id="dialogStartup"
    :fullscreen="$vuetify.breakpoint.smAndDown ? true : false"
    scrollable
  >
    <v-card>
      <v-toolbar
        color="primary"
        flat
        dark
      >
        <v-card-title> {{ $t("get_listed.investor.title") }} </v-card-title>
        <v-spacer></v-spacer>
        <v-btn
          right
          icon
          dark
          @click="closeForm"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-actions>
        <v-stepper
          flat
          style="width: 80%"
          class="mx-auto"
        >
          <v-stepper-header class="elevation-0">
            <v-stepper-step
              :complete="stepper > 1"
              step="1"
            >
              {{ $t("get_listed.investor.stepper.header.basic_info") }}
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
              :complete="stepper > 2"
              step="2"
            >
              {{ $t("get_listed.investor.stepper.header.investment_info") }}
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">
              {{
                $t("get_listed.investor.stepper.header.verify_info")
              }}</v-stepper-step>
          </v-stepper-header>
        </v-stepper>
      </v-card-actions>
      <v-card-text>
        <v-container fluid>
          <!-- startup -->
          <v-stepper
            flat
            v-model="stepper"
            class="mx-auto"
          >
            <v-form ref="form">
              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-flex
                    xs12
                    class="
                      text-xs-center
                      text-sm-center
                      text-md-center
                      text-lg-center
                    "
                  >
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

                    <v-text-field
                      dense
                      :label="$t('get_listed.form.label.select_image')"
                      @click="pickFile"
                      v-model="imageName"
                      prepend-icon="mdi-file-image-plus"
                    ></v-text-field>
                    <input
                      type="file"
                      style="display: none"
                      ref="image"
                      accept="image/*"
                      @change="onFilePicked"
                    />
                  </v-flex>
                  <v-row v-if="stepper == 1">
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
                <v-stepper-content step="2">
                  <v-row
                    v-if="stepper == 2"
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
                        chips
                        outlined
                        multiple
                        ref="industry"
                        :items="industryList"
                        v-model="editedItem.industry"
                        :rules="$formRules.selectRequiredMin"
                        required
                        :label="$t('get_listed.form.label.industry')"
                        class="input-group--focused"
                        item-text="name"
                      ></v-combobox>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-autocomplete
                        chips
                        outlined
                        multiple
                        ref="business_model"
                        :rules="$formRules.selectRequiredMin"
                        required
                        :label="$t('get_listed.form.label.business_model')"
                        class="input-group--focused"
                        :items="businessModels"
                        item-text="name"
                        item-value="id"
                        v-model="editedItem.business_model"
                      ></v-autocomplete>
                    </v-col>
                    <!-- <v-col cols="12" md="6">
                                       <v-autocomplete dense outlined
                                        label="Looking At"
                                        class="input-group--focused"
                                        
                                        :items="lookingAtList"
                                        item-text="name"
                                        item-value="id"
                                        v-model="editedItem.looking_at"
                                        >
                                        </v-autocomplete>
                                  </v-col> -->
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

                <v-stepper-content step="3">
                  <v-flex
                    xs12
                    class="
                      text-xs-center
                      text-sm-center
                      text-md-center
                      text-lg-center
                    "
                    v-if="imageUrl"
                  >
                    <v-avatar
                      size="150px"
                      class="align-center"
                    >
                      <v-img
                        :src="this.imageUrl"
                        alt="Profile"
                      />
                    </v-avatar>
                  </v-flex>
                  <v-row>
                    <v-col cols="4">{{
                      $t("get_listed.form.label.name")
                    }}</v-col>
                    <v-col cols="8">{{ editedItem.name }}</v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="4">{{
                      $t("get_listed.form.label.email")
                    }}</v-col>
                    <v-col cols="8">{{ editedItem.email }}</v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="4">{{
                      $t("get_listed.form.label.phone")
                    }}</v-col>
                    <v-col cols="8">{{ editedItem.country_code }}
                      {{ editedItem.phone }}</v-col>
                  </v-row>
                  <v-row v-if="editedItem.website">
                    <v-col cols="4">{{
                      $t("get_listed.form.label.website")
                    }}</v-col>
                    <v-col cols="8">{{ editedItem.website }}</v-col>
                  </v-row>
                  <v-row v-if="editedItem.fb_social_url">
                    <v-col cols="4">{{
                      $t("get_listed.form.label.fb_url")
                    }}</v-col>
                    <v-col cols="8">{{ editedItem.fb_social_url }}</v-col>
                  </v-row>
                  <v-row v-if="editedItem.linkedin_social_url">
                    <v-col cols="4">{{
                      $t("get_listed.form.label.linkedin_url")
                    }}</v-col>
                    <v-col cols="8">{{ editedItem.linkedin_social_url }}</v-col>
                  </v-row>
                  <v-row v-if="editedItem.year_of_establishment">
                    <v-col cols="4">{{
                      $t("get_listed.form.label.year_establish")
                    }}</v-col>
                    <v-col cols="8">{{
                      editedItem.year_of_establishment
                    }}</v-col>
                  </v-row>
                  <v-row v-if="editedItem.date_incorporated">
                    <v-col cols="4">{{
                      $t("get_listed.form.label.date_incorporated")
                    }}</v-col>
                    <v-col cols="8">{{ editedItem.date_incorporated }}</v-col>
                  </v-row>
                  <v-row v-if="editedItem.employee_range">
                    <v-col cols="4">{{
                      $t("get_listed.form.label.employee_range")
                    }}</v-col>
                    <v-col cols="8">{{ editedItem.employee_range }}</v-col>
                  </v-row>
                  <v-row v-if="editedItem.industry && editedItem.industry.length">
                    <v-col cols="4">{{
                      $t("get_listed.form.label.industry")
                    }}</v-col>
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
                    <v-col cols="4">{{
                      $t("get_listed.form.label.business_model")
                    }}</v-col>
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
                    <v-col cols="4">{{
                      $t("get_listed.form.label.investor_type")
                    }}</v-col>
                    <v-col cols="8">
                      <v-chip small>{{
                        getInvestorTypeById(editedItem.investor_type)
                      }}</v-chip>
                    </v-col>
                  </v-row>

                  <v-row v-if="
                      editedItem.investment_stage &&
                      editedItem.investment_stage.length
                    ">
                    <v-col cols="4">{{
                      $t("get_listed.form.label.investment_stage")
                    }}</v-col>
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

          <!-- mentor -->
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          v-if="stepper != 1"
          text
          color="primary"
          @click="stepper -= 1"
          class="pull-right mx-5"
        >
          {{ $t("get_listed.form.btn.back") }}
        </v-btn>
        <v-btn
          class="pull-right mx-5"
          depressed
          color="primary"
          @click="stepper == 3 ? submitForm() : saveForm(stepper + 1)"
        >{{
            stepper == 3
              ? $t("get_listed.form.btn.submit")
              : $t("get_listed.form.btn.next")
          }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Countries from "@/api/country_code";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import { mapState, mapActions } from "vuex";
import { LookingAt, getLookingAtById } from "@/api/looking_at";
import { BusinessModel, getBusinessModelById } from "@/api/business_model";
import { InvestorType, getInvestorTypeById } from "@/api/investor_type";
import {
  InvestmentStage,
  getInvestmentStageById,
} from "@/api/investment_stage";
import { StakeholderType, getStakeholderById } from "@/api/stakeholder_type.js";

export default {
  components: {
    ButtonPrimary,
  },
  data() {
    return {
      editedItem: {},

      imageName: "",
      imageUrl: "",
      imageFile: "",
      countries: Countries,
      dialog: false,
      businessModels: BusinessModel,
      employeeRangeList: ["1-10", "11-50", "51-100", "Above 100"],
      lookingAtList: LookingAt,
      investor_type: InvestorType,
      investment_stage: InvestmentStage,
      stakeholder_type: StakeholderType,
      stepper: 1,
    };
  },
  // mounted() {
  //   this.getIndustry({ params: { page_size: 999 } });
  //   this.getExpertise({ params: { page_size: 999 } });
  // },
  methods: {
    ...mapActions("industry", { getIndustry: "get" }),
    ...mapActions("expertise", { getExpertise: "get" }),
    ...mapActions("get-listed", ["requestGetListed"]),

    openForm() {
      this.dialog = true;
    },
    saveForm(nextStep) {
      let valid = this.$refs.form.validate();

      if (!valid) return;
      this.stepper = nextStep;
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

      if (this.editedItem.year_of_establishment) {
        formData.append("date_incorporated", this.editedItem.date_incorporated);
      }
      if (this.editedItem.industry) {
        this.editedItem.industry.forEach((element) => {
          formData.append("industry", element.id);
        });
      }

      if (this.editedItem.looking_at) {
        this.editedItem.looking_at.forEach((element) => {
          formData.append("looking_at", element);
        });
      }

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

      this.requestGetListed({
        stakeHolderType: "investor",
        data: formData,
      })
        .then((res) => {
          this.$swal.fire(
            `${this.$t("get_listed.dialog.title.success")}!`,
            `${this.$t("get_listed.dialog.title.success.message")}`,
            "success"
          );
          this.closeForm();
        })
        .catch((error) => {
          const message = error.response.data.message || error;
          this.$swal.fire(
            `${this.$t("get_listed.dialog.title.fail")}!`,
            message,
            "error"
          );
        });
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
  computed: {
    ...mapState("interest", { interestList: "dataList" }),
    ...mapState("industry", { industryList: "dataList" }),
    ...mapState("expertise", { expertiseList: "dataList" }),
  },
};
</script>