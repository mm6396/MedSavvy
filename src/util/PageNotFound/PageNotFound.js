import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
	return (
		<div>
			<Result
				status="404"
				title="404"
				subTitle="Sorry, the page you visited does not exist or you do not have access to view this page."
				extra={<Link to="/manager/dashboard"><Button type="primary">Go Back</Button></Link>}
			/>,
		</div>
	)
}

export default PageNotFound
