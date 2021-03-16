import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import LoggedOutView from './LoggedOutView';
import ConsumerView from './ConsumerView';
import ProviderView from './ProviderView';
import BookingView from './BookingView';
import CAppointmentsView from './CAppointmentsView';

export default function Router({ user, setUser }) {

    if (user.session_id) {
        if (user.userType === 'consumer') {
            return (
                <div>
                    <Switch>
                        {/* <Route path="/consumer">
                            <ConsumerView user={user} /> 
                        </Route> */}
                        <Route path="/cAppointments">
                            <CAppointmentsView user={user} />
                        </Route>
                        <Route path="/booking">
                            <BookingView user={user} />
                        </Route>
                        <Redirect from="/" to="/cAppointments" />
                    </Switch>
                </div>
            )
        }else if (user.userType === 'provider') {
            return (
                <div>
                    <Switch>
                        <Route path="/provider">
                            <ProviderView user={user} /> 
                        </Route>
                        <Redirect from="/" to="/provider" />
                    </Switch>
                </div>
                )
            }
    }
    return (
        <div>
            <LoggedOutView setUser={setUser} />
        </div>
    )
}
