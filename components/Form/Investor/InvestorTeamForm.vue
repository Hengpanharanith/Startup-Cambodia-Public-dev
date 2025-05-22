<template>
  <div class="content mt-3">
    <v-card
      class="card-new p-0 blog-one__single-inner-block cursor-pointer mb-3 "
      @click="addMember"
    >
      <v-card-text class="d-flex align-items-center justify-content-center rounded mb-0 bg-transparent">
        <span class="m-auto service-one__text">{{$t('add_new_member')}}</span>
      </v-card-text>
    </v-card>
    <CardInvestorMember
      v-for="(item, idx) in memberList"
      hide-edit
      class="mb-3"
      :username="getName(item)"
      :occupation="item.occupation"
      :key="idx"
      @edit="editMember(item)"
      @remove="deleteItem(item)"
    />

    <FormEditInvestorMember
      ref="formEditInvestorMember"
      :member-list="memberList"
      @list-updated="$emit('list-updated')"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FormEditInvestorMember from "@/components/Form/Investor/FormEditInvestorMember";
export default {
  name: "InvestorTeamForm",
  components: {
    FormEditInvestorMember,
  },
  props: {
    memberList: { type: Array, default: () => [] },
  },
  data() {
    return {
      fields: [
        { key: "full_name_latin", label: "Full name (Latin)" },
        { key: "full_name", label: "Full name (Khmer)" },
        "date_of_birth",
        "gender",
        "phone_number",
        "occupation",
        { key: "actions" },
      ],
      gender: {
        m: { title: "Male", value: "m" },
        f: { title: "Female", value: "f" },
      },
    };
  },
  computed: {},
  methods: {
    ...mapActions("investor-profile", {
      deleteMember: "deleteMember",
      updateInvestorMember: "updateMember",
    }),
    addMember() {
      this.$refs.formEditInvestorMember.openEdit();
    },
    editMember(member) {
      this.$refs.formEditInvestorMember.openEdit(member);
    },
    deleteItem(item) {
      this.$swal({
        title: this.$t("confirmation"),
        text: this.$t("investor.member.message.remove_question"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "orange",
        cancelButtonColor: "grey",
        cancelButtonText: this.$t("dialog.cancel"),
        confirmButtonText: this.$t("dialog.delete"),
        reverseButtons: true,
      }).then((result) => {
        if (result.value == true) {
          let investorId = this.$route.params.investorId;
          let members = [];
          this.memberList.forEach((item) => {
            if (!members.includes(item.id)) {
              members.push(item.id);
            }
          });
          this.updateInvestorMember({ id: investorId, payload: { members } })
            .then((res) => {
              let message = this.$t("investor.member.message.updated");
              this.$swal.fire("", message, "success");
              this.deleteMember({ id: item.id })
                .then((res) => {
                  this.$emit("list-updated");
                })
                .catch(() => {});
            })
            .catch((error) => {
              this.$swal({
                position: "center",
                type: "error",
                title: this.$t("msg.failed"),
                showConfirmButton: false,
                timer: 3000,
              });
            });
        }
      });
    },
    getName(member) {
      if (this.$i18n.locale != "km") {
        return member.first_name_en + " " + member.last_name_en;
      }
      return member.first_name_kh + " " + member.last_name_kh;
    },
  },
};
</script>

<style>
.card-new {
  color: #a9a9a9;
  transition: 500ms;
  /* min-height: 75px; */
}
.card-new:hover .service-one__text {
  color: white;
}
</style>