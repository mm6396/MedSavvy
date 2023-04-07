import React, {useEffect, useState} from 'react';
import { Layout, Affix } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import Nav from '../../components/common/Nav/Nav';
import DashboardLayout from './DashboardLayout/DashboardLayout';
import CampaignLayout from './CampaignLayout/CampaignLayout';
import SiderNav from '../../components/common/SiderNav/SiderNav';

import PageNotFound from '../../util/PageNotFound/PageNotFound';
import UserManagerLayout from './UserManagerLayout';
import RoleManagerLayout from './RoleManagerLayout/RoleManagerLayout';

const ManagerLayout = () => {

    const [phone, setPhone]= useState(localStorage.getItem('device'))


    const appStyle={
        display: 'none'
    }

    return (
        // style={{ minHeight: '100vh' }}
        <Layout >
            {/* <Affix offsetTop={0}> */}
            <div style={phone === 'mobile' ? appStyle : null}>
            <div style={{ position: 'fixed', top: '0', left: '0', right: '0', zIndex: '11' }}>
                <Nav />
            </div>    
            </div>
            {/* </Affix> */}
            <Layout>
                {/* <Affix className="sidernav-affix"  offsetTop={90}> */}
                    <SiderNav />
                {/* </Affix> */}
                <Layout>

                    <Switch>
                        {/* <Route path="/manager/profile" component={ProfileLayout} />
                        <UserAccessRoute path="/manager/user" component={UserManagerLayout} />
                        <FFAccessRoute path="/manager/field-force" component={FFLayout} /> */}
                        <Route path="/manager/campaign" component={CampaignLayout} />
                        <Route path="/manager/dashboard" component={DashboardLayout} />
                        <Route path="/manager/user" component={UserManagerLayout} />
                        <Route path="/manager/role" component={RoleManagerLayout} />
                        {/* <Route path="/manager/report-manager" component={ReportManagerLayout} />
                        <Route path="/manager/audience-manager" component={AudienceManagerLayout} />
                        <Route path="/manager/location-manager" component={LocationManagerLayout} />
                        <Route path="/manager/hr" component={HrManagerLayout} />
                        <Route path="/manager/notification" component={NotificationLayout} />
                        <Route path="/manager/dashboard-manager" component={DashboardManagerLayout} />
                        <Route path="/manager/callcenter-manager" component={ CallCenterManagerLayout } /> */}
                        <Route exact path="/manager" render={() => <Redirect to="/manager/dashboard" />} />
                        <Route path="/manager" render={() => <PageNotFound/>} />
                    </Switch>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default ManagerLayout;