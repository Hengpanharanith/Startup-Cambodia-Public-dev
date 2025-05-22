<template>
  <div>
    <PageHeader :title="$t('programs')" />
    <div class="container container-program-category my-3 my-md-4">
      <div class="block-title text-center mb-0 mb-md-4">
        <div
          class="block-title__text text-left"
          style="text-transform: capitalize"
        >
          <span>{{ get_category_name }}</span>
          <br />
        </div>
      </div>
      <div class="row custom_service-one">
        <div
          class="col-lg-4 pointer mb-4"
          v-for="p in programList"
          :key="p.id"
        >
          <nuxt-link
            :to="{ path: '/program/detail', query: { id: p.id } }"
            style="text-decoration: none"
          >
            <CardViewProgram
              :title="p.title"
              :image_url="p.image"
              :description="p.description"
              :date="p.modified_at"
              :id="p.id"
            />
          </nuxt-link>
        </div>
      </div>
      <CardNoItem :visible="isEmpty" />
      <LoadingCollapse :visible="isLoading" />
    </div>
  </div>
</template>

<script>
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import PageHeader from "@/components/Common/PageHeader";
import CardViewProgram from "@/components/CardView/CardViewProgram";
import { mapState, mapActions } from "vuex";
import CardNoItem from "../../../components/CardView/CardNoItem.vue";
import LoadingCollapse from "../../../components/LoadingCollapse.vue";

export default {
  layout: "common",
  components: {
    PageHeader,
    ButtonPrimary,
    CardViewProgram,
    CardNoItem,
    LoadingCollapse,
  },
  data() {
    return {
      programList: [],
      currentPage: 1,
      totalPage: 1,
    };
  },
  mounted() {
    this.getStartupProgram();
  },
  computed: {
    ...mapState("startup-program", ["isLoading"]),
    get_category_name() {
      let category = this.$route.query.id;
      if (!category) {
        return this.$t("all");
      }
      return this.programList.length ? this.programList[0].category.name : "";
    },
    isEmpty() {
      return !this.isLoading && !this.programList.length;
    },
    visibleSeeMore() {
      return this.currentPage < this.totalPage;
    },
  },
  methods: {
    ...mapActions("startup-program", { getAllProgram: "get" }),
    getStartupProgram(page = 1) {
      let category = this.$route.query.id;
      this.getAllProgram({ params: { category, page } }).then((res) => {
        this.programList = this.programList.concat(res.data);
        this.currentPage = res.current_page;
        this.totalPage = res.total_page;
      });
    },
    getNextPage() {
      let page = this.currentPage + 1;
      this.getStartupProgram(page);
    },
  },
};
</script>

<style>
.container-program-category {
  min-height: 50vh;
}
</style>