<template>
  <v-card class="fill-height d-flex flex-column" rounded="lg">
    <v-card-title class="justify-center text-break text-uppercase">
      <h3>{{ title }}</h3>
    </v-card-title>
    <div
      class="flex-fill px-4"
      style="min-height: 200px"
      ref="chartElement"
    ></div>
    <slot></slot>
    <v-overlay absolute :value="loading" opacity="0.2">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>
<script>
import * as echarts from "echarts";
const colors = [
  "#334d9a",
  "#3a56ad",
  "#4160c0",
  "#5470c6",
  "#6780cc",
  "#7a90d3",
  "#8da0d9",
];
export default {
  props: {
    title: String,
    loading: Boolean,
    sortColor: Boolean,
    dataset: { type: Array, default: () => [] },
    colors: { type: Array, default: () => colors },
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
  watch: {
    dataset: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
  },
  methods: {
    getOptions() {
      const values = this.dataset.map(({ value }) => value);
      const labels = this.dataset.map((item) => item.name);
      const fontFamily = "Arial, Helvetica Neue, KantumruyPro-Regular, Helvetica, sans-serif";
      return {
        title: { textStyle: { fontFamily } },
        tooltip: {
          trigger: "axis",
          textStyle: { fontFamily },
          valueFormatter: (val) => this.$localeNumb(val.toLocaleString()),
        },
        grid: {
          top: "2%",
          right: "2%",
          left: "10%",
          bottom: "2%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          show: true,
          data: labels,
          axisLabel: {
            fontFamily,
            fontSize: 12,
            rotate: 30,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: values,
            type: "bar",
            itemStyle: {
              color: (param) => {
                if (!this.sortColor) return colors[0];
                return this.colors[param.dataIndex] || colors[0];
              },
            },
          },
        ],
      };
    },
    initChart() {
      const el = this.$refs.chartElement;
      this.chart = echarts.init(el);
      this.chart.on("click", (params) => {
        const item = this.dataset[params.dataIndex];
        this.$emit("click-chart-item", item);
      });
    },
    updateChart() {
      if (!this.chart) {
        this.initChart();
      }
      this.chart.setOption(this.getOptions());
      this.chart.resize();
    },
    getPercentage(value) {
      const total = this.dataset.reduce(
        (result, item) => Number(result + item.value) || 0,
        0
      );

      if (total == 0) return "0%";
      const percentage = (value / total) * 100;
      return `${+percentage.toFixed(2)}%`;
    },
  },
};
</script>
