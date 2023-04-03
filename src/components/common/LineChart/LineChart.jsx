import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
import './LineChart.scss';

const LineChart = ({data}) => {

  const config = {
    data,
    xField: 'year',
    yField: 'value',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#2593fc',
        lineWidth: 2,
      },
    },
  };
  return(
    <div className="linechart-div">

        <Line {...config} />
    </div>    
  )
};

export default LineChart;