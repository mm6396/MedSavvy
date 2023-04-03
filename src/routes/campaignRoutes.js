import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import CampaignCreate from '../containers/Campaign/CampaignCreate/CampaignCreate';
// import CampaignAssign from '../containers/Campaign/CampaignAssign/CampaignAssign';
import CampaignList from '../containers/Campaign/CampaignList/CampaignList';
import PageNotFound from '../util/PageNotFound/PageNotFound';


// eslint-disable-next-line import/no-anonymous-default-export
export default [
    <Route exact path="/manager/campaign/list" component={CampaignList} key={1} />,
    <Route exact path="/manager/campaign/create" component={CampaignCreate} key={1} />,
    <Route path="/manager/campaign" render={() => <PageNotFound/>} key={18} />
];
