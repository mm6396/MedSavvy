import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { DownCircleOutlined, PlusCircleOutlined, UnorderedListOutlined, UserAddOutlined, CalculatorFilled, DashboardFilled, FileExclamationFilled, FileTextFilled, DashboardOutlined, EditFilled, PieChartFilled } from '@ant-design/icons';
import { useLocation, Link } from 'react-router-dom';

const { Header } = Layout;

const DashboardManagerMenu = () => {

    let location = useLocation();

    const [path, setPath] = useState('');

    useEffect(() => {
        setPath(location.pathname);
    }, [location.pathname]);

    return (
        <Header className="header">

            <Menu theme="dark" breakpoint="lg" collapsedWidth="0" mode="horizontal" overflowedIndicator={<DownCircleOutlined style={{ fontSize: "1.2rem", color: "white" }} />} selectedKeys={[path]}>
                {localStorage.getItem('dashboard')?.split(',').includes('5') &&
                    <Menu.Item key="/manager/dashboard-manager/home" icon={<DashboardFilled />} > Dashboards <Link to="/manager/dashboard-manager/home" /></Menu.Item>
                }
                {localStorage.getItem('sysadmin')?.split(',').includes('1') &&
                    <Menu.Item key="/manager/dashboard-manager/builder" icon={<EditFilled />} > Dashboard Builder  <Link to="/manager/dashboard-manager/builder" /></Menu.Item>
                }
                {localStorage.getItem('sysadmin')?.split(',').includes('1') &&
                    <Menu.Item key="/manager/dashboard-manager/list" icon={<UnorderedListOutlined />} > Dashboard List <Link to="/manager/dashboard-manager/list" /></Menu.Item>
                }
            </Menu>
        </Header>
    );
};

export default DashboardManagerMenu;