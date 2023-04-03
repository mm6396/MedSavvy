import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Layout, Divider } from 'antd';
import { MailOutlined, CopyrightOutlined, LoadingOutlined } from '@ant-design/icons';
import { useHistory, Link } from 'react-router-dom';

import { AuthAPI } from '../../../util/ApiGateway/Api';
import notification from '../../../util/Notification/Notification';
import ErrorHandler from '../../../util/ErrorHandler/ErrorHandler'

import Logo from '../../../assets/Images/ecrmLogoTemp.png';
// import white from '../../../assets/Images/Unload.png';

import Tree from '../../../assets/Images/login-tree.svg';
import CommonFooter from '../../../util/Footer/Footer';

const { Header, Content, Footer } = Layout;

const EmailSendView = () => {
	let history = useHistory();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	useEffect(() => {

		document.title = 'Prism CRM Send Mail';
		window.scrollTo(0, 0);
	}, []);

	const onFinish = async (email) => {
		try {
			setLoading(true);
			await AuthAPI.post('/forget-password', email);
			notification('Done!', 'Please check your email', 'success');
			form.setFieldsValue({
				email: ''
			});
			setLoading(false);
		} catch (error) {
			if (error?.response?.data?.message) {
				ErrorHandler(error?.response?.data?.message, history);
				notification(error?.response?.data?.message, 'Please enter correct Email', 'error');
				setLoading(false);
			} else {
				notification("Something went wrong", 'Please check your connection', 'error');
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
					form={form}
					name="normal_login"
					className="login-form"
					onFinish={onFinish}
				>
					<div className="systemlogin-mbl">System Login</div>
					<Form.Item
						name="email"
						rules={[
							{
								type: 'email',
								message: 'The input is not valid E-mail!'
							},
							{
								required: true,
								message: 'Please input your email!'
							}
						]}
					>
						<Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Enter your email to change password" />
					</Form.Item>
					<Form.Item>
						<Button type="primary" disabled={loading} htmlType="submit" className="login-form-button">
							{loading && <LoadingOutlined />} Send Email
                  </Button>
					</Form.Item>
				</Form>
			</Content>
			<CommonFooter />
			{/* <Footer style={{ textAlign: 'center', fontSize: '12px' }}><span><CopyrightOutlined /></span> v2 Technologies LTD-2020</Footer> */}
		</Layout>
	);
}

export default EmailSendView
