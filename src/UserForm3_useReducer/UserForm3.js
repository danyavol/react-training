import { useReducer } from 'react';
import { actionTypes, defaultState, formReducer, getFormValue } from './UserForm3.reducer';
import { isFormValid } from './UserForm3.validator';

function UserForm3(props) {
    const [state, dispatch] = useReducer(formReducer, defaultState);

    function submit() {
        if (!isFormValid(state)) {
            dispatch({
                type: actionTypes.markAllAsTouched
            });
            return;
        }

        props.onSubmit(getFormValue(state));
    }

    function valueChangeHandler(prop) {
        return (event) => {
            dispatch({
                type: actionTypes.setValue,
                payload: {
                    prop,
                    value: event.target.value
                }
            })
        }
    }

    function blurHandler(prop) {
        return () => {
            dispatch({
                type: actionTypes.setTouched,
                payload: {
                    prop,
                    touched: true
                }
            })
        }
    }

    function showError(prop) {
        return !state[prop].valid && state[prop].touched;
    }

    function getClassName(prop) {
        return `input${showError(prop) ? " input-invalid" : ""}`;
    }

    function getControlTemplate({ controlName, label, id }) {
        return (
            <div className="control">
                <label className="control-label" htmlFor={id}>{label}</label>
                <input id={id} value={state[controlName].value} 
                    className={getClassName(controlName)}
                    onChange={valueChangeHandler(controlName)}
                    onBlur={blurHandler(controlName)}
                ></input>
                {
                    showError(controlName)
                    ? <span className="validation-error">{state[controlName].validationError}</span>
                    : null
                }
            </div>
        );
    }

    return (
        <>
            <h2>UserForm3 (useReducer)</h2>
            <div className="form">
                { getControlTemplate({ controlName: "firstName", label: "First Name", id: "firstName3" }) }
                { getControlTemplate({ controlName: "lastName", label: "Last Name", id: "lastName3" }) }
                { getControlTemplate({ controlName: "address", label: "Address", id: "address3" }) }

                <button className="submit" onClick={submit}>Submit</button>
            </div>
        </>
    );
}


export default UserForm3;
