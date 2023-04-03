import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Input, Select, Table, Alert, Spin, Checkbox } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import notificationFun from '../../../util/Notification/Notification';
import ErrorHandler from '../../../util/ErrorHandler/ErrorHandler';
import { useHistory, useParams } from 'react-router-dom';
import { RoleManagerAPI, FieldForceManagerAPI } from '../../../util/ApiGateway/Api';

const { Option } = Select;

const UpdateDashboard = () => {

    let history = useHistory()
    const { id } = useParams();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([])

    useEffect(() => {

        document.title = 'ECRM: Dashboard Update';
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const { data } = await RoleManagerAPI.get('/get-role-list', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("accessToken")
                    }
                });
                // console.log(data);
                setRoles([...data.response.filter(i => i.name != 'BR' && i.id != parseInt(localStorage.getItem('userRole')))]);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                if (error?.response?.data?.message) {
                    ErrorHandler(error?.response?.data?.message, history);
                } else {
                    notificationFun('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
                }
            }
        })();
    }, []);

    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const { data } = await FieldForceManagerAPI.get(`/dashboard/get/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("accessToken")
                    }
                });
                form.setFieldsValue({
                    roles: data.dashboard.roles.filter(i => i != parseInt(localStorage.getItem('userRole'))),
                    dashboard_name: data.dashboard.name,
                    dashboard_description: data.dashboard.description,
                    input_link: data.dashboard.link
                })

                console.log('/dashboard/get/' , data);

                setLoading(false);
            } catch (error) {
                setLoading(false);
                if (error?.response?.data?.message) {
                    ErrorHandler(error?.response?.data?.message, history);
                } else {
                    notificationFun('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
                }
            }
        })();
    }, []);

    const onFinish = async (value) => {

        let loggedinUserRole = parseInt(localStorage.getItem('userRole'));
        // value.roles.push(loggedinUserRole);

        console.log('on fininsh', value);

        try {
            setLoading(true);
            const { data } = await FieldForceManagerAPI.patch(`/dashboard/update/${id}`, { ...value, roles: [...value.roles, loggedinUserRole] }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("accessToken")
                }
            });
            console.log('/dashboard/update/', data);
            notificationFun('Done!', 'Updated successfully', 'success');
            setLoading(false);
            history.push('/manager/dashboard-manager/list')
        } catch (error) {
            setLoading(false);
            if (error?.response?.data?.message) {
                ErrorHandler(error?.response?.data?.message, history);
            } else {
                notificationFun('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
            }
        }
    };

    return (
        <div>
            <Spin spinning={loading}  size='large'>
                <p style={{ fontWeight: "600", fontSize: "25px", margin: "0 0 30px 0" }}>Update Dashboard</p>
                <Form onFinish={onFinish} form={form}>
                    <Row>
                        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 8, offset: 0 }}>
                            <h4 className="required" type="primary" style={{ fontWeight: '600' }}> Role</h4>
                            <Form.Item name="roles" rules={[{ required: true, message: 'please select roles' }]}>

                                <Select
                                    placeholder="Please select role"
                                    style={{ width: '100%' }} mode='multiple' allowClear showArrow>
                                    {roles.map((v, i) => <Option value={v.id} key={i}> {v.name} </Option>)}
                                </Select>

                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 8, offset: 1 }}>
                            <h4 className="required" style={{ fontWeight: '600' }}> Dashboard Name </h4>
                            <Form.Item
                                name="dashboard_name"
                                rules={[{ required: true, message: 'type dashboard name' }]} >
                                <Input
                                    placeholder="Enter dashboard name..."
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 10, offset: 0 }}>
                            <h4 className="required" style={{ fontWeight: '600' }}>Description</h4>
                            <Form.Item name="dashboard_description" rules={[{ required: true, message: 'Enter description' }]}  >
                                <Input.TextArea
                                    rows="5"
                                    placeholder="Input dashboard description...."
                                />
                            </Form.Item>

                        </Col>
                       
                        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 22, offset: 0 }}>
                            <br />
                            <h4 className="required" style={{ fontWeight: '600' }}> Dashboard Link </h4>
                            <Form.Item name="input_link" rules={[{ required: true, message: 'Input Link' }]}  >
                                <Input.TextArea
                                    style={{ overflow: 'auto' }}
                                    rows="5"
                                    placeholder="Input link..."
                                />
                            </Form.Item>

                        </Col>
                    </Row>
                    <br />
                    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                        <Button htmlType="submit" type='primary' shape="round" style={{ display: 'flex', alignItems: 'center' }} > Update Dashboard  {loading && <LoadingOutlined />}</Button>
                    </div>
                </Form>
            </Spin>
        </div>
    );
};

export default UpdateDashboard;