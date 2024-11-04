import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import CustomerServiceComponent from '../../Components/MyPage/customerServiceComponent';
import TopContentsComponent from '../../Components/MyPage/TopContentsComponent';
import MyPageBottomComponent from '../../Components/MyPage/MyPageBottomComponent';

const MyPage = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState([]);
    const [countData, setCountData] = useState([]);
    const [deleteUserModal, setDeleteUserModal] = useState(false);

    const SelectUser = async () => {
        try {
            const response = await axios.post(`${SERVER_ADDRESS}/userdb/select`, {}, { withCredentials: true });
            const data = response.data;
            setUserData(data);
        } catch (error) {
            console.error(error);
        }
    };

    const activityCount = async () => {
        try {
            const response = await axios.post(`${SERVER_ADDRESS}/userdb/counts`, {}, { withCredentials: true });
            const data = response.data;
            setCountData(data);
        } catch (error) {
            console.error(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            SelectUser();
            activityCount();
        }, [])
    );

    const logout = async () => {
        try {
            const response = await axios.post(`${SERVER_ADDRESS}/userdb/logout`, {}, { withCredentials: true });
            if (response.data.message === '로그아웃') {
                navigation.navigate('LoginPage');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const DeleteUser = () => {
        axios
            .post(`${SERVER_ADDRESS}/userdb/delete`, {}, { withCredentials: true })
            .then((response) => {
                navigation.navigate('WelcomePage');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white', padding: 15 }}>
            <TopContentsComponent userData={userData} countData={countData} />

            <CustomerServiceComponent />

            <MyPageBottomComponent logout={logout} />
        </View>
    );
};

export default MyPage;
