import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import { useNavigation } from '@react-navigation/native';
import FindingComponent from '../../Components/FindingComponents/FindingComponent';

const FindingPw = () => {
    const navigation = useNavigation();
    const [phone, setPhone] = useState('');
    const [id, setId] = useState('');
    const [checkMessage, setCheckMessage] = useState('');
    const [checkId, setCheckId] = useState(false);
    const [buttonActive, setButtonActive] = useState(false);

    const vaildId = (input) => {
        const idPattern = /^[a-zA-Z0-9 ]*$/;

        if (input === '') {
            setCheckMessage('아이디를 입력해 주세요.');
            setCheckId(false);
            setButtonActive(false);
            return false;
        } else if (!idPattern.test(input)) {
            setCheckMessage('아이디 형식이 잘못되었습니다. 다시 확인해 주세요.');
            setCheckId(false);
            setButtonActive(false);
            return false;
        }
        return true;
    };

    const findingUser = async () => {
        if (!vaildId(id)) return;

        try {
            const response = await axios.post(`${SERVER_ADDRESS}/userdb/findingPw`, {
                id: id,
                Phone: phone,
            });
            const messageData = response.data.message;
            const typeData = response.data.type;
            const data = response.data.id;

            if (typeData === true) {
                setCheckMessage(messageData);
                setCheckId(typeData);
                setButtonActive(typeData);
                setCheckId(data);
            } else if (typeData === false) {
                setCheckMessage(messageData);
                setCheckId(typeData);
                setButtonActive(typeData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FindingComponent
            topText="비밀번호 찾기"
            titleText={'본인 확인을 위해\n휴대폰 번호와 아이디를 입력해 주세요.'}
            text1="휴대폰 번호를 입력해 주세요."
            text2="아이디를 입력해 주세요."
            placeholder1="휴대폰 번호 (숫자만 입력)"
            value1={phone}
            onChangeText1={setPhone}
            maxLength1={11}
            keyboardType1="decimal-pad"
            placeholder2="아이디"
            value2={id}
            onChangeText2={setId}
            checkBtnText="확인"
            findingUser={findingUser}
            check2={checkId}
            checkMessage2={checkMessage}
            buttonActive={buttonActive}
            btnText="다음"
            onPress={() => navigation.navigate('EditPassword', { id: id })}
            showText={true}
            allowFontScaling={false}
        />
    );
};

export default FindingPw;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    Title: {
        fontSize: 35,
        bottom: '3%',
    },
    InputForm: {
        width: '100%',
        alignItems: 'center',
    },
    InputForm: {
        width: '100%',
    },
    InputSection: { alignItems: 'center', marginVertical: '1%' },
    SectionText: {
        fontSize: 15,
        lineHeight: 20,
        width: '82%',
        top: '4%',
    },
    input: {
        marginVertical: '3%',
        padding: 10,
        fontSize: 15,
        width: '85%',
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#B1B6AE',
        includeFontPadding: false,
    },
    Btn: {
        marginTop: '6%',
        width: '100%',
        alignItems: 'center',
    },
    BtnStyles: {
        width: '85%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '3%',
        height: 50,
    },
    BtnTextStyles: {
        fontSize: 18,
        lineHeight: 25,
    },
});
