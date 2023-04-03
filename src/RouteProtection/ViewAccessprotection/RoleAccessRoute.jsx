import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import notificationFun from '../../util/Notification/Notification';

const RoleAccessRoute = ({ component: Component, ...rest }) => {
    return (
            <Route
                    {...rest}
                    render={props => {
                            if (localStorage.getItem('role')?.split(',').includes('5') && localStorage.getItem('sysadmin')?.split(',').includes('1')) {
                                return <Component {...props} />
                            } else {
                                notificationFun('Sorry! You do not have an access to Role Manager.', 'Please comunicate with admin for this access', 'warning');
                                return <Redirect to="/manager" />
                            }
                    }}
            />
        );
}

export default RoleAccessRoute;