import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import notificationFun from '../../util/Notification/Notification';

const FFAssignAccess = ({ component: Component, ...rest }) => {
     return (
        <Route
                {...rest}
                render={props => {
                        if (localStorage.getItem('ff')?.split(',').includes('6')) {
                                return <Component {...props} />
                        } else {
                                notificationFun('Sorry! You do not have access to view FF Assign List.', 'Please communicate with admin for this access', 'warning');
                                return <Redirect to="/manager/field-force/dashboard" />
                        }
                }}
        />
        );
}

export default FFAssignAccess;