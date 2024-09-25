import React, { useState } from 'react';
import SignupType1 from '../../Components/SignupComponents/SignupType1';
import { View } from 'react-native';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import { useNavigation } from '@react-navigation/native';
import AlertModal from '../../Components/ModalComponents/AlertModal';

const Signup4 = ({ route }) => {
    const navigation = useNavigation();
    const { phone, name, id, password } = route.params;
    const [Nname, setNname] = useState('');
    const [checkMessage, setCheckMessage] = useState('닉네임은 최대 20자입니다. (특수문자 사용 X)');
    const [checkNname, setCheckNname] = useState(false);
    const [buttonActive, setButtonActive] = useState(false);
    const [modalVisibled, setModalVisibled] = useState(false);

    const isCheckNname = (input) => {
        const NnamePattern = /^(?=.*[a-zA-Z0-9\uAC00-\uD7A3])[a-zA-Z0-9\uAC00-\uD7A3]*$/;

        if (input === '') {
            setCheckMessage('닉네임을 입력해 주세요.');
            setCheckNname(false);
            setButtonActive(false);
            return false;
        } else if (!NnamePattern.test(input)) {
            setCheckMessage('사용할 수 없는 닉네임입니다.');
            setCheckNname(false);
            setButtonActive(false);
            return false;
        }
        return true;
    };

    const checkUser = async () => {
        if (!isCheckNname(Nname)) return;

        try {
            const response = await axios.post(`${SERVER_ADDRESS}/userdb/checkUser`, {
                Nname: Nname,
            });
            const data = response.data.message;
            if (data === '사용 가능한 닉네임입니다.') {
                setCheckMessage(data);
                setCheckNname(true);
                setButtonActive(true);
            } else if (data === '이미 사용 중인 닉네임입니다.') {
                setCheckMessage(data);
                setCheckNname(false);
                setButtonActive(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const successSignup = async () => {
        try {
            const response = await axios.post(`${SERVER_ADDRESS}/userdb/insert`, {
                id: id,
                pw: password,
                name: name,
                Phone: phone,
                Nname: Nname,
            });
            navigation.navigate('WelcomePage');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SignupType1
                topText={'마지막으로,\n사용하실 닉네임을 입력해 주세요.'}
                placeholder="닉네임 (최대 20자)"
                maxLength={20}
                value={Nname}
                onChangeText={setNname}
                check={checkNname}
                checkMessage={checkMessage}
                checkUser={checkUser}
                buttonActive={buttonActive}
                onPress={() => setModalVisibled(true)}
                buttonText="완료"
            />
            <AlertModal
                title="회원가입이 성공적으로 완료되었습니다."
                visible={modalVisibled}
                onRequestClose={() => setModalVisibled(false)}
                onPress={successSignup}
                showBtn={true}
                BtnText="확인"
            />
        </View>
    );
};

export default Signup4;
