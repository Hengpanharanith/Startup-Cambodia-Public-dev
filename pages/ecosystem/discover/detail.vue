<template>
  <div>
    <!-- check gitLens when restore -->

  </div>
</template>
<script>
import PageHeader from "@/components/Common/PageHeader";
// import CardViewResource from "../@/components/CardView/CardViewResource";
// import CardViewNetworkProfile from "../@/components/CardView/CardViewNetworkProfile";

import { mapState, mapActions } from "vuex";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  head: { title: "Ecosystem Detail" },
  layout: "common",
  components: {
    PageHeader,
    // CardViewResource,
    Loading,
    // CardViewNetworkProfile,
  },
  data() {
    return {
      fullPage: true,
      networkProfile: {},
    };
  },
  methods: {
    ...mapActions("stakeholder", ["getStakeholderCategoryByID"]),
  },
  // mounted() {
    // if (localStorage.networkProfile) {
    //   this.networkProfile = JSON.parse(localStorage.networkProfile);
    // }
  //   let id = this.$route.query.id;
  //   let category = this.$route.query.category;
  //   this.getStakeholderCategoryByID({ category: category, id: id })
  //     .then((res) => {
  //       // this.setActive(res.details[0]?.id);
  //       this.networkProfile = Object.assign({}, res);
  //     })
  //     .catch((e) => {
  //       this.notFound = true;
  //     });
  // },
  computed: {
    ...mapState("stakeholder", ["getLoading"]),
  },
};
</script>