<template>
  <div class="content mt-3 team-info">
    <!-- check gitLens when restore -->

  </div>
</template>
<script>
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "StartupTeamForm",
  props: {
    startupPage: { type: Object, default: () => {} },
  },
  components: { ValidationProvider, ValidationObserver },
  data() {
    return {
      showModal: false,
      selectedTeamId: null,
      isAdd: false,
      startupPageId: this.startupPage.id,
      formData: {
        team_position: [],
      },
      active: false,
      show: false,

      occupation: null,
      occupations: [
        "Software Engineer",
        "Data Scientist",
        "Product Manager",
        "Researcher",
      ],

      gender: null,
      genders: ["m", "f", "o"],
      positionOptions: [],
      positionIds: [],
    };
  },
  mounted() {
    this.setPositions().then((response) => {
      this.positionOptions = response.data.data;
      this.positionIds = this.positionOptions.map((v) => v.id);
    });
  },
  computed: {
    ...mapGetters("startupPage", ["getLoading"]),
    ...mapState("startupPage", ["selectedStartupPage"]),
    modalLabel() {
      return this.isAdd
        ? this.$t("startup.team.add_new")
        : this.$t("startup.team.update");
    },
  },
  methods: {
    ...mapActions("startupPage", [
      "updateStartupPage",
      "setStartupPage",
      "updateTeam",
      "setTeam",
      "deleteTeam",
      "setPositions",
      "setSelectedStartupPage",
    ]),

    _resetState() {
      this.formData = {};
    },
    _toggleModal(type) {
      this.showModal = true;
      switch (type) {
        case "add":
          this.isAdd = true;
          this._resetState();
          break;
        case "edit":
          this.isAdd = false;
          break;
        default:
          break;
      }
    },

    _handleSubmit() {
      // TODO: Check form validation before submit

      this.$refs.form.validate().then((valid) => {
        if (!valid) return;
        if (this.isAdd) {
          this._createTeamMember();
        } else {
          this._updateTeamMember();
        }
      });
    },
    _createTeamMember: async function () {
      // return;
      var team_members = [];
      team_members = this.startupPage.team_members.map((value) => value.id);
      const payload = new FormData(this.$refs.startupTeamForm);

      // request to create a team member
      this.$axios.$post("/api/v1/team/", payload).then((response) => {
        // get team member id and update startup page
        team_members.push(response.id);
        this.updateStartupPage({
          type: "team",
          team_members: team_members,
          id: this.startupPageId,
        })
          .then((response) => {
            this.$swal.fire("", "A new member has been added.", "success");
            this.showModal = false;
            this.$emit("update-team");
          })
          .catch((error) => {
            const message = error.response.data.message || error;
            this.$swal.fire("Failed!", message, "error");
          });
      });
    },
    _updateTeamMember: async function () {
      const formData = new FormData(this.$refs.startupTeamForm);

      // return
      const payload = {
        id: this.selectedTeamId,
        data: formData,
      };

      this.updateTeam(payload)
        .then((response) => {
          this.$swal.fire(
            "",
            "Team member information has been updated.",
            "success"
          );
          this.setTeam();
          this.$emit("update-team");
        })
        .catch((error) => {
          const message = error.response.data.message || error;
          this.$swal.fire("Failed!", message, "error");
        });
    },
    _deleteTeamMember: async function () {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete!",
        })
        .then((result) => {
          if (result.value) {
            //Swal.fire("Deleted!", "Your file has been deleted.", "success");
            const payload = {
              id: this.selectedTeamId,
            };

            this.deleteTeam(payload)
              .then((response) => {
                this.$swal.fire("", "Succesfully deleted a member.", "success");
                this.$emit("update-team");
              })
              .catch((error) => {
                const message = error.response.data.message || error;
                this.$swal.fire("Failed!", message, "error");
              })
              .finally(() => {});
          }
        });
    },
    _editAction: function (team) {
      this.formData = this.$common.cloneJSON(team);
      this.selectedTeamId = team.id;
      this._toggleModal("edit");
    },

    getPositionLabel(value) {
      const label = this.positionOptions.find((v) => v.id == value);

      return label?.desc || "";
    },
  },
};
</script>

<style lang="scss" scoped>
.team-info {
  position: relative;
  .team__add {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }
}
</style>