<template>
  <section>
    <v-card class="mb-4" rounded="lg" outlined>
      <v-card-title>
        <span>{{ $t("member") }}</span>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col v-if="isOwner" cols="12" sm="6" md="4">
            <v-card
              @click="dialogInvitation = true"
              class="card-add-eso-member fill-height d-flex flex-column justify-center align-center overflow-hidden"
              min-height="195"
              rounded="xl"
              outlined
            >
              <v-avatar class="mb-2" color="primary" dark>
                <v-icon>mdi-plus</v-icon>
              </v-avatar>
              <span>
                {{ $t("startup_profile.add_member") }}
              </span>
            </v-card>
          </v-col>

          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="item in members"
            :key="`member-${item.user?.id}`"
          >
            <CardViewESOMember
              :to="`/ecosystem/discover/category/individuals/${item.user.id}`"
              :name="getUsername(item.user)"
              :role="item.role"
              :thumbnail="item.user.photo_thumbnail"
              :showActions="isOwner"
              :member-id="item.id"
              class="fill-height"
              @delete-member="onDeleteMember"
            />
          </v-col>

          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="(item, key) in invitedMembers"
            :key="`invited-member-${key}`"
          >
            <CardViewESOMember
              :to="`/ecosystem/discover/category/individuals/${item.user?.id}`"
              :name="getUsername(item.to_user)"
              :role="item.role"
              :status="'inviting'"
              :thumbnail="item.to_user.photo || '/images/default-user.png'"
              :member-id="item.id"
              class="fill-height"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <DialogESOMemberInvitation
      :visible.sync="dialogInvitation"
      :stakeholder-id="esoId"
      :invited-members="invitedMembers"
      @fetch-profile="refresh()"
    />
    <DialogUserEditESOMember
      @save="onSaveMember"
      :visible.sync="dialogEditStartupMember"
      :edited-item="editedMember"
    />
  </section>
</template>

<script>
export default {
  name: "CardEsoSectionMembers",
  props: {
    esoId: String,
    isOwner: Boolean,
    editable: Boolean,
    allowAdd: Boolean,
    members: { type: Array, default: () => [] },
    invitedMembers: { type: Array, default: () => [] },
  },
  data() {
    return {
      dialogInvitation: false,
      dialogEditStartupMember: false,
      editedMember: {},
    };
  },
  computed: {
    toast() {
      return this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
    },
    swalOpt() {
      return {
        type: "info",
        text: this.$t("startup.page.question.delete"),
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonText: this.$t("dialog.cancel"),
        confirmButtonText: this.$t("dialog.yes"),
        reverseButtons: true,
      };
    },
  },
  methods: {
    refresh() {
      this.$emit("updated");
    },
    addMember() {
      this.dialogInvitation = true;
    },
    getUsername({ first_name, first_name_kh, last_name, last_name_kh } = {}) {
      if (!this.$isKm()) return [first_name, last_name].join(" ");
      return [first_name_kh || first_name, last_name_kh || last_name].join(" ");
    },
    onEditMember(item) {
      this.editedMember = Object.assign({}, item);
      this.dialogEditStartupMember = true;
    },
    onDeleteMember({ isReview, memberId }) {
      this.$swal
        .fire({
          type: "info",
          text: this.$t("startup.page.question.delete"),
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonText: this.$t("dialog.cancel"),
          confirmButtonText: this.$t("dialog.yes"),
          reverseButtons: true,
        })
        .then(({ value }) => {
          if (!value) return;

          let uri = isReview
            ? `/base-api/me/invite-team-request/${memberId}/?send_out=true`
            : `/base-api/eso/${this.esoId}/team/${memberId}`;

          this.$axios
            .delete(uri)
            .then((response) => {
              const _title = this.$t("common.deleted_successful");
              this.toast.fire("", _title, "success");
              this.refresh();
            })
            .catch((error) => {
              const _title = this.$t("common.error");
              this.$swal.fire(_title, error.toString(), "error");
            });
        });
    },
    onSaveMember(payload) {
      const member = Object.assign({}, payload);
      return this.onUpdateMember(member);
    },
    onUpdateMember(member) {
      const id = this.esoId;
      var memberId = member.id;

      var payload = { role: member.role };
      this.updateStartupMember({ id, memberId, payload })
        .then((res) => {
          this.toast.fire("", this.$t("user.profile.save_success"), "success");
          this.refresh();
        })
        .catch((error) => {
          const message = error?.data?.message || error?.message || "Error";
          console.log(message);
          this.$swal.fire(this.$t("common.error"), message, "error");
        })
        .finally(() => {
          this.dialogEditStartupMember = false;
        });
    },
  },
};
</script>

<style>
.card-add-eso-member {
  transition: 200ms;
  &:hover {
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    transition: 200ms;
  }
  background-image: linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%);
}
</style>
