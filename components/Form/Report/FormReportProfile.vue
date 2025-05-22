<template>
  <v-dialog
    v-model="dialog"
    max-width="700px"
    scrollable
  >
    <v-card rounded="lg">
      <v-card-title>
        <v-icon class="mr-2">mdi-alert-circle-outline</v-icon>
        <span class="text-h6">{{$t('report.form.label.suggestEdit')}}</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-6">
        <v-container>
          <v-form ref="form">
            <v-row>
              <v-col cols="12 pa-0">
                <v-text-field
                  v-model="form.email"
                  type="email"
                  name="email"
                  :rules="$formRules.emailRequired"
                  :label="$t('get_listed.form.label.email')"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12 pa-0">
                <v-textarea
                  v-model="form.description"
                  dense
                  outlined
                  :rules="$formRules.required"
                  :label="$t('get_listed.form.label.desc')"
                >
                </v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions >
        <v-spacer></v-spacer>
        <v-btn
          @click="_closeForm()"
          outlined
        >
          {{$t('close')}}
        </v-btn>
        <v-btn
          @click="_saveForm()"
          color="primary"
        >
          {{$t('report.form.btn.submit.title')}}
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "FormReportProfile",
  data() {
    return {
      dialog: false,
      form: {},
    };
  },
  methods: {
    ...mapActions("stakeholder", ["claimRequest"]),
    openForm(id, type) {
      
      this.dialog = true;
      this.form.id = id; // stakeholder ID
      this.form.type = type; // stakholder type
      this.form.option = "general";
    },
    _saveForm() {
      let valid = this.$refs.form.validate();
      if (!valid) return;
      let payload = {
        stakeholder: this.form.id,
        message: this.form.description,
        email: this.form.email,
        type: this.form.type,
        option: this.form.option,
      };

      

      this.claimRequest(payload)
        .then((res) => {
          
          let message = res;
          this.$swal.fire("", this.$t("success"), "success");
          this._closeForm();
        })
        .catch((error) => {
          const message = error.response.data.message || error;
          this.$swal.fire("Failed!", message, "error");
        });
    },
    _closeForm() {
      this.$refs.form.reset();
      this.dialog = false;
    },
  },
};
</script>
