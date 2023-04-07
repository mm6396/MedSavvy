import React, { useEffect, useState } from 'react';
import { Table, Space, Switch, Spin, Modal, Tooltip, Input, Row, Col } from 'antd';
import { DeleteFilled, ExclamationCircleOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom';
import { FaUserEdit } from 'react-icons/fa';
import FuzzySearch from 'fuzzy-search';
import './RoleList.scss';
import notification from "../../../util/Notification/Notification";
import ErrorHandler from "../../../util/ErrorHandler/ErrorHandler";
import { RoleManagerAPI } from '../../../util/ApiGateway/Api';
import axios from 'axios';

const { confirm } = Modal;
const { Search } = Input;


const RoleList = () => {

  useEffect(() => {

    document.title = 'Medsavvy Role List';
    window.scrollTo(0, 0);

  }, []);

  let history = useHistory();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataSet, setDataSet] = useState([]);


  // console.log(data);

  const onStatusChnage = (checked, record) => {
    confirm({
      title: 'Are you sure update this role status?',
      icon: <ExclamationCircleOutlined />,
      content: 'When clicked the OK button, this role status will be changed. And make sure you are not disabling your role.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          setLoading(true);
          let value = data;
          await RoleManagerAPI.patch('/toggle-status', { id: record.key, active_status: checked }, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem("accessToken")
            }
          });

          value[value.findIndex(obj => obj.key == record.key)].status = checked;
          notification('Successful', 'Role status updated successfully', 'success');
          setData([...value]);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          if (error?.response?.data?.message) {
            ErrorHandler(error?.response?.data?.message, history);
            notification(error?.response?.data?.message, 'Please fix this error and try again. Otherwise communicate with the admin', 'error');
          }
          else {
            notification('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
          }
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const deleteRole = (id) => {
    confirm({
      title: 'Are you sure delete this role?',
      icon: <ExclamationCircleOutlined />,
      content: 'When clicked the OK button, this role will be deleted',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          const res = await RoleManagerAPI.delete(`/delete-role/${id}`, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem("accessToken")
            }
          });
          let temp = data.filter(i => i.key !== id);
          setData([...temp]);
          notification('Deleted Successfully', res.data.response, 'warning');
        } catch (error) {
          if (error?.response?.data?.message) {
            ErrorHandler(error?.response?.data?.message, history);
            notification(error?.response?.data?.message, 'Please fix this error and try again. Otherwise communicate with the admin', 'error');
          } else {
            notification('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
          }
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('http://localhost:8001/api/v1/userRouter/roleList', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("accessToken")

          },
          cancelToken: source.token
        });
        console.log(data);
        let users = data?.data.map((v, i) => {
          return {
            ...v,
            key: i + 1
          }
        })

        setDataSet(users);
        setData(users);
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
      title: 'Sn',
      dataIndex: 'key',
      key: 'id',
      width: 100,
      fixed: 'left',
    },

    {
      title: 'Role Name',
      dataIndex: 'role_name',
      key: 'name',
      // filters: filteroption,
      // filterMultiple: true,
      // onFilter: (value, record) => record.name.indexOf(value) === 0,

    },
    {
      title: 'Role Description',
      dataIndex: 'role_description',
      key: 'type',

    },
    // {
    //   title: 'Page Access',
    //   dataIndex: 'page_access',
    //   key: 'type',

    // },
    // {
    //   title: 'Status',
    //   render: (text, record) => (
    //     <Space size="middle">
    //       {localStorage.getItem('role')?.split(',').includes('3') &&
    //         <Switch size="small" loading={loading} defaultChecked={record.status} checked={data[data.findIndex(obj => obj.key == record.key)].status} onChange={(checked) => onStatusChnage(checked, record)} />
    //       }
    //     </Space>
    //   ),
    // },

    {
      title: 'Action',
      render: (text, record) => (
        <div className="table-icons" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
          {/* {localStorage.getItem('role')?.split(',').includes('2') && */}
          <Tooltip title="Edit">
            <FaUserEdit className="table-icon edit " onClick={() => { history.push(`/manager/role/edit/${record.id}`) }} />
          </Tooltip>
          {/* } */}
          {/* {localStorage.getItem('role')?.split(',').includes('4') && */}
          <Tooltip title="Delete">
            <DeleteFilled className="table-icon  delete" onClick={() => deleteRole(record.id)} />
          </Tooltip>
          {/* } */}
        </div>
      ),
    },

  ];

  const searcher = new FuzzySearch(dataSet, ['role_name', 'type'], { sort: true });

  const handleSearch = (value) => {
    if (value) {
      const result = searcher.search(value);
      setData([...result]);
    } else {
      setData(dataSet);
    }
  }
  const handleChange = (e) => {
    if (e.target.value) {
      const result = searcher.search(e.target.value);
      setData([...result]);
    } else {
      setData(dataSet);
    }
  }

  return (
    <div className="rolelist-div">
      <Row style={{ marginBottom: "1%" }}>
        <Col xl={8} xs={24}>
          <Search
            placeholder="input search text"
            enterButton="Search"
            onSearch={handleSearch}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Spin spinning={loading}>
        <Table
          className="campaignlist-table"
          columns={columns}
          dataSource={data}
        // scroll={{ x: 1000 }} 
        // pagination={{ defaultPageSize: 20, showSizeChanger: data.length > 100 ? true : false, pageSizeOptions: ['10', '20', '30'] }} 
        />
      </Spin>
      {/* <Modal
        title="Description"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ fontWeight: '600' }}> {description} </div>
      </Modal> */}

    </div>
  );
}

export default RoleList;