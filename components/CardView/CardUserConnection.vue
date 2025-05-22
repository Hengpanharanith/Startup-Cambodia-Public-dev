<template>
  <v-card
    :to="to"
    class="mb-4"
    rounded="lg"
    outlined
  >
    <v-layout class="justify-center pt-6">
      <v-avatar size="75">
        <img
          :src="userProfile"
          alt=""
        >
      </v-avatar>
    </v-layout>
    <v-card-text class="text-center">
      <p class="ma-0 text--primary text-body-1">{{username}}</p>
      <p class="ma-0 line-clamp-2">{{occupation}}</p>
    </v-card-text>
    <v-card-actions class="justify-center pb-6" >
      <v-btn
        color="error"
        outlined
        elevation="0"
        width="150"
        max-width="100%"
        small
        @click.prevent="disconnectUser()"
      > {{$t('user.connection.button.disconnect')}}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "CardUserConnection",
  props: {
    to: { type: String, default: "" },
    username: String,
    bio: {type:String, default:""},
    occupation: {type:String, default:""},
    userProfile: { type: String, default: "/images/default-user.png" },
  },
  methods: {
    disconnectUser(){
      this.$emit("disconnect-user");
    }
  },
};
</script>

<style>
</style>
