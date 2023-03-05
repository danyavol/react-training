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
            <p>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" value={firstName} onChange={firstNameHandler}></input>
            </p>
            <p>
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" value={lastName} onChange={lastNameHandler}></input>
            </p>
            <p>
                <label htmlFor="address">Address</label>
                <input id="address" value={address} onChange={addressHandler}></input>
            </p>

            <p>{JSON.stringify({ firstName, lastName, address })}</p>

            <button onClick={submit}>Submit</button>
        </>
    );
}

UserForm1.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default UserForm1;
