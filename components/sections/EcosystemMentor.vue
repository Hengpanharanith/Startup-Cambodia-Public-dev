<template>
  <v-container>
    <h1 class="text-center my-4">
      {{ $t("insight.mentor.title") }}
    </h1>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-card class="fill-height d-flex flex-column" rounded="lg" elevation="0">
          <v-card-title class="justify-center text-break text-uppercase">
            <h3>
              {{
                $t("insight.mentor.top_count_expertise", {
                  count: $localeNumb(5),
                })
              }}
            </h3>
          </v-card-title>
          <v-layout class="px-6 pb-6" style="gap: 0.25rem" column wrap>
            <div v-for="(item, index) in overview.data" :key="item.name">
              <v-label>
                {{ item.name }}
                <strong>
                  ({{ $localeNumb(item.total) }}/{{
                    $localeNumb(gender.total)
                  }})
                </strong>
              </v-label>
              <v-progress-linear
                :color="colors[index] || colors[0]"
                :value="item.percentage"
                height="28"
                readonly
              >
                <span>{{ $localeNumb(+item.percentage) }}%</span>
              </v-progress-linear>
            </div>
          </v-layout>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <CardStakedColumnsChart
          :title="$t('insight.mentor.by_field')"
          :loading="overview.loading"
          :dataset="overview.dataset"
          :colors="['#4fb1a1', '#df6e5b']"
        />
      </v-col>
      <v-col cols="12" md="4">
        <CardChartGender
          :title="$t('insight.mentor.female')"
          :total="gender.total"
          :femaleCount="gender.female"
        />
      </v-col>
    </v-row>
    <br />
    <client-only>
      <FeaturedSlider
        :title="$t('insight.mentor.featured')"
        :items="[...featured.dataset, ...featured.dataset]"
        :breakpoints="breakpoints"
      >
        <template v-slot="{ item }">
          <CardMentor
            :id="item.id"
            :to="`/ecosystem/discover/category/mentor/${item.id}`"
            :thumbnail="item.profile"
            :full-name="`${item.first_name} ${item.last_name}`"
            :interest="item.interest"
            :position="item.role"
            :company="item.company"
            :expertise="item.expertise"
            style="height: 300px"
            class="mb-8 fill-height"
          />
        </template>
      </FeaturedSlider>
    </client-only>
  </v-container>
</template>

<script>
const colors = ["#326199", "#4fb1a1", "#fcc055", "#eb8d50", "#df6e5b"];
export default {
  props: {},
  data() {
    return {
      colors,
      overview: {
        loading: false,
        dataset: [],
        data: [],
      },
      featured: {
        loading: false,
        dataset: [],
      },
      gender: {
        total: 10,
        female: 2,
      },
      breakpoints: {
        1024: {
          slidesPerView: 4,
        },
        768: {
          slidesPerView: 3,
        },
        640: {
          slidesPerView: 2,
        },
        0: {
          slidesPerView: 2,
        },
      },
    };
  },
  methods: {
    fetchOverview() {
      this.overview.loading = true;
      this.$axios
        .get("/api/v1/data_insight/mentor-overview")
        .then((res) => {
          const byExpertise = res.data.mentor_by_expertise || [];
          // const byGender = res.data.mentor_by_gender || [];
          const byOwnBiz = res.data.mentor_by_investor || [];
          const byPrevEnt = res.data.mentor_by_prev_entrepreneur || [];
          // {
          //   name: this.$t("gender"),
          //   dataset: byGender.map((item) => ({
          //     label: item.label,
          //     value: item.total,
          //   })),
          // },
          this.gender.total = res.data.mentor_by_gender.total || 0;
          this.gender.female = res.data.mentor_by_gender.female || 0;
          const dataset = [
            {
              name: this.$t("previous_entrepreneur"),
              dataset: byPrevEnt.map((item) => ({
                label: item.label,
                value: item.percentage,
              })),
            },
            {
              name: this.$t("mentor_by_investor"),
              dataset: byOwnBiz.map((item) => ({
                label: item.label,
                value: item.percentage,
              })),
            },
          ];
          this.overview.data = byExpertise.map((item) => ({
            ...item,
            name: item.expert?.name,
            value: item.total,
          }));
          this.overview.dataset = Object.assign([], dataset);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.overview.loading = false;
        });
    },
    fetchFeatured() {
      this.featured.loading = true;
      this.$axios
        .get("/api/v1/data_insight/mentor-highlighted")
        .then((res) => {
          this.featured.dataset = res.data.data || [];
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.featured.loading = false;
        });
    },
    onPieItemClick(item) {
      const exp = item?.expert?.name_en;
      window.open(`/ecosystem/discover/category/mentor?expertise=${exp}`);
    },
  },

  mounted() {
    this.fetchOverview();
    this.fetchFeatured();
  },
};
</script>
