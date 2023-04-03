import React, {useEffect, useState} from 'react';
import { Pie } from '@ant-design/charts' ;          
import { Row, Col, Table, Card } from 'antd' ;     
import './Common/Charts.scss'
import { FieldForceManagerAPI } from '../../../util/ApiGateway/Api'
import {nanoid} from 'nanoid';

const AveragePercentilePerformance = () => {
    const [tableData, setTableData] = useState([]);
    const [pieData, setPieData] = useState([]);
    useEffect(() => {
        async function fetchData () {
            let { data } = await FieldForceManagerAPI.post('/performance/get-percentile-performance', { id: localStorage.getItem('id')}, { headers: {
              Authorization: 'Bearer ' + localStorage.getItem("accessToken")
            }})
            data = data.data[0];
            data.key = 1;
            console.log(data);

            console.log(data);
            let percentageData = [
              {
                type: "0% To 50%",
                value: parseInt(data['0to50']),
              },
              {
                type: "51% To 60%",
                value:  parseInt(data['51to60']),

              },
              {
                type: "61% To 70%",
                value: parseInt(data['61to70']),
              },
              {
                type: "71% To 80%",
                value:  parseInt(data['71to80']),
              },
              {
                type: "81% To 100%",
                value:  parseInt(data['81to100']),
              },
            ];

            setPieData(percentageData.filter((val) => val.value != 0));
            setTableData([data]);
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
        <Card title="Average Performance Score BR" style={{marginTop: "2vh"}}>
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

export default AveragePercentilePerformance;