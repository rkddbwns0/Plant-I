import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import CustomText from '../Components/CustomComponents/CustomText';

const SplashScreenComponent = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            SplashScreen.hide();
            navigation.replace('LoginPage');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <CustomText>Plant-I</CustomText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E9F1E9',
    },
});

export default SplashScreenComponent;
