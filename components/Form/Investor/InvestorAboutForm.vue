<template>
  <div class="investor-info">
    <v-btn
      @click="editInvestorInfo"
      color="primary"
      variant="primary"
      icon
      small
      absolute
      right
      top
    >
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-row>
      <v-col
        cols="12"
        lg="3"
        class="mb-2"
      >
        <span class="text-secondary">{{$t('company_name')}}</span>
      </v-col>
      <v-col
        cols="12"
        lg="9"
        class="mb-3"
      >
        <span class="text-uppercase">{{ investor.company_name }}</span>
      </v-col>

      <v-col
        cols="12"
        lg="3"
        class="mb-2"
      >
        <span class="text-secondary">{{$t('website')}}</span>
      </v-col>
      <v-col
        cols="12"
        lg="9"
        class="mb-3"
      >
        <span
          class="text-secondary mb-1"
          v-if="investor.website"
        >{{ investor.website }}
          <a
            :href="investor.website"
            target="_blank"
            rel="noopener noreferrer"
          >
            <v-icon>mdi-link</v-icon>
          </a>
        </span>
        <span v-else>{{$t('n_a')}}</span>
      </v-col>
      <v-col
        cols="12"
        lg="3"
        class="mb-2"
      >
        <span class="text-secondary">{{$t('address')}}</span>
      </v-col>
      <v-col
        cols="12"
        lg="9"
        class="mb-3"
      >
        <span>{{ investor.address }}</span>
      </v-col>
      <v-col
        cols="12"
        lg="3"
        class="mb-2 mb-4"
      >
        <span class="text-secondary">{{$t('description')}}</span>
      </v-col>
      <v-col
        cols="12"
        lg="9"
      >
        <span>{{ investor.description || $t('n_a') }}</span>
      </v-col>

      <v-col
        cols="12"
        lg="3"
        class="mb-2"
      >
        <span class="text-secondary">{{$t('area_of_interest')}}</span>
      </v-col>
      <v-col
        cols="12"
        lg="9"
        class="mb-3"
      >
        <div class="multiselect__tags-wrap">
          <template v-if="investor.area_of_interests && investor.area_of_interests.length">
            <span
              class="multiselect__tag"
              :key="item.desc"
              v-for="item in investor.area_of_interests"
            >{{ item.desc }}</span>
          </template>
          <span v-else>{{$t('n_a')}}</span>
        </div>
      </v-col>
      <v-col
        cols="12"
        lg="3"
        class="mb-2"
      >
        <span class="text-secondary">{{$t('video')}}</span>
      </v-col>
      <v-col
        cols="12"
        lg="9"
        class="mb-3"
      >
        <video-embed
          v-if="investor.video_link"
          class="shadow"
          style="border-radius: 1rem"
          :src="investor.video_link"
        ></video-embed>
        <span v-else>{{$t('n_a')}}</span>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "InvestorAboutForm",
  props: {
    investor: { type: Object, default: () => ({}) },
  },
  computed: {
    ...mapState("interest", { interestList: "dataList" }),
  },
  methods: {
    getInterestOption(id) {
      return this.interestList.find((item) => item.id == id) || {};
    },
    editInvestorInfo() {
      this.$emit("edit", this.investor);
    },
  },
};
</script>

<style lang="scss" scoped>
.investor-info {
  position: relative;
  .investor__edit {
    z-index: 1;
    font-size: 0.8rem;
  }
}
</style>