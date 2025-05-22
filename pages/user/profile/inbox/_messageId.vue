<template>
  <v-card
    class="chat overflow-hidden"
    height="calc(100vh - 20.75rem)"
    rounded="lg"
    outlined
  >
    <v-card-title class="gap">
      <v-avatar color="grey lighten-4">
        <img
          src="/images/default-user.png"
          alt="alt"
        >
      </v-avatar>
      <span>Username</span>
    </v-card-title>
    <v-divider></v-divider>
    <ChatList :message-list="messageList" />

    <div>
      <v-divider></v-divider>
      <FormChatBar @submitMessage="sendMessage"></FormChatBar>
    </div>
  </v-card>

</template>

<script>
export default {
  name: "PageIndividualMessage",
  computed: {
    messageList() {
      return [
        {
          msg: "Hello world",
          from: {
            name: "duong",
            avatar: "/images/default-image.png",
          },
        },
        {
          msg: "Hello world",
          from: {
            name: "duong",
            avatar: "/images/default-image.png",
          },
        },
        {
          msg: "Hello world",
          from: {
            name: "duong2",
            avatar: "/images/default-image.png",
          },
        },
        {
          msg: "Hello world",
          from: {
            name: "DevplaCalledMe",
            avatar: "/images/default-image.png",
          },
        },
        {
          msg: "Hello world",
          from: {
            name: "DevplaCalledMe",
            avatar: "/images/default-image.png",
          },
        },
        {
          msg: "Hello world",
          from: {
            name: "DevplaCalledMe",
            avatar: "/images/default-image.png",
          },
        },
      ];
    },
  },
  methods: {
    sendMessage() {
      

      setTimeout(() => {
        const element = document.getElementById("chat__body");
        if (element) {
          element.scrollTop = element.scrollHeight;
        }
      }, 0);
    },
  },
  mounted() {
    setTimeout(() => {
      const element = document.getElementById("chat__body");
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    }, 0);
  },
};
</script>

<style>
.chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chat__header {
  background: #ffffff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);
  border-radius: 24px 24px 0px 0px;
  padding: 1.8rem;
  font-size: 16px;
  font-weight: 700;
}

.chat__header__greetings {
  color: #292929;
}
</style>