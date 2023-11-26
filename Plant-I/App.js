import React from 'react';
<<<<<<< HEAD
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {  createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import 'react-native-gesture-handler';
import { MaterialIcons, Octicons, Entypo, FontAwesome, AntDesign, FontAwesome5 } from '@expo/vector-icons';

import LoginPage from './Page/Login';
import Home from './Page/Home';
import MyCalendar from './Page/MyCalendar';
import Favorite from './Page/Favorite';
import Search from './Page/Search';
import MyPage from './Page/MyPage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

//#region 바텀 네비게이션 구성
const TabNavigator = () => (
    <Tab.Navigator
        screenOptions = {{ 
            tabBarStyle: { height: 60, backgroundColor: '#a4c47a',}, 
            tabBarLabelStyle: {fontSize: 0, fontWeight: 'bold', position: 'relative', bottom: 5},
            tabBarInactiveTintColor: 'grey',
            tabBarActiveTintColor: 'black',
    }}>
        <Tab.Screen name = "홈" component = { Home } 
            options = {{ 
                headerShown: false, 
                tabBarIcon: ({color, size, focused, marginTop}) => 
                (<HomeCustom foused = { focused } color = { color }  size = { size } marginTop = { marginTop } />)
            }} 
        />
        <Tab.Screen name = "일정 관리" component = { MyCalendar } 
            options = {{ 
                headerShown: false,
                tabBarIcon: ({color, size, focused, marginTop}) => 
                (<MyCalendarCustom foused = { focused } color = { color }  size = { size } marginTop = { marginTop } />), 
            }} 
        />
        <Tab.Screen name = "식물 찾기" component = { Search } 
            options = {{ 
                headerShown: false,
                tabBarIcon: ({color, size, focused, marginTop}) => 
                (<SearchCustom foused = { focused } color = { color }  size = { size } marginTop = { marginTop } />),
            }} 
        />
        <Tab.Screen name = "즐겨찾기" component = { Favorite } 
            options = {{ 
                headerShown: false,
                tabBarIcon: ({color, size, focused, marginTop}) => 
                (<FavoriteCustom foused = { focused } color = { color }  size = { size } marginTop = { marginTop } />), 
            }} 
        />
        <Tab.Screen name = "마이페이지" component = { MyPage }
            options = {{ 
                headerShown: false,
                tabBarIcon: ({color, size, focused, marginTop}) => 
                (<MyPageCustom foused = { focused } color = { color }  size = { size } marginTop = { marginTop } />),
            }} 
        />
    </Tab.Navigator>
);
//#endregion

//#region 상단바 구성
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = 'LoginPage'>
        <Stack.Screen name = 'LoginPage' component = { LoginPage } options = {{ headerShown: false }} />
        <Stack.Screen name = 'Home' 
        component={ TabNavigator } 
        options = {{ 
          headerTitle: 'Plant-I', 
          headerTitleStyle: { fontSize: 35, fontWeight: 'bold', color: 'black'},
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#a4c47a' },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress = { () => alert('날씨 확인') }>
              <MaterialIcons name="wb-sunny" size={ 25 } color="black" style = {{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <Octicons name="bell-fill" size={ 25 } color="black" style = {{ marginRight: 10 }} />
            </TouchableOpacity>
          )
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
//#endregion

//#region 아이콘 스타일
const HomeCustom = ({ color, size, foused }) => {  // 홈 아이콘
  const iConColor = foused ? 'black' : 'grey';

  return (<Entypo name = "home" size = { 30 } color = { iConColor }/>)
}

const MyCalendarCustom = ({ color, size, foused }) => {  // 달력 아이콘
  const iConColor = foused ? 'black' : 'grey';

  return <Entypo name = "calendar" size = { 30 } color = { iConColor }/>
}

const SearchCustom = ({ color, size, foused }) => {  // 검색 아이콘
  const iConColor = foused ? 'black' : 'grey';

  return <FontAwesome name = "search" size = { 30 } color = { iConColor }/>
}

const FavoriteCustom = ({ color, size, foused }) => {  // 즐겨찾기 아이콘
  const iConColor = foused ? 'black' : 'grey';

  return <AntDesign name = "heart" size={ 30 } color = { iConColor }/>
}

const MyPageCustom = ({ color, size, foused }) => {  // 마이페이지 아이콘
  const iConColor = foused ? 'black' : 'grey';  

  return <FontAwesome5 name = "user-alt" size = { 30 } color = { iConColor }/>
}
//#endregion
=======
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
>>>>>>> e1f44321c583c3af8ed98b32271bf342d6151c23
