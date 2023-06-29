import React, { useState } from "react";
import "./login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit} className="email-form">
                <div id="container1">
                    <div id="atributes">
                        <label>Email:</label>
                        <label>Password:</label>
                    </div>
                    <div id="response">
                        <label>
                            <input
                                type="text"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                </div>
                <input type="submit" value="Entrar" id="entrar"/>
            </form>
        </div>
    )
}

export default Login;
