import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './css/Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import config from "../components/config.json";
import { useLogin } from "../context/LoginProvider";



export default function Login() {
    const { setIsLoggedIn } = useLogin();
    const [action, setAction] = useState("Login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();


    const login = () => {
        const url = `${config.host}/user/login`;
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password }),
        })
            .then((res) =>
                res.json().then((res) => {
                    if (res.error) {
                        setMessage(res.message);
                        return;
                    }

                    let expiration_date = new Date();
                    expiration_date.setSeconds(expiration_date.getSeconds() + res.expires_in);
                    localStorage.setItem("Expires_In", expiration_date);
                    localStorage.setItem("token", res.token);
                    setIsLoggedIn(true);
                    setMessage(res.message);
                    navigate(-1);
                })
            )
            .catch((error) => console.log(error));
    };

    const register = () => {
        const url = `${config.host}/user/register`;
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password }),
        })
            .then((res) =>
                res.json().then((res) => {
                    setMessage(res.message);
                    console.log(res);
                })
            )
            .catch((error) => console.log(error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (action === "Sign Up") {
            register();
        } else {
            login();
        }
    };

    return (
        <div className="container ">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    {message && <div className="message">{message}</div>}
                    <h1>{action}</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                        <FaLock className="icon" />
                    </div>
                    <div className="submit-container">
                        <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => setAction("Sign Up")}>Sign Up</div>
                        <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction("Login")}>Login</div>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
