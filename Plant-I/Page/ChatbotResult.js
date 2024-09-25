import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import CustomText from '../Components/CustomComponents/CustomText';
import imageUrls from '../JSONData/imageUrls.json';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomContainer } from '../Components/BottomContainerComponents/BottomContainerComponent';

const ChatbotResult = ({ route }) => {
    const navigation = useNavigation();
    const { image, result } = route.params;

    console.log(result);

    return (
        <View style={styles.container}>
            <View style={styles.topView}>
                <TouchableOpacity style={styles.topBtnStyle} onPress={() => navigation.pop()}>
                    <Image source={{ uri: imageUrls?.left }} style={styles.iconImage} />
                </TouchableOpacity>

                <CustomText bold style={styles.topFont}>
                    챗봇 AI
                </CustomText>
                <View style={{ flex: 1 }} />
            </View>

            <View style={styles.mainView}>
                <View style={styles.imageView}>
                    <Image source={{ uri: image }} style={styles.imageStyle} />
                </View>
                <View style={styles.resultView}>
                    <View style={styles.chatbot}>
                        <Image source={{ uri: imageUrls.chatbot }} style={styles.chatbotImage} />
                        <CustomText style={styles.chatbotText}>인공지능 파릇이</CustomText>
                    </View>
                    <View style={styles.resultStyle}>
                        <ScrollView style={{ flex: 1 }}>
                            <CustomText style={styles.resultFont}>{result}</CustomText>
                        </ScrollView>
                    </View>
                </View>
            </View>

            <BottomContainer ButtonText="식물 분석하기" />
        </View>
    );
};

export default ChatbotResult;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: '3%',
        borderBottomWidth: 2,
        borderBottomColor: '#EDEDED',
    },
    topBtnStyle: {
        flex: 1,
    },
    iconImage: {
        width: 25,
        height: 25,
        marginLeft: '3%',
    },
    topFont: {
        fontSize: 18,
        lineHeight: 25,
    },
    mainView: {
        flex: 1,
    },
    imageView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        width: '65%',
        height: '75%',
        borderRadius: 15,
    },
    resultView: {
        flex: 1,
    },
    chatbot: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '5%',
    },
    chatbotImage: {
        width: 40,
        height: 40,
    },
    chatbotText: {
        fontSize: 13,
        marginLeft: '2%',
    },
    resultStyle: {
        flex: 1,
        width: '75%',
        maxHeight: 250,
        backgroundColor: '#EFEFEF',
        padding: '5%',
        alignSelf: 'center',
        borderRadius: 15,
    },
    resultFont: {
        fontSize: 13,
        lineHeight: 15,
    },
    bottomView: {
        flex: 1,
        maxHeight: 80,
    },
});
