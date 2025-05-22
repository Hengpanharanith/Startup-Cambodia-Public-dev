<template>
  <section class="testimonials-style-one">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 d-flex">
          <div class="my-auto">
            <div id="testimonials-slider-pager">
              <div class="testi-icon">
                <img src="/images/testi-qoute-1-1.png" alt="Awesome Image" />
              </div>
              <!-- /.testi-icon -->
              <div class="testimonials-slider-pager-one">
                <a href="#" class="pager-item active" data-slide-index="0"
                  ><img src="/images/testi-1-1.png" alt="Awesome Image"
                /></a>
                <a href="#" class="pager-item" data-slide-index="1"
                  ><img src="/images/testi-1-2.png" alt="Awesome Image"
                /></a>
                <a href="#" class="pager-item" data-slide-index="2"
                  ><img src="/images/testi-1-3.png" alt="Awesome Image"
                /></a>
              </div>
              <!-- /.testimonials-slider-pager-one -->
            </div>
            <!-- /#testimonials-slider-pager -->
          </div>
          <!-- /.my-auto -->
        </div>
        <!-- /.col-lg-6 -->
        <div class="col-lg-6">
          <div class="block-title">
            <div class="block-title__text">
              <span>What our clients are</span> <br />
              <span>saying</span>
            </div>
            <!-- /.block-title__text -->
          </div>
          <!-- /.block-title -->
          <div class="slider testimonials-slider">
            <div class="slide-item">
              <div class="single-testi-one">
                <p>
                  This is due to their excellent service, competitive pricing
                  and customer support. It’s throughly refresing to get such a
                  personal touch. Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <h3>Delila Rayam</h3>
              </div>
              <!-- /.single-testi-one -->
            </div>
          </div>
        </div>
        <!-- /.col-lg-6 -->
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container -->
  </section>
</template>

<script>
export default {
  name: "Testimonial",

  data() {
    return {
      swiperOptions: {
        slidesPerView: 1,
        loop: true,
        speed: 1000,
        spaceBetween: 30,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
        },
      },
    };
  },
};
</script>

<style scoped>
</style>
