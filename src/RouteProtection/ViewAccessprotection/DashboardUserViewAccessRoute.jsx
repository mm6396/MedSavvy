import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import notificationFun from '../../util/Notification/Notification';

const DashboardViewAccessRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (localStorage.getItem('dashboard')?.split(',').includes('5')) {
                    return <Component {...props} />
                } else {
                    notificationFun('Sorry! You do not have an access to Dashboard List.', 'Please comunicate with admin for this access', 'warning');
                    return <Redirect to="/manager" />
                }
            }}
        />
    );
}

export default DashboardViewAccessRoute;