import React, { useEffect, useState } from 'react';
import './CampaignMenu.scss';
import { Layout, Menu } from 'antd';
import { DownCircleOutlined } from '@ant-design/icons';
import { useLocation, Link } from 'react-router-dom';

const { Header } = Layout;

const CampaignMenu = () => {
    let location = useLocation();

    const [path, setPath] = useState('');

    useEffect(() => {
        setPath(location.pathname);
    }, [location.pathname]);

    return (

        <Header className="header">
            {/* <div className="logo"><img src={Logo} height="50px" alt="logo" />PRISM VERTEX</div> */}
            <Menu theme="dark" breakpoint="lg" collapsedWidth="0" mode="horizontal" overflowedIndicator={<DownCircleOutlined style={{ fontSize: "1.2rem", color: "orange" }} />} selectedKeys={[path]}>
                <Menu.Item key="/manager/campaign/list" >Campaign List <Link to="/manager/campaign/list" /></Menu.Item>
                <Menu.Item key="/manager/campaign/create" > Create Campaign <Link to="/manager/campaign/create" /></Menu.Item>
                {/* <Menu.Item key="/manager/campaign/type" > Create CampaigType <Link to="/manager/campaign/type" /></Menu.Item> */}
                {localStorage.getItem('campaign')?.split(',').includes('1') &&
                    <Menu.Item key="/manager/campaign/create" > Create Campaign <Link to="/manager/campaign/create" /></Menu.Item>
                }
                {/* {localStorage.getItem('campaign')?.split(',').includes('6') &&
                    <Menu.Item key="/manager/campaign/br-request" >BR Request <Link to="/manager/campaign/br-request" /></Menu.Item>
                } */}
            </Menu>
        </Header>
    );
}

export default CampaignMenu;
