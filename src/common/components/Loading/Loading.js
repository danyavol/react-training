import styles from "./Loading.module.css";
import ReactDOM from 'react-dom';

export default function Loading() {
    return ReactDOM.createPortal((
        <div className={styles.container}>
            <div className={styles.spinner}></div>
        </div>
    ), document.body);
}