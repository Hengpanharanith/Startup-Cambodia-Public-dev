<template>
  <v-dialog
      v-model="dialog"
      persistent
      scrollable
      width="768"
  >
    <v-card rounded="lg">
      <v-card-title flat>
        ESO Profile
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
      <v-stepper
          v-model="stepper"
          flat
      >
        <v-stepper-header class="elevation-0">
          <v-stepper-step
              :complete="stepper > 1"
              :step="1"
          >
            {{ $t("get_listed.label.get_started") }}
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
              :complete="stepper > 2"
              :step="2"
          >
            {{ $t("get_listed.startup.stepper.header.basic_info") }}
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
              :complete="stepper > 3"
              :step="3"
          >
            {{ $t("get_listed.startup.stepper.header.startup_info") }}
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :step="4">
            {{ $t("get_listed.startup.stepper.header.verify_info") }}
          </v-stepper-step>
        </v-stepper-header>
      </v-stepper>

      <v-card-text class="px-0">
        <v-stepper
            v-model="stepper"
            class="mx-auto"
            flat
        >
          <v-form ref="formESO"
                  id="formESO"
          >
            <v-stepper-items>
              <v-stepper-content :step="1">
                <v-text-field
                    v-model="editedItem.email"
                    :rules="$formRules.emailRequired"
                    type="email"
                    disabled
                    :hint="$t('startup.dialog_form.email_hint')"
                    prepend-inner-icon="mdi-email-outline"
                    persistent-hint
                    outlined
                    dense
                ></v-text-field>
              </v-stepper-content>
              <v-stepper-content :step="2">

                <v-layout
                    v-if="stepper == 2"
                    class="mb-4"
                    column
                >
                  <v-avatar
                      class="align-self-center mb-4"
                      size="110"
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
                      <span class="ml-8">{{ $t('get_listed.form.label.select_image') }}</span>
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
                  <v-col cols="12">
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
                        value="xxx"
                        outlined
                        dense
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
                      md="4"
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
                      md="4"
                  >
                    <v-text-field
                        dense
                        outlined
                        v-model="editedItem.linkedin_social_url"
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
                  >
                    <v-textarea
                        dense
                        outlined
                        v-model="editedItem.description"
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
                        v-model="editedItem.address"
                        ref="address"
                        :rules="$formRules.required"
                        required
                        rows="2"
                        :label="$t('get_listed.form.label.address')"
                        type="text"
                    ></v-textarea>
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
                        v-model="editedItem.date_incorporated"
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
                        v-model="editedItem.year_of_establishment"
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
                        :dense="!editedItem.industry"
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
                        :dense="!editedItem.looking_at"
                        multiple
                        :label="$t('get_listed.form.label.looking_at')"
                        class="input-group--focused"
                        :items="lookingAtList"
                        v-model="editedItem.looking_at"
                        item-text="value"
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
                        :dense="!editedItem.cohort_size"
                        :label="$t('get_listed.form.label.cohort_size')"
                        :items="cohortRangeList"
                        v-model="editedItem.cohort_size"
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
              </v-stepper-content>

              <v-stepper-content :step="4">
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
                    }}
                  </v-col>
                  <v-col cols="8">{{ editedItem.name }}</v-col>
                </v-row>

                <v-row v-if="editedItem.description">
                  <v-col cols="4">{{
                      $t("get_listed.form.label.desc")
                    }}
                  </v-col>
                  <v-col cols="8">{{ editedItem.description }}</v-col>
                </v-row>

                <v-row>
                  <v-col cols="4">{{
                      $t("get_listed.form.label.email")
                    }}
                  </v-col>
                  <v-col cols="8">{{ editedItem.email }}</v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">{{
                      $t("get_listed.form.label.phone_number")
                    }}
                  </v-col>
                  <v-col cols="8">{{ editedItem.country_code }}
                    {{ editedItem.phone }}
                  </v-col>
                </v-row>

                <v-row v-if="editedItem.website">
                  <v-col cols="4">{{
                      $t("get_listed.form.label.website")
                    }}
                  </v-col>
                  <v-col cols="8">{{ editedItem.website }}</v-col>
                </v-row>
                <v-row v-if="editedItem.fb_social_url">
                  <v-col cols="4">{{
                      $t("get_listed.form.label.fb_url")
                    }}
                  </v-col>
                  <v-col cols="8">{{ editedItem.fb_social_url }}</v-col>
                </v-row>
                <v-row v-if="editedItem.linkedin_social_ur">
                  <v-col cols="4">{{
                      $t("get_listed.form.label.linkedin_url")
                    }}
                  </v-col>
                  <v-col cols="8">{{ editedItem.linkedin_social_url }}</v-col>
                </v-row>

                <v-row v-if="editedItem.address">
                  <v-col cols="4">{{
                      $t("get_listed.form.label.address")
                    }}
                  </v-col>
                  <v-col cols="8">{{ editedItem.address }}</v-col>
                </v-row>

                <v-row v-if="editedItem.year_of_establishment">
                  <v-col cols="4">{{
                      $t("get_listed.form.label.year_establish")
                    }}
                  </v-col>
                  <v-col cols="8">{{
                      editedItem.year_of_establishment
                    }}
                  </v-col>
                </v-row>
                <v-row v-if="editedItem.date_incorporated">
                  <v-col cols="4">{{
                      $t("get_listed.form.label.date_incorporated")
                    }}
                  </v-col>
                  <v-col cols="8">{{ editedItem.date_incorporated }}</v-col>
                </v-row>
                <v-row v-if="editedItem.employee_range">
                  <v-col cols="4">{{
                      $t("get_listed.form.label.employee_range")
                    }}
                  </v-col>
                  <v-col cols="8">{{ editedItem.employee_range }} <span class="mx-1"></span> {{ $t("people") }}</v-col>
                </v-row>
                <v-row v-if="editedItem.number_of_founder">
                  <v-col cols="4">{{
                      $t("number_of_founders")
                    }}
                  </v-col>
                  <v-col cols="8">{{ editedItem.number_of_founder }} <span class="mx-1"></span> {{ $t("people") }}
                  </v-col>
                </v-row>
                <v-row v-if="editedItem.number_of_female">
                  <v-col cols="4">{{
                      $t("female_founders")
                    }}
                  </v-col>
                  <v-col cols="8">{{ editedItem.number_of_female }} <span class="mx-1"></span> {{ $t("people") }}
                  </v-col>
                </v-row>
                <v-row v-if="editedItem.number_of_tech_founder">
                  <v-col cols="4">{{
                      $t("tech_founders")
                    }}
                  </v-col>
                  <v-col cols="8">{{ editedItem.number_of_tech_founder }} <span class="mx-1"></span>{{ $t("people") }}
                  </v-col>
                </v-row>
                <v-row v-if="editedItem.industry && editedItem.industry.length">
                  <v-col cols="4">{{
                      $t("get_listed.form.label.industry")
                    }}
                  </v-col>
                  <v-col cols="8">
                    <v-chip
                        class="mx-1"
                        small
                        v-for="s in editedItem.industry"
                        v-bind:key="s.id"
                    >{{ s.name }}
                    </v-chip>
                  </v-col>
                </v-row>
                <v-row v-if="
                      editedItem.business_model &&
                      editedItem.business_model.length
                    ">
                  <v-col cols="4">{{
                      $t("get_listed.form.label.business_model")
                    }}
                  </v-col>
                  <v-col cols="8">
                    <v-chip
                        class="mx-1"
                        small
                        v-for="s in editedItem.business_model"
                        v-bind:key="s.id"
                    >{{ getBusinessModelById(s) }}
                    </v-chip>
                  </v-col>
                </v-row>
                <v-row v-if="editedItem.looking_at && editedItem.looking_at.length">
                  <v-col cols="4">{{
                      $t("get_listed.form.label.looking_at")
                    }}
                  </v-col>
                  <v-col cols="8">
                    <v-chip
                        class="mx-1"
                        small
                        v-for="s in editedItem.looking_at"
                        v-bind:key="s.key"
                    >{{ s.value }}
                    </v-chip>
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
            color="primary"
            outlined
        >
          {{ $t("get_listed.form.btn.back") }}
        </v-btn>
        <v-btn
            @click="stepper == 4 ? submitForm(editedItem.id) : saveForm(stepper + 1)"
            class="pull-right"
            color="primary"
            depressed
        >
          {{ stepper == 4 ? isMatched ? $t("get_listed.form.btn.claim") : $t("get_listed.form.btn.create") : $t("get_listed.form.btn.next") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapState, mapActions} from "vuex";
import Countries from "@/api/country_code";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import {LookingAt, getLookingAtById} from "@/api/looking_at";
import {BusinessModel, getBusinessModelById} from "@/api/business_model";
import {InvestorType, getInvestorTypeById} from "@/api/investor_type";
import {
  InvestmentStage,
  getInvestmentStageById,
} from "@/api/investment_stage";
import {StakeholderType, getStakeholderById} from "@/api/stakeholder_type.js";

export default {
  name: "DialogCreateESO",
  props: {
    visible: {type: Boolean, default: false},
    startupProfileId: {type: Number, default: 0},
  },
  components: {
    ButtonPrimary,
  },
  data() {
    return {
      editedItem: {
        country_code: '+855'
      },
      imageName: "",
      imageUrl: "",
      imageFile: "",
      countries: Countries,
      dialog: false,
      activeStep: 1,
      businessModels: BusinessModel,
      cohortRangeList: ["1-10", "11-20", "21-31", "31-50", "Above 50"],
      lookingAtList: LookingAt,
      investor_type: InvestorType,
      investment_stage: InvestmentStage,
      stakeholder_type: StakeholderType,
      stepper: 1,
      isMatched: false,
    };
  },
  methods: {
    ...mapActions("eso-profile", {
      createProfile: "createProfile",
      matchProfile: "matchingProfile",
    }),

    ...mapActions("stakeholder", ["claimRequest"]),

    openForm() {
      this.editedItem.email = this.currentUser.email || "";
      this.dialog = true;
    },
    saveForm(nextStep) {
      let valid = this.$refs.formESO.validate();

      if (!valid) return;

      if (this.stepper == 1) {
        this.fetchProfile();

        // return;
      } else {
        this.stepper = nextStep;
      }
    },
    fetchProfile() {
      // this.$store.dispatch.isLoading = true;
      const payload = {
        email: this.editedItem.email,
      };
      this.matchProfile(payload)
          .then((res) => {
            if (res) {
              this.editedItem = Object.assign({}, res);
              // this.status = res.data[0].status;
              // this.startupPages = res.data[0].startup_pages;
              // this.selecteProfileId = res.data[0].id;
              // this.showGreeting = false;
              // this.$router.replace("/user/profile/mentor/" + res.data[0].id);
              this.isMatched = true;
              this.stepper = 4;
            }
          })
          .catch((error) => {

            if (error.status == 404) {
              this.stepper += 1;
              this.isMatched = false;
            }
            // this.showGreeting = true;
          });
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
    closeForm() {
      this.dialog = false;
      this.activeElement = 0;
      this.stepper = 1;
      this.editedItem = {};
      this.imageName = "";
      this.imageUrl = "";
      this.imageFile = "";
      this.$refs.formESO.reset();
    },
    getLookingAtById(id) {
      return getLookingAtById(id);
    },

    submitForm(startupId = 0) {

      if (this.isMatched) {
        this._claimProfile(startupId);
      } else {
        // const formData = new FormData();

        this.sweetAlertLoading()


        const formData = new FormData();
        if (this.imageFile !== "") formData.append("logo", this.imageFile);
        else delete formData.delete("logo");

        formData.append("owner", this.currentUser.id);
        formData.append("name", this.editedItem.name);
        formData.append("email", this.editedItem.email);
        formData.append("address", this.editedItem.address);
        formData.append("phone", this.editedItem.phone);
        formData.append("country_code", this.editedItem.country_code);

        if (this.editedItem.description) {
          formData.append("description", this.editedItem.description);
        }

        if (this.editedItem.website) {
          formData.append("website", this.editedItem.website);
        }

        if (this.editedItem.linkedin_social_url) {
          formData.append("linkedin_social_url", this.editedItem.linkedin_social_url);
        }

        if (this.editedItem.fb_social_url) {
          formData.append("fb_social_url", this.editedItem.fb_social_url);
        }

        if (this.editedItem.year_of_establishment) {
          formData.append(
              "year_of_establishment",
              this.editedItem.year_of_establishment
          );
        }

        if (this.editedItem.date_incorporated) {
          formData.append("date_incorporated", this.editedItem.date_incorporated);
        }

        if (this.editedItem.cohort_size) {
          formData.append("cohort_size", this.editedItem.cohort_size);
        }

        
        if (this.editedItem.industry) {
          this.editedItem.industry.forEach((element) => {
            formData.append("industry", element.id);
          });
        }
        
        if (this.editedItem.looking_at) {
          this.editedItem.looking_at.forEach((element) => {
            formData.append("looking_at", element.key);
          });
        }

        this.createProfile(formData)
            .then((res) => {
              this.sweetAlertLoadingClose()

              this.$swal.fire(
                  `${this.$t("get_listed.dialog.title.success")}!`,
                  `${this.$t("get_listed.dialog.title.success.message")}`,
                  "success"
              );
              this.$emit("saved-update");
              this.closeForm();
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
      }

    },
    _claimProfile(id) {
      // 
      this.claimRequest({
        type: "eso",
        stakeholder: id,
        option: "claim",
      })
          .then((res) => {
            let message = res.message;
            this.$swal.fire(
                `${this.$t("get_listed.dialog.title.success")}!`,
                `${this.$t("get_listed.dialog.title.success.message")}`,
                "success"
            );

            this.$emit("saved-update");
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
  mounted() {

  },
  computed: {
    ...mapState("user", ["currentUser"]),
    ...mapState("interest", {interestList: "dataList"}),
    ...mapState("industry", {industryList: "dataList"}),
    ...mapState("expertise", {expertiseList: "dataList"}),
    ...mapState("eso-profile", ["isLoading", "getStartupProfile"]),
  },
};
</script>

<style scoped>
.centered-input >>> * {
  text-align: center
}
</style>
