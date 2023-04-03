import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import notificationFun from '../../util/Notification/Notification';

const UserAssignAccess = ({ component: Component, ...rest }) => {
     return (
        <Route
                {...rest}
                render={props => {
                        if (localStorage.getItem('user')?.split(',').includes('6')) {
                                return <Component {...props} />
                        } else {
                                notificationFun('Sorry! You do not have Assign User access.', 'Please comunicate with admin for this access', 'warning');
                                return <Redirect to="/manager/user/list" />
                        }
                }}
        />
        );
}

export default UserAssignAccess;