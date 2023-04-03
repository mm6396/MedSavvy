import React from 'react';
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const BreadCrumb = () => {

    let location = useLocation();

    const [path, setPath] = useState([]);

    useEffect(() => {
        setPath([...location.pathname.split('/')]);
    }, [location.pathname]);

    return (
        <Breadcrumb style={{ margin: '16px 0' }}>
            {path.map((v, i) => <Breadcrumb.Item key={i}>{v}</Breadcrumb.Item>)}
        </Breadcrumb>
    );
}

export default BreadCrumb;