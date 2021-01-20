import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

export default function LoggedOutView({ setUser }) {
    const [showLogin, setShowLogin] = useState(true);

    const changeView = () => setShowLogin(!showLogin)

    return (
        <div>
        {showLogin ? 
            <LoginForm setUser={setUser} toggle={changeView} /> : 
            <SignUpForm setUser={setUser} toggle={changeView} />
        }
        </div>
    )
}
