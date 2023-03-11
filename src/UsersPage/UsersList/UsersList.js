import styles from './UsersList.module.css';

export default function UsersList(props) {
    const { usersList, editing, onStartEdit, onStopEdit, onDelete } = props;

    let isError = usersList === null;
    let isEmptyList = !isError && usersList.length === 0;

    function getUsersList() {
        return usersList.map(user => (
            <div className={styles.user} key={user.id}>
                <div className={styles.info}>
                    <div className={styles.main}>{user.name}</div>
                    <div className={styles.secondary}>{user.email}</div>
                    <div className={styles.secondary}>{user.jobTitle}</div>
                </div>
                <div className={styles.actionButtonsWrapper}>
                    {
                        editing?.id === user.id
                        ? <button className="btn btn-color-secondary" onClick={onStopEdit}>Cancel</button>
                        : <button className="btn btn-outline btn-color-secondary" onClick={() => onStartEdit(user.id)}>Edit</button>
                    }
                    <button className="btn btn-outline btn-color-error" onClick={() => onDelete(user.id)}>Delete</button>
                </div>
            </div>
        ));
    }
    
    return (
        <>
            {
                isError || isEmptyList
                ? (<div className={styles.message}>
                    {isError && "An error occurred, try again"}
                    {isEmptyList && "No users found"}
                </div>)
                : getUsersList()
            }
        </>
    );
}