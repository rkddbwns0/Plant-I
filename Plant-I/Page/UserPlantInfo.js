import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Alert, ScrollView, Modal } from 'react-native';
import { Feather, AntDesign, Octicons, MaterialIcons } from '@expo/vector-icons';
import { Calendar, LocaleConfig } from "react-native-calendars";
import { UserContext } from '../AuthContext/AuthContext';
import axios from 'axios';

const UserPlantInfo = ({ route, data, navigation  }) => {

    const { login, user } = useContext(UserContext)
    const { Pname } = route.params;
    const { PNname } = route.params;
    const { plant_date } = route.params;
    const { place } = route.params;
    const [ isVisibledCalendar, setIsVisibledCalendar ] = useState(false);
    const [ open, setOpen ] = useState(false);
    const [ value, setValue ] = useState(null);
    const [ items, setItems ] = useState([]);
    const [ selected, setSelected ] = useState('');

    const onDayPress = (day) => {
        setPlantDate(day.dateString);
        setIsVisibledCalendar(false);
    }

    LocaleConfig.locales['ko'] = {
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        today: '오늘'
      };
    LocaleConfig.defaultLocale = 'ko';

    const DeleteData = () => {
        axios.delete('http://10.0.2.2:8080/userplantdb', {
            data: {
                id: user.id,
                pname: Pname,
                pnname: PNname,
                plant_date: plant_date,
                place: place
            }
        })
        .then(response => {
            console.log("삭제 완료", response.data);
            alert("삭제되었습니다");
            navigation.navigate('Home');
        })
        .catch(error => {
            console.log(error);
        });
    }

    const handleDelete = () => {
        Alert.alert("삭제", "정보를 삭제하겠습니까?", 
            [
                {
                text: '삭제하기',
                onPress: () => DeleteData()
                },
                {
                    text: '취소',
                    onPress: () => console.log("취소")
                },
            ],
            { cancelable: false }
        );
    }

    return (
            <View style = { styles.container }>
                <Modal
                    visible = { isVisibledCalendar }
                    animationType = 'fade'
                    transparent = { true }
                    onRequestClose = {() => {
                        setIsVisibledCalendar(prev => !prev)
                    }}
                    presentationStyle='overFullScreen'
                >
                    <View style = { styles.ModalView }>
                        <Calendar 
                            style = { styles.CalendarStyle }
                            theme = {{ 
                                todayTextColor: '#CBDDB4',
                                textMonthFontSize: 18,
                                textDayFontSize: 14,
                                textDayHeaderFontSize: 14,
                                textMonthFontWeight : 'bold',
                                arrowColor: 'black',
                                weekVerticalMargin: 10
                            }}
                            renderArrow = {(direction) => direction === "left" ? (
                                <AntDesign name="left" size={ 18 } color="black" />
                            ) : (
                                <AntDesign name="right" size={ 18 } color="black" />
                            )}
                            onDayLongPress= { day => {
                                setSelected(day.dateString);
                            }}
                            monthFormat = {'yyyy년 M월'}
                            onDayPress = { onDayPress }
                        />
                    </View>
                </Modal>
                
                <ScrollView
                    style = { styles.ScrollContainer }
                >
                    <View style = { styles.imgInfo }>
                        <TouchableOpacity style = { styles.ImgbtnStyle }>
                            <Feather name = "image" size={ 50 } color = "#CDD0CB" />
                        </TouchableOpacity>
                    </View>   
                    <View style = { styles.PlantName }>
                        <Text style = {{ fontSize: 18 ,fontWeight: 'bold', marginBottom: 2 }}>{ route.params?.Pname }</Text>
                    </View>

                    <KeyboardAvoidingView>
                        <View style = { styles.UserPlantInfoStyle }>
                            <View style = { styles.InfoStyle }>
                                <Text style = { styles.infoText }>키우기 시작한 날</Text>
                                <TextInput 
                                    style = { styles.InfoDataStyle }
                                    value = { plant_date }
                                    textAlign = 'center'
                                    editable = { false }
                                />
                            </View>

                            <View style = { styles.InfoStyle }> 
                                <Text style = { styles.infoText }>식물 별명</Text>
                                <TextInput 
                                    style = { styles.InfoDataStyle }
                                    value = { PNname }
                                    textAlign = 'center'
                                    editable = { false }
                                />
                            </View>

                            <View style = { styles.InfoStyle }>
                            <Text style = { styles.infoText }>키우는 곳</Text>
                                <TextInput 
                                    style = { styles.InfoDataStyle }
                                    value = { place }
                                    textAlign = 'center'
                                    editable = { false }
                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>

                    <View style = { styles.BtnStyle }>
                        <TouchableOpacity 
                            style = { styles.DeleteBtn }
                            onPress={ handleDelete }
                        >
                            <MaterialIcons name="delete" size = { 24 } color="#757575" />
                            <Text style = {{ fontSize: 18 ,fontWeight: 'bold', color: '#757575' }}>삭제</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style = { styles.UpdateBtn }
                            onPress = {() => navigation.navigate("EditPlantInfo", {
                                Pname: Pname,
                                PNname: PNname,
                                plant_date: plant_date,
                                place: place
                              })}
                        >
                            <Octicons name = "pencil" size = { 24 } color="#757575" />
                            <Text style = {{ fontSize: 18 ,fontWeight: 'bold', color: '#757575' }}>수정</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
    );
};

export default UserPlantInfo; 

const styles = StyleSheet.create({
    container: {  // 전체 View 구성
        flex: 1
    }, 
    ScrollContainer: {
        width: '100%',
        height: '100%',
    },
    PlantName: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#CBDDB4',
        borderRadius: 3,
        width: 230,
        height: 40,
        borderRadius: 8,
        marginTop: 10
    },
    UserPlantInfoStyle: {
        marginBottom: 30,
        marginTop: 20
    },
    InfoStyle: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 30
    },
    infoText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    InfoDataStyle: {
        borderWidth: 2,
        borderColor: "#CDD0CB",
        width: 180,
        height: 45,
        fontSize: 15,
        fontWeight: 'bold',
        marginVertical: 15,
        padding: 10,
        borderRadius: 8,
        color: 'black'
    },
    imgInfo: {
        marginTop: 30
    },
    ImgbtnStyle: {
        borderWidth: 1,
        borderColor: "#CDD0CB",
        width: 180,
        height: 180,
        fontSize: 15,
        fontWeight: 'bold',
        marginVertical: 18,
        padding: 10,
        borderRadius: 8,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    ModalView: {
        backgroundColor: 'white',
        width: 320,
        height: 420,
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#CBDDB4',
        marginTop: 150
    },
    CalendarStyle: {
        alignSelf: "center",
        width: '95%',
        height: '87%',
        padding: 5
    },
    BtnStyle: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-between',
        marginHorizontal: 40,
        marginBottom: 20
    },
    UpdateBtn: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    }
})