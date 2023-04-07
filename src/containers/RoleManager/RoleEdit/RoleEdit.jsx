import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Input, Row, Col, Select, Button, Checkbox } from 'antd';
import { CloudUploadOutlined, LoadingOutlined } from '@ant-design/icons'
import notification from "../../../util/Notification/Notification";
import ErrorHandler from "../../../util/ErrorHandler/ErrorHandler";
import './RoleEdit.scss';
import axios from 'axios';
import { Spin } from 'antd/lib';


const { Option } = Select;
const RoleEdit = () => {

    let history = useHistory();
    const [form] = Form.useForm();
    let { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [accesses, setAccesses] = useState();

    useEffect(() => {

        document.title = 'Creating Role';
        window.scrollTo(0, 0);

    }, []);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`http://localhost:8001/api/v1/userRouter/role-access-list`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("accessToken")
                    }
                });
                setAccesses(data?.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                if (error?.response?.data?.message) {
                    ErrorHandler(error?.response?.data?.message, history);
                    notification(error?.response?.data?.message, 'Please fix this error and try again. Otherwise communicate with the admin', 'error');
                } else {
                    notification('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
                }
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`http://localhost:8001/api/v1/userRouter/getRole/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("accessToken")
                    }
                });
                console.log(data);
                let user = data?.data[0];
                form.setFieldsValue({
                    role_name: user?.role_name,
                    role_description: user?.role_description,
                    permission_page: user?.permission_page

                })
                setLoading(false);
            } catch (error) {
                setLoading(false);
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
        values.roleid = id;
        console.log(values);
        setLoading(true)
        try {
            const { data } = await axios.post('http://localhost:8001/api/v1/userRouter/update-role', values, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("accessToken")
                }
            });
            notification('Successful', `New user Created successfully`, 'success');
            setLoading(false);
            history.push('/manager/role/list');

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
        <Spin spinning={loading}>
            <div className="rolecreate-div">

                <Form
                    //   {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    form={form}
                >

                    <Row>
                        <Col xs={{ span: 12, offset: 0 }} lg={{ span: 11, offset: 0 }}>
                            <h5 className='required' style={{ fontWeight: 'bold', color: '#004F9F', fontSize: '13px' }}>
                                Role Name
                                {/* <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    Role Name
                </div> */}
                            </h5>

                            <Form.Item
                                // label="Username"
                                name="role_name"
                                rules={[{ required: true, message: 'Please input role name' }]} >

                                <Input placeholder="Type here" />

                            </Form.Item>
                            {/* <Form.Item name="isFF" valuePropName="checked">
                <Checkbox style={{ fontWeight: 'bold', color: '#004F9F', fontSize: '13px' }}>Surevy Conductor</Checkbox>
            </Form.Item> */}

                            <h5 style={{ fontWeight: 'bold', color: '#004F9F', fontSize: '13px' }}> Description </h5>

                            <Form.Item name="role_description" >
                                <Input.TextArea rows="5" placeholder="Type here" />
                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 12, offset: 1 }} lg={{ span: 12, offset: 1 }}>
                            <h5 className="required" style={{ fontWeight: '600', color: '#004F9F', fontSize: '12px' }}> Permission for Views</h5>
                            <Form.Item name="permission_page" rules={[{ required: true, message: 'Please select typpe!' }]}>
                                <Select
                                    placeholder="Access Selection"
                                    style={{ width: "100%" }}
                                    allowClear
                                    showSearch
                                    showArrow
                                    optionFilterProp="children"
                                    mode="multiple"
                                >
                                    {accesses?.map((v, i) => (
                                        <Option value={v.id} key={v.id}>
                                            {v.permission_page}
                                        </Option>
                                    ))}

                                </Select>
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row justify={'center'} className="button-row" style={{ margin: '50px 0 0 0', padding: '24px 0 0 0' }}>
                        <Col >
                            <Form.Item >
                                <Button className="save-btn" shape="round" htmlType="submit">
                                    Submit Data
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </div>
        </Spin>
    );
}

export default RoleEdit;