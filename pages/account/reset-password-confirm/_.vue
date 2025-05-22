<template>
  <div>
    <!-- check gitLens when restore -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  layout: "account",
  data() {
    return {
      uid: "",
      token: "",
      password: "",
      confirm_password: "",
    };
  },
  mounted() {
    var routeParams = this.$route.params.pathMatch.split("/");
    var paramUId = routeParams[0];
    var paramToken = routeParams[1];

    this.uid = paramUId;
    this.token = paramToken;
  },
  methods: {
    ...mapActions("auth", ["resetPasswordConfirm"]),

    nextAction() {
      this.$refs.formObserver.validate().then((valid) => {
        if (!valid) return;

        const data = {
          new_password1: this.password,
          new_password2: this.confirm_password,
          uid: this.uid,
          token: this.token,
        };

        this.resetPasswordConfirm(data)
          .then((response) => {
            this.$swal.fire({
              type: "success",
              text: "You have reset your password successfully.",
              confirmButtonColor: "#fbc767",
              confirmButtonText: "OK",
            });
            this.navigateLogin();
          })
          .catch((error) => {
            const message = error.response.data.message || error;
            this.$swal.fire("Failed!", message, "error");
          });
      });
    },
    navigateLogin() {
      this.$router.push({ path: "/", query: { action: "login" } });
    },
  },
};
</script>