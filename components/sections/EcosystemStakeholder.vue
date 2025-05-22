<template>
  <v-container>
    <h1 class="text-center my-4">
      {{ $t("insight.stakeholder.title") }}
    </h1>
    <v-row>
      <v-col cols="12" md="6">
        <CardHero
          :subtitle="
            $t('insight.stakeholder.description', { count: list.length })
          "
          thumbnail="/images/ecosystem/undraw_control_panel_re_y3ar.svg"
          class="px-8"
        />
      </v-col>
      <v-col cols="12" md="6">
        <CardTreeMapChart
          @click-chart-item="onClickChartItem"
          :title="$t('insight.stakeholder.by_group')"
          :dataset="list"
          :loading="loading"
        />
      </v-col>
    </v-row>
    <v-dialog v-model="showDialog" max-width="768px" scrollable>
      <v-card >
        <v-card-title>
          {{ stakeholder.name }}

          <v-btn @click="showDialog = false" absolute top right icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-list>
            <template v-for="(item, index) in stakeholder.items || []">
              <v-divider
                v-if="index != 0"
                :key="`divider-${index}`"
              ></v-divider>
              <v-list-item
                v-if="item.name"
                :key="item.name_en"
                :to="`ecosystem/discover/category/${stakeholder.key}/${item.id}`"
              >
                <v-list-item-avatar size="64" tile>
                  <v-img contain :src="item.logo"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-card-title primary-title>
                    {{ item.name }}
                  </v-card-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      showDialog: false,
      stakeholder: {},
      list: [],
    };
  },
  computed: {
    iconsList() {
      return [
        require("@/static/icons/ecosystem/Government Institution_Black.svg?raw"),
        require("@/static/icons/ecosystem/Institution_Black.svg?raw"),
        require("@/static/icons/ecosystem/Service Provider_Black.svg?raw"),
        require("@/static/icons/ecosystem/Development Partner.svg?raw"),
        require("@/static/icons/ecosystem/Co Working Space_Black.svg?raw"),
        require("@/static/icons/ecosystem/Incubator_Black.svg?raw"),
        require("@/static/icons/ecosystem/Community_Black.svg?raw"),
        require("@/static/icons/ecosystem/Corporate_Black.svg?raw"),
        require("@/static/icons/ecosystem/Media_Black.svg?raw"),
      ];
    },
  },
  props: {},
  methods: {
    fetchData() {
      this.loading = true;
      this.$axios
        .get("/api/v1/data_insight/stakeholder")
        .then((res) => {
          const _list = res.data?.data || [];
          this.list = _list.map((item, index) => {
            return {
              ...item,
              icon: this.iconsList[index],
              name: item.name,
              value: item.total,
              // children: item.items || [],
            };
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onClickChartItem(item) {
      this.stakeholder = item;
      this.showDialog = true;
      // window.open(`/ecosystem/discover/category/${stakeholder}`);
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
