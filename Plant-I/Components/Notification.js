import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import axios from 'axios';
import { SERVER_ADDRESS } from './ServerAddress';

export async function registerForPushNotificationsAsync() {
    let token;

    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notifications!');
            return;
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('FCM Token:', token);
    } else {
        alert('Must use a physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

export async function sendTokenToBackend(token) {
    try {
        await axios.post(`${SERVER_ADDRESS}/norifications/save-token`, { token });
        console.log(result);
    } catch (error) {
        console.error('Error sending token to backend:', error);
    }
}

export function setupNotificationListener(setNotification) {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
    });

    return () => {
        Notifications.removeNotificationSubscription(subscription);
    };
}
