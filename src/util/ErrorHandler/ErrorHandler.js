import notification from '../Notification/Notification';

const ErrorHandler = (message, history) => {
    if (message === 'Session Expired') {
        localStorage.clear();
        history.push('/login');
    }
    else if (message === 'System is under maintenance!!') {
        localStorage.clear();
        history.push('/under-maintenance');
    }
    else{
        notification(message, 'Please fix this error and try again. Otherwise communicate with the admin', 'error');
    }
}

export default ErrorHandler;