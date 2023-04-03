import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const DashboardCard = () => {

    const { id } = useParams();
    const location = useLocation();
    console.log('location', location);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <iframe
            allowfullscreen="true"
            style={{ width: '100%', height: '100%' }} 
            src= {location.path} 
            title="description" 
            />
        </div>
    );
};

export default DashboardCard;