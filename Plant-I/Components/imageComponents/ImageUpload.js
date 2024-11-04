import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import axios from 'axios';
import { SERVER_ADDRESS } from '../ServerAddress';

export const selectImage = async (Routes) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        return null;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [5, 5],
        quality: 1,
    });

    if (!result.canceled) {
        const compressedUri = await compressImage(result.assets[0].uri);
        return await uploadImage(compressedUri, Routes);
    }
    return null;
};

export const takePhoto = async (Routes) => {
    let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5, 5],
        quality: 1,
    });

    if (!result.canceled) {
        const compressedUri = await compressImage(result.assets[0].uri);
        return await uploadImage(compressedUri, Routes);
    }
    return null;
};

const compressImage = async (uri) => {
    try {
        const manipulatedImage = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 600, height: 600 } }],
            { compress: 0.5, format: ImageManipulator.SaveFormat.WEBP }
        );
        return manipulatedImage.uri;
    } catch (error) {
        console.error(error);
        return uri;
    }
};

const uploadImage = async (uri, Routes, retries = 3, delay = 500) => {
    const formData = new FormData();
    formData.append('image', {
        uri,
        type: 'image/webp',
        name: 'upload.webp',
    });

    const uploadRequest = async (retryCount) => {
        try {
            const response = await axios.post(`${SERVER_ADDRESS}/upload/${Routes}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                timeout: 30000,
            });
            return response.data.imageUrl;
        } catch (error) {
            if (retryCount > 0) {
                await new Promise((resolve) => setTimeout(resolve, delay));
                return uploadRequest(retryCount - 1);
            } else {
                console.error(error);
                return null;
            }
        }
    };

    return uploadRequest(retries);
};
