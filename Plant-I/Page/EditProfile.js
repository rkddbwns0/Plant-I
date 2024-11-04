import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Text, TextInput } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import axios from 'axios';
import AlertModal from '../Components/ModalComponents/AlertModal';
import { SERVER_ADDRESS } from '../Components/ServerAddress';
import { TopContainerComponent } from '../Components/TopContainerComponents/TopContainerComponent';

const EditProfile = ({ navigation, route }) => {
    const { Nname } = route.params;
    const [NickName, setNickName] = useState('');
    const [SuccessVisibled, setSuccessVisibled] = useState(false);
    const [FailVisibled, setFailVisibled] = useState(false);

    const UpdateData = () => {
        axios
            .post(
                `${SERVER_ADDRESS}/userdb/update`,
                {
                    Nname: NickName,
                },
                { withCredentials: true }
            )
            .then((response) => {
                setSuccessVisibled(false);
                navigation.pop();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const CheckNname = () => {
        axios
            .post(`${SERVER_ADDRESS}/userdb/CheckNickname`, {
                Nname: NickName,
            })
            .then((response) => {
                const data = response.data;
                if (data.message === '이미 사용 중인 닉네임입니다.' || data.message === '닉네임을 입력해 주세요.') {
                    setFailVisibled(true);
                } else if (data.message === '사용 가능한 닉네임입니다.') {
                    setSuccessVisibled(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1, width: '100%' }}>
            <View style={styles.container}>
                <View style={styles.TopContainer}>
                    <TopContainerComponent
                        text="닉네임 변경"
                        onPress={() => navigation.pop()}
                        color="white"
                        textcolor="white"
                    />
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.FontContainer}>
                        <Text style={{ fontSize: 20, color: '#4F4F4F' }} allowFontScaling={false}>
                            한글, 영어, 숫자 조합의 1-15자{'\n'}길이의 닉네임으로 설정해 주세요.
                        </Text>
                    </View>

                    <View style={styles.TextInputContainer}>
                        <View style={styles.textInputView}>
                            <TextInput
                                style={styles.TextinputStyle}
                                placeholderTextColor="#757575"
                                value={NickName}
                                onChangeText={setNickName}
                                placeholder="닉네임 입력"
                                allowFontScaling={false}
                            />
                            <Octicons name="pencil" style={styles.IconStyle} />
                        </View>
                    </View>

                    <View style={{ width: '80%' }}>
                        <Text style={{ fontSize: 13, color: '#757575' }} allowFontScaling={false}>
                            현재 닉네임 : {Nname}
                        </Text>
                    </View>
                </View>

                <View style={styles.BtnContainer}>
                    <TouchableOpacity style={styles.BtnStyle} onPress={CheckNname}>
                        <Text style={{ fontSize: 20, color: 'white', lineHeight: 30 }} allowFontScaling={false}>
                            변경하기
                        </Text>
                    </TouchableOpacity>
                </View>

                <AlertModal
                    visible={SuccessVisibled}
                    onRequestClose={() => setSuccessVisibled(false)}
                    title="닉네임이 변경되었습니다."
                    onPress={() => UpdateData()}
                    BtnText="확인"
                    showBtn={true}
                />

                <AlertModal
                    visible={FailVisibled}
                    onRequestClose={() => setFailVisibled(false)}
                    title="이미 사용 중인 닉네임입니다."
                    onPress={() => setFailVisibled(false)}
                    BtnText="확인"
                    showBtn={true}
                />
            </View>
        </KeyboardAvoidingView>
    );
};
export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    TopContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3DC373',
        height: 55,
    },
    Title: {
        fontSize: 20,
        lineHeight: 30,
        textAlign: 'center',
    },
    FontContainer: {
        width: '80%',
    },
    TextInputContainer: {
        marginTop: '6%',
        width: '100%',
        alignItems: 'center',
    },
    textInputView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '85%',
        height: 50,
        borderWidth: 0.5,
        borderColor: '#858585',
        borderRadius: 8,
        color: '#757575',
        alignSelf: 'center',
        paddingHorizontal: 10,
    },
    TextinputStyle: {
        flex: 1,
    },
    IconStyle: {
        fontSize: 24,
        color: '#757575',
    },
    BtnContainer: {
        alignSelf: 'center',
        width: '100%',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    BtnStyle: {
        backgroundColor: '#3DC373',
        width: '85%',
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
});
