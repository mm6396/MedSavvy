import React, {useEffect, useState} from 'react';
import { Pie } from '@ant-design/charts' ;          
import { Row, Col, Table } from 'antd' ;     
import './Common/Charts.scss'
import { FieldForceManagerAPI } from '../../../util/ApiGateway/Api'

const Overall = () => {
    const [tableData, setTableData] = useState([]);
    const [pieData, setPieData] = useState([]);
    useEffect(() => {
        async function fetchData () {
            let { data } = await FieldForceManagerAPI.post('/performance/overall-count', { id: localStorage.getItem('id')}, { headers: {
              Authorization: 'Bearer ' + localStorage.getItem("accessToken")
            }})
            data = data.data[0];
            let total = data.active_dc + data.active_ac + data.active_sup + data.active_br + data.deactive_dc + data.deactive_ac + data.deactive_sup + data.deactive_br + data.terminated_dc + data.terminated_ac + data.terminated_sup + data.terminated_br + data.pending_approval_dc + data.pending_approval_ac + data.pending_approval_sup + data.pending_approval_br;
            let brTotal = data.active_br + data.deactive_br + data.terminated_br + data.pending_approval_br;
            let acTotal = data.active_ac +  data.deactive_ac + data.terminated_ac + data.pending_approval_ac;
            let supTotal = data.active_sup + data.deactive_sup + data.terminated_sup + data.pending_approval_sup;
            let dcTotal = data.active_dc +  data.deactive_dc + data.terminated_dc + data.pending_approval_dc;

            let mappedData = [
                {
                    type: 'BR',
                    active: data.active_br,
                    deactive: data.deactive_br,
                    terminated: data.terminated_br,
                    pending: data.pending_approval_br,
                    total: data.active_br + data.deactive_br + data.terminated_br + data.pending_approval_br,
                    key: "1"
                }, 
                {
                    type: 'SUP',
                    active: data.active_sup,
                    deactive: data.deactive_sup,
                    terminated: data.terminated_sup,
                    pending: data.pending_approval_sup,
                    total: data.active_sup + data.deactive_sup +  data.terminated_sup + data.pending_approval_sup,
                    key: "2"
                }, 
                {
                    type: 'AC',
                    active: data.active_ac,
                    deactive: data.deactive_ac,
                    terminated: data.terminated_ac,
                    pending: data.pending_approval_ac,
                    total: acTotal,
                    key: "3"
                },
                {
                    type: 'DC',
                    active: data.active_dc,
                    deactive: data.deactive_dc,
                    terminated: data.terminated_dc,
                    pending: data.pending_approval_dc,
                    total: dcTotal,
                    key: "4"
                },  

                {
                    type: <b>Total</b>,
                    active: <b>{data.active_dc + data.active_ac + data.active_sup + data.active_br}</b>,
                    deactive: <b>{data.deactive_dc + data.deactive_ac + data.deactive_sup + data.deactive_br}</b>,
                    terminated: <b>{data.terminated_dc + data.terminated_ac + data.terminated_sup + data.terminated_br}</b>,
                    pending: <b>{data.pending_approval_dc + data.pending_approval_ac + data.pending_approval_sup + data.pending_approval_br}</b>,
                    total: <b>{total}</b>,
                    key: "5"
                },  
            ]; 
            
            let percentageData = [
              {
                type: "BR",
                value: brTotal,
              },
              {
                type: "AC",
                value:  acTotal,
              },
              {
                type: "DC",
                value: dcTotal,
              },
              {
                type: "SUP",
                value:  supTotal,
              },
            ];

            setPieData(percentageData.filter((val) => val.value != 0));
            setTableData(mappedData);
        }     
        fetchData();
    }, [])

    var config = {
      appendPadding: 10,
      data: pieData,
      angleField: "value",
      colorField: "type",
      radius: 0.8,
      label: {
        type: "outer",
        content: "{name} {percentage}",
      },
      interactions: [{ type: "pie-legend-active" }, { type: "element-active" }],
    };

    const columns = [
      {
        title: "Field Force Type",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "Active",
        dataIndex: "active",
        key: "active",
      },
      {
        title: "Deactive",
        dataIndex: "deactive",
        key: "deactive",
      },
      {
        title: "Pending",
        dataIndex: "pending",
        key: "pending",
      },
      {
        title: "Terminated",
        dataIndex: "terminated",
        key: "address",
      },
      {
        title: "Total",
        dataIndex: "total",
        key: "total",
      },
    ];

    return (
        <Row direction='row'>
          <Col xs={24} lg={9}>
            <div className="piechart-div">
                <Pie {...config} />
            </div>
          </Col>
          <Col xs={24} lg={{span: 10, offset: 2}} style={{marginTop: "2vh"}}>
            <Table columns={columns} dataSource={tableData} pagination={false}/>
          </Col>
        
        </Row>
    )
}

export default Overall;