<template>
  <v-dialog
      @input="visibleChange()"
      :value="visible"
      width="40rem"
      persistent
      scrollable
  >
    <v-card
        :disabled="isLoading"
        rounded="lg"
        min-height="calc(50vh)"
    >
      <v-card-title>
        <span>{{ $t('startup_profile.member_invitation') }}</span>
        <v-spacer></v-spacer>
        <v-btn
            @click="visibleChange()"
            class="rounded-lg"
            icon
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-title class="gap">
        <v-text-field
            v-model="filter.email"
            class="rounded-lg"
            prepend-inner-icon="mdi-magnify"
            :placeholder="$t('enter_email')"
            hide-details
            outlined
            dense
        ></v-text-field>
        <v-btn
            @click="submitSearch"
            class="rounded-lg"
            color="primary"
            elevation="0"
            height="40"
        >{{ $t("form.common.label.search") }}
        </v-btn>
      </v-card-title>
      <v-card-text class="pt-4">
        <CardNoItem :visible="notFound"/>
        <v-card
            v-if="userInfo"
            rounded="lg"
            outlined
        >
          <v-layout
              align-center
              class="flex-column flex-sm-row"
          >
            <div class="flex-grow-0 flex-shrink-0 pa-4">
              <v-avatar size="75">
                <v-img
                    :src="userProfile"
                    alt="alt"
                    cover
                />
              </v-avatar>
            </div>
            <div class="flex-grow-1 text-center text-sm-left">
              <v-card-title class="pt-0" v-if="!!profileName">{{ profileName }}</v-card-title>
              <v-card-subtitle class="py-0">{{ profileEmail }}</v-card-subtitle>
              <v-card-subtitle
                  v-if="!!occupation"
                  class="py-2"
              >{{ occupation }}
              </v-card-subtitle>
            </div>
            <div class="pa-4">
              <v-btn
                  v-if="able2invited"
                  @click="makeInvitation"
                  :loading="requestingInvitation"
                  class="rounded-lg"
                  color="primary"
                  elevation="0"
              >{{ $t('invite') }}
              </v-btn>
              <v-btn
                  v-else
                  disabled
                  class="rounded-lg"
                  color="primary"
                  elevation="0"
              >
                <span v-if="approvedInvitation">{{ $t('member') }}</span>
                <span v-else>{{ $t('pending') }}</span>
              </v-btn>
            </div>
          </v-layout>
        </v-card>
<!--        <v-card v-show="!userInfo && !notFound" flat elevation="0">-->
<!--          Fill in your member email, inorder to invite.-->
<!--        </v-card>-->
      </v-card-text>

      <v-card-text class="pt-4" v-if="invitedMembers.length > 0">
        <div class="px-0 theme--light">Pending Invitation</div>
        <v-card
            v-for="item in invitedMembers"
            :key="item.id"
            rounded="lg"
            outlined
            class="mt-3"
        >
          <v-layout
              align-center
              class="flex-column flex-sm-row"
          >
            <div class="flex-grow-0 flex-shrink-0 pa-4">
              <v-avatar size="75">
                <v-img
                    :src="item.to_user?.photo"
                    alt="alt"
                    cover
                    style="background-color: #c6c6c6"
                />
              </v-avatar>
            </div>
            <div class="flex-grow-1 text-center text-sm-left">
              <v-card-title class="pt-0">{{ item.to_user?.first_name }} {{ item.to_user?.last_name }}</v-card-title>
              <v-card-subtitle class="py-0">{{ item.to_user?.email }}</v-card-subtitle>
              <v-card-subtitle class="py-0">
                <span style="color: #717171">
                  Invited Date : {{ item.created_at }}
                </span>

                </v-card-subtitle>
            </div>
            <div class="pa-4">
              <v-btn
                  disabled
                  class="rounded-lg"
                  color="primary"
                  elevation="0"
              >
                <span v-if="approvedInvitation">{{ $t('member') }}</span>
                <span v-else>{{ $t('pending') }}</span>
              </v-btn>
            </div>
          </v-layout>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "DialogStartupMemberInvitation",
  props: {
    visible: Boolean,
    detail: Object,
    stakeholderId: [String, Number],
    invitedMembers: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      requestingInvitation: false,
      isLoading: false,
      notFound: false,
      filter: {
        email: "",
      },
      userInfo: null,
    };
  },

  computed: {
    userProfile() {
      return this.userInfo?.photo || "/images/default-user.png";
    },
    occupation() {
      return this.userInfo?.occupation;
    },
    profileName() {
      const {first_name, first_name_kh, last_name, last_name_kh} =
      this.userInfo || {};
      if (!this.$isKm()) return [first_name, last_name].join(" ");
      return [first_name_kh || first_name, last_name_kh || last_name].join(" ");
    },
    profileEmail() {
      return this.userInfo.email;
    },
    able2invited() {
      return !this.userInfo?.invite_request_status;
    },
    approvedInvitation() {
      return this.userInfo?.invite_request_status == "approved";
    },
  },
  methods: {
    ...mapActions("eso", ["invitedMember"]),
    visibleChange(v = false) {
      if (!v) {
        this.filter.email = "";
        this.userInfo = null;
        this.notFound = false;
      }
      this.$emit("update:visible", v);
    },
    submitSearch() {

      this.notFound = false;
      this.isLoading = true;
      const params = {email: this.filter.email, stakeholder_id: this.stakeholderId};
      this.$axios
          .$get("/api/v1/eso/invite-team/", {params})
          .then((res) => {
            this.userInfo = Object.assign({}, res);
            this.isLoading = false;
          })
          .catch((e) => {
            this.userInfo = null;
            this.isLoading = false;
            this.notFound = true;
          });
    },
    makeInvitation() {
      this.requestingInvitation = true;
      const payload = {
        to_user: this.userInfo.id,
        stakeholder_id: this.stakeholderId,
      };
      this.invitedMember(payload)
          .then((res) => {
            this.requestingInvitation = false;

            const Toast = this.$swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            });
            Toast.fire("", this.$t("get_listed.dialog.title.success"), "success");
            this.$emit('fetch-profile');
            this.submitSearch();
          })
          .catch((error) => {
            this.requestingInvitation = false;
            const message = error.response.data.message || error;
            this.$swal.fire(
                `${this.$t("get_listed.dialog.title.fail")}!`,
                message,
                "error"
            );
          });
    },
  },
};
</script>

<style lang="sass">
.quill-editor
  p
    margin-bottom: .25rem

  img
    max-width: 100%

  .v-expansion-panel-content__wrap
    padding: .5rem
</style>
