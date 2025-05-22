<template>
  <v-card class="eso-card-item" :to="to" outlined rounded="lg" :title="name">
    <v-img :aspect-ratio="16 / 9" :src="cover" class="card-cover" />
    <div style="margin-top: -32px">
      <v-avatar class="card-avatar bordered elevation" size="64" bordered>
        <v-img :src="thumbnail" />
      </v-avatar>
      <v-card-title class="py-2 line-clamp-1">
        {{ name }}
      </v-card-title>
      <v-card-actions class="gap pt-0 px-4">
        <v-chip key="owned" color="primary" small>
          {{ ownershipText }}
        </v-chip>
        <v-chip outlined color="success" small>{{ displayStatus }}</v-chip>
      </v-card-actions>

      <v-card-text v-if="description" class="pt-0">
        <div class="line-clamp-4">{{ description }}</div>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "CardEsoItem",
  props: {
    id: Number,
    to: String,
    name: String,
    cover: String,
    thumbnail: String,
    owned: Boolean,
    status: String,
    description: String,
  },
  computed: {
    ownershipText() {
      return this.owned ? this.$t("eso.owned") : this.$t("eso.member");
    },
    displayStatus() {
      return this.$t(`status.${this.status}`);
    },
  },
};
</script>

<style lang="scss">
.eso-card-item {
  transition: 200ms;
  &:hover {
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    transition: 200ms;
  }
  .card-avatar {
    border: 2px solid #e9e9e9;
    margin-left: 1rem;
    background-image: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  }

  .card-cover {
    background-image: linear-gradient(135deg, #2b74e1 0%, #a406ff 100%);
  }
}
</style>
