import React, { useState, useContext, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, TextInput, StyleSheet, TouchableOpacity, Modal } from  'react-native';
import { Calendar, LocaleConfig } from "react-native-calendars";
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import { UserContext } from '../AuthContext/AuthContext';
import axios from 'axios';

const EditPlantInfo = ({ route, navigation }) => {

    const [ isVisibled, setIsVisibled ] = useState(false);
    const { login, user } = useContext(UserContext)
    const { Pname } = route.params;
    const { PNname } = route.params;
    const { plant_date } = route.params;
    const { place } = route.params;
    const [ PlantDate, setPlantDate ] = useState("");
    const [ PlantNname, setPlantNname ] = useState("");
    const [ Place, setPlace ] = useState("");

    useEffect(() => {
        setPlantNname(route.params?.PNname);
    }, [route.params?.PNname]);

    useEffect(() => {
        setPlace(route.params?.place);
    }, [route.params?.place]);

    useEffect(() => {
        setPlantDate(route.params?.plant_date);
    }, [route.params?.plant_date]);
    
    const onDayPress = (day) => {
        setPlantDate(day.dateString);
        setIsVisibled(false);
    }

    const UpdateData = () => {
        axios.put('http://10.0.2.2:8080/userplantdb', {
            id: user.id,
            pname: Pname,
            pnname: PlantNname,
            plant_date: PlantDate,
            place: Place
        })
        .then(response => {
            console.log("수정완료", response.data);
            alert("수정이 완료되었습니다!");
            navigation.navigate('Home');
        })
        .catch(error => {
            console.log(error);
        });
};


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

            <View style = {{ height: '83%' }}>
                <ScrollView>
                    <View style = { styles.PlantName }>
                        <Text style = {{ fontSize: 18 ,fontWeight: 'bold', marginBottom: 2 }}>{ Pname }</Text>
                    </View>

                    <KeyboardAvoidingView>
                            <View style = { styles.UserPlantInfoStyle }>
                                <View style = { styles.InfoStyle }>
                                    <Text style = { styles.infoText }>키우기 시작한 날</Text>
                                    <TouchableOpacity 
                                        style = { styles.TextInputStyle }
                                        onPress = {() => setIsVisibled(!isVisibled)}
                                    >
                                        <Text style = {{ fontSize: 15, fontWeight: 'bold', alignSelf: 'center' }}>{ PlantDate }</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style = { styles.InfoStyle }> 
                                    <Text style = { styles.infoText }>식물 별명</Text>
                                    <TextInput 
                                        style = { styles.TextInputStyle }
                                        textAlign = 'center'
                                        value = { PlantNname }
                                        onChangeText = { setPlantNname }
                                    />
                                </View>

                                <View style = { styles.InfoStyle }>
                                    <Text style = { styles.infoText }>키우는 곳</Text>
                                    <TextInput 
                                        style = { styles.TextInputStyle }   
                                        textAlign = 'center'
                                        value = { Place }
                                        onChangeText = { setPlace }
                                    />
                                </View>

                                <View style = { styles.imgInfo }>
                                    <Text style = {{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>식물 사진</Text>
                                    <TouchableOpacity style = { styles.ImgbtnStyle }>
                                        <Text>사진</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                </ScrollView>
            </View>

            <View style = { styles.UpdateContainer }>
                <TouchableOpacity 
                    style = { styles.UpdateBtn }
                    onPress = { UpdateData }
                >
                    <Text>완료</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditPlantInfo;

const styles = StyleSheet.create({
    container: {  // 전체 View 구성
        flex: 1
    },
    TopBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        marginTop: 8,
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
        borderRadius: 3,
        width: 230,
        height: 40,
        borderRadius: 8,
        marginTop: 35
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
    TextInputStyle: {
        borderWidth: 2,
        borderColor: "#CDD0CB",
        width: 180,
        height: 45,
        fontSize: 15,
        fontWeight: 'bold',
        marginVertical: 15,
        padding: 10,
        borderRadius: 8
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
    UpdateContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    UpdateBtn: {
        width: '60%',
        height: 50,
        backgroundColor: '#ECEDEB',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})