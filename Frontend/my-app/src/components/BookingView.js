import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function BookingView({user}) {
    const [providerList, setProviderList] = useState([]);
    const [value, setValue] = useState(new Date());
    const [prov, setProv] = useState("");
    const [apptTime, setApptTime] = useState("");
    const [apptTimes, setApptTimes] = useState([]);

    const hours = ["9", "10", "11", "12", "1", "2", "3", "4"];

    function provChangeHandler(e) {
        setProv(e.target.value);
        
        const getTimes = async () => {

            const timeData = JSON.stringify({username: e.target.value});
            console.log(e.target.value);
            const configs = {
                method: ["POST"],
                headers: {"Content-Type": "application/json"},
                body: timeData
            }
            const response = await fetch("http://localhost:5000/getTimes", configs);
            const data = await response.json();
            setApptTimes(data.apptTimes);
            console.log(data.apptTimes);
        }
        getTimes();
        

    }

    function apptTimeHandler(e) {
        setApptTime(e.target.value);
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
            console.log(providerList);
        }
        getProviders();
    }, [])

    const bookAppointment = async () => {
        
        const bookingData = JSON.stringify({username: user.username,
                                            provider: prov,
                                            apptDate: value.toDateString(),
                                            apptTime: apptTime
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

    function tileDisabled({date, view, value}) {
        // console.log(date)
        // console.log(view)
        if (view === "month") {
            return date.getDay() === 0 || date.getDay() === 6
        }
    }

    return (
        <div>
            <h3>Welcome {user.username}!</h3>
            <h2>Book an appointment!</h2>
            <div>
            <Calendar
                onClickDay={dateChangeHandler}
                value={value}
                tileDisabled={tileDisabled}/>    
            {console.log(value.toDateString())}
            </div>
            <label for="provider_list">Choose a service provider: </label>
            <select className="dropdown" name="provider_list" id="provider_list" onChange={provChangeHandler}>
                {providerList.map(p => <option className="dropdownitem" value={p}>{p}</option>)}
            </select>
            <br/>
            <label for="appt_time">Choose a time: </label>
            <select className="dropdown" name="appt_time" id="appt_time" onChange={apptTimeHandler}>
                {hours.map((hour) => {
                    console.log(!apptTimes.includes(hour))
                    if (!apptTimes.includes(hour)) {
                        return <option className="dropdownitem" value={hour}>{hour}:00</option>
                    }
                })}
                {/* <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option> */}
            </select>
            <br/>
            <button className="buttons" onClick={bookAppointment}>Book Appointment!</button>
        </div>
    )
}