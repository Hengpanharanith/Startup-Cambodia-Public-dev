<template>
  <v-card
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
            <v-img
                :src="userProfile"
                alt=""
                cover
            />
          </v-avatar>
        </v-col>
        <v-col class="flex-grow-1 text-center text-sm-left">
          <p class="ma-0 text--primary blog-one__title">{{requestType == 'received' ? `${item.stakeholder.name}`:`${item.to_user.first_name+' '+item.to_user.last_name}`}} </p>
          <p v-if="requestType=='received'" class="ma-0">
            <span v-if="item.invite_type === 'startup'">
              Would like to invite your startup
              <nuxt-link :to="'/ecosystem/discover/category/startup/'+item.to_stakeholder?.id">
                {{item.to_stakeholder?.name}}
              </nuxt-link>

              as Notable Startup in their ESO profile

              <nuxt-link :to="'/ecosystem/discover/category/eso/'+item.stakeholder.id">{{$t('user.connection.button.view_profile')}}</nuxt-link>
            </span>
            <span v-else>
              {{description}} <nuxt-link :to="`/ecosystem/discover/category/${stakeholderType}/`+item.stakeholder.id">{{$t('user.connection.button.view_profile')}}</nuxt-link>
            </span>
          </p>
          <p v-else>
            {{$t('user.connection.message.invited')}} <b>{{item.stakeholder.name}}</b>
          </p>
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
          <v-layout class="gap my-auto flex-row-reverse flex-sm-column justify-center">

            <v-btn
                width="100"
                outlined
                small
                @click="cancelRequestAction(1)"
            >{{$t('dialog.cancel')}}</v-btn>
          </v-layout>
        </v-col>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CardStakeholderConnection",
  props: {
    item: {type:Object,  default: () => {} },
    description: String,
    userProfile: { type: String, default: "/images/default-user.png" },
    requestType: String,
  },
  computed: {
    stakeholderType(){
      return this.item.type
    }
  },
  methods: {
    acceptRequestAction(){
      this.$emit('accept-request');
    },
    cancelRequestAction(requestId){
      this.$emit('cancel-request');
    },
    deleteRequestAction(requestId){
      this.$emit('delete-request');
    }
  },
};
</script>

<style>
</style>
