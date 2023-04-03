import React, {useEffect, useState} from 'react';
import { Card, Col, Row } from 'antd';
import { FieldForceManagerAPI } from '../../../util/ApiGateway/Api'

const Cards = () => {
    const [counts, setCounts ] = useState({ total: 0, free: 0, assigned: 0})
    useEffect(() => {
      const fetchData = async () => {
        let { data } = await FieldForceManagerAPI.post('/performance/get-field-force-count', { id: localStorage.getItem('id')},
        { headers: {
          Authorization: 'Bearer ' + localStorage.getItem("accessToken")
        }})
        
        data = data.data[0] 
        console.log("BR Count ", data);
        setCounts({
          total: parseInt( data?.total_active_br ),
          assigned: parseInt( data?.active_campaign_br),
          free: parseInt( data?.total_active_br ) - parseInt( data?.active_campaign_br)
        })
      }
      fetchData();
    }, [])

    return (
        <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Total field force enlisted in campaigns" bordered={false}>
              { counts.assigned }
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Total field force available" bordered={false}>
            { counts.free }
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Total Field force" bordered={false}>
            { counts.total }
            </Card>
          </Col>
        </Row>
      </div>
    )
} 

export default Cards;
 