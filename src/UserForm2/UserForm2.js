import { useState } from 'react';

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
            <p>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" value={user.firstName} onChange={firstNameHandler}></input>
            </p>
            <p>
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" value={user.lastName} onChange={lastNameHandler}></input>
            </p>
            <p>
                <label htmlFor="address">Address</label>
                <input id="address" value={user.address} onChange={addressHandler}></input>
            </p>

            <p>{JSON.stringify(user)}</p>

            <button onClick={submit}>Submit</button>
        </>
    );
}

export default UserForm2;
