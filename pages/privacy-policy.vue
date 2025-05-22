<template>
  <div>
    <PageHeader :bannerUrl="bannerUrl" />
    <BreadcrumbsBar
      :breadcrumb-items="breadCrumbs"
      class="mb-8"
    />
    <div class="container py-4">
      <div class="row">
        <div class="col-lg-12 mx-auto">
          <p>
            Techo Startup Center (&ldquo;<b>we</b>&rdquo;,
            &ldquo;<b>us</b>&rdquo;, or &ldquo;<b>our</b>&rdquo;) has been
            established by the Prakas of Ministry of Economy and Finance of
            Cambodia to cultivate and nurture startups by harnessing the power
            of emerging technology and innovation. We operate this website,
            <a href="https://startupcambodia.gov.kh">https://startupcambodia.gov.kh</a>. In providing our Services, we take your privacy seriously and are
            committed to providing a safe online experience. We believe in being
            transparent about our practices, which is why we have provided this
            Privacy &amp; Cookies Policy (&ldquo;Policy&rdquo;) to explain how
            we collect, use and disclose your information. This updated Policy
            gives you more control over your information and more clearly
            explains how we use it.
          </p>

          <p>
            The contents of personal data obtained by us are your name, name of
            your company, title, your address, address of your company, e-mail
            address, mobile phone number, etc. The purposes of processing are to
            provide you with feedback on incidents (including, but not limited
            to, questions, bugs or complaints) you raise when using our
            services, to provide you with updates on changes to our services
            (including bug fixes, new features and revised content) where you
            have already engaged with us by raising an incident, and to inform
            you when we launch new services that address the same capability as
            previous our services where you have engaged with us in the past.
          </p>

          <p>
            The legal basis for processing of your personal data includes that
            (i) processing is necessary for the performance of a contract to
            which the data subject is a party, (ii) processing is necessary for
            compliance with a legal obligation to which the data controller is
            subject, and (iii) processing is necessary for the legitimate
            interests of the data controller unless such interests are
            overridden by the interests or rights of the data subject. To be
            more precise, we have the purposes of the legitimate interests of
            notifying you of any troubles (including but not limited to any
            security incidents).
          </p>

          <p>
            We only retain collected information for as long as necessary to
            provide you with your requested service or comply with statutory
            retention period. What data we store, we will protect within
            commercially acceptable means to prevent loss and theft, as well as
            unauthorized access, disclosure, copying, use or modification.
          </p>

          <p>
            In case where we provide third parties with personal data to the
            extent permissible by applicable laws, the recipients or the types
            of recipients are our group companies and service providers.
          </p>

          <p>
            Our website may link to external sites that are not operated by us.
            Please be aware that we have no control over the content and
            practices of these sites, and cannot accept responsibility or
            liability for their respective privacy policies.
          </p>

          <p>
            You are free to refuse our request for your personal data and are
            not subject to a legal obligation to provide such data, with the
            understanding that we may be unable to provide you with some of your
            desired services.
          </p>

          <p>
            You can demand access to an information on collected personal data
            concerning you, and you have the right to receive, in a commonly
            used and machine-readable format, the information you have provided.
            You can also demand that your personal data be erased or rectified
            and processing of it restricted in cases where you have legitimate
            grounds.
          </p>

          <p>
            If you have consented to your personal data being processed by us,
            you can withdraw that consent at any time. Such withdrawal of
            consent shall not affect the lawfulness of processing based on the
            consent before its withdrawal.
          </p>

          <p>
            You have the right to object to processing of your personal data if
            we use it based on a weighing of interest. In that case, we no
            longer use your personal information, unless we have an overriding
            interest in doing so. You have the right to request the correction,
            deletion, or restricted processing of your personal information.
          </p>

          <p>
            Your continued use of our website will be regarded as acceptance of
            our practices around privacy and personal information. If you have
            any questions about how we handle user data and personal
            information, feel free to contact us at the following address.
          </p>

          <p>Techo Startup Center</p>

          <p>info@techostartup.center</p>

          <p>
            RUPP&rsquo;s compound, Russian Federation Blvd., Toul Kork, Phnom
            Penh, Cambodia
          </p>

          <p>This policy is effective as of 1 Mar 2019.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PageHeader from "@/components/Common/PageHeader";
import BreadcrumbsBar from "../components/bars/BreadcrumbsBar.vue";
export default {
  layout: "common",
  components: { PageHeader, BreadcrumbsBar },
  data() {
    return {
      bannerUrl: "https://media.startupcambodia.gov.kh/platform/public-assets/banners/privacy.png",
    };
  },
  computed: {
    breadCrumbs() {
      return [
        { homePage: true, text: this.$t("breadcrumb.home"), to: "/" },
        { text: this.$t("privacy_policy"), disabled: true },
      ];
    },
  },
};
</script>