<template>
  <v-card
    rounded="lg"
    outlined
    :loading="isLoading"
  >
    <v-card-title class="text-h6 font-weight-bold">
      <span>{{$t('personal_info')}}</span>
      <v-spacer></v-spacer>
      <v-btn
        @click="_editPersonalInfo"
        color="primary"
        class="rounded-lg"
        outlined
        icon
      >
        <v-icon small> mdi-pencil </v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>

    <v-card-text>
      <PersonalProfileForm :personalProfile="currentUser" />

      <FormEditPersonalInfo
        ref="formEditPersonalInfo"
        @saved-update="_getCurrentUser"
        :personalProfile="currentUser"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import PersonalProfileForm from "@/components/Form/Personal/PersonalProfileForm";
import FormEditPersonalInfo from "@/components/Form/Personal/FormEditPersonalInfo";
import { mapState, mapActions } from "vuex";
export default {
  name: "PageUserProfile",
  head: {
    title: "Bio",
  },
  layout: "common",
  components: {
    PersonalProfileForm,
    FormEditPersonalInfo,
  },
  data() {
    return {
      profile: {},
      tab: null,
      tabItems: [
        { tab: "One", content: "Tab 1 Content" },
        { tab: "Two", content: "Tab 2 Content" },
        { tab: "Three", content: "Tab 3 Content" },
      ],
    };
  },
  methods: {
    ...mapActions("user", ["getCurrentUser", "updateUserProfile"]),
    _editPersonalInfo() {
      
      this.$refs.formEditPersonalInfo.openEdit(this.currentUser);
    },
    _getCurrentUser() {
      this.getCurrentUser().then((res) => {

        
      });
    },
  },
  computed: {
    ...mapState("user", ["isLoading", "currentUser"]),

    userInfoView() {
      const { phone_number, email, gender, date_of_birth, occupation } =
        this.currentUser;
      const genderLabel = this.$t(`gender.${this.$t(gender)}`);
      return [
        { title: this.$t("occupation"), value: occupation || this.$t("n_a1") },
        { title: this.$t("gender"), value: genderLabel },
        { title: this.$t("dob"), value: date_of_birth },
        { title: this.$t("phone"), value: phone_number },
        { title: this.$t("email"), value: email },
      ];
    },
    currentRoute() {
      const { path } = this.$route;
      return path;
    },
  },
  mounted() {
    this._getCurrentUser();
  },
};
</script>

<style scoped>
</style>
