<template>
  <div
    class="d-flex justify-center align-center fill-height"
    style="
      background-image: url('https://startupcambodia.gov.kh/images/about/pattern.svg');
      background-position: center center;
      background-repeat: repeat;
    "
  >
    <v-container>
      <ValidToken :program="program" v-if="isInvalid" />
    </v-container>
  </div>
</template>

<script>
import InvalidToken from "@/components/TokenVerify/InvalidToken.vue";
import ValidToken from "../../components/TokenVerify/ValidToken.vue";

export default {
  name: "submission",
  layout: "blank", // Nuxt 2 specific
  components: {
    InvalidToken,
    ValidToken,
  },
  data() {
    return {
      loading: false,
      isInvalid: true,
      program: {
        email: "",
        phone: "",
        title: "",
        content: "",
        description: "",
        program_type: null,
        category: null,
        is_local: null,
        start_date: "",
        end_date: "",
        address: "",
        apply_url: "",
        image: null,
      },
    };
  },
  
};
</script>
