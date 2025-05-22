<template>
  <div>
    <v-loading-overlay
      :active="isLoading"
      :is-full-page="true"
    ></v-loading-overlay>
    <div class="blog-one__title text-uppercase border-bottom">
      <span>{{ $t("change_password") }}</span> <br />
    </div>
    <!-- check gitLens when restore -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "PageInboxMessage",
  data() {
    return {
      currentPassword: "",
      newPassword1: "",
      newPassword2: "",
      isPasswordMask: true,
    };
  },
  computed: {
    ...mapState("auth", ["isLoading"]),
  },
  methods: {
    ...mapActions("auth", ["changePassword", "logout"]),
    save() {
      this.$refs.changePasswordFormObserver.validate().then((valid) => {
        if (!valid) return;

        this.$swal
          .fire({
            title: this.$t("dialog.save_change_confirm"),
            showCancelButton: true,
            confirmButtonText: this.$t("dialog.save"),
            cancelButtonText: this.$t("dialog.not_save"),
          })
          .then((result) => {
            if (result.value) {
              const payload = {
                old_password: this.currentPassword,
                new_password1: this.newPassword1,
                new_password2: this.newPassword2,
              };
              this.changePassword(payload)
                .then((response) => {
                  this.$swal
                    .fire({
                      text: `${response.data.detail}`,
                      showCancelButton: true,
                      confirmButtonColor: "#d33",
                      confirmButtonText: this.$t("dialog.logout"),
                      cancelButtonText: this.$t("dialog.stay_signed_in"),
                    })
                    .then((result) => {
                      if (result.value) {
                        this.logout();
                      } else {
                        this.resetForm();
                      }
                    });
                })
                .catch((error) => {
                  const message = error.response.data.message || error;
                  this.$swal.fire("Info", message, "info");
                });
            } else {
              // this.$swal.fire(this.$t("dialog.change_not_save"), "", "info");
              this.resetForm();
            }
          });
      });
    },
    resetForm() {
      this.currentPassword = "";
      this.newPassword1 = "";
      this.newPassword2 = "";
      this.$refs.changePasswordFormObserver?.reset();
    },
    unMaskPassword(isMask) {
      if (isMask) {
        this.isPasswordMask = true;
      } else {
        this.isPasswordMask = false;
      }
    },
  },
};
</script>

<style>
</style>