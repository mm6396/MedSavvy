import React, {useState} from 'react';
import { Affix, Layout } from 'antd';
import { Switch } from 'react-router-dom';
// import BreadCrumb from '../../../components/common/BreadCrumb/BreadCrumb';
import CommonFooter from '../../../util/Footer/Footer';
import dashboardManagerRoutes from '../../../routes/dashboardManagerRoutes';
import DashboardManagerMenu from '../../../components/DashboardManager/DashboardManagerMenu/DashboardManagerMenu';

const { Content, Footer } = Layout;

const DashboardManagerLayout = () => {

    const [phone, setPhone]= useState(localStorage.getItem('device'))

    const appStyle={
        display: 'none'
    }

    return (
        <Layout>
            <Affix offsetTop={90} style={phone === 'mobile' ? appStyle : null} >
                <DashboardManagerMenu/>
            </Affix>
            <Layout  style={phone === 'mobile' ? {padding: '0'} : { padding: '85px 24px 24px' }} >
                {/* <BreadCrumb /> */}
                <Content className="site-layout-background" style={{ padding: 24, margin: 20, maxHeight: '100%', overflow: 'auto' }}>
                    <Switch>
                        {dashboardManagerRoutes.map(v => v)}
                    </Switch>
                </Content>
                <CommonFooter style={phone === 'mobile' ? appStyle : null} />
                {/* <Footer style={{ textAlign: 'center' }}><span><CopyrightOutlined /></span> v2 Technologies LTD-2020</Footer> */}
            </Layout>
        </Layout>
    );
};

export default DashboardManagerLayout;