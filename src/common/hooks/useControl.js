import { useReducer } from "react";

export function useControl(defaultValue, validators = []) {
    const [state, dispatch] = useReducer(controlReducer, getDefaultState(defaultValue, validators));

    return {
        value: state.value,
        touched: state.touched,
        valid: state.valid,
        validationError: state.validationError,
        setValue: (value) => dispatch({
            type: controlActionTypes.setValue,
            payload: value
        }),
        setTouched: (touched) => dispatch({
            type: controlActionTypes.setTouched,
            payload: touched
        }),
    };
}

const controlActionTypes = {
    setValue: "setValue",
    setTouched: "setTouched"
};

function controlReducer(state, action) {
    switch(action.type) {
        case controlActionTypes.setValue:
            const validationError = validateValue(action.payload, state.validators);
            return {
                ...state,
                value: action.payload,
                validationError,
                valid: validationError === null
            };
        case controlActionTypes.setTouched:
            return {
                ...state,
                touched: action.payload
            };
        default: 
            return state;
    }
}

function getDefaultState(defaultValue, validators) {
    const validationError = validateValue(defaultValue, validators);
    return {
        value: defaultValue,
        touched: false,
        validators,
        validationError,
        valid: validationError === null
    };
}

function validateValue(value, validators) {
    let validationError = null;
    for (let validator of validators) {
        validationError = validator(value);
        if (validationError !== null) break;
    }
    return validationError;
}
