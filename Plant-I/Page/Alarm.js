import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';

async function requestUserPermission() {
    const authState = await messaging().requestPermission();
    const enabled =
        authState === messaging.AuthorizationStatus.AUTHORIZED ||
        authState === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log(authState);
    }
}

export async function getDeviceToken() {
    const token = await messaging().getToken();
    console.log(token);
    return token;
}
