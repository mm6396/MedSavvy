import React, {useState} from 'react';
import reportmanagerRoutes from '../../../routes/reportmanagerRoutes';
import { Affix, Layout } from 'antd';
import {CopyrightOutlined } from '@ant-design/icons';
import { Switch } from 'react-router-dom';
// import RoleManagerMenu from '../../../components/RoleManager/RoleManagerMenu/RoleManagerMenu';
import ReportManagermenu from '../../../components/ReportManager/ReportManagermenu/ReportManagermenu';
import CommonFooter from '../../../util/Footer/Footer';

const { Content, Footer } = Layout;

const ReportManagerLayout = () => {

    const [phone, setPhone]= useState(localStorage.getItem('device'))

    const appStyle={
        display: 'none'
    }

    return (
        <div>
            <Layout>
            <Affix offsetTop={90} style={phone === 'mobile' ? appStyle : null} >
                <ReportManagermenu />
            </Affix>
            <Layout style={phone === 'mobile' ? {padding: '0'} : { padding: '85px 24px 24px' }} >
                {/* <BreadCrumb /> */}
                <Content className="site-layout-background" style={{ padding: 24, margin: 20, minHeight: 700 }}>
                    <Switch>
                        {reportmanagerRoutes.map(v => v)}
                    </Switch>
                </Content>
                <CommonFooter style={phone === 'mobile' ? appStyle : null} />
                {/* <Footer style={{ textAlign: 'center' }}><span><CopyrightOutlined /></span> v2 Technologies LTD-2020</Footer> */}
            </Layout>
        </Layout>
        </div>
    );
};

export default ReportManagerLayout;