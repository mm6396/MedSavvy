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
			await AuthAPI.post('/reset-password', { password: values.password, token: token });
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
			<Header className="login-header">
				<Link to='/manager' className="logo-link" >
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
						<img className="app_logo" src={Logo} height="50px" alt="logo" />
						{/* <p style={{ fontWeight: 'bold', color: '#004f9f', fontSize: '20px', margin: '0' }}>
							Prism CRM
                  		</p> */}
					</div>
				</Link>
				<div className="systemlogin-text">System Login</div>
			</Header>
			<div className="head-divider"><Divider /></div>
			<Content>
				<div><img className="img_tree" src={Tree} alt="login-tree" /></div>
				<Form
					layout="vertical"
					form={form}
					name="normal_login"
					className="login-form"
					onFinish={onFinish}
				>
					<div className="systemlogin-mbl">System Login</div>
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
				</Form>
			</Content>
			<CommonFooter />
			{/* <Footer style={{ textAlign: 'center', fontSize: '12px' }}><span><CopyrightOutlined /></span> v2 Technologies LTD-2020</Footer> */}
		</Layout>
	)
}

export default ResetPasswordView
