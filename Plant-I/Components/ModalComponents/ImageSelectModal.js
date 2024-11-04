import React from 'react';
import { TouchableOpacity, Modal, View, StyleSheet, Text } from 'react-native';
import { selectImage, takePhoto } from '../imageComponents/ImageUpload';

const ImageSelectModal = ({ visible, onCloseRequest, onCancel, onImageSelected, Routes }) => {
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
        onCloseRequest();
    };

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
                                <Text style={styles.fontStyle} allowFontScaling={false}>
                                    취소
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.BtnView}>
                            <TouchableOpacity style={styles.BtnStyles} onPress={() => handleImageSelection('take')}>
                                <Text style={styles.fontStyle} allowFontScaling={false}>
                                    사진 찍기
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.BtnView}>
                            <TouchableOpacity style={styles.BtnStyles} onPress={() => handleImageSelection('select')}>
                                <Text style={styles.fontStyle} allowFontScaling={false}>
                                    사진 선택
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ImageSelectModal;

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
