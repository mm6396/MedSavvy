import React, { useEffect, useState } from 'react';
import { Form, Input, Row, Col, Select, Button, Checkbox } from 'antd';
import { CloudUploadOutlined, LoadingOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom';
import notification from "../../../util/Notification/Notification";
import ErrorHandler from "../../../util/ErrorHandler/ErrorHandler";
import './RoleCreate.scss';
import axios from 'axios';


const { Option } = Select;

const RoleCreate = () => {

    let history = useHistory();
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [accesses, setAccesses] = useState();

    useEffect(() => {

        document.title = 'Creating Role';
        window.scrollTo(0, 0);

    }, []);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`http://localhost:8001/api/v1/userRouter/role-access-list`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("accessToken")
                    }
                });
                setAccesses(data.accesses);

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

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const { data } = await RoleManagerAPI.get('/get-role-list', {
    //                 headers: {
    //                     Authorization: 'Bearer ' + localStorage.getItem("accessToken")
    //                 }
    //             });
    //             setRoles([...data.response]);

    //         } catch (error) {
    //             if (error?.response?.data?.message) {
    //                 ErrorHandler(error?.response?.data?.message, history);
    //                 notification(error?.response?.data?.message, 'Please fix this error and try again. Otherwise communicate with the admin', 'error');
    //             } else {
    //                 notification('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
    //             }
    //         }
    //     })();
    // }, []);


    const onFinish = async (values) => {
        console.log(values);
        setLoading(true)
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
                        <Form.Item name="isFF" valuePropName="checked">
                            <Checkbox style={{ fontWeight: 'bold', color: '#004F9F', fontSize: '13px' }}>Surevy Conductor</Checkbox>
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

                <Row>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }}>
                        <h5 style={{ fontWeight: 'bold', color: '#004F9F', fontSize: '13px' }}> Description </h5>

                        <Form.Item name="role_description" >
                            <Input.TextArea rows="7" placeholder="Type here" />
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
    );
}

export default RoleCreate;