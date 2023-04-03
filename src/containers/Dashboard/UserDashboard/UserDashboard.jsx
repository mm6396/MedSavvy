import React, {useEffect} from 'react';

const UserDashboard = () => {

    useEffect(() => {

        document.title = 'Prism CRM User Dashboard ' ;
        window.scrollTo(0,0);
          
      }, []);

    return (
        <div>
            User Dashboard
        </div>
    );
}

export default UserDashboard;