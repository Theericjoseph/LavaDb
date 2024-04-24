import React from "react";
import config from "../components/config.json";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./css/Volcano.css"

// Check authentication add to header
export default function Volcano() {
    const [searchParams] = useSearchParams();
    const [ifLoggedin, setIfLoggedIn] = useState(false);
    const [volcanoData, setVolcanoData] = useState([]);

    useEffect(() => {
        const fetchVolcanoData = () => {
            const id = searchParams.get("id");
            const url = `${config.host}/volcano/${id}`;

            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": `Bearer ${token}`
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch volcano data");
                    }
                    return response.json();
                })
                .then((data) => {
                    setVolcanoData(data);
                })
                .catch((error) => {
                    console.error("Error fetching volcano data:", error);
                });
        };

        fetchVolcanoData();
    }, [searchParams]);

    if (!volcanoData) {
        return (<div>Loading....</div>)
    }

    return (
        <div className="container">

            <div className="volcano_info">
                <h1>{searchParams.get("name")}</h1>
                <p>Country: {volcanoData.country}</p>
                <p>Region: {volcanoData.region}</p>
                <p>Subregion: {volcanoData.subregion}</p>
                <p>Last Eruption: {volcanoData.last_eruption}</p>
                <p>Summit: {volcanoData.summit}</p>
                <p>Elevation: {volcanoData.elevation}</p>
                <p>Latitude: {volcanoData.latitude}</p>
                <p>Longitude: {volcanoData.longitude}</p>
                {
                    !ifLoggedin ? <div></div> :
                        <div className="div">
                            <p>population_5km: {volcanoData.population_5km}</p>
                            <p>population_10km: {volcanoData.population_10km}</p>
                            <p>population_30km: {volcanoData.population_30km}</p>
                            <p>population_100km: {volcanoData.population_100km}</p>
                        </div>
                }
            </div>

            <div className="map">

            </div>
        </div>

    )
}


