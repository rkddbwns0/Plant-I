import React, { useContext, useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { UserContext } from "../AuthContext/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const MyPage = ({ navigation }) => {

  const { login, user } = useContext(UserContext);
  const [ userData, setUserData ] = useState([]);
  const [ LogoutVisibled, setLogoutVisibled ] = useState(false);

  const handleEditProfile = () => {
    navigation.navigate("EditProfile", {
      id: userData[0].id,
      Nname: userData[0].Nname
    });
  }
   
  const SelectUser = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8080/userdb/userId',{ 
        params: {
          id: user.id
        }
      });
      const data = response.data;
         setUserData(data);
    }
    catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
        SelectUser();
    }, [user])
  );

  const logout = async () => {
    try {
      AsyncStorage.clear();
      navigation.navigate("LoginPage");
    }
    catch (error) {
      console.log(error);
    }
  }

  const DeleteUser = () => {
      axios.post("http://10.0.2.2:8080/userdb/delete", {
        id: user.id
      })
      .then (
        response => {
          console.log("회원 탈퇴 성공");
          alert("회원탈퇴가 완료되었습니다.");
          navigation.navigate("LoginPage");
      })
      .catch (error => {
        console.log(error)
      })
  }

  const handleDeleteUser = () => {
    Alert.alert("삭제", "회원을 탈퇴하시겠습니까?", 
          [
              {
                text: '탈퇴하기',
                onPress: () => DeleteUser()
              },
              {
                    text: '취소',
                    onPress: () => console.log("취소")
              },
          ],
            { cancelable: false }
        );
  }

  const handleNotificationSettings = () => {
    navigation.navigate("NotifySettings");
  }

  const LogoutModal = ({ visible, Logout, Cancel }) => {
    return (
      <Modal
        animationType = "none"
        transparent = {true}
        visible = {visible}
      >
        <View style = {styles.ModalContainer}>
          <View style = {styles.ModalView}>
            <Text style = {{ fontSize: 20, fontWeight: 'bold' }}>로그아웃 하시겠습니까?</Text>
            <View style = {styles.ModalBtnContainer}>
              <TouchableOpacity
                style = {[ styles.BtnStyle, { backgroundColor: '#DADADA', right: 10 }]}
                onPress = {Cancel}
              >
                <Text style = {{ fontSize: 16, fontWeight: 'bold'}}>취소</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style = {[ styles.BtnStyle, { backgroundColor: '#CBDDB4', left: 10 }]}
                onPress = {Logout}
              >
                <Text style = {{ fontSize: 16, fontWeight: 'bold' }}>로그아웃</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.iconContainer}>
          <Feather name="user" size={50} color="black" />
        </View>
        <View style={styles.textButtonContainer}>
          <Text style={styles.profileName}>{ userData[0]?.Nname } 님</Text>
        </View>
      </View>

      <View style={styles.actionSection}>
        <TouchableOpacity
          onPress={() => handleNotificationSettings()}
          style={styles.actionItem}
        >
          <Text style={styles.settingText}>알림 설정</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleEditProfile()}
          style = { styles.actionItem }
        >
          <Text style = { styles.settingText }>닉네임 변경</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress = {() => setLogoutVisibled(true) }
          style = { styles.actionItem }
        >
          <Text style = { styles.settingText }>로그아웃</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress = {() => handleDeleteUser()}
          style={ styles.actionItem }
        >
          <Text style = { styles.settingText }>회원탈퇴</Text>
        </TouchableOpacity>
      </View>
      <LogoutModal 
        visible = {LogoutVisibled} 
        Cancel = {() => setLogoutVisibled(false)} 
        Logout = {() => {logout(); setLogoutVisibled(false);}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderColor: "#757575",
    borderWidth: 2,
    borderRadius: 10,
    height: 89,
  },
  iconContainer: {
    padding: 5,
  },
  profileName: {
    fontSize: 25,
    color: "black",
    fontWeight: "bold",
  },
  editProfileButton: {
    marginTop: 5,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "#ECEDEB",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  textButtonContainer: {
    marginLeft: 10, 
  },
  centeredButton: {
    width: 150,
  },
  actionSection: {
    flexDirection: "column",
  },
  actionItem: {
    borderColor: "gray",
    borderBottomWidth: 1,
    marginHorizontal: 2,
    width: "100%",
    height: 55,
    padding: 3,
    justifyContent: 'center'
  },
  settingText: {
    fontSize: 20,
    marginLeft: 10, 
    fontWeight: "bold"
  },
  ModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ModalView: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center'
  },
  ModalBtnContainer: {
    flexDirection: 'row',
    width: '100%',
    top: 25,
  },
  BtnStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 45,
    borderRadius: 10
  }
});

export default MyPage;