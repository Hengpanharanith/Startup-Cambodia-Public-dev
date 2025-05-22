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
      gradient="to bottom, rgba(0,0,0,.5), rgba(0,0,0,.2)"
      height="200px"
      contain
    >
      <v-card-title v-text="name"></v-card-title>
      <v-card-subtitle>
        <v-chip
          v-if="!!status"
          :color="statusColor"
          class="text-uppercase"
          small
        >{{status == "" ? "Not claim" : status}}</v-chip>
      </v-card-subtitle>
    </v-img>
    <v-card-actions v-if="!!email">
      <div class="text-truncate">{{ email }}</div>
    </v-card-actions>
    <v-card-actions
      v-if="!!userRole"
      class="pt-0"
    >
      <div class="text-truncate">{{ userRole }}</div>
    </v-card-actions>
  </v-card>

</template>
<script>
export default {
  name: "CardViewStartupVertical",
  data() {
    return {
      show: false,
    };
  },
  props: {
    to: { type: String, default: "" },
    name: String,
    status: String,
    email: String,
    userRole: String,
    thumbnail: { type: String, default: "/images/default-image.png" },
    disabled: {type:Boolean, default:false}
  },
  methods: {},
  computed:{
    statusColor(){
      var color = '';
      
      switch(this.status){
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
          color ='warning'
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

