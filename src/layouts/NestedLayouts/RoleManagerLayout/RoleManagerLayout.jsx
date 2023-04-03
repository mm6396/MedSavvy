import React, {useState} from 'react';
import './RoleManagerLayout.scss';
import { Affix, Layout } from 'antd';
import {CopyrightOutlined } from '@ant-design/icons';
import { Switch } from 'react-router-dom';
import roleManagerRoutes from '../../../routes/roleManagerRoutes';
import RoleManagerMenu from '../../../components/RoleManager/RoleManagerMenu/RoleManagerMenu';
import CommonFooter from '../../../util/Footer/Footer';
// import BreadCrumb from '../../../components/common/BreadCrumb/BreadCrumb';

const { Content, Footer } = Layout;


const RoleManagerLayout = () => {

    const [phone, setPhone]= useState(localStorage.getItem('device'))

    const appStyle={
        display: 'none'
    }

    return (
        <Layout>
            <Affix offsetTop={90} style={phone === 'mobile' ? appStyle : null} >
                <RoleManagerMenu />
            </Affix>
            <Layout style={phone === 'mobile' ? {padding: '0'} : { padding: '85px 24px 24px' }} >
                {/* <BreadCrumb /> */}
                <Content className="site-layout-background" style={{ padding: 24, margin: 20, minHeight: 700 }}>
                    <Switch>
                        {roleManagerRoutes.map(v => v)}
                    </Switch>
                </Content>
                <CommonFooter style={phone === 'mobile' ? appStyle : null} />
                {/* <Footer style={{ textAlign: 'center' }}><span><CopyrightOutlined /></span> v2 Technologies LTD-2020</Footer> */}
            </Layout>
        </Layout>
    );
}

export default RoleManagerLayout;