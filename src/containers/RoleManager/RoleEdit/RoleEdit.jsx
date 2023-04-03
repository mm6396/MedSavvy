import React, { useEffect, useState } from 'react';
import { Form, Input, Row, Col, Select, Button, Checkbox, Spin } from 'antd';
import { PlusCircleOutlined, CloudUploadOutlined, LoadingOutlined } from '@ant-design/icons'
import { useHistory, useParams } from 'react-router-dom';
import notification from "../../../util/Notification/Notification";
import ErrorHandler from "../../../util/ErrorHandler/ErrorHandler";
import './RoleEdit.scss';

import { RoleManagerAPI } from '../../../util/ApiGateway/Api';


const { Option } = Select;



const RoleEdit = () => {

    let history = useHistory();
    const { id } = useParams();
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [accesses, setAccesses] = useState();
    const [roles, setRoles] = useState([]);


    // const [role, setRole] = useState({ name: "", description: "", user: [], role: [], location: [], campaign: [], ff: [], report: [], scv: [], platform: [] });

    useEffect(() => {

        document.title = 'Prism CRM Update Role';
        window.scrollTo(0, 0);

    }, []);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await RoleManagerAPI.get(`/access-list`, {
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

    useEffect(() => {
        (async () => {
            try {
                const { data } = await RoleManagerAPI.get('/get-role-list', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("accessToken")
                    }
                });
                setRoles([...data.response.filter(i => localStorage.getItem('roleAccess').split(',').map(i => Number(i)).includes(i.id))]);

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

    useEffect(() => {
        (async () => {
            try {
                if (accesses) {
                    const { data } = await RoleManagerAPI.get(`/get-role/${id}`, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem("accessToken")
                        }
                    });
                    console.log('ACCESS EDIT', data.response)
                    form.setFieldsValue({
                        name: data.response.name,
                        description: data.response.description,
                        user_manager: data.response.user?.split(",").map(v => Number(v)) || [],
                        role_manager: data.response.role?.split(",").map(v => Number(v)) || [],
                        location_manager: data.response.location?.split(",").map(v => Number(v)) || [],
                        campaign_manager: data.response.campaign?.split(",").map(v => Number(v)) || [],
                        ff_manager: data.response.ff?.split(",").map(v => Number(v)) || [],
                        rpt_manager: data.response.report?.split(",").map(v => Number(v)) || [],
                        scv_manager: data.response.scv?.split(",").map(v => Number(v)) || [],
                        role_access_manager: data.response.role_access?.split(",").map(v => Number(v)) || [],
                        noti_manager: data.response.notification?.split(",").map(v => Number(v)) || [],
                        hr_manager: data.response.hr?.split(",").map(v => Number(v)) || [],
                        dashboard_manager: data.response.dashboard?.split(",").map(v => Number(v)) || [],
                        training_manager: data.response.training?.split(",").map(v => Number(v)) || [],
                        va: data.response.va?.split(",").map(v => Number(v)) || [],
                        call_center: data.response.call_center?.split(",").map(v => Number(v)) || [],
                        plat_manager: data.response.platform,
                        isFF: data.response.is_ff
                    });
                }
            } catch (error) {
                if (error?.response?.data?.message) {
                    ErrorHandler(error?.response?.data?.message, history);
                    notification(error?.response?.data?.message, 'Please fix this error and try again. Otherwise communicate with the admin', 'error');
                } else {
                    notification('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
                }
            }
        })();
    }, [accesses]);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            if ((!values.campaign_manager || values.campaign_manager.length < 1) && (!values.ff_manager || values.ff_manager.length < 1) && (!values.location_manager || values.location_manager.length < 1) && (!values.role_manager || values.role_manager.length < 1) && (!values.user_manager || values.user_manager.length < 1) && (!values.rpt_manager || values.rpt_manager.length < 1) && (!values.scv_manager || values.scv_manager.length < 1) && (!values.plat_manager) && (!values.role_access_manager || values.role_access_manager.length < 1) && (!values.noti_manager || values.noti_manager.length < 1) && (!values.hr_manager || values.hr_manager.length < 1) && (!values.dashboard_manager || values.dashboard_manager.length < 1) && (!values.training_manager || values.training_manager.length < 1) && (!values.va || values.va.length < 1) && (!values.call_center || values.call_center.length < 1)) {
                notification('Error', 'Please select at least one manager access', 'error');
            } else {
                const { data } = await RoleManagerAPI.post('/update-role', { id: id, name: values.name, description: values.description, user: values.user_manager?.map(i => Number(i)) || [], role: values.role_manager?.map(i => Number(i)) || [], campaign: values.campaign_manager?.map(i => Number(i)) || [], location: values.location_manager?.map(i => Number(i)) || [], ff: values.ff_manager?.map(i => Number(i)) || [], report: values.rpt_manager?.map(i => Number(i)) || [], scv: values.scv_manager?.map(i => Number(i)) || [], platform: values.plat_manager, role_access: values.role_access_manager?.map(i => Number(i)) || [], notification: values.noti_manager?.map(i => Number(i)) || [], hr: values.hr_manager?.map(i => Number(i)) || [], dashboard: values.dashboard_manager?.map(i => Number(i)) || [], training: values.training_manager?.map(i => Number(i)) || [], va: values.va?.map(i => Number(i)) || [], call_center: values.call_center?.map(i => Number(i)) || [], isFF: values.isFF }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("accessToken")
                    }
                });
                notification('Successful', data, 'success');
                history.push('/manager/role/list');
            }
            setLoading(false);
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

    const selectAll = (value, state, event) => {
        // console.log('value', v)
        if (event.includes("all")) {
            // obj['region'] = region.map(v => v.id);
            // value = region.map(v => v.id)

            if (value === 'user_manager') {
                form.setFieldsValue({ [value]: state.user.map(i => i.id) })
            } else if (value === 'role_manager') {
                form.setFieldsValue({ [value]: state.role.map(i => i.id) })
            } else if (value === 'location_manager') {
                form.setFieldsValue({ [value]: state.location.map(i => i.id) })
            } else if (value === 'campaign_manager') {
                form.setFieldsValue({ [value]: state.campaign.map(i => i.id) })
            } else if (value === 'ff_manager') {
                form.setFieldsValue({ [value]: state.ff.map(i => i.id) })
            } else if (value === 'rpt_manager') {
                form.setFieldsValue({ [value]: state.report.map(i => i.id) })
            } else if (value === 'scv_manager') {
                form.setFieldsValue({ [value]: state.scv.map(i => i.id) })
            } else if (value === 'noti_manager') {
                form.setFieldsValue({ [value]: state.notification.map(i => i.id) })
            } else if (value === 'hr_manager') {
                form.setFieldsValue({ [value]: state.hr.map(i => i.id) })
            } else if (value === 'role_access_manager') {
                form.setFieldsValue({ [value]: state.map(i => i.id) })
            } else if (value === 'dashboard_manager') {
                form.setFieldsValue({ [value]: state.dashboard.map(i => i.id) })
            } else if (value === 'training_manager') {
                form.setFieldsValue({ [value]: state.training.map(i => i.id) })
            } else if (value === 'va') {
                form.setFieldsValue({[value]: state.va.map(i => i.id)})
            }else if (value === 'call_center') {
                form.setFieldsValue({[value]: state.call_center.map(i => i.id)})
            }
        }
    }


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
                        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }}>
                            <h5 style={{ fontWeight: 'bold', color: '#004F9F' }}> Role Name </h5>

                            <Form.Item
                                // label="Username"
                                name="name"
                                rules={[{ required: true, message: 'type here' }]} >

                                <Input placeholder="Type here" />

                            </Form.Item>
                            <Form.Item name="isFF" valuePropName="checked">
                                <Checkbox>Is Field Force</Checkbox>
                            </Form.Item>
                        </Col>


                    </Row>

                    <Row>
                        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }}>
                            <h5 style={{ fontWeight: 'bold', color: '#004F9F' }}> Description </h5>

                            <Form.Item name="description" rules={[{ required: true, message: 'type here' }]}  >
                                <Input.TextArea rows="7" placeholder="Type here" />
                            </Form.Item>
                        </Col>
                    </Row>



                    <h5 style={{ fontWeight: 'bold', color: '#004F9F', fontSize: '13px' }}> CRUDE Selection </h5>

                    <Row style={{ margin: '20px 0 0 0' }}  >

                        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 5, offset: 0 }}>

                            <h5 style={{ fontWeight: 'bold', color: '#E72582', fontSize: '12px' }}> User Manager </h5>

                            <Form.Item name="user_manager">
                                <Select mode="multiple" allowClear showArrow
                                    style={{ width: '100%' }} placeholder="Type or select..."
                                    onChange={e => selectAll('user_manager', accesses, e)}
                                    maxTagCount={2}
                                >

                                    <Option value={"all"}>Select All</Option>
                                    {accesses?.user?.map(v => <Option value={v.id} key={v.id} style={{ textTransform: "capitalize" }}>{v.name}</Option>)}

                                </Select>
                            </Form.Item>



                        </Col>

                        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 5, offset: 1 }}>

                            <h5 style={{ fontWeight: 'bold', color: '#E72582', fontSize: '12px' }}> Role Manager </h5>


                            <Form.Item name="role_manager">

                                <Select mode="multiple" allowClear showArrow maxTagCount={2}
                                    style={{ width: '100%' }} placeholder="Type or select..."
                                    onChange={e => selectAll('role_manager', accesses, e)}
                                >

                                    <Option value={"all"}>Select All</Option>
                                    {accesses?.role?.map(v => <Option value={v.id} key={v.id} style={{ textTransform: "capitalize" }}>{v.name}</Option>)}

                                </Select>

                            </Form.Item>


                        </Col>

                        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 5, offset: 1 }}>

                            <h5 style={{ fontWeight: 'bold', color: '#E72582', fontSize: '12px' }}> Location Manager </h5>


                            <Form.Item name="location_manager">
                                <Select mode="multiple" allowClear showArrow maxTagCount={2}
                                    style={{ width: '100%' }} placeholder="Type or select..."
                                    onChange={e => selectAll('location_manager', accesses, e)}
                                >

                                    <Option value={"all"}>Select All</Option>
                                    {accesses?.location?.map(v => <Option value={v.id} key={v.id} style={{ textTransform: "capitalize" }}>{v.name}</Option>)}

                                </Select>
                            </Form.Item>


                        </Col>

                        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 5, offset: 1 }}>

                            <h5 style={{ fontWeight: 'bold', color: '#E72582', fontSize: '12px' }}> Campaign Manager </h5>


                            <Form.Item name="campaign_manager">
                                <Select mode="multiple" allowClear showArrow maxTagCount={2}
                                    style={{ width: '100%' }} placeholder="Type or select..."
                                    onChange={e => selectAll('campaign_manager', accesses, e)}
                                >

                                    <Option value={"all"}>Select All</Option>
                                    {accesses?.campaign?.map(v => <Option value={v.id} key={v.id} style={{ textTransform: "capitalize" }}>{v.name}</Option>)}

                                </Select>
                            </Form.Item>


                        </Col>

                    </Row>

                    <Row style={{ margin: '50px 0 0 0' }}  >
                        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 5, offset: 0 }}>

                            <h5 style={{ fontWeight: 'bold', color: '#E72582', fontSize: '12px' }}> FF Manager </h5>

                            <Form.Item name="ff_manager">
                                <Select mode="multiple" allowClear showArrow maxTagCount={2}
                                    style={{ width: '100%' }} placeholder="Type or select..."
                                    onChange={e => selectAll('ff_manager', accesses, e)}
                                >

                                    <Option value={"all"}>Select All</Option>
                                    {accesses?.ff?.map(v => <Option value={v.id} key={v.id} style={{ textTransform: "capitalize" }}>{v.name}</Option>)}

                                </Select>
                            </Form.Item>


                        </Col>

                        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 5, offset: 1 }}>

                            <h5 style={{ fontWeight: 'bold', color: '#E72582', fontSize: '12px' }}> Report Manager </h5>

                            <Form.Item name="rpt_manager">
                                <Select mode="multiple" allowClear showArrow maxTagCount={2}
                                    style={{ width: '100%' }} placeholder="Type or select..."
                                    onChange={e => selectAll('rpt_manager', accesses, e)}
                                >

                                    <Option value={"all"}>Select All</Option>
                                    {accesses?.report?.map(v => <Option value={v.id} key={v.id} style={{ textTransform: "capitalize" }}>{v.name}</Option>)}

                                </Select>
                            </Form.Item>


                        </Col>

                        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 5, offset: 1 }}>

                            <h5 style={{ fontWeight: 'bold', color: '#E72582', fontSize: '12px' }}> Audience Manager </h5>

                            <Form.Item name="scv_manager">
                                <Select mode="multiple" allowClear showArrow maxTagCount={2}
                                    style={{ width: '100%' }} placeholder="Type or select..."
                                    onChange={e => selectAll('scv_manager', accesses, e)}
                                >

                                    <Option value={"all"}>Select All</Option>

                                    {accesses?.scv?.map(v => <Option value={v.id} key={v.id} style={{ textTransform: "capitalize" }}>{v.name}</Option>)}

                                </Select>
                            </Form.Item>


                        </Col>

                        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 5, offset: 1 }}>

                            <h5 style={{ fontWeight: 'bold', color: '#E72582', fontSize: '12px' }}> Notification Manager </h5>

                            <Form.Item name="noti_manager">
                                <Select mode="multiple" allowClear showArrow maxTagCount={2}
                                    style={{ width: '100%' }} placeholder="Type or select..."
                                    onChange={e => selectAll('noti_manager', accesses, e)}
                                >

                                    <Option value={"all"}>Select All</Option>

                                    {accesses?.notification?.map(v => <Option value={v.id} key={v.id} style={{ textTransform: "capitalize" }}>{v.name}</Option>)}

                                </Select>
                            </Form.Item>


                        </Col>


                    </Row>

                    <Row style={{ margin: '50px 0 0 0' }}>
                        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 5, offset: 0 }}>

                            <h5 style={{ fontWeight: 'bold', color: '#E72582', fontSize: '12px' }}> HR Manager </h5>

                            <Form.Item name="hr_manager">
                                <Select mode="multiple" allowClear showArrow onChange={e => selectAll('hr_manager', accesses, e)}
                                    style={{ width: '100%' }} placeholder="Type or select..." maxTagCount={2}  >

                                    <Option value={"all"}>Select All</Option>
                                    {accesses?.hr?.map(v => <Option value={v.id} key={v.id} style={{ textTransform: "capitalize" }}>{v.name}</Option>)}

                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 5, offset: 1 }}>
                            <h5 style={{ fontWeight: 'bold', color: '#E72582', fontSize: '12px' }}> Dashboard Manager </h5>
                            <Form.Item name="dashboard_manager">
                                <Select mode="multiple" allowClear showArrow onChange={e => selectAll('dashboard_manager', accesses, e)}
                                    style={{ width: '100%' }} placeholder="Type or select..." maxTagCount={2}  >

                                    <Option value={"all"}>Select All</Option>
                                    {accesses?.dashboard?.map(v => <Option value={v.id} key={v.id} style={{ textTransform: "capitalize" }}>{v.name}</Option>)}

                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 5, offset: 1 }}>
                            <h5 style={{ fontWeight: 'bold', color: '#E72582', fontSize: '12px' }}> Training Manager </h5>
                            <Form.Item name="training_manager">
                                <Select mode="multiple" allowClear showArrow onChange={e => selectAll('training_manager', accesses, e)}
                                    style={{ width: '100%' }} placeholder="Type or select..." maxTagCount={2}  >

                                    <Option value={"all"}>Select All</Option>
                                    {accesses?.training?.map(v => <Option value={v.id} key={v.id} style={{ textTransform: "capitalize" }}>{v.name}</Option>)}

                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 5, offset: 1 }}>
                            <h5 style={{ fontWeight: 'bold', color: '#E72582', fontSize: '12px' }}> Audit AI </h5>
                            <Form.Item name="va">
                                <Select mode="multiple" allowClear showArrow onChange={e => selectAll('va', accesses, e)}
                                    style={{ width: '100%' }} placeholder="Type or select..." maxTagCount={2}  >

                                    <Option value={"all"}>Select All</Option>
                                    {accesses?.va?.map(v => <Option value={v.id} key={v.id} style={{ textTransform: "capitalize" }}>{v.name}</Option>)}

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 5, offset: 0 }}>
                        <h5 style={{ fontWeight: 'bold', color: '#E72582', fontSize: '12px' }}> Call Center Manager </h5>
                        <Form.Item name="call_center">
                            <Select mode="multiple" allowClear showArrow onChange={e => selectAll('call_center', accesses, e)}
                                style={{ width: '100%' }} placeholder="Type or select..." maxTagCount={2}  >

                                <Option value={"all"}>Select All</Option>
                                {accesses?.call_center?.map(v => <Option value={v.id} key={v.id} style={{ textTransform: "capitalize" }}>{v.name}</Option>)}

                            </Select>
                        </Form.Item>
                    </Col>

                    </Row>

                    <h5 style={{ fontWeight: 'bold', color: '#004F9F', fontSize: '13px' }}> Access Type </h5>

                    <Row style={{ margin: '20px 0 0 0' }}  >

                        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 5, offset: 0 }}>

                            <h5 style={{ fontWeight: 'bold', color: '#E72582', fontSize: '12px' }}> Platform Manager </h5>

                            <Form.Item name="plat_manager" style={{ textTransform: "capitalize" }}>
                                <Select allowClear showArrow
                                    style={{ width: '100%' }} placeholder="Type or select..."
                                >
                                    <Option value={0}>Web</Option>
                                    <Option value={1}>App</Option>
                                    <Option value={2}>Both</Option>

                                </Select>
                            </Form.Item>


                        </Col>

                        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 5, offset: 1 }}>

                            <h5 style={{ fontWeight: 'bold', color: '#E72582', fontSize: '12px' }}> Role Access Manager </h5>

                            <Form.Item name="role_access_manager">
                                <Select mode="multiple" allowClear showArrow maxTagCount={2}
                                    style={{ width: '100%' }} placeholder="Type or select..."
                                    onChange={e => selectAll('role_access_manager', roles, e)}
                                >

                                    <Option value={"all"}>Select All</Option>
                                    {roles.map((v, i) => <Option value={v.id} key={i}>{v.name}</Option>)}

                                </Select>
                            </Form.Item>


                        </Col>


                    </Row>

                    <Row style={{ margin: '50px 0 0 0', backgroundColor: 'white', padding: '24px 0 0 0' }} >

                        {/* <Col xs={{ span: 24, offset: 0 }} md={{ span: 8, offset: 5 }} lg={{ span: 6, offset: 6 }}>
                                                    <Form.Item >
                                                            <Button className="add-btn" shape="round" icon={<PlusCircleOutlined />} size="middle" htmlType="submit" disabled={loading} onClick={() => setAnother(true)}>
                                                                    Save & Create another Role {loading && <LoadingOutlined />}
                                                            </Button>
                                                    </Form.Item>

                                            </Col> */}

                        {/* <Col xs={{ span: 24, offset: 7 }} md={{ span: 8, offset: 0 }} lg={{ span: 10, offset: 0 }}> */}

                        <Form.Item>
                            <Button className="save-btn" shape="round" icon={<CloudUploadOutlined />} htmlType="submit" disabled={loading}>
                                Update {loading && <LoadingOutlined />}
                            </Button>
                        </Form.Item>

                        {/* </Col> */}

                    </Row>

                </Form>
            </div>
        </Spin>
    );
}

export default RoleEdit;