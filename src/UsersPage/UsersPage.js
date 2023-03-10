import { useEffect, useMemo, useState } from "react";
import Loading from "../common/components/Loading/Loading";
import { usePopups } from "../common/hooks/usePopups";
import { formGroup } from "../common/formGroup";
import { useControl } from "../common/hooks/useControl";
import { Validators } from "../common/validators";
import UserForm from "./UserForm/UserForm";
import UsersList from "./UsersList/UsersList";
import { usersApi } from "./UsersPage.api";
import styles from "./UsersPage.module.css";
import Search from "./Search/Search";
import { filterUsers } from "./filterUsers";

const defaultFormValue = { name: "", email: "", jobTitle: "" };

export default function UsersPage() {
    const [usersList, setUsersList] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");
    const { popups, addPopup } = usePopups();

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
        try {
            await usersApi.deleteUser(userId);
            await loadAllUsers();
        } catch(err) {
            addPopup({ message: err.message, duration: 3000 });
        }
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
        try {
            if (isEditMode) {
                await usersApi.updateUser(currentUser.id, userForm);
            } else {
                await usersApi.createUser(userForm);
            }
            stopEditing();
            await loadAllUsers();
        } catch(err) {
            addPopup({ message: err.message, duration: 3000 });
        }
        setIsLoading(false);
    }

    async function loadAllUsers() {
        setIsLoading(true);
        try {
            const users = await usersApi.getUsers();
            setUsersList(users);
        } catch(err) {
            addPopup({ message: err.message, duration: 3000 });
            setUsersList(null);
        }
        setIsLoading(false);
    }

    const filteredUsers = useMemo(() => filterUsers(usersList, search), [usersList, search]);

    return (
        <div className={styles.container}>
            { popups }
            { isLoading && <Loading /> }

            <UserForm form={form} isEditMode={isEditMode} onSubmit={submit} onReset={reset}></UserForm>
    
            <div className="card">
                <div className={styles.toolbar}>
                    <Search onSearch={setSearch}></Search>
                    <button className={`btn ${styles.refreshButton}`} onClick={loadAllUsers}>Refresh list</button>
                </div>
                <UsersList usersList={filteredUsers} editing={currentUser} 
                    onStartEdit={startEditing} onStopEdit={stopEditing} onDelete={removeUser}
                ></UsersList>
            </div>
        </div>
    );
}