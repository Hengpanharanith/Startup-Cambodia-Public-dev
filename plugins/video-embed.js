import Vue from "vue";
import Embed from "../components/Custom/embed";
// Vue.component('video-embed', Embed);
// Vue.use(Embed);
export default () => {
    Vue.component('custom-video-embed', Embed);
};
