import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';
import { SERVER_ADDRESS } from '../ServerAddress';

const LocationInfo = ({ onLocationChange }) => {
    const [locationAuth, setLocationAuth] = useState(false);

    useEffect(() => {
        const getLocation = async () => {
            try {
                const isLocationEnabled = await Location.hasServicesEnabledAsync();
                if (!isLocationEnabled) {
                    return;
                }

                const { status: existingStatus } = await Location.getForegroundPermissionsAsync();
                let finalStatus = existingStatus;

                if (existingStatus !== 'granted') {
                    const { status } = await Location.requestForegroundPermissionsAsync();
                    finalStatus = status;
                }

                if (finalStatus !== 'granted') {
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;
                onLocationChange({ lat: latitude, lon: longitude });
                await axios.post(
                    `${SERVER_ADDRESS}/userlocationdb/locationInfo`,
                    {
                        lat: latitude,
                        lon: longitude,
                    },
                    { withCredentials: true }
                );
                setLocationAuth(true);
            } catch (error) {}
        };
        if (!locationAuth) {
            getLocation();
        }
    }, [onLocationChange, locationAuth]);

    return null;
};

export default LocationInfo;
