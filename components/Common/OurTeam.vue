<template>
  <section class="brand-style-one">
    <!-- <img
      src="/images/banner-icon-1-5.png"
      alt="Awesome Image"
      class="bubble-1"
    />
    <img
      src="/images/banner-icon-1-3.png"
      alt="Awesome Image"
      class="bubble-2"
    /> -->
    <div class="container py-1">
      <!-- /.block-title -->
      <div class="brand-carousel-one">
        <div class="block-title text-center">
          <div class="block-title__text text-capitalize">
            <span>{{ title }}</span>
          </div>
          <!-- /.block-title__text -->
        </div>
        <swiper :options="swiperOptions">
          <swiper-slide
            v-for="item in teams"
            :key="item.id"
          >
            <div class="item">
              <v-avatar
                size="8em"
                color="grey lighten-4"
              >
                <img
                  :src="item.profileUrl"
                  alt=""
                >
              </v-avatar>
              <p>
                <span class="font-weight-bold">{{ item.name }}</span> <br />
                <span class="text-muted">{{tem.position}}</span>
              </p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <hr class="style-one" />
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["title"],
  name: "OurTeam",

  data() {
    return {
      swiperOptions: {
        slidesPerView: 5,
        loop: true,
        speed: 1000,
        spaceBetween: 20,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        // Responsive breakpoints
        breakpoints: {
          1024: {
            slidesPerView: 5,
          },
          768: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 2,
          },
          320: {
            slidesPerView: 1,
          },
        },
      },
      teams: [
        {
          id: 1,
          name: "Dr. Vong Rylida",
          name_kh: "វង្ស រីលីដា",
          gender: "f",
          office: "ST",
          position: "Senior Researcher",
          position_kh: "អ្នកស្រាវជ្រាវជាន់ខ្ពស់",
          profileUrl: "/images/team/1.jpg",
        },
        {
          id: 2,
          name: "Lim Kuoy Suong",
          name_kh: "លឹម គួយសួង",
          gender: "m",
          office: "ST",
          position: "Startup Development Specialist",
          position_kh: "អ្នកជំនាញអភិវឌ្ឍធុរកិច្ចថ្មី",
          profileUrl: "/images/team/2.jpg",
        },
        {
          id: 3,
          name: "Phong Kimchhoy",
          name_kh: "ផុង គឹមឆូយ",
          gender: "m",
          office: "ST",
          position: "Researcher",
          position_kh: "អ្នកស្រាវជ្រាវ",
          profileUrl: "/images/team/3.jpg",
        },
        {
          id: 4,
          name: "Khoeurn Saksonitaa",
          name_kh: "ខឿន សក្តិសុនិតា",
          gender: "f",
          office: "ST",
          position: "Startup Development Specialist",
          position_kh: "អ្នកជំនាញអភិវឌ្ឍធុរកិច្ចថ្មី",
          profileUrl: "/images/team/4.jpg",
        },
        {
          id: 5,
          name: "Pich Maned",
          name_kh: "ពេជ្រ ម៉ានិត",
          gender: "m",
          office: "ST",
          position: "Startup Development Associate",
          position_kh: "សហការីអភិវឌ្ឍធុរកិច្ចថ្មី",
          profileUrl: "/images/team/5.jpg",
        },
        {
          id: 6,
          name: "Som Visethvathanak",
          name_kh: "សោម វិសិដ្ឋវឌ្ឍនៈ",
          gender: "f",
          office: "ST",
          position: "Researcher",
          position_kh: "អ្នកស្រាវជ្រាវ",
          profileUrl: "/images/team/6.jpg",
        },
        {
          id: 7,
          name: "Phin Polideth",
          name_kh: "ភិន ប៉ូលីដែត",
          gender: "m",
          office: "ST",
          position: "Publich Relation Officer",
          position_kh: "អ្នកទំនាក់ទំនងសាធារណៈ",
          profileUrl: "/images/team/7.jpg",
        },
        {
          id: 8,
          name: "Pich Vanthol",
          name_kh: "ពេជ វណ្ណថុល",
          gender: "",
          office: "ST",
          position: "Startup Development Associate",
          position_kh: "សហការីអភិវឌ្ឍធុរកិច្ចថ្មី",
          profileUrl: "/images/team/8.jpg",
        },
        {
          id: 9,
          name: "Heng Bunmeng",
          name_kh: "ហេង ប៊ុនម៉េង",
          gender: "m",
          office: "ST",
          position: "Graphic Designer",
          position_kh: "អ្នករចនាក្រាហ្វិក",
          profileUrl: "/images/team/9.jpg",
        },
        {
          id: 10,
          name: "Aing Teckchun",
          name_kh: "អាំង តឹកជុន",
          gender: "m",
          office: "TI",
          position: "Senior Software Engineer",
          position_kh: "អ្នកអភិវឌ្ឍកម្មវិធីជាន់ខ្ពស់",
          profileUrl: "/images/team/10.jpg",
        },
        {
          id: 11,
          name: "Luy Sevheng",
          name_kh: "លុយ ស៊ីវហេង",
          gender: "m",
          office: "TI",
          position: "Software Engineer",
          position_kh: "អ្នកអភិវឌ្ឍកម្មវិធី",
          profileUrl: "/images/team/11.jpg",
        },
        {
          id: 12,
          name: "Sin Visal",
          name_kh: "ស៊ិន វិសាល",
          gender: "m",
          office: "TI",
          position: "Software Engineer",
          position_kh: "អ្នកអភិវឌ្ឍកម្មវិធី",
          profileUrl: "/images/team/12.jpg",
        },
        {
          id: 13,
          name: "Marady Thydaduong",
          name_kh: "ម៉ារ៉ាឌី ធីតាឌួង",
          gender: "m",
          office: "TI",
          position: "Frontend Software Engineer",
          position_kh: "អ្នកអភិវឌ្ឍសុសវែរផ្នែកខាងមុខ",
          profileUrl: "/images/team/13.jpg",
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>
