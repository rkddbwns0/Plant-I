import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from '../CustomComponents/CustomText';

export const BottomContainer = ({ onPress, ButtonText }) => {
    return (
        <View style={styles.BottomContainer}>
            <TouchableOpacity style={[styles.BtnView]} onPress={onPress}>
                <CustomText bold style={styles.fontStyle} allowFontScaling={false}>
                    {ButtonText}
                </CustomText>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    BottomContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '5%',
    },
    BtnView: {
        backgroundColor: '#3DC373',
        width: '85%',
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    fontStyle: {
        fontSize: 18,
        color: 'white',
        lineHeight: 25,
    },
});
