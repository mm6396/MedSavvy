import React, { useEffect, useRef, useState } from 'react';
import { Row, Table, Input, Col, Tooltip, Switch, Modal, Dropdown, Menu } from 'antd';
import { FaEdit, FaUserCheck } from 'react-icons/fa';
import { RiDeleteBinLine, RiCurrencyLine, RiPlayListAddLine } from 'react-icons/ri';
import { EyeOutlined, ExclamationCircleOutlined, UnorderedListOutlined, MoneyCollectOutlined, DownOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { IoMdSettings } from 'react-icons/io';
import { GiMatchHead } from 'react-icons/gi';
import { GrCluster, GrTarget } from 'react-icons/gr';
import FuzzySearch from 'fuzzy-search';
import notification from "../../util/Notification/Notification";
import { CampaignManagerAPI } from '../../util/ApiGateway/Api';
import ErrorHandler from '../../util/ErrorHandler/ErrorHandler'

import './User.scss';
import axios from 'axios';
import ColumnGroup from 'antd/lib/table/ColumnGroup';

const { Search } = Input;
const { confirm } = Modal;

const UserList = () => {
    const [loading, setLoading] = useState(true);
    const [loadingSwitch, setLoadingSwitch] = useState(false);
    const [dataSet, setDataSet] = useState([]);
    const [data, setdata] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 25 });
    let history = useHistory();

    const updateStatus = (record, event) => {
        // let status = event | 0
        // setLoadingSwitch(true)
        // FieldForceManagerAPI.post('/FieldForceManager/disableAccount', { status: status, user_id: record.user_id }, {
        //     headers: {
        //         Authorization: 'Bearer ' + localStorage.getItem("accessToken")
        //     }
        // })
        // .then((response) => {
        //     if (response.data.success) record.status = status;
        //     let value = data;

        //     value[value.findIndex(obj => obj.key == record.key)].status = status;
        //     setData([...value]);
        //     console.log(response)
        //     setLoadingSwitch(false);

        //     notification('Successful', 'Role status updated successfully', 'success');
        // })
        // .catch((err) => {
        //     notification('Error!', "A network error occured", 'error');
        //     setLoadingSwitch(false);
        // })
    };

    const deleteCampaign = (id) => {
        console.log(id)
        confirm({
            title: 'Do you want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            content: 'When clicked the OK button, this dialog will be closed after 1 second',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    await axios.patch(`http://localhost:8001/api/v1/userRouter/delete-user`, {id},{
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem("accessToken")
                        }
                    });

                    let temp = data.filter(i => i.id !== id).map((v, i) => {
                        return {
                            ...v,
                            user_id: i + 1,
                        }
                    });
                    setdata([...temp]);
                    setDataSet([...temp]);
                    notification('Deleted Successfully', "User has been removed", 'warning');

                } catch (error) {
                    if (error?.response?.data?.message) {
                        ErrorHandler(error?.response?.data?.message, history);
                        notification(error?.response?.data?.message, 'Please fix this error and try again. Otherwise communicate with the admin', 'error');
                    } else {
                        notification('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
                    }
                }
            },
            onCancel() { },
        });
    };


    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('http://localhost:8001/api/v1/userRouter/userList', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("accessToken")

                    }
                });
                const temp_users = data.data.filter(v => v.id != parseInt(localStorage.getItem('user_id')));
                let users = temp_users.map((v,i)=> {
                    return {
                        ...v,
                        key: i+1
                    }
                })
                setDataSet(users);
                setdata(users);
                setLoading(false);
                
            } catch (error) {
                if (error?.response?.data?.message) {
                    ErrorHandler(error?.response?.data?.message, history);
                    notification(error?.response?.data?.message, 'Please fix this error and try again. Otherwise communicate with the admin', 'error');
                } else {
                    notification('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
                }
            }
        })();
    }, []);

    const columns = [
        {
            title: "Sn.",
            dataIndex: "key",
            key: "user_id",
            fixed: "left",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            fixed: "left",
        },
        {
            title: "User Role",
            dataIndex: "role_name",
            key: "name",
            fixed: "left",
        },
        {
            title: "Position",
            dataIndex: "position",
            key: "name",
            fixed: "left",
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "name",
            fixed: "left",
        },
        {
            title: "Position",
            dataIndex: "position",
            key: "name",
            fixed: "left",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "to_date",
        },
        {
            title: "Phone Number",
            dataIndex: "phone_number",
            key: "to_date",
        },
        {
            title: 'Action',
            dataIndex: 'stts',
            render: (text, record) => (
                <div className="table-icons" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                    {/* {localStorage.getItem('campaign')?.split(',').includes('6') && */}
                    <Tooltip title="assign" >
                        <FaUserCheck className=" table-icon assign "
                            onClick={(e) => {
                                history.push({
                                    pathname: `/manager/campaign/assign/${record.id}`,
                                });
                            }}
                            key={record.id}
                        />
                    </Tooltip>

                    {localStorage.getItem('roleAccess')?.split(',').includes('3') && 
                    <Tooltip title="Edit" >
                        <FaEdit className=" table-icon edit "
                            onClick={(e) => {
                                history.push({
									pathname: '/manager/user/update/' + record.id,
									state: record
								});
                            }}
                            key={record.id}
                        />
                    </Tooltip>
                 }

                  {localStorage.getItem('roleAccess')?.split(',').includes('4') &&
                    <Tooltip title="Delete" >
                        <RiDeleteBinLine className=" table-icon  delete"
                            onClick={(e) => { deleteCampaign(record.id) }}
                            key={record.key}
                        />
                    </Tooltip>
                  }

                </div>
            ),
        },
    ];

    useEffect(() => {
        document.title = 'Campaign Manager List';

        window.scrollTo(0, 0);
    }, []);

    const searcher = new FuzzySearch(dataSet, ['name', 'username', 'role_name','position'], { sort: true });

    const handleSearch = (value) => {
        if (value) {
            const result = searcher.search(value);
            setdata([...result]);
        } else {
            setdata(dataSet);
        }
    }

    return (
        <div>
            <Row style={{ marginBottom: "1%" }}>
                <Col xl={8} xs={24}>
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        onSearch={handleSearch}
                    />
                </Col>
            </Row>
            <Table
                className="campaignlist-table"
                columns={columns}
                dataSource={data}
                loading={loading}
                // scroll={{ x: 1000 }}
            />
        </div>
    );
}

export default UserList;