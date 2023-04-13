import React from 'react';
import { Layout } from 'antd';
import {CopyrightOutlined } from '@ant-design/icons';
import moment  from 'moment';

const { Footer } = Layout;

const CommonFooter = () => {

    return (
        <Footer style={{ textAlign: 'center' }}><span><CopyrightOutlined /></span> { moment(new Date()).format('YYYY') } All rights reserved by Team2</Footer>
    )
}

export default CommonFooter;
