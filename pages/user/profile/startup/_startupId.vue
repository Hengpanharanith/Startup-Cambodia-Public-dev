<template>
  <v-card min-height="650" class="mb-2" rounded="lg" outlined>

   

   
    <v-card-title>
      <v-btn color="secondary" text x-large @click="$router.back()"><v-icon>mdi-chevron-left</v-icon> {{ profile?.name }}</v-btn>
      <!-- {{ $t("startup.info") }} -->
      <v-spacer></v-spacer>
      
    
      <v-btn
        v-show="enableEdit "
        
        @click="editStartupPageInfo(profile)"
        
        
        color="primary"
        elevation
        outlined
      >
        <v-icon left  >mdi-pencil</v-icon>
        {{ $t("edit") }}
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    
    <v-layout>
     
      <div class="flex-grow-0 pa-4">
        <v-avatar size="100">
          <v-img :src="profile.logo" alt="" />
        </v-avatar>
      </div>
      <div class="flex-grow-1">
        <v-card-title class="font-weight-bold">
          <span>{{ profile.name }}</span>
          <v-spacer></v-spacer>
          <v-btn
            v-if="profile.status == 'approved'"
            :href="`/ecosystem/discover/category/startup/${profile.id}`"
            target="_blank"
            icon
            depressed
            ><v-icon>mdi-open-in-new</v-icon></v-btn
          >
        </v-card-title>
        <v-card-subtitle class="pb-2">
          <p class="my-3">
            <span
              >{{ $t("established") }}:
              <strong>{{
                profile.year_of_establishment || "N/A"
              }}</strong></span
            >
            <span class="mx-2"></span>
                       <span>Incorporated: <strong>{{incorporatedDate}}</strong></span>

            <span
              >{{ $t("employee_range") }}: <strong>{{ employeeRange }}</strong>
              {{ $t("people") }}</span
            >
            <span class="mx-2"></span>
            <span
              >{{ $t("number_of_founders") }}:
              <strong>{{ profile.number_of_founder }}</strong>
              {{ $t("people") }}</span
            >
            <span class="mx-2"></span>
            <span
              >({{ $t("female_founders") }}:
              <strong>{{ profile.number_of_female }}</strong>
              {{ $t("people") }},</span
            >
            <span
              >{{ $t("tech_founders") }}:
              <strong>{{ profile.number_of_tech_founder }}</strong>
              {{ $t("people") }})</span
            >
            <!--            <span>{{$t('female_founders')}}: <strong>{{profile.number_of_female}}</strong> {{$t('people')}}</span> <span class="mx-2"></span>-->
            <!--            <span>{{$t('tech_founders')}}: <strong>{{profile.number_of_tech_founder}}</strong> {{$t('people')}}</span>-->
          </p>
          <v-divider class="my-3"></v-divider>

          <div class="d-flex flex-wrap gap-sm py-1">
            {{ $t("industry") }}:
            <v-chip
             
              v-for="(item, key) in industryList"
              :key="`industry-${key}`"
              label
              small 
              class="font-weight-bold"
              color="#FEEBCA" 
              >{{ item.name }}</v-chip
            >
          </div>
          <div class="d-flex flex-wrap gap-sm py-1">
            <span>{{ $t("business") }}:</span>
            <v-chip
              class="text-uppercase font-weight-bold"
              v-for="(biz, key) in bizList"
              :key="`biz-${key}`"
              color="#FEEBCA"
              label
              small
              
              >{{ biz }}</v-chip
            >
          </div>
          <div
            class="d-flex flex-wrap gap-sm py-1"
            v-if="!!lookingAtList.length"
          >
            <span>{{ $t("looking_at") }}:</span>
            <v-chip
              v-for="(item, key) in lookingAtList"
              :key="`looking-at-${key}`"
              class="font-weight-bold text-capitalize"
              color="#FEEBCA"
              label
              small
              >{{ item.value }}</v-chip
            >
          </div>

          <v-divider class="my-3" v-if="profile.description"></v-divider>
          <div class="d-flex flex-wrap gap-sm py-1" v-if="profile.description">
            <span>{{ $t("description") }}:</span>
            <p>
              {{ profile.description }}
            </p>
          </div>
        </v-card-subtitle>
      </div>
    </v-layout>
    <v-divider></v-divider>
    <v-card-title>
      <span>{{ $t("member") }}</span>
      <v-spacer></v-spacer>
      <v-btn
        v-show="isOwner"
        @click="dialogInvitation = true"
        :disabled="!isApproved"
        color="primary"
        elevation
        outlined
      >
        <v-icon left>mdi-account-plus</v-icon>
        {{ $t("startup_profile.add_member") }}
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>

    <v-card-text>
      <p v-show="!memberList.length" class="text-center">
        {{ $t("noData") }}
      </p>
      <v-row v-if="isOwner">
       
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="item in memberList"
          :key="`member-${item.user?.id}`"
        >
        
          <CardViewStartupMember
            :to="`/ecosystem/discover/category/individuals/${item.user.id}`"
            :name="getUsername(item.user)"
            :position="item.user.occupation"
            :role="item.role"
            :thumbnail="item.user.photo_thumbnail"
            :is-owner="item.is_owner"
            :is-client-page="false"
            :show-delete="true"
            :member-id="item.id"
            class="fill-height"
            @delete-member="onDeleteMember"
            @edit-member="onEditMember(item)"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="(item, key) in invitedMemberList"
          :key="`invited-member-${key}`"
        >
      
          <CardViewStartupMember
            :to="`/ecosystem/discover/category/individuals/${item.to_user.id}`"
            :name="getUsername(item.to_user)"
            :position="item.to_user.occupation"
            :role="item.role"
            :thumbnail="item.to_user.photo_thumbnail || '/images/default-user.png'"
            :is-owner="item.is_owner"
            :is-client-page="false"
            :show-delete="true"
            :status="item.status"
            :member-id="item.id"
            class="fill-height"
            @delete-member="onDeleteMember"
          />
        </v-col>

      </v-row>
      <v-row v-else>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="item in memberList"
          :key="`member-${item.id}`"
        >
          <CardViewStartupMember
            :to="`/ecosystem/discover/category/individuals/${item.user?.id}`"
            :name="getUsername(item)"
            :position="item.occupation"
            :role="item.role"
            :thumbnail="item.user?.photo_thumbnail"
            :is-owner="item.is_owner"
            :is-client-page="false"
            :member-id="item.id"
            class="fill-height"
            @delete-member="onDeleteMember"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="(item, key) in invitedMemberList"
          :key="`invited-member-${key}`"
        >
          <CardViewStartupMember
            :to="`/ecosystem/discover/category/individuals/${item.to_user.id}`"
            :name="getUsername(item.to_user)"
            :position="item.to_user.occupation"
            :role="item.role"
            :thumbnail="item.to_user.photo || '/images/default-user.png'"
            :is-owner="item.is_owner"
            :is-client-page="false"
            :status="item.status"
            :member-id="item.id"
            class="fill-height"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-title>
      <span>{{ $t("user.profile.startup.funding_stages") }}</span>
      <v-spacer></v-spacer>
      <v-btn
        v-show="isOwner"
        @click="dialogFundingStage = true"
        :disabled="!isApproved"
        color="primary"
        elevation
        outlined
      >
        <v-icon left>mdi-plus</v-icon>
        {{ $t("user.profile.startup.add_funding") }}
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <TableUserStartupFundingStage
        @edit="onEditFunding"
        @remove="onDeleteFunding"
        :allowEdit="!isApproved"
        :data-list="fundingStageList"
      />
    </v-card-text>
    <DialogStartupMemberInvitation
      :visible.sync="dialogInvitation"
      :stakeholder-id="startupId"
      @fetch-profile="fetchStartupProfile()"
    />
    <DialogUserFundingStageEdit
      @save="onSaveFunding"
      :visible.sync="dialogFundingStage"
      :edited-item="editedFunding"
    />

    <DialogUserEditStartupMember
      @save="onSaveMember"
      :visible.sync="dialogEditStartupMember"
      :edited-item="editedMember"
    />

    <FormEditStartupInfo
      ref="formEditStartupPage"
      @saved-update="fetchStartupProfile"
    />
  </v-card>
