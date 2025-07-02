<template>
  <div
    class="cardContainer bg-white pa-6"
    style="max-width: 900px; margin: auto"
  >
    <v-row justify="center">
      <v-col cols="12" md="7">
        <h2
          class="display-1 mb-2 black--text font-weight-bold"
          style="text-transform: capitalize"
        >
          {{ programTitle }}
        </h2>
        <v-img
          v-if="thumbnail"
          :src="thumbnail"
          class="thumbnail my-4 mx-auto rounded"
          contain
        />
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-col>
      <v-col class="mt-12" cols="12" md="5">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold"
              >Program Category</v-list-item-title
            >
            <v-list-item-subtitle>{{ programCategory }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold"
              >Program Type</v-list-item-title
            >
            <v-list-item-subtitle>{{ programType }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold"
              >Status</v-list-item-title
            >
            <v-list-item-subtitle>{{ status }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold"
              >Coverage</v-list-item-title
            >
            <v-list-item-subtitle>
              {{
                programCoverage === true
                  ? "International"
                  : programCoverage === false
                  ? "National"
                  : programCoverage
              }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="font-weight-bold"
          >Start Date</v-list-item-title
        >
        <v-list-item-subtitle class="text-body-2">{{
          startDate
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="font-weight-bold">End Date</v-list-item-title>
        <v-list-item-subtitle class="text-body-2">{{
          endDate
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="font-weight-bold">Address</v-list-item-title>
        <v-list-item-subtitle class="text-body-2">{{
          address
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="font-weight-bold">URL</v-list-item-title>
        <v-list-item-subtitle class="text-body-2">
          <a :href="url" target="_blank">{{ url }}</a>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="my-4"></v-divider>
    <v-row>
      <v-col cols="12" md="6">
        <div class="mb-2">
          <span class="v-list-item-title black--text font-weight-bold"
            >Description:</span
          >
          <div class="grey--text text--darken-2 text-body-2">
            {{ description }}
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <div>
          <span class="v-list-item-title black--text font-weight-bold"
            >Content:</span
          >
          <div class="grey--text text--darken-2 text-bofy-2">{{ content }}</div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "CardProgramSubmissionDetail",
  props: {
    programTitle: String,
    email: String,
    phoneNumber: String,
    programCoverage: [String, Boolean],
    programCategory: String,
    programType: String,
    startDate: String,
    endDate: String,
    address: String,
    status: String,
    url: String,
    description: String,
    content: String,
    thumbnail: String,
  },
};
</script>
<style>
.thumnail {
  max-width: 400px;
  height: auto;
}
.cardContainer,
.cardContainer * {
  cursor: default;
}

.v-list-item-title {
  font-size: 16px !important;
  margin-bottom: 8px;
}
.v-list-item-content,
.v-list-item {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
