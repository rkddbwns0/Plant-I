import React, { useState } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import { useNavigation } from '@react-navigation/native';
import FindingComponent from '../../Components/FindingComponents/FindingComponent';
import AlertModal from '../../Components/ModalComponents/AlertModal';

const EditPassword = ({ route }) => {
    const navigation = useNavigation();
    const { id } = route.params;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checkPasswordMsg, setCheckPasswordMsg] = useState('');
    const [checkPassword, setCheckPassword] = useState(false);
    const [checkConfPasswordMsg, setCheckConfPasswordMsg] = useState('');
    const [checkConfPassword, setCheckConfPassword] = useState(false);
    const [buttonActive, setButtonActive] = useState(false);
    const [modalVisibled, setModalVisibled] = useState(false);

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

    const editPassword = async () => {
        try {
            const response = await axios.post(`${SERVER_ADDRESS}/userdb/editPw`, {
                id: id,
                pw: password,
            });
            navigation.navigate('LoginPage');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <FindingComponent
                topText="비밀번호 재설정"
                titleText="새로운 비밀번호를 설정해 주세요."
                text1="비밀번호를 입력해 주세요."
                placeholder1="비밀번호"
                value1={password}
                onChangeText1={(text) => {
                    setPassword(text);
                    validPassword(text);
                }}
                maxLength1={15}
                check1={checkPassword}
                checkMessage1={checkPasswordMsg}
                text2="비밀번호 확인을 위해 한 번 더 입력해 주세요."
                placeholder2="비밀번호 확인"
                value2={confirmPassword}
                onChangeText2={setConfirmPassword}
                maxLength2={15}
                checkBtnText="확인"
                findingUser={() => validConfirmPassword(confirmPassword)}
                check2={checkConfPassword}
                checkMessage2={checkConfPasswordMsg}
                buttonActive={buttonActive}
                showText={true}
                secureTextEntry={true}
                btnText="확인"
                onPress={() => {
                    setModalVisibled(true);
                }}
            />
            <AlertModal
                title="비밀번호가 재설정되었습니다."
                showBtn={true}
                BtnText="확인"
                visible={modalVisibled}
                onRequestClose={() => setModalVisibled(false)}
                onPress={editPassword}
            />
        </View>
    );
};

export default EditPassword;
