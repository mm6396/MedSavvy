import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Row, Col, Select, DatePicker, Button } from 'antd';
import notification from "../../util/Notification/Notification";
import ErrorHandler from '../../util/ErrorHandler/ErrorHandler'
import { CampaignManagerAPI } from '../../util/ApiGateway/Api';
import axios from 'axios';

// import './CampaignCreate.scss';

const { Option } = Select;

const { RangePicker } = DatePicker;

const UserCreate = () => {

    let history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [roleList, setRoleList] = useState([]);
    const [ allUsers, setAllUsers ] = useState([]);
    const [ allEmail, setAllEmail ] = useState([]);

    useEffect(() => {

        document.title = 'User Create';
        window.scrollTo(0, 0);
        fetchAllUsers();

    }, []);

    
    const fetchAllUsers = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('http://localhost:8001/api/v1/userRouter/all-userList', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("accessToken")

                }
            });
            setAllUsers(data.data.map( val => val.username ));
            setAllEmail(data.data.map( val => val.email ));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error?.response?.data?.message) {
                ErrorHandler(error?.response?.data?.message, history);
            }
        }
    };

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('http://localhost:8001/api/v1/userRouter/roleList', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("accessToken")

                    }
                });
                console.log(data);
                setRoleList(data.data);
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
        setLoading(true);
        console.log(values)
        try {
            const { data } = await axios.post('http://localhost:8001/api/v1/userRouter/create', values, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("accessToken")
                }
            });
            notification('Successful', `New user Created successfully`, 'success');
            setLoading(false)
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
                <h1 style={{ fontSize: '20px', textAlign: 'center', fontWeight: 'bold' }}>User Creation</h1>
                <br />
                <br />
                <Row>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 0 }}>
                        <div>
                            <h5 className="required" style={{ fontWeight: 'bold', color: '#004F9F', fontSize: '12px', }}> Full Name </h5>
                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: 'type here' }]} >
                                <Input placeholder="enter name.." />
                            </Form.Item>
                        </div>
                        <div>
                            <h5 className="required" style={{ fontWeight: '600', color: '#004F9F', fontSize: '12px' }}>Email</h5>
                        
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                        {
                                            validator: (_, value) =>
                                              !allEmail.includes(value) ? Promise.resolve() : Promise.reject('Email Already Exists'),
                                          },
                                    ]}
                                >
                                    <Input placeholder="enter email.."/>
                                </Form.Item>
                        </div>
                        <div>
                            <h5 className="required" style={{ fontWeight: '600', color: '#004F9F', fontSize: '12px' }}>Password</h5>
                            <Form.Item
                                name="pass"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>
                        </div>
                        <div>
                            <h5 className="required" style={{ fontWeight: 'bold', color: '#004F9F', fontSize: '12px', }}> Phone Number </h5>
                            <Form.Item
                                name="phone_number"
                                rules={[{ required: true, message: 'type here' }]} >
                                <Input placeholder="enter number.." />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 1 }}>
                        <h5 className="required" style={{ fontWeight: '600', color: '#004F9F', fontSize: '12px' }}> Role </h5>
                        <Form.Item name="role_id" rules={[{ required: true, message: 'Please select typpe!' }]}>
                            <Select
                                    placeholder="Role Selection"
                                    style={{ width: "100%" }}
                                    allowClear
                                    showSearch
                                    showArrow
                                    optionFilterProp="children"
                            >
                                {roleList?.map((v, i) => (
                                    <Option value={v.id} key={v.id}>
                                         {v.role_name}
                                    </Option>
                                ))}
                           
                            </Select>
                        </Form.Item>
                        <h5 className="required" style={{ fontWeight: '600', color: '#004F9F', fontSize: '12px' }}> Username </h5>
                        <Form.Item name="username" 
                            rules={[
                                {
                             required: true, message: 'Please select typpe!' 
                             },
                             {
                                validator: (_, value) =>
                                  !allUsers.includes(value) ? Promise.resolve() : Promise.reject('User name Already exists'),
                              },
                             ]}>
                            <Input placeholder="enter username.."/>
                        </Form.Item>
                        <div>
                            <h5 className="required" style={{ fontWeight: 'bold', color: '#004F9F', fontSize: '12px', }}> Position </h5>
                            <Form.Item
                                name="position"
                                rules={[{ required: true, message: 'type here' }]} >
                                <Input placeholder="enter position.." />
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

export default UserCreate;