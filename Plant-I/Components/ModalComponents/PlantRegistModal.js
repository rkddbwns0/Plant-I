import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const PlantRegistModal = ({ visible, onRequestClose, onPress }) => {
    if (!visible) return null;
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.background} onPress={onRequestClose} />
            <View style={styles.mainView}>
                <TouchableOpacity style={styles.btnStyle} onPress={onPress}>
                    <Text style={styles.fontStyle} allowFontScaling={false}>
                        식물 등록하기
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PlantRegistModal;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    mainView: {
        position: 'absolute',
        bottom: '18%',
        right: '20%',
        width: '35%',
    },
    btnStyle: {
        backgroundColor: 'white',
        width: '100%',
        height: 50,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fontStyle: {
        fontSize: 14,
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
