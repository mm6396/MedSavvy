import React from 'react';
import { Alert, Space, Button } from 'antd';

const AlertMsg = (mssg, type,des, btn_txt) => {
    console.log('object')
    return (
        <div>
            <Alert
                message={mssg}
                description= {des}
                type={type}
                action={
                    <Space direction="vertical">
                        <Button size="small" type="primary">
                            {btn_txt}
                        </Button>
                    </Space>
                }
                closable
            />
        </div>
    )
}

export default AlertMsg
