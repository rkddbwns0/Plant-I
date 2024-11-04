import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import imageUrls from '../../JSONData/imageUrls.json';
import { TopContainerComponent } from '../TopContainerComponents/TopContainerComponent';
import { useNavigation } from '@react-navigation/native';

const Start = ({ onPress }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TopContainerComponent onPress={() => navigation.pop()} />
            <View style={styles.topTextView}>
                <Text bold style={styles.titleText} allowFontScaling={false}>
                    나에게 맞는 식물은 뭘까?
                </Text>
                <Text bold style={styles.subTitleText} allowFontScaling={false}>
                    심심할 때 하기 좋은{'\n'}식물 추천 테스트
                </Text>
            </View>
            <View style={styles.imageView}>
                <Image source={{ uri: imageUrls?.start }} style={styles.imageStyle} />
            </View>
            <View style={styles.bottomTextView}>
                <Text medium style={styles.desText1} allowFontScaling={false}>
                    총 문항 13개, 검사시간 약 3분
                </Text>
                <Text medium style={styles.desText2} allowFontScaling={false}>
                    나의 성향을 파악할 수 있어요!
                </Text>
            </View>
            <View style={styles.btnView}>
                <TouchableOpacity style={styles.btnStyle} onPress={onPress}>
                    <Text medium style={styles.btnText} allowFontScaling={false}>
                        테스트 시작
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Start;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    topTextView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
    },
    titleText: {
        fontSize: 20,
        color: '#5B6350',
        lineHeight: 25,
        fontWeight: '600',
    },
    subTitleText: {
        fontSize: 18,
        color: '#1C4723',
        lineHeight: 25,
        textAlign: 'center',
        fontWeight: '600',
    },
    imageView: {
        flex: 2,
        alignItems: 'center',
    },
    imageStyle: {
        width: '75%',
        height: 280,
        borderRadius: 20,
    },
    bottomTextView: {
        flex: 1,
        alignItems: 'center',
        top: '3%',
    },
    desText1: {
        fontSize: 14,
        lineHeight: 25,
        fontWeight: '500',
    },
    desText2: {
        fontSize: 12,
        lineHeight: 25,
        fontWeight: '500',
    },
    btnView: {
        flex: 1,
        alignItems: 'center',
    },
    btnStyle: {
        width: '70%',
        height: 50,
        backgroundColor: '#F9F9F9',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    btnText: {
        fontSize: 15,
        fontWeight: '500',
    },
});
