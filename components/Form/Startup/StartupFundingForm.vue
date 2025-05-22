<template>
  <div>
    <!-- check gitLens when restore -->

  </div>
</template>
<script>
const moment = require("moment");
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "StartupFundingForm",
  props: {
    startupPage: { type: Object, default: () => ({}) },
  },
  components: { ValidationObserver, ValidationProvider },
  computed: {
    ...mapGetters("startupPage", [
      "getStartupPage",
      "getAmountOptions",
      "getFundingStage",
      "getFundingType",
    ]),
    visibleAddRound() {
      return this.startupPage.funding_stage?.is_in_fundraising;
    },
  },
  mounted() {
    this.fundingStage = this.startupPage.funding_stage
      ? Object.assign(
          {},
          this.$common.cloneJSON(this.startupPage.funding_stage)
        )
      : {};

    this.setFundingType().then(() => {
      this.fundingTypesOptions = this.getFundingType.data;
      this.fundingTypeIds = this.fundingTypesOptions.map((value) => value.id);
    });

    this.setAmountOptions().then(() => {
      this.fundRaisingAmountOptions = this.getAmountOptions.data;
      this.fundRaisingAmountIds = this.fundRaisingAmountOptions.map(
        (value) => value.id
      );
    });
  },
  data() {
    return {
      showModal: false,
      isAdd: true,
      selectedFundingRound: null,
      isFundRaising: {
        true: { title: "Yes", value: true },
        false: { title: "No", value: false },
      },
      isFundRaisingOption: [true, false],
      currencyOption: ["r", "d"],
      currency: {
        r: { title: "KHR", value: "r" },
        d: { title: "USD", value: "d" },
      },
      fundingTypes: [],

      selectedCurrency: "",
      startupPageId: this.startupPage.id ? this.startupPage.id : [],
      fundingStage: {
        desc: "",
        desc_en: "",
        is_in_fundraising: false,
        fund_raising_amount: 0,
        funding: [],
      },
      fundingRound: {
        raise_currency: "",
        raise_amount: "",
        date_start: "",
        date_end: "",
        // set default to Seeding
        funding_type: "2",
      },

      value: {},
      options: [
        { name: "Yes", code: true },
        { name: "No", code: false },
      ],
      selectedfundRaisingAmountOptions: [],
      // fund raise option e.g 10000
      fundRaisingAmountOptions: [],
      fundRaisingAmountIds: [],

      // funding type e.g 'Seeding'
      fundingTypesOptions: [],
      fundingTypeIds: [],
      date: new Date(),
    };
  },
  methods: {
    ...mapActions("startupPage", [
      "setAmountOptions",
      "updateStartupPage",
      "createFundingStage",
      "updateFundingStage",
      "setFundingType",
      "creatFundingRound",
      "setStartupProfile",
      "setFundingStage",
      "updateFundingRound",
      "deleteFundingRound",
    ]),

    getCurrencyLabel(currency) {
      return this.currency[currency]?.title || "";
    },
    getFundingAmountLabel(value) {
      const label = this.fundRaisingAmountOptions.find((v) => v.id == value);
      return label?.desc || "";
    },
    getFundingTypeLabel(value) {
      const label = this.fundingTypesOptions.find((v) => v.id == value);
      return label?.desc || "";
    },

    getIsFundRaisingLabel(value) {
      return this.isFundRaising[value]?.title || "";
    },

    _handleFundingStageSubmit() {
      // TODO: Check form validation before submit
      this.$refs.form.validate().then((valid) => {
        if (!valid) return;
        else {
          // success
          const formData = new FormData(this.$refs.fundingStageForm);

          if (this.startupPage.funding_stage) {
            this.updateFundingStage({
              type: "info",
              data: formData,
              fundingStageId: this.startupPage.funding_stage.id,
            })
              .then((response) => {
                this.$swal.fire(
                  "",
                  "Funding stage has been updated.",
                  "success"
                );
                this.$emit("update-funding");
                this.$refs.fundingRoundFormObserver?.reset();
              })
              .catch((error) => {
                const message = error.response.data.message || error;
                this.$swal.fire("Failed!", message, "error");
              });
          } else {
            this.createFundingStage(formData)
              .then((response) => {
                this.updateStartupPage({
                  type: "funding",
                  funding: response.data.id,
                  id: this.startupPageId,
                }).then((response) => {
                  this.$swal.fire(
                    "",
                    "Funding stage has been created.",
                    "success"
                  );
                  this.$emit("update-funding");
                });
              })
              .catch((error) => {
                const message = error.response.data.message || error;
                this.$swal.fire("Failed!", message, "error");
              });
          }
        }
      });
    },
    _handleFundingRoundSubmit() {
      this.$refs.fundingRoundFormObserver.validate().then((valid) => {
        if (!valid) return;
        const formData = new FormData(this.$refs.fundingRoundForm);
        formData.set("funding_type", "2");

        if (this.isAdd) {
          this.saveNew(formData);
          return;
        }
        const { id } = this.selectedFundingRound;
        this.saveUpdate(id, formData);
      });
    },
    saveNew(formData) {
      this.creatFundingRound(formData)
        .then((response) => {
          let fundingRounds = [];
          fundingRounds = this.startupPage.funding_stage.funding.map(
            (value) => value.id
          );
          fundingRounds.push(response.data.id);

          this.updateFundingStage({
            type: "funding",
            data: fundingRounds,
            fundingStageId: this.startupPage.funding_stage.id,
          }).then((response) => {
            this.updateStartupPage({
              type: "funding",
              funding: response.data.id,
              id: this.startupPageId,
            }).then((response) => {
              this.$swal.fire(
                "",
                "A new funding round has been added.",
                "success"
              );
              this.showModal = false;
              this.$emit("update-funding");
            });
          });
        })
        .catch((error) => {
          const message = error.response.data.message || error;
          this.$swal.fire("Failed!", message, "error");
        });
    },
    saveUpdate(id, formData) {
      const payload = { id, data: formData };
      this.updateFundingRound(payload)
        .then((response) => {
          this.$swal.fire("", "Funding round has been updated.", "success");
          this.$emit("update-funding");
          this.showModal = false;
        })
        .catch((error) => {
          const message = error.response.data.message || error;
          this.$swal.fire("Failed!", message, "error");
        });
    },
    _editFundingRound(item) {
      this.showModal = true;
      this.isAdd = false;
      this.selectedFundingRound = item;
      this.fundingRound = { ...this.selectedFundingRound };
    },

    _addFundingRound() {
      this.isAdd = true;
      this.showModal = true;
      this.$refs.fundingRoundFormObserver?.reset();
      this.fundingRound = {};
    },

    _deleteFundingRound(item) {
      this.$swal
        .fire({
          title: "Confirmation",
          text: "Are you sure to delete this?",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.value) {
            const payload = {
              id: item.id,
            };
            this.deleteFundingRound(payload)
              .then((response) => {
                this.$swal.fire(
                  "",
                  "Funding round has been deleted.",
                  "success"
                );
                this.$emit("update-funding");
              })
              .catch((error) => {
                const message = error.response.data.message || error;
                this.$swal.fire("Failed!", message, "error");
              });
          }
        });
    },

    moment: function () {
      return moment();
    },
    onSelect: function (value) {
      //
      this._handleFundingStageSubmit();
    },
  },
};
</script>
<style scoped>
.blog-one__title {
  /* color: white; */
  /* background-color: black; */
  padding: 0.5rem 1rem;
}
</style>