<template>
  <div>
    <section class="inner-banner" :style="style">
      <div class="container text-center">
        <!-- <ul class="thm-breadcrumb">
          <li class="thm-breadcrumb__item">
            <nuxt-link to="/">Home</nuxt-link>
          </li>
          <li class="thm-breadcrumb__item">
            <span>{{ title }}</span>
          </li>
        </ul> -->
        <!-- /.thm-breadcrumb -->
        <h2 class="inner-banner__title text-gradient">
          <span>{{ title }}</span>
        </h2>
        <!-- /.inner-banner__title -->
      </div>
      <!-- /.container -->
    </section>
  </div>
</template>

<script>
export default {
  name: "PageHeaderUser",
  props: ["title", "bannerUrl"],
  computed: {
    style() {
      return {
        background: `linear-gradient(0,rgba(0,0,0,0.4),rgba(0,0,0,1)),url(${this.bannerUrl}) `,
        "background-size": "cover",
        "background-repeat": "no-repeat",
        "background-position": "center",
      };
    },
  },
};
</script>

<style scoped>
.inner-banner {
  background: linear-gradient(
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.7)
  ); /*, url("/images/home/banner.jpg") center center no-repeat*/
  /* background-size: cover; */
  /* background: #000000; */
}
</style>
