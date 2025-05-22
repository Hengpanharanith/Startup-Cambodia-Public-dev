<template>
  <v-dialog @input="visibleChange" :value="visible" width="40rem" scrollable>
    <v-card :disabled="loading" rounded="lg" min-height="calc(50vh)">
      <div
        class="position-absolute d-flex justify-center align-center"
        style="top: 0; left: 0; right: 0; bottom: 0"
        v-if="loading"
      >
        <LoadingCollapse :visible="loading" />
      </div>
      <template v-if="!!detail">
        <v-card-text class="pa-0">
          <v-card-text class="grey lighten-2">
            <v-img
              :src="detail.image"
              :alt="detail.title"
              width="100%"
              height="15rem"
              contain
            />
          </v-card-text>
          <v-card-title class="text-break pb-2">{{
            detail.title
          }}</v-card-title>

          <!-- <v-list class="ml-5">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-information-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>{{detail.description}}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-map-marker-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>{{detail.address}}</v-list-item-content>
            </v-list-item>
          </v-list> -->
          <v-card-text class="quill-editor" v-html="detail.description" />
          <v-divider class="my-0"></v-divider>
          <v-card-text v-if="detail.is_active">
            <div>
              <v-icon>mdi-calendar</v-icon>
              <strong>{{ $t("form.common.label.date") }}</strong>
              <span>{{
                $moment(detail.start_date).format("dddd, MMMM Do YYYY")
              }}</span>
              -
              <span>{{
                $moment(detail.end_date).format("dddd, MMMM Do YYYY")
              }}</span>
              <v-chip v-if="remainingDays" color="primary" class="ml-3"
                ><v-icon>mdi-clock</v-icon>{{ remainingDays }}</v-chip
              >
            </div>
          </v-card-text>
          <template v-if="hasDetails">
            <v-divider class="my-0"></v-divider>
            <v-card flat>
              <v-card-title class="">{{
                $t("program.additional_info")
              }}</v-card-title>
              <v-card-text>
                <v-expansion-panels accordion focusable flat>
                  <v-expansion-panel
                    v-for="(item, i) in detail.details"
                    :key="i"
                  >
                    <v-expansion-panel-header>{{
                      item.name
                    }}</v-expansion-panel-header>
                    <v-expansion-panel-content class="quill-editor">
                      <div v-html="item.detail" class="quill-editor"></div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card-text>
            </v-card>
          </template>
        </v-card-text>
      </template>
      <v-card-actions class="pb-4">
        <v-spacer></v-spacer>
        <!-- <v-btn @click="visibleChange()" outlined text>{{
          $t("dialog.close")
        }}</v-btn> -->
        <v-btn
          v-if="!!applyURL"
          :href="applyURL"
          target="blank"
          color="primary"
          elevation="0"
          class="rounded-lg mr-2"
          >{{ $t("findOutMore") }}</v-btn
        >
        <v-menu left top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              class="elevation-0 rounded-lg"
              color="primary"
              icon
            >
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in shareOptions"
              :key="index"
              @click.stop="shareTo(item.type)"
            >
              <v-list-item-icon class="mr-2">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import LoadingCollapse from "../LoadingCollapse.vue";
export default {
  name: "DialogPreviewProgram",
  props: {
    parent: String,
    loading: Boolean,
    visible: Boolean,
    detail: Object,
  },
  methods: {
    visibleChange(v = false) {
      this.$emit("update:visible", v);
    },
    copyLink() {
            const DOMAIN2SHARE =
                this.$config.SHARE_URL || window?.location?.origin;
            const url = DOMAIN2SHARE + "/program/?id=" + (this.detail.id || "");
            if (!process.browser) return;
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(url);
                this.$toast.show(this.$t("message.copied"));
                return;
            }

            const input = document.createElement("input");
            input.value = url;
            input.style.position = "fixed";
            input.style.left = "-999999px";
            input.style.top = "-999999px";
            document.body.appendChild(input);
            input.focus();
            input.select();
            document.execCommand("copy");
            input.remove();
            this.$toast.show(this.$t("message.copied"));
    },
    shareTo(type) {
      if (type == "copy") {
          this.copyLink();
          return;
      }

      const DOMAIN2SHARE = this.$config.SHARE_URL || window?.location?.origin;
      let url = DOMAIN2SHARE + "/program?id=" + this.$route.query.id;
      let text = this.detail.title;
      const shareURL = {
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&title=${text}&url=${url}`,
        facebook: `https://facebook.com/sharer/sharer.php?u=${url}`,
        twitter: `https://twitter.com/share?url=${url}&text=${text}`,
        telegram: `https://t.me/share/url?url=${url}&text=${text}`,
      };

      if (!!shareURL[type]) window.open(shareURL[type]);
    },
  },
  computed: {
    hasDetails() {
      return this.detail?.details?.length;
    },
    applyURL() {
      return this.detail?.apply_url;
    },
    shareOptions() {
      return [
        {
          text: this.$t("menu.share_to.linkedin"),
          icon: "mdi-linkedin",
          type: "linkedin",
        },
        {
          text: this.$t("menu.share_to.facebook"),
          icon: "mdi-facebook",
          type: "facebook",
        },
        {
          text: this.$t("menu.share_to.twitter"),
          icon: "mdi-twitter",
          type: "twitter",
        },
        {
          text: this.$t("menu.share_to.telegram"),
          icon: "mdi-send-circle",
          type: "telegram",
        },
        {
          text: this.$t("menu.share_to.clipboard"),
          key: "menu.share_to.copy",
          icon: "mdi-content-copy",
          type: "copy",
        },
      ];
    },
    remainingDays(){
      //this.detail.end_date
      var days = this.$moment(this.detail.end_date, 'YYYY-MM-DD')
      .startOf('day')
      .diff(this.$moment(new Date(), 'YYYY-MM-DD').startOf('day'), 'days');

      var daysRemain = "";

      if(Math.sign(days) === 1){

        if(days<=30){
          // show days only within 30days
          daysRemain =  this.$t("program.date.day_left")+" " +days + " "+this.$t("program.date.days");
        }

      }

      return daysRemain;
    }
  },
  components: { LoadingCollapse },
};
</script>

<style lang="sass">
.quill-editor
  p
    margin-bottom: .25rem
  img
    max-width: 100%
  .v-expansion-panel-content__wrap
    padding: .5rem
</style>
