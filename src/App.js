import { useState } from 'react';
import './App.css';
import UserForm1 from "./UserForm1_multipleUseState/UserForm1";
import UserForm2 from "./UserForm2_singleUseState/UserForm2";
import UserForm3 from "./UserForm3_useReducer/UserForm3";

function App() {
    const [form1Value, setForm1Value] = useState();
    const [form2Value, setForm2Value] = useState();
    const [form3Value, setForm3Value] = useState();

    return (
        <>
            <UserForm1 onSubmit={setForm1Value}></UserForm1>
            <div>{JSON.stringify(form1Value)}</div>

            <hr/>
            
            <UserForm2 onSubmit={setForm2Value}></UserForm2>
            <div>{JSON.stringify(form2Value)}</div>

            <hr/>
            
            <UserForm3 onSubmit={setForm3Value}></UserForm3>
            <div>{JSON.stringify(form3Value)}</div>
        </>
    );
}

export default App;
