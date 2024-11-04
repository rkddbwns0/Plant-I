import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TopContainerComponent2 } from '../Components/TopContainerComponents/TopContainerComponent';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { SERVER_ADDRESS } from '../Components/ServerAddress';

const AlarmPage = () => {
    const navigation = useNavigation();
    const [notificationData, setNotificationData] = useState([]);

    const notificationLog = async () => {
        try {
            const response = await axios.post(`${SERVER_ADDRESS}/notification/select`, {}, { withCredentials: true });
            setNotificationData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const formatDate = (datetime) => {
        const dateTime = new Date(datetime + 'Z');
        const now = new Date();

        const koreaOffset = 9 * 60 * 60 * 1000;
        const localDateTime = new Date(dateTime.getTime() + koreaOffset);
        const localNow = new Date(now.getTime() + koreaOffset);

        const difflnSecond = Math.floor((localNow - localDateTime) / 1000);
        const diffLnMinutes = Math.floor((localNow - localDateTime) / (1000 * 60));
        const difflnHours = Math.floor(diffLnMinutes / 60);

        if (difflnSecond < 60) {
            return `${difflnSecond}초 전`;
        } else if (diffLnMinutes < 60) {
            return `${diffLnMinutes}분 전`;
        } else if (difflnHours < 12) {
            return `${difflnHours}시간 전`;
        } else {
            return (
                localDateTime
                    .toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    })
                    .replace(/\//g, '년 ')
                    .replace(/ /g, '월 ') + '일'
            );
        }
    };

    const formatMessage = (message) => {
        return message.replace(/\t/g, '\n');
    };

    const renderItems = ({ item }) => {
        return (
            <View style={styles.notificationContainer}>
                <View style={styles.regDateView}>
                    <Text style={styles.regDateText}>{formatDate(item?.regDate)}</Text>
                </View>
                <View style={styles.notificationView}>
                    <View style={styles.notificationImageView}>
                        <Image source={{ uri: item?.image }} style={styles.notificationImages} />
                    </View>
                    <View style={styles.notificationTextView}>
                        <Text style={styles.titleText}>{item?.title}</Text>
                        <Text style={styles.messageText}>{formatMessage(item?.message)}</Text>
                    </View>
                </View>
            </View>
        );
    };

    const deleteNotification = async () => {
        try {
            const response = await axios.post(`${SERVER_ADDRESS}/notification/delete`, {}, { withCredentials: true });
            notificationLog();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        notificationLog();
    }, []);
    return (
        <View style={styles.container}>
            <TopContainerComponent2 text="알림" onPress={() => navigation.pop()} />

            <View style={styles.mainView}>
                <View style={styles.mainTextView}>
                    <Text style={styles.mainText}>도착한 알림</Text>
                    <TouchableOpacity style={styles.deleteBtn} onPress={deleteNotification}>
                        <Text style={styles.deleteText}>모두 지우기</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.previousNotificationsView}>
                    <FlatList
                        renderItem={renderItems}
                        data={notificationData}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        </View>
    );
};
export default AlarmPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    mainView: {
        flex: 1,
        marginTop: '3%',
    },
    mainTextView: {
        marginLeft: '3%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    mainText: {
        fontSize: 18,
    },
    deleteBtn: {
        marginRight: '5%',
    },
    deleteText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#BFBFBF',
    },
    previousNotificationsView: {
        flex: 1,
        padding: '3%',
    },
    notificationContainer: {
        flex: 1,
        marginTop: '2%',
    },
    regDateView: {
        marginLeft: '1%',
    },
    regDateText: {
        fontSize: 10,
        lineHeight: 20,
        color: '#747474',
    },
    notificationView: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#EDEDED',
        borderRadius: 10,
        padding: '3%',
        alignItems: 'center',
    },
    notificationImageView: {
        marginLeft: '1%',
    },
    notificationImages: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    notificationTextView: {
        width: '100%',
        marginLeft: '3%',
    },
    titleText: {
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 20,
    },
    messageText: {
        fontSize: 11,
        width: '90%',
    },
});
