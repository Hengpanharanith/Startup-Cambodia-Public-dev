<template>
  <v-container class="event-detail pt-6 mb-6">
    <BreadcrumbsAdvanced :breadcrumb-items="breadCrumbs" />
    <v-row class="mt-4">
      <v-col cols="12" md="8">
        <v-card flat rounded="lg">
          <v-card-text>
            <v-img
              :aspect-ratio="16 / 9"
              :src="programDetail.image"
              class="rounded-lg mb-4"
              height="393"
            />
            <p
              class="text-break line-clamp-3 mb-0 block-title__text pl-4 mt-3 black--text"
              v-text="programDetail.title"
            />
            <v-card-text>
              <v-chip
                v-text="programDetail?.program_type?.name"
                color="success"
                label
                small
              />
              <v-chip
                v-text="programDetail?.category?.name"
                color="primary"
                label
                small
              />
            </v-card-text>

            <v-card-actions>
              <a v-if="esoProfile" :href="linkToEso">
                <v-list-item-avatar class="mr-2" tile>
                  <img :src="esoProfile?.eso_logo" />
                </v-list-item-avatar>
              </a>
              <v-list-item-avatar class="mr-2" tile v-else>
                <img
                  src="/images/startup-cambodia-icon.png"
                  alt="startup-cambodia"
                />
              </v-list-item-avatar>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title v-if="esoProfile">
                    <a :href="linkToEso" v-text="esoProfile?.eso_name" />
                  </v-list-item-title>
                  <v-list-item-title v-else v-text="$t('startup_cambodia')" />
                  <v-list-item-subtitle>
                    {{ publishedAt }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-actions>
            <v-list dense>
              <v-list-item>
                <v-list-item-icon class="mr-4">
                  <v-icon> mdi-calendar </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-subtitle style="line-height: 1.5">
                    {{ programDetail.start_date }}
                    {{ $t("form.common.label.to") }}
                    {{ programDetail.end_date }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon class="mr-4">
                  <v-icon> mdi-map-marker-outline </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-subtitle
                    v-text="programDetail.address || 'N/A'"
                  />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>

          <v-card-text :class="!expanded ? 'blur-container' : ''">
            <p
              v-html="programDetail.content"
              class="ql-editor"
              style="overflow: hidden"
              v-show="!expanded"
            ></p>
            <v-expand-transition>
              <div v-show="expanded">
                <p v-html="programDetail.content" class="ql-editor"></p>
              </div>
            </v-expand-transition>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn text @click="expanded = !expanded">
              {{ expanded ? "See Less" : "See More" }}

              <v-icon right>
                {{ expanded ? "mdi-chevron-up" : "mdi-chevron-down" }}
              </v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-btn color="success" :to="programDetail.apply_url">
              Apply now
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-if="notableStartups.length" flat>
          <v-card-title> Notable Startups </v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                cols="6"
                sm="3"
                md="4"
                v-for="item in notableStartups"
                :key="`notable-startup-${item.id}`"
              >
                <CardStartupNotable
                  :id="item.id"
                  :name="item.name"
                  :logo="item.logo"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card rounded="lg" flat>
          <v-card-title> Recently Programs </v-card-title>
          <v-card-text>
            <CardViewProgram
              v-for="p in recentlyPrograms"
              :key="p.id"
              :title="p.title"
              :thumbnail="p.image"
              :program-id="p.id"
              :is-active="p.is_active"
              :is-saved="p.is_saved"
              :program-type="p.program_type?.name"
              class="fill-height mb-4"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      expanded: false,
      programDetail: { type: Object, default: {} },
    };
  },
  computed: {
    ...mapState("startup-program", ["recentList"]),
    recentlyPrograms() {
      return this.recentList
        .filter((item) => item.id != this.selectedId)
        .slice(0, 3);
    },
    esoProfile() {
      return this.programDetail.eso_cohort;
    },
    linkToEso() {
      const id = this.esoProfile?.eso_id;
      if (!!id) return "/ecosystem/discover/category/eso/" + id;
      return "#";
    },
    breadCrumbs() {
      let breadcrumb = [
        { homePage: true, text: this.$t("breadcrumb.home"), to: "/" },
        { text: this.$t("breadcrumb.programs"), to: "/program" },
      ];
      // if (!this.event.title) breadcrumb;
      breadcrumb.push({ text: "Program title", disabled: true });
      return breadcrumb;
    },
    selectedId() {
      return this.$route.params.programId;
    },
    publishedAt() {
      if (this.programDetail.published_date)
        return this.$moment(this.programDetail.published_date).format(
          "DD-MMMM-yyyy hh:mm A"
        );
    },
    notableStartups() {
      return [
        {
          id: 502,
          logo: "https://media.startupcambodia.gov.kh/platform/core/stakeholder/logos/f0e1ef48-f058-491a-b790-d0ad17ad0878.png",
          name: "LegoLego",
          status: "approved",
          email: "thydaduong.marady@techostartup.center",
        },
        {
          id: 461,
          logo: "https://media.startupcambodia.gov.kh/platform/core/stakeholder/logos/bakong.png",
          name: "Bakong",
          status: "approved",
          email: "misapisatto@gmail.com",
        },
      ];
    },
  },
  methods: {
    ...mapActions("startup-program", [
      "getById",
      "getRecentlyProgram",
      "toggleSaveProps",
    ]),
    viewOrganizerProfile(id) {
      console.log("viewOrganizerProfile=====", id);

      // this.$router.push(`/eso/${id}`)
    },

    fetchDetail() {
      const id = this.selectedId;
      if (!id) return;
      // this.dialogPreview = true;
      const detail = this.getById({ id });
      detail.then((result) => {
        this.programDetail = Object.assign({}, result);
      });
      return detail;
    },
  },

  mounted() {
    this.fetchDetail();
    this.getRecentlyProgram({ params: { page_size: 4 } });
  },
};
</script>
<style scoped>
.blur-container {
  mask-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 50%
  );
  -webkit-mask-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 50%
  );
  height: 150px;
}
</style>
