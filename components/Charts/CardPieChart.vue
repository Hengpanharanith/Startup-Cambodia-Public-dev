<template>
  <v-card
    class="fill-height card-pie-chart d-flex flex-column"
    rounded="lg"
    elevation="2"
  
    
  >
    <v-card-title class="text-uppercase justify-center text-center text-break">
      <h3>{{ title }}</h3>
    </v-card-title>
    <v-card-text class="mt-auto position-relative">
      <div style="aspect-ratio: 16/9">
        <div style="width: 100%; height: 100%" ref="chartElement"></div>
      </div>
      <div class="total-count">
        <h2>{{ totalValue }}</h2>
        <p class="mb-0">{{ $t("totalss") }}</p>
      </div>
    </v-card-text>
    <v-card-text class="pt-0">
      <v-layout style="gap: 0.5rem" class="justify-center" wrap>
        <div
          v-for="(item, index) in dataset"
          :key="item.name"
          class="d-flex flex-column text-center pt-0 px-1"
        >
          <p class="label my-auto text-no-wrap">
            <span
              class="indicator"
              :style="{ backgroundColor: colors[index] }"
            ></span>
            {{ item.name }}
          </p>
        </div>
      </v-layout>
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
    showLegend: Boolean,
    showPercentage: Boolean,
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
  computed: {
    totalValue() {
      return this.dataset.reduce((acc, item) => acc + item.value, 0);
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
        legend: {
          show: false,
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "90%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: this.showPercentage,
              position: "inside",
              formatter: "{d}%",
            },
            emphasis: {
              label: {
                show: false,
              },
            },
            labelLine: {
              show: false,
            },
            data: this.dataset,
          },
        ],
      };
    },
    initChart() {
      const el = this.$refs.chartElement;
      this.chart = echarts.init(el);
      this.chart.on("click", (params) => {
        this.$emit("click-chart-item", params.data);
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
  .indicator {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
}
</style>
