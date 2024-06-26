import React from "react";
import config from "../components/config.json";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./css/Volcano.css";
import { Map, Marker } from "pigeon-maps";
import { maptiler } from 'pigeon-maps/providers';
import { Button } from "reactstrap";
import { useLogin } from "../context/LoginProvider";
import {Chart as ChartJS, defaults} from "chart.js/auto";
import {Bar} from "react-chartjs-2";


// Check authentication add to header
export default function Volcano() {
    const [searchParams] = useSearchParams();
    const { isLoggedIn } = useLogin();
    const [volcanoData, setVolcanoData] = useState([]);
    const maptilerProvider = maptiler(config.map_api, 'basic');
    const navigate = useNavigate();
    // Map
    const [center, setCenter] = useState([0, 0])
    const [zoom, setZoom] = useState(11)
    // Marker
    const [hue, setHue] = useState(0)
    const color = `hsl(${hue % 360}deg 39% 70%)`



    useEffect(() => {
        const fetchVolcanoData = () => {
            const id = searchParams.get("id");
            const url = `${config.host}/volcano/${id}`;
            const token = localStorage.getItem("token");
            let header;
            if (isLoggedIn) {
                header = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
            else {
                header = {
                    "Content-Type": "application/json"
                }
            }

            fetch(url, {
                method: "GET",
                headers: header
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch volcano data");
                    }
                    return response.json();
                })
                .then((data) => {
                    setVolcanoData(data);
                    setCenter([+data.latitude, +data.longitude])
                })
                .catch((error) => {
                    console.error("Error fetching volcano data:", error);
                });
        };

        fetchVolcanoData();
    }, [searchParams, isLoggedIn]);

    if (!volcanoData) {
        return (<div>Loading....</div>)
    }


    return (
        <div className = "container">
            <div className="volcano">
                <div className="content-container">

                    <div className="page-title-container">
                        <h2>Volcano Name : {searchParams.get("name")}</h2>
                    </div>
                    <div className="info-container">

                        <div className="volcano_info ">

                            <p>Country: {volcanoData.country}</p>
                            <p>Region: {volcanoData.region}</p>
                            <p>Subregion: {volcanoData.subregion}</p>
                            <p>Last Eruption: {volcanoData.last_eruption}</p>
                            <p>Summit: {volcanoData.summit} m</p>
                            <p>Elevation: {volcanoData.elevation} ft</p>
                            <p>Latitude: {volcanoData.latitude} &deg;</p>
                            <p>Longitude: {volcanoData.longitude} &deg;</p>
                            {
                                isLoggedIn ? (
                                    <div className="div">
                                        <p>Population within 5km: {volcanoData.population_5km} </p>
                                        <p>Population within 10km: {volcanoData.population_10km} </p>
                                        <p>Population within 30km: {volcanoData.population_30km} </p>
                                        <p>Population within 100km: {volcanoData.population_100km} </p>
                                    </div>
                                )
                                    : <div>To get access to more information <a href="/login">Login now</a></div>
                            }
                            <Button color="secondary"
                                onClick={() => navigate("/volcano_list")}
                            >Back
                            </Button>
                        </div>

                        <div className="map overflow-hidden rounded">
                            <Map
                                height="500px"
                                width="700px"
                                provider={maptilerProvider}
                                dprs={[1, 2]} // this provider supports HiDPI tiles
                                center={center}
                                zoom={zoom}
                                onBoundsChanged={({ center, zoom }) => {
                                    setCenter(center)
                                    setZoom(zoom)
                                }}
                            >
                                <Marker
                                    width={50}
                                    anchor={[+volcanoData.latitude, +volcanoData.longitude]}
                                    color={color}
                                    onClick={() => setHue(hue + 20)}
                                />
                            </Map>
                            
                        </div>
                    </div>
                    
                    {
                        isLoggedIn ? (
                            <div className="chart-container">
                                <div className="Chart">
                                    <Bar
                                        height={100}
                                        data={{
                                            labels: ["Population within 5km", "Population within 10km", "Population within 30km"],
                                            datasets: [
                                                {
                                                    label: "Population",
                                                    data: [volcanoData.population_5km, volcanoData.population_10km, volcanoData.population_30km],
                                                    borderRadius: 10,
                                                }
                                            ],

                                        }}
                                        options={{
                                            plugins: {
                                                title: {
                                                    display: true,
                                                    text: "Population density within the radius of volcano",
                                                    fontSize: 30,
                                                },
                                            }
                                        }}
                                    />
                                </div>

                            </div>
                        ) : <div></div>
                    }
                </div>

            </div>
        </div>

    )
}


