import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function BookingView({user}) {
    const [providerList, setProviderList] = useState([]);
    const [value, setValue] = useState(new Date());
    const [prov, setProv] = useState("");

    function provChangeHandler(e) {
        setProv(e.target.value);
    }

    function dateChangeHandler(value) {
        setValue(value);
    }

    useEffect( () => { 
        const getProviders = async () => {
            const response = await fetch("http://localhost:5000/getProviders");
            const data = await response.json();
            console.log(data);
            setProviderList(data.providers);
        }
        getProviders();
    }, [])

    const bookAppointment = async () => {
        
        const bookingData = JSON.stringify({username: user.username,
                                            provider: prov,
                                            apptDate: value
                                            });
        const configs = {
            method: ["POST"],
            headers: {"Content-Type": "application/json"},
            body: bookingData
        }
        const response = await fetch("http://localhost:5000/createAppt", configs);
        const data = await response.json();
        console.log(data);
    }

    return (
        <div>
            <h3>Welcome {user.username}!</h3>
            <h2>Book an appointment!</h2>
            <div>
            <Calendar
                onClickDay={dateChangeHandler}
                value={value}/>    
            {console.log(value)}
            </div>
            <label for="provider_list">Choose a service provider: </label>
            <select name="provider_list" id="provider_list" onChange={provChangeHandler}>
                <option value={providerList[0]}>{providerList[0]}</option>
                <option value={providerList[1]}>{providerList[1]}</option>
                <option value={providerList[2]}>{providerList[2]}</option>
            </select>
            <br/>
            <button onClick={bookAppointment}>Book Appointment!</button>
        </div>
    )
}