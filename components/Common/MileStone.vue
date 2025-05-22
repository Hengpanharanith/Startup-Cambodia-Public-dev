<template>
  <v-container class="overflow-hidden pa-6">
    <div class="block-title text-center mt-8">
      <div class="block-title__text text-capitalize">
        <span>{{ $t("about.section_header.milestone") }}</span>
      </div>
      <!-- /.block-title__text -->
    </div>
    <v-row>
      <v-col class="">
        <p class="blockquote text-center">
          {{ $t("about.section.milestone.desc") }}
        </p>
      </v-col>
    </v-row>
    <v-row
      align="center"
      justify="center"
    >
      <v-card
        color="transparent"
        flat
      >
        <v-timeline :dense="$vuetify.breakpoint.mdAndDown">
          <v-timeline-item
            v-for="n in items"
            :key="n.id"
            :color="n.color"
            small
          >
            <template v-slot:opposite>
              <span
                :class="`headline font-weight-bold text-uppercase`"
                :style="`color:${n.color}`"
                v-text="n.title"
              ></span>
            </template>
            <v-card
              outlined
              flat
            >
              <v-card-title class="text-break">{{n.subtitle}}</v-card-title>
              <v-card-text class="timeline-text">
                <div v-html="n.description"></div>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
export default {
  computed: {
    items() {
      return [
        {
          id: 1,
          title: this.$t("about.section.milestone.phase_one"),
          subtitle: this.$t("about.section.milestone.phase_one.title"),
          description: `
           <ul style='list-style-type: none;padding-left:0'>
            <li>(${this.$t("1")}) ${this.$t(
            "about.section.milestone.phase_one.desc_one"
          )}</li>
            <li>(${this.$t("2")}) ${this.$t(
            "about.section.milestone.phase_one.desc_two"
          )}</li>
            <li>(${this.$t("3")}) ${this.$t(
            "about.section.milestone.phase_one.desc_three"
          )}</li>
            <li>(${this.$t("4")}) ${this.$t(
            "about.section.milestone.phase_one.desc_four"
          )}</li>
           
           </ul>
          `,

          color: "#f79b36",
        },
        {
          id: 2,
          title: this.$t("about.section.milestone.phase_two"),
          subtitle: this.$t("about.section.milestone.phase_two.title"),
          description: `
          <p>${this.$t("about.section.milestone.phase_two.desc_one")}</p>
          `,

          color: "#9E9E9E",
        },
        {
          id: 3,
          title: this.$t("about.section.milestone.phase_three"),
          subtitle: this.$t("about.section.milestone.phase_three.title"),
          description: `<p>
            ${this.$t("about.section.milestone.phase_three.desc_one")}
            </p>`,

          color: "#9E9E9E",
        },
      ];
    },
  },
};
</script>