import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const PostModal = ({ visible, onRequestClose, onEditPress, onDeletePress, position }) => {
    return (
        <Modal visible={visible} onRequestClose={onRequestClose} animationType="fade" transparent={true}>
            <TouchableOpacity style={styles.container} activeOpacity={1} onPressOut={onRequestClose}>
                <View style={[styles.modalContainer, { top: position.y, left: position.right }]}>
                    <TouchableOpacity style={styles.BtnStyles} onPress={onEditPress}>
                        <Text allowFontScaling={false}>수정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.BtnStyles} onPress={onDeletePress}>
                        <Text allowFontScaling={false}>삭제</Text>
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
        width: '48%',
        height: 80,
        borderRadius: 8,
        borderColor: '#EDEDED',
        borderWidth: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    BtnStyles: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        marginLeft: '5%',
    },
});

export default PostModal;
