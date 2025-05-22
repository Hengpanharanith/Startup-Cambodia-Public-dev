<template>
  <v-card
    :loading="isLoading"
    class="mb-6"
    rounded="lg"
    outlined
  >
    <v-card-title class="text-h6 font-weight-bold">
      {{$t('route.user-profile-investor')}}
      <v-spacer></v-spacer>
      <v-btn
        v-show="enableEdit"
        @click="_editInvestor(profile)"
        class="rounded-lg"
        color="primary"
        outlined
      >{{$t('edit')}}</v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-layout
        v-if="showGreeting"
        style="min-height: 23rem"
        justify-center
        align-center
      >
        <v-card
          class="text-center"
          flat
        >
          <v-card-text>
            <img
              src="~/assets/icons/info.png"
              height="75px"
              class="mb-4"
              alt=""
            />
            <h4>{{ $t("investor.interest_question") }}</h4>
            <p v-html="$t('investor.interest_action_title')">
            </p>

            <v-btn
              @click="_createInvestor()"
              color="primary"
            >
              {{ $t("request_profile") }}</v-btn>
          </v-card-text>
        </v-card>
      </v-layout>
      <v-row v-else>
        <v-container>
          <v-flex
              xs12
              class="
                      text-xs-center
                      text-sm-center
                      text-md-center
                      text-lg-center
                    "
          >
            <v-avatar
                size="150px"
                class="align-center"
            >
              <v-img
                  :src="profile.logo"
                  v-if="profile.logo"
              />
              <v-img
                  src="/images/default-image.png"
                  alt="Profile"
                  v-else
              />
            </v-avatar>
          </v-flex>

