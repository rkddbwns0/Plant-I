import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export const BottomContainer = ({ onPress, ButtonText }) => {
    return (
        <View style={styles.BottomContainer}>
            <TouchableOpacity style={[styles.BtnView]} onPress={onPress}>
                <Text style={styles.fontStyle} allowFontScaling={false}>
                    {ButtonText}
                </Text>
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
        fontWeight: 'bold',
    },
});
