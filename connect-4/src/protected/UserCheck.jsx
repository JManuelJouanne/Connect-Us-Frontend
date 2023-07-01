import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./../profile/AuthContext";
import axios from "axios";

export default function UserCheck() {
    const { token } = useContext(AuthContext);
    const [message, setMessage] = useState("");

    const config = {
        'method': 'get',
        'url': `${import.meta.env.VITE_BACKEND_URL}/users`,
        'headers': {
            'Authorization': `Bearer ${token}`
        }
    }

    useEffect(() => {
        axios(config).then((response) => {
            console.log(response.data);
            const usernames = response.data.map((user) => user.username);
            setMessage(usernames.join(" "));
        }).catch((error) => {
            console.log(error);
            setMessage(error.message);
        });
    }, []);

    return (
        <>
            <h1>Hola</h1>
            <p>{message}</p>
        </>
    )
}
