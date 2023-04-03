import React, {useEffect} from 'react';

const CampaignAssign = () => {

    useEffect(() => {

        document.title = 'Prism CRM Assigning Campaign' ;
        window.scrollTo(0,0);
          
      }, []);

    return (
        <div>
            Campaign Assign
        </div>
    );
}

export default CampaignAssign;