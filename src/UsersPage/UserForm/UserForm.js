import styles from './UserForm.module.css';

export default function UserForm(props) {
    const { form, isEditMode, onSubmit, onReset } = props;

    function submit() {
        if (!form.isValid()) {
            form.markAllAsTouched();
            return;
        }

        onSubmit(form.getValue());
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
        <div className="card">
            <div className={`form ${styles.wrapper}`}>
                { getControlTemplate({ control: form.get('name'), label: "Name", id: "name" }) }
                { getControlTemplate({ control: form.get('email'), label: "Email", id: "email" }) }
                { getControlTemplate({ control: form.get('jobTitle'), label: "Job Title", id: "jobTitle" }) }

                <div className={styles.actionButtonsWrapper}>
                    <button className="btn btn-outline btn-color-secondary" onClick={onReset}>Reset</button>

                    <button className="btn" onClick={submit}>{
                        isEditMode ? "Save" : "Create"
                    }</button>
                </div>
            </div>
        </div>
    );
}