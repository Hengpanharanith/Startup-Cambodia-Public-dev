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
      height: "200px",
      chart: undefined,
    };
  },
  mounted() {
    setTimeout(() => {
      this.updateChartHeight();
      this.updateChart();
    }, 2000);
    window.addEventListener("resize", () => {
      this.updateChartHeight();
      this.updateChart();
    });
  },
  watch: {
    dataset: {
      handler() {
        this.updateChartHeight();
        this.updateChart();
      },
      // deep: true,
    },
  },
  methods: {
    updateChartHeight() {
      this.height = `${this.$refs.chartElement.clientHeight || 200}px`;
    },
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
          top: "0",
          right: "2%",
          left: "3%",
          bottom: "0",
          containLabel: true,
        },
        xAxis: {
          show: false,
        },
        yAxis: {
          data: labels,
          type: "category",
          inverse: true,
          axisLabel: {
            show: false,
            fontFamily,
            fontSize: 12,
          },
        },
        series: [
          {
            data: values,
            type: "bar",
            itemStyle: {
              color: (param) => {
                if (!this.sortColor) return this.colors[0];
                return this.colors[param.dataIndex] || this.colors[0];
              },
            },
            label: {
              show: true,
              precision: 1,
              position: "insideLeft",
              verticalAlign: "middle",
              distance: 15,
              valueAnimation: true,
              color: "#fff",
              fontFamily,
              formatter: "{c}  {name|{b}}",
              fontSize: 16,
              // formatter: (val) => this.$localeNumb(val.value.toLocaleString()),

              rich: {
                name: {},
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
  },
};
</script>
