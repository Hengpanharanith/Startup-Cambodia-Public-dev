<template>
  <div></div>
</template>

<script>
import { mapState } from "vuex";
export default {
  head() {
    let img =
      "https://startup-cambodia-dev.s3.amazonaws.com/core/resource/thumbnails/Top_5_Startups_in_Cambodia.png";
    return {
      title: "Ecosystem",
      meta: [
        {
          hid: "og:image",
          property: "og:image",
          content: img,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: img,
        },
        {
          hid: "description",
          name: "description",
          content: "Startup Cambodia - Resource",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "Startup Cambodia - Resource",
        },
      ],
    };
  },
  computed: {
    ...mapState("resource-page", {
      resourcePageList: "dataList",
      isLoading: "isLoading",
    }),
  },
  watch: {
    "resourcePageList.length"(v) {
      
    },
  },
  mounted() {
    if (this.resourcePageList.length) {
      const slug = this.resourcePageList[0].slug || "";
      this.$router.replace({ path: `/resource/category/${slug}` });
    }
  },
};
</script>

<style></style>
