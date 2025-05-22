<template>
  <v-card
    outlined
    rounded="lg"
  >
    <v-card-title>Message</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-list>
        <CardContactMessage
          v-for="item in 5"
          :key="'item-'+item"
          username="Chan Lida"
          bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          user-profile="/images/default-image.png"
          :unreadCount="item-1"
          :to="`/user/profile/inbox/${item}`"
        />
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "PageInboxMessage",
};
</script>

<style>
</style>