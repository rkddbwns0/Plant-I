import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import imageUrls from '../JSONData/imageUrls.json';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.replace('WelcomePage');
        }, 3000);

        return () => clearTimeout(timeout);
    }, [navigation]);

    return (
        <View style={{ flex: 1 }}>
            <Image source={{ uri: imageUrls?.splash }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
        </View>
    );
};

export default SplashScreen;
