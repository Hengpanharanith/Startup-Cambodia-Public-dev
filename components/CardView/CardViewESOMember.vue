<template>
  <v-card :to="to" class="card-eso-member" rounded="xl" outlined>
    <div class="action-buttons" v-if="showActions">
      <v-btn
        @click.stop.prevent="deleteMember"
        class="button-delete px-2"
        color="error"
        outlined
        small
      >
        <v-icon class="mr-2" small> mdi-trash-can </v-icon>
        {{ $t("delete") }}
      </v-btn>
    </div>

    <v-layout justify-center class="pa-6 pb-0">
      <v-avatar size="75">
        <v-img :src="thumbnail" alt="" />
      </v-avatar>
    </v-layout>

    <v-card-text class="text-center font-weight-bold">
      {{ name }}
    </v-card-text>
    <v-card-actions class="justify-center pb-4 pt-0">
      <v-chip v-if="!!status" class="text-capitalize" color small>
        {{ $t(`status.${status}`) }}
      </v-chip>
      <v-chip v-if="role" color="rgb(254, 235, 202)" small>
        {{ $t(`roles.${role}`) }}
      </v-chip>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "CardViewESOMember",
  data() {
    return {
      show: false,
      actionMenus: [
        { title: this.$t("edit"), action: 1, icon: "mdi-pencil" },
        { title: this.$t("delete"), action: 2, icon: "mdi-delete" },
      ],
    };
  },
  props: {
    to: { type: String, default: "" },
    name: String,
    role: String,
    status: String,
    thumbnail: { type: String, default: "/images/default-image.png" },
    showActions: { type: Boolean, default: false },
    memberId: Number,
  },
  computed: {
    ownershipLabel() {
      return this.role ? this.role : this.$t("n_a");
    },
  },
  mounted() {},

  methods: {
    deleteMember() {
      this.$emit("delete-member", {
        isReview: !!this.status,
        memberId: this.memberId,
      });
    },
  },
};
</script>
<style lang="scss">
.v-card.card-eso-member {
  transition: 200ms;
  position: relative;
  background-color: #f9fafb;
  .action-buttons {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    opacity: 0;
    transition: 200ms;
    overflow: hidden;
    border-radius: 0 !important;
    .button-delete {
      background-color: #ffe2e2;
    }
  }

  &:hover {
    transition: 200ms;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    transition: 200ms;
    cursor: pointer;

    .action-buttons {
      opacity: 1;
      transition: 200ms;
    }
  }
}
</style>
