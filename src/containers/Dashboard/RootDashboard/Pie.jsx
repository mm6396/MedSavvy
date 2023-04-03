import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';

const PieChart = ({data}) => {
	const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.75,
        label: {
          type: 'spider',
          labelHeight: 28,
          content: '{name}\n{percentage}',
        },
        interactions: [
          {
            type: 'element-selected',
          },
          {
            type: 'element-active',
          },
        ],
      };
	return <Pie {...config} />;
}

export default PieChart ;
