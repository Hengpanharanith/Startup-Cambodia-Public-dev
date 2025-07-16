import Vue from "vue";
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
} from "vee-validate";
import { required, email, password, digits } from "vee-validate/dist/rules";
import { en } from "./i18n/en.vee";
import { km } from "./i18n/km.vee";
// extend("required", {
//   ...required,
//   message: "This field is required.",
// });

extend("required", required);
extend("email", {
  ...email,
  message: "Please provide valid email address.",
});
extend("startDateValid", {
  message: "Start date must be today or a future date.",
  validate(value) {
    if (!value) return false;
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // reset time part to midnight
    return selectedDate >= today;
  },
});
extend("maxSize", {
  params: ["size"],
  message: "File size must be less than {size} MB.",
  validate(value, { size }) {
    if (!value || typeof value === "string") return true; // allow empty or existing URL

    const maxSizeInBytes = size * 1024 * 1024; // convert MB to bytes
    return value instanceof File && value.size <= maxSizeInBytes;
  },
});
extend("imageType", {
  message: "Only JPEG and PNG files are allowed.",
  validate(value) {
    if (!value || typeof value === "string") return true; // Skip for existing image URLs
    const allowedTypes = ["image/jpeg", "image/png"];
    return value instanceof File && allowedTypes.includes(value.type);
  },
});
extend("phone", {
  ...required,
  validate: (v) => {
    if (!v) return "This field is required.";
    return true;
    // return /^\d+$/g.test(v);
  },
  message: "Invalid phone number.",
});

extend("username", {
  validate: (value) => {
    // at least one number
    const result =
      /^(?=.{4,20}$)(?:[a-zA-Z\d]+(?:(?:\.|-|_)[a-zA-Z\d])*)+$/gi.test(value);
    return result;
  },
  message:
    "Username must be more than 4 charaters and contain at least one alphabet.",
});

extend("name_km", {
  // ...required,
  validate: (v) => {
    // if (!v) return "This field is required.";
    return /^[\u1780-\u17ff]+$/g.test(v);
  },
  message: "Only Khmer alphabets are allowed",
});

extend("name_latin", {
  ...required,
  validate: (v) => {
    if (!v) return "This field is required.";
    return /^[a-z]+$/gi.test(v);
  },
  message: "Only English alphabets are allowed",
});

extend("password", {
  validate: (value) => {
    const result = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/gi.test(value);
    return result;
  },
  message: "Password must contain at least 1 upper case 1 symbol and 1 digit.",
});

extend("web_url", {
  validate: (v) => {
    if (!v) return true;
    return /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
      v
    );
  },
  message: "Invalid URL",
});

extend("password", {
  params: ["target"],
  validate(v, { target }) {
    return v === target;
  },
  message: "Password confirmation does not match",
});

extend("digits", {
  ...digits,
  message: "Please input a valid number",
});

localize({ en, km });
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
