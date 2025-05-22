<template>
  <div>
    <PageHeader
      :title="$t($route.query.id)"
      v-bind:bannerUrl="bannerUrl"
    />  
    <section id="networkShowCase">
      <client-only>
        <NetworkSubNavbar />
      </client-only>

      <div
        id="startup"
        class="container mt-5"
        style="min-height: 40vh"
      >
        <div class="block-title text-center mb-0 mb-md-4">
          <div
            class="block-title__text text-left"
            style="text-transform: capitalize"
          >
            <span>{{ categoryName }}</span>
            <br />
          </div>
        </div>
        <p>
          {{ $t("network.showing") }} <b>{{ networks.length }} </b>
          {{ $t("network.of") }} {{ itemCount }} {{ $t("network.result") }}
        </p>
        <LoadingCollapse :visible="isLoading" />
        <template v-if="networks.length">
          <v-row>
            <v-col
              v-for="(item, key) in networks"
              :key="'startup-' + key"
              cols="12"
              md="4"
              class="mb-4 d-flex"
            >
              <template v-if="categoryName == 'startup'">
                <nuxt-link
                  :to="{ path: '/ecosystem/startup', query: { id: item.id } }"
                  class="h-100 w-100 text-decoration-none"
                >
                  <CardViewStartup
                    class="h-100"
                    :thumbnail="item.product && item.product.photo"
                    :text-title="item.product && item.product.startup_name"
                    :text-description="
                      item.funding_stage && item.funding_stage.desc_en
                    "
                    :startup-areas="item.startup_areas || []"
                  />
                </nuxt-link>
              </template>
              <template v-else-if="categoryName == 'mentor'">
                <nuxt-link
                  :to="{ path: '/ecosystem/mentor', query: { id: item.id } }"
                  class="h-100 w-100 text-decoration-none"
                >
                  <CardViewStartup
                    class="h-100"
                    :thumbnail="item.user && item.user.photo"
                    :text-title="
                      item.user &&
                      `${item.user.first_name} ${item.user.last_name}`
                    "
                    :text-description="item.description"
                  />
                </nuxt-link>
              </template>
              <template v-else>
                <nuxt-link
                  :to="`/ecosystem/discover/category/${categoryName}/${item.id}`"
                  class="h-100 w-100 text-decoration-none"
                >
                  <CardViewStartup
                    class="h-100"
                    :thumbnail="item.logo"
                    :text-title="item.name"
                    :text-description="item.description"
                  />
                </nuxt-link>
              </template>
            </v-col>
          </v-row>
        </template>

        <CardNoItem :visible="noItem" />
      </div>

      <div
        class="blog-post-pagination text-center"
        v-if="showPagination"
      >
        <a
          @click="getPreviousPage()"
          class="prev"
          href="#networkShowCase"
        >
          <v-icon class="fa">mdi-chevron-left</v-icon>
        </a>

        <nuxt-link
          v-for="i in totalPage"
          :key="i"
          :class="i == currentPage ? 'active' : ''"
          :to="{
            path: '/ecosystem/discover/category/' + $route.query.id,
            query: { id: $route.query.id, page: i },
          }"
        >{{ i }}</nuxt-link>

        <a
          class="next"
          href="#networkShowCase"
          @click="getNextPage()"
        >
          <v-icon class="fa">mdi-chevron-right</v-icon>
        </a>
      </div>
    </section>
  </div>
</template>
<script>
import PageHeader from "@/components/Common/PageHeader";
import CardViewStartup from "@/components/CardView/CardViewStartup";
import CardViewEvent from "@/components/CardView/CardViewEvent";
import CardViewInfo from "@/components/CardView/CardViewInfo";
import NetworkSubNavbar from "@/components/Common/NetworkSubNavbar";

import { mapActions, mapState } from "vuex";
import CardNoItem from "../../../../components/CardView/CardNoItem.vue";
import LoadingCollapse from "../../../../components/LoadingCollapse.vue";

export default {
  watchQuery(newQuery, oldQuery) {
    this.getStakeHolder(newQuery.page);
  },
  head: { title: "Ecosystem" },
  layout: "common",
  components: {
    PageHeader,
    CardViewStartup,
    CardViewEvent,
    CardViewInfo,
    NetworkSubNavbar,
    CardNoItem,
    LoadingCollapse,
  },
  data() {
    return {
      fullPage: true,
      bannerUrl: "/images/ecosystem/banner.png",
      emptyImgSrc: require("@/assets/images/empty_box.svg"),
      landingData: {},
      networks: [],
      currentPage: 1,
      totalPage: 1,
      itemCount: 0,
      noItem: false,
    };
  },
  computed: {
    ...mapState("stakeholder", ["isLoading"]),
    categoryName() {
      let category = this.$route.query.id;
      if (!category) {
        return this.$t("all");
      }
      return category;
    },
    landingEcosystem() {
      return this.landingData.ecosytem_overview || {};
    },
    showPagination() {
      return this.totalPage > 1;
    },
  },
  watch: {
    categoryName: {
      immediate: true,
      handler(oldCat, newCat) {
        if (newCat != oldCat) {
          this.currentPage = 1;
          this.getStakeHolder(this.currentPage);
        }
      },
    },
    // "$route.query.page"(pageNumber){

    // }
  },
  methods: {
    ...mapActions("stakeholder", ["getStakeholderByCategory"]),
    getStakeHolder(page = 1) {
      let category = this.categoryName;
      let options = { params: { page_size: 9, page } };

      this.getStakeholderByCategory({ category, options })
        .then((res) => {
          this.networks = res.data;
          this.currentPage = res.current_page;
          this.totalPage = res.total_page;
          this.itemCount = res.item_count;
          this.noItem = !res.data.length;
          this.$router.push({
            query: { id: category, page: this.currentPage },
          });
        })
        .catch((e) => {
          this.noItem = true;
          this.networks = [];
          this.totalPage = 1;
        });
    },
    goToPage(page = 1) {
      // this.router.push("/ecosystem/category?id=startup")

      // this.$route.
      this.getStakeHolder(page);

      // this.$route.push(`page=${page}`);
      // this.$router.push({path: '/ecosystem/category?id=test', query: {page: page}});
    },
    getNextPage() {
      if (this.currentPage >= this.totalPage) return;
      let page = this.currentPage + 1;
      this.getStakeHolder(page);
    },
    getPreviousPage() {
      let page = this.currentPage - 1;
      this.getStakeHolder(page);
    },
  },
};
</script>
