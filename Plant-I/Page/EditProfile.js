import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { UserContext } from "../AuthContext/AuthContext";
import { FontAwesome, Octicons } from '@expo/vector-icons';
import axios from "axios";

const EditProfile = ({ navigation, route }) => {

    const { login, user } = useContext(UserContext);
    const { id } = route.params;
    const { Nname } = route.params;
    const [ NickName, setNickName ] = useState("");

    const UpdateData = () => {
        axios.post('http://10.0.2.2:8080/userdb/update', {
            id: user.id,
            Nname: NickName
        })
        .then(response => {
            console.log(response.data);
            alert("닉네임이 변경되었습니다!");
        })
        .catch (error =>  {
            console.log(error)
        })
    }

    useEffect(() => {
        setNickName(route.params?.Nname);
    }, [route.params?.Nname]);

    const handleUpdateProfile = () => {
        UpdateData();
        navigation.pop();
    }
    
    return(
        <View style={styles.container}>
            <View style = { styles.TopContainer }>
                <TouchableOpacity 
                    style = { styles.BackBtn }
                    onPress = {() => navigation.pop()}
                >
                    <FontAwesome name = "angle-left" size={ 45 } color = "black"/>
                </TouchableOpacity>

                <View style = { styles.TitleContainer }>
                    <Text style = { styles.Title }>닉네임 변경</Text>
                </View>
            </View>

            <View style = { styles.FontContainer }>
                <Text style = {{ fontSize: 22, fontWeight: 'bold' }}>닉네임을 입력해 주세요.</Text>
                <Text
                    style = {{ fontSize: 17, fontWeight: 'bold', color: '#595858', marginTop: 10 }}
                >
                    한글, 영어, 숫자 조합의 1-15자{'\n'}길이의 닉네임으로 설정해 주세요.
                </Text>
            </View>

            <View style = { styles.TextInputContainer }>
                <Text style = {{ fontSize: 18, fontWeight: 'bold' }}>닉네임</Text>
                <View>
                    <TextInput
                        style={ styles.TextinputStyle }
                        placeholderTextColor = 'black'
                        value = { NickName }
                        onChangeText = { setNickName }
                    />
                    <Octicons name="pencil" style = { styles.IconStyle } />
                </View>
            </View>

            <View style = { styles.BtnContainer }>
                <TouchableOpacity 
                    style = { styles.BtnStyle }
                    onPress = { handleUpdateProfile }
                >
                    <Text style = {{ fontSize: 20, fontWeight: 'bold' }}>저장</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default EditProfile;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    TopContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 75,
        borderBottomWidth: 1,
        justifyContent: 'space-between'
    },
    BackBtn: {
        marginLeft: 10
    },
    TitleContainer: {
        position: 'absolute',
        top: '50%,',
        left: '50%',
        transform: [{ translateX: -50 }]
    },  
    Title: {
        fontSize: 22,
        fontWeight: "bold",
    },
    FontContainer: {
        marginTop: 20,
        marginLeft: 20
    },
    TextInputContainer: {
        marginTop: 30,
        marginLeft: 20
    },
    TextinputStyle: {
        width: 360,
        height: 50,
        padding: 8, 
        borderBottomWidth: 1,
        borderColor: '#979797',
        fontSize: 20,
        color: '#595858'
    },
    IconStyle: {
        fontSize: 24,
        color: '#595858',
        left: 330,
        bottom: 33
    },
    BtnContainer: {
        alignSelf: 'center',
        marginTop: 250
    },
    BtnStyle: {
        backgroundColor: '#DADADA',
        width: 280,
        height: 50,
        borderRadius: 18,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
  });