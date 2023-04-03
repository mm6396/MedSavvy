import { notification } from 'antd';

const notificationFun = (message, description, type) => {
    notification[type]({
        message: message,
        description: description
    });
}
 export default notificationFun;