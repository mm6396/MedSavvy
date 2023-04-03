import React, { useEffect, useState } from "react";
import { Row, Col, Table, Switch, Spin, Tooltip, Modal } from "antd";
import { useHistory } from "react-router-dom";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined, EyeOutlined } from "@ant-design/icons";
import { FieldForceManagerAPI } from "../../../util/ApiGateway/Api";
import notificationFun from "../../../util/Notification/Notification";
import ErrorHandler from "../../../util/ErrorHandler/ErrorHandler";

const { confirm, success } = Modal;

const DashboardList = () => {

    // data example
    
    // const example = [
    //     {
    //         report_description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, aspernatur porro quam molestias corporis, iure ratione pariatur saepe qui inventore quo cupiditate nisi optio vitae debitis provident quas praesentium tempora?",
    //         key: 8,
    //         id: 8,
    //         query: "https://datastudio.google.com/embed/reporting/dcd11f5d-6d0b-43bc-9399-a44cd8f0399c/page/rAN4B",
    //         report_name: "Consumer Journey",
    //         roles: [29, 5, 26, 3, 9],
    //         rolesname: "SYS ADMIN, BATB Central, CC & HR, DC, Regional Manager",
    //         status: true,
    //         updatedAt: "2021-04-08T10:51:30.881Z"
    //     }
    // ]

    // end

    let history = useHistory();
	const [data, setData] = useState([]);
	const [loadingSwitch, setLoadingSwitch] = useState(false);
	const [loading, setLoading] = useState(false);

    useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const { data } = await FieldForceManagerAPI.get("/dashboard/admin/list", {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("accessToken"),
					},
				});

				console.log('/dashboard/admin/list',data);
				const formatData = data.map((el, i) => {
					return {
						key: i + 1,
						id: el.id,
						report_name: el.name,
						report_description: el.description,
						query: el.link,
						rolesname: el.rolesname.join(', '),
						status: el.status
					}
				})
				setData(formatData);
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

	const updateStatus = (record, event) => {
		let status = event | false;
		let val = data;
		val[val.findIndex((obj) => obj.id === record.id)].status = status;
		setData([...val]);

		const value = {
			status: event,
		};
		setLoadingSwitch(true);
		FieldForceManagerAPI.patch(`/dashboard/status-update/${record.id}`, value, {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("accessToken"),
			},
		})
			.then((response) => {
				setLoadingSwitch(false);
                console.log('/dashboard/status-update/',response);
				notificationFun("Successful", "Query status has been modified", "success");
			})
			.catch((err) => {
				notificationFun("Error!", "Something went wrong!!", "error");
				setLoadingSwitch(false);
			});
	};

	const removeQuery = (record, event) => {
		console.log(record.id)

		confirm({
			title: 'Do you want to delete these items?',
			icon: <ExclamationCircleOutlined />,
			content: 'When clicked the OK button, it cannot be reverted',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				let temp = data.filter(i => i.key !== record.id)
				setData([...temp])

				FieldForceManagerAPI.delete(`/dashboard/delete/${record.id}`, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("accessToken"),
					},
				})
					.then((response) => {
						setLoadingSwitch(false);
                        console.log('/dashboard/delete/', response);
						notificationFun("Successful", "Query remove successfully", "success");
					})
					.catch((err) => {
						notificationFun("Error!", "Something went wrong!!", "error");
						setLoadingSwitch(false);
					});
				setData(data.filter(el => el.id !== record.id));
			},
			onCancel() { },
		});
	}

    const columns = [
		{
			title: "SL",
			dataIndex: "key",
			key: "key",
		},
		{
			title: "Name",
			dataIndex: "report_name",
			key: "report_name",
		},
		{
			title: "Description",
			dataIndex: "report_description",
			key: "report_description",
		},
		{
			title: "Roles",
			dataIndex: "rolesname",
			key: "rolesname",
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			width: "10%",
			render: (text, record) => (
				<Switch
					size="small"
					loading={loadingSwitch}
					defaultChecked={record.status}
					onChange={(e) => {
						updateStatus(record, e);
					}}
					key={record.id}></Switch>
			),
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: (text, record) => (
				<div className="table-icons" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
					<Tooltip title="View dashboard" >
						<EyeOutlined className=" table-icon edit "
							onClick={(e) => {
								history.push('/manager/dashboard-manager/view-dashboard/' + record.id);
							}}
						/>
					</Tooltip>
					&nbsp; &nbsp;
					<Tooltip title="dashboard Modify" >
						<EditOutlined className=" table-icon assign "
							onClick={() => {
								history.push('/manager/dashboard-manager/update-dashboard/' + record.id);
							}}
						/>
					</Tooltip>
          	&nbsp; &nbsp;
					<Tooltip title="dashboard Remove" >
						<DeleteOutlined className=" table-icon delete "
							onClick={(e) => {
								removeQuery(record, e);
							}}
						/>
					</Tooltip>
				</div>
			),
		},
	];

    return (
		<div>
			{/* <h1 style={{ fontWeight: '600', color: '#545454' }}> Dashboard List </h1> */}
			<Spin spinning={loading}  size="large">
				<Row>
					<Col lg={{ span: 24, offset: 0 }}>
						<Table dataSource={data} columns={columns} scroll={{ x: 950 }} />
					</Col>
				</Row>
			</Spin>
		</div>
    );
};

export default DashboardList;