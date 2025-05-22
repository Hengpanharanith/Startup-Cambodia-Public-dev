<template>
  <v-dialog
    :value="visibleAuthDialog"
    scrollable
    max-width="400px"
    transition="dialog-transition"
    @input="closeDialog"
  >
    <v-card
      :disabled="loadingURL"
      rounded="lg"
    >
      <v-card-title class="justify-center pt-8">
        <img
          src="/images/startup-cambodia-icon.png"
          class="d-inline-block align-top"
          alt="startup-cambodia"
          height="50"
        />
      </v-card-title>
      <v-card-title class="justify-center text-center font-weight-bold text-break">{{$t('form.login.welcome')}}</v-card-title>
      <v-card-text class="pa-8 pt-4">
        <v-btn
          @click="getAuthURL"
          :loading="loadingURL"
          class="rounded-lg justify-space-between elevation-0 mx-auto py-2"
          color="#2e5ae1"
          height="auto"
          dark
          large
          block
        >
          <v-img
            :aspect-ratio="1"
            class="mr-2"
            src="/icons/cam-digi-key-line.svg"
            max-width="40"
            width="40"
            contain
          />
          <p
            v-html="$t('form.login_with_camdigikey')"
            class="mb-0"
          ></p>
          <v-sheet width="40" />
        </v-btn>
        <br />
        <p
          class="text-center px-4"
          v-html="$t('form.login.login_instruction_text')"
        ></p>
        <v-layout
          class="my-4"
          justify-center
        >
          <v-divider style="max-width: 50%;"></v-divider>
        </v-layout>
        <p
          class="text-center"
          v-html="$t('form.login.no_camdigikey_account_info')"
        ></p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";

export default {
  name: "AuthenticationForm",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      loadingURL: false,
    };
  },
  computed: {
    ...mapState("app", ["visibleAuthDialog"]),
  },
  methods: {
    ...mapActions("app", ["setAuthDialogVisibility"]),
    ...mapActions("auth", ["getCamDigiKeyAuthURL"]),
    closeDialog(v) {
      this.setAuthDialogVisibility(false);
    },
    getAuthURL() {
      this.loadingURL = true;
      this.getCamDigiKeyAuthURL()
        .then((res) => {
          localStorage.redirect = this.$route.fullPath;
          window.location.href = res.login_url;
        })
        .catch((e) => {
          this.loadingURL = false;
        });
    },
  },
};
</script>
<style>
</style>
