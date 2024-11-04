import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { TopContainerComponent } from '../../Components/TopContainerComponents/TopContainerComponent';
import { BottomContainer } from '../../Components/BottomContainerComponents/BottomContainerComponent';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import ImageSelectModal from '../../Components/ModalComponents/ImageSelectModal';
import AlertModal from '../../Components/ModalComponents/AlertModal';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import axios from 'axios';
import imageUrls from '../../JSONData/imageUrls.json';

const PlantRegister4 = ({ route }) => {
    const navigation = useNavigation();
    const { Pname, progress, place, PNname, water_date, last_Watered } = route.params;
    const [image, setImage] = useState(null);
    const [AlertVisibled, setAlertVisibled] = useState(false);
    const [imageVisibled, setImageVisibled] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);

    const handleImageSelected = (url) => {
        setSelectedImageUrl(url);
        setImage(url);
        setImageVisibled(false);
    };

    const insertPlant = async () => {
        try {
            const response = await axios.post(
                `${SERVER_ADDRESS}/userplantdb/insert`,
                {
                    Pname: Pname,
                    PNname: PNname,
                    Plant_Date: water_date,
                    Place: place,
                    Last_Watered: last_Watered,
                    Image: image,
                },
                { withCredentials: true }
            );
            setAlertVisibled(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <TopContainerComponent onPress={() => navigation.pop()} />
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ flex: 1, justifyContent: 'center', maxHeight: '15%' }}>
                    <Progress.Bar
                        progress={progress}
                        width={300}
                        height={14}
                        color="#3DC373"
                        unfilledColor="#F8F8F8"
                        borderRadius={10}
                    />
                </View>

                <View style={styles.mainView}>
                    <View style={styles.boldFontView}>
                        <Text bold style={styles.boldFontStyle} allowFontScaling={false}>
                            마지막으로 식물의 사진을{'\n'}업로드해 주세요.
                        </Text>
                    </View>

                    <View style={styles.imageView}>
                        <TouchableOpacity style={styles.imageBtn} onPress={() => setImageVisibled(true)}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.imageStyle} />
                            ) : (
                                <>
                                    <Image source={{ uri: imageUrls.image }} style={styles.iconImage} />
                                    <Text style={styles.fontStyle} allowFontScaling={false}>
                                        사진을 업로드하여{'\n'}식물의 모습을 담아주세요.
                                    </Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <BottomContainer ButtonText="식물 등록" onPress={insertPlant} />
            <ImageSelectModal
                visible={imageVisibled}
                onCloseRequest={() => setImageVisibled(false)}
                onCancel={() => setImageVisibled(false)}
                onImageSelected={handleImageSelected}
                Routes="userPlantUploads"
            />
            <AlertModal
                visible={AlertVisibled}
                onRequestClose={() => setAlertVisibled(false)}
                title="등록이 완료되었습니다."
                BtnText="확인"
                onPress={() => {
                    setAlertVisibled(false);
                    navigation.navigate('Home');
                }}
                showBtn={true}
            />
        </View>
    );
};

export default PlantRegister4;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        top: '7%',
    },
    imageView: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginTop: '8%',
    },
    imageBtn: {
        borderWidth: 1,
        borderColor: '#3DC373',
        borderStyle: 'dashed',
        borderRadius: 15,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        backgroundColor: '#F8F8F8',
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    boldFontView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    boldFontStyle: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '600',
    },
    iconImage: {
        width: 30,
        height: 30,
    },
    fontStyle: {
        textAlign: 'center',
        color: '#757575',
        fontSize: 13,
    },
});
