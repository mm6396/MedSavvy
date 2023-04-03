import React, {useState} from 'react';
import { Pie } from '@ant-design/charts' ;     
import './PieChart.scss';


const PieChart = ({data}) => {

    const config = { 
        appendPadding : 4 , 
        data ,
        angleField : 'value' , 
        colorField : 'type' , 
        radius : 0.8 , 
        label : { 
          type : 'inner' , 
          offset : '-0.5' , 
          content : '{percentage}' , 
          style : { 
            fill : '#fff' , 
            fontSize : 12 , 
            textAlign : 'center' , 
          } ,
        } ,
    } ;

    return (
        <div className="piechart-div">
            < Pie { ... config } />
        </div>
    );
};

export default PieChart;