import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import notificationFun from '../../util/Notification/Notification';

const MaterialAllocationProtection = ({ component: Component, ...rest }) => {
    return (
        <Route
                {...rest}
                render={props => {
                        if (localStorage.getItem('campaign')?.split(',').includes('13')) {
                                return <Component {...props} />
                        } else {
                                notificationFun('Sorry! You do not have material allocation access.', 'Please comunicate with admin for this access', 'warning');
                                return <Redirect to="/manager/campaign/list" />
                        }
                }}
        />
    );
}

export default MaterialAllocationProtection;