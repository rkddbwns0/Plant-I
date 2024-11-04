import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Image, Text } from 'react-native';
import imageUrls from '../../JSONData/imageUrls.json';
import { useNavigation } from '@react-navigation/native';

const TopButtonComponent = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.topBtnContainer}>
            <View style={styles.topBtnView}>
                <ScrollView horizontal={true} contentContainerStyle={styles.ScrollStyle}>
                    <TouchableOpacity style={styles.topBtnStyels} onPress={() => navigation.navigate('Chatbot')}>
                        <View style={styles.imageView}>
                            <Image source={{ uri: imageUrls?.chatbotPage }} style={styles.imageStyles} />
                        </View>
                        <View style={styles.textView}>
                            <View style={styles.btnTitleTextView}>
                                <Text style={styles.btnTitleText} allowFontScaling={false}>
                                    건강 Check
                                </Text>
                            </View>
                            <Text style={styles.contentsText} allowFontScaling={false}>
                                나의 반려식물{'\n'}건강 상태를 확인해 보세요!
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topBtnStyels} onPress={() => navigation.navigate('Test')}>
                        <View style={styles.imageView}>
                            <Image source={{ uri: imageUrls?.mbtiPage }} style={styles.imageStyles} />
                        </View>
                        <View style={styles.textView}>
                            <View style={styles.btnTitleTextView}>
                                <Text style={styles.btnTitleText} allowFontScaling={false}>
                                    MBTI
                                </Text>
                            </View>
                            <Text style={styles.contentsText} allowFontScaling={false}>
                                내 성향에 맞는 식물을{'\n'}무엇일까?
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
};

export default TopButtonComponent;

const styles = StyleSheet.create({
    topBtnContainer: {
        flex: 1,
        borderBottomWidth: 2,
        borderBottomColor: '#EDEDED',
        maxHeight: 190,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ScrollStyle: {
        paddingRight: '10%',
    },
    topBtnView: {
        flex: 1,
        width: '95%',
        maxHeight: 160,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBtnStyels: {
        width: '50%',
        height: 100,
        marginHorizontal: '2%',
    },
    imageView: {
        width: 240,
        height: 145,
    },
    imageStyles: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
        borderRadius: 20,
    },
    textView: {
        position: 'absolute',
        top: '8%',
        left: '5%',
        right: 0,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    btnTitleTextView: {
        backgroundColor: 'white',
        width: '40%',
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    btnTitleText: {
        fontSize: 13,
        fontWeight: '500',
    },
    contentsText: {
        fontSize: 15,
        fontWeight: '600',
        marginTop: '3%',
    },
});
