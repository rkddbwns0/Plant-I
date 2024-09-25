import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import SignupType2 from '../../Components/SignupComponents/SignupType2';

const Signup2 = ({ route }) => {
    const navigation = useNavigation();
    const { phone } = route.params;
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [checkId, setCheckId] = useState(false);
    const [checkMessage, setCheckMessage] = useState('아이디는 10자 이하로 입력해 주세요. (특수문자 사용X)');
    const [checkName, setCheckName] = useState(false);
    const [checkNameMessage, setCheckNameMessage] = useState('');
    const [buttonActive, setButtonActive] = useState(false);

    const isCheckName = (input) => {
        const namePattern = /^[\uAC00-\uD7A3]+$/;

        if (input === '') {
            setCheckNameMessage('이름을 입력해 주세요.');
            setCheckName(false);
            return false;
        } else if (!namePattern.test(input)) {
            setCheckNameMessage('이름을 정확히 입력해 주세요.');
            setCheckName(false);
            return false;
        }
        setCheckNameMessage('');
        setCheckName(true);
        return true;
    };

    const vaildId = (input) => {
        const idPattern = /^[a-zA-Z0-9 ]*$/;

        if (input === '') {
            setCheckMessage('아이디를 입력해 주세요.');
            setCheckId(false);
            setButtonActive(false);
            return false;
        } else if (!idPattern.test(input)) {
            setCheckMessage('사용할 수 없는 아이디입니다.');
            setCheckId(false);
            setButtonActive(false);
            return false;
        }
        return true;
    };

    const checkUser = async () => {
        if (!vaildId(id)) return;

        try {
            const response = await axios.post(`${SERVER_ADDRESS}/userdb/checkUser`, {
                id: id,
            });
            const data = response.data.message;
            if (data === '사용 가능한 아이디입니다.') {
                setCheckMessage(data);
                setCheckId(true);
                setButtonActive(true);
            } else if (data === '이미 사용 중인 아이디입니다.') {
                setCheckMessage(data);
                setCheckId(false);
                setButtonActive(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleBtn = () => {
        if (!isCheckName(name)) {
            return;
        } else {
            navigation.navigate('Signup3', { phone: phone, name: name, id: id });
        }
    };

    return (
        <SignupType2
            text1="이름을 입력해 주세요."
            placeholder1="이름"
            value1={name}
            onChangeText1={setName}
            checkMessage1={checkNameMessage}
            check1={checkName}
            text2="아이디를 입력해 주세요."
            placeholder2="아이디"
            value2={id}
            onChangeText2={setId}
            maxLength1={10}
            checkBtnText="중복 확인"
            checkMessage2={checkMessage}
            check2={checkId}
            buttonActive={buttonActive}
            checkUser={checkUser}
            onPress={handleBtn}
        />
    );
};
export default Signup2;
