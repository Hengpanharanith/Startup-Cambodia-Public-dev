<template>
  <v-card :to="to" class="card-startup" rounded="lg" outlined>
    <v-card-actions v-if="showDelete"> 
      <v-spacer></v-spacer>
      <v-menu   open-on-hover
           
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                
                icon
                v-bind="attrs"
                v-on="on"
                v-on:click.prevent
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list >
              <v-list-item
              
                v-for="(item, i) in actionMenus"
                :key="i"
                
              >
                <v-list-item-title
                
                @click="
                 item.action == 1 ? editMember() : deleteMember()"><v-icon>{{ item.icon }}</v-icon> {{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
    </v-card-actions>
   
    <!-- <v-card-actions v-if="showDelete">
      <v-spacer></v-spacer>
      <v-btn text color="primary">
        <v-icon dense @click.prevent="editMember()">mdi-pencil</v-icon>
      </v-btn>
      <v-btn v-if="!isOwner && !isClientPage" text color="error" @click.prevent="deleteMember()">
        <v-icon dense>mdi-account-minus</v-icon>
      </v-btn>
      <v-btn v-else disabled text></v-btn>
    </v-card-actions> -->
    <v-layout justify-center class="pa-4">
      <v-avatar size=75>
        <v-img :src="thumbnail" alt="" />
      </v-avatar>



    </v-layout>

    <v-divider></v-divider>
    <v-card-text class="text-center">
      <p class="mb-2"><strong>{{ name }}</strong></p>
      <!-- <p class="mb-0" v-if="position"><v-icon size="15">mdi-briefcase</v-icon> {{ position }}</p> -->

      <p class="mb-0 text-capitalize pt-2" v-if="status">
        <v-chip small>{{ status }}</v-chip>
      </p>
    
      <p class="mb-0 text-bold" v-if="!status">
        <v-icon size="15">mdi-briefcase</v-icon>
       {{ $t("role") }}: {{  role || $t("n_a1") }}
      </p>

    </v-card-text>
    <!-- <v-card-actions>
      <v-row>
        <v-col cols="9">
          <p class="mb-0"> {{position}} </p>
        </v-col>
        <v-col cols="3">
          <v-icon>mdi-pencil</v-icon>
        </v-col>
      </v-row>
    
    </v-card-actions> -->
  </v-card>
</template>
<script>
export default {
  name: "CardViewStartupMember",
  data() {
    return {
      show: false,
      actionMenus: [
        { title: this.$t("edit"),action:1, icon:"mdi-pencil" },
        { title: this.$t("delete"),action:2, icon:"mdi-delete" },
      ],
    };
  },
  props: {
    to: { type: String, default: "" },
    name: String,
    position: String,
    status: String,
    isOwner: Boolean,
    thumbnail: { type: String, default: "/images/default-image.png" },
    isClientPage: Boolean,
    showDelete: { type: Boolean, default: false },
    memberId: Number,
    role: String,
  },
  computed: {
    ownershipLabel() {
      return this.role ? this.role : this.$t("n_a");
    },
  },
  mounted(){
  },

  methods: {
    deleteMember() {
      if (this.status) {
        // remove request
        this.$emit('delete-member', {
          isReview: true,
          memberId: this.memberId
        })
      } else {
        // remove member
        this.$emit('delete-member', {
          isReview: false,
          memberId: this.memberId
        })
      }
    },
    editMember() {
      
      this.$emit('edit-member')
    }
  },
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

