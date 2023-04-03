import React, {useState , useEffect} from 'react';
import './CampaignLayout.scss';
import { Affix, Layout } from 'antd';
import {CopyrightOutlined } from '@ant-design/icons';
import { Switch } from 'react-router-dom';
import CampaignMenu from '../../../components/Campaign/CampaignMenu/CampaignMenu';
// import BreadCrumb from '../../../components/common/BreadCrumb/BreadCrumb';
import campaignRoutes from '../../../routes/campaignRoutes';
import CommonFooter from '../../../util/Footer/Footer';

const { Content, Footer } = Layout;

const CampaignLayout = () => {

    const [phone, setPhone]= useState(localStorage.getItem('device'))

    const appStyle={
        display: 'none'
    }

    return (
        <Layout>
            <Affix offsetTop={90} style={phone === 'mobile' ? appStyle : null}>
                <CampaignMenu />
            </Affix>
            <Layout   style={phone === 'mobile' ? {padding: '0'} : { padding: '85px 24px 24px' }} >
                {/* <BreadCrumb /> */}
                <Content className="site-layout-background" style={{ padding: 24, margin: 20, minHeight: 700 }}>
                    <Switch>
                        {campaignRoutes.map(v => v)}
                    </Switch>
                </Content>
                <CommonFooter style={phone === 'mobile' ? appStyle : null} />
                {/* <Footer style={{ textAlign: 'center' }}><span><CopyrightOutlined /></span> v2 Technologies LTD-2020</Footer> */}
            </Layout>
        </Layout>
    );
}

export default CampaignLayout;