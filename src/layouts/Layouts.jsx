import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../containers/Login/Login';
import LoggedInRoute from '../RouteProtection/AuthProtection/LoggedInRoute';
import LoginCheckRoute from '../RouteProtection/AuthProtection/LoginCheckRoute';
import PageNotFound from '../util/PageNotFound/PageNotFound';
import ManagerLayout from './NestedLayouts/ManagerLayout';


const Layouts = () => {
    return (
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <LoginCheckRoute exact path="/login" component={Login} />
            <LoggedInRoute path="/manager" component={ManagerLayout} />
            <Route render={() => <PageNotFound/>} />
        </Switch>
    );
}

export default Layouts;