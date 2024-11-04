import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { TopContainerComponent2 } from '../../Components/TopContainerComponents/TopContainerComponent';
import { useNavigation } from '@react-navigation/native';
import { BottomContainer } from '../../Components/BottomContainerComponents/BottomContainerComponent';
import AlertModal from '../../Components/ModalComponents/AlertModal';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';

const EditNname = ({ route }) => {
    const navigation = useNavigation();
    const { Nname } = route.params;
    const [changeNname, setChangeNname] = useState('');
    const [checkMessage, setCheckMessage] = useState('');
    const [modalVisibled, setModalVisibled] = useState(false);

    const UpdateData = async () => {
        try {
            const response = await axios.post(
                `${SERVER_ADDRESS}/userdb/update`,
                { Nname: changeNname },
                { withCredentials: true }
            );
            const data = response.data;
            setCheckMessage(data.message);

            setModalVisibled(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = () => {
        if (checkMessage === '닉네임이 변경되었습니다.') {
            setModalVisibled(false);
            navigation.pop();
        } else {
            setModalVisibled(false);
        }
    };

    return (
        <View style={styles.container}>
            <TopContainerComponent2 text="닉네임 변경" onPress={() => navigation.pop()} />

            <View style={styles.mainView}>
                <View>
                    <Text style={styles.titleText} allowFontScaling={false}>
                        새로운 닉네임을 입력해 주세요.
                    </Text>
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder={Nname}
                        value={changeNname}
                        onChangeText={setChangeNname}
                        allowFontScaling={false}
                    />
                </View>
            </View>
            <BottomContainer ButtonText="변경 완료" onPress={UpdateData} />
            <AlertModal
                visible={modalVisibled}
                title={checkMessage}
                showBtn={true}
                onCancel={handleUpdate}
                CancelBtnText="확인"
                onRequestClose={() => setModalVisibled(false)}
            />
        </View>
    );
};

export default EditNname;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    mainView: {
        flex: 1,
        padding: '3%',
        marginTop: '2%',
    },
    titleText: {
        fontSize: 15,
        color: '#474747',
        marginLeft: '3%',
        fontWeight: '500',
    },
    inputView: {
        flex: 1,
        alignItems: 'center',
    },
    inputStyle: {
        backgroundColor: '#F8F8F8',
        width: '95%',
        height: 50,
        borderRadius: 10,
        paddingLeft: 12,
        marginTop: '3%',
    },
});
