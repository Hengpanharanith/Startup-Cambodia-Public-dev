<template>
  <div>
    <PageHeader v-bind:bannerUrl="bannerUrl" />
    <BreadcrumbsBar
      :breadcrumb-items="breadCrumbs"
      class="mb-8"
    />
    <v-container>
      <div class="block-title__text mb-4 text-center">
        <p>{{ $t("get_listed.tell_us_header") }}</p>
      </div>
      <p class="lead py-5 text-center">
        {{ $t("get_listed.tell_us_desc") }}
      </p>

      <v-row
        align-v="center"
        class="text-center"
      >
        <v-col
          cols="12"
          sm="6"
          md="3"
          v-for="item in stakeholders"
          :key="item.title"
          class="pb-5 pointer"
        >
          <v-card
            class="card-actor blog-one__single-inner-block blog-one__single"
            rounded="lg"
            outlined
            flat
            @click="setActive(item)"
          >
            <!-- <p>{{item.iconActive}}</p> -->

            <v-card-text>
              <!-- <Lottie
                :options="{ animationData: item.lottie, loop: true }"
                :height="150"
                class="mb-4 justify-content-start"
              /> -->
              <img
                :src="item.thumbnail"
                height="100"
                alt=""
                class="mb-4"
              />

              <h3 class="blog-one__title card-simple__title mb-2">
                {{ item.title }}
              </h3>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-row>
      <!-- Startup Form -->
      <StartupGetListedForm ref="startupForm" />

      <!-- Mentor Form -->
      <MentorGetListedForm ref="mentorForm" />

      <!-- Investor Form -->
      <InvestorGetListedForm ref="investorForm" />

      <!-- Other Stakeholder Form -->
      <StakeholderGetListedForm ref="stakeholderForm" />
    </v-row>
  </div>
</template>
<script>
import Countries from "@/api/country_code";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import { mapState, mapActions } from "vuex";
import { LookingAt, getLookingAtById } from "@/api/looking_at";
import { BusinessModel, getBusinessModelById } from "@/api/business_model";
import { InvestorType, getInvestorTypeById } from "@/api/investor_type";
import {
  InvestmentStage,
  getInvestmentStageById,
} from "@/api/investment_stage";
import { StakeholderType, getStakeholderById } from "@/api/stakeholder_type.js";
import StartupGetListedForm from "@/components/Form/GetListed/StartupGetListedForm";
import MentorGetListedForm from "@/components/Form/GetListed/MentorGetListedForm";
import InvestorGetListedForm from "@/components/Form/GetListed/InvestorGetListedForm";
import StakeholderGetListedForm from "@/components/Form/GetListed/StakeholderGetListedForm";

