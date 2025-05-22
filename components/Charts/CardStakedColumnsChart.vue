<template>
  <v-card class="fill-height d-flex flex-column" rounded="lg" elevation="0">
    <v-card-title class="justify-center text-break text-uppercase">
      <h3>{{ title }}</h3>
    </v-card-title>
    <v-card-text class="flex-fill">
      <div style="width: 100%; height: 100%" ref="chartElement"></div>
    </v-card-text>

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
    colors: { type: Array, default: () => colors },
    dataset: { type: Array, default: () => [] },
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
      const series = [
        {
          name: "yes",
          type: "bar",
          barWidth: "40%",
          label: {
            show: true,
            formatter: (params) => +params.value + "%",
          },
          data: [],
          stack: "total",
        },
        {
          name: "no",
          type: "bar",
          barWidth: "40%",
          label: {
            show: true,
            formatter: (params) => +params.value + "%",
          },
          data: [],
          stack: "total",
        },
      ];
      const xLabels = [];
      this.dataset.forEach((item) => {
        xLabels.push(item.name);
        item.dataset.forEach((data) => {
          if (data.label.toLowerCase() == "yes") {
            series[0].data.push(data.value);
          } else {
            series[1].data.push(data.value);
          }
        });
      });

      return {
        color: this.colors,
        legend: { show: false },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          valueFormatter: (value) => +value + "%",
        },
        yAxis: { type: "value", show: false },
        grid: { top: "8%", bottom: "12%" },
        xAxis: { type: "category", data: xLabels },
        series,
      };
    },
    initChart() {
      const el = this.$refs.chartElement;
      this.chart = echarts.init(el);
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
