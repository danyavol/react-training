import { useControl } from "./useControl";
import { useForm } from "./useForm";
import { addressValidator, firstNameValidator, lastNameValidator } from "./UserForm4.validator";

function UserForm4(props) {
    const firstName = useControl("", firstNameValidator);
    const lastName = useControl("", lastNameValidator);
    const address = useControl("", addressValidator);
    const form = useForm({firstName, lastName, address});

    function submit() {
        if (!form.isValid()) {
            form.markAllAsTouched();
            return;
        }

        props.onSubmit(form.getValue());
    }

    function showError(control) {
        return !control.valid && control.touched;
    }

    function getClassName(control) {
        return `input${showError(control) ? " input-invalid" : ""}`;
    }

    function getControlTemplate({ control, label, id }) {
        return (
            <div className="control">
                <label className="control-label" htmlFor={id}>{label}</label>
                <input id={id} value={control.value} 
                    className={getClassName(control)}
                    onChange={(event) => control.setValue(event.target.value)}
                    onBlur={() => control.setTouched(true)}
                ></input>
                {
                    showError(control)
                    ? <span className="validation-error">{control.validationError}</span>
                    : null
                }
            </div>
        );
    }

    return (
        <>
            <h2>UserForm4 (custom hooks)</h2>
            <div className="form">
                { getControlTemplate({ control: firstName, label: "First Name", id: "firstName4" }) }
                { getControlTemplate({ control: lastName, label: "Last Name", id: "lastName4" }) }
                { getControlTemplate({ control: address, label: "Address", id: "address4" }) }

                <button className="submit" onClick={submit}>Submit</button>
            </div>
        </>
    );
}

export default UserForm4;