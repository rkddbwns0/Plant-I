import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import SignupType1 from '../../Components/SignupComponents/SignupType1';

const Signup1 = () => {
    const navigation = useNavigation();
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

    const checkUser = async () => {
        if (!validPhone(phone)) return;

        try {
            const response = await axios.post(`${SERVER_ADDRESS}/userdb/checkUser`, {
                Phone: phone,
            });
            const data = response.data.message;
            if (data === '사용 가능한 휴대폰 번호입니다.') {
                setCheckMessage(data);
                setCheckPhone(true);
                setButtonActive(true);
            } else if (data === '이미 사용 중인 휴대폰 번호입니다.') {
                setCheckMessage(data);
                setCheckPhone(false);
                setButtonActive(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SignupType1
            topText={'본인 확인을 위해\n휴대폰 번호를 입력해 주세요.'}
            value={phone}
            onChangeText={setPhone}
            placeholder="휴대폰 번호 (숫자만 입력)"
            maxLength={11}
            keyboardType="decimal-pad"
            check={checkPhone}
            checkMessage={checkMessage}
            checkUser={checkUser}
            buttonActive={buttonActive}
            onPress={() => navigation.navigate('Signup2', { phone: phone })}
            buttonText="다음"
        />
    );
};

export default Signup1;
