import { addressValidator, firstNameValidator, lastNameValidator } from "./UserForm3.validator";

export const actionTypes = {
    setValue: "setValue",
    setTouched: "setTouched",
    markAllAsTouched: "markAllAsTouched"
};

export const defaultState = {
    firstName: inputConstructor("", firstNameValidator),
    lastName: inputConstructor("", lastNameValidator),
    address: inputConstructor("", addressValidator),
};

export function formReducer(state, action) {
    switch (action.type) {
        case actionTypes.setValue:
            const validationError = state[action.payload.prop].validator(action.payload.value);
            return {
                ...state,
                [action.payload.prop]: {
                    ...state[action.payload.prop],
                    value: action.payload.value,
                    validationError,
                    valid: validationError === null
                }
            }
        case actionTypes.setTouched:
            return {
                ...state,
                [action.payload.prop]: {
                    ...state[action.payload.prop],
                    touched: action.payload.touched
                }
            }
        case actionTypes.markAllAsTouched:
            const newState = {};
            for (let key in state) {
                newState[key] = {
                    ...state[key],
                    touched: true
                }
            }
            return newState;
        default:
            return state;
    }
}

export function getFormValue(formState) {
    const value = {};
    for (let key in formState) {
        value[key] = formState[key].value;
    }
    return value;
}

function inputConstructor(defaultValue, validator) {
    const validationError = validator(defaultValue);
    return {
        value: defaultValue,
        touched: false,
        validator,
        validationError,
        valid: validationError === null
    };
}
