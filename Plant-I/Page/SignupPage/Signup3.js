import React, { useState } from 'react';
import SignupType2 from '../../Components/SignupComponents/SignupType2';
import { useNavigation } from '@react-navigation/native';

const Signup3 = ({ route }) => {
    const navigation = useNavigation();
    const { phone, name, id } = route.params;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checkPasswordMsg, setCheckPasswordMsg] = useState('');
    const [checkPassword, setCheckPassword] = useState(false);
    const [checkConfPasswordMsg, setCheckConfPasswordMsg] = useState('');
    const [checkConfPassword, setCheckConfPassword] = useState(false);
    const [buttonActive, setButtonActive] = useState(false);

    const validPassword = (input) => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[!@#$%^&*])(?=.{8,})/;

        if (input === '') {
            setCheckPasswordMsg('비밀번호를 입력해 주세요.');
            setCheckPassword(false);
            return false;
        } else if (!passwordPattern.test(input)) {
            setCheckPasswordMsg('비밀번호는 특수문자와 영어를 포함한 최소 8자, 최대 15자로 입력해 주세요.');
            setCheckPassword(false);
            return false;
        }
        setCheckPasswordMsg('사용 가능한 비밀번호 입니다.');
        setCheckPassword(true);
        return true;
    };

    const validConfirmPassword = (input) => {
        if (input === '') {
            setCheckConfPasswordMsg('');
            setCheckConfPassword(false);
            setButtonActive(false);
            return false;
        } else if (password !== input) {
            setCheckConfPasswordMsg('비밀번호가 일치하지 않습니다.');
            setCheckConfPassword(false);
            setButtonActive(false);
            return false;
        }
        setCheckConfPasswordMsg('비밀번호가 일치합니다.');
        setCheckConfPassword(true);
        setButtonActive(true);
        return true;
    };

    return (
        <SignupType2
            text1="비밀번호를 입력해 주세요."
            placeholder1="비밀번호"
            value1={password}
            onChangeText1={(text) => {
                setPassword(text);
                validPassword(text);
            }}
            check1={checkPassword}
            checkMessage1={checkPasswordMsg}
            secureTextEntry1={true}
            maxLength1={15}
            text2="비밀번호 확인을 위해 한 번 더 입력해 주세요."
            placeholder2="비밀번호 확인"
            checkBtnText="확인"
            value2={confirmPassword}
            onChangeText2={setConfirmPassword}
            checkUser={() => {
                validConfirmPassword(confirmPassword);
            }}
            check2={checkConfPassword}
            checkMessage2={checkConfPasswordMsg}
            maxLength2={15}
            secureTextEntry2={true}
            buttonActive={buttonActive}
            onPress={() => {
                navigation.navigate('Signup4', { phone: phone, name: name, id: id, password: password });
            }}
        />
    );
};

export default Signup3;
