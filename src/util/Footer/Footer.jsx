import React from 'react';
import { Layout } from 'antd';
import {CopyrightOutlined } from '@ant-design/icons';
import moment  from 'moment';

const { Footer } = Layout;

const CommonFooter = () => {

    return (
        <Footer style={{ textAlign: 'center' }}><span><CopyrightOutlined /></span> {/* v2 Technologies LTD  - */} { moment(new Date()).format('YYYY') } ( {process.env.REACT_APP_STAGE} )</Footer>
    )
}

export default CommonFooter;
