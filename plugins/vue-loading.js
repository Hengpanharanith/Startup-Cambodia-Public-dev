import Vue from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default ({ $config }) => {
    Vue.use(Loading, { loader: "dots", color: "red" });
    Vue.component("v-loading-overlay", Loading, {
        loader: "dots",
        color: "red",
    });
};
