import colors from "vuetify/es5/util/colors";
const desc =
  "Startup Cambodia is the National Program lead by the Ministry of Economy and Finance with a mission to support local startups and build a vibrant entrepreneurship ecosystem in Cambodia.";
const img = "/images/startup-cambodia.png";
const url = "https://startupcambodia.gov.kh";
const site_name = "Startup Cambodia";
export default {
  head: {
    titleTemplate: site_name + " - %s",
    htmlAttrs: { lang: "en" },
    title: process.env.npm_package_name || site_name,
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || desc,
      },
      { hid: "image", name: "image", content: img },
      { hid: "og:title", name: "og:title", content: site_name },
      { hid: "og:description", name: "og:description", content: desc },
      { hid: "og:image", name: "og:image", content: img },
      { hid: "og:url", name: "og:url", content: url },
      { hid: "og:site_name", name: "og:site_name", content: site_name },
      { hid: "twitter:image", name: "twitter:image", content: img },
      {
        hid: "twitter:image:alt",
        name: "twitter:image:alt",
        content: site_name,
      },
      {
        hid: "twitter:title",
        property: "twitter:title",
        content: site_name,
      },
      {
        hid: "twitter:description",
        property: "twitter:description",
        content: desc,
      },
      {
        hid: "twitter:card",
        property: "twitter:card",
        content: "summary_large_image",
      },
    ],

    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        sizes: "16x16",
        href: "https://media.startupcambodia.gov.kh/platform/public-assets/sc-fav-icon.svg",
      },
      {
        hid: "og:title",
        name: "og:title",
        content: "Startup Cambodia",
      },
      {
        hid: "og:image",
        name: "og:image",
        content:
          "https://media.startupcambodia.gov.kh/platform/public-assets/sc-fav-icon.svg",
      },
    ],
    script: [
      {
        src: "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2",
      },
    ],
  },
  loading: { height: "0" },
  hmr: true,
  css: [
    "~/assets/styles/font.scss",
    "node_modules/swiper/swiper.scss",
    "~/assets/styles/custom-variable.scss",
    "~/assets/styles/index.scss",
    "quill/dist/quill.core.css",
    "quill/dist/quill.snow.css",
    "quill/dist/quill.bubble.css",
  ],
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      sizes: "16x16",
      href: "https://media.startupcambodia.gov.kh/platform/public-assets/sc-fav-icon.svg",
    },
    {
      hid: "og:title",
      name: "og:title",
      content: "Startup Cambodia",
    },
    {
      hid: "og:image",
      name: "og:image",
      content:
        "https://media.startupcambodia.gov.kh/platform/public-assets/sc-fav-icon.svg",
    },
  ],
  script: [
    { src: "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2" },
  ],
  components: [
    "~/components",
    "~/components/bars",
    "~/components/CardView",
    "~/components/Charts",
    "~/components/Common",
    "~/components/dialogs",
    "~/components/pickers",
    "~/components/sections",
  ],
  plugins: [
    "@/plugins/sweet-alert",
    "@/plugins/i18n",
    "@/plugins/i18n/locale-numb",
    "@/plugins/common",
    "@/plugins/axios",
    "@/plugins/vue-chartkick",
    "@/plugins/aos.client",
    { src: "~/plugins/lottie", mode: "client" },
    { src: "~/plugins/video-embed.js", mode: "client" },
    { src: "~/plugins/vue-loading.js", mode: "client" },
    { src: "~/plugins/vee-validate", mode: "client" },
    { src: "~/plugins/notifications", mode: "client" },
    { src: "~/plugins/swiper", mode: "client" },
    { src: "~/plugins/vue-quill-editor", mode: "client" },
    "@/plugins/form-rule",
    "@/plugins/v-mask",
    { src: "@/plugins/vue-carousel.js", mode: "client" },
  ],
  buildModules: [
    "@nuxtjs/style-resources",
    "@nuxt/postcss8",
    "@nuxtjs/moment",
    "@nuxtjs/svg",
    "@nuxtjs/vuetify",
    "@nuxtjs/pwa",
  ],
  modules: [
    "nuxt-sweetalert2",
    "@nuxtjs/axios",
    "@nuxtjs/toast",
    "@nuxt/image",
    "@nuxtjs/recaptcha",

    [
      "portal-vue/nuxt",
      { portalName: "v-portal", portalTargetName: "v-portal-target" },
    ],
    ["cookie-universal-nuxt", { alias: "cookiz", secure: true }],
    "@nuxtjs/google-analytics",
    "@nuxtjs/robots",
    // "~/plugins/embedded.js"
  ],
  recaptcha: {
    hideBadge: false, // for v3 only
    siteKey: "6LdZw2krAAAAADEsYrWdnIR8Kz-CVSCVALrGWF3I", // reCAPTCHA v2 or v3 key
    version: 2, // Use 2 or 3 depending on what you prefer
    size: "normal", // for v2: 'normal' or 'invisible'
  },

  robots: [
    {
      UserAgent: "*",
      Disallow: "/api",
    },
    {
      UserAgent: "*",
      Disallow: "/base-api",
    },
    {
      UserAgent: "*",
      Disallow: "/user-api",
    },
  ],

  // Allow: '/'
  toast: {
    duration: 5000,
    singleton: true,
  },

  moment: {
    defaultLocale: "en-au",
    locales: ["km", "en-au"],
  },
  axios: {
    proxy: true,
  },
  proxy: {
    "/api": {
      target: process.env.baseURL + "/api",
      pathRewrite: { "^/api": "" },
    },
    "/base-api": {
      target: process.env.baseURL + "/api/v1",
      pathRewrite: { "^/base-api": "" },
    },
    "/user-api": {
      target: process.env.baseURL + "/api/v1/auth/user/",
      pathRewrite: { "^/user-api": "" },
    },
    "/public": {
      target: process.env.baseURL + "/",
      pathRewrite: { "^/public": "" },
    },
  },
  vuetify: {
    treeShake: true,
    theme: {
      themes: {
        light: {
          primary: "#F79B36",
          // background: "red",
        },
        dark: {
          primary: "#F79B36",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.yellow.darken2,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },

    customVariables: ["~/assets/styles/variables.scss"],
  },
  googleAnalytics: {
    id: "UA-137984619-2", // Use as fallback if no runtime config is provided
    checkDuplicatedScript: true,
  },
  publicRuntimeConfig: {
    googleAnalytics: {
      id: "UA-137984619-2",
    },
    SHARE_URL: process.env.SHARING_URL,
  },
  build: {
    standalone: true,
    extend(config, { isDev, isClient }) {
      config.devtool = isClient ? "source-map" : "inline-source-map";
    },
    transpile: ["vee-validate/dist/rules"],
    maxChunkSize: 300000,
    terser: {
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
    babel: {
      plugins: [["@babel/plugin-proposal-private-methods", { loose: true }]],
    },
    extractCSS: true,
  },
  watchers: {
    webpack: {
      poll: true,
    },
  },
};
