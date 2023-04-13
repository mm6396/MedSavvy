import { UsergroupAddOutlined, UploadOutlined  } from '@ant-design/icons';
import { Button, message, Input, Upload } from 'antd';
import React, { useState } from 'react';
import { CallVerificationAPI } from '../../../util/ApiGateway/Api';


const BulkAssignVA = ({campaign_id, onUpload}) => {
    const vaList = {
      name: 'file',
      action: `${process.env.REACT_APP_ecrm_call_verification_module}/api/v1/callverification/bulk-assign/${campaign_id}`,
      headers: {
        authorization: 'Bearer ' + localStorage.getItem("accessToken")
      },
    
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
    
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          onUpload();
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

  return (
    <div> 
      <Upload {...vaList}>
        <Button type='primary' shape = 'round' icon={<UsergroupAddOutlined/>}>Click to Bulk Assign</Button>
      </Upload>    
    </div>
  )
}

export default BulkAssignVA