import BreadcrumbsBar from "../../components/bars/BreadcrumbsBar.vue";
export default {
  components: {
    ButtonPrimary,
    StartupGetListedForm,
    MentorGetListedForm,
    InvestorGetListedForm,
    StakeholderGetListedForm,
    BreadcrumbsBar,
  },
  head: { title: "Get Listed" },
  layout: "common",
  data() {
    return {
      dateIncorporatedRound: false,
      dateIncorporated: null,
      formHasErrors: false,
      imageName: "",
      imageUrl: "",
      imageFile: "",
      countries: Countries,
      dialog: false,
      businessModels: BusinessModel,
      employeeRangeList: ["1-10", "11-50", "51-100", "Above 100"],
      lookingAtList: LookingAt,
      investor_type: InvestorType,
      investment_stage: InvestmentStage,
      stakeholder_type: StakeholderType,

      profileImage: "",
      editedItem: {},

      stepper: 1,
      bannerUrl:
        "https://media.startupcambodia.gov.kh/platform/public-assets/banners/get_list.png",
      title: "Get Listed",
      subtitle:
        "For strengthening and growing our ecosystem is undoubtedly important to have strong collaboration and partnership with ecosystem community members. Those are the organisations, providing a wide range of services at all stages of the startup’s life, where we try to supercharge the value of their activities. ",

      activeElement: 0,
      is_investor: [
        {
          id: true,
          name: "True",
        },
        {
          id: false,
          name: "False",
        },
      ],
      is_previous_entrepreneur: [
        {
          id: true,
          name: "True",
        },
        {
          id: false,
          name: "False",
        },
      ],
      show: true,
    };
  },

  methods: {
    ...mapActions("industry", { getIndustry: "get" }),
    ...mapActions("expertise", { getExpertise: "get" }),
    ...mapActions("get-listed", ["requestGetListed"]),
    addStartup() {
      this.$refs.startupForm.openForm();
    },
    addMentor() {
      this.$refs.mentorForm.openForm();
    },
    addInvestor() {
      this.$refs.investorForm.openForm();
    },
    addStakeholder() {
      this.$refs.stakeholderForm.openForm();
    },

    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    goToSection(sectionId) {
      var scrollDiv = document.getElementById(sectionId).offsetTop;
      window.scrollTo({ top: scrollDiv, behavior: "smooth" });
    },
    setActive(el) {
      this.activeElement = el.id;
      switch (el.id) {
        case 1:
          this.addStartup();
          break;
        case 2:
          this.addMentor();
          break;
        case 3:
          this.addInvestor();
          break;
        case 4:
          this.addStakeholder();
          break;
        default:
          this.activeElement = 0;
          break;
      }
    },
    closeForm() {
      this.dialog = false;
      this.activeElement = 0;
      this.stepper = 1;
      this.editedItem = {};
      this.profileImage = "";
    },
    saveForm(nextStep) {
      let valid = this.$refs.form.validate();

      if (!valid) return;
      this.stepper = nextStep;
    },

    submitStartup() {
      const formData = new FormData();
      if (this.editedItem.logo) {
        formData.append("loog", this.editedItem.logo);
      }

      formData.append("name", this.editedItem.name);
      formData.append("email", this.editedItem.email);
      formData.append("address", this.editedItem.address);
      formData.append("phone", this.editedItem.phone);
      formData.append("country_code", this.editedItem.country_code);
      if (this.editedItem.industry) {
        this.editedItem.industry.forEach((element) => {
          formData.append("industry", element.id);
        });
      }

      if (this.editedItem.business_model) {
        this.editedItem.business_model.forEach((element) => {
          formData.append("business_model", element);
        });
      }

      if (this.editedItem.looking_at) {
        this.editedItem.looking_at.forEach((element) => {
          formData.append("looking_at", element);
        });
      }

      this.requestGetListed({
        stakeHolderType: "startup",
        data: formData,
      })
        .then((res) => {
          //
          this.$swal.fire("Success!", res, "success");
        })
        .catch((error) => {
          const message = error.response.data.message || error;
          this.$swal.fire("Failed!", message, "error");
        });
    },

    submitMentor() {
      const formData = new FormData();

      formData.append("name", this.editedItem.name);
      formData.append("email", this.editedItem.email);
      formData.append("address", this.editedItem.address);
      formData.append("phone", this.editedItem.phone);
      formData.append("country_code", this.editedItem.country_code);

      if (this.editedItem.industry) {
        this.editedItem.industry.forEach((element) => {
          formData.append("industry", element.id);
        });
      }
    },
    submitInvestor() {
      const formData = new FormData();

      formData.append("name", this.editedItem.name);
      formData.append("email", this.editedItem.email);
      formData.append("address", this.editedItem.address);
      formData.append("phone", this.editedItem.phone);
      formData.append("country_code", this.editedItem.country_code);

      if (this.editedItem.industry) {
        this.editedItem.industry.forEach((element) => {
          formData.append("industry", element.id);
        });
      }
    },
    submitOtherStakeholder() {
      const formData = new FormData();

      formData.append("name", this.editedItem.name);
      formData.append("email", this.editedItem.email);
      formData.append("address", this.editedItem.address);
      formData.append("phone", this.editedItem.phone);
      formData.append("country_code", this.editedItem.country_code);
      if (this.editedItem.industry) {
        formData.append("industry", this.editedItem.industry.id);
      }

      this.requestGetListed({
        stakeHolderType: this.editedItem.stakeholder_type,
        data: formData,
      })
        .then((res) => {
          //
          this.$swal.fire("Success!", res, "success");
        })
        .catch((error) => {
          const message = error.response.data.message || error;
          this.$swal.fire("Failed!", message, "error");
        });
    },

    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.startupForm.email = "";
      this.startupForm.name = "";
      this.startupForm.industires = null;
      this.startupForm.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },

    pickProfile(file) {
      if (file.size > 1000000) {
        this.$swal.fire("", "File size must be below 1MB", "fail");
        return;
      }

      this.profileImage = URL.createObjectURL(file);
      this.editedItem.logo = file;

      // this.editedItem.logo = file.name;
    },

    getDisplayPhone(country_code, num) {
      if (num) {
        if (country_code == "+855") {
          var phone = num.replace(/(\d{2})(\d{3})(\d{3}|\d{4})/, "$1 $2 $3");
          return phone;
        } else {
          var phone = num.replace(/(\d{3})(\d{3})(\d{3}|\d{4})/, "$1 $2 $3");
          return phone;
        }
        // var phone = num.replace(/([+][855]{3}|[0]{1})(\d{2})(\d{3})(\d{3}|\d{4})/, '+855 (0) $2 $3 $4');
      }
    },
    getLookingAtById(id) {
      return getLookingAtById(id);
    },

    getBusinessModelById(id) {
      return getBusinessModelById(id);
    },

    getInvestorTypeById(id) {
      return getInvestorTypeById(id);
    },
    getInvestmentStageById(id) {
      return getInvestmentStageById(id);
    },

    getStakeholderById(id) {
      return getStakeholderById(id);
    },
  },

  computed: {
    ...mapState("interest", { interestList: "dataList" }),
    ...mapState("industry", { industryList: "dataList" }),
    ...mapState("expertise", { expertiseList: "dataList" }),
    isEmptyObj: function () {
      return Object.keys(this.editedItem).length === 0;
    },

    breadCrumbs() {
      return [
        { homePage: true, text: this.$t("breadcrumb.home"), to: "/" },
        {
          text: this.$t("breadcrumb.ecosystem"),
          to: "/ecosystem",
          disabled: false,
        },
        { text: this.$t("breadcrumb.get_listed"), disabled: true },
      ];
    },

    breadCrumbs() {
      return [
        { homePage: true, text: this.$t("breadcrumb.home"), to: "/" },
        {
          text: this.$t("breadcrumb.ecosystem"),
          to: "/ecosystem",
          disabled: false,
        },
        { text: this.$t("breadcrumb.get_listed"), disabled: true },
      ];
    },

    stakeholders() {
      return [
        {
          id: 1,
          title: this.$t("get_listed.startup"),
          thumbnail: "/images/get_listed/startup.svg",

          selected: false,
          sectionId: "formSection",
        },
        {
          id: 2,
          title: this.$t("get_listed.mentor"),
          thumbnail: "/images/get_listed/mentor.svg",
          selected: false,
          sectionId: "formSection",
        },

        {
          id: 3,
          title: this.$t("get_listed.investor"),
          selected: false,
          sectionId: "formSection",
          thumbnail: "/images/get_listed/investor.svg",
        },
        {
          id: 4,
          title: this.$t("get_listed.other"),
          selected: false,
          sectionId: "formSection",
          thumbnail: "/images/get_listed/others.svg",
        },
      ];
    },
  },

  mounted() {
    this.getIndustry({ params: { page_size: 999 } });
    this.getExpertise({ params: { page_size: 999 } });
  },
};
</script>

<style >
.step__bg {
  background: url("https://www.startupsg.gov.sg/_nuxt/d66e0b9e29e82ae08e69be3ca902c658.svg");
  background-size: contain;
  background-repeat: no-repeat;
}
.activeCard {
  background-color: #f2a047 !important;
  color: white;
}

.card-actor {
  padding: 0 !important;
}

.blog-one__single.card-actor:hover.blog-one__single-inner-block {
  /* background-color: #343a40a6; */
  background-color: #f2a047 !important;
  color: white;
}
</style>

