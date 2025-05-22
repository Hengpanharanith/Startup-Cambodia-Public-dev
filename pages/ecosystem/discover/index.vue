<template>
  <div class="d-flex flex-column-reverse flex-md-row">
    <!-- check gitLens when restore -->

  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  head: { title: "Ecosystem Overview" },
  data() {
    return {
      showSubmenu: false,
      bannerUrl: "/images/ecosystem/banner.png",
      emptyImgSrc: require("@/assets/images/empty_box.svg"),
      loaded: false,
      stakeholderChart: [],
      fundingStageChart: [],
      startupAreaChart: [],
      startupAreaFundingAmountChart: [],
      donutOptions: {
        cutoutPercentage: 75,
        hoverOffset: 4,
        legend: { position: "bottom" },
      },

      filter: {
        currencyTab: 0,
      },
      fundingDisplayCurrency: "USD",
      fundingCurrency: "d",

      chartOptions: {
        chart: {
          type: "packedbubble",
          // height: "50%",
        },
        tooltip: {
          enabled: true,
          useHTML: true,

          formatter: function () {
            var template = `<p><b>${this.point.name}</b></p>`;
            if (this.y >= 1000000) {
              //

              return (
                template +
                `<p style='text-align:center'><b>${this.y / 1000000}M</b></p>`
              );
            } else if (this.y >= 1000) {
              return (
                template +
                `<p style='text-align:center'><b>${this.y / 1000}K</b></p>`
              );
            } else {
              return (
                template + `<p style='text-align:center'><b>${this.y}</b></p>`
              );
            }
          },
        },
        title: false,
        legend: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        plotOptions: {
          packedbubble: {
            minSize: "30%",
            maxSize: "200%",
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
              gravitationalConstant: 0.02,
              // seriesInteraction: true,
              dragBetweenSeries: false,
              enableSimulation: false,
            },
            dataLabels: {
              enabled: true,
              useHTML: true,
              formatter: function () {
                var template = `<p><b>${this.point.name}</b></p>`;
                if (this.y >= 1000000) {
                  //

                  return template + `<b>${this.y / 1000000}M</b>`;
                } else if (this.y >= 1000) {
                  return template + `<b>${this.y / 1000}K</b>`;
                } else {
                  return template + `<b>${this.y}</b>`;
                }
              },
              filter: {
                property: "y",
                operator: ">",
                value: 0,
              },
              style: {
                color: "black",
                textOutline: "none",
                fontWeight: "normal",
              },
            },
          },
        },

        series: [],
      },
    };
  },

  computed: {
    ...mapState("network-page", ["networkList", "isLoading"]),
    chartTitle: function () {
      return this.fundingDisplayCurrency;
    },
    currentRoute() {
      return this.$route.path;
    },
    submenu() {
      return [
        { to: "#fundingAmount", text: "Funding amount by area" },
        { to: "#stakeholder", text: "Stakeholders" },
        { to: "#fundingStage", text: "Funding Stage" },
        { to: "#startupArea", text: "Startup Areas" },
      ];
    },
  },
  mounted() {
    this.getNetworkPage(this.fundingCurrency).then((response) => {
      let stakeholderChart = Object.entries(response.stakeholders_chart);
      let fundingStageChart = Object.entries(response.founding_type_chart);
      let startupAreaChart = Object.entries(response.startup_area_chart);
      let startupAreaFundingAmountChart = Object.entries(
        response.startup_area_funding_amount_chart
      );

      var series = [];

      startupAreaFundingAmountChart.forEach((item) => {
        series.push({
          name: item[0],
          data: [{ name: item[0], value: item[1] }],
        });
      });

      this.chartOptions.series = series;

      this.stakeholderChart = Object.assign([], stakeholderChart);
      this.fundingStageChart = Object.assign([], fundingStageChart);
      this.startupAreaChart = Object.assign([], startupAreaChart);
      this.startupAreaFundingAmountChart = Object.assign(
        [],
        startupAreaFundingAmountChart
      );
      this.loaded = true;
    });
  },
  methods: {
    ...mapActions("network-page", ["getNetworkPage"]),

    linkClass(idx) {
      if (this.filter.currencyTab == idx) {
        return "bg-primary white--text text-capitalize border-0  rounded-lg";
      }
      return "bg-transparent text-dark text-capitalize";
    },
    handleCurrencyTab(tab = 0) {
      if (tab == 0) {
        this.fundingCurrency = "d";
        this.fundingDisplayCurrency = "USD";
      }
      if (tab == 1) {
        this.fundingCurrency = "r";
        this.fundingDisplayCurrency = "KHR";
      }
      this.getNetworkPage(this.fundingCurrency).then((response) => {
        let startupAreaFundingAmountChart = Object.entries(
          response.startup_area_funding_amount_chart
        );

        // var series = [];

        startupAreaFundingAmountChart.forEach((item) => {
          series.push({
            name: item[0],
            data: [{ name: item[0], value: item[1] }],
          });
        });

        this.chartOptions.series = series;
        this.startupAreaFundingAmountChart = Object.assign(
          [],
          startupAreaFundingAmountChart
        );
        this.loaded = true;
      });
    },
  },
};
</script>
<style >
/* style for label in the bubble */
.highcharts-data-label span {
  text-align: center;
}
/* .network-content-wrapper {
  min-height: 50vh;
} */
.network-content {
  min-height: 50vh;
  flex: 1;
  position: relative;
  transition: 500ms;
}

.network-content__aside-submenu {
  margin-top: 1.5rem;
}
.network-content__menu .sidebar__category-list-item {
  line-height: 1.25;
}
.network-content__menu .selected a:before {
  transform: translateY(-50%) translateX(0px);
  color: rgb(251, 199, 103);
}

.network-content__menu .sidebar__category-list-item a:hover,
.network-content__menu .sidebar__category-list-item a:hover::after {
  color: rgb(251, 199, 103);
}

.submenu__toggler-wrapper {
  position: sticky;
  top: 5.5rem;
  z-index: 1;
  display: flex;
  justify-content: flex-end;
}
.submenu__toggler {
  right: 0.5rem;
  background-color: white;
}
.submenu__toggler svg {
  transition: 250ms;
}
.submenu__toggler.menu-visible svg {
  transform: rotate(180deg);
  transition: 250ms;
}
.network-content__aside-submenu .sidebar__category-list {
  min-width: 13.5rem;
}
@media screen and (min-width: 768px) {
  .network-content {
    max-width: calc(100% - 15rem);
  }
  .network-content.expanded {
    max-width: 100%;
    transition: 500ms;
  }
  .network-content__aside-submenu {
    width: 15rem;
    flex: none;
  }
  .network-content__aside-submenu.hidden {
    width: 0;
    overflow: hidden;
    transition: 500ms;
  }

  .network-content__aside-submenu.hidden .network-content__menu {
    top: 0;
  }
}
</style>
