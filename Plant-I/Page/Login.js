import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import { Checkbox } from 'react-native-paper';
import axios from 'axios';
import { UserContext } from '../AuthContext/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function LoginPage( { navigation } ){

  const { login } = useContext(UserContext);

  const [ id, setId ] = useState('');
  const [ pw, setPw ] = useState('');
  const [rememberUser, setRememberUser] = useState(false);
  const [ saveId, setSaveId ] = useState(false);
  const resetUserData = () => [ setId(''), setPw('') ];

  const rememberUserBox = () => {
    setRememberUser(!rememberUser);
  }

  const SaveIdBox = () => {
    setSaveId(!saveId);
  }

  const Login = async () => {
    try {
      const response = await axios.post("http://10.0.2.2:8080/userdb/login", { id, pw });

      const userData = response.data;

      if(userData.id == id && userData.pw == pw) {
        await AsyncStorage.setItem("user", JSON.stringify(userData));
        login(userData);
        resetUserData();
        navigation.navigate('Home');
      } else {
        alert('아이디 혹은 비밀번호를 잘못 입력하였습니다!');
      }
    } catch (error) {
        console.log('에러', error);
    }
  };

  return (
    <View style={ styles.container }>
      
      <Text style = { styles.Title }>Plant-I</Text>
      {/* 아이디, 비밀번호 입력 */}
      <KeyboardAvoidingView>
        <View style = { styles.InputForm }>
            <TextInput 
              style = { styles.input } 
              value = { id } 
              onChangeText = { (text) => setId(text) } 
              placeholder='아이디' 
              inputMode = 'text'
              placeholderTextColor = 'black'
            />  

            <TextInput 
              style = { styles.input } 
              secureTextEntry={ true } 
              value = { pw } 
              onChangeText = { (text) => setPw(text) }
              placeholder='비밀번호'
              inputMode = 'text'
              placeholderTextColor = 'black'
            />
        </View>
      </KeyboardAvoidingView>

      {/* 체크 박스 (로그인 상태 유지, 아이디 저장) */}
      <View style = {styles.CheckBox}>
        <Checkbox status = {rememberUser ? 'checked' : 'unchecked'} onPress = { rememberUserBox } />
        <Text style = {{ fontSize: 15, fontWeight: 'bold' ,marginBottom: 2 }}>로그인 상태 유지</Text>

        <Checkbox status = {saveId ? 'checked' : 'unchecked'} onPress = { SaveIdBox } />
        <Text style = {{ fontSize: 15, fontWeight: 'bold', marginBottom: 2}}>아이디 저장</Text>
      </View>

      {/* 로그인 및 회원가입 버튼 */}
      <View style = { styles.Btn }>
        <TouchableOpacity style = { styles.SignInBtn } onPress = { Login }>
          <Text style = {{ fontSize: 20, fontWeight: 'bold', marginBottom: 3 }}>로그인</Text>
        </TouchableOpacity>
              
        <TouchableOpacity style = { styles.SignupBtn } onPress = { () => { navigation.navigate("SignUp") }}>
          <Text style = {{ fontSize: 20, fontWeight: 'bold', marginBottom: 3 }}>회원가입</Text>
        </TouchableOpacity>
      </View>

      {/* 아이디 찾기, 비밀번호 찾기 버튼*/}
      <View style = { styles.Form }>
        <TouchableOpacity activeOpacity={ 0.8 }  onPress={() => alert('아이디 찾기')}>
          <Text style = {{ fontSize: 15, fontWeight: 'bold' }}>아이디 찾기</Text>
        </TouchableOpacity>

        <Text style = {{ fontWeight: 'bold', fontSize: 15 }}> / </Text>

        <TouchableOpacity activeOpacity={ 0.8 } onPress={() => alert('비밀번호 찾기')}>
          <Text style = {{ fontSize: 15, fontWeight: 'bold'}}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};
export default LoginPage;

//#region 스타일
const styles = StyleSheet.create({
  container: {  // 전체 View 구성
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  Title: {  // 타이틀
    marginTop: 40,
    fontSize: 50,
    fontWeight: '900',
    position: 'relative',
    bottom: 60,
  },
  input: {  // TextInput 구성
    marginVertical: 12,
    padding: 10,
    fontSize: 17,
    width: 300,
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(205, 208, 203, 1)',
    fontWeight: '700'
  },
  Form: { // 아이디 찾기 및 비밀번호 찾기 구성
    marginTop: 15,
    flexDirection: 'row',
  },
  SignInBtn: { // 로그인 버튼
    backgroundColor: '#CBDDB4',
    width: 200,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    height: 40
  },
  SignupBtn: { // 회원가입 버튼
    backgroundColor: '#CDD0CB',
    width: 200,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    height: 40
  },
  CheckBox: {  // 체크박스
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    bottom: 8,
    marginBottom: 10,
    marginRight: 60 
  }
});
//#endregion
