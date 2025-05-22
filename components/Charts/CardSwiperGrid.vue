<template>
  <v-card class="fill-height card-pie-chart d-flex flex-column" rounded="lg" elevation="0">
    <v-card-title class="justify-center text-center text-break text-uppercase">
      <h3>{{ title }}</h3>
    </v-card-title>
    <v-card-text class="my-auto">
      <v-row class="justify-center" dense>
        <v-col
          v-for="(item, index) in dataset"
          :cols="cols"
          :key="item.name"
          @click="() => $emit('click-chart-item', item)"
          class="cursor-pointer"
        >
          <CardStakeholderCounterSimple
            class="fill-height"
            :icon="item.icon"
            :label="item.name"
            :amount="item.value"
            :color="colors[index % colors.length]"
            :style="{
              backgroundColor: colors[index % colors.length] + '05',
            }"
            compact
          />
        </v-col>
      </v-row>
    </v-card-text>

    <v-overlay absolute :value="loading" opacity="0.2">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
// import * as echarts from "echarts";
const colors = [
  "#334d9a",
  "#4160c0",
  "#744da2",
  "#a8489d",
  "#d4458e",
  "#f44c76",
  "#ff6358",
  "#ff8337",
  "#ffa600",
];
export default {
  props: {
    title: String,
    loading: Boolean,
    colors: { type: Array, default: () => colors },
    dataset: { type: Array, default: () => [] },
    cols: { type: [Number, String], default: 4 },
  },
  data() {
    return {
      chart: undefined,
    };
  },
  mounted() {
    this.updateChart();
    this.$nextTick(() => {
      window.addEventListener("resize", this.updateChart);
    });
  },
  computed: {
    totalValue() {
      return this.dataset.reduce((acc, item) => acc + item.value, 0);
    },
    groupedDataset() {
      const groupedData = [];
      for (let i = 0; i < this.dataset.length; i += 4) {
        groupedData.push(this.dataset.slice(i, i + 4));
      }
      return groupedData;
    },
  },
  watch: {
    dataset: {
      handler() {
        this.updateChart();
      },
    },
  },
  methods: {
    getOptions() {
      return {
        color: this.colors,
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "treemap",
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 4,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: true,
              position: "inner",
            },
            breadcrumb: {
              show: false,
            },
            roam: false,
            nodeClick: false,
            data: this.dataset,
          },
        ],
      };
    },
    initChart() {
      // const el = this.$refs.chartElement;
      // this.chart = echarts.init(el);
      // this.chart.on("click", (params) => {
      //   console.log(this.dataset);
      //   this.$emit("click-chart-item", params.data);
      // });
    },
    updateChart() {
      // if (!this.chart) {
      //   this.initChart();
      // }
      // this.chart.setOption(this.getOptions());
      // this.chart.resize();
    },
  },
};
</script>

<style lang="scss">
.card-pie-chart {
  .total-count {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    gap: 8px;
    pointer-events: none;
  }
  .label {
    font-size: 0.75rem;
  }
}
</style>
