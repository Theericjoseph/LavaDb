import React from "react";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results, onCountrySelect }) => {
    return <div className="results-list">
        {
            results.map((result) => {
                return <SearchResult result={result} key={result} onClick={onCountrySelect} />
            })
        }
    </div>
}