import React, {useEffect, useState} from 'react';
import { Pie } from '@ant-design/charts' ;          
import { Row, Col, Table, Card } from 'antd' ;     
import './Common/Charts.scss'
import { FieldForceManagerAPI } from '../../../util/ApiGateway/Api'

const AveragePercentile = () => {
    // const [tableData, setTableData] = useState([]);
    const [pieData, setPieData] = useState([]);
    useEffect(() => {
        async function fetchData () {
            let { data } = await FieldForceManagerAPI.post('/performance/get-percentile', { id: localStorage.getItem('id')}, { headers: {
              Authorization: 'Bearer ' + localStorage.getItem("accessToken")
            }})
            data = data.data[0];
            data.key = 1;

            let percentageData = [
              {
                type: "0% To 50%",
                value: data['0to50'],
                key: "1"
              },
              {
                type: "51% To 60%",
                value:  data['51to60'],
                key: "2"
              },
              {
                type: "61% To 70%",
                value: data['61to70'],
                key: "3"
              },
              {
                type: "71% To 80%",
                value:  data['71to80'],
                key: "4"            
              },
              {
                type: "81% To 100%",
                value:  data['81to100'],
                key: "5"
              },
            ];

            setPieData(percentageData.filter((val) => val.value != 0));
            // setTableData([data]);
        }
    		let isMounted = true;
        fetchData();
  	  	return () => { isMounted = false }; 
    }, [])

    var config = {
      appendPadding: 10,
      data: pieData,
      angleField: "value",
      colorField: "type",
      radius: 0.8,
      label: {
        type: "outer",
        content: "{name}\n{percentage}",
      },
      interactions: [{ type: "pie-legend-active" }, { type: "element-active" }],
    };

    // const columns = [
    //   {
    //     title: "0% To 50%",
    //     dataIndex: "0to50",
    //     key: "0to50",
    //   },
    //   {
    //     title: "51% To 60%",
    //     dataIndex: "51to60",
    //     key: "51to60",
    //   },
    //   {
    //     title: "61% To 70%",
    //     dataIndex: "61to70",
    //     key: "61to70",
    //   },
    //   {
    //     title: "71% To 80%",
    //     dataIndex: "71to80",
    //     key: "71to80",
    //   },
    //   {
    //     title: "81% To 100%",
    //     dataIndex: "81to100",
    //     key: "81to100",
    //   },
    // ];

    return (
        <Card title="Average Campaign Score BR" style={{marginTop: "2vh"}}>
            <Row direction='row'>
                <Col xs={24} lg={{span: 24}}>
                    <div className="piechart-div"> <Pie {...config} /></div>
                </Col>
                {/* <Col xs={24} lg={{span: 24}} style={{marginTop: "2vh"}}>
                    <Table columns={columns} dataSource={tableData} style={{marginLeft: "5vh"}} pagination={false}/>
                </Col> */}
            </Row>
        </Card>
    )
}

export default AveragePercentile;