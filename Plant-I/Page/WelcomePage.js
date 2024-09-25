import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import imageUrls from '../JSONData/imageUrls.json';
import CustomStatusBar from '../Components/CustomComponents/CustomStatusBar';

const WelcomePage = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <CustomStatusBar color="transparent" translucent={true} />
            <View style={styles.imageView}>
                <Image source={{ uri: imageUrls?.welcomePage }} style={styles.imageStyle} />
            </View>
            <View style={styles.textView}>
                <Text style={styles.textStyle}>
                    일상에 스며든 자연의 감각,{'\n'}식물로 완성하는{'\n'}당신의 초록 공간을 지금 채워보세요.
                </Text>
            </View>
            <View style={styles.bottomView}>
                <View style={styles.signupView}>
                    <TouchableOpacity style={styles.signupBtn} onPress={() => navigation.navigate('Signup1')}>
                        <Text bold style={styles.signupText}>
                            시작하기
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.loginView}>
                    <Text style={styles.bottomText}>이미 계정이 있나요?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
                        <Text style={styles.bottomBtnText}>로그인</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default WelcomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageView: {
        flex: 1,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
    textView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: '31%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        lineHeight: 30,
        fontWeight: '300',
    },
    bottomView: {
        position: 'absolute',
        bottom: 8,
        right: 0,
        left: 0,
        alignItems: 'center',
    },
    signupView: {
        width: '100%',
        alignItems: 'center',
        marginBottom: '3%',
    },
    signupBtn: {
        width: '80%',
        height: 50,
        backgroundColor: '#3DC373',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    signupText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    loginView: {
        flexDirection: 'row',
    },
    bottomText: {
        fontSize: 13,
        color: '#8A8A8A',
        lineHeight: 20,
    },
    bottomBtnText: {
        fontSize: 13,
        color: '#3DC373',
        marginLeft: 5,
        lineHeight: 20,
        fontWeight: 'bold',
    },
});
