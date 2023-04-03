import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import DashboardBuilder from '../containers/DashboardManager/DashboardBuilder/DashboardBuilder';
import DashboardCard from '../containers/DashboardManager/DashboardCard/DashboardCard';
import DashboardList from '../containers/DashboardManager/DashboardList/DashboardList';
import  DashboardManagerHome from '../containers/DashboardManager/DashboardManagerHome/DashboardManagerHome';
import UpdateDashboard from '../containers/DashboardManager/UpdateDashboard/UpdateDashboard';
import ViewDashboard from '../containers/DashboardManager/ViewDashboard/ViewDashboard';
import PageNotFound from '../util/PageNotFound/PageNotFound';
import DashboardCreateAccess from '../RouteProtection/CreateAccessprotection/DashboardCreateAccess';
import DashboardViewAccessRoute from '../RouteProtection/ViewAccessprotection/DashboardViewAccessRoute';
import DashboardUserViewAccessRoute from '../RouteProtection/ViewAccessprotection/DashboardUserViewAccessRoute';
import DashboardUpdateAccess from '../RouteProtection/UpdateAccessProtection/DashboardUpdateAccess';

export default[

    <DashboardUserViewAccessRoute exact path="/manager/dashboard-manager/home" component={ DashboardManagerHome } key={1} />,
    <DashboardCreateAccess exact path="/manager/dashboard-manager/builder" component={ DashboardBuilder } key={2} />,
    <DashboardViewAccessRoute exact path="/manager/dashboard-manager/list" component={ DashboardList } key={3} />,
    <Route exact path="/manager/dashboard-manager" render={() => <Redirect to="/manager/dashboard-manager/home" />} key={4} />,
    <DashboardUserViewAccessRoute exact path="/manager/dashboard-manager/dashboard-card/:id" component={ DashboardCard } key={5} />,
    <DashboardViewAccessRoute exact path="/manager/dashboard-manager/view-dashboard/:id" component={ ViewDashboard } key={6} />,
    <DashboardUpdateAccess exact path="/manager/dashboard-manager/update-dashboard/:id" component={ UpdateDashboard } key={6} />,

    <Route path="/manager/dashboard-manager" render={() => <PageNotFound/>} key={10} />

]