import React from "react";
import { AnimatedGif } from "../components/AnimatedGif";
import "./css/Home.css";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";


export default function Home() {
    const navigate = useNavigate();
    return(
        <div className="home-content">
            <div className="translucent-box">
                <div className="solid-box">
                    <h1>Mapping Earths Volcanoes</h1>
                    <p>Explore the world's volcanoes and learn about their history and impact.</p>
                    <div className="gif-div">
                        <AnimatedGif src="./img/giphy.gif" alt="A gif of a volcano" />
                    </div>

                    <div className="button-div">
                        <Button
                            color="secondary"
                            size="lg"
                            outline
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </Button>
                        <Button
                            color="secondary"
                            size="lg"
                            outline
                            onClick={() => navigate("/volcano_list")}
                        >
                            Volcano
                        </Button>
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}