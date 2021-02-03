import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ user, setUser }) => {
    
    const logOut = () => {
        // re-set state to have no username/sesion_id
        setUser({});
        // remove anything in sessionStorage
        sessionStorage.clear();
        // remove session_id from our database
        // fetch(`http://localhost:5000/logout/${user.session_id}`);
    }

if (user.session_id) {
    return (
        <div>
            <span>Book Me</span>
            <Link to="/appointments">My Appointments</Link>
            <Link to="/booking">Book Appointment</Link>
            <Link onClick={logOut}>Logout</Link>
        </div>
    )
    } else {
    return (
        <div>
            <nav>
                <span>Book Me</span>
            </nav>
        </div>
    )}
}

export default NavBar;
