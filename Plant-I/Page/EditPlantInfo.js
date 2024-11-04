import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, StyleSheet } from 'react-native';
import axios from 'axios';
import AlertModal from '../Components/ModalComponents/AlertModal';
import CalendarsModal from '../Components/ModalComponents/CalendarsModal';
import LastWaterModal from '../Components/ModalComponents/LastWateredModal';
import ImageSelectModal from '../Components/ModalComponents/ImageSelectModal';
import { TopContainerComponent } from '../Components/TopContainerComponents/TopContainerComponent';
import PlantInfoContainer from '../Components/PlantInfoContainerComponens/PlantInfoContainer';
import { BottomContainer } from '../Components/BottomContainerComponents/BottomContainerComponent';
import { SERVER_ADDRESS } from '../Components/ServerAddress';
import { useNavigation } from '@react-navigation/native';

const EditPlantInfo = ({ route }) => {
    const navigation = useNavigation();
    const [CalendarVisibled, setCalendarVisibled] = useState(false);
    const [LastWateredVisibled, setLastWateredVisibled] = useState(false);
    const [successVisibled, setSuccessVisibled] = useState(false);
    const [imageVisibled, setImageVisibled] = useState(false);
    const { No, Pname, PNname, Plant_Date, Last_Watered, Place, image } = route.params;
    const [pname, setPname] = useState('');
    const [editImage, setEditImage] = useState(null);
    const [PlantDate, setPlantDate] = useState('');
    const [last_Watered, setLast_Watered] = useState('');
    const [pnname, setPNname] = useState('');
    const [place, setPlace] = useState('');
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);

    useEffect(() => {
        setPname(route.params?.Pname);
        setEditImage(route.params?.image);
        setPNname(route.params?.PNname);
        setPlace(route.params?.Place);
        setPlantDate(route.params?.Plant_Date);
        setLast_Watered(route.params?.Last_Watered);
    }, [
        route.params?.PNname,
        route.params?.Place,
        route.params?.Plant_Date,
        route.params?.image,
        route.params?.Pname,
        route.params?.Last_Watered,
    ]);

    const onDayPress = (day) => {
        setPlantDate(day.dateString);
        setCalendarVisibled(false);
    };

    const onLastDayPress = (day) => {
        setLast_Watered(day.dateString);
        setLastWateredVisibled(false);
    };

    const UpdateData = () => {
        axios
            .post(
                `${SERVER_ADDRESS}/userplantdb/update`,
                {
                    No: No,
                    Pname: pname,
                    PNname: pnname,
                    Plant_Date: PlantDate,
                    Last_Watered: last_Watered,
                    Place: place,
                    Image: editImage,
                },
                { withCredentials: true }
            )
            .then((response) => {
                setSuccessVisibled(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleImageSelected = (url) => {
        setSelectedImageUrl(url);
        setEditImage(url);
        setImageVisibled(false);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TopContainerComponent onPress={() => navigation.pop()} />

                <PlantInfoContainer
                    imageOnPress={() => setImageVisibled(true)}
                    image={editImage}
                    Pname={Pname}
                    Plant_DateOnPress={() => setCalendarVisibled(true)}
                    Plant_Date={PlantDate}
                    value={pnname}
                    onChangeText={setPNname}
                    PlaceOnPress={(item) =>
                        navigation.navigate('EditPlace', {
                            No: No,
                            Pname: Pname,
                            PNname: pnname,
                            Plant_Date: Plant_Date,
                            Last_Watered: last_Watered,
                            image: editImage,
                        })
                    }
                    Place={place}
                    Last_WateredOnPress={() => setLastWateredVisibled(true)}
                    Last_Watered={last_Watered}
                    PnameDisabled={true}
                    showWater_Period={false}
                />

                <BottomContainer onPress={UpdateData} ButtonText="완료" />

                <AlertModal
                    visible={successVisibled}
                    onRequestClose={() => setSuccessVisibled(false)}
                    title="식물 정보가 수정되었습니다."
                    showBtn={true}
                    BtnText="확인"
                    onPress={() => {
                        setSuccessVisibled(false);
                        navigation.pop();
                        navigation.pop();
                    }}
                />

                <CalendarsModal
                    visible={CalendarVisibled}
                    onRequestClose={() => setCalendarVisibled(false)}
                    onSelect={onDayPress}
                />

                <LastWaterModal
                    visible={LastWateredVisibled}
                    onRequestClose={() => setLastWateredVisibled(false)}
                    onSelect={onLastDayPress}
                />

                <ImageSelectModal
                    visible={imageVisibled}
                    onCloseRequest={() => setImageVisibled(false)}
                    onCancel={() => setImageVisibled(false)}
                    onImageSelected={handleImageSelected}
                    Routes="userPlantUploads"
                />
            </View>
        </KeyboardAvoidingView>
    );
};

export default EditPlantInfo;

const styles = StyleSheet.create({
    container: {
        // 전체 View 구성
        flex: 1,
        backgroundColor: 'white',
    },
});
