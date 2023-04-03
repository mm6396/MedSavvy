import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Row, Col, Card, Button, Spin, Tooltip, Drawer } from 'antd';
import { EditOutlined, MailOutlined, PhoneTwoTone } from '@ant-design/icons';
import { FieldForceManagerAPI } from '../../../util/ApiGateway/Api';
import notification from '../../../util/Notification/Notification';
import ErrorHandler from '../../../util/ErrorHandler/ErrorHandler';

import './ProfilePage.scss';

const ProfilePAge = () => {
	const { id } = useParams();
	const history = useHistory();
	const [user, setUser] = useState({ user_info: { user_avater: "default.jpg" } });
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [locationData, setLocationData] = useState({ region: "", area: "", territory: "", dHouse: "", dPoint: "", });

	useEffect(() => {
		document.title = 'Ecrm: User Profile ';
		window.scrollTo(0, 0);

	}, []);

	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			setLoading(true);
	// 			const { data } = await FieldForceManagerAPI.get(`/FieldForceManager/getUser/${id}`, {
	// 				headers: {
	// 					Authorization: 'Bearer ' + localStorage.getItem("accessToken")
	// 				}
	// 			});

	// 			setUser(data.data);
	// 			setLoading(false);
	// 		} catch (error) {
	// 			if (error?.response?.data?.message) {
	// 				ErrorHandler(error?.response?.data?.message, history);
	// 				notification(error?.response?.data?.message, 'Please fix this error and try again. Otherwise communicate with the admin', 'error');
	// 			} else {
	// 				notification('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
	// 			}
	// 		}
	// 	})();
	// }, []);

	const showDrawer = async (userId) => {
		let { data } = await FieldForceManagerAPI.get(`/FieldForceManager/getUserLocationById/${userId}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem("accessToken") } })
		data = data.data[0]
		let tempLocations = locationData;
		tempLocations.region = data?.region?.join(', ')
		tempLocations.area = data?.area?.join(', ')
		tempLocations.territory = data?.territory?.join(', ')
		tempLocations.dHouse = data?.distribution_house?.join(', ')
		tempLocations.dPoint = data?.distribution_point?.join(', ')

		setLocationData(tempLocations)
		console.log(data);
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	return (
		<div className="profile-view">
			<Spin spinning={loading}>
				<Row className="img_row"
					type="flex"
					style={{ alignItems: 'center' }}
					justify="center"
				>
					<Col xl={{ span: 7, offset: 0 }} xs={{ span: 24, offset: 0 }} md={{ span: 7, offset: 0 }} className="img-col">
						<img className='profile-img' alt="user"
							width={200}
							height={200}
							src={process.env.REACT_APP_s3_cdn + user.user_info.user_avater}
						/>
					</Col>
					<Col xl={{ span: 12, offset: 0 }} xs={{ span: 24, offset: 0 }} md={{ span: 12, offset: 0 }}>
						<div className="profile-info">
							<h6 className="user-name">{user.user_info.full_name || 'loading...'}</h6>
							<p style={{ fontWeight: 600, color: '#004f9f' }}>{user.user_info.designation || 'No data found'}</p>
							<p><MailOutlined style={{ fontSize: '17px', color: '#db3939' }} /> <span>{user.email || 'No Email Found'}</span></p>
							<p><PhoneTwoTone twoToneColor="#52c41a" style={{ fontSize: '19px' }} /> <span>{user.user_info.official_contact || 'No Contact Found'}</span></p>
							{id === localStorage.getItem('id') &&
								<Link to={`/manager/profile/edit/${id}`}>
									<Button className="edit-btn" icon={<EditOutlined />} type='primary'>
										Edit Information
                                                        </Button>
								</Link>
							}
						</div>
					</Col>
				</Row>
			</Spin>

			<br />
			<br />
			<Row>

				<Col xl={{ span: 10, offset: 0 }} xs={{ span: 24, offset: 0 }} className="info-col">
					<Spin spinning={loading}>
						<Card title='Personal Information'>
							<Row>
								<Col span={12}>
									<p style={{ fontWeight: 600 }}>Full Name</p>
									<p style={{ fontWeight: 600 }}>Gender</p>
									<p style={{ fontWeight: 600 }}>Contact</p>
									<p style={{ fontWeight: 600 }}>Date of Birth</p>
									<p style={{ fontWeight: 600 }}>Blood Group</p>
									<p style={{ fontWeight: 600 }}>Religion</p>
								</Col>
								<Col span={3}>
									<p>:</p>
									<p>:</p>
									<p>:</p>
									<p>:</p>
									<p>:</p>
									<p>:</p>
								</Col>
								<Col span={9}>
									<p>{user.user_info.full_name || 'No Data Found'}</p>
									<p>{user.user_info.gender || 'No Data Found'}</p>
									<p>{user.user_info.personal_contact || 'No Data Found'}</p>
									<p>{user.user_info.dob || 'No Data Found'}</p>
									<p>{user.user_info.blood_group || 'No Data Found'}</p>
									<p>{user.user_info.religion || 'No Data Found'}</p>
								</Col>
							</Row>
						</Card>
					</Spin>
				</Col>


				<Col xl={{ span: 12, offset: 2 }} xs={{ span: 24, offset: 0 }}>
					<Spin spinning={loading}>
						<Card title='Professional Details'>
							<Row>
								<Col span={12}>
									<p style={{ fontWeight: 600 }}>Position</p>
									<p style={{ fontWeight: 600 }}>Joining Date</p>
									<p style={{ fontWeight: 600 }}>Assigned Locations</p>
								</Col>
								<Col span={3}>
									<p>:</p>
									<p>:</p>
									<p>:</p>
								</Col>
								<Col span={9}>
									<p>{user.user_info.designation || 'No Data Found'}</p>
									<p>{user.joining_date || 'No Data Found'}</p>
									<div>
										<Tooltip title="click to see location info">
											<a className="userassign-location-drawer" onClick={() => showDrawer(id)}>
												View Locations
                              </a>
										</Tooltip>
										<Drawer
											title={<div style={{ fontWeight: 'bold', color: '#E72582' }}> Location Info </div>}
											placement="right"
											closable={true}
											onClose={onClose}
											visible={visible}
											onClick={() => {
												console.log("daraf");
											}}
											width={400}
										>
											<p style={{ fontWeight: '600' }}><span style={{ fontWeight: 'bold', color: '#004f9f' }}>Regions:<br /></span> {locationData?.region}</p>
											<p style={{ fontWeight: '600' }}><span style={{ fontWeight: 'bold', color: '#004f9f' }}>Areas:<br /></span>{locationData?.area}</p>
											<p style={{ fontWeight: '600' }}><span style={{ fontWeight: 'bold', color: '#004f9f' }}>Territories:<br /></span> {locationData?.territory}</p>
											<p style={{ fontWeight: '600' }}><span style={{ fontWeight: 'bold', color: '#004f9f' }}>Distribution Houses:<br /></span>{locationData?.dHouse}</p>
											<p style={{ fontWeight: '600' }}><span style={{ fontWeight: 'bold', color: '#004f9f' }}>Distribution Points:<br /></span>{locationData?.dPoint}</p>
										</Drawer>
									</div>
								</Col>
							</Row>
						</Card>
					</Spin>
				</Col>
			</Row>
		</div>
	);
}

export default ProfilePAge;