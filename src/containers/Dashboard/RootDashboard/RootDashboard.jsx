import React, { useEffect, useState } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Select } from 'antd';
import { Column } from '@ant-design/plots';
import './RootDashboard.scss';
import Pie from './Pie';
import PieChart from './Pie';
import axios from 'axios';
import ErrorHandler from '../../../util/ErrorHandler/ErrorHandler';
import notificationFun from '../../../util/Notification/Notification';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const { Option } = Select;

const RootDashboard = () => {
    const [campList, setCamp] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pieData, setPieData] = useState([{type:'A', value: 0}]);
    let history = useHistory();

    useEffect(() => {

        document.title = 'Medsavvy Dashboard ';
        window.scrollTo(0, 0);
        fetchCampaign();
    }, []);

    const fetchCampaign = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('http://localhost:8001/api/v1/campaignRouter/campaignList', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("accessToken")

                }
            });
            console.log(data);
            let users = data.data.map((v, i) => {
                return {
                    ...v,
                    key: i + 1
                }
            })
            setCamp(users);
            setLoading(false);
        } catch (error) {
            if (error?.response?.data?.message) {
                ErrorHandler(error?.response?.data?.message, history);
                // notification(error?.response?.data?.message, 'Please fix this error and try again. Otherwise communicate with the admin', 'error');
            } else {
                notificationFun('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
            }
        }
    }

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

    const fetchPriceOpinion= async(e) => {

    }

    const onCampaignChange = async(e) => {
        console.log(e);
        // if(e) {
            try {
                setLoading(true);
                const { data } = await axios.post('http://localhost:8001/api/v1/dashBoardRouter/analysis-1', {camp_id: e}, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("accessToken")
    
                    }
                });
                console.log(data);
                let temp = data?.data.map(v=> {
                    return {
                        type: v.age,
                        value: parseInt(v.customer_age_count)
                    }
                })
                setPieData(temp);
                setLoading(false);
                fetchPriceOpinion();
            } catch (error) {
                if (error?.response?.data?.message) {
                    ErrorHandler(error?.response?.data?.message, history);
                    // notification(error?.response?.data?.message, 'Please fix this error and try again. Otherwise communicate with the admin', 'error');
                } else {
                    notificationFun('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
                }
            }
        // }
    } 

    return (
        <div className="rootdashboard-div">
            <div>
                
                <Select
                    placeholder="Select a Campaign"
                    style={{ width: "30%" }}
                    // allowClear
                    showSearch
                    showArrow
                    optionFilterProp="children"
                    onSelect={onCampaignChange}
                >
                    {campList?.map((v, i) => (
                        <Option value={v.id} key={v.id}>
                            {v.camp_name}
                        </Option>
                    ))}

                </Select>
            </div>
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

                <Col lg={{ span: 7, offset: 1 }} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }} >
                    <Column {...config} />
                    <div>Total Survey of Each Campaign</div>

                </Col>
                <Col lg={{ span: 7, offset: 3 }} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }} >

                    <PieChart data={pieData} />
                    <div>Variation of Customer By Age</div>
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