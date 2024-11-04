import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput } from 'react-native';
import CustomStatusBar from '../../Components/CustomComponents/CustomStatusBar';
import { TopContainerComponent2 } from '../../Components/TopContainerComponents/TopContainerComponent';
import { useNavigation } from '@react-navigation/native';

const FindingIdResult = ({ route }) => {
    const navigation = useNavigation();
    const { id } = route.params;
    return (
        <View style={styles.container}>
            <CustomStatusBar translucent={false} />
            <TopContainerComponent2 text="아이디 찾기" />
            <View style={styles.resultView}>
                <View style={styles.textView}>
                    <Text style={styles.mainText} allowFontScaling={false}>
                        아이디를 찾았어요!
                    </Text>
                    <Text style={styles.subText} allowFontScaling={false}>
                        아래 아이디로 로그인해 주세요.
                    </Text>
                </View>
                <View style={styles.idView}>
                    <TextInput style={styles.inputStyle} placeholder={id} editable={false} allowFontScaling={false} />
                </View>
            </View>
            <View style={styles.btnView}>
                <TouchableOpacity style={styles.btnStyle} onPress={() => navigation.navigate('LoginPage')}>
                    <Text style={styles.btnText} allowFontScaling={false}>
                        확인
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FindingIdResult;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    resultView: {
        flex: 1,
        justifyContent: 'center',
    },
    textView: {
        marginLeft: '6%',
    },
    mainText: {
        fontSize: 15,
        lineHeight: 25,
        fontWeight: '500',
    },
    subText: {
        fontSize: 13,
        lineHeight: 25,
        fontWeight: '500',
    },
    idView: {
        marginTop: '8%',
        alignItems: 'center',
    },
    inputStyle: {
        width: '90%',
        height: 50,
        borderWidth: 0.5,
        borderColor: '#DFDFDF',
        borderRadius: 10,
        paddingLeft: '4%',
    },
    btnView: {
        flex: 1,
        maxHeight: 80,
        alignItems: 'center',
    },
    btnStyle: {
        width: '85%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#3DC373',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
});
