import { useState } from "react";
import Popup from "./Popup";

export function usePopups() {
    const [popupsConfig, setPopupsConfig] = useState([]);
    const [counter, setCounter] = useState(0);

    function addPopup({ message, duration }) {
        setPopupsConfig(prevPopups => [
            ...prevPopups,
            { id: counter + 1, message, duration }
        ]);
        setCounter(counter + 1);
    }

    function removePopup(id) {
        setPopupsConfig(prevPopups => prevPopups.filter(p => p.id !== id));
    }

    function getPopups() {
        return popupsConfig.map(p => (
            <Popup key={p.id} message={p.message} duration={p.duration} onClose={removePopup.bind(this, p.id)} />
        ));
    }
    
    return {
        popups: getPopups(),
        addPopup
    };
}