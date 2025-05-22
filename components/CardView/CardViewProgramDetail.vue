<template>
  <div class="container cardContainer bg-white mb-5 mt-5 sidebar__single">
    <div class="row">
      <div class="col-md-6 border-right p-2">
        <div class="p-3 flex-fill">
          <h2
            class="block-title mb-2 primary-blue"
            style="text-transform: capitalize"
          >
            {{ title }}
          </h2>
          <!-- <span
            id="hostedBy"
            class="secondary-blue"
          >By <b class="text-capitalize">{{ by }}</b></span> -->
          <span
            id="programDate"
            class="text-muted"
          >{{ date }}</span>
          <span
            id="programCategory"
            class="text-dark"
          ><b class="text-capitalize">{{ category_name }}</b></span>
        </div>
      </div>
      <div class="col-md-5">
        <div
          class="p-3 flex-fill"
          style="font-size: 0.8rem"
        >
          <p class="mb-3 primary-blue">
            <v-icon>mdi-calendar</v-icon>
            <span>Start at {{ start_date }}</span>
            <v-icon>mdi-calendar</v-icon>
            End at {{ end_date }}
          </p>
          <p class="mb-3 primary-blue">
            <v-icon>mdi-map-marker</v-icon>
            {{ address }}
          </p>
          <a
            :href="apply_url"
            class="cta-one__btn mt-0 mb-0"
            target="_blank"
          >
            {{ $t("applyNow") }}
          </a>
        </div>
      </div>
      <!-- <div class="col-md-1">
        <p>
          <span class="badge badge-info">{{ status }}</span>
        </p>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "title",
    "by",
    "date",
    "category_name",
    "start_date",
    "end_date",
    "address",
    "status",
    "apply_url",
  ],
  name: "CardViewProgramDetail",
};
</script>