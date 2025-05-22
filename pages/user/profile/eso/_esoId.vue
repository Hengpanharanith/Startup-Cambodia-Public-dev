<template>
  <main class="position-relative">
    <v-btn
      style="z-index: 1"
      absolute
      icon
      dark
      top
      left
      @click="$router.back()"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>

    <CardEsoProfile
      @edit="handleOpenEditESODialog(profile)"
      :thumbnail="profile.logo"
      :name="profile.name"
      :status="profile.status"
      :description="profile.description"
      :email="profile.email"
      :phone="phoneNumber"
      :address="profile.address"
      :website="profile.website"
      :industries="profile?.industry || []"
      :lookingAt="profile?.looking_at || []"
      :incorporatedDate="profile.date_incorporated"
      :establishYear="profile.year_of_establishment"
      :editable="editable"
      class="mb-4"
    />

    <CardEsoSectionMembers
      @updated="fetchStartupProfile()"
      :esoId="esoId"
      :isOwner="isOwner"
      :editable="editable && isOwner"
      :members="profile?.teams || []"
      :invitedMembers="profile?.invited_members || []"
    />

    <v-card class="mb-2" rounded="lg" outlined>
      <v-card-title>
        <span> {{ $t("eso_profile.program") }} </span>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!isApproved"
          color="primary"
          elevation
          outlined
          small
          class="text-capitalize"
          @click="handleOpenCreateESOProgramInfoDialog()"
        >
          <v-icon left>mdi-calendar-plus</v-icon>
          {{ $t("eso_profile.add_new_program") }}
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <p v-show="!esoProgramList.length" class="text-center">
          {{ $t("noData") }}
        </p>
        <v-row>
          <v-col
            cols="12"
            v-for="item in esoProgramList"
            :key="`eso-program-${item.id}`"
          >
            <CardViewESOProgram :item="item" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <FormEditESO ref="dialogEditESO" @saved-update="fetchStartupProfile" />

    <DialogESOProgramCreate ref="dialogCreateProgram" @saved-update="() => {}">
    </DialogESOProgramCreate>
  </main>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      dialogFundingStage: false,
      notFound: false,
      profile: {},
      editedFunding: {
        announced_date: "",
        amount_raise: 0,
        funding_type: "",
        source: "",
      },
    };
  },
  computed: {
    ...mapState("user", ["currentUser"]),
    ...mapState("eso-program", { esoProgramList: "dataList" }),

    esoId() {
      return this.$route.params.esoId;
    },
    isApproved() {
      return this.profile?.is_approved;
    },
    owner() {
      return this.profile?.owner || {};
    },
    programList() {
      return this.profile?.programs || [];
    },
    fundingStageList() {
      return this.profile?.funding_round_raises || [{}];
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
    editable() {
      return ["approved", "returned"].includes(this.profile?.status);
    },
    phoneNumber() {
      const { phone, country_code } = this.profile || {};
      if (!phone) return "";
      return `${country_code || "0"}${phone}`;
    },
  },
  watch: {},
  methods: {
    ...mapActions("eso", [
      "getById",
      "addStartupFunding",
      "deleteStartupFunding",
      "updateStartupFunding",
      "updateStartupMember",
    ]),
    ...mapActions("eso-program", {
      getProgram: "get",
    }),
    handleOpenEditESODialog(profile) {
      this.$refs.dialogEditESO.openForm(profile);
    },
    handleOpenCreateESOProgramInfoDialog() {
      this.$refs.dialogCreateProgram.openForm();
    },
    fetchStartupProfile() {
      return this.getById({ id: this.esoId })
        .then((res) => {
          this.profile = Object.assign({}, res);

          if (!this.editable) this.$refs.dialogEditProgramInfo.closeForm();
        })
        .catch((error) => {
          this.notFound = true;
        });
    },
  },
  async fetch() {
    await Promise.all([
      this.fetchStartupProfile(),
      this.getProgram({ params: { eso: this.esoId } }),
    ]);
  },
};
</script>

<style></style>
