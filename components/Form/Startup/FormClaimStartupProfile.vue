<template>
  <v-dialog
    v-model="dialog"
    width="768"
    persistent
    scrollable
  >
    <v-card rounded="lg">
      <v-card-title> {{$t('startup_profile.form.title.claim')}} <v-spacer></v-spacer>
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
        <v-layout class="py-1" >
          <v-alert  type="info"  border="left" color="primary" prominent outlined>

            <span v-html="
            $t('ecosystem.startup.detail.check_info_msg',
            {
            p1:`<b>${$t('ecosystem.startup.detail.request_claim')}</b>`,
            p2:`<b>${$t('ecosystem.startup.detail.profile_page')}</b>`,
            p3:`<b>${$t('ecosystem.startup.detail.startup_section')}</b>`}
            )"></span>


          </v-alert>
        </v-layout>
      </v-card-title>


      <v-divider></v-divider>
      <v-card-text>

        <v-layout
          v-if="imageUrl"
          justify-center
          class="py-4 mb-4"
        >

          <v-avatar size="150px">
            <v-img
              :src="this.imageUrl"
              alt="Profile"
            />
          </v-avatar>
        </v-layout>

        <v-row>
          <v-col cols="4">{{ $t("get_listed.form.label.name") }}</v-col>
          <v-col cols="8">{{ startupProfile.name }}</v-col>
        </v-row>

        <v-row v-if="startupProfile.description">
          <v-col cols="4">{{ $t("get_listed.form.label.desc") }}</v-col>
          <v-col cols="8">{{ startupProfile.description }}</v-col>
        </v-row>

        <v-row>
          <v-col cols="4">{{ $t("get_listed.form.label.email") }}</v-col>
          <v-col cols="8">{{ startupProfile.email }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="4">{{ $t("get_listed.form.label.phone_number") }}</v-col>
          <v-col cols="8">{{ startupProfile.country_code }}
            {{ startupProfile.phone }}</v-col>
        </v-row>

        <v-row v-if="startupProfile.website">
          <v-col cols="4">{{ $t("get_listed.form.label.website") }}</v-col>
          <v-col cols="8">{{ startupProfile.website }}</v-col>
        </v-row>
        <v-row v-if="startupProfile.fb_social_url">
          <v-col cols="4">{{ $t("get_listed.form.label.fb_url") }}</v-col>
          <v-col cols="8">{{ startupProfile.fb_social_url }}</v-col>
        </v-row>
        <v-row v-if="startupProfile.linkedin_social_ur">
          <v-col cols="4">{{
              $t("get_listed.form.label.linkedin_url")
            }}</v-col>
          <v-col cols="8">{{ startupProfile.linkedin_social_url }}</v-col>
        </v-row>

        <v-row v-if="startupProfile.address">
          <v-col cols="4">{{ $t("get_listed.form.label.address") }}</v-col>
          <v-col cols="8">{{ startupProfile.address }}</v-col>
        </v-row>

        <v-row v-if="startupProfile.year_of_establishment">
          <v-col cols="4">{{
              $t("get_listed.form.label.year_establish")
            }}</v-col>
          <v-col cols="8">{{ startupProfile.year_of_establishment }}</v-col>
        </v-row>
        <v-row v-if="startupProfile.date_incorporated">
          <v-col cols="4">{{
              $t("get_listed.form.label.date_incorporated")
            }}</v-col>
          <v-col cols="8">{{ startupProfile.date_incorporated }}</v-col>
        </v-row>
        <v-row v-if="startupProfile.employee_range">
          <v-col cols="4">{{
              $t("get_listed.form.label.employee_range")
            }}</v-col>
          <v-col cols="8">{{ startupProfile.employee_range }}</v-col>
        </v-row>
        <v-row v-if="startupProfile.industry && startupProfile.industry.length">
          <v-col cols="4">{{ $t("get_listed.form.label.industry") }}</v-col>
          <v-col cols="8">
            <v-chip
            class="mr-1 my-1"
              small
              v-for="s in startupProfile.industry"
              v-bind:key="s.id"
            >{{ s.name }}</v-chip>
          </v-col>
        </v-row>
        <v-row v-if="
              startupProfile.business_model &&
              startupProfile.business_model.length
            ">
          <v-col cols="4">{{
              $t("get_listed.form.label.business_model")
            }}</v-col>
          <v-col cols="8">
            <v-chip
              class="mr-1 my-1"
              small
              v-for="s in startupProfile.business_model"
              v-bind:key="s.id"
            >{{ getBusinessModelById(s) }}</v-chip>
          </v-col>
        </v-row>
        <v-row v-if="startupProfile.looking_at && startupProfile.looking_at.length">
          <v-col cols="4">{{ $t("get_listed.form.label.looking_at") }}</v-col>
          <v-col cols="8">
            <v-chip
            class="mr-1 my-1"
              small
              v-for="s in startupProfile.looking_at"
              v-bind:key="s.id"
            >{{ getLookingAtById(s) }}</v-chip>
          </v-col>
        </v-row>
        <!--          <v-row>-->
        <!--            <v-chip>-->
        <!--              {{ startupProfile.status }}-->
        <!--            </v-chip>-->
        <!--          </v-row>-->
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="_claimProfile"
          color="primary"
        >{{$t('ecosystem.startup.detail.request_claim')}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import {  mapActions } from "vuex";
import Countries from "@/api/country_code";
import { LookingAt, getLookingAtById } from "@/api/looking_at";
import { BusinessModel, getBusinessModelById } from "@/api/business_model";
import { InvestorType, getInvestorTypeById } from "@/api/investor_type";
import {
  InvestmentStage,
  getInvestmentStageById,
} from "@/api/investment_stage";
import { StakeholderType, getStakeholderById } from "@/api/stakeholder_type.js";
import ButtonPrimary from "@/components/Button/ButtonPrimary";

export default {
  name: "FormClaimStartupProfile",
  props: {
    // startupProfile: { type: Object, default: {} },
  },
  components: {
    ButtonPrimary,
  },
  data() {
    return {
      startupProfile: {},
      imageName: "",
      imageUrl: "",
      imageFile: "",
      dialog: false,
      countries: Countries,
      businessModels: BusinessModel,
      employeeRangeList: ["1-10", "11-50", "51-100", "Above 100"],

      lookingAtList: LookingAt,
      investor_type: InvestorType,
      investment_stage: InvestmentStage,
      stakeholder_type: StakeholderType,
    };
  },
  methods: {
    ...mapActions("stakeholder", ["claimRequest"]),
    openForm(profile) {
      this.startupProfile = this.$common.cloneJSON(profile);
      this.imageUrl = this.startupProfile.logo;
      this.dialog = true;
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
    _claimProfile() {
      

      this.$swal
          .fire({
            text: this.$t("ecosystem.startup.detail.claim.question"),
            type: "info",
            showCancelButton: true,
            reverseButtons: true,
            width: 400,
            cancelButtonColor: "#d33",
            cancelButtonText: this.$t("dialog.cancel"),
            confirmButtonText: this.$t("get_listed.form.btn.claim"),
          })
          .then((result) => {
            if (result.value) {
              this.claimRequest({
        type: "startup",
        stakeholder: this.startupProfile.id,
        option: "claim",
      })
        .then((res) => {
          let message = res.message;
          this.$swal.fire({
            type: "success",
            showConfirmButton: false,
            text: this.$t("ecosystem.startup.detail.claim.success"),
            timer: 1000
          });

          this.$emit("saved-update");
          this.closeForm();
        })
        .catch((error) => {
          const message = error.response.data.message || error;
          this.$swal.fire(this.$t("msg.failed"), message, "error");
        });
            }
          });


    
    },

    // UIs
    closeForm() {
      this.dialog = false;
    },
  },
};
</script>
