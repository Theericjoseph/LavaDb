import React, { useState, useEffect } from "react";
import config from "../components/config.json";
import { FaSearch } from "react-icons/fa";

export const SearchBar = ({ setResults, input, setInput }) => {
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = () => {
        fetch(`${config.host}/countries`)
            .then((res) => res.json())
            .then((data) => {
                setCountries(data);
            })
            .catch((error) => console.error("Error fetching countries:", error));
    };

    const handleChange = (e) => {
        setInput(e.target.value);
        filterCountries(e.target.value);
    };

    const filterCountries = (value) => {
        if (value.trim() === "") {
            setResults([]);
            return;
        }

        const filtered = countries.filter((country) =>
            country.toLowerCase().includes(value.toLowerCase())
        );
        setResults(filtered);
    };
    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input placeholder="Start typing a countries name"
                value={input}
                onChange={handleChange} />
        </div>
    )
}