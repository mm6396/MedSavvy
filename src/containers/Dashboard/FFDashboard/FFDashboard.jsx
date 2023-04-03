import React, {useEffect} from 'react';
import {Row, Col} from 'antd';
import Cards from '../../../components/Dashboard/FFDashboard/Cards'
import TotalCounts from '../../../components/Dashboard/FFDashboard/FFTotalCounts'
import AveragePercentile from '../../../components/Dashboard/FFDashboard/AveragePercentile'
import AveragePercentilePerformance from '../../../components/Dashboard/FFDashboard/AveragePercentilePerformance'

const FFDashboard = () => {

    useEffect(() => {

        document.title = 'Prism CRM Field Force Dashboard ' ;

        window.scrollTo(0,0);
          
      }, []);

    return (
        <div>
            <Cards/>
            <TotalCounts/>
            <Row> 
                <Col lg={{span: 12}} style={{paddingRight: "2vh"}}>
                    <AveragePercentile/>
                </Col>
                <Col lg={{span: 12}}> 
                    <AveragePercentilePerformance/>
                </Col>
            </Row>
        </div>
    );
}

export default FFDashboard;