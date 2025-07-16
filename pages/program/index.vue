<template>
  <div>
    <PageHeader :bannerUrl="bannerUrl" />
    <BreadcrumbsBar :breadcrumb-items="breadCrumbs" />
    <v-divider></v-divider>
    <v-container>
      <v-layout wrap>
        <v-col style="position: relative" cols="12" md="4" lg="3">
          <v-card rounded="lg" flat>
            <v-card-text>
              <v-layout class="gap" column>
                <SearchBar
                  v-model="filter.search"
                  :readonly="isLoading"
                  class="mb-2"
                />

                <DateRangePickerDialog
                  :value.sync="filter.date"
                  @cleared="pickedDate"
                  @picked="pickedDate"
                  width="100%"
                  class="red"
                />
                <v-layout
                  v-for="(item, key) in filterItems"
                  :key="`filter-menu-${key}`"
                  column
                >
                  <div class="pt-2">{{ item.title }} :</div>
                  <v-list dense>
                    <v-list-item-group v-model="filter[item.value]">
                      <v-list-item
                        v-for="(subitem, subindex) in item.items"
                        :key="`sort-by-${key}-${subindex}`"
                        class="px-0"
                        :value="subitem.value"
                        active-class="transparent"
                        style="min-height: 24px"
                      >
                        <template v-slot:default="{ active }">
                          <v-list-item-action class="mr-2 my-1">
                            <v-checkbox
                              :input-value="active"
                              :ripple="false"
                              color="primary"
                              dense
                            />
                          </v-list-item-action>
                          <v-list-item-content
                            v-text="subitem.name"
                            class="py-1"
                          />
                        </template>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-layout>
                <v-layout column outlined>
                  <div class="pt-2">
                    {{ $t("form.common.label.sort_by") }} :
                  </div>
                  <v-list dense class="px-0">
                    <v-list-item
                      v-for="sort in orderItems"
                      :key="`sort-by-${sort.value}`"
                      style="min-height: 24px"
                      class="px-0"
                    >
                      <v-list-item-content class="py-1" v-text="sort.text" />
                      <v-list-item-action class="my-0">
                        <v-btn
                          @click="selectOrdering(sort.value)"
                          :color="activeSortColor(sort.value)"
                          class="rounded"
                          outlined
                          x-small
                          icon
                        >
                          <v-icon v-text="sort.iconAsc" small />
                        </v-btn>
                      </v-list-item-action>
                      <v-list-item-action
                        v-if="sort.iconDesc"
                        class="my-0 ml-1"
                      >
                        <v-btn
                          @click="selectOrdering('-' + sort.value)"
                          :color="activeSortColor('-' + sort.value)"
                          class="rounded"
                          outlined
                          x-small
                          icon
                        >
                          <v-icon v-text="sort.iconDesc" small />
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-layout>
              </v-layout>
            </v-card-text>
            <v-divider class="my-0"></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="clearSearch" color="warning" outlined small>
                {{ $t("form.common.label.clear_filter") }}
              </v-btn>
            </v-card-actions>
            <v-divider class="my-0"></v-divider>
            <v-card-text v-if="dataList.length" class="text-center">
              {{ $t("network.showing") }}
              <strong>{{ dataList.length }} </strong>
              {{ $t("network.of") }} {{ itemCount }}
              {{ $t("network.result") }}
            </v-card-text>
            <v-card-text v-else class="text-center"
              >{{ $t("noItem") }}
            </v-card-text>
          </v-card>
          <CardProgramSharing />
        </v-col>
        <v-col cols="12" md="8" lg="9">
          <v-row>
            <v-col cols="12">
              <v-progress-linear
                v-show="isLoading"
                color="primary"
                indeterminate
              ></v-progress-linear>
              <v-card style="min-height: 50vh" rounded="lg" flat>
                <v-card-text>
                  <v-row class="mb-8">
                    <v-col
                      v-for="p in dataList"
                      :key="p.id"
                      cols="12"
                      sm="6"
                      lg="4"
                    >
                      <CardViewProgram
                        :title="p.title"
                        :thumbnail="p.image"
                        :program-id="p.id"
                        :is-active="p.is_active"
                        :is-saving="savingId == p.id"
                        :is-saved="p.is_saved"
                        :program-type="p.program_type.name"
                        class="fill-height"
                      />
                    </v-col>
                  </v-row>
                  <CardNoItem :visible="visibleEmpty" />

                  <v-pagination
                    v-if="totalPage > 1"
                    @input="onPageChange"
                    :value="currentPage"
                    :total-visible="7"
                    :length="totalPage"
                    :disabled="isLoading"
                  ></v-pagination>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-layout>
      <DialogPreviewProgram
        :visible.sync="dialogPreview"
        :detail="preview"
        :loading="isLoading"
      />
    </v-container>

    <FormProgramSubmit
      :visible="dialog"
      @close="closeDialog"
      :form="form"
      @submitProgram="handleProgramSubmit"
      :programTypes="programTypes"
      :programCategories="programCategories"
      :loadingProgramTypes="loadingProgramTypes"
      :loadingProgramCategories="loadingProgramCategories"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import PageHeader from "@/components/Common/PageHeader";
