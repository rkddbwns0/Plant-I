import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

import PlantRegister2 from './PlantRegister2';

const PlantRegister1 = ({ navigation }) => {

    const [ Search, setSearch ] = useState("");
    const [ PlantList, setPlantList ] = useState([]);
    const [ selectData, setSelectData ] = useState("");
    const [ ClickDataColor, setClickDataColor ] = useState("");
    const [ disabled, setDisabled ] = useState(false);

    const handleDataSelect = (selected) => {
        setSelectData(selected);
        setClickDataColor(styles.ClickDataColors);
    }

    const handleNextPage = () => {
        if(selectData === "") {
            alert("식물을 선택해주세요.")
        } else {
            setDisabled(true);
            navigation.navigate('PlantRegister2', { selectData: selectData });
            setSelectData("")
        }
    }


    useEffect(() => {
        const SearchData = async () => {
            try {
                const response = await axios.get("http://10.0.2.2:8080/plantdb/Pname");
                const data = response.data;
                setPlantList(data);
            }
            catch (error) {
                console.log(error)
            }
        }
        SearchData();
    }, []); 
    

    return (
        <View style = { styles.container }>
            <View style = { styles.BackBtnContainer }>
                <TouchableOpacity 
                    style = { styles.BackBtn }
                    onPress = {() => navigation.pop()}
                >
                    <FontAwesome name = "angle-left" size={ 40 } color = "#757575" />
                    <Text style = {{ fontSize: 18, fontWeight: 'bold', marginLeft: 5, color: '#757575' }}>뒤로</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TextInput 
                    style = { styles.SearchView }
                    placeholder = '키우는 식물을 검색해주세요.'
                    clearButtonMode='always'
                    blurOnSubmit = { false }
                    value = { Search }
                    onChangeText = { setSearch }
                />
            </View>

            <View style = {{ height: '71%' }}>
                <ScrollView>
                    {PlantList.filter(data => data.pname.includes(Search)).map((data, index) => (
                        <View key = { index } style = { styles.ScrollContainer }>
                            <TouchableOpacity 
                                style = {[ styles.PlantData, selectData == data ? styles.ClickDataColors : null ]}
                                activeOpacity = { 0.5 }
                                onPress = {() => { 
                                    handleDataSelect(data);
                                }}
                            >
                                <Text style = {{ fontSize: 15, fontWeight: 'bold', marginBottom: 2 }}>{ data.pname }</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>

            <View style = { styles.NextBtnContainer}>
                <TouchableOpacity
                    style = {[ styles.NextBtn ]}
                    onPress = { handleNextPage }
                >
                    <Text style = {{ fontSize: 15, fontWeight: 'bold'}}>다음</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PlantRegister1; 


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    BackBtnContainer: {
        width: '18%'
    },
    BackBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginTop: 8,
    },  
    SearchView: {
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: "#979797",
        borderRadius: 10,
        width: '90%',
        height: 50,
        padding: 10,
        fontSize: 15,
        fontWeight: '600',
        margin: 8
    },
    ScrollContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    PlantData: {
        width: '90%',
        height: 45,
        borderRadius: 8,
        backgroundColor: '#CBDDB4',
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    NextBtnContainer: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    NextBtn: {
        backgroundColor: '#DADADA',
        width: "60%",
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    selectData: {
        backgroundColor: 'blue'
    },
    selected: {
        backgroundColor: 'transparent'
    },
    ClickDataColors: {
        backgroundColor: '#AABB93'
    }
})