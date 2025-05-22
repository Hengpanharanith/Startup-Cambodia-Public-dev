import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "~/lang/en.json";
import km from "~/lang/km.json";

Vue.use(VueI18n);

let currentLang = "";
if (process.browser) {
    currentLang = localStorage.locale;
}
const i18n = new VueI18n({
    locale: currentLang || "en",
    fallbackLocale: currentLang || "en",
    silentTranslationWarn: true,
    messages: { en, km },
});

const changeLocale = (locale) => {
    // i18n.locale = locale;
    localStorage.locale = locale;
};

export default ({ app, $moment, $vuetify, $axios }, inject) => {
    app.i18n = i18n;
    const lang = app.i18n.locale;
    $moment.locale(lang);
    $vuetify.lang.current = lang;
    $axios.setHeader("Content-Language", lang);
    $axios.setHeader("Accept-Language", lang);
    inject("changeI18nLocale", (lang) => {
        changeLocale(lang);
        // $moment.locale(lang);
        // $vuetify.lang.current = lang;
        // $axios.setHeader("Content-Language", lang);
        // $axios.setHeader("Accept-Language", lang);
        if (process.browser) {
            window.location.reload();
        }
    });

    inject("isKm", () => i18n.locale != "en");

    app.i18n.path = (link) => {
        if (app.i18n.locale === app.i18n.fallbackLocale) {
            return `/${link}`;
        }
        return `/${app.i18n.locale}/${link}`;
    };
};

const $t = (key, choice) => i18n.tc(key, choice);

export { changeLocale, $t };
