import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function ConsumerView({user}) {
    const [value, setValue] = useState(new Date());

    function dateChangeHandler(value) {
        setValue(value);
    }

    return (
        <div>
            <h3>Welcome {user.username}!</h3>
            <div>
                <Calendar
                onClickDay={dateChangeHandler}
                value={value}/>    
            {console.log(value)}
            </div>
        </div>
    )
}