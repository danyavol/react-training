import { useEffect, useState } from "react";

const debounceTime = 200;

export default function Search({ onSearch }) {
    const [search, setSearch] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            onSearch(search)
        }, debounceTime);

        return () => {
            clearTimeout(timeout);
        };
    }, [search]);

    return (
        <input
            value={search}
            className="input"
            placeholder="Search user..."
            onChange={(event) => setSearch(event.target.value)}
        ></input>
    );
}