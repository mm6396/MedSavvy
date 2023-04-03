import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/charts';
import './ColumnChart.scss'

const ColumnChart = ({data}) => {

  const config = {
    data,
    width: 600,
    height: 200,
    xField: 'year',
    yField: 'value'
  };
  return(
    <div>
      <Column {...config} />
    </div>    
  )
};

export default ColumnChart;