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
      code: "",
    };
  },
  computed: {
    ...mapState("auth", ["isLoading"]),
  },

  mounted() {
    var routeParams = this.$route.params.pathMatch.split("/");
    var paramCode = routeParams[0];
    this.code = paramCode;
  },
  methods: {
    ...mapActions("auth", ["verifyEmail"]),
    nextAction() {
      this.$refs.formObserver.validate().then((valid) => {
        if (!valid) return;

        this.verifyEmail(this.email)
          .then((response) => {
            const message = response.data.detail;
            this.$swal.fire("Success!", message, "success");
          })
          .catch((error) => {
            const message = error.response.data.message || error;
            this.$swal.fire("Error!", message, "error");
          });
      });
    },
  },
};
</script>