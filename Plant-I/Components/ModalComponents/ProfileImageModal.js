import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Modal, View, StyleSheet, Text, Image } from 'react-native';
import imageUrls from '../../JSONData/imageUrls.json';
import { selectImage, takePhoto } from '../imageComponents/ImageUpload';

const ProfileImageModal = ({ visible, onRequestClose, Routes, onImageSelected }) => {
    const handleImageSelection = async (action) => {
        let imageUri;
        if (action === 'select') {
            imageUri = await selectImage(Routes);
        } else if (action === 'take') {
            imageUri = await takePhoto(Routes);
        }

        if (imageUri) {
            onImageSelected(imageUri);
        }
        onRequestClose();
    };
    return (
        <Modal visible={visible} onRequestClose={onRequestClose} animationType="fade" transparent={true}>
            <View style={styles.container}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        width: '100%',
                        borderColor: '#F1F1F1',
                        borderBottomWidth: 1,
                    }}
                >
                    <TouchableOpacity onPress={() => handleImageSelection('select')} style={styles.btnStyles}>
                        <Text style={styles.textStyles}>사진 보관함</Text>
                        <Image source={{ uri: imageUrls?.images }} style={styles.iconImage} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', width: '100%' }}>
                    <TouchableOpacity onPress={() => handleImageSelection('take')} style={styles.btnStyles}>
                        <Text style={styles.textStyles}>사진 찍기</Text>
                        <Image source={{ uri: imageUrls?.photo }} style={styles.iconImage} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ProfileImageModal;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '45%',
        height: 75,
        borderWidth: 1,
        borderColor: '#F1F1F1',
        borderRadius: 10,
        alignSelf: 'center',
    },
    btnStyles: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    textStyles: {
        fontSize: 13,
    },
    iconImage: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
    },
});
