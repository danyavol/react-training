export function firstNameValidator(value) {
    if (!value) return "FirstName is required";
    if (value.length > 15) return "Max length is 15";
    return null;
}

export function lastNameValidator(value) {
    if (!value) return "LastName is required";
    if (value.length > 20) return "Max length is 20";
    return null;
}

export function addressValidator(value) {
    return value ? null : "Address is required";
}

export function isFormValid(formState) {
    for (let key in formState) {
        if (!formState[key].valid) return false;
    }
    return true;
}