<template>
  <div class="startup-info">
    <!-- check gitLens when restore -->

  </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import "vue-loading-overlay/dist/vue-loading.css";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "StartupInformationForm",
  props: {
    startupPage: { type: Object, default: () => {} },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  computed: {
    ...mapState("user", ["currentUser"]),

    ...mapGetters({
      requesting: "startupPage/getLoading",
      product: "startupPage/getProduct",
    }),
    ...mapGetters("startupPage", ["getStartupPage", "getStartupArea"]),
    fullName() {
      const first_name = this.currentUser.first_name || "";
      const last_name = this.currentUser.last_name || "";
      return [first_name, last_name].join(" ").trim() || "-";
    },
  },

  data() {
    return {
      profileImage: null,
      startup: {},
      fullPage: true,
      isUpdateProfile: false,
      value: [],
      options: [],
    };
  },

  methods: {
    ...mapActions("startupPage", [
      "setStartupPage",
      "createProduct",
      "updateStartupPage",
      "setProduct",
      "updateProduct",
      "setStartupArea",
      "createStartupPage",
    ]),

    editStartupPageInfo() {
      this.$emit("edit");
    },
  },
};
</script>
<style lang="scss" scoped>
.startup-info {
  position: relative;
  .startup__edit {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    height: 2.5rem;
    font-size: 0.8rem;
    border-radius: 50%;
  }
}
</style>