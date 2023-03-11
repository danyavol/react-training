import styles from "./Popup.module.css";
import "./Popup.css";
import ReactDOM from 'react-dom';
import { useEffect } from "react";

export default function Popup({ message, duration, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [duration]);

    return ReactDOM.createPortal((
        <div className={styles.container}>
            <div className={styles.message}>{message}</div>
        </div>
    ), document.querySelector('#popups'));
}