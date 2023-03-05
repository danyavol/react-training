import { useReducer } from "react";

function getDefaultState(defaultValue, validator) {
    const validationError = validator(defaultValue);
    return {
        value: defaultValue,
        touched: false,
        validator,
        validationError,
        valid: validationError === null
    };
}

const controlActionTypes = {
    setValue: "setValue",
    setTouched: "setTouched"
};

function controlReducer(state, action) {
    switch(action.type) {
        case controlActionTypes.setValue:
            const validationError = state.validator(action.payload);
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

export function useControl(defaultValue, validator = () => null) {
    const [state, dispatch] = useReducer(controlReducer, getDefaultState(defaultValue, validator));

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