import { useReducer } from 'react';
import { actionTypes, defaultState, formReducer } from './UserForm3.reducer';
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

        console.log('submitted');
        props.onSubmit(state);
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
            <h2>UserForm3 (reducer)</h2>
            <div className="form">
                <div className="control">
                    <label className="control-label" htmlFor="firstName">First Name</label>
                    <input id="firstName" value={state.firstName.value} 
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
                    <label className="control-label" htmlFor="lastName">Last Name</label>
                    <input id="lastName" value={state.lastName.value} 
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
                    <label className="control-label" htmlFor="address">Address</label>
                    <input id="address" value={state.address.value} 
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
