import styles from "./Popup.module.css";
import "./Popup.css";
import ReactDOM from 'react-dom';
import { useEffect, useState } from "react";

export default function Popup({ message, duration}) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
        const timer = setTimeout(() => setShow(false), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    return ReactDOM.createPortal((
        show && <div className={styles.container}>
            <div className={styles.message}>{message}</div>
        </div>
    ), document.querySelector('#popups'));
}