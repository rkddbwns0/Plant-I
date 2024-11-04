import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { TopContainerComponent2 } from '../../Components/TopContainerComponents/TopContainerComponent';
import imageUrls from '../../JSONData/imageUrls.json';

const MyChatbotRecord = ({ route }) => {
    const { image, userMessage, result } = route.params;
    return (
        <View style={styles.container}>
            <TopContainerComponent2 text="상담 내역" fontWeight="600" />
            <View style={{ flex: 1 }}>
                <ScrollView showsHorizontalScrollIndicator={true} removeClippedSubviews={true}>
                    <View style={styles.userTextContainer}>
                        <View style={styles.userTextView}>
                            <Text style={styles.userText}>{userMessage}</Text>
                        </View>
                        <Image source={{ uri: image }} style={styles.userImage} />
                    </View>
                    <View>
                        <View style={styles.resultView}>
                            <View style={styles.chatbot}>
                                <Image source={{ uri: imageUrls.chatbot }} style={styles.chatbotImage} />
                                <Text style={styles.chatbotText} allowFontScaling={false}>
                                    인공지능 파릇이
                                </Text>
                            </View>
                            <View style={styles.resultStyle}>
                                <Text style={styles.resultFont} allowFontScaling={false}>
                                    {result}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default MyChatbotRecord;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    mainView: {
        flex: 1,
        justifyContent: 'center',
    },
    resultView: {
        marginBottom: '5%',
        marginTop: '5%',
    },
    chatbot: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '5%',
    },
    chatbotImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    chatbotText: {
        fontSize: 13,
        marginLeft: '2%',
    },
    userTextContainer: {
        alignItems: 'flex-end',
        marginRight: '5%',
        marginTop: '8%',
    },
    userTextView: {
        flex: 1,
        backgroundColor: '#EBFCF2',
        width: '70%',
        minHeight: 70,
        maxHeight: 'auto',
        padding: '3%',
        borderRadius: 10,
        justifyContent: 'center',
    },
    userText: {
        fontSize: 13,
        lineHeight: 20,
        color: '#444343',
    },
    userImage: {
        width: 165,
        height: 165,
        borderWidth: 0.5,
        borderColor: '#8E8E8E',
        borderRadius: 10,
        resizeMode: 'cover',
        marginTop: '3%',
    },
    resultStyle: {
        width: '72%',
        backgroundColor: '#F5F5F5',
        padding: '3%',
        alignSelf: 'center',
        borderRadius: 10,
    },
    resultFont: {
        fontSize: 13,
        lineHeight: 20,
        color: '#444343',
        textAlign: 'left',
    },
});
