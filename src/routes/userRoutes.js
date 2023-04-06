import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserCreate from '../containers/User/UserCreate';
import UserList from '../containers/User/UserList';
import UserUpdate from '../containers/User/UserUpdate';

import PageNotFound from '../util/PageNotFound/PageNotFound';


// eslint-disable-next-line import/no-anonymous-default-export
export default [
    <Route exact path="/manager/user/list" component={UserList} key={1} />,
    <Route exact path="/manager/user/create" component={UserCreate} key={1} />,
    <Route exact path="/manager/user/update/:id" component={UserUpdate} key={1} />,
    <Route path="/manager/user" render={() => <PageNotFound/>} key={18} />
];
