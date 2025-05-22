<template>
  <v-card
    class="investor-member__profile cursor-pointer p-0"
    @click="view"
  >
    <v-card-text class="d-flex flex-column flex-md-row">
      <v-avatar
        size="60"
        color="grey lighten-4"
      >
        <img
          :src="thumbnail"
          :alt="username||''"
        >
      </v-avatar>
      <div class="flex-fill my-4 text-center text-md-left m-md-auto px-3">
        <h6 class="title">{{username}}</h6>
        <p class="m-0">{{occupation}}</p>
      </div>
      <div class="m-auto">
        <v-btn
          @click="edit"
          color="primary"
          small
        >{{$t('edit')}}</v-btn>
        <v-btn
          @click="edit"
          outlined
          small
        >{{$t('delete')}}</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "CardInvestorMember",
  props: {
    username: String,
    occupation: String,
    hideEdit: Boolean,
    thumbnail: String,
  },
  computed: {
    profileShort() {
      return (this.username || "").slice(0, 2);
    },
  },
  methods: {
    view() {
      this.$emit("view");
    },
    edit() {
      this.$emit("edit");
    },
    remove() {
      this.$emit("remove");
    },
  },
};
</script>

<style>
.card.service-one__single {
  position: relative;
  box-shadow: none;
  -webkit-box-shadow: none;
}
.member-profile__image-wrapper .b-aspect-content {
  position: relative;
  color: white;
  font-weight: bold;
}

.member-profile__image-wrapper .b-aspect-content img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.investor-member__profile-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: 500ms;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  background-color: #00000078;
}

.member-profile__actions {
  background-color: #fff;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 16px;
}
.member-profile__actions:active {
  transform: scale(0.95);
  background-color: #ccc;
}
.card.investor-member__profile:hover .investor-member__profile-mask {
  transition: 500ms;
  opacity: 1;
}
</style>