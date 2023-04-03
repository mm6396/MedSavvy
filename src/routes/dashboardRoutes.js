import React from 'react';
import { Route } from 'react-router-dom';
import CampaignDashboard from '../containers/Dashboard/CampaignDashboard/CampaignDashboard';
import FFDashboard from '../containers/Dashboard/FFDashboard/FFDashboard';
import RoleDashboard from '../containers/Dashboard/RoleDashboard/RoleDashboard';
import RootDashboard from '../containers/Dashboard/RootDashboard/RootDashboard';
import UserDashboard from '../containers/Dashboard/UserDashboard/UserDashboard';
import PageNotFound from '../util/PageNotFound/PageNotFound';

export default [
    <Route exact path="/manager/dashboard" component={RootDashboard} key={1} />,
    // <Route exact path="/manager/dashboard/user" component={UserDashboard} key={2} />,
    // <Route exact path="/manager/dashboard/role" component={RoleDashboard} key={3} />,
    // <Route exact path="/manager/dashboard/field-force" component={FFDashboard} key={4} />,
    // <Route exact path="/manager/dashboard/campaign" component={CampaignDashboard} key={5} />,
    <Route path="/manager/dashboard" render={() => <PageNotFound/>} key={6} />
];