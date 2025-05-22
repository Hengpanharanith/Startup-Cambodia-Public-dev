<template>
  <v-card
    class="eso-card overflow-hidden relative"
    :to="to"
    outlined
    rounded="lg"
    :title="name"
  >
    <v-img :aspect-ratio="2" :src="cover" class="card-cover" />
    <div style="position: absolute; top: 10px; right: 10px">
      <template v-if="showReport">
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              @click.prevent.stop="report"
              class="primary white--text"
              outlined
              icon
              small
            >
              <v-icon> mdi-alert-circle-outline </v-icon>
            </v-btn>
          </template>
          <span>{{ $t("report.form.label.suggestEdit") }}</span>
        </v-tooltip>
      </template>
      <v-btn
        v-if="editable"
        @click="editProfile()"
        class="text-capitalize"
        style="z-index: 1"
        outlined
        small
        dark
      >
        <v-icon left>mdi-pencil</v-icon>
        {{ $t("edit") }}
      </v-btn>
    </div>
    <div style="margin-top: -50px">
      <v-avatar class="card-avatar mb-2 bordered elevation" size="100" bordered>
        <v-img :src="thumbnail" />
      </v-avatar>
      <v-card-actions class="gap py-0 px-5 wrap">
        <v-chip v-if="owned" key="owned" color="primary"> Owned </v-chip>
        <v-chip v-else key="member" color="primary"> Member </v-chip>
        <v-chip v-if="status" outlined color="success">{{ status }}</v-chip>
      </v-card-actions>
      <v-card-title class="px-5 py-2 line-clamp-1">
        {{ name }}
      </v-card-title>
      <v-card-text class="px-5 mb-4">
        <div v-if="description" class="mb-4">{{ description }}</div>
        <div>
          <span class="mr-2">
            {{ $t("established") }}:
            <strong>{{ establishYear || "N/A" }}</strong>
          </span>
          <span v-if="incorporatedDate">
            {{ $t("date_incorporated") }}:
            <strong>{{ incorporatedDate }}</strong>
          </span>
        </div>

        <v-list dense>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-email-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              {{ email }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              {{ phone }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-map-marker</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              {{ address }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="website" :href="website" target="_blank">
            <v-list-item-icon>
              <v-icon>mdi-web</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="blue--text text-decoration-underline">
              {{ website }}
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <div class="d-flex px-4 py-1" v-if="industries.length">
          <div class="my-2" style="margin-right: 32px">
            <v-icon>mdi-office-building-outline</v-icon>
          </div>
          <div>
            <v-list-item-title
              style="font-size: 0.875rem"
              v-text="$t('industry')"
            />

            <div>
              <v-chip
                v-for="(item, key) in industries"
                :key="`industry-${key}`"
                v-text="item.name"
                class="mr-1 mb-1"
                color="#FEEBCA"
                label
                small
              />
            </div>
          </div>
        </div>

        <div class="d-flex px-4 py-1" v-if="lookingAt.length">
          <div class="my-2" style="margin-right: 32px">
            <v-icon>mdi-clipboard-text-search-outline</v-icon>
          </div>
          <div>
            <v-list-item-title
              v-text="$t('looking_at')"
              style="font-size: 0.875rem"
            />
            <div>
              <v-chip
                v-for="(item, key) in lookingAt"
                :key="`looking-at-${key}`"
                v-text="item.value"
                class="text-capitalize mr-1 mb-1"
                color="#FEEBCA"
                label
                small
              />
            </div>
          </div>
        </div>
      </v-card-text>
      <FormReportProfile ref="formReport" />
    </div>
  </v-card>
</template>

<script>
export default {
  name: "CardEsoProfile",
  props: {
    id: Number,
    to: String,
    name: String,
    cover: String,
    thumbnail: String,
    owned: Boolean,
    status: String,
    phone: String,
    email: String,
    address: String,
    website: String,
    description: String,
    editable: Boolean,
    showReport: Boolean,
    establishYear: [String, Number],
    incorporatedDate: [String, Number],
    industries: { type: Array, default: () => [] },
    lookingAt: { type: Array, default: () => [] },
    investmentStage: { type: Array, default: () => [] },
  },
  methods: {
    editProfile() {
      this.$emit("edit");
    },
    report() {
      this.$refs.formReport.openForm(this.id, "startup");
    },
  },
};
</script>

<style lang="scss">
.eso-card {
  .card-avatar {
    border: 2px solid #e9e9e9;
    margin-left: 0.75rem;
    background-image: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  }

  .card-cover {
    background-image: linear-gradient(135deg, #2b74e1 0%, #a406ff 100%);
    max-height: 300px;
  }
}
</style>
