import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ toggle, setUser }) {
    const [inputUser, setInputUser] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    function usernameChangeHandler(e) {
    setInputUser(e.target.value);
    }

    const sendLogin = async () => {
    const userData = JSON.stringify({username: inputUser, 
                                    password: inputPassword});
    const configs = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: userData
    }
    const response = await fetch("http://localhost:5000/login", configs);
    const data = await response.json();
    console.log(data);
    setUser(data);
    sessionStorage.setItem("user", JSON.stringify(data));
    }

    return (
    <div>
        <h3>Log In</h3>
        <input placeholder="Username" onChange={usernameChangeHandler} type="text"/><br/>
        <input placeholder="Password" onChange={e => setInputPassword(e.target.value)} type="password"/><br/>
        <button className="buttons" onClick={sendLogin}>Log In</button>
        <p>New user? Sign up <Link onClick={toggle}>here</Link>.</p>
    </div>
    )
}

export default Login;
