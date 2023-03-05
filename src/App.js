import './App.css';
import UserForm1 from "./UserForm1_multipleUseState/UserForm1";
import UserForm2 from "./UserForm2_singleUseState/UserForm2";
import UserForm3 from "./UserForm3_useReducer/UserForm3";

function App() {

    function onSubmit(value) {
        console.log(value);
    }

    return (
        <>
            <UserForm1 onSubmit={onSubmit}></UserForm1>

            <hr/>
            
            <UserForm2 onSubmit={onSubmit}></UserForm2>

            <hr/>
            
            <UserForm3 onSubmit={onSubmit}></UserForm3>
        </>
    );
}

export default App;
