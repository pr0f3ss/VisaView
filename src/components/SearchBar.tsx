import { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
    const [query, setQuery] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div
            style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                zIndex: 4000,
                background: "white",
                padding: "10px",
                borderRadius: "4px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            }}
        >
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search country..."
                style={{
                    padding: "8px",
                    fontSize: "14px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    width: "200px",
                }}
            />
            <button
                onClick={handleSearch}
                style={{
                    marginLeft: "8px",
                    padding: "8px 12px",
                    background: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                }}
            >
                Search
            </button>
        </div>
    );
}
