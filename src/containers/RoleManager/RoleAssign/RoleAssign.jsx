import React, {useEffect} from 'react';

const RoleAssign = () => {

    useEffect(() => {

        document.title = 'Prism CRM Assigning Role' ;
        window.scrollTo(0,0);
          
    }, []);

    return (
        <div>
            Role Assignment
        </div>
    );
}

export default RoleAssign;