import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Axios from 'axios';

function LoginPage( { navigation } ){

    const [LoginSaved, setLoginSaved] = useState(false);
    const [IdSaved, setIdSaved] = useState(false);
    const [Read, setRead] = useState([]);

    const getRead = () => {
      Axios.post('http://localhost:3000/userdb')
      .then(res => {
        setRead(res.data);
      })
      .catch(error => console.log(error))
    };

    useEffect(() => {
      getRead();
    }, []);

    return (
      <View style={ styles.container }>
        
        <Text style = { styles.Title }>Plant-I</Text>
        {/* 아이디, 비밀번호 입력 */}
        <View style = { styles.InputForm }>
            <Text style = {{ fontSize: 22, fontWeight: 'bold', position: 'relative', top: 15 }}>아이디</Text>
            <TextInput style = { styles.input }></TextInput>
            <Text style = {{ fontSize: 22, fontWeight: 'bold', position: 'relative', top: 15 }}>비밀번호</Text>              
            <TextInput style = { styles.input } secureTextEntry={ true }></TextInput>
        </View>

        {/* 체크 박스 (로그인 상태 유지, 아이디 저장) */}
        <View style = {styles.CheckBox}>
          <Checkbox status = {LoginSaved ? 'checked' : 'unchecked'} onPress = {() => setLoginSaved(!LoginSaved)}/>
          <Text style = {{ fontSize: 15, marginBottom: 2 }}>로그인 상태 유지</Text>

          <Checkbox status = {IdSaved ? 'checked' : 'unchecked'} onPress = {() => setIdSaved(!IdSaved)}/>
          <Text style = {{ fontSize: 15, marginBottom: 2}}>아이디 저장</Text>
        </View>

        {/* 로그인 및 회원가입 버튼 */}
        <View style = {styles.Btn}>
            <TouchableOpacity style = { styles.SignInBtn } onPress = {() => navigation.navigate('Home')}>
                <Text style = {{ fontSize: 25,fontWeight: 'bold', marginBottom: 3 }}>로그인</Text>
            </TouchableOpacity>
              
            <TouchableOpacity style = { styles.SignupBtn } onPress = { () => alert('회원가입') }>
                <Text style = {{ fontSize: 25, fontWeight: 'bold', marginBottom: 3 }}>회원가입</Text>
            </TouchableOpacity>
        </View>

        {/* 아이디 찾기, 비밀번호 찾기 버튼*/}
        <View style = { styles.Form }>
            <TouchableOpacity activeOpacity={ 0.8}  onPress={() => alert('아이디 찾기')}>
                <Text style = {{ fontSize: 15, fontWeight: 'bold' }}>아이디 찾기</Text>
            </TouchableOpacity>

            <Text style = {{ fontWeight: 'bold', fontSize: 15 }}> / </Text>

            <TouchableOpacity activeOpacity={0.8} onPress={() => alert('비밀번호 찾기')}>
                <Text style = {{ fontSize: 15,fontWeight: 'bold'}}>비밀번호 찾기</Text>
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
    fontSize: 40,
    fontWeight: '900',
    margin: 50,
    position: 'relative',
    bottom: 60
  },
  input: {  // TextInput 구성
    marginVertical: 25,
    fontSize: 20,
    width: 300,
    borderBottomWidth: 0.8,
    borderBottomColor: '#000000'
  },
  Form: { // 아이디 찾기 및 비밀번호 찾기 구성
    marginTop: 15,
    flexDirection: 'row',
  },
  SignInBtn: { // 로그인 버튼
    backgroundColor: '#CBDDB4',
    width: 200,
    padding: 6,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8
  },
  SignupBtn: { // 회원가입 버튼
    backgroundColor: '#CDD0CB',
    width: 200,
    padding: 6,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8
  },
  CheckBox: {  // 체크박스
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    bottom: 20,
    marginBottom: 10,
    marginRight: 60 
  }
});
//#endregion
