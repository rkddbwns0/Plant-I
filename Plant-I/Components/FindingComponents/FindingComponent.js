import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import CustomText from '../../Components/CustomComponents/CustomText';
import { TopContainerComponent2 } from '../../Components/TopContainerComponents/TopContainerComponent';
import { useNavigation } from '@react-navigation/native';
import CustomStatusBar from '../../Components/CustomComponents/CustomStatusBar';
import CustomInput from '../../Components/CustomComponents/CustomInput';

const FindingComponent = ({
    topText,
    titleText,
    text1,
    text2,
    placeholder1,
    placeholder2,
    value1,
    value2,
    onChangeText1,
    onChangeText2,
    maxLength1,
    maxLength2,
    secureTextEntry = false,
    keyboardType1,
    keyboardType2,
    findingUser,
    checkBtnText,
    check1,
    checkMessage1,
    check2,
    checkMessage2,
    buttonActive,
    onPress,
    btnText,
    showText,
}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <CustomStatusBar translucent={false} />
            <TopContainerComponent2 text={topText} onPress={() => navigation.pop()} />
            <View style={styles.inputContainer}>
                <View style={styles.titleView}>
                    <CustomText medium style={styles.titleText}>
                        {titleText}
                    </CustomText>
                </View>
                <View style={styles.textView}>
                    <CustomText medium style={styles.textStyles}>
                        {text1}
                    </CustomText>
                </View>
                <View style={{ ...styles.inputView, alignItems: 'center' }}>
                    <CustomInput
                        style={{ ...styles.inputStyles, width: '89%' }}
                        placeholder={placeholder1}
                        value={value1}
                        onChangeText={onChangeText1}
                        maxLength={maxLength1}
                        secureTextEntry={secureTextEntry}
                        keyboardType={keyboardType1}
                    />
                </View>
                {showText && (
                    <View style={styles.checkTextView}>
                        <CustomText style={[styles.checkText, check1 ? styles.successText : styles.errorText]}>
                            {checkMessage1}
                        </CustomText>
                    </View>
                )}

                <View style={{ ...styles.textView }}>
                    <CustomText medium style={styles.textStyles}>
                        {text2}
                    </CustomText>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ ...styles.inputView, flexDirection: 'row' }}>
                        <CustomInput
                            style={{ ...styles.inputStyles, width: '70%' }}
                            placeholder={placeholder2}
                            value={value2}
                            onChangeText={onChangeText2}
                            maxLength={maxLength2}
                            secureTextEntry={secureTextEntry}
                            keyboardType={keyboardType2}
                        />
                        <TouchableOpacity style={styles.checkBtnStyle} onPress={findingUser}>
                            <CustomText style={styles.checkBtnText}>{checkBtnText}</CustomText>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.checkTextView}>
                    <CustomText style={[styles.checkText, check2 ? styles.successText : styles.errorText]}>
                        {checkMessage2}
                    </CustomText>
                </View>
            </View>

            <View style={styles.btnView}>
                <TouchableOpacity
                    style={[buttonActive ? styles.enabledBtnStyle : styles.disabledBtnStyle]}
                    disabled={!buttonActive}
                    onPress={onPress}
                >
                    <CustomText bold style={styles.btnText}>
                        {btnText}
                    </CustomText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FindingComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    titleView: {
        marginLeft: '6%',
    },
    titleText: {
        fontSize: 15,
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
        lineHeight: 25,
        color: 'white',
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
