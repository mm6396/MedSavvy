import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import notificationFun from '../../util/Notification/Notification';

const NotificationAccessRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (localStorage.getItem('notification')?.split(',').includes('5')) {
                    return <Component {...props} />
                } else {
                    notificationFun('Sorry! You do not have an access to Notification Manager.', 'Please comunicate with admin for this access', 'warning');
                    return <Redirect to='/manager' />
                }
            }}
        />
    )
}

export default NotificationAccessRoute

