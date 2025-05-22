<template>
  <section class="brand-style-one py-5">
    <v-container class="mt-5">
      <v-card
          color="transparent"
          flat
          :data-aos="animationEnabled ? 'fade-in' : null"
          :data-aos-duration="animationEnabled ? 500 : null"
          :data-aos-id="animationEnabled ? 'ecoAnimated' : null"

      >
<!--        <v-card-title class="justify-md-center text-h4 block-title__text text-break mb-6">{{title}}</v-card-title>-->

        <v-card-text>
          <v-row>

            <v-col cols="6" md="3">
              <CardVisitorCounter
                  :refresh="counting"

                  :label="$t('today')"
                  :amount="parseInt(visitorList['today']) || 0"
              />
            </v-col>
            <v-col cols="6" md="3">
              <CardVisitorCounter
                  :refresh="counting"

                  :label="$t('thisMonth')"
                  :amount="parseInt(visitorList['this_month']) || 0"
              />
            </v-col>
            <v-col cols="6" md="3">
              <CardVisitorCounter
                  :refresh="counting"

                  :label="$t('lastMonth')"
                  :amount="parseInt(visitorList['last_month']) || 0"
              />
            </v-col>
            <v-col cols="6" md="3">
              <CardVisitorCounter
                  :refresh="counting"

                  :label="$t('total')"
                  :amount="parseInt(visitorList['Total']) || 0"
              />
            </v-col>

          </v-row>
        </v-card-text>

      </v-card>

    </v-container>
  </section>
</template>
<script>
import countTo from "vue-count-to";
export  default {
  name: "VisitorView",
  components: { countTo },
  props: {
    title: String,
    animationEnabled: {type: Boolean, default: () => true},
    visitorList: { type: Object, default: () => {} },
  },
  data(){
    return{
      counting: false,
    }
  },
  mounted(){
    document.addEventListener("aos:in:ecoAnimated", () => {
      this.counting = true;
      setTimeout(() => {
        this.counting = false;
      }, 3000);
    });
  },

}
</script>
