import { useState } from 'react';
import PropTypes from 'prop-types';

function UserForm2(props) {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        address: ""
    });

    function submit() {
        props.onSubmit(user);
    }

    function firstNameHandler(event) {
        setUser((prevState) => ({
            ...prevState,
            firstName: event.target.value
        }));
    }

    function lastNameHandler(event) {
        setUser((prevState) => ({
            ...prevState,
            lastName: event.target.value
        }));
    }

    function addressHandler(event) {
        setUser((prevState) => ({
            ...prevState,
            address: event.target.value
        }));
    }

    return (
        <>
            <h2>UserForm2 (single useState)</h2>
            <div className="form">
                <div className="control">
                    <label className="control-label" htmlFor="firstName2">First Name</label>
                    <input className="input" id="firstName2" value={user.firstName} onChange={firstNameHandler}></input>
                </div>
                <div className="control">
                    <label className="control-label" htmlFor="lastName2">Last Name</label>
                    <input className="input" id="lastName2" value={user.lastName} onChange={lastNameHandler}></input>
                </div>
                <div className="control">
                    <label className="control-label" htmlFor="address2">Address</label>
                    <input className="input" id="address2" value={user.address} onChange={addressHandler}></input>
                </div>

                <button className="submit" onClick={submit}>Submit</button>
            </div>
        </>
    );
}

UserForm2.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default UserForm2;
