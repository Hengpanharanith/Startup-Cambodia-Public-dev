<template>
  <div
    class="chat__body"
    id="chat__body"
  >
    <CardChatMessage
      v-for="(msg, index) in messageList"
      :key="index"
      :msg="msg"
      :prev="[index == 0 ? null : messageList[index - 1]]"
    >
    </CardChatMessage>
  </div>
</template>

<script>
export default {
  name: "ChatList",
  props: {
    messageList: { type: Array, default: () => [] },
  },
};
</script>

<style>
.chat__body {
  padding: 2rem;
  overflow: scroll;
  scroll-behavior: smooth;
}
.chat__body::-webkit-scrollbar {
  display: none;
}
</style>