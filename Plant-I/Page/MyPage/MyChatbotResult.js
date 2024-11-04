import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import MyActComponents from '../../Components/MyPage/MyActComponents';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import { useNavigation } from '@react-navigation/native';

const MyChatbotResult = () => {
    const navigation = useNavigation();
    const [chatbotReuslt, setChatbotResult] = useState([]);
    const [countResult, setCountResult] = useState('');

    useEffect(() => {
        const chabotResultData = async () => {
            try {
                const response = await axios.post(
                    `${SERVER_ADDRESS}/chatbotresultdb/select`,
                    {},
                    { withCredentials: true }
                );
                const result = response.data.result;
                const countResult = response.data.countResult;

                setChatbotResult(result);
                setCountResult(countResult);
            } catch (error) {
                console.error(error);
            }
        };
        chabotResultData();
    }, []);

    const renderItems = ({ item }) => {
        return (
            <View>
                <TouchableOpacity
                    style={styles.btnView}
                    onPress={() =>
                        navigation.navigate('MyChatbotRecord', {
                            image: item.image,
                            userMessage: item.userMessage,
                            result: item.result,
                        })
                    }
                >
                    <View style={styles.imageView}>
                        <Image source={{ uri: item.image }} style={styles.imageStyles} />
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.messageText} allowFontScaling={false}>
                            {item.userMessage}
                        </Text>
                        <Text style={styles.resultText} numberOfLines={2}>
                            {item.result}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
    return (
        <MyActComponents
            topText="챗봇 상담 내역"
            text="상담 내역"
            data_counts={countResult}
            renderItem={renderItems}
            data={chatbotReuslt}
        />
    );
};

export default MyChatbotResult;

const styles = StyleSheet.create({
    btnView: {
        flexDirection: 'row',
        height: 100,
        alignItems: 'center',
    },
    imageView: {
        width: '25%',
        marginLeft: '3%',
    },
    imageStyles: {
        width: '85%',
        height: '80%',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#8E8E8E',
        resizeMode: 'cover',
    },
    textView: {
        width: '65%',
        justifyContent: 'center',
    },
    messageText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#505050',
        marginBottom: '3%',
    },
    resultText: {
        fontSize: 12,
        color: '#8C8C8C',
    },
});
