import Vue from "vue";
import Chartkick from "vue-chartkick";
import Chart from "chart.js";

Chart.defaults.global.defaultFontFamily = "KantumruyPro-Regular";
Chart.defaults.global.defaultFontSize = 12;

export default ({}) => {
  Chartkick.options = {
    // colors: ["#3B8BCA", "#30BAA3", "#F79820", "#EE3E58"]
  };

  Vue.use(Chartkick.use(Chart, { locale: "en" }));
};
