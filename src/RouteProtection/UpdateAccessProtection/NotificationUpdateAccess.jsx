import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import notificationFun from '../../util/Notification/Notification';

const NotificationUpdateAccess = ({ component: Component, ...rest }) => {
     return (
        <Route
                {...rest}
                render={props => {
                        if (localStorage.getItem('notification')?.split(',').includes('2')) {
                                return <Component {...props} />
                        } else {
                                notificationFun('Sorry! You do not have Update Notification access.', 'Please comunicate with admin for this access', 'warning');
                                return <Redirect to="/manager/notification/list"/>
                        }
                }}
        />
        );
}

export default NotificationUpdateAccess;