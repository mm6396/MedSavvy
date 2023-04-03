import React, { useState } from 'react';
import { CSVLink } from "react-csv";

const ExportData = (props) => {
	const [csvReport, setCsv] = useState({ data: [], headers: [], filename: 'undefined.csv' });
	console.log(props.csvData);
	const downloadReport = (event, done) => {
		const objReport = {
			 filename: props.fileName,
			 headers: props.headers,
			 data: props.csvData
		};
		setCsv(objReport);
  };

	return (
			<CSVLink
				{...csvReport}
				onClick={downloadReport}
				style={{ color: 'white', paddingLeft: '5px' }}
			>
				Export Report
         </CSVLink>
	)
}

export default ExportData;
