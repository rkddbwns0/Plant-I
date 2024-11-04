import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { TopContainerComponent2 } from '../TopContainerComponents/TopContainerComponent';
import CustomStatusBar from '../CustomComponents/CustomStatusBar';
import { useNavigation } from '@react-navigation/native';
const SignupType1 = ({
    topText,
    value,
    onChangeText,
    placeholder,
    check,
    checkMessage,
    checkUser,
    onPress,
    buttonActive,
    maxLength,
    keyboardType,
    buttonText,
}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <CustomStatusBar translucent={false} />
            <TopContainerComponent2 text="가입하기" onPress={() => navigation.pop()} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={styles.textView}>
                    <Text medium style={styles.topText}>
                        {topText}
                    </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputStyle}
                            value={value}
                            onChangeText={onChangeText}
                            placeholder={placeholder}
                            maxLength={maxLength}
                            keyboardType={keyboardType}
                            allowFontScaling={false}
                        />
                        <TouchableOpacity style={styles.checkBtnStyle} onPress={checkUser}>
                            <Text style={styles.checkBtnText} allowFontScaling={false}>
                                중복확인
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.checkTextView}>
                    <Text
                        style={[styles.checkText, check ? styles.successText : styles.errorText]}
                        allowFontScaling={false}
                    >
                        {checkMessage}
                    </Text>
                </View>
            </View>
            <View style={styles.btnView}>
                <TouchableOpacity
                    style={[buttonActive ? styles.enabledBtnStyle : styles.disabledBtnStyle]}
                    disabled={!buttonActive}
                    onPress={onPress}
                >
                    <Text style={styles.btnText} allowFontScaling={false}>
                        {buttonText}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignupType1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    textView: {
        marginLeft: '6%',
    },
    inputView: {
        width: '100%',
        justifyContent: 'center',
        marginTop: '5%',
        flexDirection: 'row',
        marginHorizontal: '2%',
    },
    inputStyle: {
        padding: 3,
        fontSize: 15,
        width: '70%',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#B1B6AE',
        includeFontPadding: false,
    },
    checkBtnStyle: {
        width: '18%',
        height: 40,
        borderWidth: 0.5,
        borderColor: '#757575',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: '1%',
    },
    checkBtnText: {
        fontSize: 13,
        lineHeight: 20,
    },
    topText: {
        fontSize: 15,
        fontWeight: '500',
    },
    btnView: {
        flex: 1,
        maxHeight: 80,
        alignItems: 'center',
    },
    enabledBtnStyle: {
        width: '85%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#3DC373',
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabledBtnStyle: {
        width: '85%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#EDEDED',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    checkTextView: {
        flex: 1,
        marginLeft: '6%',
        maxHeight: '8%',
    },
    checkText: {
        fontSize: 10,
    },
    successText: {
        color: '#0F590D',
    },
    errorText: {
        color: '#FF4949',
    },
});
