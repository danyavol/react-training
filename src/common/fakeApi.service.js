import { localStorageService } from "./localStorage.service";
import { sleep } from "./sleep";

export const fakeApiService = {
    async getUsers() {
        try {
            await sleep(1000);

            const randomNumber = Math.random();
            if (randomNumber > 0.5) {
                const data = { id: 1, name: 'John Doe' };
                localStorageService.getData('users');
                return data;
            } else {
                throw new Error('Failed to get data');
            }
        } catch (error) {
            throw error;
        }
    },

    async updateUsers(data) {
        try {
            await sleep(1000);

            const randomNumber = Math.random();
            if (randomNumber > 0.5) {
                localStorageService.saveData('users', data);
                return data;
            } else {
                throw new Error('Failed to save data');
            }
        } catch (error) {
            throw error;
        }
    },

    async deleteData() {
        try {
            await sleep(1000);

            localStorageService.deleteData('users');
            return null;
        } catch (error) {
            throw error;
        }
    },
};