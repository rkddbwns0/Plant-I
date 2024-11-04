import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomStatusBar from '../../Components/CustomComponents/CustomStatusBar';
import { TopContainerComponent2 } from '../../Components/TopContainerComponents/TopContainerComponent';

const SignupType2 = ({
    text1,
    placeholder1,
    value1,
    onChangeText1,
    maxLength1,
    checkMessage1,
    text2,
    placeholder2,
    value2,
    onChangeText2,
    maxLength2,
    checkMessage2,
    check1,
    check2,
    checkBtnText,
    checkUser,
    buttonActive,
    onPress,
    secureTextEntry1 = false,
    secureTextEntry2 = false,
}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <CustomStatusBar translucent={false} />
            <TopContainerComponent2 text="가입하기" onPress={() => navigation.pop()} />
            <View style={styles.inputContainer}>
                <View style={{ ...styles.textView, marginTop: '8%' }}>
                    <Text style={styles.textStyles} allowFontScaling={false}>
                        {text1}
                    </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ ...styles.inputView, alignItems: 'center' }}>
                        <TextInput
                            style={{ ...styles.inputStyles, width: '89%' }}
                            placeholder={placeholder1}
                            value={value1}
                            onChangeText={onChangeText1}
                            secureTextEntry={secureTextEntry1}
                            maxLength={maxLength1}
                            allowFontScaling={false}
                        />
                    </View>
                </View>
                <View style={styles.checkTextView}>
                    <Text
                        style={[styles.checkText, check1 ? styles.successText : styles.errorText]}
                        allowFontScaling={false}
                    >
                        {checkMessage1}
                    </Text>
                </View>

                <View style={{ ...styles.textView, marginTop: '3%' }}>
                    <Text style={styles.textStyles} allowFontScaling={false}>
                        {text2}
                    </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ ...styles.inputView, flexDirection: 'row' }}>
                        <TextInput
                            style={{ ...styles.inputStyles, width: '70%' }}
                            placeholder={placeholder2}
                            value={value2}
                            onChangeText={onChangeText2}
                            maxLength={maxLength2}
                            secureTextEntry={secureTextEntry2}
                            allowFontScaling={false}
                        />
                        <TouchableOpacity style={styles.checkBtnStyle} onPress={checkUser}>
                            <Text style={styles.checkBtnText} allowFontScaling={false}>
                                {checkBtnText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.checkTextView}>
                    <Text
                        style={[styles.checkText, check2 ? styles.successText : styles.errorText]}
                        allowFontScaling={false}
                    >
                        {checkMessage2}
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
                        다음
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default SignupType2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    inputView: {
        width: '100%',
        justifyContent: 'center',
        marginTop: '5%',
    },
    inputStyles: {
        padding: 3,
        fontSize: 15,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#B1B6AE',
        includeFontPadding: false,
    },
    textView: {
        marginLeft: '6%',
        top: '3%',
    },
    textStyles: {
        fontSize: 15,
        fontWeight: '500',
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
        lineHeight: 30,
    },
    errorText: {
        color: '#FF4949',
        lineHeight: 30,
    },
});
