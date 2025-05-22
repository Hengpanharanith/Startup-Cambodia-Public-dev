<template>
  <div style="width: 100%; height: 100%" ref="chartElement"></div>
</template>
<script>
import * as echarts from "echarts";

export default {
  props: {
    title: String,
    dataset: { type: Array, default: () => [] },
  },
  data() {
    return {
      chart: undefined,
    };
  },
  mounted() {
    this.updateChart();
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
      return {
        color: [
          "#334d9a",
          "#3a56ad",
          "#4160c0",
          "#5470c6",
          "#6780cc",
          "#7a90d3",
          "#8da0d9",
        ],
        legend: {
          show: false,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        yAxis: {
          type: "value",
          show: false,
        },
        grid: {
          top: "8%",
          bottom: "8%",
        },
        xAxis: {
          type: "category",
          data: [this.title || ""],
        },
        series: this.dataset.map((item, index) => {
          const roundedTop = index < this.dataset.length - 1 ? 0 : 8;

          return {
            name: item.label,
            type: "bar",
            stack: "total",
            barWidth: "60%",
            itemStyle: { borderRadius: [roundedTop, roundedTop, 0, 0] },
            label: {
              show: true,
              formatter: (params) => this.getPercentage(params.value),
            },
            data: [item.value],
          };
        }),
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
