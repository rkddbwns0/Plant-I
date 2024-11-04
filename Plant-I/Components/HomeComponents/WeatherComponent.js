import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Animated, Dimensions, ScrollView, Text } from 'react-native';
import LocationInfo from './Location';
import getWeatherMessage from '../../JSONData/weatherMessage';

const WeatherComponent = ({ weatherData, handleLocationChange }) => {
    const weatherMessage = getWeatherMessage(weatherData?.temp, weatherData?.condition);
    const windowWidth = Dimensions.get('window').width;

    const translateX = useRef(new Animated.Value(0)).current;
    const [messeageWidth, setMessageWidth] = useState(0);

    useEffect(() => {
        if (messeageWidth > 0) {
            const TextAnimated = Animated.loop(
                Animated.sequence([
                    Animated.timing(translateX, {
                        toValue: -messeageWidth,
                        duration: 12000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(translateX, {
                        toValue: windowWidth,
                        duration: 0,
                        useNativeDriver: true,
                    }),
                ])
            );
            TextAnimated.start();

            return () => TextAnimated.stop();
        }
    }, [translateX, windowWidth, messeageWidth]);

    return (
        <View style={styles.WeatherContainer}>
            <View style={styles.WeatherInfoContainer}>
                <Text
                    style={{ ...styles.WeatherFontStyles, marginLeft: '5%', flexShrink: 1, flexGrow: 1 }}
                    allowFontScaling={false}
                >
                    {weatherData?.local_name}: {weatherData?.desc}, 현재 {weatherData?.temp}°
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        style={{ width: 25, height: 25, marginLeft: '5%' }}
                        source={{ uri: weatherData.weatherImages }}
                    />
                    <View style={styles.WeatherDataStyles}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.WeatherFontStyles} allowFontScaling={false}>
                                최저 {weatherData?.temp_min}°
                            </Text>
                            <Text style={styles.WeatherFontStyles} allowFontScaling={false}>
                                최고 {weatherData?.temp_max}°
                            </Text>
                        </View>
                        <Text style={styles.WeatherFontStyles} allowFontScaling={false}>
                            습도 {weatherData?.humidity}%
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.MessageContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEnabled={false}>
                    <Animated.View
                        style={{
                            transform: [{ translateX }],
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={styles.MessageText}
                            onLayout={(event) => {
                                const { width } = event.nativeEvent.layout;
                                setMessageWidth(width);
                            }}
                            allowFontScaling={false}
                        >
                            {weatherMessage}
                        </Text>
                    </Animated.View>
                </ScrollView>
            </View>

            <LocationInfo onLocationChange={handleLocationChange} />
        </View>
    );
};

export default WeatherComponent;

const styles = StyleSheet.create({
    WeatherContainer: {
        flex: 1,
        width: '95%',
        maxHeight: '11%',
        borderWidth: 0.5,
        borderColor: '#B1B6AE',
        borderRadius: 5,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    WeatherInfoContainer: {
        flex: 1,
        flexGrow: 1,
        marginVertical: '1.5%',
    },
    WeatherDataStyles: {
        flexDirection: 'column',
        marginLeft: '3%',
    },
    WeatherFontStyles: {
        fontSize: 11,
        lineHeight: 18,
        fontWeight: 'bold',
    },
    MessageContainer: {
        flex: 1,
        justifyContent: 'center',
        overflow: 'hidden',
        width: '100%',
    },
    MessageText: {
        fontSize: 12,
        lineHeight: 15,
        flexGrow: 1,
        flexShrink: 1,
        fontWeight: 'bold',
    },
});
