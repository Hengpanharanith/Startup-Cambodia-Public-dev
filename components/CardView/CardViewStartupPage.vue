<template>
  <div
    class="shadow-sm p-0 card-network-page cursor-pointer"
    :title="titleText"
    @click="_viewPage"
  >
    <!-- check gitLens when restore -->

  </div>
</template>

<script>
export default {
  name: "CardViewStartupPage",
  props: {
    item: Object,
    titleText: String,
    pageStatus: String,
    thumbnail: String,
  },
  computed: {
    status() {
      const status = this.pageStatus?.toLowerCase();
      if (status == "approved") return { text: "Approved", color: "success" };
      if (status == "denied") return { text: "Denied", color: "error" };
      if (status == "reviewing") return { text: "Reviewing", color: "info" };
      return null;
    },
  },
  methods: {
    _deletePage() {
      this.$swal
        .fire({
          title: "Confirmation",
          text: this.$t("startup.page.question.delete"),
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonText: this.$t("dialog.cancel"),
          confirmButtonText: this.$t("dialog.yes"),
          reverseButtons: true,
        })
        .then(({ value }) => {
          if (!value) return;
          this.$emit("delete-page");
        });
    },

    _viewPage() {
      this.$emit("view-page");
    },
  },
};
</script>
<style lang="scss">
.card-network-page {
  position: relative;
  .page__status {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 0 4px;
  }
  .custom-dropdown {
    .dropdown-toggle::after {
      display: none;
    }
    .dropdown-item {
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      .b-icon {
        margin-right: 0.5rem;
      }
    }
  }
}
</style>