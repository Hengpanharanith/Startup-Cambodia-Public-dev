<template>
  <v-card class="fill-height card-bubble-chart d-flex flex-column" rounded="lg">
    <v-card-title class="justify-center text-center text-break">
      <h3>{{ title }}</h3>
    </v-card-title>
    <v-card-text class="mt-auto">
      <v-responsive :aspect-ratio="16 / 9">
        <div style="width: 100%; height: 100%" ref="chartElement"></div>
      </v-responsive>
    </v-card-text>

    <v-overlay absolute :value="loading" opacity="0.2">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
import * as echarts from "echarts";
import * as d3 from "d3";
export default {
  props: {
    title: String,
    loading: Boolean,
    dataset: { type: Array, default: () => [] },
  },
  data() {
    return {
      chart: undefined,
      displayRoot: undefined,
    };
  },
  mounted() {
    this.updateChart();
    this.$nextTick(() => {
      window.addEventListener("resize", this.updateChart);
    });
  },
  computed: {
    seriesData() {
      const rootId = this.$t("ecosystem.stakeholder");
      const seriesData = [
        { id: rootId, value: this.dataset.length, depth: 0, index: 0 },
      ];
      this.dataset.forEach((item, index) => {
        const _name = item.name;
        const _item = {
          ...item,
          id: `${rootId}>${_name}`,
          value: item.total,
          depth: index + 1,
          index: seriesData.length,
        };
        seriesData.push(_item);
        const children = item.children || [];
        children.forEach((child) => {
          const _childName = child.name;
          seriesData.push({
            ...child,
            id: `${rootId}>${_name}>${_childName}`,
            value: child.value || 1,
            key: item.key,
            depth: index + 2,
            index: seriesData.length,
          });
        });
      });
      return seriesData;
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
    stratify() {
      const str = d3
        .stratify()
        .parentId((d) => {
          return d.id.substring(0, d.id.lastIndexOf(">"));
        })(this.seriesData)
        .sum((d) => d.value || 0)
        .sort((a, b) => b.value - a.value);
      return str;
    },
    getOptions() {
      const seriesData = this.seriesData;
      this.displayRoot = this.stratify();
      const overallLayout = (params, api) => {
        var context = params.context;
        d3
          .pack()
          .size([api.getWidth() - 2, api.getHeight() - 2])
          .padding(3)(this.displayRoot);
        context.nodes = {};
        this.displayRoot.descendants().forEach(function (node, index) {
          context.nodes[node.id] = node;
        });
      };
      function renderItem(params, api) {
        let context = params.context;
        // Only do that layout once each time `setOption` is called.
        if (!context.layout) {
          context.layout = true;
          overallLayout(params, api);
        }
        let nodePath = api.value("id");
        let node = context.nodes[nodePath];
        if (!node) {
          // Render nothing.
          return;
        }
        let isLeaf = !node.children || !node.children.length;
        let focus = new Uint32Array(
          node.descendants().map(function (node) {
            return node.data.index;
          })
        );
        let z2 = api.value("depth") * 2;
        const item = {
          type: "circle",
          focus: focus,
          shape: {
            cx: node.x,
            cy: node.y,
            r: node.r,
          },
          transition: ["shape"],
          z2: z2,
          style: {
            fill:
              isLeaf && node.data.logo
                ? {
                    image: node.data.logo,
                    repeat: "no-repeat",
                    backgroundSize: "cover",
                    objectFit: "cover",
                    fit: "cover",
                    display: "block",
                    backgroundColor: "#f2f2f2",
                  }
                : api.visual("color"),
          },
          emphasis: {
            style: {
              fontFamily: "Arial",
              fontSize: 12,
              shadowBlur: 20,
              shadowOffsetX: 3,
              shadowOffsetY: 5,
              shadowColor: "rgba(0,0,0,0.3)",
            },
          },
        };

        return item;
      }
      return {
        dataset: {
          source: seriesData,
        },
        tooltip: {},
        visualMap: [
          {
            show: false,
            min: 0,
            max: 2,
            dimension: "depth",
            inRange: {
              color: ["#006edd", "#328be3", "#99c5f1"],
            },
          },
        ],
        hoverLayerThreshold: Infinity,
        series: {
          type: "custom",
          renderItem: renderItem,
          progressive: 0,
          coordinateSystem: "none",
          encode: {
            tooltip: "value",
            itemName: "id",
          },
        },
      };
    },
    drillDown(targetNodeId) {
      this.displayRoot = this.stratify();
      if (targetNodeId != null) {
        this.displayRoot = this.displayRoot.descendants().find(function (node) {
          return node.data.id === targetNodeId;
        });
      }
      // A trick to prevent d3-hierarchy from visiting parents in this algorithm.
      this.displayRoot.parent = null;
      this.chart.setOption({
        dataset: {
          source: this.seriesData,
        },
      });
    },
    initChart() {
      const el = this.$refs.chartElement;
      this.chart = echarts.init(el);

      this.chart.on("click", { seriesIndex: 0 }, (params) => {
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
.card-bubble-chart {
  .label {
    font-size: 0.75rem;
  }
}
</style>
