import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { DownCircleOutlined, PlusCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { Header } = Layout;


const ReportManagermenu = () => {

    let location = useLocation();

    const [path, setPath] = useState('');

    useEffect(() => {
        setPath(location.pathname);
    }, [location.pathname]);

    return (
        <div>

            <Header className="header">
                {/* <div className="logo"><img src={Logo} height="50px" alt="logo" />PRISM VERTEX</div> */}
                <Menu theme="dark" breakpoint="lg" collapsedWidth="0" mode="horizontal" overflowedIndicator={<DownCircleOutlined style={{ fontSize: "1.2rem", color: "white" }} />} selectedKeys={[path]}>

                    {!localStorage.getItem('report')?.split(',').includes('24') &&
                        <Menu.Item key="/manager/report-manager/summery-report" icon={<UnorderedListOutlined />}  > By-Region Summary Report <Link to="/manager/report-manager/summery-report" /></Menu.Item>
                    }
                    {localStorage.getItem('report')?.split(',').includes('16') && <Menu.Item key="/manager/report-manager/national-report" icon={<UnorderedListOutlined />}  > National Raw Report (Live) <Link to="/manager/report-manager/national-report" /></Menu.Item>}

                    {!localStorage.getItem('report')?.split(',').includes('24') &&
                        <Menu.Item key="/manager/report-manager/target-achievement" icon={<UnorderedListOutlined />}  > By-RA Summary Report <Link to="/manager/report-manager/target-achievement" /></Menu.Item>
                    }
                    {/* <Menu.Item key="/manager/report-manager/contact-summery" icon={<UnorderedListOutlined />}  > Contact Summary (Live) <Link to="/manager/report-manager/contact-summery" /></Menu.Item> */}
                    {localStorage.getItem('report')?.split(',').includes('19') &&
                        <Menu.Item key="/manager/report-manager/campaign-readiness-report" icon={<UnorderedListOutlined />}  > Campaign Readiness Report <Link to="/manager/report-manager/campaign-readiness-report" /></Menu.Item>
                    }
                    {localStorage.getItem('report')?.split(',').includes('19') &&
                        <Menu.Item key="/manager/report-manager/sup-summary" icon={<UnorderedListOutlined />}  > Sup Summary (Live) <Link to="/manager/report-manager/sup-summary" /></Menu.Item>
                    }
                    {localStorage.getItem('report')?.split(',').includes('19') &&
                        <Menu.Item key="/manager/report-manager/attendance-report" icon={<UnorderedListOutlined />}  >Attendance Report (Live)<Link to="/manager/report-manager/attendance-report" /></Menu.Item>
                    }
                    {localStorage.getItem('report')?.split(',').includes('19') &&
                        <Menu.Item key="/manager/report-manager/audit-report" icon={<UnorderedListOutlined />}  >Audit Report<Link to="/manager/report-manager/audit-report" /></Menu.Item>
                    }
                    <Menu.Item key="/manager/report-manager/custom-report" icon={<UnorderedListOutlined />}  >Custom Report<Link to="/manager/report-manager/custom-report" /></Menu.Item>
                    {localStorage.getItem('sysadmin')?.split(',').includes('1') &&
                        <Menu.Item key="/manager/report-manager/query-builder" icon={<UnorderedListOutlined />}  >Query Builder<Link to="/manager/report-manager/query-builder" /></Menu.Item>
                    }
                    {localStorage.getItem('sysadmin')?.split(',').includes('1') &&
                        <Menu.Item key="/manager/report-manager/query-report" icon={<UnorderedListOutlined />}  >Query Report List<Link to="/manager/report-manager/query-report" /></Menu.Item>
                    }
                </Menu>


            </Header>

        </div>
    );
};

export default ReportManagermenu;