<template>
  <div>
    <!-- check gitLens when restore -->

  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { InvestorMember } from "@/models/index";
export default {
  name: "FormEditInvestorMember",
  props: {
    visible: { type: Boolean, default: false },
    memberList: { type: Array, default: () => [] },
  },
  data() {
    return {
      showModal: false,
      profileImage: null,
      editedItem: {},
      dateConfig: {
        type: "string",
        mask: "YYYY-MM-DD", // Uses 'iso' if missing
      },
    };
  },
  computed: {
    ...mapState("user", ["currentUser"]),
    ...mapState("interest", { interestList: "dataList" }),
    modalLabel() {
      return this.editedItem.id
        ? this.$t("investor.member.dialog_form.title_update")
        : this.$t("investor.member.dialog_form.title_new");
    },
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapActions("investor-profile", {
      updateInvestor: "updatePartial",
      registerInvestorMember: "addMember",
      updateInvestorMember: "updateMember",
    }),
    disabledDate(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return date >= new Date(today.getTime());
    },
    resetForm(investor) {
      if (!investor) {
        this.editedItem = this.$common.cloneJSON(InvestorMember);
        return;
      }
      this.editedItem = this.$common.cloneJSON({
        ...investor,
        photo: investor.photo || "",
      });

      this.$refs.investorFormObserver?.reset();
    },
    openEdit(item) {
      this.resetForm(item);
      this.showModal = true;
    },
    pickProfile(file) {
      this.profileImage = file;
      this.editedItem.photo = URL.createObjectURL(file);
      this.editedItem.image = file.name;
    },
    getInterestOptions(id) {
      return this.interestList.find((item) => item.id == id) || {};
    },
    removeInterest(id) {
      const index = this.editedItem.area_of_interests.findIndex(
        (item) => item == id
      );
      if (index > -1) {
        this.editedItem.area_of_interests.splice(index, 1);
      }
    },
    save() {
      this.$refs.investorFormObserver.validate().then((valid) => {
        if (!valid) return;
        const formData = {
          ...this.editedItem,
        };

        const { id } = this.editedItem;
        if (!id) {
          this.saveNew(formData);
          return;
        }
        this.saveUpdate(id, formData);
        return;
      });
    },
    saveNew(payload) {
      this.registerInvestorMember({ payload })
        .then((res) => {
          let investorId = this.$route.params.investorId;
          let members = this.memberList.map((i) => i.id);
          members.push(res.id);
          this.showModal = false;
          this.updateInvestor({
            id: investorId,
            payload: { members },
          }).then(() => {
            let message = this.$t("investor.member.message.added");
            this.$swal.fire("", message, "success");
            this.$emit("list-updated");
          });
        })
        .catch((error) => {
          const message = error.response.data.message || error;
          this.$swal.fire(this.$t("msg.failed"), message, "error");
        });
    },
    saveUpdate(id, payload) {
      this.updateInvestorMember({ id, payload })
        .then((res) => {
          let message = this.$t("investor.member.message.updated");
          this.$swal.fire("", message, "success");
          this.$emit("list-updated");
          this.showModal = false;
          this.$emit("saved-update");
        })
        .catch((error) => {
          const message = error.response.data.message || error;
          this.$swal.fire(this.$t("msg.failed"), message, "error");
        });
    },
  },
};
</script>

<style>
</style>