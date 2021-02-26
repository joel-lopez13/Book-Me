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
            <div>
                <span>Book Me</span>
                <Link to="/cAppointments">My Appointments</Link>
                <Link to="/booking">Book Appointment</Link>
                <Link onClick={logOut}>Logout</Link>
            </div>
        )}
        else if (user.userType === "provider") {
            return (
                <div>
                    <span>Book Me</span>
                    <Link to="/pAppointments">My Appointments</Link>
                    <Link to="/schedule"> My Schedule</Link>
                    <Link onClick={logOut}>Logout</Link>
                </div>
            )
        }
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