</template>

<script>
import FormEditStartupInfo from "@/components/Form/Startup/FormEditStartupInfo";
import StartupInformationForm from "@/components/Form/Startup/StartupInformationForm";
import StartupTeamForm from "@/components/Form/Startup/StartupTeamForm";
import StartupFundingForm from "@/components/Form/Startup/StartupFundingForm";
import { mapActions, mapState } from "vuex";
import DialogUserEditStartupMember from "@/components/dialogs/DialogUserEditStartupMember.vue";

export default {
  components: {
    FormEditStartupInfo,
    StartupInformationForm,
    StartupTeamForm,
    StartupFundingForm,
    DialogUserEditStartupMember
},
  data() {
    return {
      dialogEditStartupMember: false,
      dialogFundingStage: false,
      dialogInvitation: false,
      notFound: false,
      profile: {},
      editedFunding: {
        announced_date: "",
        amount_raise: 0,
        funding_type: "",
        source: "",
      },
      editedMember:{
       
      }
    };
  },
  computed: {
    ...mapState("user", ["currentUser"]),
    startupId() {
      return this.$route.params.startupId;
    },
    isApproved() {
      return this.profile?.is_approved;
    },
    owner() {
      return this.profile?.owner || {};
    },
    memberList() {
      return this.profile?.team || [];
    },
    fundingStageList() {
      return this.profile?.funding_round_raises || [{}];
    },
    invitedMemberList() {
      return this.profile?.team_invited || [];
    },
    industryList() {
      return this.profile?.industry || [];
    },
    bizList() {
      return this.profile?.business_model || [];
    },
    lookingAtList() {
      
      return this.profile?.looking_at || [];
    },
    incorporatedDate() {
      const date = this.profile.date_incorporated;
      // if (!date)
      return date || "N/A";
    },
    employeeRange() {
      return this.profile.employee_range || "N/A";
    },
    isOwner() {
      return this.profile.owner?.id == this.currentUser.id;
    },

    enableEdit(){
      return ["approved", "returned"].includes(this.profile?.status);
    },
  },
  watch: {
    dialogFundingStage(visible) {
      if (visible) return;
      this.closeFormFunding();
    },
    dialogEditStartupMember(visible){
      if (visible) return;
      this.closeFormEditMember();
    }
  },
  methods: {
    ...mapActions("startup", [
      "getById",
      "addStartupFunding",
      "deleteStartupFunding",
      "updateStartupFunding",
      "updateStartupMember"
    ]),
    editStartupPageInfo(item) {
      
      this.$refs.formEditStartupPage.openForm(item);
    },

    getUsername(item = {}) {
      const { first_name, first_name_kh, last_name, last_name_kh } = item;
      if (!this.$isKm()) return [first_name, last_name].join(" ");
      return [first_name_kh || first_name, last_name_kh || last_name].join(" ");
    },
    fetchStartupProfile() {
      
      return this.getById({ id: this.startupId })
        .then((res) => {
          this.profile = Object.assign({}, res);
          
          if(!this.enableEdit) this.$refs.formEditStartupPage.closeForm();
        })
        .catch((error) => {
          this.notFound = true;
        });
    },
    onDeleteMember({ isReview, memberId }) {
      this.$swal
        .fire({
          type: "info",
          text: this.$t("startup.page.question.delete"),
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonText: this.$t("dialog.cancel"),
          confirmButtonText: this.$t("dialog.yes"),
          reverseButtons: true,
        })
        .then(({ value }) => {
          if (!value) return;

          let uri = isReview
            ? `/base-api/me/invite-team-request/${memberId}/?send_out=true`
            : `/base-api/startup/${this.startupId}/team/${memberId}`;

          this.$axios
            .delete(uri)
            .then((response) => {
              const _title = this.$t("common.deleted_successful");
              const Toast = this.$swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000
                  });
                Toast.fire("", _title, "success");
                    this.fetchStartupProfile();
                  })
            .catch((error) => {
              const _title = this.$t("common.error");
              this.$swal.fire(_title, error.toString(), "error");
            });
        });
    },
    onEditMember(item){
      
      this.editedMember = Object.assign({},item)
      this.dialogEditStartupMember = true;
    },
    onEditFunding(item) {
      this.editedFunding = Object.assign(
        {},
        {
          announced_date: item.announced_date || "",
          amount_raise: item.amount_raise || 0,
          funding_type: item.funding_type || "",
          source: item.source || "",
          id: item.id,
        }
      );
      this.dialogFundingStage = true;
    },
    onDeleteFunding(payload) {
      this.$swal
        .fire({
          type: "info",
          text: this.$t("message.user.profile.startup.confirm_delete_question"),
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonText: this.$t("dialog.cancel"),
          confirmButtonText: this.$t("dialog.yes"),
          reverseButtons: true,
        })
        .then(({ value }) => {
          if (!value) return;

          const id = this.startupId;
          this.deleteStartupFunding({ id, funding_id: payload.id })
            .then((response) => {
              const Toast = this.$swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000
                  });
          Toast.fire("", this.$t("common.deleted_successful"), "success");

              
              this.fetchStartupProfile();
            })
            .catch((error) => {
              const _title = this.$t("common.error");
              this.$swal.fire(_title, error.toString(), "error");
            });
        });
    },
    onSaveFunding(payload) {
      if (!payload.id) return this.onAddFunding(payload);
      return this.onUpdateFunding(payload);
    },
   
    onSaveMember(payload){
      console.log("onSaveMember",payload);
      const member = Object.assign({},payload);
      
      return this.onUpdateMember(member);
    },
    onUpdateMember(member){
      console.log("onUpdateMember",member)
      const id = this.startupId;
      var memberId = member.id;

      console.log("memberId",memberId)
      var payload = {"role":member.role};
      this.updateStartupMember({id, memberId, payload}).then((res)=>{
          const Toast = this.$swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000
                  });
          Toast.fire("", this.$t("user.profile.save_success"), "success");
          this.dialogFundingStage = false;
          this.fetchStartupProfile();
      }).catch((error) => {
          
        // const message = error.response?.data?.message || error;
        this.$swal.fire(this.$t("common.error"), error, "error");
      });

    },
    onAddFunding(payload) {
      const id = this.startupId;
      this.addStartupFunding({ id, payload })
        .then((res) => {
         
          const Toast = this.$swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000
                  });
          Toast.fire("", this.$t("user.profile.save_success"), "success");
          this.dialogFundingStage = false;
          this.fetchStartupProfile();
        })
        .catch((error) => {
          
          const message = error.response?.data?.message || error;
          this.$swal.fire(this.$t("common.error"), message, "error");
        });
    },
    onUpdateFunding(payload) {
      const id = this.startupId;
      this.updateStartupFunding({ id, funding_id: payload.id, payload })
        .then((res) => {
          const Toast = this.$swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000
                  });
          Toast.fire("", this.$t("user.profile.save_success"), "success");
          this.dialogFundingStage = false;
          this.fetchStartupProfile();
        })
        .catch((error) => {
          
          const message = error.response?.data?.message || error;
          this.$swal.fire(this.$t("common.error"), JSON.stringify(message), "error");
        });
    },
    closeFormFunding() {
      this.editedFunding = Object.assign(
        {},
        {
          announced_date: "",
          amount_raise: 0,
          funding_type: "",
          source: "",
        }
      );
    },
    closeFormEditMember() {
      // this.editedFunding = Object.assign(
      //   {},
      //   {
      //     announced_date: "",
      //     amount_raise: 0,
      //     funding_type: "",
      //     source: "",
      //   }
      // );
    },
  },
  async fetch() {
    await Promise.all([this.fetchStartupProfile()]);
  },
};
</script>

<style></style>
