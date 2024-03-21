import React, { useState, useContext, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import { UserContext } from "../AuthContext/AuthContext";
import UserPlantInfo from "./UserPlantInfo";
import PlantRegister1 from "./PlantRegister1";
import axios from 'axios';

const Home = ({ navigation }) => {

    const [ModalVisible, setModalVisible] = useState(false);
    const [UserPlantModal, setUserPlantModal] = useState(false);
    const [selectPlant, setSelectPlant] = useState(null);
    const [userPlantData, setUserPlantData] = useState([]);
    const { login, user } = useContext(UserContext);

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

    return (
       <View style = { styles.container }>
         {/* 추천 받기 버튼 */}
            <View style = { styles.BtnView }>
                <TouchableOpacity style = { styles.Btn } onPress={() => alert('버튼')}>
                    <Text style = {{ fontSize: 18, fontWeight: 'bold', marginBottom: 2}} >식물 추천받기</Text>
                </TouchableOpacity >

                <TouchableOpacity style = { styles.Btn }>
                    <Text style = {{ fontSize: 18, fontWeight: 'bold', marginBottom: 2 }}>테스트 하러 가기</Text>
                </TouchableOpacity>

            </View>

            { login && userPlantData.length > 0 ? (
                <View>
                    {/* 나의 식물 */}
                    <Text style = {{ fontSize: 22, fontWeight: 'bold', left: 35}} >나의 식물</Text>

                    {/* 등록한 식물 */}
                    <View style = { styles.ScrollContainer }>
                        <ScrollView 
                            horizontal = {true}
                            showsHorizontalScrollIndicator = {true}
                            removeClippedSubviews = {true}
                            contentContainerStyle = { styles.ListStyle }
                        > 
                            {userPlantData.map((data, index) => (
                            <View key = { index } style = { styles.ScrollData }>
                                <TouchableOpacity 
                                    style = {{ width: '100%', height: '100%' }} 
                                    onPress = { () => {
                                        navigation.navigate('UserPlantInfo', {
                                            Pname: data.Pname,
                                            PNname: data.PNname,
                                            plant_date: data.plant_date,
                                            place: data.place
                                          });
                                        }
                                    }
                                >
                                    <Text>사진</Text>
                                </TouchableOpacity>
                                <Text style = {{ alignSelf: 'center', fontWeight: 'bold' }}>{ data.PNname }</Text>
                            </View>
                            ))}
                        </ScrollView>
                    </View>

                    {/* 식물 등록 버튼 */}
                    <TouchableOpacity style = { styles.FABbtn } onPress = { () => { navigation.navigate('PlantRegister1') }}>
                        <Text style = {{ fontSize: 20, fontWeight: 'bold', marginBottom: 2}}>식물 등록하기</Text>
                    </TouchableOpacity>
                </View>
            ) : ( 
                <>
                <View>
                    <View style = {{ marginTop: 55 }}>
                        <Image source = {require('../Images/plant.jpg')} style = {{ alignSelf: 'center' }} />
                        <Text 
                        style = {{ 
                            color: '#608C27', 
                            fontSize: 20, 
                            fontWeight: 'bold', 
                            marginTop: 15,
                            alignSelf: 'center'
                        }}>
                            나의 첫 번째 식물을 {"\n"}     등록해보세요!
                        </Text>
                        <TouchableOpacity style = { styles.RegBtn } onPress = { () => {navigation.navigate('PlantRegister1')}}>
                            <Text style = {{ fontSize: 20, fontWeight: 'bold', marginBottom: 2, alignSelf: 'center' }}>
                                식물 등록하기
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </>
            )}
       </View>
    );
};

export default Home;


//#region 스타일
const styles = StyleSheet.create({
    container: { // 전체 뷰
        flex: 1
    },
    BtnView: { // 추천 및 테스트 버튼 배치
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center',
    },
    Btn: { // 버튼 (추천, 테스트)
        backgroundColor: '#CDD0CB',
        width: 160,
        height: 50,
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    FABbtn: { 
        position: 'absolute',
        top: 420,
        left: 120,
        backgroundColor: '#CDD0CB',
        borderRadius: 15,
        width: 180,
        height: 45,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    RegBtn: {
        backgroundColor: '#CDD0CB',
        width: 220,
        height: 45,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 15
    },
    ScrollContainer: {
        padding: 2,
        marginVertical: 10,
        marginHorizontal: 10,
        height: "77%",
        width: '90%',
        alignSelf: 'center'
    },
    ScrollData: {
        borderWidth: 1,
        borderRadius: 18,
        width: 155,
        height: 155,
        marginRight: 25,
        marginLeft: 5,
        marginBottom: 25,
        alignSelf: 'center'
    },
    ListStyle: {         
        flexDirection: 'columns',
        flexWrap: 'wrap',
    }
});
//#endregion