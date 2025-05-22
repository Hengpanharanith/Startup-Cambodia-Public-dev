<template>
  <div>
    <v-row
      no-gutters
      class="mb-4"
    >
      <v-col
        cols="12"
        sm="4"
      >
        <span class="text-capitalize text-muted">{{ $t("fullName") }}</span>
      </v-col>
      <v-col
        cols="12"
        sm="8"
      >
        <strong class="text-uppercase">{{ profileNameKh }} </strong>
      </v-col>
    </v-row>
    <v-row
      no-gutters
      class="mb-4"
    >
      <v-col
        cols="12"
        sm="4"
      >
        <span class="text-capitalize text-secondary">{{
          $t("fullName_latin")
        }}</span>
      </v-col>
      <v-col
        cols="12"
        sm="8"
      >
        <strong class="text-uppercase">{{ profileNameEn }}</strong>
      </v-col>
    </v-row>
    <v-row
      no-gutters
      class="mb-4"
    >
      <v-col
        cols="12"
        sm="4"
      >
        <span class="text-secondary">{{ $t("dob") }}</span>
      </v-col>
      <v-col
        cols="12"
        sm="8"
      >
        <strong class="mb-1">{{
          personalProfile.date_of_birth || $t("n_a")
        }}</strong>
      </v-col>
    </v-row>
    <v-row
      no-gutters
      class="mb-4"
    >
      <v-col
        cols="12"
        sm="4"
      >
        <span class="text-secondary">{{ $t("occupation") }}</span>
      </v-col>
      <v-col
        cols="12"
        sm="8"
      >
        <strong class="mb-1">{{ personalProfile.occupation || $t("n_a") }}</strong>
      </v-col>
    </v-row>
    <v-row
      no-gutters
      class="mb-4"
    >
      <v-col
        cols="12"
        sm="4"
      >
        <span class="text-secondary">{{ $t("gender") }}</span>
      </v-col>
      <v-col
        cols="12"
        sm="8"
      >
        <strong class="mb-1">{{
          personalProfile.gender == "m"
            ? $t("gender.m")
            : personalProfile.gender == "f"
            ? $t("gender.f")
            : $t("n_a")
        }}</strong>
      </v-col>
    </v-row>
    <v-row
      no-gutters
      class="mb-4"
    >

      <v-col
        cols="12"
        sm="4"
      >
        <span class="text-secondary">{{ $t("phone") }}</span>
      </v-col>
      <v-col
        cols="12"
        sm="8"
      >
        <strong class="mb-1">{{
          personalProfile.phone_number || $t("n_a")
        }}</strong>
      </v-col>
    </v-row>
    <v-row
      no-gutters
      class="mb-4"
    >
      <v-col
        cols="12"
        sm="4"
      >
        <span class="text-secondary">{{ $t("email") }}</span>
      </v-col>
      <v-col
        cols="12"
        sm="8"
      >
        <strong class="mb-1">{{ personalProfile.email || $t("n_a") }}</strong>
      </v-col>

    </v-row>
    <v-row
        no-gutters
        class="mb-4"
        v-if="personalProfile.skills && personalProfile.skills.length"
    >
      <v-col
          cols="12"
          sm="4"
      >
        <span class="text-secondary">{{ $t("skills") }}</span>
      </v-col>
      <v-col
          cols="12"
          sm="8"
      >
        <v-chip

            v-for="item in personalProfile.skills"
            :key="`skill-${item.name}`"
            class="font-weight-normal text-capitalize mx-1 mb-1"
            color="orange lighten-4"
            small
        ><span class="text-truncate">{{ item.name }}</span></v-chip>


      </v-col>

    </v-row>
    <v-row
        no-gutters
        class="mb-4"
    >
      <v-col
          cols="12"
          sm="4"
      >
        <span class="text-secondary">{{ $t("bio") }}</span>
      </v-col>
      <v-col
          cols="12"
          sm="8"
      >
        <p class="mb-1">{{ personalProfile.bio || $t("n_a") }}</p>
      </v-col>

    </v-row>
  </div>
</template>
<script>
export default {
  name: "PersonalProfileForm",
  props: {
    personalProfile: { type: Object, default: () => ({}) },
  },
  mounted() {
    // 
  },
  computed: {
    profileNameKh() {
      const { first_name_kh, last_name_kh } = this.personalProfile;
      if (!first_name_kh || !first_name_kh) return this.$t("n_a");
      return [first_name_kh, last_name_kh].join(" ");
    },
    profileNameEn() {
      const { first_name, last_name } = this.personalProfile;
      if (!first_name || !last_name) return this.$t("n_a");
      return [first_name, last_name].join(" ");
    },
  },
  methods: {
    getInterestOption(id) {
      return this.interestList.find((item) => item.id == id) || {};
    },
    editPersonalInfo() {
      this.$emit("edit", this.personalProfile);
    },
  },
};
</script>

<style lang="scss" scoped>
.fab-btn {
  top: 20;
  right: 0;
  position: absolute;
  margin: 0 16px 16px 16px;
}
// .investor-info {
//   position: relative;
//   .investor__edit {
//     position: absolute;
//     top: 0;
//     right: 0;
//     z-index: 1;
//     // height: 2.5rem;
//     font-size: 0.8rem;
//     // border-radius: 50%;
//   }
// }

.avatar-picker.profile-image {
  border-radius: 100%;
}
</style>
