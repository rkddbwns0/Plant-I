import React from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import imageUrls from './JSONData/imageUrls.json';
import WelcomePage from './Page/WelcomePage';
import LoginPage from './Page/Login';
import Signup1 from './Page/SignupPage/Signup1';
import Signup2 from './Page/SignupPage/Signup2';
import Signup3 from './Page/SignupPage/Signup3';
import Signup4 from './Page/SignupPage/Signup4';
import Home from './Page/Home';
import Community from './Page/PostPage/Community';
import Favorite from './Page/Favorite';
import Search from './Page/SearchPage/Search';
import MyPage from './Page/MyPage/MyPage';
import PlantRegister1 from './Page/PlantRegisterPage/PlantRegister1';
import PlantRegister2 from './Page/PlantRegisterPage/PlantRegister2';
import PlantRegister3 from './Page/PlantRegisterPage/PlantRegister3';
import PlantRegister4 from './Page/PlantRegisterPage/PlantRegister4';
import UserPlantInfo from './Page/UserPlantInfo';
import EditPlantInfo from './Page/EditPlantInfo';
import EditPlace from './Page/EditPlace';
import NotifySettings from './Page/NotifySettings';
import PlantDetail from './Page/PlantDetail';
import WriteBoard from './Page/PostPage/WriteBoard';
import BoardContent from './Page/PostPage//BoardContent';
import EditBoardContent from './Page/PostPage/EditBoardContent';
import FindingId from './Page/FindingPage/FindingId';
import FindingIdResult from './Page/FindingPage/FindingIdResult';
import FindingPw from './Page/FindingPage/FindingPw';
import EditPassword from './Page/FindingPage/EditPassword';
import MyPlants from './Page/MyPage/MyPlants';
import MyPost from './Page/MyPage/MyPost';
import MyComment from './Page/MyPage/MyComment';
import EditProfile from './Page/MyPage/EditProfile';
import EditNname from './Page/MyPage/EditNname';
import TagResult from './Page/SearchPage/TagResult';
import SearchResult from './Page/SearchPage/SearchResult';
import CommunitySearch from './Page/PostPage/CommunitySearch';
import Chatbot from './Page/Chatbot';
import Test from './Page/MBTIPage/Test';
import MbtiQuestions from './Page/MBTIPage/MbtiQuestions';
import Result from './Page/MBTIPage/Result';
import AlarmPage from './Page/AlarmPage';
import SplashScreen from './Page/SplashScreen';
import MyChatbotResult from './Page/MyPage/MyChatbotResult';
import MyChatbotRecord from './Page/MyPage/MyChatbotRecord';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
//#region 바텀 네비게이션 구성
const TabNavigator = () => (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    height: 65,
                    backgroundColor: 'white',
                    borderTopWidth: 0.5,
                    borderTopColor: '#D0CFCF',
                },
                tabBarLabelStyle: { fontSize: 12, position: 'relative', bottom: '8%' },
                tabBarInactiveTintColor: '#E1E1E1',
                tabBarActiveTintColor: '#3DC373',
                tabBarItemStyle: { justifyContent: 'center', alignItems: 'center', flexDirection: 'column' },
                tabBarIconStyle: { justifyContent: 'center', alignItems: 'center', alignContent: 'center' },
            }}
        >
            <Tab.Screen
                name="홈"
                component={Home}
                options={({ route, navigation }) => ({
                    tabBarIcon: ({ color, size, focused, marginTop }) => (
                        <HomeCustom foused={focused} color={color} size={size} marginTop={marginTop} />
                    ),
                    headerTitle: () => (
                        <Text style={{ fontSize: 20, lineHeight: 25, color: '#5B5B5B' }}>Plant - I</Text>
                    ),
                    headerTitleAlign: 'left',
                    headerStyle: { backgroundColor: 'white' },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('AlarmPage')}>
                            <Image
                                source={{ uri: imageUrls.bell }}
                                style={{ width: 20, height: 20, marginRight: '5%' }}
                            />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Tab.Screen
                name="게시판"
                component={Community}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused, marginTop }) => (
                        <CommunityCustom foused={focused} color={color} size={size} marginTop={marginTop} />
                    ),
                }}
            />
            <Tab.Screen
                name="검색"
                component={Search}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused, marginTop }) => (
                        <SearchCustom foused={focused} color={color} size={size} marginTop={marginTop} />
                    ),
                }}
            />
            <Tab.Screen
                name="즐겨찾기"
                component={Favorite}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused, marginTop }) => (
                        <FavoriteCustom foused={focused} color={color} size={size} marginTop={marginTop} />
                    ),
                }}
            />
            <Tab.Screen
                name="마이페이지"
                component={MyPage}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused, marginTop }) => (
                        <MyPageCustom foused={focused} color={color} size={size} marginTop={marginTop} />
                    ),
                }}
            />
        </Tab.Navigator>
    </View>
);
//#endregion

