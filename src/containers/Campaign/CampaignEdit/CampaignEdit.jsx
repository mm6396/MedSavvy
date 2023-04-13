import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Row, Col, Select, DatePicker, Button, Slider } from 'antd';
import notification from "../../../util/Notification/Notification";
import ErrorHandler from '../../../util/ErrorHandler/ErrorHandler'
import { CampaignManagerAPI } from '../../../util/ApiGateway/Api';
import moment from 'moment';
import './CampaignCreate.scss';
import axios from 'axios';

const { Option } = Select;

const { RangePicker } = DatePicker;

const CampaignEdit = () => {

    let history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [typeList, setTypeList] = useState([]);

    useEffect(() => {

        document.title = 'Prism CRM Creating Campaign';
        window.scrollTo(0, 0);

    }, []);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('http://localhost:8001/api/v1/campaignRouter/typeList', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("accessToken")

                    }
                });
                console.log(data);
                setTypeList(data.data);
                setLoading(false);
            } catch (error) {
                if (error?.response?.data?.message) {
                    ErrorHandler(error?.response?.data?.message, history);
                    notification(error?.response?.data?.message, 'Please fix this error and try again. Otherwise communicate with the admin', 'error');
                } else {
                    notification('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
                }
            }
        })();
    }, []);


    const onFinish = async (values) => {
        let start_date = moment(values.date_range[0]).format('YYYY-MM-DD');
        let end_date = moment(values.date_range[1]).format('YYYY-MM-DD');
        values.start_date= start_date;
        values.end_date = end_date;
        try {

            console.log(values);
            const { data } = await axios.post('http://localhost:8001/api/v1/campaignRouter/create', values, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("accessToken")
                }
            });
            notification('Successful', `New Campaign Created successfully`, 'success');
            setLoading(false);
            history.push('list')

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
                <br />
                <br />
                <Row>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 0 }}>
                        <div>
                            <h5 className="required" style={{ fontWeight: 'bold', color: '#004F9F', fontSize: '12px', }}> Add Campaign </h5>
                            <Form.Item
                                name="camp_name"
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
                        <Form.Item name="type" rules={[{ required: true, message: 'Please select typpe!' }]}>
                            <Select
                                placeholder="Type Selection"
                                style={{ width: "100%" }}
                                allowClear
                                showSearch
                                showArrow
                                optionFilterProp="children"
                            >
                                {typeList?.map((v, i) => (
                                    <Option value={v.id} key={v.id}>
                                        {v.type_name}
                                    </Option>
                                ))}

                            </Select>
                        </Form.Item>
                        <div>
                            <h5 className="required" style={{ fontWeight: '600', color: '#004F9F', fontSize: '12px' }}>Set Survey Target</h5>
                            <Form.Item name="survey_target" rules={[{ required: true, message: 'Please select!' }]}>
                                <Slider
                                    tooltip={{
                                        open: true,
                                    }} />
                            </Form.Item>
                        </div>

                    </Col>

                </Row>
                <Row justify={'center'} className="button-row" style={{ margin: '50px 0 0 0', padding: '24px 0 0 0' }}>
                    <Col >
                        <Form.Item >
                            <Button className="assign-btn" shape="round" htmlType="submit">
                                Submit Data
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default CampaignEdit;