import React, { createContext, useContext, useState, useEffect } from "react";

const loginContext = createContext();

const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const expirationDate = localStorage.getItem("Expires_In");
        if (expirationDate) {
            const currentTime = new Date().getTime();
            if (currentTime > new Date(expirationDate).getTime()) {
                // Token has expired
                setIsLoggedIn(false);
                localStorage.removeItem("token");
                localStorage.removeItem("Expires_In");
            } else {
                // Token is still valid
                setIsLoggedIn(true);
            }
        }
    }, []);

    return <loginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {children}
    </loginContext.Provider>
}

export const useLogin = () => useContext(loginContext);

export default LoginProvider;