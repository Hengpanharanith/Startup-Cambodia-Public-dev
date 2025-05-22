export const en = {
    messages: {
        required: "This field is required",
        email: "Email is not valid",
        min: (_, { length, _field_ }) =>
            `${_field_} must be at least ${length} characters`,
        confirmed: (_, { _field_ }) => `${_field_} is not match`,
    },
    names: {
        name: "Username",
        gender: "Gender",
        email: "Email Address",
        password: "Password",
        confirm_password: "Confirm password",
    },
};
