import React from 'react';
import "./DashboardMenu.scss";
import { Layout, Menu } from 'antd';
import { DownCircleOutlined,DashboardFilled  } from '@ant-design/icons';
import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import {RiHomeHeartFill} from 'react-icons/ri';

const { Header } = Layout;

const DashboardMenu = () => {

    let location = useLocation();

    const [path,setPath] = useState('');

    useEffect(()=> {
        setPath(location.pathname);
    },[location.pathname]);


    // useEffect(() => {

    //         const search_icon = document.getElementById("search-icon");
    //         const search_input = document.getElementById("search-input");
        
            

    //         search_icon.addEventListener('click', () =>{
    //         if (!search_input.classList.contains('input_open')){
    //         search_input.classList.add('input_open');
    //         //   search_icon.innerHTML = ' <GrFormClose/> ';
    //         }
    //     });

    //     search_icon.addEventListener('click', () => {
    //         if(search_input.classList.contains('input_open')){
        
    //             search_input.classList.remove('input-open');
    //             // search_icon.innerHTML=' <GrFormClose/> ';
    //         }
    //     });

    // }, [])

    return (
         // <Affix offsetTop={0}>
         <Header className="header">
            {/* <div className="logo"><img src={Logo} height="50px" alt="logo" />PRISM VERTEX</div> */}
            {/* <Menu theme="dark"  mode="horizontal"  breakpoint="lg"  collapsedWidth="0"  overflowedIndicator={<DownCircleOutlined style={{ fontSize: "1.2rem", color: "white" }} />}  selectedKeys={[path]}>

            <Menu.Item style={{display: 'flex', alignItems:'center', width : 'fit-content'  }}  key="/manager/dashboard" icon={<RiHomeHeartFill style={{ fontSize: '17px', marginRight: '5px' }}  />} > Welcome to Home <Link to="/manager/dashboard" /></Menu.Item> */}
            {/* <Menu.Item key="/manager/dashboard/user" icon={<DashboardFilled />} >User Dashboard <Link to="/manager/dashboard/user" /></Menu.Item>
            <Menu.Item key="/manager/dashboard/role" icon={<DashboardFilled />} >Role Dashboard <Link to="/manager/dashboard/role" /></Menu.Item>
            <Menu.Item key="/manager/dashboard/campaign" icon={<DashboardFilled />} >Campaign Dashboard <Link to="/manager/dashboard/campaign" /></Menu.Item> */}

        
            {/* <div style={{ }}>
            <input id="search-input"  className="search-input"  type="search" />    
            <SearchOutlined id="search-icon"  />
            </div> */}
            

            {/* </Menu> */}

       
            
         </Header>
 // </Affix>
    );
}

export default DashboardMenu;