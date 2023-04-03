import React, { useState, useEffect } from 'react'
import { Spin, Descriptions, Row, Col, Card } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { FieldForceManagerAPI } from '../../../util/ApiGateway/Api';
import ErrorHandler from '../../../util/ErrorHandler/ErrorHandler';
import notificationFun from '../../../util/Notification/Notification';

const ViewDashboard = () => {

    // const example = 
    //     {
    //         createdAt: "2021-04-04T10:34:57.325Z",
    //         created_by: 41,
    //         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, aspernatur porro quam molestias corporis, iure ratione pariatur saepe qui inventore quo cupiditate nisi optio vitae debitis provident quas praesentium tempora?",
    //         id: 8,
    //         link: "https://datastudio.google.com/embed/reporting/dcd11f5d-6d0b-43bc-9399-a44cd8f0399c/page/rAN4B",
    //         name: "Consumer Journey",
    //         roles: [29, 5, 26, 3, 9],
    //         rolesname: ["SYS ADMIN", "BATB Central", "CC & HR", "DC", "Regional Manager"],
    //         status: true,
    //         updatedAt: "2021-04-08T10:51:30.881Z"
    //     }
    

    let history = useHistory();
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [dashboardInfo, setDashboardInfo] = useState([]);
	const [roles, setRoles] = useState([]);

	useEffect(() => {
		document.title = 'ECRM: Dashboard View';
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const { data } = await FieldForceManagerAPI.get(`/dashboard/admin/get/${id}`, {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem("accessToken")
					}
				});
				console.log('/dashboard/admin/get',data);
				setDashboardInfo(data.dashboard);
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

    return (
        <div>
			<Spin spinning={loading}  size="large">
				{/* <h1 style={{ fontWeight: '600', color: '#545454' }}> {dashboardInfo?.name + " Dashboard"}</h1> */}
				<div className="campaign-info" style={{ height: '440px' }}>
					<Descriptions title="Basic Information">
						<Descriptions.Item label="Dashboard Name">{dashboardInfo?.name} </Descriptions.Item>
						<Descriptions.Item label="Role Access">{dashboardInfo?.rolesname?.join(', ')}</Descriptions.Item>
						<Descriptions.Item label="Status">{dashboardInfo?.status ? 'Activated' : 'Deactivated'}</Descriptions.Item>
						<Descriptions.Item label="Link">{dashboardInfo?.link}</Descriptions.Item>
					</Descriptions>
					<br />
					<Row>
						<Col xl={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 0 }}>
							<Card title="Dashboard Description" style={{ width: '100%' }}>
								<p>{dashboardInfo?.description}</p>
							</Card>
						</Col>
					</Row>
					<div style={{ width: '100%', height: '100vh' }}>
						<iframe
							style={{ width: '100%', height: '100%' }}
							src={dashboardInfo?.link}
							title="description"
                            allowfullscreen= 'true'
						/>
					</div>
				</div>
			</Spin>
		</div>
    );
};

export default ViewDashboard;