import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Input, Row, Col, Select, DatePicker, Button } from 'antd';
import notification from "../../util/Notification/Notification";
import ErrorHandler from '../../util/ErrorHandler/ErrorHandler'
import axios from 'axios';

// import './CampaignCreate.scss';

const { Option } = Select;

const { RangePicker } = DatePicker;

const UserUpdate = () => {

    let history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [roleList, setRoleList] = useState([]);
    const { id } = useParams();
    const [ allUsers, setAllUsers ] = useState([]);

    useEffect(() => {

        document.title = 'User Create';
        window.scrollTo(0, 0);

    }, []);

    useEffect(() => {
        fetchConfiguration();
      }, []);

    const fetchConfiguration = async() => {
            try {
                setLoading(true);
                const { data } = await axios.get(`http://localhost:8001/api/v1/userRouter/getUser/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("accessToken")

                    }
                });
                console.log(data);
              let user = data?.data[0];
              form.setFieldsValue({
                name: user?.name,
                email: user?.email,
                position: user?.position,
                phone_number: user?.phone_number,
                role_id: user?.role_id,
                username: user?.username

              })
                setLoading(false);
            } catch (error) {
                if (error?.response?.data?.message) {
                    ErrorHandler(error?.response?.data?.message, history);
                    notification(error?.response?.data?.message, 'Please fix this error and try again. Otherwise communicate with the admin', 'error');
                } else {
                    notification('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
                }
            }
        }

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
        console.log(values);
        values.id= id;
        try {
            const { data } = await axios.post('http://localhost:8001/api/v1/userRouter/update', values, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("accessToken")
                }
            });
            notification('Successful', `User updated successfully`, 'success');
            setLoading(false)
            history.push('/manager/user/list')

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
                <h1 style={{ fontSize: '20px', textAlign: 'center', fontWeight: 'bold' }}>User Update</h1>
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
                                    ]}
                                >
                                    <Input placeholder="enter email.."/>
                                </Form.Item>
                        </div>
                        {/* <div>
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
                        </div> */}
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
                        <Form.Item name="username" rules={[{ required: true, message: 'Please select typpe!' }]}>
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
                               Update Data
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default UserUpdate;