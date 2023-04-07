import React from 'react';
import { Redirect, Route } from 'react-router-dom';
// import LocationArea from '../containers/RoleManager/LocationArea/LocationArea';
// import RoleAssign from '../containers/RoleManager/RoleAssign/RoleAssign';
import RoleCreate from '../containers/RoleManager/RoleCreate/RoleCreate';
import RoleEdit from '../containers/RoleManager/RoleEdit/RoleEdit';
import RoleList from '../containers/RoleManager/RoleList/RoleList';
import RoleCreateAccess from '../RouteProtection/CreateAccessprotection/RoleCreateAccess';
import RoleUpdateAccess from '../RouteProtection/UpdateAccessProtection/RoleUpdateAccess'
import PageNotFound from '../util/PageNotFound/PageNotFound';

export default [
    <Route exact path="/manager/role/list" component={RoleList} key={1} />,
    <Route exact path="/manager/role/create" component={RoleCreate} key={2} />,
    <Route exact path="/manager/role/edit/:id" component={RoleEdit} key={3} />,
    // <Route exact path="/manager/role" render={() => <Redirect to="/manager/role/list" />} key={5} />,
    <Route path="/manager/role" render={() => <PageNotFound/>} key={6} />
];