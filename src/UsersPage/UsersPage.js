import { useEffect, useState } from "react";
import { formGroup } from "../common/formGroup";
import { useControl } from "../common/hooks/useControl";
import { Validators } from "../common/validators";
import Search from "./Search/Search";
import UserForm from "./UserForm/UserForm";
import UsersList from "./UsersList/UsersList";
import { usersApi } from "./UsersPage.api";

const defaultFormValue = { name: "", email: "", jobTitle: "" };

export default function UsersPage() {
    const [usersList, setUsersList] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const isEditMode = !!currentUser;

    const name = useControl(defaultFormValue.name, [Validators.required, Validators.maxLength(15)]);
    const email = useControl(defaultFormValue.email, [Validators.email]);
    const jobTitle = useControl(defaultFormValue.jobTitle, [Validators.required, Validators.maxLength(25)]);
    const form = formGroup({ name, email, jobTitle });

    useEffect(() => {
        loadAllUsers()
    }, []);

    function startEditing(userId) {
        const currentUser = usersList.find(u => u.id === userId);
        form.reset(currentUser);
        setCurrentUser(currentUser);
    }

    function stopEditing() {
        form.reset(defaultFormValue);
        setCurrentUser(null);
    }

    async function removeUser(userId) {
        setIsLoading(true);
        await usersApi.deleteUser(userId);
        await loadAllUsers();
        setIsLoading(false);
    }

    function reset() {
        if (isEditMode) {
            form.reset(currentUser);
        } else {
            form.reset(defaultFormValue);
        }
    }

    async function submit(userForm) {
        setIsLoading(true);
        if (isEditMode) {
            await usersApi.updateUser(currentUser.id, userForm);
        } else {
            await usersApi.createUser(userForm);
        }
        stopEditing();
        await loadAllUsers();
        setIsLoading(false);
    }

    async function loadAllUsers() {
        setIsLoading(true);
        const users = await usersApi.getUsers();
        setUsersList(users);
        setIsLoading(false);
    }

    return (
        <>
            {isLoading ? <h4>Loading...</h4> : null}
            <UserForm form={form} isEditMode={isEditMode} onSubmit={submit} onReset={reset}></UserForm>
            {/* <Search></Search> */}
            <UsersList usersList={usersList} editing={currentUser} onStartEdit={startEditing} onStopEdit={stopEditing} onDelete={removeUser}></UsersList>
        </>
    );
}