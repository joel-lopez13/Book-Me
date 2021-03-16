import React, { useState, useEffect } from 'react';

export default function CAppointmentsView({user}) {
    const [apptDates, setApptDates] = useState([]);
    const [provs, setProvs] = useState([]);
    const [apptTimes, setApptTimes] = useState([]);
    
    useEffect( () => {
        const getTransactions = async () => {
            
            const userData = JSON.stringify({username: user.username,
                                            userType: user.userType});
            const configs = {
                method: ["POST"],
                headers: {"Content-Type": "application/json"},
                body: userData
            }
            const response = await fetch("http://localhost:5000/getTransactions", configs);
            const data = await response.json();
            console.log(data);
            setApptDates(data.dates);
            setProvs(data.providers);
            setApptTimes(data.apptTimes);
        }
        getTransactions();
    }, [])


    // return (
    //     <div>
    //         <h3>Welcome {user.username}!</h3>
    //             <div text-align="left">
    //                 <h4 align="left">Appointment Date</h4>
    //                 {apptDates.map(a => <p align="left">{a}</p>)}
    //             </div>
    //             <div text-align="right">
    //                 <h4 align="right">Appointment Provider</h4>
    //                 {provs.map(p => <p align="right">{p}</p>)}
    //             </div>
    //             <div text-align="center">
    //                 <h4 align="center">Appointment Time</h4>
    //                 {apptTimes.map(t => <p align="center">{t}</p>)}
    //             </div>
    //     </div>
    // )

    return (
        <div>
            <h3>Welcome {user.username}!</h3>
            <div class="card">
                <div class="container">
                    <h4>Appointment Date</h4>
                    {apptDates.map(a => <p>{a}</p>)}
                </div>
            </div>
            <div class="card">
                <div class="container">
                    <h4>Appointment Time</h4>
                    {apptTimes.map(t => <p>{t}:00</p>)}
                </div>
            </div>
            <div class="card">
                <div class="container">
                    <h4>Appointment Provider</h4>
                    {provs.map(p => <p>{p}</p>)}
                </div>
            </div>
        </div>
    )
}