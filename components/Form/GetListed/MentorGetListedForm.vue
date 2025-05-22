<template>
  <v-dialog
    v-model="dialog"
    width="70%"
    persistent
    id="dialogStartup"
    scrollable
    :fullscreen="$vuetify.breakpoint.smAndDown ? true : false"
  >
    <v-card>
      <v-toolbar
        color="primary"
        dark
        flat
      >
        <v-card-title> {{ $t("get_listed.mentor.title") }} </v-card-title>
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
          <v-stepper-header>
            <v-stepper-step
              :complete="stepper > 1"
              step="1"
            >
              {{ $t("get_listed.mentor.stepper.header.basic_info") }}
            </v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step step="2">
              {{
                $t("get_listed.mentor.stepper.header.verify_info")
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
                        v-model="editedItem.first_name"
                        ref="name"
                        :rules="$formRules.required"
                        required
                        :label="$t('get_listed.form.label.first_name')"
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
                        v-model="editedItem.last_name"
                        ref="name"
                        :rules="$formRules.required"
                        required
                        :label="$t('get_listed.form.label.last_name')"
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
                        v-model="editedItem.first_name_kh"
                        :rules="$formRules.textKm"
                        :label="$t('get_listed.form.label.first_name_kh')"
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
                        :rules="$formRules.textKm"
                        v-model="editedItem.last_name_kh"
                        :label="$t('get_listed.form.label.last_name_kh')"
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
                        v-model="editedItem.role"
                        ref="name"
                        :rules="$formRules.required"
                        required
                        :label="$t('get_listed.form.label.role')"
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
                        v-model="editedItem.company"
                        ref="name"
                        :rules="$formRules.required"
                        required
                        :label="$t('get_listed.form.label.company')"
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
                        v-model="editedItem.language_speak"
                        ref="language"
                        :rules="$formRules.required"
                        required
                        :label="$t('get_listed.form.label.language_speak')"
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
                        v-model="editedItem.interest"
                        ref="interest"
                        :rules="$formRules.required"
                        required
                        :label="$t('get_listed.form.label.interest')"
                        type="text"
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-combobox
                        outlined
                        multiple
                        ref="expertise"
                        :items="expertiseList"
                        v-model="editedItem.expertise"
                        :rules="$formRules.selectRequiredMin"
                        required
                        chips
                        :label="$t('get_listed.form.label.expertise')"
                        class="input-group--focused"
                        item-text="name"
                      ></v-combobox>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-combobox
                        outlined
                        multiple
                        ref="industry"
                        :items="industryList"
                        v-model="editedItem.industry"
                        :rules="$formRules.selectRequiredMin"
                        required
                        chips
                        :label="$t('get_listed.form.label.industry')"
                        class="input-group--focused"
                        item-text="name"
                      ></v-combobox>
                    </v-col>

                    <v-col cols="12">
                      <v-textarea
                        dense
                        outlined
                        v-model="editedItem.bio"
                        ref="bio"
                        :rules="$formRules.required"
                        required
                        :label="$t('get_listed.form.label.bio')"
                        type="text"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-stepper-content>

                <!-- summary -->
                <v-stepper-content step="2">
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
                      $t("get_listed.form.label.name_en")
                    }}</v-col>
                    <v-col cols="8">{{ editedItem.first_name }}
                      {{ editedItem.last_name }}</v-col>
                  </v-row>
                  <v-row v-if="editedItem.first_name_kh || editedItem.last_name_kh">
                    <v-col cols="4">{{
                      $t("get_listed.form.label.name")
                    }}</v-col>
                    <v-col cols="8">
                      <span v-if="editedItem.first_name_kh">{{
                        editedItem.first_name_kh
                      }}</span>
                      <span v-if="editedItem.last_name_kh">{{
                        editedItem.last_name_kh
                      }}</span>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="4">{{
                      $t("get_listed.form.label.role")
                    }}</v-col>
                    <v-col cols="8"> {{ editedItem.role }} </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="4">{{
                      $t("get_listed.form.label.company")
                    }}</v-col>
                    <v-col cols="8">
                      {{ editedItem.company }}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="4">{{
                      $t("get_listed.form.label.language_speak")
                    }}</v-col>
                    <v-col cols="8">
                      {{ editedItem.language_speak }}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="4">{{
                      $t("get_listed.form.label.interest")
                    }}</v-col>
                    <v-col cols="8">
                      {{ editedItem.interest }}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="4">{{
                      $t("get_listed.form.label.bio")
                    }}</v-col>
                    <v-col cols="8">
                      {{ editedItem.bio }}
                    </v-col>
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
                    <v-col cols="4">{{ $t("get_listed.form.label.fb_url") }}:</v-col>
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

                  <v-row v-if="editedItem.industry">
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
                  <v-row v-if="editedItem.expertise">
                    <v-col cols="4">{{
                      $t("get_listed.form.label.expertise")
                    }}</v-col>
                    <v-col cols="8">
                      <v-chip
                        class="mx-1"
                        small
                        v-for="s in editedItem.expertise"
                        v-bind:key="s.id"
                      >{{ s.name }}</v-chip>
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
          @click="stepper == 2 ? submitForm() : saveForm(stepper + 1)"
        >{{
            stepper == 2
              ? $t("get_listed.form.btn.submit")
              : $t("get_listed.form.btn.next")
          }}</v-btn>

        <!-- <v-btn
          class="pull-right mx-5 my-5"
          depressed
          color="primary"
          @click="submitForm()"
          >Submit</v-btn
        > -->
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
    submitForm() {
      const formData = new FormData();
      if (this.imageFile !== "") formData.append("profile", this.imageFile);
      else delete formData.delete("profile");

      formData.append("first_name", this.editedItem.first_name);
      formData.append("last_name", this.editedItem.last_name);
      formData.append("role", this.editedItem.role);
      formData.append("company", this.editedItem.company);
      formData.append("email", this.editedItem.email);
      formData.append("address", this.editedItem.address);
      formData.append("phone", this.editedItem.phone);
      formData.append("country_code", this.editedItem.country_code);
      formData.append("interest", this.editedItem.interest);
      formData.append("bio", this.editedItem.bio);
      formData.append("language_speak", this.editedItem.language_speak);

      if (this.editedItem.first_name_kh) {
        formData.append("first_name_kh", this.editedItem.first_name_kh);
      }
      if (this.editedItem.last_name_kh) {
        formData.append("last_name_kh", this.editedItem.last_name_kh);
      }
      if (this.editedItem.industry) {
        this.editedItem.industry.forEach((element) => {
          formData.append("industry", element.id);
        });
      }

      if (this.editedItem.expertise) {
        this.editedItem.expertise.forEach((element) => {
          formData.append("expertise", element.id);
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

      this.requestGetListed({
        stakeHolderType: "mentor",
        data: formData,
      })
        .then((res) => {
          //
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
  },
  computed: {
    ...mapState("interest", { interestList: "dataList" }),
    ...mapState("industry", { industryList: "dataList" }),
    ...mapState("expertise", { expertiseList: "dataList" }),
  },
};
</script>