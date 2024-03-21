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

  const LogoutModal = () => {
    return (
      <Modal>
        <View>
          <Text>로그아웃 하시겠습니까?</Text>
          <View>
            <TouchableOpacity>
              <Text>로그아웃</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text>취소</Text>
            </TouchableOpacity>
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
          onPress = { LogoutModal() }
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
});

export default MyPage;