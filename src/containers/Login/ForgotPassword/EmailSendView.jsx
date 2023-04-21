import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Layout } from 'antd';
import { MailOutlined,LoadingOutlined } from '@ant-design/icons';
import { useHistory, Link } from 'react-router-dom';

import notification from '../../../util/Notification/Notification';
import ErrorHandler from '../../../util/ErrorHandler/ErrorHandler'
import CommonFooter from '../../../util/Footer/Footer';
import Nav from '../../../components/common/Nav/Nav';
import axios from 'axios';

const {Content} = Layout;

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
			const {data} = await axios.post('http://localhost:8001/api/v1/auth/forget-password', email);
			console.log(data);
			notification('Done!', 'Please check your email after few seconds', 'success');
			form.setFieldsValue({
				email: ''
			});
			setLoading(false);
		} catch (error) {
			if (error?.response?.data?.message) {
				// ErrorHandler(error?.response?.data?.message, history);
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
			<Nav auth = "true"/>
			<Content>
				<Form
					form={form}
					name="normal_login"
					className="login-form"
					onFinish={onFinish}
				>
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
	);
}

export default EmailSendView
