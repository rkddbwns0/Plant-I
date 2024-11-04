const weatherMessage = [
    {
        condition: (temp, condition) => condition === 'Sunny' && temp >= 11 && temp <= 27,
        message: '기온이 적절해요. 햇빛을 많이 비춰주세요!',
    },
    {
        condition: (temp, condition) => condition === 'Sunny' && temp <= 10,
        message: '식물이 시들 수 있어요. 식물을 실내에서 관리해 주세요.',
    },
    {
        condition: (temp, condition) => condition === 'Sunny' && temp >= 28,
        message: '햇빛이 너무 강할 수 있어요. 햇빛과 거리를 둬 주세요.',
    },
    {
        condition: (temp, condition) => condition === 'Rainy' && temp >= 11 && temp <= 27,
        message: '비를 맞게 해주세요. 하지만 비가 많이 오면 실내에서 관리해 주세요.',
    },
    {
        condition: (temp, condition) => condition === 'Rainy' && temp <= 10,
        message: '비가 오고 온도가 낮아서 식물이 시들 수 있어요. 따뜻한 실내에서 관리해 주세요.',
    },
    {
        condition: (temp, condition) => condition === 'Rainy' && temp >= 28,
        message: '비가 오고 많이 습해요. 식물을 실내에서 관리해 주세요.',
    },
    {
        condition: (temp, condition) => condition === 'Snowy' && temp <= 10,
        message: '날씨가 추워서 식물이 시들 수 있어요. 따뜻한 장소로 옮겨주세요.',
    },
    {
        condition: (temp, condition) => condition === 'Cloudy' && temp >= 11 && temp <= 27,
        message: '날이 흐리지만 기온이 적절해요. 식물 상태를 한 번씩 확인해 주세요.',
    },
    {
        condition: (temp, condition) => condition === 'Cloudy' && temp <= 10,
        message: '날이 흐리고 추워요. 식물이 시들지 않도록 따뜻한 곳에서 관리해 주세요.',
    },
    {
        condition: (temp, condition) => condition === 'Cloudy' && temp >= 28,
        message: '흐리고 날이 더워요. 식물의 잎 상태를 잘 확인해 주세요.',
    },
];

const getWeatherMessage = (temp, condition) => {
    const matchWeather = weatherMessage.find((item) => item.condition(temp, condition));
    return matchWeather ? matchWeather.message : '알 수 없음';
};

export default getWeatherMessage;
