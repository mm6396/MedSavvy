import React, {useState} from 'react';
import { Card, Col, Row } from 'antd';
import Overall from './Overall'
import Types from './Types';

const tabListNoTitle = [
    {
      key: 'overall',
      tab: 'Overall Field Force Status',
    },
    {
      key: 'types',
      tab: 'By Employment Type Field Force Status',
    },
  ];

const contentListNoTitle = {
    overall: <Overall/>,
    types: <Types/>,
};

const TotalCounts = () => {
    const [ activeKey, setActiveKey ] = useState('overall')

    return (
        <Card
            style={{ width: '100%', marginTop: "2vh" }}
            tabList={tabListNoTitle}
            activeTabKey={activeKey}
            onTabChange={key => setActiveKey(key)}
        >
        {contentListNoTitle[activeKey]}
      </Card>
    )
} 



export default TotalCounts;
 