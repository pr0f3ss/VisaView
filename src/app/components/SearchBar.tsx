import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState<string>("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    // TODO: Use API, it's only a sample list for now 
    const countryOptions = ["Costa Rica", "Canada", "France", "Germany", "India", "Japan"];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        // Filter suggestions based on the input value
        const filteredSuggestions = countryOptions.filter((country) =>
            country.toLowerCase().includes(value.toLowerCase())
        );

        setSuggestions(filteredSuggestions);
        setShowDropdown(filteredSuggestions.length > 0);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        if (query.trim()) {
            onSearch(query.trim());
            setShowDropdown(false); // Hide dropdown after search
        }
    };

    const handleSelectSuggestion = (suggestion: string) => {
        setQuery(suggestion);
        setShowDropdown(false);  // Hide dropdown when suggestion is selected
        onSearch(suggestion);    // Trigger search with selected suggestion
    };

    // Add a slight delay to allow click events on suggestions to register
    const handleBlur = () => {
        setTimeout(() => setShowDropdown(false), 50);
    };

    // Show dropdown on focus if suggestions are available
    const handleFocus = () => {
        if (suggestions.length > 0) {
            setShowDropdown(true); 
        }
    };

    return (
        <div
            style={{
                position: "absolute",
                top: '5%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 4000,
                background: "white",
                color: "black",
                padding: "8px",
                borderRadius: "32px",
                boxShadow: "8px 8px 15px rgba(0, 0, 0, 0.2)",
            }}
        >
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                onFocus={handleFocus}
                placeholder="Search country..."
                style={{
                    outline: 'none',
                    padding: "5px 8px 5px 8px",
                    fontSize: "14px",
                    color: "grey",
                    borderRadius: "4px",
                    width: "15vw",  // Full width of the container
                }}
            />
            <button
                onClick={handleSearch}
                style={{
                    padding: "4px 12px",
                    background: "white",
                    color: "grey",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                }}
            >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>

            {/* Dropdown for suggestions */}
            {showDropdown && (
                <ul
                    style={{
                        position: "absolute",
                        top: '100%',  // Position the dropdown below the input
                        left: 0,
                        right: 0,
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        zIndex: 1000,
                        maxHeight: "200px",
                        overflowY: "auto",
                    }}
                >
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelectSuggestion(suggestion)}
                            style={{
                                padding: "10px",
                                cursor: "pointer",
                                borderBottom: "1px solid #f0f0f0",
                            }}
                            onMouseDown={(e) => e.preventDefault()} // Prevent losing focus when clicking
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;
