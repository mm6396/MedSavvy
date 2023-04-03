import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import notificationFun from '../../util/Notification/Notification';

const AdminReportAccessRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (localStorage.getItem('report')?.split(',').includes('5') && localStorage.getItem('report')?.split(',').includes('16')) {
                    return <Component {...props} />
                } else {
                    notificationFun('Sorry! You do not have an access to Raw Report Manager.', 'Please comunicate with admin for this access', 'warning');
                    return <Redirect to="/manager" />
                }
            }}
        />
    );
}

export default AdminReportAccessRoute;