import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import ReportAccessRoute from '../RouteProtection/ViewAccessprotection/ReportAccessRoute';

import PageNotFound from '../util/PageNotFound/PageNotFound';
import QueryBuilder from '../containers/reportManager/QueryBuilder/QueryBuilder';
import QueryReport from '../containers/reportManager/QueryReport/QueryReport';
import ViewQuery from '../containers/reportManager/ViewQuery/ViewQuery';
import QueryBuilderEdit from '../containers/reportManager/QueryBuilderEdit/QueryBuilderEdit';
import SetEmails from '../containers/reportManager/SetEmails/SetEmails';


export default [

    <ReportAccessRoute exact path="/manager/report-manager/query-builder" component={QueryBuilder}  key={11} />,
    <ReportAccessRoute exact path="/manager/report-manager/query-report" component={QueryReport}  key={12} />,
    <ReportAccessRoute exact path="/manager/report-manager/update-query/:id" component={QueryBuilderEdit}  key={14} />,
    <ReportAccessRoute exact path="/manager/report-manager/view-query/:id" component={ViewQuery}  key={13} />,
    <ReportAccessRoute exact path="/manager/report-manager/set-emails/:id" component={SetEmails}  key={15} />,
    <Route exact path="/manager/report-manager" render={() => <Redirect to="/manager/report-manager/custom-report" />} key={7} />,
    <Route path="/manager/report-manager" render={() => <PageNotFound/>} key={8} />
    // <Route exact path="/manager/report-manager" render={() => <Redirect to="/manager/report-manager/target-achievement" />} key={7} />,
    // <Route path="/manager/report-manager" render={() => <h1>400</h1>} key={8} />


];