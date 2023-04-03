import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Row, Col, Select, DatePicker, Button } from 'antd';
import notification from "../../../util/Notification/Notification";
import ErrorHandler from '../../../util/ErrorHandler/ErrorHandler'
import { CampaignManagerAPI } from '../../../util/ApiGateway/Api';

import './CampaignCreate.scss';

const { RangePicker } = DatePicker;

const CampaignCreate = () => {

    let history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        document.title = 'Prism CRM Creating Campaign';
        window.scrollTo(0, 0);

    }, []);


    const onFinish = async (values) => {

        try {

            console.log(values);
            const { data } = await CampaignManagerAPI.post('/create-survey', values, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("accessToken")
                }
            });
            notification('Successful', `New Campaign ${data.response.name}  Created successfully`, 'success');
            setLoading(false)


        } catch (error) {
            setLoading(false);
            if (error?.response?.data?.message) {
                ErrorHandler(error?.response?.data?.message, history);
                notification(error?.response?.data?.message, 'Please fix this error and try again. Otherwise communicate with the admin', 'error');
            }
            else {
                notification('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
            }
        }

    };

    return (
        <div className="campaign-create-form">
            <Form name="basic"
                onFinish={onFinish}
                form={form}
            >
                <h1 style={{ fontSize: '20px', textAlign: 'center', fontWeight: 'bold' }}>Campaign Creation</h1>
                <br/>
                <br/>
                <Row>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 0 }}>
                        <div>
                            <h5 className="required" style={{ fontWeight: 'bold', color: '#004F9F', fontSize: '12px', }}> Add Campaign </h5>
                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: 'type here' }]} >
                                <Input placeholder="enter campaign name.." />
                            </Form.Item>
                        </div>
                        <div>
                            <h5 className="required" style={{ fontWeight: '600', color: '#004F9F', fontSize: '12px' }}>Set Campaign Date Range </h5>
                            <Form.Item name="date_range" rules={[{ type: 'array', required: true, message: 'Please select time!' }]}>
                                <RangePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 1 }}>
                    <h5 className="required" style={{ fontWeight: '600', color: '#004F9F', fontSize: '12px' }}>Set Campaign Type </h5>
                    <Form.Item name="type" rules={[{required: true, message: 'Please select typpe!' }]}>
                        <Select
                            defaultValue=""
                            style={{ width: '100%' }}
                            //   onChange={handleChange}
                            options={[
                                { value: 'Quality Check', label: 'Quality Check' },
                                { value: 'Launch', label: 'Launch' },
                                { value: 'New Product', label: 'New Product' },
                            ]}
                            >
                        </Select>
                          </Form.Item>
                    </Col>

                </Row>
                <Row justify={'center'} className="button-row" style={{ margin: '50px 0 0 0', padding: '24px 0 0 0' }}>
                        <Col >
                            <Form.Item >
                                <Button className="assign-btn" shape="round"  htmlType="submit">
                                   Submit Data
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
            </Form>
        </div>
    );
}

export default CampaignCreate;