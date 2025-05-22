<template>
  <v-list-item
    :to="to"
    class="mb-4 contact-message-item relative"
    rounded="lg"
    outlined
  >
    <v-list-item-avatar size="50">
      <img
        :src="userProfile"
        alt=""
      >
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{username}}</v-list-item-title>
      <v-list-item-subtitle>{{bio}}</v-list-item-subtitle>
      <span class="contact-message-item__last-seen right bottom">10:30pm</span>
    </v-list-item-content>
    <v-list-item-action v-if="!!unreadCount">
      <v-chip
        class="pa-1 mb-6"
        color="primary"
        small
      >{{unreadCount}}</v-chip>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: "CardContactMessage",
  props: {
    username: String,
    bio: String,
    to: String,
    unreadCount: [Number, String],
    userProfile: { type: String, default: "/images/default-user.png" },
  },
  methods: {},
};
</script>

<style>
.contact-message-item__last-seen {
  position: absolute;
  right: 2rem;
  bottom: 0.5rem;
  background: white;
  padding: 0.5rem;
}
</style>