import SimpleCard from "@/components/CardView/SimpleCard";
import DateRangePickerDialog from "@/components/pickers/DateRangePickerDialog.vue";
import CardNoItem from "@/components/CardView/CardNoItem.vue";
import DialogPreviewProgram from "@/components/dialogs/DialogPreviewProgram.vue";
import CardProgramSharing from "@/components/CardView/CardProgramSharing.vue";

export default {
  data() {
    return {
      bannerUrl:
        "https://media.startupcambodia.gov.kh/platform/public-assets/banners/program.png",
      dialogDate: false,
      dialogPreview: false,
      preview: null,
      savingId: null,
      filter: {
        sort: "",
        search: "",
        date: [],
        category: "",
        program_type: "",
      },
      dialog: false,
      programTypes: [],
      programCategories: [],
      loadingProgramTypes: false,
      loadingProgramCategories: false,
      form: {
        email: "",
        phone: "",
        title: "",
        content: "",
        description: "",
        program_type: null,
        category: null,
        is_local: null,
        start_date: "",
        end_date: "",
        address: "",
        apply_url: "",
        image: null,
        programcoverage: null,
      },
    };
  },
  head() {
    const img = this.preview?.image || "/images/yfp.jpeg";
    const title = this.preview?.title || "Explore all programs";
    const descHtml = this.preview?.description || "";
    const desc = descHtml.replace(/<[^>]+>/g, "").slice(0, 255);
    return {
      title,
      meta: [
        { hid: "og:image", property: "og:image", content: img },
        { hid: "description", name: "description", content: desc },
        {
          hid: "og:description",
          property: "og:description",
          content: desc,
        },
        { hid: "og:title", property: "og:title", content: title },
        { hid: "image", name: "image", content: img },

        {
          hid: "twitter:image",
          property: "twitter:image",
          content: img,
        },
        {
          hid: "twitter:title",
          property: "twitter:title",
          content: title,
        },
        {
          hid: "twitter:description",
          property: "twitter:description",
          content: desc,
        },
        {
          hid: "twitter:card",
          property: "twitter:card",
          content: "summary_large_image",
        },
      ],
    };
  },
  layout: "common",
  components: {
    PageHeader,
    SimpleCard,
    DateRangePickerDialog,
    CardNoItem,
    DialogPreviewProgram,
    CardProgramSharing,
  },
  computed: {
    ...mapState("startup-program", [
      "dataList",
      "isLoading",
      "totalPage",
      "itemCount",
    ]),
    ...mapState("user", ["currentUser"]),
    ...mapState("startup-program-category", {
      programCategoryList: "dataList",
    }),
    visibleSearch() {
      let { visible_search } = this.$route.query;
      return !!visible_search;
    },
    programTypesList() {
      return [
        {
          id: 1,
          name: this.$i18n.locale === "km" ? "កម្មវិធីជាតិ" : "National",
          name_km: "ជាតិ",
          code: "NTL",
          description: "National Program",
        },
        {
          id: 2,
          name:
            this.$i18n.locale === "km" ? "កម្មវិធីអន្តរជាតិ" : "International",
          name_km: "អន្តរជាតិ",
          code: "GLO",
          description: "International Program",
        },
      ];
    },
    visibleEmpty() {
      return !this.isLoading && !this.dataList.length;
    },
    currentPage() {
      return Number(this.$route.query.page || 1);
    },
    selectedId() {
      return this.$route.query.id;
    },
    breadCrumbs() {
      return [
        { homePage: true, text: this.$t("breadcrumb.home"), to: "/" },
        { text: this.$t("breadcrumb.programs"), disabled: true },
      ];
    },
    orderItems() {
      return [
        {
          text: this.$t("form.common.label.default"),
          value: "",
          iconAsc: "mdi-sort",
        },
        {
          text: this.$t("form.common.label.name"),
          value: "title",
          iconAsc: "mdi-sort-alphabetical-ascending",
          iconDesc: "mdi-sort-alphabetical-descending",
        },
        {
          text: this.$t("form.common.label.end_date"),
          value: "end_date",
          iconAsc: "mdi-sort-calendar-ascending",
          iconDesc: "mdi-sort-calendar-descending",
        },
      ];
    },
    filterItems() {
      return [
        {
          title: this.$t("program_type"),
          name: "program_type",
          value: "program_type",
          items: this.programTypesList.map((item) => ({
            ...item,
            value: encodeURIComponent(item.code),
          })),
        },

        {
          title: this.$t("category"),
          name: "category",
          value: "category",
          items: this.programCategoryList.map((item) => ({
            ...item,
            value: encodeURIComponent(item.slug),
          })),
        },
      ];
    },
  },
  watch: {
    "$route.query.showForm"(val) {
      this.dialog = val === "true";
    },
    "filter.search"(v) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.onFilterChange("search", v);
      }, 800);
    },
    "filter.sort"(v) {
      this.onFilterChange("sort", v);
    },
    "$route.query.sort": {
      handler(v) {
        if (this.selectedId) return;
        this.filter.sort = v || "";
        this.handleSearch();
      },
    },
    "$route.query.search": {
      handler(v) {
        if (this.selectedId) return;
        this.filter.search = v || undefined;
        this.handleSearch();
      },
    },
    "$route.query.start_end_date": {
      handler(v) {
        if (this.selectedId) return;
        this.filter.date = Object.assign([], v ? v.split(",") : []);
        this.handleSearch();
      },
    },

    "filter.category"(v) {
      this.onFilterChange("category", v);
    },

    "filter.program_type"(v) {
      this.onFilterChange("program_type", v);
    },

    "$route.query.category"(v) {
      this.filter.category = v;

      this.handleSearch();
    },

    "$route.query.program_type"(v) {
      this.filter.program_type = v;

      this.handleSearch();
    },
    currentPage: {
      handler(pageNumber) {
        this.fetchFiltering(pageNumber);
      },
    },
    selectedId: {
      handler(id) {
        if (!id) return;
        this.fetchDetail();
      },
    },
    dialogPreview(v) {
      if (!v) {
        const { query } = this.$route;
        $nuxt.$router.push({ query: { ...query, id: undefined } });
        this.preview = null;
      }
    },
  },
  async fetch() {
    await this.fetchDetail();
    const { page, sort, search, start_end_date, category, program_type } =
      this.$route.query;
    console.log(this.$route.query);
    this.filter.sort = sort;
    this.filter.search = search;
    this.filter.date = start_end_date?.split(",") || [];
    this.filter.category = category;
    this.filter.program_type = program_type;
  },
  mounted() {
    this.fetchProgramTypes();
    this.fetchProgramCategories();
    const { category, program_type } = this.$route.query;
    this.filter.program_type = program_type;
    this.filter.category = category;
    this.fetchFiltering();
    this.fetchProgramCategory();
    if (this.$route.query.showForm) {
      this.dialog = true;
    }
  },
  methods: {
    ...mapActions("startup-program", {
      fetAll: "get",
      fetchById: "getById",
    }),
    ...mapActions("app", ["setAuthDialogVisibility"]),
    ...mapActions("startup-program-category", { fetchProgramCategory: "get" }),
    fetchDetail() {
      const id = this.selectedId;
      if (!id) return;
      this.dialogPreview = true;
      const detail = this.fetchById({ id });
      detail.then((result) => {
        this.preview = Object.assign({}, result);
      });
      return detail;
    },
    async handleProgramSubmit() {
      try {
        const formData = new FormData();

        for (const key in this.form) {
          if (key !== "image") {
            formData.append(key, this.form[key] ?? "");
          }
        }

        if (this.form.image) {
          formData.append("image", this.form.image);
        }

        await this.$axios.post("/api/v1/program/submission/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Your program was submitted successfully!");
        this.resetForm(); // ← make sure this resets `this.form`
        this.dialog = false;
        this.$router.replace({ path: this.$route.path });
      } catch (err) {
        console.error(
          "API submission error:",
          err.response?.data || err.message
        );
      }
    },
    resetForm() {
      this.form = {
        email: "",
        phone: "",
        title: "",
        content: "",
        description: "",
        program_type: null,
        category: null,
        is_local: null,
        start_date: "",
        end_date: "",
        address: "",
        apply_url: "",
        image: null,
        programCoverages: [],
      };

      this.$nextTick(() => {
        if (this.$refs.step1 && this.$refs.step1.resetValidation) {
          this.$refs.step1.resetValidation();
        }
      });
    },
    async fetchProgramTypes() {
      this.loadingProgramTypes = true;
      try {
        const res = await this.$axios.get(
          "public/api/v1/startup-program-type/"
        );

        this.programTypes = res.data.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
      } catch (error) {
        console.error("Failed to fetch program types:", error);
      } finally {
        this.loadingProgramTypes = false;
      }
    },
    async fetchProgramCategories() {
      this.loadingProgramCategories = true;
      try {
        const res = await this.$axios.get(
          "public/api/v1/startup-program-category/"
        );

        this.programCategories = res.data.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
      } catch (error) {
        console.error("Failed to fetch program types:", error);
      } finally {
        this.loadingProgramCategories = false;
      }
    },
    closeDialog() {
      this.dialog = false;

      const { query } = this.$route;
      const newQuery = { ...query };
      delete newQuery.showForm;
      this.$router.replace({ query: newQuery });

      // Reset the form here
      this.resetForm();
    },
    toggleSearch() {
      const { query } = this.$route;
      let visible_search = query.visible_search;
      visible_search = !visible_search ? true : undefined;
      this.$router.replace({ query: { ...query, visible_search } });
    },
    activeSortColor(value = "") {
      const s = this.filter.sort || "";
      if (s == value) return "primary";
    },
    clearSearch() {
      const { query } = this.$route;
      this.$router.push({ query: { ...query, search: undefined } });
    },
    selectOrdering(value) {
      this.filter.sort = value;
    },
    handleSearch() {
      if (this.currentPage != 1)
        this.$router.replace({
          query: { ...this.$route.query, page: 1 },
        });
      if (this.searchTimer) {
        clearTimeout(this.searchTimer);
        this.searchTimer = null;
      }
      return this.fetchFiltering();
    },
    pickedDate() {
      this.onFilterChange("start_end_date", this.filter.date.join(","));
    },
    onFilterChange(key, val) {
      const { query } = this.$route;
      $nuxt.$router.push({
        query: { ...query, [key]: val || undefined },
      });
    },
    onPageChange(page) {
      if (page == this.currentPage) return;
      const { query } = this.$route;
      $nuxt.$router.push({ query: { ...query, page } });
    },
    async fetchFiltering(page = 1) {
      const { sort, search, date, category, program_type } = this.filter;
      const params = {
        search,
        page,
        page_size: 12,
        ordering: sort || undefined,
        start_end_date: date.join(",") || undefined,
        category,
        program_type,
      };
      return await this.fetAll({ params });
    },
    viewItem(id) {
      const { query } = this.$route;
      if (query.id == id) return;
      $nuxt.$router.push({ query: { ...query, id } });
    },
    programDetailPage() {
      this.$router.push({ path: `/program`, params: { id: this.preview.id } });
    },
  },
};
</script>

<style scoped>
.container-program {
  min-height: 47vh;
}

.program-card__wrapper {
  position: relative !important;
}

.program-card__wrapper .program-card__status {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
}
.submit-btn {
  background: linear-gradient(90deg, #f07900, #ffa500);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  display: inline-block;
  text-transform: none;
}
.inner-shadow-btn {
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.25);
}
.custom-ripple {
  background-color: rgba(240, 121, 0, 0.3);
}
</style>
