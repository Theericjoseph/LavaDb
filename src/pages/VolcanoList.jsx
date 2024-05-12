import React from "react";
import config from "../components/config.json";
import "./css/VolcanoList.css";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { SearchResultsList } from "../components/SearchResultsList";
import { Badge } from "reactstrap";
import { AnimatedGif } from "../components/AnimatedGif";

export default function VolcanoList() {
    const [rowData, setRowData] = useState([]);
    const [input, setInput] = useState("");
    const [dropDownValue, setDropDownvalue] = useState("");
    const [country, setCountry] = useState("");
    const [populatedWithin, setPopulatedWithin] = useState("");
    const navigate = useNavigate();
    const [results, setResults] = useState([]);

    const columns = [
        { headerName: "ID", field: "id", flex: 1, filter: true},
        { headerName: "Name", field: "name", flex: 2, filter: true},
        { headerName: "Region", field: "region", flex: 2, filter: true},
        { headerName: "Sub Region", field: "subregion", flex: 2, filter: true},
    ];

    useEffect(() => {
        if (country !== "") {
            // Effect
            fetch(`${config.host}/volcanoes?country=${country}${populatedWithin}`)
                .then(res => res.json())
                .then(data =>
                    data.map(volcano => {
                        return {
                            id: volcano.id,
                            name: volcano.name,
                            region: volcano.region,
                            subregion: volcano.subregion
                        };
                    })
                )
                .then(volcano => setRowData(volcano))
                .catch(e => {
                    console.error("Error fetching volcano data:", e);
                })
        }

    }, [country, populatedWithin])

    const handleCountrySelect = (selectedCountry) => {
        setInput(selectedCountry)
        setResults([])
    }

    return (
        <div className="conatainer">
            <div className="input-field">
                <div className="search-bar-container">
                    <SearchBar setResults={setResults} input={input} setInput={setInput} />
                </div>
                <div className="populated-container">
                    <label htmlFor="populated_within" hidden>Populated within: </label>
                    <select id="populated_within" name="populated_within" className="select-box"
                        value={dropDownValue}
                        onChange={(e) => setDropDownvalue(e.target.value)}
                    >
                        <option value="">Select a populated within distance</option>
                        <option value="&populatedWithin=5km">5km</option>
                        <option value="&populatedWithin=10km" >10km</option>
                        <option value="&populatedWithin=30km">30km</option>
                        <option value="&populatedWithin=100km">100km</option>

                    </select>

                </div>
                <button type="button" name="search" id="search"
                    onClick={(e) => {
                        setCountry(input);
                        setPopulatedWithin(dropDownValue);
                    }}
                >Search</button>
            </div>
            <div className="search-results-div">
                <SearchResultsList results={results} onCountrySelect={handleCountrySelect} />
            </div>
            {
                country.length === 0 ? <div className="no_result">
                    <div className="img-div">
                        <AnimatedGif src="./img/no-search-result.png" alt="A img of a magnifying glass" />
                    </div>
                    <p>Search a country name to get started</p>
                </div> :
                    <div className="table_container">
                        <p><Badge color="success" className="badge">{rowData.length}</Badge> results for {country}. Click on a country to see additional information.</p>
                        <div id="myGrid" className="ag-theme-alpine"
                            style={{
                                height: "40rem",
                                width: "100%"
                            }}>
                            <AgGridReact
                                columnDefs={columns}
                                paginationAutoPageSize={true}
                                pagination={true}
                                rowData={rowData}
                                rowStyle={{ cursor: "pointer" }}
                                onRowClicked={(row) => navigate(`/volcano?id=${row.data.id}&name=${row.data.name}`)}
                            />
                        </div>
                    </div>
            }
        </div>
    )
}