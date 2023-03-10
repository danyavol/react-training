import styles from './UsersList.module.css';

export default function UsersList(props) {
    const { usersList, editing, onStartEdit, onStopEdit, onDelete } = props;
    return (
        <div className={styles.container}>
            {
                usersList.map(user => (
                    <div className={styles.user} key={user.id}>
                        <div className={styles.info}>
                            <div className={styles.main}>{user.name}</div>
                            <div className={styles.secondary}>{user.email}</div>
                            <div className={styles.secondary}>{user.jobTitle}</div>
                        </div>
                        <div className={styles.actionButtonsWrapper}>
                            {
                                editing?.id === user.id
                                ? <button className={styles.actionButton} onClick={onStopEdit}>Cancel</button>
                                : <button className={styles.actionButton} onClick={() => onStartEdit(user.id)}>Edit</button>
                            }
                            <button className={styles.actionButton} onClick={() => onDelete(user.id)}>Delete</button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}