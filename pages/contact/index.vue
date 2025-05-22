<template>
  <div style="postion: relative">
    <PageHeader v-bind:bannerUrl="bannerUrl" />
    <v-divider></v-divider>
    <BreadcrumbsBar :breadcrumb-items="breadCrumbs" />
    <v-divider></v-divider>
    <br />
    <v-container>
      <v-card class="mb-8" rounded="lg" outlined>
        <v-card-text>
          <v-row>
            <v-col cols="4" class="d-none d-md-flex">
              <v-img
                :aspect-ratio="16 / 9"
                contain
                src="/images/contact/talk-to-us.png"
              ></v-img>
            </v-col>
            <v-col cols="12" md="8">
              <v-card class="pa-md-8" elevation="0">
                <v-card-title>{{ $t("contact_us.form.title") }}</v-card-title>
                <v-card-subtitle>{{
                  $t("contact_us.form.sub_title")
                }}</v-card-subtitle>
                <v-card-text>
                  <v-form ref="form" title="Contact us">
                    <v-select
                      dense
                      outlined
                      :label="$t('category')"
                      class="input-group--focused"
                      :items="categories"
                      item-text="text"
                      item-value="value"
                      v-model="form.category"
                      :rules="$formRules.selectRequired"
                    >
                    </v-select>

                    <v-textarea
                      outlined
                      dense
                      no-resize
                      rows="3"
                      v-model="form.message"
                      :rules="$formRules.required"
                      :label="$t('contact_us.form.desc.placeholder')"
                      type="text"
                    ></v-textarea>

                    <v-text-field
                      dense
                      outlined
                      v-model="form.email"
                      ref="email"
                      :rules="$formRules.emailRequired"
                      required
                      :label="$t('contact_us.form.email.placeholder')"
                      type="email"
                    ></v-text-field>

                    <v-text-field
                      dense
                      outlined
                      v-model="form.name"
                      ref="name"
                      :rules="$formRules.required"
                      required
                      :label="$t('contact_us.form.name.placeholder')"
                      type="text"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions class="float-right">
                  <v-btn depressed color="primary" @click="onSubmit">{{
                    $t("contact_us.form.btn.submit.title")
                  }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card class="mb-8" rounded="lg" outlined>
        <v-card-title>{{
          $t("contact_us.section.address.label.find_us_at")
        }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="8">
              <v-list>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-phone</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      <a class="text-decoration-none" href="tel:+85587955888"
                        >+855 87 955 888</a
                      >
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-email</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      <a
                        class="text-decoration-none"
                        href="mailto:info@techostartup.center"
                        >info@techostartup.center</a
                      >
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-map</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="text-wrap">
                      {{ $t("footer.address") }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" md="4">
              <v-responsive :aspect-ratio="16 / 9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7816.759144698367!2d104.9302014!3d11.5962646!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109538c22eb617d%3A0x4e20f616f2bf42e3!2zQnVzaW5lc3MgRGV2ZWxvcG1lbnQgQ2VudGVyIC0g4Z6Y4Z6H4Z-S4Z6I4Z6Y4Z6O4Z-S4Z6M4Z6b4Z6i4Z6X4Z634Z6c4Z6M4Z-S4Z6N4Z6S4Z674Z6a4Z6A4Z634Z6F4Z-S4Z6F!5e0!3m2!1sen!2skh!4v1711092965259!5m2!1sen!2skh"
                  frameborder="0"
                  width="100%"
                  height="100%"
                ></iframe>
              </v-responsive>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import PageHeader from "@/components/Common/PageHeader";
import OurTeam from "@/components/Common/OurTeam";

import { mapState, mapActions } from "vuex";
import BreadcrumbsBar from "@/components/bars/BreadcrumbsBar.vue";
export default {
  head: { title: "Contact Us" },
  layout: "common",
  components: { PageHeader, OurTeam, BreadcrumbsBar },
  data() {
    return {
      bannerUrl:
        "https://media.startupcambodia.gov.kh/platform/public-assets/banners/contact.png",
      form: {
        email: "",
        name: "",
        category: null,
        message: "",
        // checked: [],
      },
      categories: [
        {
          text: this.$t("contact_us.form.select.category.select_one"),
          value: null,
        },
        {
          text: this.$t("contact_us.form.select.category.suggest_profile"),
          value: "suggest_profile",
        },
        {
          text: this.$t("contact_us.form.select.category.feedback"),
          value: "feedback",
        },
        {
          text: this.$t(
            "contact_us.form.select.category.event_and_partnership"
          ),
          value: "event_and_partnership",
        },
        {
          text: this.$t("contact_us.form.select.category.report_profile"),
          value: "report_profile",
        },
        {
          text: this.$t("contact_us.form.select.category.tech_issue"),
          value: "technical_issues",
        },
      ],
      show: true,
    };
  },
  methods: {
    ...mapActions("contact", ["submitContactForm"]),
    onSubmit() {
      let valid = this.$refs.form.validate();

      if (!valid) return;
      // alert(JSON.stringify(this.form));
      this.submitContactForm(this.form)
        .then((response) => {
          if (response.status < 400) {
            this.$swal
              .fire("Success!", "Your request has been submitted.", "success")
              .then(() => {
                this.resetForm();
              });
          }

          // onReset(event);
        })
        .catch((error) => {
          const message = error || error.response.data.message;

          //
          this.$swal.fire(
            "Error!",
            "Something went wrong. Please try again.",
            "error"
          );
        });
    },
    resetForm() {
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.category = null;
      this.form.message = "";

      this.$refs.form.reset();
    },
  },
  computed: {
    breadCrumbs() {
      return [
        { homePage: true, text: this.$t("breadcrumb.home"), to: "/" },
        { text: this.$t("contact"), disabled: true },
      ];
    },
  },
};
</script>
<style scoped>
.list-group-item {
  border: none !important;
}
</style>
