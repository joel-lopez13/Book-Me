import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
import LoggedOutView from './LoggedOutView';

export default function Router({ user, setUser }) {

    if (user.session_id) {
        return (
        <div>
            <h1>{user.username} logged in</h1>
        </div>
        )
    } else {
        return (
        <div>
            <LoggedOutView setUser={setUser} />
        </div>
        )
    }
}
