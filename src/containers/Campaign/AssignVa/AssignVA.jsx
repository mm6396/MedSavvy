import "./AssignVa.scss";
import React, { useEffect, useState } from "react";
import {Row,Col,Tooltip,Table,Popover,Card,Button,Input,Modal,} from "antd";
import { useParams, useHistory, useLocation } from "react-router-dom";
import {PlusCircleOutlined,LoadingOutlined,DeleteOutlined,} from "@ant-design/icons";
import CustomNotification from "../../../util/Notification/Notification";
import ErrorHandler from "../../../util/ErrorHandler/ErrorHandler";
import FuzzySearch from "fuzzy-search";
import BulkAssignVA from "./BulkAssignVA";
import axios from "axios";

const { Search } = Input;

const AssignVA = () => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [addedVa, setAddedVa] = useState([]);
  const [addedVaList, setAddVaList] = useState([]);
  const [vaList, setVaList] = useState([]);
  const [data, setData] = useState([]);
  const [vadata, setVaData] = useState([]);
  const [assignedList, setAssignedList] = useState([]);
  const [vaSupList, setSupVaList] = useState([]);
  const [loadingAssign, setLoadingAssign] = useState(false);
  const [selectedVARowKeys, setSelectedVARowKeys] = useState([]);
  const [selectedVASUPRows, setSelectedVASUPRows] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [campaign, setCampaign] = useState("");
  const [deleteId,setDeleteId] = useState({});
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    document.title = "AuditAI Assign VA";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchVaList();
    setCampaign(location?.state);
  }, []);

  const fetchVaList = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:8001/api/v1/campaignRouter/spList",
        { campaign_id: id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      let list = [...data.valist].map((el) => {
        return {
          ...el,
          key: el.id,
        };
      });
      setData(list);
      const va_list = [...data.va_sup_list].map((el) => {
        return {
          ...el,
          key: el.id,
        };
      });
      setVaData(va_list);
      setAddVaList(data.assigned_list);
      setAddedVa(data.assigned_list);
      setAssignedList(data.assigned_list);
      // const existingVA = data.assigned_list.map(
      //   (addedPerson) => addedPerson.id
      // );
      let vaListData = data.assigned_list.filter(o1 => data.valist.some(o2 => o1.id === o2.id));
      let va_Sup_ListData = data.assigned_list.filter(o1 => data.va_sup_list.some(o2 => o1.id === o2.id));
      const existingVA = vaListData.map((v,i)=>{
        return v.id
      })
      // console.log("existingVA",existingVA)

      const existingVA_SUP = va_Sup_ListData.map((v,i)=>{
        return v.id
      })
      // console.log("existingVA_SUP",existingVA_SUP)


      setSelectedVARowKeys([...existingVA]);
      setSelectedVASUPRows([...existingVA_SUP]);
      setSupVaList(va_list);
      setVaList(list);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.message) {
        ErrorHandler(error?.response?.data?.message, history);
      } else {
        CustomNotification(
          "Something went wrong",
          "Please check your internet connection and try again or communicate with the admin",
          "error"
        );
      }
    }
  };

  const columns = [
    {
      title: "User ID",
      dataIndex: "uid",
      key: "uid",
      width: "30%",
    },
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
      width: "20%",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "20%",
    },
    {
      title: "Action",
      dataIndex: "stts",
      render: (text, record) => (
        <div
          className="table-icons"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Popover title="Add this BR">
            <PlusCircleOutlined
              className=" table-icon add-to-cart "
              onClick={(e) => {
                const existingVA = addedVa.map((addedPerson) => addedPerson.id);
                if (!existingVA.includes(record.id)) {
                  const added_br = [...addedVa, record];
                  setAddedVa(added_br);
                } else {
                  CustomNotification(
                    "Try adding another BR",
                    "This BR already added",
                    "warning"
                  );
                }
              }}
              key={record.id}
            />
          </Popover>
        </div>
      ),
    },
  ];

  const showModal = (id) => {
    addedVa.map((va)=>{
      if(va.id === id){
        setDeleteId(va)
      }
    })
    setIsModalVisible(true);
  };
  const handleOk = async() => {
    // console.log(deleteId)
	try {
		const { data } = await axios.post(
			`http://localhost:8001/api/v1/campaignRouter/typeList`,
      {campaignId:id,VAId:deleteId.id},
			{
				headers: {
				  Authorization: "Bearer " + localStorage.getItem("accessToken"),
				},
			},
		)
    if(data.message === "success"){
      fetchVaList()
      //console.log("User Removed")
    }
    
    else if(data === "removed"){
      // console.log("error")
      CustomNotification(
			  "Something went wrong",
			  "Please check your internet connection and try again or communicate with the admin",
			  "error"
			);
    }
    const userData = addedVa.filter((va)=> va.id !== deleteId.id);
    // console.log("selectedRowKeys",selectedVARowKeys)
    // console.log("selectedRowKeys1",selectedVASUPRows)
    const removeVAarr = selectedVARowKeys.filter((val) => val != deleteId.id);
    const removeVAarr1 = selectedVASUPRows.filter((val) => val != deleteId.id);
    // console.log("removeVAarr",removeVAarr)
    // console.log("removeVAarr1",removeVAarr1)
    setAddedVa(userData)
    setSelectedVARowKeys([...removeVAarr])
    setSelectedVASUPRows([...removeVAarr1])

	CustomNotification(data.response, "Remove successfully", "success");
	} catch (error) {
		if (error?.response?.data?.message) {
			ErrorHandler(error?.response?.data?.message, history);
			CustomNotification(
			  error?.response?.data?.message,
			  "Please fix this error and try again. Otherwise communicate with the admin",
			  "error"
			);
		  } else {
			CustomNotification(
			  "Something went wrong",
			  "Please check your internet connection and try again or communicate with the admin",
			  "error"
			);
		  }
		
	}
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async () => {
    const arr = addedVa.filter(function (cv) {
      return !assignedList.find(function (e) {
        return e.id == cv.id;
      });
    });
    try {
      setLoadingAssign(true);
      const { data } = await axios.post(
        "api/v1/callverification/assign-va",
        {
          va: arr.map((i) => {
            return { id: i.id };
          }),
          campaign_id: id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      // console.log(data);
      CustomNotification(data.response, "Assigned successfully", "success");
      setAddedVa([]);
      fetchVaList();
      setLoadingAssign(false);
    } catch (error) {
      setLoadingAssign(false);
      if (error?.response?.data?.message) {
        ErrorHandler(error?.response?.data?.message, history);
        CustomNotification(
          error?.response?.data?.message,
          "Please fix this error and try again. Otherwise communicate with the admin",
          "error"
        );
      } else {
        CustomNotification(
          "Something went wrong",
          "Please check your internet connection and try again or communicate with the admin",
          "error"
        );
      }
    }
  };

  const rowSelection = {
    selectedRowKeys: selectedVARowKeys,
    onChange: (selectedRowKeys) => {
      // console.log("VA rows",selectedRowKeys);
      setSelectedVARowKeys([...selectedRowKeys]);
      // console.log("VA added", addedVa);
      const existingVA = addedVa.map((addedPerson) => addedPerson.id);
      // console.log("first",addedVa)
      // console.log("existingVA",existingVA)
      const arr = selectedRowKeys.filter((val) => !existingVA.includes(val));
      // console.log("VA arr",arr);
      // let result = selectedRowKeys.filter(o1 => existingVA.some(o2 => o1.id === o2.id));
      // //setSelectedRowKeys([...existingVA,...arr]);
      // console.log("result",result)
      let addedVaList = addedVa.map((v,i)=>{
        return v.id;
      })
      // console.log("addedVaList",addedVaList)

      // let vasupList = addedVaList.filter(o1 => selectedRowKeys.filter(o2 => o1.id != o2.id));
      // console.log("vasupList",vasupList)
      var tempArr = addedVaList.filter((item)=> {
        return !selectedRowKeys.includes(item); 
      });
      // console.log("tempArr",tempArr)
      const added_br = vaList.filter((val) => arr.includes(val.id));
      const added_br1 = vaList.filter((val) => selectedRowKeys.includes(val.id));
      const added_br2 = vaSupList.filter((val) => tempArr.includes(val.id));
      // console.log("added_br", added_br);
      // console.log("added_br1", added_br1);
      // setAddedVa([...addedVa, ...added_br]);
      // setAddVaList([...addedVa, ...added_br]);
      // console.log("added_br1", added_br1);
      // console.log("added_br2", added_br2);
      if(added_br.length > 0){
        setAddedVa([...addedVa, ...added_br]);
        setAddVaList([...addedVa, ...added_br]);
      }else if(added_br.length === 0){
        setAddedVa([...added_br2,...added_br1]);
        setAddVaList([...added_br2,...added_br1]);
      }
    },
  };

  const varowSelection = {
    selectedRowKeys: selectedVASUPRows,
    onChange: (selectedRowKeys) => {
      // console.log("VA SUP rows",selectedRowKeys);
      // console.log("VA  rows",selectedRowKeys);
      setSelectedVASUPRows([...selectedRowKeys]);
      // console.log("VA already added", addedVa);
      const existingVA = addedVa.map((addedPerson) => addedPerson.id);
      // console.log("existingVAinsup",existingVA)

      const arr = selectedRowKeys.filter((val) => !existingVA.includes(val));
      // console.log("VA SUP arr",arr);

      const added_br = vaSupList.filter((val) => arr.includes(val.id));
      const added_br2 = vaList.filter((val) => selectedVARowKeys.includes(val.id));
      const added_br3 = vaSupList.filter((val) => selectedRowKeys.includes(val.id));
      // console.log("added_br", added_br);
      if(added_br.length > 0){
        setAddedVa([...addedVa, ...added_br]);
        setAddVaList([...addedVa, ...added_br]);
      }else {
        setAddedVa([...added_br3,...added_br2]);
        setAddVaList([...added_br3,...added_br2]);
      }
    },
  };

  const searcher = new FuzzySearch(data, ["uid"], { sort: true });

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) {
      const result = searcher.search(value);
      setVaList([...result]);
    } else {
      setVaList(data);
    }
  };

  const vasearcher = new FuzzySearch(vadata, ["uid"], {
    sort: true,
  });

  const handleVASearch = (e) => {
    const value = e.target.value;
    if (value) {
      const result = vasearcher.search(value);
      setSupVaList([...result]);
    } else {
      setSupVaList(vadata);
    }
  };
  const addVAsearch = new FuzzySearch(addedVaList, ["uid"], {
    sort: true,
  });

  const handleAddVASearch = (e) => {
    const value = e.target.value;
    if (value) {
      const result = addVAsearch.search(value);
      setAddedVa([...result]);
    } else {
      setAddedVa(addedVaList);
    }
  };

  const onUploadFile = () => {
    fetchVaList();
  }

  return (
    <div>
      <Row>
        <Col>
          <BulkAssignVA campaign_id = {id} onUpload = {onUploadFile}/>
        </Col>
      </Row>
      <h1
        style={{
          textAlign: "center",
          color: "cadetblue",
          fontSize: "22px",
          textDecorationLine: "underline",
        }}
      >
        Assign Sales People -{" "}
        <span style={{ color: "#004d80" }}>{campaign}</span>
      </h1>
      <br/>
      <Row style={{ marginBottom: "1%" }}>
        <Col xl={16} xs={8}>
          <Search
            placeholder="Search by uid ..."
            enterButton="Search"
            onChange={handleSearch}
          />
        </Col>
        {/* <Col xl={{ span: 8, offset: 1 }} xs={8}>
          <Search
            placeholder="Search by uid ..."
            enterButton="Search"
            onChange={handleVASearch}
          />
        </Col>
        <Col xl={{ span: 4, offset: 3 }} xs={6}>
          <Search
            placeholder="Search by uid "
            enterButton="Search"
            onChange={handleAddVASearch}
          />
        </Col> */}
      </Row>
      <Row className="valist-table">
        <Col xl={{ span: 16, offset: 0 }} xs={24}>
          <Table
            className="valist-table"
            // rowClassName={(record, index) => record.assign_status == 566 || record.assign_status == 569 ? 'table-row-dark' : ''}
            columns={columns}
            dataSource={vaList}
            loading={loading}
            rowSelection={{
              ...rowSelection,
            }}
            // size= 'small'
          />
        </Col>
        {/* <Col xl={{ span: 8, offset: 1 }} xs={24}>
          <Table
            className="valist-table"
            // rowClassName={(record, index) => record.assign_status == 566 || record.assign_status == 569 ? 'table-row-dark' : ''}
            columns={columns}
            dataSource={vaSupList}
            loading={loading}
            rowSelection={{
              ...varowSelection,
            }}
            // size= 'small'
          />
        </Col> */}
        <Col xl={{ span: 6, offset: 1 }} xs={{ span: 24, offset: 0 }}>
          <Card 
            title={`TOTAL( ${addedVa.length} )` }
            style={{ width: "100%" }}
          >
            <div className="card-body-list">
              {addedVa.map((va) => {
                // console.log(va);
                return (
                  <Row key={va.id} style={{ alignItems: "baseline" }}>
                    <Col span={16} offset={3}>
                      <p>
                        {va.full_name}- {va.uid} ({va.role})
                      </p>
                    </Col>
                    <Col span={5}>
                      <Button
                        className="remove-btn"
                        type="link"
                        danger
                        onClick={() => {
                          showModal(va.id);
                        }}
                      >
                        <Tooltip title="Remove from List ">
                          <DeleteOutlined style={{ fontSize: "18px" }} />
                        </Tooltip>
                      </Button>
                    </Col>
                  </Row>
                );
              })}
            </div>
            <div
              style={{
                textAlign: "center",
                marginTop: "30px",
                marginBottom: "12px",
              }}
            >
              <Button
                type="primary"
                disabled={addedVa.length < 1 || loadingAssign}
                onClick={onFinish}
              >
                {loadingAssign && <LoadingOutlined />} Assign
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
      <Modal
        transitionName=""
        maskTransitionName=""
        title="Warning !!"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button danger key="1" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="2" type="primary" danger onClick={handleOk}>
            Yes
          </Button>,
        ]}
      >
		<h1>{deleteId.full_name}</h1>
    <h2>Role: <span>{deleteId.role}</span></h2>
    <h3>Do you want to remove this user ?</h3>
      </Modal>
    </div>
  );
};

export default AssignVA;
