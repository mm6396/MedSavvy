import React, { useEffect, useState } from 'react';
import './RoleManagerMenu.scss';
import { Layout, Menu } from 'antd';
import { DownCircleOutlined, UnorderedListOutlined, PlusCircleOutlined, UsergroupAddOutlined, EnvironmentFilled } from '@ant-design/icons';
import { useLocation, Link } from 'react-router-dom';

const { Header } = Layout;

const RoleManagerMenu = () => {
    let location = useLocation();

    const [path, setPath] = useState('');

    useEffect(() => {
        setPath(location.pathname);
    }, [location.pathname]);

    return (

        <Header className="header">
            {/* <div className="logo"><img src={Logo} height="50px" alt="logo" />PRISM VERTEX</div> */}
            <Menu theme="dark" breakpoint="lg" collapsedWidth="0" mode="horizontal" overflowedIndicator={<DownCircleOutlined style={{ fontSize: "1.2rem", color: "white" }} />} selectedKeys={[path]}>

                <Menu.Item key="/manager/role/list" icon={<UnorderedListOutlined />}  >Role List <Link to="/manager/role/list" /></Menu.Item>
                {localStorage.getItem('role')?.split(',').includes('1') &&
                    <Menu.Item key="/manager/role/create" icon={<PlusCircleOutlined />}  >Role Creation <Link to="/manager/role/create" /></Menu.Item>
                }
                {/* {localStorage.getItem('location')?.split(',').includes('1') &&
                    <Menu.Item key="/manager/role/location-area" icon={<EnvironmentFilled />}  > Location Manager <Link to="/manager/role/location-area" /></Menu.Item>
                } */}

            </Menu>
        </Header>
    );
}

export default RoleManagerMenu;
