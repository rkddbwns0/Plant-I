import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import CustomText from '../CustomComponents/CustomText';

const PostModal = ({ visible, onRequestClose, onEditPress, onDeletePress, position }) => {
    return (
        <Modal visible={visible} onRequestClose={onRequestClose} animationType="fade" transparent={true}>
            <TouchableOpacity style={styles.container} activeOpacity={1} onPressOut={onRequestClose}>
                <View style={[styles.modalContainer, { top: position.y, left: position.right }]}>
                    <TouchableOpacity style={styles.BtnStyles} onPress={onEditPress}>
                        <CustomText>수정</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.BtnStyles} onPress={onDeletePress}>
                        <CustomText>삭제</CustomText>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        position: 'absolute',
        top: '12%',
        width: '40%',
        padding: '2%',
        borderRadius: 8,
        borderColor: '#EDEDED',
        borderWidth: 1,
    },
    BtnStyles: {
        width: '100%',
    },
});

export default PostModal;
