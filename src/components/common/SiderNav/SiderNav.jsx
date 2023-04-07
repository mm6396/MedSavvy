import React from 'react';
import { Layout, Menu, Affix } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import './SiderNav.scss';
import { FaUserTag, FaUserShield, FaUserCog, FaLocationArrow, FaPeopleArrows, FaUsers, FaPhoneSquare } from 'react-icons/fa';
import { GrDocumentUser } from "react-icons/gr";
import { RiHomeHeartFill, RiFileUserFill, RiBarChartBoxFill } from 'react-icons/ri';
import { AiFillNotification } from 'react-icons/ai';


const { Sider } = Layout;

const SiderNav = () => {

    let location = useLocation();
    const [path, setPath] = useState('');
    const [phone, setPhone] = useState(localStorage.getItem('device'));

    useEffect(() => {
        setPath(location.pathname);
    }, [location.pathname]);

    const appStyle = {
        display: 'none'
    }

    return (
        <Affix className="sidernav-affix" style={phone === 'mobile' ? appStyle : null} offsetTop={90}>
            <div>

                <Sider breakpoint="lg" collapsedWidth="0" className="site-layout-background sider-res-pos-div" >
                    <Menu mode="inline" theme="dark" selectedKeys={[path.split('/')[2]]} style={{ height: '100%', borderRight: 0, minHeight: '100vh', paddingTop: '20px' }}>
                        <Menu.Item style={{ fontWeight: '600', display: 'flex', alignItems: 'center', width: 'fit-content' }} key="dashboard"
                            icon={<RiHomeHeartFill style={{ fontSize: '17px', marginRight: '7px' }} />}  > Dashboard <Link to="/manager/dashboard" />
                        </Menu.Item>
                        <Menu.Item style={{ fontWeight: '600', display: 'flex', alignItems: 'center', width: 'fit-content' }} key="user"
                            icon={<FaUserTag style={{ fontSize: '17px', marginRight: '7px' }} />}  >  User Manager <Link to="/manager/user/list" />
                        </Menu.Item>
                        
                        {localStorage.getItem('user')?.split(',').includes('5') &&
                            <Menu.Item className="manager-menu" key="user" >
                                <div className="menu-icon" > <FaUserTag /> </div>
                                User Manager <Link to="/manager/user" />
                            </Menu.Item>
                        }
                        {localStorage.getItem('role')?.split(',').includes('5') && localStorage.getItem('sysadmin')?.split(',').includes('1') &&
                            <Menu.Item className="manager-menu" key="role"  >
                                <div className="menu-icon"> <FaUserShield />  </div>
                                Role Manager <Link to="/manager/role" />
                            </Menu.Item>
                        }

                        {localStorage.getItem('ff')?.split(',').includes('5') &&
                            <Menu.Item className="manager-menu" key="field-force"  >
                                <div className="menu-icon"> <FaUserCog />  </div>
                                FF Database <Link to="/manager/field-force" />
                            </Menu.Item>
                        }

                        {/* {localStorage.getItem('campaign')?.split(',').includes('5') && */}
                        <Menu.Item style={{ fontWeight: '600', display: 'flex', alignItems: 'center', width: 'fit-content' }} key="campaign"
                            icon={<FaPeopleArrows style={{ fontSize: '17px', marginRight: '7px' }} />}  >  Campaign <Link to="/manager/campaign/list" />
                        </Menu.Item>
                        {/* } */}

                        <Menu.Item style={{ fontWeight: '600', display: 'flex', alignItems: 'center', width: 'fit-content' }} key="survey_manager"
                            icon={<GrDocumentUser style={{ fontSize: '17px', marginRight: '7px' }} />}  > Survey Manager <Link to="/manager/user/list" />
                        </Menu.Item>

                        {localStorage.getItem('report')?.split(',').includes('5') &&
                            <Menu.Item className="manager-menu" key="report-manager"  >
                                <div className="menu-icon"> <RiFileUserFill />  </div>
                                Report Manager <Link to="/manager/report-manager" />
                            </Menu.Item>
                        }

                        {localStorage.getItem('location')?.split(',').includes('5') &&
                            <Menu.Item className="manager-menu" key="location-manager"  >
                                <div className="menu-icon"> <FaLocationArrow /></div>
                                Live Location reports  <Link to="/manager/location-manager" />
                            </Menu.Item>
                        }

                        {localStorage.getItem('hr')?.split(',').includes('5') &&
                            <Menu.Item className="manager-menu" key="hr"  >
                                <div className="menu-icon"> <FaUsers />  </div>
                                Human Resource <Link to="/manager/hr" />
                            </Menu.Item>
                        }
                        {localStorage.getItem('notification')?.split(',').includes('5') &&
                            <Menu.Item className="manager-menu" key="notification"  >
                                <div className="menu-icon"> <AiFillNotification /> </div>
                                Notification Manager <Link to="/manager/notification" />
                            </Menu.Item>
                        }
                        {localStorage.getItem('dashboard')?.split(',').includes('5') &&
                            <Menu.Item className="manager-menu" key="dashboard-manager"  >
                                <div className="menu-icon"> <RiBarChartBoxFill /> </div>
                                Dashboard Manager <Link to="/manager/dashboard-manager" />
                            </Menu.Item>
                        }
                        {localStorage.getItem('audience')?.split(',').includes('5') &&
                            <Menu.Item className="manager-menu" key="audience-manager"  >
                                <div className="menu-icon"> <RiFileUserFill />  </div>
                                Audience Manager <Link to="/manager/audience-manager" />
                            </Menu.Item>
                        }
                        {localStorage.getItem('call_center')?.split(',').includes('5') &&
                            <Menu.Item className="manager-menu" key="callcenter-manager"  >
                                <div className="menu-icon"> <FaPhoneSquare />  </div>
                                Call Center Home <Link to="/manager/callcenter-manager" />
                            </Menu.Item>
                        }
                    </Menu>
                </Sider>
            </div>
        </Affix>
    );
};

export default SiderNav;
