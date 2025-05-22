<template>
  <v-card
      :loading="isLoading"
      outlined
      rounded="lg"
  >
    <v-card-title class="text-h6 font-weight-bold">
      <span>{{ $t('notification') }}</span>
      <v-spacer></v-spacer>
      <v-menu
          v-if="filter.length"
          tile
          right
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn

              text
              class="align-self-center text-none"
              v-bind="attrs"
              v-on="on"
          >
            <v-icon dense class="align-self-center mr-4 text-none"
                    v-bind="attrs"
                    v-on="on">
              mdi-filter-variant
            </v-icon>
            {{ activeFilter.title }}

          </v-btn>
          <!--          <v-btn v-else text>-->

          <!--            <v-icon-->

          <!--                class="align-self-center mr-4 text-none"-->
          <!--                v-bind="attrs"-->
          <!--                v-on="on">-->
          <!--              mdi-filter-menu-outline-->
          <!--            </v-icon>-->
          <!--          </v-btn>-->
        </template>

        <v-list class="grey lighten-3 text">
          <v-list-item
              v-for="item in filter"
              :key="item.value"
              @click="onSelectedFilter(item)"
          >
            {{ item.title }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>

    <v-card-text>
      <v-tabs color="primary" icons-and-text show-arrows>
        <v-tab><span
            class="ml-2"><small>{{ $t('user.connection.tab.connection_request') }}{{ activeFilter.value == 'sent' ? "" : `(${connectionReqNotification})` }}</small></span>
          <v-icon dense>mdi-account-plus</v-icon>
        </v-tab>
        <v-tab><span
            class="ml-2"><small>{{ $t('user.connection.tab.invitation') }}{{ activeFilter.value == 'sent' ? "" : `(${teamInviteReqNotification})` }}</small></span>
          <v-icon dense>mdi-account-multiple-plus</v-icon>
        </v-tab>
        <v-spacer></v-spacer>


        <v-tab-item>
          <v-container fluid v-if="!isLoading">

            <!-- Individual connection tab-->
            <CardIndividualConnection
                v-for="item in individualRequestList"
                :key="item.id"
                :item="item"
                :description="$t('user.connection.message.received_request_connect')"
                :requestType="activeFilter.value"
                @accept-request="acceptIndividualRequest(item.id)"
                @delete-request="deleteIndividualRequest(item.id)"
                @cancel-request="cancelSentIndividualRequest(item.id)"
            />


          </v-container>
          <CardNoNotification
              :visible="individualRequestList.length==0"
              :card-text="$t('user.connection.message.no_invitation')"
              :btn-text="$t('user.connection.button.start_connecting')"
              btn-link="/ecosystem"

          />


        </v-tab-item>

        <v-tab-item>
          <v-container fluid v-if="!isLoading">
            <!--Stakeholder connection tab-->
            <CardStakeholderConnection
                v-for="item in stakeholderRequestList"
                :key="item.id"
                :item="item"
                :description="$t('user.connection.message.invite_to_join')"
                :user-profile="item.stakeholder.logo"
                :requestType="activeFilter.value"
                @accept-request="acceptStakeholderRequest(item)"
                @delete-request="deleteStakeholderRequest(item)"
                @cancel-request="cancelStakeholderRequest(item.id)"
            />
          </v-container>
          <CardNoNotification
              :visible="stakeholderRequestList.length==0"
              :card-text="$t('user.connection.message.no_invitation')"
              :btn-text="$t('user.connection.button.start_connecting')"
              btn-link="/ecosystem"

          />
        </v-tab-item>

      </v-tabs>

    </v-card-text>

  </v-card>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "PageConnection",
  data() {
    return {
      activeFilter: {title: this.$t('user.connection.filter.received_request'), value: "received"},
      filter: [
        {title: this.$t('user.connection.filter.sent_request'), value: "sent"},
        {title: this.$t('user.connection.filter.received_request'), value: "received"},

      ],

      select: {state: 'Received Request', abbr: 'receive'},
      items: [
        {state: 'Sent Request', abbr: 'send'},
        {state: 'Received Request', abbr: 'receive'},

      ],
      individualRequestList: [],
      stakeholderRequestList: [],
      isLoading: false,
    }
  },
  mounted() {
    // default receive
    this.listIndividualRequest(false);
    this.listStakeholderRequest(false);
  },
  methods: {
    ...mapActions("notification", ['getNotificationCount']),
    onSelectedFilter(item) {
      this.activeFilter = Object.assign({}, item)
    },
    listIndividualRequest(isSend) {
      this.isLoading = true
      this.$axios
          .$get(`/public/api/v1/me/connection-request?send_out=${isSend}`)
          .then((res) => {
            this.isLoading = false;
            this.individualRequestList = Object.assign([], res.data)
            this.getNotificationCount();
          })
          .catch(() => {
            this.isLoading = false;
          });
    },

    async listStakeholderRequest(isSend) {

      this.isLoading = true
      let tempNotification = []

      await this.$axios
          .$get(`/public/api/v1/me/invite-team-request?send_out=${isSend}`)
          .then((res) => {
            tempNotification = res.data.map(item => ({...item, invite_type: 'team'}));
          })

      await this.$axios
          .$get(`/public/api/v1/me/invite-startup-request?send_out=${isSend}`)
          .then((res) => {
            tempNotification = [...tempNotification, ...res.data.map(item => ({...item, invite_type: 'startup'}))]
          })
      this.getNotificationCount();
      this.stakeholderRequestList = tempNotification.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      this.isLoading = false;
    },
    acceptIndividualRequest(id) {
      // alert(`acceptIndividualRequest->${id}`)
      const payload = {
        status: 'approved'
      }
      this.$axios.patch(`/public/api/v1/me/connection-request/${id}/`, payload).then((response) => {
        this.$swal.fire(this.$t('success'), "", "success");
        this.listIndividualRequest(false)
      }).catch((error) => {
        this.$swal.fire(
            "Error!",
            "Something went wrong. Please try again.",
            "error"
        );
      })
    },
    deleteIndividualRequest(id) {
      const payload = {
        status: 'rejected'
      }
      this.$axios.delete(`/public/api/v1/me/connection-request/${id}/`).then((response) => {
        this.$swal.fire("Success!", response.data, "success");
        this.listIndividualRequest(false)
      }).catch((error) => {
        this.$swal.fire(
            "Error!",
            "Something went wrong. Please try again.",
            "error"
        );
      })
    },
    cancelSentIndividualRequest(id) {

      this.$swal
          .fire({
            text: this.$t("dialog.question.cancel_request"),
            type: "info",
            showCancelButton: true,
            reverseButtons: true,
            width: 400,
            confirmButtonColor: "#d33",
            cancelButtonText: this.$t("dialog.cancel"),
            confirmButtonText: this.$t("dialog.yes"),
          })
          .then((result) => {

            if (result.value) {
              this.$axios.delete(`/public/api/v1/me/connection-request/${id}/?send_out=true`).then((response) => {
                this.$swal.fire("Success!", response.data, "success");
                this.listIndividualRequest(false)
              }).catch((error) => {
                this.$swal.fire(
                    "Error!",
                    "Something went wrong. Please try again.",
                    "error"
                );
              })
            }

          });


    },
    acceptStakeholderRequest(item) {
      console.log(item)

      const payload = {
        status: 'approved',
        type: item.type
      }

      this.$axios.patch(`/public/api/v1/me/invite-${item.invite_type}-request/${item.id}/`, payload).then((response) => {
        this.$swal.fire(this.$t('success'), response.data, "success");
        this.listStakeholderRequest(false)
      }).catch((error) => {
        this.$swal.fire(
            "Error!",
            "Something went wrong. Please try again.",
            "error"
        );
      })
    },
    deleteStakeholderRequest(item) {
      const payload = {
        status: 'denied'
      }
      this.$axios.delete(`/public/api/v1/me/invite-${item.invite_type}-request/${item.id}/`).then((response) => {
        this.$swal.fire("Success!", response.data, "success");
        this.listStakeholderRequest(false)
      }).catch((error) => {
        this.$swal.fire(
            "Error!",
            "Something went wrong. Please try again.",
            "error"
        );
      })
    },
    cancelStakeholderRequest(id) {
      this.$swal
          .fire({
            text: this.$t("dialog.question.cancel_request"),
            type: "info",
            showCancelButton: true,
            reverseButtons: true,
            width: 400,
            confirmButtonColor: "#d33",
            cancelButtonText: this.$t("dialog.cancel"),
            confirmButtonText: this.$t("dialog.yes"),
          })
          .then((result) => {

            if (result.value) {
              this.$axios.delete(`/public/api/v1/me/invite-team-request/${id}/?send_out=true`).then((response) => {
                this.$swal.fire("Success!", response.data, "success");
                this.listStakeholderRequest(true)
              }).catch((error) => {
                this.$swal.fire(
                    "Error!",
                    "Something went wrong. Please try again.",
                    "error"
                );
              })
            }

          });
    },

  },
  watch: {
    activeFilter: {
      handler(val) {
        if (val.value == 'sent') {
          this.listIndividualRequest(true);
          this.listStakeholderRequest(true);
        } else {
          this.listIndividualRequest(false);
          this.listStakeholderRequest(false);
        }
      }
    }
  },
  computed: {
    ...mapState("notification", ["connectionReqNotification", "teamInviteReqNotification"]),
  }


};
</script>

<style>
</style>
