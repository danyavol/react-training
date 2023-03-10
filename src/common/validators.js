export const Validators = {
    required(value) {
        return value ? null : "This field is required"
    },
    maxLength(maxLength) {
        return (value) => {
            return value.length <= maxLength ? null : `Max length is ${maxLength}`;
        }
    },
    minLength(minLength) {
        return (value) => {
            return value.length >= minLength ? null : `Min length is ${minLength}`;
        }
    },
    email(value) {
        const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegExp.test(value) ? null : "Email is not valid";
    },
};
