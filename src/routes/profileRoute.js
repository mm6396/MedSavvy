import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import ProfileEdit from '../containers/Profile/ProfileEdit/ProfileEdit';
import ProfilePage from '../containers/Profile/ProfilePage/ProfilePage';
import PageNotFound from '../util/PageNotFound/PageNotFound';

export default [
    <Route exact path="/manager/profile/view/:id" component={ProfilePage} key={1} />,
    <Route exact path="/manager/profile/edit/:id" component={ProfileEdit} key={2} />,
    <Route exact path="/manager/profile" render={() => <Redirect to="/manager/profile/view" />} key={3} />,
    <Route path="/manager/profile" render={() => <PageNotFound/>} key={4} />
];