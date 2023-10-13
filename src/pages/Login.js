import React, { useEffect, useState } from "react";

const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = user;
        const res = await fetch("http://localhost:3403/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.status === 400 || !data) {
            window.alert("Invalid Credentials");
        } else {
            window.alert("Login Successfull");
        }
    };
    return (
        <>
            <div>
                <form method="POST">
                    <div>
                        <label htmlFor="username">username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            autoComplete="off"
                            value={user.email}
                            onChange={handleInput}
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            autoComplete="off"
                            value={user.password}
                            onChange={handleInput}
                        />
                        <button type="submit" name="signin" id="signin" onClick={handleSubmit}>
                            Login
                        </button>

                        <a href="/register">Register</a>

                        <a href="/forgot">Forgot Password</a>

                        <a href="/reset">Reset Password</a>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