<!--          <v-row v-if="profile.status!=''">-->
<!--            <v-col-->
<!--              cols="4"-->
<!--              class="py-1"-->
<!--            >{{$t("form.common.label.status")}}</v-col>-->
<!--            <v-col-->
<!--              cols="8"-->
<!--              class="py-1"-->
<!--            >-->
<!--              <v-chip-->
<!--                class="text-uppercase"-->
<!--                small-->
<!--              >{{profile.status}}</v-chip>-->
<!--            </v-col>-->
<!--          </v-row>-->
          <v-row
              v-if="profile.status!=''"
              class="text-center pt-3"
          >
            <v-col cols="12">
              <v-chip class="text-uppercase" :color="statusColor">{{profile.status}}</v-chip>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">{{
               $t("get_listed.form.label.name")
             }}</v-col>
            <v-col cols="8">{{ profile.name }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="4">{{
                $t("description")
              }}</v-col>
            <v-col cols="8">{{ profile.description }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="4">{{
               $t("get_listed.form.label.email")
             }}</v-col>
            <v-col cols="8">{{ profile.email }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="4">{{
               $t("get_listed.form.label.phone_number")
             }}</v-col>
            <v-col cols="8">{{ profile.country_code }}
              {{ profile.phone }}</v-col>
          </v-row>
          <v-row v-if="profile.website">
            <v-col cols="4">{{
               $t("get_listed.form.label.website")
             }}</v-col>
            <v-col cols="8">{{ profile.website }}</v-col>
          </v-row>
          <v-row v-if="profile.fb_social_url">
            <v-col cols="4">{{
               $t("get_listed.form.label.fb_url")
             }}</v-col>
            <v-col cols="8">{{ profile.fb_social_url }}</v-col>
          </v-row>
          <v-row v-if="profile.linkedin_social_url">
            <v-col cols="4">{{
               $t("get_listed.form.label.linkedin_url")
             }}</v-col>
            <v-col cols="8">{{ profile.linkedin_social_url }}</v-col>
          </v-row>
          <v-row v-if="profile.year_of_establishment">
            <v-col cols="4">{{
               $t("get_listed.form.label.year_establish")
             }}</v-col>
            <v-col cols="8">{{
               profile.year_of_establishment
             }}</v-col>
          </v-row>
          <v-row v-if="profile.date_incorporated">
            <v-col cols="4">{{
               $t("get_listed.form.label.date_incorporated")
             }}</v-col>
            <v-col cols="8">{{ profile.date_incorporated }}</v-col>
          </v-row>
          <v-row v-if="profile.employee_range">
            <v-col cols="4">{{
               $t("get_listed.form.label.employee_range")
             }}</v-col>
            <v-col cols="8">{{ profile.employee_range }}</v-col>
          </v-row>
          <v-row v-if="profile.industry && profile.industry.length">
            <v-col cols="4">{{
               $t("get_listed.form.label.industry")
             }}</v-col>
            <v-col cols="8">
              <v-chip
                class="mx-1"
                small
                v-for="s in profile.industry"
                v-bind:key="s.id"
              >{{ s.name }}</v-chip>
            </v-col>
          </v-row>
          <v-row v-if="
                      profile.business_model &&
                      profile.business_model.length
                    ">
            <v-col cols="4">{{
               $t("get_listed.form.label.business_model")
             }}</v-col>
            <v-col cols="8">
              <v-chip
                class="mx-1"
                small
                v-for="s in profile.business_model"
                v-bind:key="s.id"
              >{{ getBusinessModelById(s) }}</v-chip>
            </v-col>
          </v-row>

          <v-row v-if="profile.investor_type">
            <v-col cols="4">{{
               $t("get_listed.form.label.investor_type")
             }}</v-col>
            <v-col cols="8">

              <v-layout
                wrap
                style="gap:0.125rem"
              >
                <v-chip small>{{getInvestorTypeById(profile.investor_type)}}</v-chip>
              </v-layout>
            </v-col>
          </v-row>

          <v-row v-if="
                      profile.investment_stage &&
                      profile.investment_stage.length
                    ">
            <v-col cols="4">{{$t("get_listed.form.label.investment_stage")}}</v-col>
            <v-col cols="8">

              <v-layout
                wrap
                style="gap:0.125rem"
              >
                <v-chip
                  small
                  v-for="s in profile.investment_stage"
                  v-bind:key="s"
                >{{ getInvestmentStageById(s)}}</v-chip>
              </v-layout>
            </v-col>
          </v-row>
        </v-container>

      </v-row>
    </v-card-text>
    <FormCreateInvestor
      ref="formCreateInvestor"
      @saved-update="_readProfile"
    />

    <FormEditInvestor
      ref="formEditInvestor"
      @saved-update="_readProfile"
    />
    <v-card-actions> </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import FormEditInvestor from "@/components/Form/Investor/FormEditInvestor";
import { getBusinessModelById } from "@/api/business_model";
import { getInvestorTypeById } from "@/api/investor_type";
import { getInvestmentStageById } from "@/api/investment_stage";
import { getStakeholderById } from "@/api/stakeholder_type";
export default {
  name: "PageInvestorProfile",
  head: {
    title: "Investor Profile",
  },
  components: {
    FormEditInvestor,
  },
  data() {
    return {
      status: "",
      startupPages: [],
      showGreeting: false,
      selecteProfileId: null,
      profile: {},
      dialogEmail: false,
    };
  },
  computed: {
    ...mapState("user", ["currentUser"]),
    ...mapState("investor-profile", ["dataList", "isLoading"]),
    
    enableEdit(){
      console.log(this.profile?.status)
      return ["approved", "denied", "returned"].includes(this.profile?.status);
    },
    statusColor(){
      var color = '';
      
      switch(this.profile.status){
        case 'reviewing':
          color = 'info'
          break;
        case 'denied':
          color = 'error'
          break;
        case 'approved':
          color = 'success'
          break;
        default:
          color = 'secondary';
          break;
      }
      return color
    }
  },
  mounted() {
    this._readProfile();
  },
  methods: {
    ...mapActions("interest", { getInterest: "get" }),
    ...mapActions("investor-profile", {
      getProfile: "getInvestorProfile",
      getInvestors: "get",
    }),

    // APIs
    _createInvestor() {
      let email = this.currentUser.email;
      this.$refs.formCreateInvestor.openForm(email);
    },

    async _readProfile() {
      this.getProfile()
        .then((res) => {
          if (res) {
            
            this.profile = Object.assign({}, res);
            this.showGreeting = false;
            if(!this.enableEdit) this.$refs.formEditInvestor.closeForm();
          } else {
            this.showGreeting = true;
          }
        })
        .catch((error) => {
          this.showGreeting = true;
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

    // UIs
    _editInvestor() {
      this.$refs.formEditInvestor.openForm(this.profile);
    },
  },
};
</script>

<style>
</style>
