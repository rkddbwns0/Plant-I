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
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );
        return manipulatedImage.uri;
    } catch (error) {
        console.error(error);
        return uri;
    }
};

const uploadImage = async (uri, Routes) => {
    const formData = new FormData();
    formData.append('image', {
        uri,
        type: 'image/jpeg',
        name: 'upload.jpeg',
    });

    try {
        const response = await axios.post(`${SERVER_ADDRESS}/upload/${Routes}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.imageUrl;
    } catch (error) {
        console.error(error);
        return null;
    }
};
