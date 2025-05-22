<template>
  <v-card
    :loading="isLoading"
    class="mb-6"
    rounded="lg"
    outlined
  >

    <v-card-title class="text-h6 font-weight-bold">
      <span>{{$t('route.user-profile-mentor')}}</span>
      <v-spacer></v-spacer>
      <v-btn
        @click="_editMentor(profile)"
       
        v-show="enableEdit"
        class="rounded-lg"
        color="primary"
        outlined
      >{{$t('edit')}}</v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-layout
        v-if="showGreeting"
        style="min-height: 23.25rem"
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
            <h4>{{ $t("are_you_mentor") }}</h4>
            <p>{{ $t("tap") }} <b>"{{ $t("request_profile") }}" </b>{{ $t("get_started") }}</p>
            <v-btn
              @click="_createMentor()"
              color="primary"
            >{{ $t("request_profile") }}</v-btn>
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
                :src="profile.profile"
                v-if="profile.profile"
              />
              <v-img
                src="/images/default-image.png"
                alt="Profile"
                v-else
              />
            </v-avatar>
          </v-flex>

          <v-row
            v-if="profile.status!=''"
            class="text-center pt-3"
          >
            <v-col cols="12">
              <v-chip class="text-uppercase" :color="statusColor">{{profile.status}}</v-chip>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">{{$t("get_listed.form.label.name_en")}}</v-col>
            <v-col cols="8">{{ profile.first_name }} {{ profile.last_name }}</v-col>
          </v-row>
          <v-row v-if="profile.first_name_kh || profile.last_name_kh">
            <v-col cols="4">{{$t("get_listed.form.label.name")}}</v-col>
            <v-col cols="8">
              <span v-if="profile.first_name_kh">{{profile.first_name_kh}}</span>
              <span v-if="profile.last_name_kh">{{profile.last_name_kh}}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">{{$t("get_listed.form.label.role")}}</v-col>
            <v-col cols="8"> {{ profile.role }} </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">{{$t("get_listed.form.label.company")}}</v-col>
            <v-col cols="8">{{ profile.company }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="4">{{$t("get_listed.form.label.language_speak")}}</v-col>
            <v-col cols="8">{{ profile.language_speak }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="4">{{$t("get_listed.form.label.interest")}}</v-col>
            <v-col cols="8">{{ profile.interest }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="4">{{$t("get_listed.form.label.bio")}}</v-col>
            <v-col cols="8">{{ profile.bio }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="4">{{$t("get_listed.form.label.email")}}</v-col>
            <v-col cols="8">{{ profile.email }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="4">{{$t("get_listed.form.label.phone_number")}}</v-col>
            <v-col cols="8">{{ profile.country_code }} {{ profile.phone }}</v-col>
          </v-row>
          <v-row v-if="profile.website">
            <v-col cols="4">{{$t("get_listed.form.label.website")}}</v-col>
            <v-col cols="8">{{ profile.website }}</v-col>
          </v-row>

          <v-row v-if="profile.fb_social_url">
            <v-col cols="4">{{ $t("get_listed.form.label.fb_url") }}:</v-col>
            <v-col cols="8">{{ profile.fb_social_url }}</v-col>
          </v-row>
          <v-row v-if="profile.linkedin_social_url">
            <v-col cols="4">{{$t("get_listed.form.label.linkedin_url")}}</v-col>
            <v-col cols="8">{{ profile.linkedin_social_url }}</v-col>
          </v-row>

          <v-row v-if="profile.year_of_establishment">
            <v-col cols="4">{{$t("get_listed.form.label.year_establish")}}</v-col>
            <v-col cols="8">{{profile.year_of_establishment}}</v-col>
          </v-row>

          <v-row v-if="profile.industry">
            <v-col cols="4">{{$t("get_listed.form.label.industry")}}</v-col>
            <v-col cols="8">
              <v-layout
                wrap
                style="gap:0.125rem"
              >
                <v-chip
                  small
                  v-for="s in profile.industry"
                  v-bind:key="'industry-'+s.id"
                >{{ s.name }}</v-chip>
              </v-layout>
            </v-col>
          </v-row>
          <v-row v-if="profile.expertise">
            <v-col cols="4">{{$t("get_listed.form.label.expertise")}}</v-col>
            <v-col cols="8">
              <v-layout
                wrap
                style="gap:0.125rem"
              >
                <v-chip
                  small
                  v-for="s in profile.expertise"
                  v-bind:key="'expertise=-'+s.id"
                >{{ s.name }}</v-chip>
              </v-layout>
            </v-col>
          </v-row>
          <v-row >
            <v-col cols="4">{{$t("previous_entrepreneur")}}</v-col>
            <v-col cols="8"><v-chip>{{profile.previous_entrepreneur ? $t("yes") : $t("no")}}</v-chip></v-col>
          </v-row>
          <v-row >
            <v-col cols="4">{{$t("is_investor")}}</v-col>
            <v-col cols="8"><v-chip>{{profile.investor ? $t("yes") : $t("no")}}</v-chip></v-col>
          </v-row>
          <v-row >
            <v-col cols="4">{{$t("previous_startup")}}</v-col>
            <v-col cols="8"><v-chip>{{profile.previous_startup ? $t("yes") : $t("no")}}</v-chip></v-col>
          </v-row>
        </v-container>

      </v-row>
      <FormCreateMentor
        ref="formCreateMentor"
        @saved-update="_readProfile"
      />

      <FormEditMentor
        ref="formEditMentor"
        @saved-update="_readProfile"
      />
    </v-card-text>
    <v-card-actions> </v-card-actions>
  </v-card>

</template>

<script>
import { mapState, mapActions } from "vuex";
import FormEditMentor from "@/components/Form/Mentor/FormEditMentor";
import FormCreateMentor from "@/components/Form/Mentor/FormCreateMentor";
export default {
  name: "PageMentorProfile",
  head: {
    title: "Mentor Profile",
  },
  components: {
    FormCreateMentor,
    FormEditMentor,
  },
  data() {
    return {
      status: "",
      startupPages: [],
      showGreeting: false,
      selecteProfileId: null,
      profile: {},
      dialogEmail: false,
      imageName: "",
      imageUrl: "",
      imageFile: "",
    };
  },
  computed: {
    ...mapState("mentor-profile", ["dataList", "isLoading"]),
    ...mapState("user", ["currentUser"]),
    // ...mapState("stakeholder", ["isLoading"]),
    ...mapState("static", ["languages"]),
    // ...mapState("user", ["isLoading", "currentUser"]),
    profileNameKh() {
      const { first_name_kh, last_name_kh } = this.currentProfile;
      if (!first_name_kh || !first_name_kh) return this.$t("n_a");
      return [first_name_kh, last_name_kh].join(" ");
    },

    profileNameEn() {
      const { first_name, last_name } = this.currentProfile;
      if (!first_name || !last_name) return this.$t("n_a");
      return [first_name, last_name].join(" ");
    },
    isActionEditProfile() {
      return ["approved", "denied"].includes(this.profile?.status);
    },
    isActionClaimProfile() {
      return this.profile?.status === "";
    },
    // _profileActionType(profile) {
    //   if (profile.status == "approved" || profile.status == )
    //     return [
    //       {
    //         text: "Edit",
    //         icon: "mdi-pencil",
    //         type: "edit",
    //       },
    //     ];
    //   if (profile.status == "")
    //     return [
    //       {
    //         text: "Claim",
    //         icon: "mdi-hand-back-right",
    //         type: "claim",
    //       },
    //     ];
    // },
    enableEdit(){
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

    // match profile

    // this.matchProfileAction();
  },

  methods: {
    ...mapActions("mentor-profile", { getMentors: "get" }),

    ...mapActions("stakeholder", {
      matchProfile: "matchProfile",
    }),

    ...mapActions("mentor-profile", {
      getProfile: "getMentorProfile",
      registerMentor: "create",
      updateMentor: "updatePartial",
    }),

    ...mapActions("stakeholder", {
      claimRequest: "claimRequest",
    }),

    _createMentor() {
      let email = this.currentUser.email;
      this.$refs.formCreateMentor.openForm(email);
    },

    async _readProfile() {
      this.getProfile()
        .then((res) => {
          if (res) {
            this.profile = Object.assign({}, res);
            this.showGreeting = false;
            if(!this.enableEdit) this.$refs.formEditMentor.closeForm();
          } else {
            this.showGreeting = true;
          }
        })
        .catch((error) => {
          
          this.showGreeting = true;
        });
    },

    // UIs
    resetForm(mentor) {
      if (!mentor) {
        this.editedItem = this.$common.cloneJSON(MentorProfile);
        return;
      }
      this.editedItem = this.$common.cloneJSON({
        ...mentor,
        photo: mentor.photo || "",
      });
      this.$refs.mentorFormObserver?.reset();
    },
    openEdit(item) {
      this.resetForm(item);
      this.showModal = true;
    },
    pickProfile(file) {
      this.profileImage = file;
      this.editedItem.photo = URL.createObjectURL(file);
    },
    phoneFormatter(value) {
      var input = value.replace(/\D/g, "");
      var size = input.length;

      if (size > 0) {
        input = "(" + input;
      }
      if (size > 1) {
        input = input.slice(0, 2) + ")" + input.slice(2, 11);
      }
      return input;
    },
    _viewMentor(profile) {
      this.$refs.formViewStartup.openForm(profile);
    },
    // APIs

    matchProfileAction() {
      let email = this.currentUser.email;
      //when form load check if existing profile
      // this.matchProfile({ email: email, type: "mentor" })
      //   .then((res) => {
      //     // this.loaded = false;
      //     // allow claim profile
      //     this.isClaimProfile = true;
      //     // this.editedItem = Object.assign({}, res);
      //   })
      //   .catch((error) => {
      //     // this.resetForm();
      //     // this.loaded = false;
      //     this.isClaimProfile = false;
      //   });
    },
    claimRequestAction() {
      this.claimRequest({ type: "mentor", id: this.currentUser.id })
        .then((res) => {
          let message = res.message;
          this.$swal.fire("", message, "success");
          // if(res.statusco)
        })
        .catch((error) => {
          const message = error.response.data.message || error;
          this.$swal.fire("Failed!", message, "error");
        });
    },
    getFilterMentors(page = 1) {
      this.getMentors()
        .then((res) => {
          this.currentProfile = Object.assign({}, res);
          this.isMentor = true;
          this.loaded = true;
        })
        .catch(() => {
          this.isMentor = false;
          this.loaded = true;
        });
    },
    addMentor() {
      this.$refs.formEditMentor.openEdit();
    },
    _editMentor() {
      
      this.$refs.formEditMentor.openForm(this.profile);
    },
    save() {
      this.$refs.mentorFormObserver.validate().then((valid) => {
        if (!valid) {
          setTimeout(() => {
            const errors = Object.entries(this.$refs.mentorFormObserver.errors)
              .map(([key, value]) => ({ key, value }))
              .filter((error) => error["value"].length);
            this.$refs.mentorFormObserver.refs[
              errors[0]["key"]
            ].$el.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 100);
          return;
        }

        const formData = {
          ...this.editedItem,
        };

        const { id } = this.editedItem;
        if (!id) {
          formData.user = this.currentUser.id;
          this.saveNew(formData);
          return;
        }
        delete formData.user;
        this.saveUpdate(id, formData);
        return;
      });
    },
    saveNew(payload) {
      this.registerMentor({ payload })
        .then((res) => {
          let message = this.$t("mentor.message.profile_requested");
          this.$swal.fire("", message, "success");
          this.$router.replace("/user/profile/mentor/" + res.id);
          this.showModal = false;
        })
        .catch((error) => {
          const message = error.response.data.message || error;
          this.$swal.fire(this.$t("msg.failed"), message, "error");
        });
    },
    saveUpdate(id, payload) {
      this.updateMentor({ id, payload })
        .then((res) => {
          let message = this.$t("mentor.message.profile_updated");
          this.$swal.fire("", message, "success");
          this.showModal = false;
          this.$emit("saved-update");
        })
        .catch((error) => {
          const message = error.response.data.message || error;
          this.$swal.fire(this.$t("msg.failed"), message, "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.mentor-info {
  position: relative;
  .mentor__edit {
    z-index: 10;
    font-size: 0.8rem;
  }
}
</style>
