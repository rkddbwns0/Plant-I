import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Text, TextInput } from 'react-native';
import axios from 'axios';
import AlertModal from '../Components/ModalComponents/AlertModal';
import CustomStatusBar from '../Components/CustomComponents/CustomStatusBar';
import { SERVER_ADDRESS } from '../Components/ServerAddress';
import { TopContainerComponent2 } from '../Components/TopContainerComponents/TopContainerComponent';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = () => {
    const navigation = useNavigation();
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [userToken, setUserToken] = useState(null);
    const resetUserData = () => [setId(''), setPw('')];
    const [nullVisibled, setNullVisibled] = useState(false);
    const [failVisibled, setFailVisibled] = useState(false);

    useEffect(() => {
        getToken();
    }, []);

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (token !== null) {
                setUserToken(token);
            } else {
                console.log('토큰 없음.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const Login = async () => {
        if (id === '' || pw === '') {
            setNullVisibled(true);
            return;
        }
        try {
            const response = await axios.post(
                `${SERVER_ADDRESS}/userdb/login`,
                { id, pw, userToken },
                { withCredentials: true }
            );

            if (response.data.message === '로그인 성공') {
                navigation.navigate('Home');
            } else {
                setFailVisibled(true);
            }
        } catch (error) {
            console.error('에러', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            resetUserData();
        }, [])
    );

    return (
        <KeyboardAvoidingView style={styles.container}>
            <CustomStatusBar color="white" translucent={false} />

            <TopContainerComponent2 text="로그인" onPress={() => navigation.pop()} />

            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={styles.topTextView}>
                    <Text style={styles.topText} allowFontScaling={false}>
                        안녕하세요!{'\n'}로그인 후 서비스를 이용해 보세요.
                    </Text>
                </View>

                <View style={styles.InputForm}>
                    <TextInput
                        style={styles.input}
                        value={id}
                        onChangeText={(text) => setId(text)}
                        placeholder="아이디"
                        inputMode="text"
                        allowFontScaling={false}
                    />

                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        value={pw}
                        onChangeText={(text) => setPw(text)}
                        placeholder="비밀번호"
                        inputMode="text"
                        allowFontScaling={false}
                    />
                </View>
            </View>

            <View style={styles.bottomView}>
                <View style={styles.Btn}>
                    <TouchableOpacity style={{ ...styles.BtnStyles, backgroundColor: '#3DC373' }} onPress={Login}>
                        <Text style={{ ...styles.BtnTextStyles, color: 'white' }} allowFontScaling={false}>
                            로그인
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.Form}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('FindingId')}>
                        <Text style={styles.BottomBtnStyles} allowFontScaling={false}>
                            아이디 찾기
                        </Text>
                    </TouchableOpacity>

                    <Text style={{ fontSize: 11, lineHeight: 12 }} allowFontScaling={false}>
                        {' '}
                        |{' '}
                    </Text>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('FindingPw')}>
                        <Text style={styles.BottomBtnStyles} allowFontScaling={false}>
                            비밀번호 찾기
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <AlertModal
                visible={failVisibled}
                onRequestClose={() => setFailVisibled(false)}
                title="존재하지 않는 회원 정보입니다."
                onPress={() => setFailVisibled(false)}
                BtnText="확인"
                showBtn={true}
            />

            <AlertModal
                visible={nullVisibled}
                onRequestClose={() => setNullVisibled(false)}
                title="회원 정보를 입력해 주세요."
                onPress={() => setNullVisibled(false)}
                BtnText="확인"
                showBtn={true}
            />
        </KeyboardAvoidingView>
    );
};
export default LoginPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topTextView: {
        marginLeft: '8%',
    },
    topText: {
        fontSize: 18,
        fontWeight: '500',
    },
    InputForm: {
        width: '100%',
        alignItems: 'center',
        marginTop: '5%',
    },
    input: {
        marginVertical: '3%',
        padding: 3,
        fontSize: 15,
        width: '85%',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#B1B6AE',
        includeFontPadding: false,
    },
    bottomView: {
        alignItems: 'center',
        flex: 1,
        maxHeight: 130,
    },
    Btn: {
        width: '100%',
        alignItems: 'center',
        marginTop: '5%',
    },
    BtnTextStyles: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    BtnStyles: {
        width: '85%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '3%',
        height: 50,
    },
    Form: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    BottomBtnStyles: {
        fontSize: 13,
        padding: '2%',
    },
});
//#endregion
