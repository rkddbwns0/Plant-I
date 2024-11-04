import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MyPageBottomComponent = ({ logout }) => {
    return (
        <View style={styles.bottomView}>
            <TouchableOpacity style={styles.bottomBtnStyles} onPress={logout}>
                <Text style={styles.bottomText} allowFontScaling={false}>
                    로그아웃
                </Text>
            </TouchableOpacity>

            <Text style={{ ...styles.bottomText, lineHeight: 25 }} allowFontScaling={false}>
                |
            </Text>

            <TouchableOpacity style={styles.bottomBtnStyles}>
                <Text style={styles.bottomText} allowFontScaling={false}>
                    회원탈퇴
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default MyPageBottomComponent;

const styles = StyleSheet.create({
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomBtnStyles: {
        paddingHorizontal: '5%',
    },
    bottomText: {
        fontSize: 13,
        color: '#ABABAB',
        fontWeight: '500',
    },
});
