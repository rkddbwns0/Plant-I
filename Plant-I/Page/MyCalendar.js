import React, { useContext, useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from  'react-native'
import { Calendar, LocaleConfig } from "react-native-calendars";
import DropDownPicker from "react-native-dropdown-picker";
import { UserContext } from "../AuthContext/AuthContext";
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import { Button } from "react-native-paper";

const MyCalendar = () => {

    const getToday = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        const dateString = year + '-' + month + '-' + day;

        return dateString;
    }
    const { login, user } = useContext(UserContext);
    const [ open, setOpen ] = useState(false);
    const [ value, setValue ] = useState(null);
    const [ label, setLabel ] = useState('');
    const [ items, setItems ] = useState([]);
    const [ selectedDate, setSelectedDate ] = useState(getToday);
    const [ isVisibled, setIsVisibled ] = useState(false);
    const [userPlantData, setUserPlantData] = useState([]);
    
    useEffect(() => {
        const selectedOption = items.find(item => item.Pname === value);
        if (selectedOption) {
            setLabel(selectedOption.PNname);
        } else {
            setLabel('');
        }
    }, [value])

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
    }

    const getPlantData = async () => {
        try {
            if(user && user.id) {
                const response = await axios.get('http://10.0.2.2:8080/userplantdb',{ 
                    params: {
                    id: user.id
                }
            });
            const data = response.data;
            setUserPlantData(data);
            setItems(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getPlantData();
        }, [user])
    );
 
    LocaleConfig.locales['ko'] = {
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        today: '오늘'
      };
    LocaleConfig.defaultLocale = 'ko';

    return (
        <View>
            <Modal
               visible = { isVisibled }
               animationType = 'fade'
               transparent = { true }
               onRequestClose = {() => {
                   setIsVisibled(!isVisibled)
               }}
            >
                <View style = { styles.centeredView }>
                    <View style = { styles.ModalView }>
                        <View style = { styles.dateView }>
                            <TouchableOpacity>
                                <AntDesign name = "left" size={ 30 } color = "black" />
                            </TouchableOpacity>
                            <Text style = {{ fontSize: 20 }}>{ selectedDate }</Text>
                            <TouchableOpacity>
                                <AntDesign name = "right" size={ 30 } color = "black" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView 
                            style = { styles.ScrollView }
                            horizontal = {true}
                            showsHorizontalScrollIndicator = {true}
                            removeClippedSubviews = {true}
                        >
                            {userPlantData.map((data, index) => (
                            <View key = { index } style = { styles.ScrollData }>
                                <TouchableOpacity 
                                    style = {{ width: '100%', height: '100%' }} 
                                >
                                    <Text>{data.Pname}</Text>
                                </TouchableOpacity>
                            </View>
                            ))}
                        </ScrollView>

                        <Button>물주기</Button>

                        <View style = { styles.BtnView }>
                            <TouchableOpacity
                                style = { styles.InsertBtn }
                            >
                                <Text style = {{ fontSize: 15, fontWeight: 'bold' }}>추가하기</Text>
                            </TouchableOpacity>

                            <TouchableOpacity  
                                style = { styles.deleteBtn }
                            >
                                <Text style = {{ fontSize: 15, fontWeight: 'bold' }}>삭제하기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style = {styles.container}>
                <DropDownPicker 
                    open = { open }
                    value = { value }
                    items = { items.map(item => ({
                        label: item.PNname, value: item.Pname
                    }))}
                    setOpen = { setOpen }
                    setValue = { setValue }
                    setItems = { setItems }
                    dropDownContainerStyle = {{ borderColor: '#ECEDEB', backgroundColor: '#ECEDEB' }}
                    style = {{ backgroundColor: '#ECEDEB', borderColor: '#ECEDEB', height: 20 }}
                    textStyle = {{ fontSize: 15, fontWeight: 'bold' }}
                    placeholder = "전체"
                />
            </View>
                <Calendar 
                    style = { styles.CalendarStyle }
                    theme = {{ 
                        todayTextColor: '#CBDDB4',
                        textMonthFontSize: 17,
                        textDayFontSize: 14,
                        textDayHeaderFontSize: 14,
                        textMonthFontWeight : 'bold',
                        arrowColor: 'black',
                        weekVerticalMargin: 10,
                    }}
                    renderArrow = {(direction) => direction === "left" ? (
                        <AntDesign name = "left" size={ 20 } color = "black" />
                    ) : (
                        <AntDesign name = "right" size={ 20 } color = "black" />
                    )}
                    onDayPress = { onDayPress }
                    monthFormat = { 'yyyy년 M월' }
                    markedDates = {{
                        [selectedDate]: {
                            selected: true,
                            disableTouchEvent: true,
                            selectedColor: '#CBDDB4',
                            marked: true,
                        }}
                    }
                />
            <View>
                <TouchableOpacity 
                    style = { styles.BtnStyle }
                    onPress = {() => setIsVisibled(!isVisibled)}
                >
                    <Text style = {{ fontSize: 20, fontWeight: 'bold', marginBottom: 2 }}>일정 등록</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MyCalendar;

const styles = StyleSheet.create({ 
    container: {
        margin: 40,
        marginTop: 20,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        zIndex: 1,
        width: '30%',
    },
    centeredView: {
        flex: 1,
        alignContent: "center",
        textAlignVertical: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    ModalView: {
        backgroundColor: 'white',
        width: '100%',
        height: 350,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        marginTop: 275
    },
    ScrollView: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        maxHeight: '45%',
        backgroundColor: 'grey',
        marginTop: 20
    },
    ScrollData: {
        borderWidth: 1,
        width: '30%',
        height: 120,
        backgroundColor: 'red',
        marginHorizontal: 8,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        borderRadius: 18,
    },
    BtnView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 50,
        marginBottom: 25
    },
    InsertBtn: {
        backgroundColor: '#CBDDB4',
        width: 130,
        height: 45,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },  
    deleteBtn: {
        backgroundColor: '#ECEDEB',
        width: 130,
        height: 45,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dateView: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20
    },
    CalendarStyle: {
        alignSelf: "center",
        borderWidth: 1,
        borderRadius: 8,
        width: '80%',
        height: 400,
        padding: 5
    },
    BtnStyle: {
        margin: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ECEDEB',
        width: 200,
        height: 45,
        borderWidth: 1,
        borderColor: '#ECEDEB',
        borderRadius: 15
    }
});