import React, { useEffect } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import { Column } from '@ant-design/plots';
import './RootDashboard.scss';
import Pie from './Pie';
import PieChart from './Pie';


const RootDashboard = () => {

    useEffect(() => {

        document.title = 'CRM Dashboard ';

        window.scrollTo(0, 0);

    }, []);

    const data = [
        {
            type: 'Campaign 1',
            sales: 38,
        },
        {
            type: 'Campaign 2',
            sales: 52,
        },
        {
            type: 'Campaign 3',
            sales: 61,
        },
        {
            type: 'Campaign 4',
            sales: 120,
        },
        {
            type: 'Campaign 5',
            sales: 48,
        },

    ];
    const config = {
        data,
        xField: 'type',
        yField: 'sales',
        columnWidthRatio: 0.6,
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: 'Total Survey',
            },
            sales: {
                alias: 'Total People working',
            },
        },
    };

    const data2 = [
        {
          type: 'Product A',
          value: 27,
        },
        {
          type: 'Product B',
          value: 25,
        },
        {
          type: 'Product C',
          value: 18,
        },
        {
          type: 'Product D',
          value: 15,
        },
        {
          type: 'Product E',
          value: 10,
        },
        {
          type: 'Product F',
          value: 5,
        },
      ];

    return (
        <div className="rootdashboard-div">
            <Row>
                {/* <Col span={24} className="logo-div">
                    <Tilt className="Tilt" options={{ max: 25 }} style={{ width: 376, position: 'relative' }} >
                        <img src={logo} width="100%" />
                    </Tilt>
                </Col> */}

                <Col span={24} style={{ display: 'flex', justifyContent: 'center' }} >
                    <p style={{ color: '#004F9F', fontSize: '20px', fontWeight: 'bold' }} > Welcome to Medsavvy </p>
                </Col>

            </Row>
            <Row gutter={16}>
                <Col span={7}>
                    <Card bordered={false}>
                        <Statistic
                            title="Active Sales People"
                            value={11.28}
                            precision={2}
                            valueStyle={{
                                color: '#3f8600',
                            }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={7}>
                    <Card bordered={false}>
                        <Statistic
                            title="Idle Sales People"
                            value={9.3}
                            precision={2}
                            valueStyle={{
                                color: '#cf1322',
                            }}
                            prefix={<ArrowDownOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={7}>
                    <Card bordered={false}>
                        <Statistic
                            title="Survey Done"
                            value={9}
                            precision={2}
                            valueStyle={{
                                color: '#cf1322',
                            }}
                        // prefix={<ArrowDownOutlined />}
                        // suffix="%"
                        />
                    </Card>
                </Col>
            </Row>
            <br />
            <br />
            <Row>

                <Col lg = {{ span: 7, offset:1}} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }} >
                    <Column {...config} />
                    <div>Total Survey of Each Campaign</div>

                </Col>
                <Col lg = {{ span: 7, offset:3}} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }} >

                  <PieChart data = {data2}/>
                  <div>Preference of Customer</div>
                </Col>
                {/* <Col span={7} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }} >


                </Col>
                <Col span={7} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }} >


                </Col> */}
            </Row>



        </div>
    );
}

export default RootDashboard;