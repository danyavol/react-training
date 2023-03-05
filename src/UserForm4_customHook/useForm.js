export function useForm(controls) {
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
        }
    };
}