import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import notificationFun from '../../util/Notification/Notification';

const CampaignAdminSettingsAccess = ({ component: Component, ...rest }) => {
     return (
        <Route
                {...rest}
                render={props => {
                        if (localStorage.getItem('campaign')?.split(',').includes('20')) {
                                return <Component {...props} />
                        } else {
                                notificationFun('Sorry! You do not have access to campaign admin settings.', 'Please comunicate with admin for this access', 'warning');
                                return <Redirect to="/manager/campaign/list" />
                        }
                }}
        />
        );
}

export default CampaignAdminSettingsAccess ;