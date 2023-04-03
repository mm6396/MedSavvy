import React, {useEffect} from 'react';

const CampaignDashboard = () => {

    useEffect(() => {

        document.title = 'Prism CRM Campaign Dashboard ' ;

        window.scrollTo(0,0);
          
      }, []);

    return (
        <div>
            Campaign Dashboard
        </div>
    );
}

export default CampaignDashboard;