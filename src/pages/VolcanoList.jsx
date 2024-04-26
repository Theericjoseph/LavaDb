import React from "react";
import config from "../components/config.json";
import "./css/VolcanoList.css";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useNavigate } from "react-router-dom";

export default function VolcanoList() {
    const [rowData, setRowData] = useState([]);
    const [value, setValue] = useState("");
    const [dropDownValue, setDropDownvalue] = useState("");
    const [country, setCountry] = useState("");
    const [populatedWithin, setPopulatedWithin] = useState("");
    const navigate = useNavigate();

    const columns = [
        { headerName: "ID", field: "id", flex: 1 },
        { headerName: "Name", field: "name", flex: 2 },
        { headerName: "Region", field: "region", flex: 2 },
        { headerName: "Sub Region", field: "subregion", flex: 2 },
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

    return (
        <div className="conatainer">
            <div className="input-fiels">
                <label htmlFor="country">Country</label>
                <input
                    type="text"
                    name="country"
                    id="country"
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                />
                <label htmlFor="populated_within">Populated within: </label>
                <select id="populated_within" name="populated_within"
                    value={dropDownValue}
                    onChange={(e) => setDropDownvalue(e.target.value)}
                >
                    <option value="">--</option>
                    <option value="&populatedWithin=5km">5km</option>
                    <option value="&populatedWithin=10km" >10km</option>
                    <option value="&populatedWithin=30km">30km</option>
                    <option value="&populatedWithin=100km">100km</option>
                </select>
                <button type="button" name="search" id="search"
                    onClick={(e) => {
                        setCountry(value);
                        setPopulatedWithin(dropDownValue);
                    }}
                >Search</button>
            </div>
            {
                country.length === 0 ? <div></div> :
                    <div className="table_container">
                        <div id="myGrid" className="ag-theme-alpine-dark"
                            style={{
                                height: "650px",
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