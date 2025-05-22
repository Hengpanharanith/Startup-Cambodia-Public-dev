
import { $t } from "../../plugins/i18n"

const required = (v) => !!v || $t("form.validation.required");
const validEmail = (v) => !v || /.+@.+\..+/.test(v) || $t("form.validation.email");
const validPhone = (v) =>
  /^[0-9]{8,15}$/.test(v) || $t("form.validation.phone");

const validPhone2 = (v = "") =>
  v === null ||
  v.length === 0 ||
  /^[+][855]{3}[0-9]{8,9}$/.test(v) ||
  $t("form.validation.phone");

const selectRequiredMin = (v) => v.length > 0 || $t("form.validation.required");
const selectRequired = (v) => !!v || $t("form.validation.required");

const validURL = (v) =>
  !v ||
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
    v
  ) ||
  $t("form.validation.url");
const validTextKm = (v) =>
  !v || /^[\u1780-\u17ff]+$/g.test(v) || $t("form.validation.text_km");
const validLinkedIN = (value) => {
  if (!value) return true;
  const pattern =
    /(https):\/\/?((www|\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return pattern.test(value) || $t("form.validation.url_linkedin");
};
const validFacebook = (value) => {
  if (!value) return true;
  const pattern =
    /(https):\/\/?((www|\w\w)\.)?facebook.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return pattern.test(value) || $t("form.validation.url_fb");
};

const urlRulesNotRequired = (value) => {
  if (!value) return true;
  const pattern =
    /([https://]{8}|[http://]{7})[.a-zA-Z]{6,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  return (
    pattern.test(value) ||
    $t("form.validation.url")
  );
};

export const formRules = {
  required: [required],
  email: [validEmail],
  emailRequired: [required, validEmail],
  phone: [validPhone],
  phoneRequired: [required, validPhone],
  phoneRules: [validPhone],
  url: [validURL],
  textKmRequired: [required, validTextKm],
  linkedin: [validLinkedIN],
  facebook: [validFacebook],
  urlRulesNotRequired: [urlRulesNotRequired],
  selectRequired: [selectRequired],
  selectRequiredMin: [selectRequiredMin],
  textKm: [validTextKm],
};
