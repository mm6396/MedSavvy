import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../containers/Login/Login';
import EmailSendView from '../containers/Login/ForgotPassword/EmailSendView';
import ResetPasswordView from '../containers/Login/ForgotPassword/ResetPasswordView';
import LoggedInRoute from '../RouteProtection/AuthProtection/LoggedInRoute';
import LoginCheckRoute from '../RouteProtection/AuthProtection/LoginCheckRoute';
import PageNotFound from '../util/PageNotFound/PageNotFound';
import ManagerLayout from './NestedLayouts/ManagerLayout';


const Layouts = () => {
    return (
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route exact path="/forgot-password" component = {EmailSendView} />
            <Route exact path="/reset-password/:token" component = {ResetPasswordView} />
            <LoginCheckRoute exact path="/login" component={Login} />
            <LoggedInRoute path="/manager" component={ManagerLayout} />
            <Route render={() => <PageNotFound/>} />
        </Switch>
    );
}

export default Layouts;