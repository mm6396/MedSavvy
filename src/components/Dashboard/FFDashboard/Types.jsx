import React, {useEffect, useState} from 'react';
import { Pie } from '@ant-design/charts' ;          
import { Row, Col, Table } from 'antd' ;     
import './Common/Charts.scss'
import { FieldForceManagerAPI } from '../../../util/ApiGateway/Api'

const Types = () => {
    const [tableData, setTableData] = useState([]);
    const [pieData, setPieData] = useState([]);
    useEffect(() => {
        async function fetchData () {
            let { data } = await FieldForceManagerAPI.post('/performance/type-count', { id: localStorage.getItem('id')}, { headers: {
              Authorization: 'Bearer ' + localStorage.getItem("accessToken")
            }})
            data = data.data[0];

            console.log('====================================');
            console.log(data);
            console.log('====================================');

            // let total = parseInt(data.total_br) + parseInt(data.total_ac) + parseInt(data.total_supervisor) + parseInt(data.total_dc);
            let brTotal = parseInt( data.total_br );
            let acTotal = parseInt( data.total_ac );
            let supTotal =  parseInt( data.total_supervisor );
            let dcTotal = parseInt( data.total_dc );

            let mappedData = [
                {
                    type: 'BR',
                    fixed: data.fixed_br,
                    cycle: data.cycle_br,
                    interim: data.intrim_br,
                    total: data.total_br
                }, 
                {
                    type: 'SUP',
                    fixed: data.fixed_supervisor,
                    cycle: data.cycle_supervisor,
                    interim: data.intrim_supervisor,
                    total: data.total_supervisor
                }, 
                {
                    type: 'AC',
                    fixed: data.fixed_ac,
                    cycle: data.cycle_ac,
                    interim: data.intrim_ac,
                    total: data.total_ac
                },
                {
                    type: 'DC',
                    fixed: data.fixed_dc,
                    cycle: data.cycle_dc,
                    interim: data.intrim_dc,
                    total: data.total_dc
                },  

                {
                    type: <b>Total</b>,
                    fixed: <b>{parseInt(data.fixed_dc) + parseInt(data.fixed_ac) + parseInt(data.fixed_supervisor) + parseInt(data.fixed_br)}</b>,
                    cycle: <b>{parseInt(data.cycle_dc) + parseInt(data.cycle_ac) + parseInt(data.cycle_supervisor) + parseInt(data.cycle_br)}</b>,
                    interim: <b>{parseInt(data.intrim_dc) + parseInt(data.intrim_ac) + parseInt(data.intrim_supervisor) + parseInt(data.intrim_br)}</b>,
                    total: <b>{parseInt(data.total_dc) + parseInt(data.total_ac) + parseInt(data.total_supervisor) + parseInt(data.total_br)}</b>
                },  
            ]; 
            
            let percentageData = [
              {
                type: "BR",
                value: brTotal || 0,
              },
              {
                type: "AC",
                value:  acTotal ,
              },
              {
                type: "DC",
                value: dcTotal,
              },
              {
                type: "SUP",
                value: supTotal,
              },
            ];

            console.log(percentageData);
            // setPieData(percentageData.filter((val) => val.value != 0));
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
        title: "Fixed",
        dataIndex: "fixed",
        key: "fixed",
      },
      {
        title: "Cycle",
        dataIndex: "cycle",
        key: "cycle",
      },
      {
        title: "Interim",
        dataIndex: "interim",
        key: "interim",
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

export default Types;