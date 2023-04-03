import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';

const DonutChart = ({data}) => {

  const config = {
    appendPadding: 10,
    data,
    width: 600,
    height: 200,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        formatter: function formatter() {
          return '';
        },
      },
    },
  };

  return(
    <div>
      <Pie {...config} />
    </div>    
  )
};

export default DonutChart;
