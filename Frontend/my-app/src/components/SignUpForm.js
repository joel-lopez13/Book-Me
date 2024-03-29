import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUp({ toggle, setUser }) {
    const [inputUser, setInputUser] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userType, setUserType] = useState("consumer");

    function usernameChangeHandler(e) {
    setInputUser(e.target.value);
    }
    function emailChangeHandler(e) {
    setInputEmail(e.target.value)
    }
    function passwordChangeHandler(e) {
    setInputPassword(e.target.value);
    }
    function confirmPasswordChangeHandler(e) {
    setConfirmPassword(e.target.value);
    }
    function userTypeChangeHandler(e) {
        setUserType(e.target.value);
    }

    const addUser = async () => {
    if (inputPassword !== confirmPassword) {
      // set error state
    return
    }
    const userData = JSON.stringify({username: inputUser, 
                                    email: inputEmail,
                                    password: inputPassword,
                                    userType: userType
                                    });
    const configs = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: userData
    }
    const response = await fetch("http://localhost:5000/create", configs);
    const data = await response.json();
    console.log(data);
    setUser(data);
    sessionStorage.setItem("user", JSON.stringify(data));
    }

    return (
    <div>
        <h3>Sign Up</h3>
        <input placeholder="Username" onChange={usernameChangeHandler}/><br/>
        <input placeholder="Email" onChange={emailChangeHandler}/><br/>
        <input placeholder="Password" onChange={passwordChangeHandler} type="password"/><br/>
        <input placeholder="Confirm Password" onChange={confirmPasswordChangeHandler} type="password"/><br/>
        <label for="usertype">Are you a consumer or provider? </label>
        <select className="dropdown" name="usertype" id="usertype" onChange={userTypeChangeHandler}>
            <option className="dropdownitem" value="consumer">Consumer</option>
            <option className="dropdownitem" value="provider">Provider</option>
        </select>
        <br/>
        <button className="buttons" onClick={addUser}>Sign Up</button>
        <p>Existing user? Log in <Link onClick={toggle}>here</Link>.</p>
    </div>
    )
}

export default SignUp;