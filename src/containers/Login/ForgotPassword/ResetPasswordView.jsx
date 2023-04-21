import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Layout, Divider } from 'antd';
import { CopyrightOutlined, LoadingOutlined } from '@ant-design/icons';
import { useHistory, useParams, Link } from 'react-router-dom';

import { AuthAPI } from '../../../util/ApiGateway/Api';
import notification from '../../../util/Notification/Notification';
import ErrorHandler from '../../../util/ErrorHandler/ErrorHandler'

import Logo from '../../../assets/Images/ecrmLogoTemp.png';
// import white from '../../../assets/Images/Unload.png';

import Tree from '../../../assets/Images/login-tree.svg';
import CommonFooter from '../../../util/Footer/Footer';
import Nav from '../../../components/common/Nav/Nav';
import axios from 'axios';

const { Header, Content, Footer } = Layout;

const ResetPasswordView = () => {
	const [form] = Form.useForm();
	const { token } = useParams();
	let history = useHistory();
	const [loading, setLoading] = useState(false);

	useEffect(() => {

		document.title = 'Prism CRM Reset Password';
		window.scrollTo(0, 0);
	}, []);

	const onFinish = async (values) => {
		try {
			setLoading(true);
			await axios.post('http://localhost:8001/api/v1/auth/reset-password', { password: values.password, token: token },
			{
				headers: {
				  Authorization: "Bearer " + token,
				},
			},
			);
			notification('Done!', 'Password Changed Successfully', 'success');
			setLoading(false);
			history.push('/login');
		} catch (error) {
			if (error?.response?.data?.message) {
				ErrorHandler(error?.response?.data?.message, history);
				notification(error?.response?.data?.message, 'Please enter correct Password', 'error');
				form.setFieldsValue({
					password: '',
					confirm: ''
				});
				setLoading(false);
			} else {
				notification("Something went wrong", 'Please check your connection', 'error');
				form.setFieldsValue({
					password: '',
					confirm: ''
				});
				setLoading(false);
			}
		}
	}

	return (
		<Layout className="login-layout" style={{ height: '100vh' }}>
			<Nav auth = 'true'/>
			<Content>
				<Form
					layout="vertical"
					form={form}
					name="normal_login"
					className="login-form"
					onFinish={onFinish}
				>
					<Form.Item
						name="password"
						label="New Password"

						rules={[
							{
								required: true,
								message: 'Please input your password!',
							},
							{
                                pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                message: 'Minimum 8 character with an upper case, lower case, symbol, number.'
                            }
						]}
						hasFeedback
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						name="confirm"
						label="Confirm New Password"
						dependencies={['password']}
						hasFeedback
						rules={[
							{
								required: true,
								message: 'Please confirm your password!',
							},
							({ getFieldValue }) => ({
								validator(rule, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve();
									}
									return Promise.reject('The two passwords that you entered do not match!');
								},
							}),
						]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item>
						<Button type="primary" disabled={loading} htmlType="submit" className="login-form-button">
							{loading && <LoadingOutlined />} Change Password
                     </Button>
					</Form.Item>
					<div style={{ textAlign: "center" }} >
						<Link className="log_btn" style={{}} to="/login" >
							Go Back to Login
						</Link>
					</div>
				</Form>
			</Content>
			<CommonFooter />
			{/* <Footer style={{ textAlign: 'center', fontSize: '12px' }}><span><CopyrightOutlined /></span> v2 Technologies LTD-2020</Footer> */}
		</Layout>
	)
}

export default ResetPasswordView
