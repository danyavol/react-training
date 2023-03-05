import { useState } from 'react';
import PropTypes from 'prop-types'; 

function UserForm1(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");

    function submit() {
        props.onSubmit({ firstName, lastName, address });
    }

    function firstNameHandler(event) {
        setFirstName(event.target.value);
    }

    function lastNameHandler(event) {
        setLastName(event.target.value);
    }

    function addressHandler(event) {
        setAddress(event.target.value);
    }

    return (
        <>
            <h2>UserForm1 (multiple useStates)</h2>
            <div className="form">
                <div className="control">
                    <label className="control-label" htmlFor="firstName1">First Name</label>
                    <input className="input" id="firstName1" value={firstName} onChange={firstNameHandler}></input>
                </div>
                <div className="control">
                    <label className="control-label" htmlFor="lastName1">Last Name</label>
                    <input className="input" id="lastName1" value={lastName} onChange={lastNameHandler}></input>
                </div>
                <div className="control">
                    <label className="control-label" htmlFor="address1">Address</label>
                    <input className="input" id="address1" value={address} onChange={addressHandler}></input>
                </div>

                <button className="submit" onClick={submit}>Submit</button>
            </div>
        </>
    );
}

UserForm1.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default UserForm1;
