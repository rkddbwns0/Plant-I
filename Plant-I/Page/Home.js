import React, { useState, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import CustomStatusBar from '../Components/CustomComponents/CustomStatusBar';
import { SERVER_ADDRESS } from '../Components/ServerAddress';
import UserPlantDataComponent from '../Components/HomeComponents/UserPlantDataComponent';
import WeatherComponent from '../Components/HomeComponents/WeatherComponent';
import SkeletonComponent from '../Components/SkeletonComponent';
import NoPlantDataComponent from '../Components/HomeComponents/NoPlantDataComponent';
import TopButtonComponent from '../Components/HomeComponents/TopButtomComponent';

const Home = () => {
    const [userPlantData, setUserPlantData] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [weatherData, setWeatherData] = useState({
        temp: 0,
        temp_max: 0,
        temp_min: 0,
        humidity: 0,
        condition: '',
        desc: '',
        icon: '',
        local_name: '서울',
        weatherImages: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [locationChange, setLocationChange] = useState(false);

    const getPlantData = async () => {
        try {
            const response = await axios.get(`${SERVER_ADDRESS}/userplantdb/select`, { withCredentials: true });
            const data = response.data;
            setUserPlantData(data);
        } catch (error) {
            console.log(error);
        }
    };

    const WeatherInfo = async (latitude, longitude) => {
        try {
            const response = await axios.get(`${SERVER_ADDRESS}/weather/weatherInfo`, {
                params: {
                    lat: latitude,
                    lon: longitude,
                },
            });
            const data = response.data;
            setWeatherData({
                name: data?.name,
                local_name: data.local_name,
                temp: Math.round(data?.main?.temp),
                temp_max: Math.round(data?.main?.temp_max),
                temp_min: Math.round(data?.main?.temp_min),
                humidity: data?.main?.humidity,
                condition: data.condition,
                desc: data?.weather[0]?.description,
                weatherImages: data.weatherImages,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const userLocationInfo = async () => {
        try {
            const response = await axios.post(`${SERVER_ADDRESS}/userlocationdb/select`, {}, { withCredentials: true });
            const data = response.data;
            if (data.length > 0) {
                setUserLocation({ lat: data[0]?.lat, lon: data[0]?.lon });
                WeatherInfo(data[0]?.lat, data[0]?.lon);
            } else {
                const defaultLat = '37.5683';
                const defaultLon = '126.9778';
                setUserLocation({ lat: defaultLat, lon: defaultLon });
                WeatherInfo(defaultLat, defaultLon);
            }
            setLocationChange(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLocationChange = ({ lat, lon }) => {
        setUserLocation({ lat, lon });
        WeatherInfo(lat, lon);
    };

    useEffect(() => {
        userLocationInfo();
    }, []);

    useEffect(() => {
        if (locationChange) {
            WeatherInfo(userLocation.lat, userLocation.lon);
        }
    }, [userLocation]);

    useFocusEffect(
        useCallback(() => {
            getPlantData();
        }, [])
    );

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <CustomStatusBar />
            {isLoading ? (
                <SkeletonComponent />
            ) : (
                <>
                    <WeatherComponent weatherData={weatherData} handleLocationChange={handleLocationChange} />
                </>
            )}

            <TopButtonComponent />

            {userPlantData.length > 0 ? (
                <UserPlantDataComponent userPlantData={userPlantData} />
            ) : (
                <>
                    <NoPlantDataComponent />
                </>
            )}
        </View>
    );
};

export default Home;
