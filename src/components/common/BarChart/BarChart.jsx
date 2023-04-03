import React, { useState, useEffect } from 'react';
import { Bar } from '@ant-design/charts';

const BarChart = ({data}) => {
 
  const config = {
    data,
    xField: 'sales',
    yField: 'type',
    meta: {
      type: { alias: 'catagories' },
      sales: { alias: 'sales' },
    },
  };
  return <Bar {...config} />;
};

export default BarChart;