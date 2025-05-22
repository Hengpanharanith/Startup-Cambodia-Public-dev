<template>
  <v-card outlined rounded="lg">
    <v-card-title class="text-h6 font-weight-bold">
      <span>{{ $t("save_list") }}</span>
      <v-spacer></v-spacer>
      <v-menu v-if="filter.length" tile right style="z-index:999">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              text
              class="align-self-center text-none"
              v-bind="attrs"
              v-on="on"
          >
            <v-icon
                dense
                class="align-self-center mr-4 text-none"
                v-bind="attrs"
                v-on="on"
            >
              mdi-filter-variant
            </v-icon>
            {{ activeFilter.title }}
          </v-btn>
        </template>

        <v-list class="grey lighten-3 text">
          <v-list-item
              v-for="item in filter"
              :key="item.value"
              @click="onSelectedFilter(item)"
          >
            {{ item.title }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-divider></v-divider>

    <v-card-text>

      <CardSaveListItem
          v-for="(item, index) in dataList"
          @toggle-save="toggleSave(item)"
          :key="`tab-list-item-${index}`"
          :to="getRouteLocation(item)"
          :title="item.title"
          :description="item.description"
          :is-saving="savingId == item.ref_id"
          :item-type="item.type"
          v-if="!isLoading"
          
      />
      <CardNoItem :visible="!dataList.length"/>
      
      
      <div v-if="showPagination">
        <v-pagination
            @input="onPageChange"
            :value="currentPage"
            :total-visible="7"
            :length="totalPage"
            :disabled="isLoading"
            class="mb-8"
            circle
        ></v-pagination>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "SaveListPage",
  data() {
    return {
      activeFilter: {title: this.$t('user.savelist.filter.all'), value: "all"},
      filter: [
        {title: this.$t('user.savelist.filter.all'), value: "all"},
        {title: this.$t('user.savelist.filter.program'), value: "program"},
        {title: this.$t('user.savelist.filter.event'), value: "event"},
        {title: this.$t('user.savelist.filter.blog'), value: "blog"},
        {title: this.$t('user.savelist.filter.file'), value: "file"},
      ],
      savingId: null,
      totalPage: 1,
    };
  },
  computed: {
    ...mapState("saving-list", ["dataList", "isLoading"]),
    showPagination() {
      return this.totalPage > 1;
    },
    currentPage() {
      return Number(this.$route.query.page || 1);
    },
  },
  methods: {
    ...mapActions("saving-list", {
      getDataRecords: "get",
      toggleBookmark: "create",
    }),
    onSelectedFilter(item) {
      this.activeFilter = Object.assign({}, item);
    },
    getFilter(page = 1) {
      const params = {
        type: this.activeFilter.value == 'all' ? "" : this.activeFilter.value,
        page_size: 5,
        page: page
      };
      return this.getDataRecords({params}).then((response) => {

        this.totalPage = response.total_page;
        this.$router.push({
          query: {page: this.currentPage},
        });

      });
    },
    getRouteLocation(item) {

      if (item.type == "program") return `/program?id=${item.ref_id}`;
      if (item.type == "event") return `/event/${item.ref_id}`;
      if (item.type == "blog")
        return `/resource/category/blog/${item.ref_id}`;
      if (item.type == "file") return `/resource/file/${item.ref_id}`;
    },
    toggleSave(item) {
      const payload = {type: item.type, ref_id: item.ref_id};
      this.savingId = item.ref_id;
      this.toggleBookmark({payload})
          .then(() => {
            this.$toast.show(this.$t("success"));
            this.getFilter();
            this.savingId = null;
          })
          .catch((error) => {
            let message = error.response?.data?.message;
            this.$toast.error(message);
            this.savingId = null;
          });
    },
    onPageChange(page) {

      if (page != this.currentPage) {
        const {query} = this.$route;
        this.$router.push({query: {...query, page}});

      }
    },
  },
  watch: {
    activeFilter: {
      handler() {
        this.getFilter();
        this.$router.replace({'query': null});
      }
    },
    currentPage: {
      handler(pageNumber) {
        this.getFilter(pageNumber);
      },
    },

  },
  async fetch() {
    await this.getFilter()
  },

  

};
</script>
