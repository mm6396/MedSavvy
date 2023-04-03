import { Spin, Descriptions, Row, Col, Card } from 'antd';
import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { FieldForceManagerAPI, RoleManagerAPI } from '../../../util/ApiGateway/Api';
import ErrorHandler from '../../../util/ErrorHandler/ErrorHandler';
import notificationFun from '../../../util/Notification/Notification';

const ViewQuery = () => {
	let history = useHistory();
	const {id} = useParams();
	const [loading, setLoading] = useState(true);
	const [queryInfo, setQueryInfo] = useState();
	const [roles, setRoles] = useState([]);

	useEffect(() => {
		document.title = 'Prism CRM: Query View';
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await RoleManagerAPI.get('/get-role-list', {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem("accessToken")
					}
				});
				
				setRoles([...data.response.filter(i => i.name != 'BR')]);
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
				const { data } = await FieldForceManagerAPI.get(`/report/get-query/${id}`, {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem("accessToken")
					}
				});
				console.log(data);
				if(roles.length) {
					let role = roles.filter(function (a) {
						return data.query.roles?.indexOf(a.id) !== -1;
						  });
					console.log(role);
					data.query.rolesname = role?.map(e => { return e.name }).join(', ')
					console.log(data);
					setQueryInfo(data.query);
				  }
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
	}, [roles]);

	return (
		<Spin spinning={loading}>
			<div className="campaign-info">
				<Descriptions title="Query Informations">
					<Descriptions.Item label="Report Name">{queryInfo?.report_name}</Descriptions.Item>
					<Descriptions.Item label="Report Description">{queryInfo?.report_description}</Descriptions.Item>
					<Descriptions.Item label="Role Access">{queryInfo?.rolesname}</Descriptions.Item>
					<Descriptions.Item label="Status">{queryInfo?.status ? 'Activated' : 'Deactivated'}</Descriptions.Item>
					<Descriptions.Item label="Params">{queryInfo?.params ? queryInfo.params.join(',') : 'No Params'}</Descriptions.Item>
				</Descriptions>
				<br/>
				<Row>
					<Col xl={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 0 }}>
						<Card title="Query" style={{ width: '100%' }}>
							<p>{queryInfo?.query}</p>
						</Card>
					</Col>
				</Row>
			</div>
		</Spin>
	)
}

export default ViewQuery
