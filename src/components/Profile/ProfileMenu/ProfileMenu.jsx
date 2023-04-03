import React from 'react';
import './ProfileMenu.scss';
import { Layout } from 'antd';

const { Header } = Layout;

const ProfileMenu = () => {
        return (
                <Header className="header">
                        {/* <div className="logo"><img src={Logo} height="50px" alt="logo" />PRISM VERTEX</div> */}
                        {/* <Menu theme="dark" breakpoint="lg" collapsedWidth="0" mode="horizontal" overflowedIndicator={<DownCircleOutlined style={{ fontSize: "1.2rem", color: "orange" }} />} selectedKeys={[path]}>

                                <Menu.Item key="/manager/campaign/create" > Add Campaign <Link to="/manager/campaign/create" /></Menu.Item>
                                <Menu.Item key="/manager/campaign/list" >Campaign List <Link to="/manager/campaign/list" /></Menu.Item>
                                <Menu.Item key="/manager/campaign/assign" >Campaign Assign <Link to="/manager/campaign/assign" /></Menu.Item>

                        </Menu> */}
                </Header>
        );
}

export default ProfileMenu;