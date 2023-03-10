export const localStorageService = {
    getData(key) {
        const data = localStorage.getItem(key);
        try {
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`Error parsing JSON data for key ${key}: ${error.message}`);
            return null;
        }
    },

    saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    deleteData(key) {
        localStorage.removeItem(key);
    },
};