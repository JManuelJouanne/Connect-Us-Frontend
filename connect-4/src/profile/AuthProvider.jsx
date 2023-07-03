import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axios from 'axios';

export default function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    useEffect(() => {
        localStorage.setItem("token", token);
    }, [token]);

    function logout() {
        setToken(null);
    }

    const getUser = async () => {
        return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    };

    return (
        <AuthContext.Provider value={{ token, setToken, logout, getUser}}>
            {children}
        </AuthContext.Provider>
    )
}