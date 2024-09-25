import React from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import CustomText from '../CustomComponents/CustomText';

const AlertModal = ({ visible, onRequestClose, title, onCancel, onPress, BtnText, CancelBtnText, showBtn }) => {
    return (
        <Modal animationType="none" transparent={true} visible={visible} onRequestClose={onRequestClose}>
            <View style={styles.ModalContainer}>
                <View style={styles.ModalView}>
                    <View style={{ marginBottom: '15%' }}>
                        <Text style={styles.TitleStyles} allowFontScaling={false}>
                            {title}
                        </Text>
                    </View>

                    {showBtn && (
                        <View style={[styles.ModalBtnContainer, (!onCancel || !onPress) && styles.singleBtnStyle]}>
                            {onCancel && (
                                <TouchableOpacity onPress={onCancel}>
                                    <Text style={{ fontSize: 15, lineHeight: 25 }}>{CancelBtnText}</Text>
                                </TouchableOpacity>
                            )}

                            {onPress && (
                                <TouchableOpacity onPress={onPress} style={styles.onPressBtnStyle}>
                                    <Text
                                        style={{ fontSize: 15, color: 'white', lineHeight: 20 }}
                                        allowFontScaling={false}
                                    >
                                        {BtnText}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default AlertModal;

const styles = StyleSheet.create({
    ModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    ModalView: {
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: '#767676',
        borderRadius: 15,
        width: '75%',
        maxHeight: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ModalBtnContainer: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 30,
        right: 0,
        left: 0,
        justifyContent: 'space-around',
    },
    singleBtnStyle: {
        justifyContent: 'center',
    },
    onPressBtnStyle: {
        backgroundColor: '#3DC373',
        borderRadius: 10,
        width: '30%',
        height: 40,
        top: '3%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TitleStyles: {
        fontSize: 15,
        lineHeight: 20,
        textAlign: 'center',
        fontWeight: '500',
    },
});
