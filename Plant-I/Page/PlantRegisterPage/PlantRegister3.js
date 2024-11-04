import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Text, TextInput } from 'react-native';
import { TopContainerComponent } from '../../Components/TopContainerComponents/TopContainerComponent';
import { BottomContainer } from '../../Components/BottomContainerComponents/BottomContainerComponent';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import CalendarsModal from '../../Components/ModalComponents/CalendarsModal';
import LastWaterModal from '../../Components/ModalComponents/LastWateredModal';
import AlertModal from '../../Components/ModalComponents/AlertModal';

const PlantRegister3 = ({ route }) => {
    const navigation = useNavigation();
    const { Pname, progress, place } = route.params;
    const [plantNickName, setPlantNickName] = useState('');
    const [selectDate, setSelectDate] = useState('');
    const [last_Watered, setLast_Watered] = useState('');
    const [CalendarVisibled, setCalendarVisibled] = useState(false);
    const [LastWateredVisibled, setLastWateredVisibled] = useState(false);
    const [modalVisibled, setModalVisibled] = useState(false);

    const onDayPress = (day) => {
        setSelectDate(day.dateString);
        setCalendarVisibled(false);
    };

    const onLastDayPress = (day) => {
        setLast_Watered(day.dateString);
        setLastWateredVisibled(false);
    };

    const handleNextPage = () => {
        if (plantNickName === '' || selectDate === '' || last_Watered === '') {
            setModalVisibled(true);
        } else {
            navigation.navigate('PlantRegister4', {
                Pname: Pname,
                progress: 1,
                place: place,
                PNname: plantNickName,
                water_date: selectDate,
                last_Watered: last_Watered,
            });
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
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
                        <View style={styles.fontView}>
                            <Text bold style={styles.boldFontStyles} allowFontScaling={false}>
                                1. 식물의 별명을 입력해 주세요.
                            </Text>
                        </View>
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <TextInput
                                value={plantNickName}
                                onChangeText={(text) => setPlantNickName(text)}
                                style={styles.inputStyles}
                                allowFontScaling={false}
                            />
                        </View>

                        <View style={styles.separtor} />

                        <View style={styles.fontView}>
                            <Text bold style={styles.boldFontStyles} allowFontScaling={false}>
                                2. 식물을 키우기 시작한 날을 입력해 주세요.
                            </Text>
                        </View>
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <TouchableOpacity style={styles.inputStyles} onPress={() => setLastWateredVisibled(true)}>
                                <Text style={{ lineHeight: 20 }} allowFontScaling={false}>
                                    {last_Watered}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.separtor} />

                        <View style={styles.fontView}>
                            <Text style={styles.boldFontStyles} allowFontScaling={false}>
                                3. 마지막으로 물 준 날을 선택해 주세요.
                            </Text>
                        </View>
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <TouchableOpacity style={styles.inputStyles} onPress={() => setCalendarVisibled(true)}>
                                <Text style={{ lineHeight: 20 }} allowFontScaling={false}>
                                    {selectDate}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <BottomContainer ButtonText="다음" onPress={handleNextPage} />
            </View>
            <CalendarsModal
                visible={CalendarVisibled}
                onSelect={onDayPress}
                onRequestClose={() => setCalendarVisibled(false)}
            />
            <LastWaterModal
                visible={LastWateredVisibled}
                onSelect={onLastDayPress}
                onRequestClose={() => setLastWateredVisibled(false)}
            />
            <AlertModal
                visible={modalVisibled}
                title="정보를 모두 입력해 주세요."
                showBtn={true}
                BtnText="확인"
                onPress={() => setModalVisibled(false)}
                onRequestClose={() => setModalVisibled(false)}
            />
        </KeyboardAvoidingView>
    );
};

export default PlantRegister3;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    mainView: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        top: '5%',
    },
    fontView: {
        width: '100%',
        marginLeft: '10%',
    },
    inputStyles: {
        width: '92%',
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#E1E1E1',
        padding: 10,
        justifyContent: 'center',
        marginTop: '5%',
    },
    boldFontStyles: {
        fontSize: 15,
        fontWeight: '600',
    },
    separtor: {
        marginTop: '15%',
    },
});
