import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Input, Select, Table, Alert, Spin, Checkbox } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import notificationFun from '../../../util/Notification/Notification';
import ErrorHandler from '../../../util/ErrorHandler/ErrorHandler';
import { useHistory } from 'react-router-dom';
import { FieldForceManagerAPI, RoleManagerAPI } from '../../../util/ApiGateway/Api';

const { Option } = Select;

const QueryBuilder = () => {

	let history = useHistory()
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [loc, setLoc] = useState('');
	const [roles, setRoles] = useState([])
  const [queryTypes, setQueryTypes] = useState([]);

	useEffect(() => {

		document.title = 'Prism CRM: Query Builder';
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
				setRoles([...data.response.filter(i => i.name != 'BR')]);
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
        const { data } = await FieldForceManagerAPI.get(`/report/query-types`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        });
        setQueryTypes(data.types);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error?.response?.data?.message) {
          ErrorHandler(error?.response?.data?.message, history);
        } else {
          notificationFun(
            "Something went wrong",
            "Please check your internet connection and try again or communicate with the admin",
            "error"
          );
        }
      }
    })();
  }, []);

	function onChange(checkedValues) {
		setLoc('')
		if (checkedValues.includes(2)) {
			if (checkedValues.includes(1)) {
				setLoc('')
			} else {
				setLoc('You must check location before checking campaign')
			}
		}
	}

	const onFinish = async (value) => {
		
			let loggedinUserRole = parseInt(localStorage.getItem('userRole'));
			value.roles.push(loggedinUserRole);


			if (loc == '') {
				try {
					setLoading(true);
					const { data } = await FieldForceManagerAPI.post('/report/query-builder', { value }, {
						headers: {
							Authorization: 'Bearer ' + localStorage.getItem("accessToken")
						}
					});
					notificationFun('Done!', 'Submitted successfully', 'success');
					setLoading(false);
					history.push('/manager/report-manager/query-report')
				} catch (error) {
					form.resetFields();
					setLoading(false);
					if (error?.response?.data?.message) {
						ErrorHandler(error?.response?.data?.message, history);
					} else {
						notificationFun('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
					}
				}
			} else {
				notificationFun('Please check params properly', 'You checked campaign without checking location', 'error')
			}
	};

	return (
		<Spin spinning={loading}>
				<p style={{ color: "#004F9F", fontWeight: "bold", fontSize: "20px", margin: "0 0 30px 0", }}> Build Query for Custom Report </p>
				<Form onFinish={onFinish} form={form}>
					<Row>
						<Col xs={{ span: 24, offset: 0 }} lg={{ span: 8, offset: 0 }}>
							<h4 className="required" style={{ color: '#004F9F', fontWeight: 'bold' }}> Role</h4>
							<Form.Item name="roles" rules={[{ required: true }]}>

								<Select
									placeholder="Please selecct role"
									style={{ width: '100%' }} mode='multiple' allowClear showArrow>
									{roles.map((v, i) => <Option value={v.id} key={i}> {v.name} </Option>)}
								</Select>

							</Form.Item>
						</Col>
						<Col xs={{ span: 24, offset: 0 }} lg={{ span: 8, offset: 1 }}>
							<h4 className="required" style={{ fontWeight: 'bold', color: '#004F9F' }}> Report Name </h4>
							<Form.Item
								name="report_name"
								rules={[{ required: true, message: 'type here' }]} >
								<Input
									placeholder="Enter report name..."
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col xs={{ span: 24, offset: 0 }} lg={{ span: 10, offset: 0 }}>
							<h4 className="required" style={{ fontWeight: 'bold', color: '#004F9F' }}>Report Description</h4>
							<Form.Item name="report_description" rules={[{ required: true, message: 'Enter description' }]}  >
								<Input.TextArea
									rows="5"
									placeholder="Input report details...."
								/>
							</Form.Item>

						</Col>
						<Col xs={{ span: 24, offset: 0 }} lg={{ span: 22, offset: 0 }}>
							<Alert
								message="Write the below variables accordingly in your query"
								description={
									<div>
										<br />
										<Row>
											<Col span={8}>
												<p>location = all the dpids againts logged in user </p>
												<p>campaign = id of subcampaign || id of parent campaign</p>
												<p>contact_no = contact number</p>
												<p>brand = id of brand</p>
											</Col>

											<Col span={8}>
												<p>role = asigned role of user to find</p>											
												<p>uid = id of logged in user (int)</p>
												<p>custom_userid = userID of user to find (string)</p>
												<p>user_ID = userID of logged in user (string)</p>
											</Col>
											<Col span={8}>	
												<p>today = todays' date</p>										
												<p>custom_date = one date</p>
												<p>start_date = start date of date range</p>
												<p>end_date = end date of date range</p>												
											</Col>
										</Row>
									</div>
								}
								type="info"
								showIcon
							/>
						</Col>

						<Col xs={{ span: 24, offset: 0 }} lg={{ span: 22, offset: 0 }}>
							<br/>
							<h4 className="required" style={{ fontWeight: 'bold', color: '#004F9F' }}>Select Params</h4>
							<Form.Item name='params'>
								<Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
									<br />
									<Row>
										<Col span={3}>
											<Checkbox value={1} style={{ lineHeight: '32px' }}>Location</Checkbox>
										</Col>
										<Col span={3}>
											<Checkbox value={2} style={{ lineHeight: '32px' }}>Campaign</Checkbox>
										</Col>
										<Col span={3}>
											<Checkbox value={3} style={{ lineHeight: '32px' }}>Role</Checkbox>
										</Col>
										<Col span={3}>
											<Checkbox value={4} style={{ lineHeight: '32px' }}>Custom Date</Checkbox>
										</Col>
										<Col span={3} >
											<Checkbox value={5} style={{ lineHeight: '32px' }}>Date Range</Checkbox>
										</Col>
										<Col span={3} >
											<Checkbox value={6} style={{ lineHeight: '32px' }}>Contact No</Checkbox>
										</Col>
										<Col span={3} >
											<Checkbox value={7} style={{ lineHeight: '32px' }}>Custom User ID</Checkbox>
										</Col>
										<Col span={3} >
											<Checkbox value={8} style={{ lineHeight: '32px' }}>Brand</Checkbox>
										</Col>
									</Row>
								</Checkbox.Group>
							</Form.Item>
						</Col>
						<div style={{ textAlign: 'center' }}>
							{loc != '' && <p style={{ fontSize: '14px', color: '#ff4d4f' }}>{loc}</p>}
						</div>
						<Col xs={{ span: 24, offset: 0 }} lg={{ span: 22, offset: 0 }}>
							<br />
							<h4 className="required" style={{ fontWeight: 'bold', color: '#004F9F' }}>Query</h4>
							<Form.Item name="query" rules={[{ required: true, message: 'Enter Query' }]}  >
								<Input.TextArea
									style={{ overflow: 'auto' }}
									rows="16"
									placeholder="Input query..."
								/>
							</Form.Item>

						</Col>
            <Col
            push={14}
            xs={{ span: 8, offset: 0 }}
            lg={{ span: 8, offset: 0 }}
          >
            <h4 style={{ color: "#004F9F", fontWeight: "bold" }}>Query Type</h4>
            <Form.Item name="type">
              <Select
                placeholder="Please select query type"
                style={{ width: "100%" }}
                allowClear
                showArrow
              >
                {queryTypes.map((v) => (
                  <Option value={v.id} key={v.id}>
                    {" "}
                    {v.display_label}{" "}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 22, offset: 0 }}>
            <br />
            <h4 style={{ fontWeight: "bold", color: "#004F9F" }}>
              Auto Send Query
            </h4>
            <Form.Item name="auto_send_query">
              <Input.TextArea
                style={{ overflow: "auto" }}
                rows="16"
                placeholder="Input query..."
              />
            </Form.Item>
          </Col>
					</Row>
					<br />
					<div style={{ textAlign: 'center' }}>
						<Button htmlType="submit" type='primary' shape="round"> Submit Query {loading && <LoadingOutlined />}</Button>
					</div>
				</Form>
		</Spin>
	)
}

export default QueryBuilder
