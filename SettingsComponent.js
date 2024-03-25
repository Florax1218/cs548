import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SettingsComponent() {
    const [operatingStatus, setOperatingStatus] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.post('http://localhost:3000/fetch-settings');
                setOperatingStatus(response.data.operatingStatus);
            } catch (error) {
                console.error('Error fetching settings:', error);
            }
        };

        fetchSettings();
    }, []);

    return (
        <div>
            <p>Operating Status is {operatingStatus}</p>
        </div>
    );
}

export default SettingsComponent;
