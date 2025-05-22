<template>
  <div>
    
    <v-card
        class="flex-md-row my-4"
        rounded="lg"
        flat
    >
    <portal to="breadcrumb">
      <div class="py-1"></div>
      <BreadcrumbsAdvanced :breadcrumb-items="breadCrumbs" />
      <!-- <v-progress-linear
        v-show="isLoading"
        color="primary"
        indeterminate
      ></v-progress-linear> -->
    </portal>

      <v-layout
          class="flex-md-row align-stretch"
          align-center
          column
      >
        <v-layout
            class="flex-md-row align-center pa-4"
            column
        >
          <v-avatar size="120">
            <v-img :src="thumbnail"/>
          </v-avatar>
          <v-col class="mx-md-4 pa-0">
            <v-card-title class="text-break text-capitalize justify-center justify-md-start py-0">{{
                profileName
              }}
            </v-card-title>

            <v-card-title class="text-break text-capitalize justify-center justify-md-start text--secondary py-0"
                          style="font-size: 0.9rem;">{{ userInfo.occupation }}

            </v-card-title>
            <v-card-title class="text-break text-capitalize justify-center justify-md-start text--secondary py-0"
                          style="font-size: 0.9rem;">
              <span><strong>{{ $t('skills') }}:</strong></span>
              <div v-if="userInfo.skills && userInfo.skills.length !== 0">
                <v-chip


                    v-for="item in userInfo.skills"
                    :key="`skill-${item.name}`"
                    class="font-weight-normal text-capitalize mx-1 my-1"
                    color="orange lighten-4"
                    small
                ><span class="text-truncate">{{ item.name }}</span></v-chip>
              </div>
              <div v-else>
                <v-chip

                    class="font-weight-normal text-capitalize mx-1 my-1"
                    color="orange lighten-4">
                  {{ $t('n_a') }}
                </v-chip>
              </div>


            </v-card-title>

            <v-card-text class="text-center text-md-start">
              <v-btn
                  v-if="userInfo.fb_social_url"
                  :href="userInfo.fb_social_url"
                  target="_blank"
                  icon
              >
                <v-icon>mdi-facebook</v-icon>
              </v-btn>

              <v-btn
                  v-if="userInfo.linkedin_social_url"
                  :href="userInfo.linkedin_social_url"
                  target="_blank"
                  icon
              >
                <v-icon>mdi-linkedin</v-icon>
              </v-btn>

              <v-btn
                  v-if="userInfo.social_media_url"
                  :href="userInfo.social_media_url"
                  target="_blank"
                  icon
              >
                <v-icon>mdi-web</v-icon>
              </v-btn>
            </v-card-text>
          </v-col>
          <div
              v-if="!isOwner"
              class="mx-md-4 pa-0"
          >
            <v-btn
                v-if="connectionStatus=='pending'"
                @click="makeConnection"
                :loading="makingConnection"
                class="rounded-lg"
                elevation="0"
                color="primary"
                min-width="150"
                disabled
            >{{ $t('pending') }}
            </v-btn>
            <v-btn
                v-if="!connectionStatus"
                @click="makeConnection"
                :loading="makingConnection"
                class="rounded-lg"
                elevation="0"
                color="primary"
                min-width="150"
            >{{ $t('connect') }}
            </v-btn>
          </div>

        </v-layout>

      </v-layout>
      <v-card-text v-if="userInfo.bio">

        <h4 class="mb-2">{{ $t('bio') }}</h4>
        <p>{{ userInfo.bio }}</p>


        <!--        language_speak , interest, previous_entrepreneur, previous_startup, investor-->
        <div v-if="isMentor">
          <!--          <p>{{userInfo.mentor}}</p>-->
          <div class="d-flex flex-row align-md-center gap py-2">
            <div
                style="width:20rem;"
                class="flex-shrink-0"
            ><strong>{{ $t('interest') }}</strong></div>
            <div>{{ userInfo.mentor.interest }}</div>
          </div>
          <div class="d-flex flex-row  align-md-center gap py-2" v-if="userInfo.mentor.language_speak">
            <div
                style="width:20rem;"
                class="flex-shrink-0"
            ><strong>{{ $t('language') }}</strong></div>
            <div>
              <v-chip v-for="(item,key) in userInfo.mentor.language_speak.split(',')"
                      :key="`item-${key}`" class="mx-1 my-1"
              >{{ item }}
              </v-chip>
            </div>
          </div>

          <div class="d-flex flex-row align-md-center gap py-2">
            <div
                style="width:20rem;"
                class="flex-shrink-0"
            ><strong>{{ $t('previous_entrepreneur') }}</strong></div>
            <div>{{ userInfo.mentor.previous_entrepreneur ? $t("yes") : $t("no") }}</div>
          </div>
          <div class="d-flex flex-row align-md-center gap py-2">
            <div
                style="width:20rem;"
                class="flex-shrink-0"
            ><strong>{{ $t('previous_startup') }}</strong></div>
            <div>{{ userInfo.mentor.previous_startup ? $t("yes") : $t("no") }}</div>
          </div>

          <div class="d-flex flex-row align-md-center gap py-2">
            <div
                style="width:20rem;"
                class="flex-shrink-0"
            ><strong>{{ $t('is_investor') }}</strong></div>
            <div>{{ userInfo.mentor.investor ? $t("yes") : $t("no") }}</div>
          </div>

        </div>


      </v-card-text>
    </v-card>
    <!--    <v-expand-transition>-->
    <!--      <div v-if="isMentor">-->
    <!--        <v-card-->
    <!--          class="flex-md-row mb-4"-->
    <!--          rounded="lg"-->
    <!--          outlined-->
    <!--        >-->
    <!--          <v-card-title>-->
    <!--            <span>{{$t('mentor_info')}}</span>-->
    <!--            <v-spacer></v-spacer>-->
    <!--            &lt;!&ndash; <v-btn-->
    <!--              class="text-none"-->
    <!--              color="primary"-->
    <!--              text-->
    <!--            >See More</v-btn> &ndash;&gt;-->
    <!--          </v-card-title>-->
    <!--          <v-card-text class="text&#45;&#45;primary">-->
    <!--            &lt;!&ndash; <div class="d-flex flex-column flex-md-row align-md-center gap py-2">-->
    <!--              <div-->
    <!--                style=" width:200px"-->
    <!--                class="flex-shrink-0"-->
    <!--              ><strong>Bio</strong></div>-->
    <!--              <div>{{mentorName}}</div>-->
    <!--            </div> &ndash;&gt;-->
    <!--            <div class="d-flex flex-column flex-md-row align-md-center gap py-2">-->
    <!--              <div-->
    <!--                style=" width:200px"-->
    <!--                class="flex-shrink-0"-->
    <!--              ><strong>{{$t('role')}}</strong></div>-->
    <!--              <div>{{userInfo.mentor.role}}</div>-->
    <!--            </div>-->
    <!--            <div class="d-flex flex-column flex-md-row align-md-center gap py-2">-->
    <!--              <div-->
    <!--                style=" width:200px"-->
    <!--                class="flex-shrink-0"-->
    <!--              ><strong>{{$t('interested')}}</strong></div>-->
    <!--              <div>{{userInfo.mentor.interest}}</div>-->
    <!--            </div>-->
    <!--            <div class="d-flex flex-column flex-md-row align-md-center gap py-2">-->
    <!--              <div-->
    <!--                style=" width:200px"-->
    <!--                class="flex-shrink-0"-->
    <!--              ><strong>{{$t('expertise')}}</strong></div>-->
    <!--              <div class="d-flex gap-sm">-->
    <!--                <v-chip-->
    <!--                  v-for="item in [...expertiseList]"-->
    <!--                  :key="item.id"-->
    <!--                  label-->
    <!--                >{{item.name}}</v-chip>-->
    <!--                <div v-if="!expertiseList.length">N/A</div>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--          </v-card-text>-->
    <!--        </v-card>-->
    <!--      </div>-->
    <!--    </v-expand-transition>-->
    <v-expand-transition>
      <div v-if="hasStartup">
        <v-card
            class="flex-md-row mb-4"
            rounded="lg"
            flat
        >
          <v-card-title>
            <span>{{ $t('route.user-profile-startup') }}</span>
            <v-spacer></v-spacer>
            <!-- <v-btn
              class="text-none"
              color="primary"
              text
            >See More</v-btn> -->
          </v-card-title>
          <v-card-text class="text--primary">
            <v-row>
              <v-col
                  v-for="(item) in startupProfileList"
                  :key="`startup-${item.id}`"
                  cols="6"
                  md="4"
              >

                <CardViewStartupVertical
                    :to="`/ecosystem/discover/category/startup/${item.id}`"
                    :name="item.name"
                    :email="item.email"
                    :status="item.status"
                    :thumbnail="item.logo"

                />
              </v-col>
            </v-row>

          </v-card-text>
        </v-card>
      </div>
    </v-expand-transition>
    <v-expand-transition>
      <div v-if="hasInvestor">
        <v-card
            class="flex-md-row mb-4"
            rounded="lg"
            outlined
        >
          <v-card-title>
            <span>{{ $t("route.user-profile-investor") }}</span>
            <v-spacer></v-spacer>
            <!-- <v-btn
              class="text-none"
              color="primary"
              text
            >See More</v-btn> -->
          </v-card-title>
          <v-card-text class="text--primary">
            <v-row>
              <v-col
                  v-for="(item) in investorProfileList"
                  :key="`startup-${item.id}`"
                  cols="6"
                  sm="4"
                  md="3"
              >
                <CardViewInvestorVertical
                    :to="`/ecosystem/discover/category/investor/${item.id}`"
                    :item="item.id"
                    :thumbnail="item.logo||undefined"
                    :text-title="item.name"
                    :incorporated-at="item.date_incorporated"
                    :sectors="item.industry"
                    class="fill-height"
                />
              </v-col>
            </v-row>

          </v-card-text>
        </v-card>
      </div>
    </v-expand-transition>

  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  layout: "common",
  middleware: "authenticated",
  name: "PageIndividuals",
  data() {
    return {
      userInfo: {},
      notFound: false,
      makingConnection: false,
    };
  },
  computed: {
     breadCrumbs() {
      const crumbs = [
        { homePage: true, text: this.$t("breadcrumb.home"), to: "/" },
        { text: this.$t("breadcrumb.ecosystem"), to: "/ecosystem" },
        // {
        //   text: this.$t(`breadcrumb.network.investor`),
        //   to: `/ecosystem/discover/category/individual`,
        // },
        { text: this.$t("breadcrumb.individuals"), disable: true },
        
      ];

      

     
      return crumbs;
    },
    thumbnail() {
      return this.userInfo?.photo || "/images/default-user.png";
    },
    profileName() {
      const {first_name, first_name_kh, last_name, last_name_kh} =
          this.userInfo;
      if (!this.$isKm()) return [first_name, last_name].join(" ");
      return [first_name_kh || first_name, last_name_kh || last_name].join(" ") || "N/A";
    },
    mentorName() {
      const {first_name, first_name_kh, last_name, last_name_kh} =
      this.userInfo?.mentor || {};
      if (!this.$isKm()) return [first_name, last_name].join(" ");
      return [first_name_kh || first_name, last_name_kh || last_name].join(" ");
    },
    isMentor() {
      return !!this.userInfo?.mentor?.id;
    },
    startupProfileList() {
      return this.userInfo?.startups || [];
    },
    hasStartup() {
      return !!this.startupProfileList.length;
    },
    investorProfileList() {
      return this.userInfo?.investors || [];
    },
    hasInvestor() {
      return !!this.investorProfileList.length;
    },
    expertiseList() {
      return this.userInfo?.mentor?.expertise || [];
    },
    isOwner() {
      return !!this.userInfo?.is_owner;
    },
    connectionStatus() {
      return this.userInfo?.connection_request_status;
    },
  },
  methods: {
    ...mapActions("connection", {requestConnection: "create"}),
    ...mapActions("user", ["getUserInformation"]),
    getDetail() {
      
      const {individualsId: id} = this.$route.params;
      return this.getUserInformation({id}).then((res) => {
        
        this.userInfo = Object.assign({}, res);
      });
    },
    makeConnection() {
      const payload = {user: this.userInfo?.id};
      this.requestConnection({payload})
          .then((res) => {
            this.makingConnection = false;
            this.getDetail();
            this.$swal.fire(
                `${this.$t("get_listed.dialog.title.success")}!`, "",
                "success"
            );
          })
          .catch((error) => {
            this.makingConnection = false;
            const message = error.response.data.message || error;
            this.$swal.fire(
                `${this.$t("get_listed.dialog.title.fail")}!`,
                message,
                "error"
            );
          });
    },
  },
  
  async fetch() {
    await this.getDetail();
  },
};
</script>

<style>
</style>
