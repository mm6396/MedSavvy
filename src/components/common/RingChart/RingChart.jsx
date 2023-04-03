import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';

const RingChart = () => {
  var data = [
    {
        type : 'Classification One' , 
        value: 27,
    },
    {
        type : 'Class 2' , 
        value: 25,
    },
    {
        type : 'Classification Three' , 
        value: 18,
    },
    {
    type : 'Classification Four' , 
    value: 15,
    },
    {
    type : 'Classification Five' , 
    value: 10,
    },
    {
    type : 'Other' , 
    value: 5,
    },
  ];
  var config = {
    appendPadding: 10,
    data: data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-0.5',
      content: '{percentage}',
      style: {
        fill: '#fff',
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    statistic: {
      title: false,
      content: {
        style: { fontSize: 44 },
        formatter: function formatter() {
          return 'AntV\nG2Plot';
        },
      },
    },
  };
  return <Pie {...config} />;
};

export default RingChart;