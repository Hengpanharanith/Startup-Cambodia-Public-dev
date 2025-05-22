<template>
  <v-dialog
    v-model="dialog"
    width="768"
    scrollable
  >
    <v-card rounded="lg">
      <v-card-title>{{$t('startup_profile.form.title.your_pf')}}
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
      <v-card-text>
        <v-layout
          v-if="imageUrl"
          column
          align-center
          class="py-4"
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
          <v-card-subtitle>
            <v-chip
              color="primary"
              class="text-uppercase"
            >{{startupProfile.status}}</v-chip>
          </v-card-subtitle>
        </v-layout>

        <v-container>
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
                class="mx-1"
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
                class="mx-1"
                small
                v-for="s in startupProfile.business_model"
                v-bind:key="s.id"
              >{{ getBusinessModelById(s) }}</v-chip>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<script>
import { mapState, mapActions } from "vuex";
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
  name: "FormCreateStartup",
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

    // UIs
    closeForm() {
      this.dialog = false;
    },
  },
};
</script>
