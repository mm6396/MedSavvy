import React, { useEffect, useState } from "react";
import { Row, Col, Table, Switch, Spin, Tooltip, Modal, Input, DatePicker } from "antd";
import { useHistory } from "react-router-dom";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined, EyeOutlined, MailOutlined } from "@ant-design/icons";
import "./QueryReport.scss";
import { FieldForceManagerAPI } from "../../../util/ApiGateway/Api";
import notificationFun from "../../../util/Notification/Notification";
import ErrorHandler from "../../../util/ErrorHandler/ErrorHandler";
import FuzzySearch from "fuzzy-search";

const { confirm, success } = Modal;

const QueryReport = () => {
	let history = useHistory();
	const [data, setData] = useState([]);
	const [searchData, setSearchdata] = useState([]);
	const [loadingSwitch, setLoadingSwitch] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const { data } = await FieldForceManagerAPI.get("/report/query-report", {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("accessToken"),
					},
				});

				console.log(data);
				const formatData = data.map((el, i) => {
					return {
						key: i + 1,
						id: el.id,
						report_name: el.report_name,
						report_description: el.report_description,
						query: el.query,
						roles: el.roles,
						params: el.params,
						rolesname: el.rolesname.join(', '),
						status: el.status,
						date: el.updatedAt.substr(0,10)
					}
				})
				setData(formatData);
				setSearchdata(formatData)
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
		setSearchdata([...val])


		const value = {
			query: record.query,
			report_description: record.report_description,
			report_name: record.report_name,
			roles: record.roles,
			status: event,
		};
		setLoadingSwitch(true);
		FieldForceManagerAPI.patch(`/report/query-report/${record.id}/modify`, {value}, {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("accessToken"),
			},
		})
			.then((response) => {
				setLoadingSwitch(false);
				notificationFun("Successful", "Query status has been modified", "success");
			})
			.catch((err) => {
				notificationFun("Error!", "Something went wrong!!", "error");
				setLoadingSwitch(false);
			});
	};

	const removeQuery = (record, event) => {

		confirm({
			title: 'Do you want to delete these items?',
			icon: <ExclamationCircleOutlined />,
			content: 'When clicked the OK button, it cannot be reverted',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {

				FieldForceManagerAPI.delete(`/report/query-report/${record.id}/remove`, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("accessToken"),
					},
				})
					.then((response) => {
						setLoadingSwitch(false);
						notificationFun("Successful", "Query remove successfully", "success");
					})
					.catch((err) => {
						notificationFun("Error!", "Something went wrong!!", "error");
						setLoadingSwitch(false);
					});
				setData(data.filter(el => el.id !== record.id));
				setSearchdata(data.filter(el => el.id !== record.id))

			},
			onCancel() { },
		});
	}

	const columns = [
		{
			title: "SL",
			dataIndex: "key",
			key: "key",
			width: 60
		},
		{
			title: "Name",
			dataIndex: "report_name",
			key: "report_name",
		},
		{
			title: "Description (Hover to view full)",
			dataIndex: "report_description",
			key: "report_description",
			ellipsis: true,
			
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
					<Tooltip title="View Query" >
						<EyeOutlined className=" table-icon edit "
							onClick={(e) => {
								history.push('/manager/report-manager/view-query/'+ record.id);
							}}
						/>
					</Tooltip>
					&nbsp; &nbsp;
					<Tooltip title="Query Modify" >
						<EditOutlined className=" table-icon assign "
							onClick={(e) => {
								history.push('/manager/report-manager/update-query/'+ record.id);
							}}
						/>
					</Tooltip>
          	&nbsp; &nbsp;
					<Tooltip title="Query Remove" >
						<DeleteOutlined className=" table-icon delete "
							onClick={(e) => {
								removeQuery(record, e);
							}}
						/>
					</Tooltip>
					{localStorage.getItem('userRole')?.split(',').includes('9') &&
						<Tooltip title="Set Emails" >
							<MailOutlined className=" table-icon mail "
								onClick={() => {
									history.push('/manager/report-manager/set-emails/'+ record.id);
								}}
							/>
						</Tooltip>
					}
				</div>
			),
		},
	];

	const searcher = new FuzzySearch(data, ['report_name'], { sort: true });

	const handleSearch = (value) => {
		console.log('va, v', value.target.value );
		if (value.target.value) {
			const result = searcher.search(value.target.value);
			setSearchdata([...result]);
		} else {
			setSearchdata(data);
		}
	}

	const onChangedate = (v, e) => {
	   console.log(' e', e, v );
	   // console.log('data', data );

	   if(e === null){
		   setSearchdata(data)
	   }
	   else{
		   let dateData = data.filter(v => v.date === e )
		   console.log('datedata', dateData );
		   if( dateData.length < 1 ){
			   setSearchdata(data)
		   }
		   else{
			   setSearchdata(dateData);
		   }
	   }
	}

	return (
		<div>
			<Row style={{ marginBottom: "1%" }}>
                <Col xl={8} xs={24}>
                    {/* <Search
                        placeholder="input search text"
                        enterButton="Search"
                        onSearch={handleSearch}
                    /> */}
					<Input onChange={(e) => handleSearch(e)} placeholder="write the report name" style={{ width: '250px' }} />
                </Col>

				<Col xl={8} xs={24}  >
					<DatePicker onChange={onChangedate} placeholder="select the date to see that days report" style={{ width: '300px' }} />
				</Col>
            </Row>
			<Spin spinning={loading}>
				<Row>
					<Col lg={{ span: 24, offset: 0 }}>
						<Table className="trainingreport-table" dataSource={searchData} columns={columns} scroll={{ x: 950 }} />
					</Col>
				</Row>
			</Spin>
		</div>
	);
};

export default QueryReport;