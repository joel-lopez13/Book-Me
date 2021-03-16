import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ user, setUser }) => {
    
    const logOut = () => {
        setUser({});
        sessionStorage.clear();
    }

if (user.session_id) {
    if (user.userType === "consumer") {
        return (
            <div className="navBar">
                <span className="logo">Book Me</span>
                <Link className="Links" to="/cAppointments">My Appointments</Link>
                <Link className="Links" to="/booking">Book Appointment</Link>
                <Link className="Links" onClick={logOut}>Logout</Link>
            </div>
        )}
        else if (user.userType === "provider") {
            return (
                <div className="navBar">
                    <span className="logo">Book Me</span>
                    <Link className="Links" onClick={logOut}>Logout</Link>
                </div>
            )
        }
    } else {
    return (
        <div>
            <nav>
                <h1>Book Me</h1>
            </nav>
        </div>
    )}
}

export default NavBar;
