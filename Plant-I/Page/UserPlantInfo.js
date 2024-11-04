import React, { useState, useContext, useCallback } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import axios from 'axios';
import AlertModal from '../Components/ModalComponents/AlertModal';
import AlarmModal from '../Components/ModalComponents/AlarmModal';
import { IconTopContainer } from '../Components/TopContainerComponents/TopContainerComponent';
import PlantInfoContainer from '../Components/PlantInfoContainerComponens/PlantInfoContainer';
import { SERVER_ADDRESS } from '../Components/ServerAddress';
import { useFocusEffect } from '@react-navigation/native';

const UserPlantInfo = ({ route, navigation }) => {
    const { No, Pname, PNname, Plant_Date, Last_Watered, Place, image } = route.params;
    const [DeleteVisibled, setDeleteVisibled] = useState(false);
    const [AlarmVisibled, setAlarmVisibled] = useState(false);
    const [watering_Time, setWatering_Time] = useState([]);
    const [selectNumbers, setSelectNumbers] = useState('');
    const [resultDate, setResultDate] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const formmatDate = (date) => {
        if (!date) return null;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSelectNumbers = (number) => {
        if (number !== '주기를 선택해 주세요.') {
            setSelectNumbers(number);
            const newDate = calculateWater_Date(number);
            UpdateWatering_Date(newDate);
        }
    };

    const calculateWater_Date = (number) => {
        const baseDate = new Date(Last_Watered);
        const WateringTime = new Date(baseDate);
        WateringTime.setDate(baseDate.getDate() + number);
        setResultDate(WateringTime);
        return WateringTime;
    };

    const UpdateWatering_Date = (newDate) => {
        const formmatedDate = formmatDate(newDate);
        axios
            .post(
                `${SERVER_ADDRESS}/userplantdb/update/Watering_Time`,
                {
                    Watering_Time: formmatedDate,
                    No: No,
                },
                { withCredentials: true }
            )
            .then((response) => {
                setAlarmVisibled(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const DeleteData = () => {
        axios
            .post(
                `${SERVER_ADDRESS}/userplantdb/delete`,
                {
                    No: No,
                    Pname: Pname,
                    PNname: PNname,
                    Plant_Date: Plant_Date,
                    Place: Place,
                },
                { withCredentials: true }
            )
            .then((response) => {
                navigation.navigate('Home');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleEditBtn = () => {
        navigation.navigate('EditPlantInfo', {
            No: route.params?.No,
            Pname: route.params?.Pname,
            PNname: route.params?.PNname,
            Plant_Date: route.params?.Plant_Date,
            Last_Watered: route.params?.Last_Watered,
            Place: route.params?.Place,
            image: route.params?.image,
        });
    };

    const selectWatering_Time = () => {
        axios
            .post(`${SERVER_ADDRESS}/userplantdb/select/Watering_Time`)
            .then((response) => {
                console.log(data);
                const data = response.data;
                if (Array.isArray(data)) {
                    setWatering_Time(data);
                } else {
                    setWatering_Time([]);
                }
            })
            .catch((error) => {
                console.error(error);
                setWatering_Time([]);
            });
    };

    const OnRefresh = useCallback(async () => {
        setRefresh(true);
        await selectWatering_Time();
        setRefresh(false);
    }, []);

    useFocusEffect(
        useCallback(() => {
            selectWatering_Time();
        }, [])
    );

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <IconTopContainer
                onPress={() => navigation.pop()}
                deleteOnPress={() => setDeleteVisibled(true)}
                EditOnPress={handleEditBtn}
                AlarmOnPress={() => setAlarmVisibled(true)}
            />
            <View style={{ flex: 1 }}>
                <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={OnRefresh} />}>
                    <PlantInfoContainer
                        image={image}
                        Pname={Pname}
                        Plant_Date={Plant_Date}
                        value={PNname}
                        Place={Place}
                        Last_Watered={Last_Watered}
                        editable={false}
                        disabled={true}
                        PnameOnPress={() => {
                            navigation.navigate('PlantDetail', { Pname: Pname });
                        }}
                        showWater_Period={true}
                        Watering_Time={watering_Time[0]?.Watering_Time}
                    />
                </ScrollView>
            </View>

            <AlertModal
                visible={DeleteVisibled}
                onRequestClose={() => setDeleteVisibled(false)}
                title="해당 식물을 삭제하겠습니까?"
                CancelBtnText="아니오"
                BtnText="네"
                onCancel={() => setDeleteVisibled(false)}
                onPress={DeleteData}
                showBtn={true}
            />

            <AlarmModal
                visible={AlarmVisibled}
                onRequestClose={() => setAlarmVisibled(false)}
                onPress={(item) => {
                    handleSelectNumbers(item);
                }}
            />
        </View>
    );
};

export default UserPlantInfo;
