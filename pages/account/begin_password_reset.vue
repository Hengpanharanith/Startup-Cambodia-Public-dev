<template>
  <div>
    <!-- check gitLens when restore -->

  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";

export default {
  layout: "account",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      email: "",
    };
  },
  computed: {
    ...mapState("auth", ["isLoading"]),
  },

  methods: {
    ...mapActions("auth", ["resetPassword"]),
    nextAction() {
      this.$refs.formObserver.validate().then((valid) => {
        if (!valid) return;

        this.resetPassword(this.email)
          .then((response) => {
            const message = response.data.detail;
            this.$swal.fire("Success!", message, "success");
            this.navigateLogin();
          })
          .catch((error) => {
            const message = error || error.response.data.message;

            //
            this.$swal.fire(
              "Error!",
              "Something went wrong. Please try again.",
              "error"
            );
          });
      });
    },
    navigateLogin() {
      this.$router.push({ path: "/", query: { action: "login" } });
    },
  },
};
</script>