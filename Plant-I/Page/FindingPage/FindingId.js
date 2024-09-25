import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import { useNavigation } from '@react-navigation/native';
import FindingComponent from '../../Components/FindingComponents/FindingComponent';

const FindingId = () => {
    const navigation = useNavigation();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [checkPhone, setCheckPhone] = useState(false);
    const [checkMessage, setCheckMessage] = useState('');
    const [buttonActive, setButtonActive] = useState(false);

    const validPhone = (input) => {
        const phonePattern = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;

        if (input === '') {
            setCheckMessage('휴대폰 번호를 입력해 주세요.');
            setCheckPhone(false);
            setButtonActive(false);
            return false;
        } else if (!phonePattern.test(input)) {
            setCheckMessage('유효하지 않은 번호입니다.');
            setCheckPhone(false);
            setButtonActive(false);
            return false;
        }
        return true;
    };

    const findingUser = async () => {
        if (!validPhone(phone)) return;

        try {
            const response = await axios.post(`${SERVER_ADDRESS}/userdb/findingId`, {
                name: name,
                Phone: phone,
            });
            const typeData = response.data.type;
            const messageData = response.data.message;
            const data = response.data.id;
            if (typeData === true) {
                setCheckMessage(messageData);
                setId(data);
                setCheckPhone(true);
                setButtonActive(true);
            } else if (typeData === false) {
                setCheckMessage(messageData);
                setCheckPhone(false);
                setButtonActive(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FindingComponent
            topText="아이디 찾기"
            titleText={'본인 확인을 위해\n이름과 휴대폰 번호를 입력해 주세요.'}
            text1="이름을 입력해 주세요."
            text2="휴대폰 번호를입력해 주세요."
            placeholder1="이름"
            placeholder2="휴대폰 번호 (숫자만 입력)"
            value1={name}
            onChangeText1={setName}
            value2={phone}
            onChangeText2={setPhone}
            keyboardType2="decimal-pad"
            maxLength2={11}
            checkBtnText="확인"
            findingUser={findingUser}
            check2={checkPhone}
            checkMessage2={checkMessage}
            btnText="확인"
            buttonActive={buttonActive}
            onPress={() => navigation.navigate('FindingIdResult', { id: id })}
            showText={true}
        />
    );
};

export default FindingId;
