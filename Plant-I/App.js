import React from 'react';
import { Button, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import SigninBtn, { SignupBtn } from './component/Button';



export default function App() {
  return (
    <View style={styles.container}>
        <Text style = {styles.Title}>Plant-I</Text>
      <View style = {styles.InputForm}>
        <Text style = {{fontSize: 20, fontWeight: 'bold', position: 'relative', top: 15 }}>아이디</Text>
        <TextInput style = {styles.input}></TextInput>
        <Text style = {{fontSize: 20, fontWeight: 'bold', position: 'relative', top: 15 }}>비밀번호</Text>
        <TextInput style = {styles.input} secureTextEntry={true}></TextInput>
      </View>
      <View style = {styles.Btn}>
        <SigninBtn />
        <SignupBtn />
      </View>
      {/* 아이디 찾기, 비밀번호 찾기 */}
      <View style = {styles.Form}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => alert('아이디 찾기')}>
              <Text style = {{ fontSize: 15, fontWeight: 'bold' }}>아이디 찾기</Text>
        </TouchableOpacity>

        <Text style = {{ fontWeight: 'bold', fontSize: 15 }}> / </Text>

        <TouchableOpacity activeOpacity={0.8} onPress={() => alert('비밀번호 찾기')}>
              <Text style = {{ fontSize: 15,fontWeight: 'bold'}}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {  
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  Title: {
    fontSize: 40,
    fontWeight: '900',
    margin: 50,
    position: 'relative',
    bottom: 50
  },
  InputForm: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  input: {
    marginVertical: 25,
    fontSize: 20,
    width: 300,
    borderBottomWidth: 0.8,
    borderBottomColor: '#000000'
  },
  Form: {
    marginTop: 15,
    flexDirection: 'row',
  }
});
