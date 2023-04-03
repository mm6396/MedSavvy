import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import notificationFun from '../../util/Notification/Notification';

const FFUpdateAccess = ({ component: Component, ...rest }) => {
     return (
        <Route
                {...rest}
                render={props => {
                        if (localStorage.getItem('ff')?.split(',').includes('2')) {
                                return <Component {...props} />
                        } else {
                                notificationFun('Sorry! You do not have Update FF access.', 'Please comunicate with admin for this access', 'warning');
                                return <Redirect to="/manager/field-force/dashboard" />
                        }
                }}
        />
        );
}

export default FFUpdateAccess;