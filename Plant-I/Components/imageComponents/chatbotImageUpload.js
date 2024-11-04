import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Python_SERVER_ADDRESS } from '../ServerAddress';

export const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5, 5],
        quality: 1,
    });

    if (!result.canceled) {
        const compressedUri = await compressImage(result.assets[0].uri);
        return compressedUri;
    }
};

export const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5, 5],
        quality: 1,
    });

    if (!result.canceled) {
        const compressedUri = await compressImage(result.assets[0].uri);
        return compressedUri;
    }
    return null;
};

const compressImage = async (uri) => {
    try {
        const manipulatedImage = await ImageManipulator.manipulateAsync(uri, [{ resize: { width: 600 } }], {
            compress: 0.7,
            format: ImageManipulator.SaveFormat.WEBP,
        });
        return manipulatedImage.uri;
    } catch (error) {
        console.error('Image compression error:', error);
        return uri;
    }
};

export const uploadImage = async (uri, text, retries = 3, delay = 500) => {
    const formData = new FormData();
    formData.append('image', {
        uri,
        type: 'image/webp',
        name: 'upload.webp',
    });

    formData.append('text', text);

    const uploadRequest = async (retryCount) => {
        try {
            const response = await axios.post(`${Python_SERVER_ADDRESS}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data.message;
        } catch (error) {
            console.error(error);
            if (retryCount > 0) {
                await new Promise((resolve) => setTimeout(resolve, delay));
                return uploadRequest(retryCount - 1);
            } else {
                return null;
            }
        }
    };
    return uploadRequest(retries);
};
