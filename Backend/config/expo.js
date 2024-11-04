const { Expo } = require('expo-server-sdk');

const expo = new Expo();

const sendNotification = async (token, title, body) => {
    console.log(token);

    if (!Expo.isExpoPushToken(token)) {
        console.log('토큰이 없어');
        return;
    }

    const message = {
        to: token,
        sound: 'default',
        title: title,
        body: body,
        android: {
            sound: true,
            priority: 'high',
        },
    };

    try {
        const tiket = await expo.sendPushNotificationsAsync([message]);
    } catch (error) {
        console.error('Error sending push notification:', error);
    }
};

module.exports = {
    sendNotification,
};
