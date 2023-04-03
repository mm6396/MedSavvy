import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import notificationFun from '../../util/Notification/Notification';

const DashboardCreateAccess = ({ component: Component, ...rest }) => {
     return (
        <Route
                {...rest}
                render={props => {
                        if (localStorage.getItem('sysadmin')?.split(',').includes('1')) {
                                return <Component {...props} />
                        } else {
                                notificationFun('Sorry! You do not have Create Dashboard access.', 'Please comunicate with admin for this access', 'warning');
                                return <Redirect to="/manager" />
                        }
                }}
        />
        );
}

export default DashboardCreateAccess;