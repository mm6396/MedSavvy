import React, { useEffect, useState } from 'react';
import { Row, Table, Input, Col, Tooltip, Switch, Modal, Dropdown, Menu } from 'antd';
import { FaEdit, FaUserCheck } from 'react-icons/fa';
import { RiDeleteBinLine, RiCurrencyLine, RiPlayListAddLine } from 'react-icons/ri';
import { EyeOutlined, ExclamationCircleOutlined, UnorderedListOutlined, MoneyCollectOutlined, DownOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { IoMdSettings } from 'react-icons/io';
import { GiMatchHead } from 'react-icons/gi';
import { GrCluster, GrTarget } from 'react-icons/gr';
import FuzzySearch from 'fuzzy-search';
import notification from "../../../util/Notification/Notification";
import { CampaignManagerAPI } from '../../../util/ApiGateway/Api';
import ErrorHandler from '../../../util/ErrorHandler/ErrorHandler'

import './CampaignList.scss';

const { Search } = Input;
const { confirm } = Modal;

const CampaignList = () => {
    const [loading, setLoading] = useState(true);
    const [loadingSwitch, setLoadingSwitch] = useState(false);
    const [dataSet, setDataSet] = useState([
        {
            user_id: 1,
            name: 'Campaign on Tylenol',
            type:'Local Launching',
            from_date:'04/04/23',
            to_date:'04/14/23'
        },
        {
            user_id: 2,
            name: 'Campaign on Tylenol 2',
            type:'global Launching',
            from_date:'04/04/23',
            to_date:'04/29/23'
        },
        {
            user_id: 3,
            name: 'Campaign on Tylenol 3',
            type:'New product',
            from_date:'04/04/23',
            to_date:'04/20/23'
        },
        {
            user_id: 4,
            name: 'Campaign on Tylenol 4',
            type:'Vitamins Quality check',
            from_date:'04/04/23',
            to_date:'04/24/23'
        }
    ]);
    const [data, setdata] = useState([
        {
            user_id: 1,
            name: 'Campaign on Tylenol',
            type:'Local Launching',
            from_date:'04/04/23',
            to_date:'04/14/23'
        },
        {
            user_id: 2,
            name: 'Campaign on Tylenol 2',
            type:'global Launching',
            from_date:'04/04/23',
            to_date:'04/29/23'
        },
        {
            user_id: 3,
            name: 'Campaign on Tylenol 3',
            type:'New product',
            from_date:'04/04/23',
            to_date:'04/20/23'
        },
        {
            user_id: 4,
            name: 'Campaign on Tylenol 4',
            type:'Vitamins Quality check',
            from_date:'04/04/23',
            to_date:'04/24/23'
        }
    ]);
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
        confirm({
            title: 'Do you want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            content: 'When clicked the OK button, this dialog will be closed after 1 second',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    await CampaignManagerAPI.delete(`/delete-campaign/${id}`, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem("accessToken")
                        }
                    });

                    let temp = data.filter(i => i.key !== id).map((v, i) => {
                        return {
                            ...v,
                            user_id: i + 1,
                        }
                    });
                    setdata([...temp]);
                    setDataSet([...temp]);
                    notification('Deleted Successfully', "Campaign has been removed", 'warning');

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


    // useEffect(() => {
    //     (async () => {
    //         try {
    //             setLoading(true);
    //             const { data } = await CampaignManagerAPI.get('/get-campaign-list', {
    //                 headers: {
    //                     Authorization: 'Bearer ' + localStorage.getItem("accessToken")
    //                 }
    //             });
    //             // console.log(data);
    //             const temp = data.response.map((v, i) => {
    //                 return {
    //                     key: v.id,
    //                     user_id: i + 1,
    //                     name: v.name,
    //                     to_date: v.to_date,
    //                     sub_camp: data.response[data.response.findIndex(value => value.parent == v.id)]?.name || null,
    //                     version: v.version,
    //                     // swp: 1,
    //                     ptr: v.ptr_trgt,
    //                     call_target_fran: v.franchise_call_trgt,
    //                     call_target_sob: v.sob_call_trgt,
    //                     swapping_fran: v.franchise_swapping_trgt,
    //                     swapping_sob: v.sob_swapping_trgt,
    //                     parent: data.response[data.response.findIndex(value => value.id == v.parent)]?.name || null,
    //                 }
    //             });
    //             setDataSet([...temp]);
    //             setdata([...temp]);
    //             setLoading(false);
    //         } catch (error) {
    //             if (error?.response?.data?.message) {
    //                 ErrorHandler(error?.response?.data?.message, history);
    //                 notification(error?.response?.data?.message, 'Please fix this error and try again. Otherwise communicate with the admin', 'error');
    //             } else {
    //                 notification('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
    //             }
    //         }
    //     })();
    // }, []);

    const columns = [
      {
        title: "Sn.",
        dataIndex: "user_id",
        key: "user_id",
        fixed: "left",
      },
      {
        title: "Campaign Name",
        dataIndex: "name",
        key: "name",
        fixed: "left",
      },
      {
        title: "Campaign Type",
        dataIndex: "type",
        key: "name",
        fixed: "left",
      },
      {
        title: "Start Date",
        dataIndex: "to_date",
        key: "to_date",
      },
      {
        title: "End Date",
        dataIndex: "to_date",
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
                                      pathname: `/manager/campaign/assign/${record.key}`,
                                  });
                              }}
                              key={record.id}
                          />
                      </Tooltip>
                  {/* }
                  {localStorage.getItem('campaign')?.split(',').includes('2') && */}
                      <Tooltip title="Edit" >
                          <FaEdit className=" table-icon edit "
                              onClick={(e) => {
                                  history.push({
                                      pathname: '/manager/campaign/update/' + record.key,
                                  });
                              }}
                              key={record.key}
                          />
                      </Tooltip>
                  {/* }

                  {localStorage.getItem('campaign')?.split(',').includes('4') && */}
                      <Tooltip title="Delete" >
                          <RiDeleteBinLine className=" table-icon  delete"
                              onClick={(e) => { deleteCampaign(record.key) }}
                              key={record.key}
                          />
                      </Tooltip>
                  {/* } */}

              </div>
          ),
      },
    ];

    useEffect(() => {
        document.title = 'Campaign Manager List';

        window.scrollTo(0, 0);
    }, []);

    const searcher = new FuzzySearch(dataSet, ['name', 'type'], { sort: true });

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
        //   loading={loading}
          scroll={{ x: 1000 }}
        />
      </div>
    );
}

export default CampaignList;