<template>
  <v-card
      :class="{'card-startup':!!to}"
      :to="to"
      rounded="lg"
      outlined
      :disabled="disabled"
  >

    <v-img
        :src="thumbnail"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.5)"
        :aspect-ratio="1/1"
        contain
    >
      <v-card-title v-text="name"></v-card-title>
      <v-card-subtitle>
        <v-chip
            v-if="!!status"
            :color="statusColor"
            class="text-uppercase"
            small
        >
          {{ status == "" ? "Not claim" : status }}
        </v-chip>

        <v-chip color="primary" small v-if="owner?.id === currentUser.id">
          <div class="text-truncate text-uppercase">Owned</div>
        </v-chip>
        <v-chip v-else color="purple" small dark>
          <div class="text-truncate text-uppercase">Member</div>
        </v-chip>
      </v-card-subtitle>
    </v-img>
  </v-card>

</template>
<script>
import {mapState} from "vuex";

export default {
  name: "CardViewESOVertical",
  data() {
    return {
      show: false,
    };
  },
  props: {
    to: {type: String, default: ""},
    name: String,
    status: String,
    email: String,
    userRole: String,
    thumbnail: {type: String, default: "/images/default-image.png"},
    disabled: {type: Boolean, default: false},
    owner:
        {
          type: Object, default: () => {
          }
        }
  },
  methods: {},
  computed: {
    ...mapState("user", ["currentUser"]),
    statusColor() {
      var color = '';

      switch (this.status) {
        case 'reviewing':
          color = 'info'
          break;
        case 'denied':
          color = 'error'
          break;
        case 'approved':
          color = 'success'
          break;
        case 'returned':
          color = 'warning'
          break;
        default:
          color = 'secondary';
          break;
      }
      return color
    }
  }
};
</script>
<style lang="scss">
.card-startup {
  transition: 200ms;

  &:hover {
    transform: scale(1.02);
    transition: 200ms;
    cursor: pointer;
  }
}
</style>

