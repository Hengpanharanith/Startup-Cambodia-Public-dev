import { formRules } from "../util/validation-utils/form-rule";

export default (ctx, inject) => {
  inject("formRules", formRules);
};
