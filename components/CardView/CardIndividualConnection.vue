<template>
  <v-card
      :to="profileURL"
    class="mb-4"
    rounded="lg"
    outlined
  >
    <v-card-text class="pa-0">
      <v-layout class="flex-nowrap flex-column flex-sm-row">
        <v-col class="flex-grow-0 flex-shrink-0 ">
          <v-avatar
            class="mx-auto d-block"
            size="65"
          >
            <img
              :src="profilePhotoURL"
              alt=""
            >
          </v-avatar>
        </v-col>
        <v-col class="flex-grow-1 text-center text-sm-left">
          <v-layout class="gap my-auto flex-row-reverse flex-sm-column justify-center" fill-height>

            <p class="ma-0 text--primary blog-one__title">{{requestType == 'received' ? `${item.created_by.first_name+' '+item.created_by.last_name}`:`${item.user.first_name+' '+item.user.last_name}`}} </p>

            <p  v-if="requestType=='received'">{{description}}</p>
          </v-layout>

        </v-col>
        <v-col class="flex-grow-0 flex-shrink-0" v-if="requestType == 'received'">
          <v-layout class="gap my-auto flex-row-reverse flex-sm-column justify-center">
            <v-btn
              color="primary"
              width="100"
              elevation="0"
              small
              @click.prevent="acceptRequestAction()"
            >{{$t('user.connection.button.accept')}}</v-btn>
            <v-btn
              width="100"
              outlined
              small
              @click.prevent="deleteRequestAction()"
            >{{$t('user.connection.button.ignore')}}</v-btn>
          </v-layout>
        </v-col>
        <v-col class="flex-grow-0 flex-shrink-0" v-else>
          <v-layout class="gap my-auto flex-row-reverse flex-sm-column justify-center" fill-height>

            <v-btn
                width="100"
                outlined
                small
                @click.prevent="cancelRequestAction()"
            >Cancel</v-btn>
          </v-layout>
        </v-col>

      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CardIndividualConnection",
  props: {
    item: {type:Object,  default: () => {} },
    description: String,
    userProfile: { type: String, default: "/images/default-user.png" },
    requestType: String,
    to: { type: String, default: "" },
  },
  methods: {
    acceptRequestAction(){
      this.$emit('accept-request');
    },
    cancelRequestAction(){
      this.$emit('cancel-request');
    },
    deleteRequestAction(){
      this.$emit('delete-request');
    }

  },
  computed:{
    profileURL(){
      return this.requestType=='received' ? `/user/${this.item.created_by?.id}` :`/user/${this.item.user?.id}`;
    },
    profilePhotoURL(){
      return this.requestType=='received' ? this.item.created_by.photo_thumbnail : this.item.user.photo_thumbnail;
    }

  }
};
</script>

<style>
</style>
