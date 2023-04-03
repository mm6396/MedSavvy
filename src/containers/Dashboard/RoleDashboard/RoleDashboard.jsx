import React, {useEffect} from 'react';

const RoleDashboard = () => {

    useEffect(() => {

        document.title = 'Prism CRM Role Dashboard ' ;

        window.scrollTo(0,0);
          
      }, []);

    return (
        <div>
            Role Dashboard
        </div>
    );
}

export default RoleDashboard;