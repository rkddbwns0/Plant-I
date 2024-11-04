import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { SERVER_ADDRESS } from '../ServerAddress';
import axios from 'axios';

export const uploadImage = async (uris, retries = 3, delay = 500, setTempFilePath) => {
    const formData = new FormData();
    uris.forEach((uri, index) => {
        formData.append('images', {
            uri,
            type: 'image/jpeg',
            name: `upload_${index}.jpeg`,
        });
    });

    const uploadRequest = async (retryCount) => {
        try {
            const response = await axios.post(`${SERVER_ADDRESS}/upload/${Routes}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setTempFilePath(response.data.tempFilePath);
            return response.data.imageUrls;
        } catch (error) {
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

export const compressImage = async (uris) => {
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

export const pickImage = async (onImageSelected, uploadImage, onCloseRequest) => {
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

export const PhotopickImage = async (onImageSelected, uploadImage, onCloseRequest) => {
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
