import './App.css';
import UserForm1 from "./UserForm1/UserForm1";
import UserForm2 from "./UserForm2/UserForm2";

function App() {

    function onSubmit(value) {
        console.log(value);
    }

    return (
        <>
            <UserForm1 onSubmit={onSubmit}></UserForm1>

            <hr/>
            
            <UserForm2 onSubmit={onSubmit}></UserForm2>
        </>
    );
}

export default App;
