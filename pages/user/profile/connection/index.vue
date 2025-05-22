<template>
  <v-card
    outlined
    rounded="lg"
  >

    <v-card-title>
      <span class="text-h6 font-weight-bold">{{$t('user.connection.tab.title')}}</span>
      <v-spacer></v-spacer>
      <v-btn
        class="text-none d-none"
        small
        text
      >See all</v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col
          v-for="item in connectionList"
          :key="item.id"
          cols="12"
          sm="6"
          lg="4"
        >
          <CardUserConnection
            :to="`/user/${item.id}`"
            :username="getUsername(item)"
            :user-profile="item.photo_thumbnail"
            :occupation="item.occupation"
            @disconnect-user="disconnectUser(item.id)"
          />

        </v-col>
        <v-col v-if="connectionList.length==0">
          <CardNoNotification
              :visible="connectionList.length==0"
              :card-text="$t('user.connection.message.no_connection')"
              :btn-text="$t('user.connection.button.start_connecting')"
              btn-link="/ecosystem"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import error from "@/layouts/error";

export default {
  name: "PageConnection",
  methods: {
    ...mapActions("my-connection", { getDataRecords: "get", deleteConnection: "delete" }),
    disconnectUser(userId){
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
                  this.deleteConnection({id:userId}).then((response)=>{
                    this.$swal.fire("Success!", "", "success");
                    this.listConnection();
                  }).catch((error)=>{
                    this.$swal.fire(
                        "Error!",
                        "Something went wrong. Please try again.",
                        "error"
                    );
                  })
                }
        })

    },
    listConnection(){
      this.getDataRecords({
        params: { page_size: 999 },
      }).then((res)=>{
        this.connectionList = Object.assign([], res.data);
      });
    },
    getUsername(item = {}) {
      const { first_name, first_name_kh, last_name, last_name_kh } = item;
      if (!this.$isKm()) return [first_name, last_name].join(" ");
      return [first_name_kh || first_name, last_name_kh || last_name].join(" ");
    },

  },
  data(){
    return{
      connectionList:[]
    }
  },
  mounted() {
   this.listConnection();
  },
};
</script>

<style>
</style>
