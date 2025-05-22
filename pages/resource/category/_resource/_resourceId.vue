<template>
  <v-container>
    <BreadcrumbsAdvanced :breadcrumb-items="breadCrumbs" />
    <v-progress-linear
      v-show="isLoading"
      color="primary"
      indeterminate
    ></v-progress-linear>
    <br />
    <v-expand-transition>
      <div v-if="!isLoading && resource">
        <v-row>
          <v-col cols="12" md="8">
            <v-card rounded="lg" flat class="blog-one__single" id="cardContent">
              <v-card-title>
                <h3 class="text-break">{{ resource.name }}</h3>
              </v-card-title>
              <v-card-text>
                <v-img
                  contain
                  max-height="350"
                  class="blog-thumbnail"
                  :src="resource.thumbnail || '/images/default-image.png'"
                  :alt="resource.name"
                  :aspect-ratio="16 / 9"
                >
                </v-img>
                <v-card-actions>
                  <v-layout class="align-center gap-sm" wrap>
                    <span class="blogDate font-weight-light" style="">
                      {{
                        $moment(resource.published_date).format("MMMM DD, YYYY")
                      }}
                    </span>
                    <template
                      v-if="resource.sectors && resource.sectors.length"
                    >
                      <v-chip
                        small
                        color="#FEEBCA"
                        v-for="sector in resource.sectors"
                        :key="sector.id"
                        :to="{
                          path: '/resource/category/blog',
                          query: {
                            sectors: sector.name,
                            visible_search: true,
                          },
                        }"
                      >
                        {{ sector.name }}
                      </v-chip>
                    </template>
                  </v-layout>
                  <v-layout class="flex-grow-0 flex-shrink-0">
                    <v-btn
                      @click="toggleSaveFile"
                      :loading="isSaving"
                      class="elevation-0 py-4"
                      color="primary"
                      large
                      icon
                      tile
                    >
                      <v-icon small>
                        {{ isSaved ? "mdi-bookmark" : "mdi-bookmark-outline" }}
                      </v-icon>
                    </v-btn>
                    <v-menu>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          class="elevation-0 py-4"
                          color="primary"
                          large
                          icon
                          tile
                        >
                          <v-icon small>mdi-share-variant</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="(item, index) in shareOptions"
                          :key="index"
                          @click.stop="shareTo(resource, item.type)"
                        >
                          <v-list-item-icon class="mr-2">
                            <v-icon>{{ item.icon }}</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>{{ item.text }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-layout>
                </v-card-actions>
                <div
                  v-html="resource.detail"
                  id="blogContent"
                  class="ql-editor"
                ></div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card rounded="lg" class="card-resource-attachment" flat>
              <v-subheader>{{ $t("blog.label.about_author") }} </v-subheader>
              <v-card-text>
                <v-card :title="authorBio" rounded="lg" outlined>
                  <v-sheet class="grey lighten-5">
                    <v-card-text>
                      <v-layout class="gap">
                        <div class="flex-shrink-0 flex-grow-0">
                          <v-avatar size="48">
                            <v-img
                              :src="authorPhoto"
                              lazy-src="/images/default-user.png"
                            />
                          </v-avatar>
                        </div>

                        <div class="flex-grow-1">
                          <v-card-title
                            v-text="authorName"
                            class="pt-0 body-1"
                          />
                          <v-card-subtitle
                            class="pb-0"
                            v-text="authorOccupation"
                          />
                          <v-card-text class="pb-0">
                            {{ authorBio }}
                          </v-card-text>
                          <v-card-text v-if="authorSkills.length">
                            {{ $t("skills") }}:
                            <v-chip
                              class="ma-1 px-2"
                              color="#FEEBCA"
                              small
                              v-for="skill in authorSkills"
                              :key="skill"
                            >
                              {{ skill }}
                            </v-chip>
                          </v-card-text>
                        </div>
                      </v-layout>
                    </v-card-text>
                  </v-sheet>
                </v-card>
                <!-- <v-list-item three-line>
                  <v-list-item-avatar>
                      <v-img
                    :src="authorPhoto"
                    lazy-src="/images/default-user.png"
                    >
                    </v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-subtitle>
                      <h4>{{ authorName }}</h4>
                <p>{{ authorOccupation }}</p>
                <p v-if="authorSkills.length"><b>{{ $t("skills") }}:</b> 
                  <v-chip  class="ma-1 px-2" color="#FEEBCA" small v-for="skill in authorSkills" :key="skill">
                    {{ skill }}
                  </v-chip>
                </p>
                <p>{{ authorBio }}</p>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item> -->
                <!-- <v-avatar  size="72" class="mb-3">
                  <v-img
                  :src="authorPhoto"
                  lazy-src="/images/default-user.png"
                  >
                  </v-img>
                </v-avatar> -->
              </v-card-text>
              <v-subheader>{{ $t("blog.label.next_article") }} </v-subheader>
              <v-card-text v-if="resource.next_blogs">
                <v-list v-if="resource.next_blogs.length">
                  <v-list-item-group>
                    <template v-for="(item, index) in resource.next_blogs">
                      <v-list-item
                        v-if="resource.id != item.id"
                        :key="item.id"
                        :to="'/resource/category/blog/' + item.id"
                        class="blog-item"
                      >
                        <template v-slot>
                          <v-list-item-content>
                            <v-list-item-title
                              v-text="item.name"
                            ></v-list-item-title>

                            <v-list-item-subtitle
                              class="text--primary"
                              v-text="item.headline"
                            ></v-list-item-subtitle>

                            <v-list-item-subtitle
                              v-text="item.description"
                            ></v-list-item-subtitle>
                          </v-list-item-content>

                          <v-list-item-avatar tile size="72">
                            <v-img
                              contain
                              class="thumbnail"
                              :src="
                                item.thumbnail || '/images/default-image.png'
                              "
                              lazy-src="/images/default-image.png"
                            >
                            </v-img>
                          </v-list-item-avatar>
                        </template>
                      </v-list-item>

                      <v-divider
                        v-if="index < blogs.length - 1"
                        :key="index"
                      ></v-divider>
                    </template>
                  </v-list-item-group>
                </v-list>

                <!-- <v-list >
                  <v-list-item v-for="item in blogs" :key="item.id">
                    <v-list-item-content>
                        <v-list-item-title >{{ item.name }}</v-list-item-title>
                        <v-list-item-subtitle >{{ item.description }}</v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-avatar horizontal>
                      <v-img
                           cover
                   
                          :src="item.thumbnail || '/images/default-image.png'"
                          lazy-src="/images/default-image.png"
                          >
                          </v-img>
                    </v-list-item-avatar>
                  </v-list-item>
                </v-list> -->
              </v-card-text>
            </v-card>

            <!-- <h6 class="text-uppercase font-weight-bold">Attachement</h6> -->
            <!-- <v-card
                outlined
                rounded="lg"
                class="card-resource-attachment"
              >
                <v-card-title> {{ $t("resource.label.attachment") }} </v-card-title>
                <v-card-text class="text=break">
                  {{ resource.file.name }}
                </v-card-text>
                <v-card-text>
                  {{ $t("resource.label.size") }}: {{ resource.file.size }}
                  <v-btn
                    :href="resource.file.url"
                    :icon="true"
                    target="_blank"
                    color="primary"
                    large
                    icon
                  >
                    <v-icon small>mdi-download</v-icon>
                  </v-btn>
                </v-card-text>
              </v-card> -->
          </v-col>
        </v-row>
      </div>
    </v-expand-transition>
  </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
import LoadingCollapse from "@/components/LoadingCollapse.vue";

export default {
  head() {
    let url = "https://startupcambodia.gov.kh/";
    if (process.browser) url = window.location.href;

    let img = this.resource?.thumbnail;
    let title = this.resource?.name || "Resource Detail";
    const descHtml = this.resource?.detail || "";
    const desc = descHtml.replace(/<[^>]+>/g, "").slice(0, 255);

    return {
      title,
      meta: [
        { hid: "og:url", content: url },
        { hid: "og:title", property: "og:title", content: title },
        { hid: "og:type", property: "og:type", content: "article" },
        { hid: "image", name: "image", content: img },
        { hid: "og:image", property: "og:image", content: img },
        { hid: "description", name: "description", content: desc },
        {
          hid: "og:description",
          property: "og:description",
          content: desc,
        },
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
  components: { LoadingCollapse },
  data() {
    return {
      bannerUrl: "/images/resource/banner.png",
      fullPage: true,
      resource: {},
      isSave: false,
      blogs: [],
    };
  },
  computed: {
    ...mapState("resource-page", ["isLoading"]),
    ...mapState("resource", ["isLoading"]),
    ...mapState("saving-list", { isSaving: "isLoading" }),

    breadCrumbs() {
      return [
        { homePage: true, text: this.$t("breadcrumb.home"), to: "/" },
        { text: this.$t("breadcrumb.resources"), to: "/resource/category" },
        {
          text: this.$route.params.resource
            ? this.$t(`menu.resource.${this.$route.params.resource}`)
            : "",
          to: `/resource/category/${this.$route.params.resource || ""}`,
        },
      ];
    },
    shareOptions() {
      return [
        {
          text: this.$t("menu.share_to.linkedin"),
          icon: "mdi-linkedin",
          type: "linkedin",
        },
        {
          text: this.$t("menu.share_to.facebook"),
          icon: "mdi-facebook",
          type: "facebook",
        },
        {
          text: this.$t("menu.share_to.twitter"),
          icon: "mdi-twitter",
          type: "twitter",
        },
        {
          text: this.$t("menu.share_to.telegram"),
          icon: "mdi-send-circle",
          type: "telegram",
        },
        {
          text: this.$t("menu.share_to.clipboard"),
          icon: "mdi-content-copy",
          type: "copy",
        },
      ];
    },
    isSaved() {
      return this.resource?.is_saved;
    },
    saveIcon() {
      return this.isSaved ? "mdi-bookmark" : "mdi-bookmark-outline";
    },
    fileURL() {
      const DOMAIN2SHARE = this.$config.SHARE_URL || window?.location?.origin;
      return DOMAIN2SHARE + "/resource/category/blog/" + this.resource.id;
    },

    authorName() {
      return this.resource?.created_by == null
        ? this.$t("n_a1")
        : this.resource?.created_by.first_name +
            " " +
            this.resource?.created_by.last_name;
    },

    authorPhoto() {
      return (
        this.resource?.created_by?.photo_thumbnail || "/images/default-user.png"
      );
    },

    authorOccupation() {
      return this.resource?.created_by?.occupation || "";
    },

    authorBio() {
      return this.resource?.created_by?.bio || "";
    },
    authorSkills() {
      var displaySkills = [];
      var skills = this.resource?.created_by?.skills;

      if (skills) {
        skills.forEach((skill) => {
          this.$isKm()
            ? displaySkills.push(skill.name_km)
            : displaySkills.push(skill.name);
        });

        if(skills.length>3){
          const newArr = displaySkills.slice(0,3);
          displaySkills= newArr;
          displaySkills.push(`+ ${skills.length - newArr.length} ${ this.$t("others")}`)
        }
      }

      return displaySkills;
    },
  },
  methods: {
    ...mapActions("resource-page", { getResourcePage: "get" }),
    ...mapActions("resource", { getResourceById: "getById" }),
    ...mapActions("saving-list", { toggleBookmark: "create" }),
    ...mapActions("resource", ["getResourceByCategory"]),

    toggleSave() {
      const payload = { type: "blog", ref_id: this.resource.id };
      this.toggleBookmark({ payload })
        .then(() => {
          this.fileInfo.is_saved = !this.fileInfo.is_saved;
          this.$toast.show(this.$t("success"));
        })
        .catch((error) => {
          let message = error.response?.data?.message;
          this.$toast.error(message);
        });
    },
    goTop() {
      let options = { duration: 100, offset: 70, easing: "linear" };
      this.$vuetify.goTo("#cardContent", options);
    },
    copyLink() {
      const url = this.fileURL;
      if (!process.browser) return;
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url);
        this.$toast.show(this.$t("message.copied"));
        return;
      }

      const input = document.createElement("input");
      input.value = url;
      input.style.position = "fixed";
      input.style.left = "-999999px";
      input.style.top = "-999999px";
      document.body.appendChild(input);
      input.focus();
      input.select();
      document.execCommand("copy");
      input.remove();
      this.snackbar = true;
    },
    shareTo(resource, type) {
      if (type == "copy") {
        this.copyLink();
        return;
      }

      const DOMAIN2SHARE = this.$config.SHARE_URL || window?.location?.origin;
      let url = DOMAIN2SHARE + "/resource/category/blog" + this.resource.id;
      let text = resource.name;
      const shareURL = {
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&title=${text}&url=${url}`,
        facebook: `https://facebook.com/sharer/sharer.php?u=${url}`,
        twitter: `https://twitter.com/share?url=${url}&text=${text}`,
        telegram: `https://t.me/share/url?url=${url}&text=${text}`,
      };

      if (!!shareURL[type]) window.open(shareURL[type]);
    },
    toggleSaveFile() {
      const payload = { type: "blog", ref_id: this.resource.id };
      this.toggleBookmark({ payload })
        .then(() => {
          this.resource.is_saved = !this.resource.is_saved;
          // this.savingFileId = null;
          this.$toast.show(this.$t("success"));
        })
        .catch((error) => {
          let message = error.response?.data?.message || error;
          this.$toast.error(message);
          // this.savingFileId = null;
        });
    },
    forceRerender() {
      this.componentKey += 1;
    },

    async searchResource(page = 1) {
      // this.forceRerender();

      const category = this.categorySlug;
      const { search, sectors } = this.$route.query;
      let options = {
        params: { category, search, page, sectors, page_size: 5 },
      };
      return await this.getResourceByCategory(options)
        .then((res) => {
          // this.resources = this.$common.cloneJSON(res.data);
          this.blogs = this.$common.cloneJSON(res.data);
          console.log("searchResource=====",res);
          // this.totalPage = res.total_page;
          // this.itemCount = res.item_count;
          // this.noItem = !res.data.length;
        })
        .catch((e) => {
          // this.noItem = true;
          this.blogs = Object.assign([], []);
          // this.totalPage = 1;
        });
    },
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        let { resourceId } = this.$route.params;
        this.getResourceById({ id: resourceId })
          .then((res) => {
            this.resource = Object.assign({}, res);
            this.goTop();
          })
          .catch((e) => {});
        // fetch article list
        // const { page } = this.$route.query;
        // this.search.keyword = search;
        // this.search.sectors = sectors?.split(",") || [];
        // this.searchResource(page);
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },
  async fetch() {
    // const { page } = this.$route.query;
    // await this.searchResource(page);
  },
};
</script>
<style>
#blogContent img {
  width: 100%;
  height: auto;
}
#blogContent p {
  font-size: 1.15rem;
  /* line-height: 1.25rem; */
}
.card-resource-attachment {
  position: sticky;
  top: 6rem;
}

#blogContent iframe {
  width: 100% !important;
  height: auto !important;
  aspect-ratio: 16/9;
  margin-bottom: 0.5rem;
}

.blog-item:hover {
  background-color: lightgray;
  opacity: 1;
  transition: 0.3s;
}

#blogContent {
  font-weight: 400;
  line-height: 1.5rem;
  letter-spacing: 0.0071428571em;
  color: rgb(11, 11, 11) !important;
  font-size: 1.15rem;
}
#blogContent ol, #blogContent ul {
  padding-left: 24px !important;
}
#blogContent p {
  margin-bottom: 16px !important;
}
#blogContent img {
  width: 100%;
  height: auto;
}
#blogContent iframe {
  width: 100%!important;
  height: auto!important;
  aspect-ratio: 16/9;
  margin-bottom: 0.5rem;
}

</style>
