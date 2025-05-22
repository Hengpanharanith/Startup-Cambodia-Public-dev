import Swiper from "swiper";
import { register } from "swiper/swiper-element-bundle";
export default (ctx, inject) => {
  register();
  inject("swiper", Swiper);
};
