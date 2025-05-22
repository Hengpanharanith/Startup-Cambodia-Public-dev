<template>
  <v-card :loading="isLoading" min-height="50vh" class="mb-6" rounded="lg" outlined>
    <v-card-title class="text-h6 font-weight-bold">
      <span>{{ $t('route.user-profile-startup') }}</span>
      <v-spacer></v-spacer>
      <v-btn v-if="!showGreeting" color="primary" outlined @click="_createStartup()">
        <v-icon>mdi-plus</v-icon>
        {{ $t('startup_profile.form.title.add') }}
      </v-btn>

      <v-menu
              
              :close-on-content-click="true"
              style="z-index: 100"
              offset-y
              left
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" class="rounded ml-2" icon>
                  <v-icon>mdi-tune-vertical</v-icon>
                </v-btn>
              </template>
              <v-list v-model="profileStatus" nav>
                <v-list-item
                  @click="changeFilter('all')"
                  :class="{ 'primary white--text': profileStatus == 'all' }"
                >
                  {{ $t("all") }}
                </v-list-item>
                <v-list-item
                  @click="changeFilter('approved')"
                  :class="{ 'primary white--text': profileStatus == 'approved' }"
                >
                {{ $t('user.profile.startup.filter.approved') }}
                </v-list-item>
                <v-list-item
                  @click="changeFilter('reviewing')"
                  :class="{ 'primary white--text': profileStatus == 'reviewing' }"
                >
                {{ $t('user.profile.startup.filter.reviewing') }}
                </v-list-item>
                <v-list-item
                  @click="changeFilter('returned')"
                  :class="{ 'primary white--text': profileStatus == 'returned' }"
                >
                {{ $t('user.profile.startup.filter.returned') }}
                </v-list-item>

                <v-list-item
                  @click="changeFilter('archived')"
                  :class="{ 'primary white--text': profileStatus == 'archived' }"
                >
                {{ $t('user.profile.startup.filter.archived') }}
                </v-list-item>
              </v-list>
            </v-menu>
    </v-card-title>
    <v-divider></v-divider>
   
   
    <v-card-text >
      <v-layout v-if="showGreeting" style="height: 20rem" justify-center align-center>

        <v-card class="text-center" flat>
          <v-card-text>
            <img src="~/assets/icons/info.png" height="75px" class="mb-4" alt="" />
            <h4>{{ $t("are_you_startup") }}</h4>
            <p>{{ $t("tap") }} <b>"{{ $t("request_profile") }}" </b>{{ $t("get_started") }}</p>

            <v-btn @click="_createStartup()" color="primary">{{ $t("request_profile") }}</v-btn>
          </v-card-text>
        </v-card>
      </v-layout>
      <v-row v-else>
        <v-col cols="12" sm="4" v-for="profile in profiles" :key="profile.id">
          <CardViewStartupReturn v-if="profile.status=='returned'" :to="`/user/profile/startup/${profile.id}`" :name="profile.name" :email="profile.email"
            :status="profile.status" :thumbnail="profile.logo" class="fill-height" @update="editStartupPageInfo(profile)" />
          <CardViewStartupVertical v-else :to="`/user/profile/startup/${profile.id}`" :name="profile.name" :email="profile.email"
            :status="profile.status" :thumbnail="profile.logo" class="fill-height"  />
          <!-- :userRole="profile.name" -->
        </v-col>
       <v-col cols="12" class="mx-auto">
        <CardNoItem :visible="!profiles.length" />
       </v-col>
      </v-row>
    </v-card-text>

    <!-- <v-divider></v-divider>
    <v-card-title>Invitation</v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          cols="3"
          v-for="item in 4"
          :key="item"
        >
          <v-card
            rounded="lg"
            outlined
          >
            <v-img
              src="/images/default-image.png"
              alt=""
              height="100"
            />
            <v-card-text class="text-center">
              <p class="mb-2"><strong>Startup-{{item}}</strong></p>
              <p class="mb-0">FinTech</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text> -->
    <div v-if="pendingRequests.length > 0">
      <v-divider></v-divider>
      <v-card-title>Claim Request</v-card-title>
      <v-card-text>
        <v-row>
          <v-col
              cols="12"
              v-for="pendingRequest in pendingRequests"
              :key="pendingRequest.id"
          >
            <v-card
                rounded="lg"
                outlined
                class="pa-3"
            >
              <div class="d-flex">
                <div>
                  <v-img
                      :src="pendingRequest.stakeholder?.logo || `/images/default-image.png`"
                      alt="logo"
                      width="100px"
                      :aspect-ratio="1/1"
                  />
                </div>
                <v-card-text class="text-start py-1">
                  <p class="mb-1 mt-1">
                    <strong>ESO - {{ pendingRequest.stakeholder?.name }}</strong>
                  </p>
                  <v-chip
                      v-if="!!pendingRequest.status"
                      :color="statusColor(pendingRequest.status)"
                      class="text-uppercase"
                      small
                  >
                    {{ pendingRequest.status == "" ? "Not claim" : pendingRequest.status }}
                  </v-chip>
                  <p class="mt-2 mb-0">{{pendingRequest.message || "You have submitted a claim request for this Startup profile, and it is currently under review."}}</p>
                </v-card-text>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </div>

    <FormCreateStartup ref="formCreateStartup" @saved-update="_readProfile" @mactch-profile="matchProfile" />

    <FormEditReturnStartup ref="formEditStartupPage" @saved-update="_readProfile" />
    

    <FormViewStartupProfile ref="formViewStartup" @saved-update="_readProfile" />
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import FormCreateStartup from "@/components/Form/Startup/FormCreateStartup";
import CardViewStartupVertical from "../../../../components/CardView/CardViewStartupVertical.vue";
import CardViewStartupReturn from "../../../../components/CardView/CardViewStartupReturn.vue";
export default {
  name: "PageStartupProfile",
  head: {
    title: "Startup Profile",
  },
  components: {
    FormCreateStartup,
    CardViewStartupVertical,
    CardViewStartupReturn
},


  data() {
    return {
      pendingRequests: [],
      selectedId: 0,
      status: "",
      startupPages: [],
      showGreeting: false,
      profiles: [],
      deniedProfiles: [
        { id: 1, name: "ABC", email: "abc@gmail.com", status: "denied", thumbnail: "http://localhost:3000/_ipx/s_175x42/main/startup-cambodia-logo.svg" }
      ],
      dialogEmail: false,
      showDeniedList: false,
    };
  },
  computed: {
    ...mapState("startup-profile", ["getStartupProfile", "isLoading"]),
    ...mapState("user", ["currentUser"]),
    ...mapActions("event", { getEvents: "get" }),
    ...mapActions("event", ["getSpotlights"]),
   
    profileStatus() {
      return this.$route.query.status || "all";
    },
    // profileStatus() {
    //   return [
    //     {
    //       text: "Active profiles",
    //       icon: "mdi-linkedin",
    //       type: "linkedin",
    //     },
    //     {
    //       text: "Denied profiles",
    //       icon: "mdi-cancel",
    //       type: "facebook",
    //     },]
    // }
  },

  async fetch() {
    await Promise.all([
      this._readProfile(),
      this.getIndustry({ params: { page_size: 999 } }),
      this.getExpertise({ params: { page_size: 999 } }),
      this.getLatestClaimRequest({params: {type: "startup"}}).then((response) => {
        this.pendingRequests = response.data.data
      })
    ]);
  },

  watch: {
    profileStatus() {
      // this.search.month_range = Object.assign([]);
    },
    currentPage: {
      immediate: true,
      handler(v) {
        this.handleFilter();
      },
    },
  },

  methods: {
    ...mapActions("industry", { getIndustry: "get" }),
    ...mapActions("expertise", { getExpertise: "get" }),
    ...mapActions("startup", {
      getProfile: "get",
      matchProfile: "matchingProfile",
      getById:"getById"
    }),
    ...mapActions("startupPage", [
      "setSelectedStartupPage",
      "deleteStartupPageById",
    ]),

    ...mapActions("user", ["getCurrentUser"]),

    ...mapActions("stakeholder", {getLatestClaimRequest: "getLatestClaimRequest"}),
    _createStartup() {
      this.$refs.formCreateStartup.openForm();
    },
    _editStartup(profile) {
      this.$refs.formEditStartup.openForm(profile);
    },
    _viewStartup(profile) {
      this.$refs.formViewStartup.openForm(profile);
    },
    _matchProfile() {
      const payload = {
        email: this.currentUser.email,
      };

      this.matchProfile(payload)
        .then((res) => {
          if (res) {
            this.profile = Object.assign({}, res);
            this.showGreeting = false;
          } else {
            this.showGreeting = true;
          }
        })
        .catch((error) => {

          this.showGreeting = true;
        });
    },
    async _readProfile(status, page=1) {
      
      return   this.getProfile({params:{status,page}})
        .then((res) => {
          this.$refs.formEditStartupPage.closeForm()
          this.profiles = Object.assign([], res.data);
          this.showGreeting = !this.profiles.length && this.profileStatus == 'all';
        })
        .catch((error) => {
          this.showGreeting = true;
        });
    },
    _deletePage(id) {
      this.deleteStartupPageById(id).then(() => {
        this.fetchProfile();
      });
    },

    _viewPage(item) {
      this.setSelectedStartupPage(item);
      this.$router.push("/user/profile/startup/" + item.id);
    },

    _claimStartupProfile(profile) {
      this.$refs.formClaimStartupProfile.openForm(profile);
    },
    changeFilter(status) {
      const { query } = this.$route;
      let page = this.currentPage;
      if (page > 1) page = undefined;
      this.$router.push({ query: { ...query, status, page } });
      setTimeout(() => {
        this.handleFilter();
      }, 200);
    },
    handleFilter() {
      const status = this.profileStatus;
      if (status == "all") return  this._readProfile();
      if (status == "approved") return  this._readProfile('approved');
      if (status == "returned") return  this._readProfile('returned');
      if (status == "reviewing") return this._readProfile('reviewing');
      if (status == "archived") return this._readProfile('denied');
      
      
      return this._readProfile();
    },


    _cardAction(type, profile) {
      switch (type) {
        case "claim":
          this._claimStartupProfile(profile);
          break;
        case "edit":
          this._editStartup(profile);
          break;
        case "view":
          this._viewStartup(profile);
        default:
          break;
      }
    },
    editStartupPageInfo(item){
      console.log("showUpdateDialog=====",item.id)
      this.getById({ id: item.id })
        .then((res) => {
          this.$refs.formEditStartupPage.openForm(res);
         
        })
        .catch((error) => {
          // this.notFound = true;
        });
     
    },
    statusColor(status) {
      var color = '';

      switch (status) {
        case 'reviewing':
          color = 'info'
          break;
        case 'denied':
          color = 'error'
          break;
        case 'approved':
          color = 'success'
          break;
        case 'returned':
          color = 'warning'
          break;
        default:
          color = 'secondary';
          break;
      }
      return color
    },
  },
};
</script>

<style>
.button-add-startup {
  pointer-events: visible;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.button-add-startup__wrapper {
  position: -webkit-sticky;
  position: sticky;
  bottom: 1rem;
  pointer-events: none;
}
</style>
