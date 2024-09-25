import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Modal, View, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import CustomText from '../CustomComponents/CustomText';
import { SERVER_ADDRESS } from '../ServerAddress';
import axios from 'axios';

const MultiImagesModal = ({ visible, onCloseRequest, onCancel, onImageSelected, Routes }) => {
    const [tempFilePath, setTempFilePath] = useState(null);

    const uploadImage = async (uris) => {
        const formData = new FormData();
        uris.forEach((uri, index) => {
            formData.append('images', {
                uri,
                type: 'image/jpeg',
                name: `upload_${index}.jpeg`,
            });
        });

        try {
            const response = await axios.post(`${SERVER_ADDRESS}/upload/${Routes}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setTempFilePath(response.data.tempFilePath);
            return response.data.imageUrls;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const compressImage = async (uris) => {
        try {
            const compressedUris = await Promise.all(
                uris.map(async (uri) => {
                    const manipulatedImage = await ImageManipulator.manipulateAsync(
                        uri,
                        [{ resize: { width: 600, height: 600 } }],
                        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
                    );
                    return manipulatedImage.uri;
                })
            );
            return compressedUris;
        } catch (error) {
            console.error(error);

            return uris;
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [5, 5],
            quality: 1,
        });

        if (!result.canceled) {
            const uris = result.assets.map((asset) => asset.uri);
            const compressedUris = await compressImage(uris);
            const imageUrls = await uploadImage(compressedUris);
            if (imageUrls) {
                imageUrls.forEach((url) => onImageSelected(url));
            }
            onCloseRequest();
        }
    };

    const PhotopickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [5, 5],
            quality: 1,
        });

        if (!result.canceled) {
            const compressedUris = await compressImage([result.assets[0].uri]);
            const imageUrls = await uploadImage(compressedUris);
            if (imageUrls) {
                imageUrls.forEach((url) => onImageSelected(url));
            }
            onCloseRequest();
        }
    };

    const finalizeImage = async (finalFilePath) => {
        try {
            await axios.post(`${SERVER_ADDRESS}/upload/finalize`, {
                tempFilePath,
                finalFilePath,
            });
            setTempFilePath(null);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                }
            }
        })();
    }, []);

    return (
        <View>
            <Modal
                visible={visible}
                onCloseRequest={onCloseRequest}
                onCancel={onCancel}
                animationType="fade"
                transparent={true}
            >
                <View style={styles.BackgroundContainer}></View>
            </Modal>
            <Modal transparent={true} visible={visible} onRequestClose={onCloseRequest} animationType="slide">
                <View style={styles.container}>
                    <View style={styles.ModalView}>
                        <View style={styles.BtnView}>
                            <TouchableOpacity style={styles.BtnStyles} onPress={onCancel}>
                                <CustomText style={styles.fontStyle}>취소</CustomText>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.BtnView}>
                            <TouchableOpacity style={styles.BtnStyles} onPress={PhotopickImage}>
                                <CustomText style={styles.fontStyle}>사진 찍기</CustomText>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.BtnView}>
                            <TouchableOpacity style={styles.BtnStyles} onPress={pickImage}>
                                <CustomText style={styles.fontStyle}>사진 선택</CustomText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default MultiImagesModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ModalView: {
        position: 'absolute',
        backgroundColor: 'white',
        width: '100%',
        height: 200,
        bottom: 0,
        borderTopWidth: 1,
        borderColor: '#CDD0CB',
    },
    BackgroundContainer: {
        flex: 1,
        backgroundColor: 'rgba(128, 128, 128, 0.5)',
    },
    fontStyle: {
        fontSize: 17,
        alignSelf: 'flex-start',
        padding: '3%',
    },
    BtnView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    BtnStyles: {
        width: '100%',
    },
});
