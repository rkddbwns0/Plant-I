const express = require('express');
const axios = require('axios');
const router = express.Router();

const lang = 'kr';

router.get('/weatherInfo', async (req, res) => {
    try {
        const { lat, lon } = req.query;
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=${lang}&units=metric`
        );
        const locationResponse = await axios.get(
            `http://api.openweathermap.org/geo/1.0/direct?q=${response.data.name}&limit=5&appid=${API_KEY}`
        );

        const weatherId = response.data.weather[0].id;
        let weatherCondition;
        let weatherImages;

        if (weatherId >= 200 && weatherId < 600) {
            weatherCondition = 'Rainy';
            weatherImages = '';
        } else if (weatherId >= 600 && weatherId < 623) {
            weatherCondition = 'Snowy';
            weatherImages = '';
        } else if ((weatherId >= 701 && weatherId < 782) || (weatherId >= 801 && weatherId < 805)) {
            weatherCondition = 'Cloudy';
            weatherImages = '';
        } else if (weatherId === 800) {
            weatherCondition = 'Sunny';
            weatherImages = '';
        }

        const weatherData = {
            weather: response.data.weather,
            main: response.data.main,
            wind: response.data.wind,
            name: response.data.name,
            rain: response.data.rain,
            local_name: locationResponse.data[0].local_names.ko,
            condition: weatherCondition,
            weatherImages: weatherImages,
        };
        res.json(weatherData);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