//#region 상단바 구성
function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen
                    name="WelcomePage"
                    component={WelcomePage}
                    options={{ headerShown: false, animationTypeForReplace: 'pop' }}
                />
                <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
                <Stack.Screen name="Signup1" component={Signup1} options={{ headerShown: false }} />
                <Stack.Screen name="Signup2" component={Signup2} options={{ headerShown: false }} />
                <Stack.Screen name="Signup3" component={Signup3} options={{ headerShown: false }} />
                <Stack.Screen name="Signup4" component={Signup4} options={{ headerShown: false }} />
                <Stack.Screen name="FindingId" component={FindingId} options={{ headerShown: false }} />
                <Stack.Screen name="FindingIdResult" component={FindingIdResult} options={{ headerShown: false }} />
                <Stack.Screen name="FindingPw" component={FindingPw} options={{ headerShown: false }} />
                <Stack.Screen name="EditPassword" component={EditPassword} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="UserPlantInfo" component={UserPlantInfo} options={{ headerShown: false }} />
                <Stack.Screen name="PlantRegister1" component={PlantRegister1} options={{ headerShown: false }} />
                <Stack.Screen name="PlantRegister2" component={PlantRegister2} options={{ headerShown: false }} />
                <Stack.Screen name="PlantRegister3" component={PlantRegister3} options={{ headerShown: false }} />
                <Stack.Screen name="PlantRegister4" component={PlantRegister4} options={{ headerShown: false }} />
                <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
                <Stack.Screen name="EditNname" component={EditNname} options={{ headerShown: false }} />
                <Stack.Screen name="EditPlantInfo" component={EditPlantInfo} options={{ headerShown: false }} />
                <Stack.Screen name="EditPlace" component={EditPlace} options={{ headerShown: false }} />
                <Stack.Screen name="NotifySettings" component={NotifySettings} options={{ headerShown: false }} />
                <Stack.Screen name="PlantDetail" component={PlantDetail} options={{ headerShown: false }} />
                <Stack.Screen name="WriteBoard" component={WriteBoard} options={{ headerShown: false }} />
                <Stack.Screen name="BoardContent" component={BoardContent} options={{ headerShown: false }} />
                <Stack.Screen name="MyPlants" component={MyPlants} options={{ headerShown: false }} />
                <Stack.Screen name="MyPost" component={MyPost} options={{ headerShown: false }} />
                <Stack.Screen name="MyComment" component={MyComment} options={{ headerShown: false }} />
                <Stack.Screen name="MyChatbotResult" component={MyChatbotResult} options={{ headerShown: false }} />
                <Stack.Screen name="MyChatbotRecord" component={MyChatbotRecord} options={{ headerShown: false }} />
                <Stack.Screen name="TagResult" component={TagResult} options={{ headerShown: false }} />
                <Stack.Screen name="SearchResult" component={SearchResult} options={{ headerShown: false }} />
                <Stack.Screen name="CommunitySearch" component={CommunitySearch} options={{ headerShown: false }} />
                <Stack.Screen name="Chatbot" component={Chatbot} options={{ headerShown: false }} />
                <Stack.Screen name="Test" component={Test} options={{ headerShown: false }} />
                <Stack.Screen name="MbtiQuestions" component={MbtiQuestions} options={{ headerShown: false }} />
                <Stack.Screen name="Result" component={Result} options={{ headerShown: false }} />
                <Stack.Screen name="AlarmPage" component={AlarmPage} options={{ headerShown: false }} />
                <Stack.Screen name="EditBoardContent" component={EditBoardContent} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App;
//#endregion

//#region 아이콘 스타일
const HomeCustom = ({ foused }) => {
    const icon = foused ? imageUrls?.home_color : imageUrls?.home;

    return <Image source={{ uri: icon }} style={{ width: 28, height: 28 }} />;
};

const CommunityCustom = ({ foused }) => {
    const icon = foused ? imageUrls.community_color : imageUrls.community;

    return <Image source={{ uri: icon }} style={{ width: 25, height: 25 }} />;
};

const SearchCustom = ({ foused }) => {
    const icon = foused ? imageUrls?.search_color : imageUrls?.search;

    return <Image source={{ uri: icon }} style={{ width: 30, height: 30 }} />;
};

const FavoriteCustom = ({ foused }) => {
    const icon = foused ? imageUrls?.favorite_color : imageUrls?.favorite;

    return <Image source={{ uri: icon }} style={{ width: 28, height: 28 }} />;
};

const MyPageCustom = ({ foused }) => {
    const icon = foused ? imageUrls?.myPage_color : imageUrls?.myPage;

    return <Image source={{ uri: icon }} style={{ width: 30, height: 30 }} />;
};
//#endregion
