export const km = {
    messages: {
        required: "ចន្លោះនេះត្រូវតែបំពេញ",
        email: "អ៊ីមែលមិនត្រឹមត្រូវ",
        min: (_, { length, _field_ }) =>
            `${_field_} ត្រូវតែមានតួរអក្សរយ៉ាងហោចណាស់ ${length}`,
        confirmed: (_, { _field_ }) => `${_field_} មិនត្រូវគ្នា`,
    },
    names: {
        name: "ឈ្មោះអ្នកប្រើប្រាស់",
        gender: "ភេទ",
        email: "អាសយដ្ឋានអ៊ីម៉ែល",
        password: "ពាក្យសម្ងាត់",
        confirm_password: "ពាក្យសម្ងាត់",
    },
};
