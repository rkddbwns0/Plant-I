import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Modal } from 'react-native';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import { Calendar, LocaleConfig } from "react-native-calendars";
import axios from 'axios';
import { UserContext } from "../AuthContext/AuthContext";

const PlantRegister2 = ({ navigation, route }) => {

    const [ PlantDate, setPlantDate ] = useState("");
    const [ PNname, setPNname ] = useState("");
    const [ PlantPlace, setPlantPlace ] = useState("");
    const [ PlantImage, setPlantImage ] = useState(null);
    const { login, user } = useContext(UserContext);
    const { selectData } = route.params;
    const [ isVisibled, setIsVisibled ] = useState(false);
    const [ open, setOpen ] = useState(false);
    const [ value, setValue ] = useState(null);
    const [ items, setItems ] = useState([]);
    const [ selected, setSelected ] = useState('');

    const onDayPress = (day) => {
        setPlantDate(day.dateString);
        setIsVisibled(false);
    }
    
    const InsertData = () => {
        if(PlantDate === "") {
            alert("키우기 시작한 날을 지정해 주세요.");
        }
        else if (PNname === "") {
            alert("별명을 지어주세요.");
        }
        else if (PlantPlace === "") {
            alert("키우는 곳을 작성해주세요.")
        } else {
            axios.post('http://10.0.2.2:8080/userplantdb', {
                    id: user.id,
                    pname: selectData.pname,
                    pnname: PNname,
                    plant_date: PlantDate,
                    place: PlantPlace
            })
            .then(response => {
                console.log("등록 완료", response.data);
                alert("식물이 등록되었습니다!");
                navigation.navigate('Home');
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    LocaleConfig.locales['ko'] = {
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        today: '오늘'
      };
    LocaleConfig.defaultLocale = 'ko';

    return (
        <View style = { styles.container }>
            <Modal
                visible = { isVisibled }
                animationType = 'slide'
                transparent = { true }
                onRequestClose = {() => {
                    setIsVisibled(!isVisibled)
                }}
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

            <View style = { styles.TopBtnContainer }>
                <View style = { styles.BackBtnContainer }>
                    <TouchableOpacity 
                        style = { styles.BackBtn }
                        onPress = {() => navigation.pop()}
                    >
                        <FontAwesome name = "angle-left" size={ 40 } color = "#757575" />
                        <Text style = {{ fontSize: 18, fontWeight: 'bold', marginLeft: 5, color: '#757575' }}>뒤로</Text>
                    </TouchableOpacity>
                </View>

                <View style = { styles.CancelBtnContainer }>
                    <TouchableOpacity 
                        stlye = { styles.CancelBtn }
                        onPress = {() => navigation.navigate("Home")}
                    >
                        <Text style = {{ fontSize: 18, fontWeight: 'bold', color: '#757575' }}>취소</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style = {{ height: '82%' }}>
                <ScrollView>
                    <View style = { styles.PlantName }>
                        <Text style = {{ fontSize: 15, fontWeight: 'bold', marginBottom: 2 }}>{ selectData.pname }</Text>
                    </View>

                    <KeyboardAvoidingView>
                        <View style = { styles.UserPlantInfoStyle }>
                            <View style = { styles.InfoStyle }>
                                <Text style = { styles.infoText }>키우기 시작한 날</Text>
                                <TouchableOpacity 
                                    style = { styles.RegStyle }
                                    onPress = {() => setIsVisibled(!isVisibled)}
                                >
                                    <Text style = {{ fontSize: 15, fontWeight: 'bold', alignSelf: 'center' }}>{ PlantDate }</Text>
                                </TouchableOpacity>
                            </View>

                            <View style = { styles.InfoStyle }>
                                <Text style = { styles.infoText }>키우는 곳</Text>
                                <TextInput 
                                    style = { styles.RegStyle }   
                                    textAlign = 'center'
                                    value = { PlantPlace }
                                    onChangeText = { setPlantPlace }
                                />
                            </View>

                            <View style = { styles.InfoStyle }> 
                                <Text style = { styles.infoText }>식물 별명</Text>
                                <TextInput 
                                    style = { styles.RegStyle }
                                    textAlign = 'center'
                                    value = { PNname }
                                    onChangeText = { setPNname }
                                />
                            </View>

                            <View style = { styles.imgInfo }>
                                <Text style = {{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>식물 사진</Text>
                                <TouchableOpacity style = { styles.ImgbtnStyle }>
                                    <Feather name = "image" size={ 50 } color = "#CDD0CB" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>

            <View style = { styles.CompleteContainer }>
                <TouchableOpacity 
                    style = { styles.CompleteBtn }
                    onPress = { InsertData }
                >
                    <Text style = {{ fontSize: 15, fontWeight: 'bold'}}>완료</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PlantRegister2; 


const styles = StyleSheet.create({
    container: {  // 전체 View 구성
        flex: 1
    },
    TopBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        marginTop: 8
    },
    BackBtnContainer: {
        width: '18%'
    },
    BackBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15
    }, 
    CancelBtnContainer: {
        width: '18%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    CancelBtn: {
        alignItems: 'center',
    },
    PlantName: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#CBDDB4',
        borderRadius: 5,
        width: 230,
        height: 40,
        borderRadius: 8,
        marginTop: 20
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
        fontSize: 16,
        fontWeight: 'bold'
    },
    RegStyle: {
        borderWidth: 2,
        borderColor: "#CDD0CB",
        width: 180,
        height: 45,
        fontSize: 15,
        fontWeight: 'bold',
        marginVertical: 15,
        padding: 10,
        borderRadius: 5
    },
    ModalView: {
        backgroundColor: 'white',
        width: 320,
        height: 400,
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#CBDDB4',
        marginTop: 150
    },
    CalendarStyle: {
        alignSelf: "center",
        width: '95%',
        height: '70%',
        padding: 1
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
    CompleteContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    CompleteBtn: {
        width: '60%',
        height: 50,
        backgroundColor: '#ECEDEB',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})