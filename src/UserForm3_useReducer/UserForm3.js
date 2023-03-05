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

    return (
        <>
            <h2>UserForm3 (useReducer)</h2>
            <div className="form">
                <div className="control">
                    <label className="control-label" htmlFor="firstName3">First Name</label>
                    <input id="firstName3" value={state.firstName.value} 
                        className={getClassName("firstName")}
                        onChange={valueChangeHandler("firstName")}
                        onBlur={blurHandler("firstName")}
                    ></input>
                    {
                        showError("firstName")
                        ? <span className="validation-error">{state.firstName.validationError}</span>
                        : null
                    }
                </div>
                <div className="control">
                    <label className="control-label" htmlFor="lastName3">Last Name</label>
                    <input id="lastName3" value={state.lastName.value} 
                        className={getClassName("lastName")}
                        onChange={valueChangeHandler("lastName")}
                        onBlur={blurHandler("lastName")}
                    ></input>
                    {
                        showError("lastName")
                        ? <span className="validation-error">{state.lastName.validationError}</span>
                        : null
                    }
                </div>
                <div className="control">
                    <label className="control-label" htmlFor="address3">Address</label>
                    <input id="address3" value={state.address.value} 
                        className={getClassName("address")}
                        onChange={valueChangeHandler("address")}
                        onBlur={blurHandler("address")}
                    ></input>
                    {
                        showError("address")
                        ? <span className="validation-error">{state.address.validationError}</span>
                        : null
                    }
                </div>

                <button className="submit" onClick={submit}>Submit</button>
            </div>
        </>
    );
}


export default UserForm3;