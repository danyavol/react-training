export function formGroup(controls) {
    return {
        isValid: () => {
            for (let key in controls) {
                if (!controls[key].valid) return false;
            }
            return true;
        },
        markAllAsTouched: () => {
            for (let key in controls) {
                controls[key].setTouched(true);
            }
        },
        getValue: () => {
            const value = {};
            for (let key in controls) {
                value[key] = controls[key].value;
            }
            return value;
        },
        reset: (values) => {
            for (let key in controls) {
                if (!(key in values)) {
                    throw Error(`There is no value for ${key} control`)
                }
                controls[key].setValue(values[key]);
                controls[key].setTouched(false);
            }
        },
        get: (controlName) => {
            return controls[controlName];
        }
    };
}