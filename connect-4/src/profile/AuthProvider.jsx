import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(0);

    useEffect(() => {
        localStorage.setItem("token", token);
    }, [token]);

    function logout() {
        setToken(null);
        setUser(0);
    }

    return (
        <AuthContext.Provider value={{ token, setToken, logout, user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}