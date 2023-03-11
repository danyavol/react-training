import { v4 } from "uuid";
import { localStorageService } from "../common/localStorage.service";
import { sleep } from "../common/sleep";

const storageKey = 'users';

export const usersApi = {
    async getUsers() {
        await sleep(500);
        randomThrowError("Failed to get the list of users");

        return localStorageService.getData(storageKey) || [];
    },
    async updateUser(userId, partialUser) {
        await sleep(500);
        randomThrowError("Failed to save the user");

        const users = localStorageService.getData(storageKey) || [];
        const index = users.findIndex(user => user.id === userId);
        users[index] = { ...users[index], ...partialUser };

        return localStorageService.saveData(storageKey, users);

    },
    async createUser(userForm) {
        await sleep(500);
        randomThrowError("Failed to create the user");

        const newUser = {
            id: v4(),
            ...userForm
        };

        const users = localStorageService.getData(storageKey) || [];
        localStorageService.saveData(storageKey, [...users, newUser]);
    },
    async deleteUser(userId) {
        await sleep(500);
        randomThrowError("Failed to delete the user");

        const users = localStorageService.getData(storageKey) || [];
        const index = users.findIndex(u => u.id === userId);
        if (index < 0) throw Error(`Invalid userId ${userId}`);
        users.splice(index, 1);
        localStorageService.saveData(storageKey, users);
    }
};

function randomThrowError(message = "Unknown error occurred", chance = 0.3) {
    if (Math.random() <= chance) 
        throw new Error(message);
}