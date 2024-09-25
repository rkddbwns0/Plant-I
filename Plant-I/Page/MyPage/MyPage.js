import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import CustomText from '../../Components/CustomComponents/CustomText';
import AlertModal from '../../Components/ModalComponents/AlertModal';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import imageUrls from '../../JSONData/imageUrls.json';

const MyPage = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState([]);
    const [countData, setCountData] = useState([]);
    const [logoutModal, setLogoutModal] = useState(false);
    const [deleteUserModal, setDeleteUserModal] = useState(false);
    const customerService = ['공지사항', '자주 묻는 질문', '고객센터', '약관 및 정책'];

    const rows = [];
    for (let i = 0; i < customerService.length; i += 2) {
        rows.push(customerService.slice(i, i + 2));
    }

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
        <View style={styles.container}>
            <View style={styles.topViewStyle}>
                <CustomText style={{ fontSize: 18, lineHeight: 25 }}>마이페이지</CustomText>
            </View>
            <View style={styles.profileView}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: userData[0]?.image }} style={styles.imageStyle} />
                </View>
                <View style={styles.profileContainer}>
                    <CustomText medium style={styles.profileName} allowFontScaling={false}>
                        {userData[0]?.Nname}님
                    </CustomText>
                </View>
                <TouchableOpacity style={styles.editProfileBtn} onPress={() => navigation.navigate('EditProfile')}>
                    <Image source={{ uri: imageUrls?.right }} style={styles.iconImages} />
                </TouchableOpacity>
            </View>
            <View style={styles.userActivityView}>
                <View style={styles.activitySection}>
                    <TouchableOpacity style={styles.sectionBtns} onPress={() => navigation.navigate('MyPlants')}>
                        <CustomText medium style={styles.activityTitle}>
                            키우는 식물
                        </CustomText>
                        <CustomText medium style={styles.activityCounts}>
                            {countData[0]?.userplant_counts}
                        </CustomText>
                    </TouchableOpacity>
                </View>
                <View style={styles.activitySection}>
                    <TouchableOpacity style={styles.sectionBtns} onPress={() => navigation.navigate('MyPost')}>
                        <CustomText medium style={styles.activityTitle}>
                            작성한 글
                        </CustomText>
                        <CustomText medium style={styles.activityCounts}>
                            {countData[0]?.post_counts}
                        </CustomText>
                    </TouchableOpacity>
                </View>
                <View style={styles.activitySection}>
                    <TouchableOpacity style={styles.sectionBtns} onPress={() => navigation.navigate('MyComment')}>
                        <CustomText medium style={styles.activityTitle}>
                            작성한 댓글
                        </CustomText>
                        <CustomText medium style={styles.activityCounts}>
                            {countData[0]?.comment_counts}
                        </CustomText>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.customerServiceView}>
                <View>
                    <CustomText medium style={styles.serviceTtitle}>
                        혜택 정보
                    </CustomText>
                    <View>
                        <TouchableOpacity>
                            <CustomText medium style={styles.serviceText}>
                                진행 중인 이벤트
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.serviceView}>
                    <CustomText medium style={styles.serviceTtitle}>
                        문의 및 알림
                    </CustomText>
                    {rows.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.rowView}>
                            {row.map((item, index) => (
                                <View key={index} style={styles.rowItems}>
                                    <TouchableOpacity>
                                        <CustomText medium style={styles.serviceText}>
                                            {item}
                                        </CustomText>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.bottomView}>
                <TouchableOpacity style={styles.bottomBtnStyles} onPress={logout}>
                    <CustomText medium style={styles.bottomText}>
                        로그아웃
                    </CustomText>
                </TouchableOpacity>

                <CustomText medium style={{ ...styles.bottomText, lineHeight: 25 }}>
                    |
                </CustomText>

                <TouchableOpacity style={styles.bottomBtnStyles}>
                    <CustomText medium style={styles.bottomText}>
                        회원탈퇴
                    </CustomText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: 'white',
    },
    topViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '8%',
    },
    imageContainer: {
        marginLeft: '2%',
    },
    imageStyle: {
        borderRadius: 30,
        width: 55,
        height: 55,
    },
    profileName: {
        fontSize: 15,
    },
    profileContainer: {
        marginLeft: '5%',
    },
    iconImages: {
        width: 20,
        height: 20,
        marginLeft: '3%',
    },
    userActivityView: {
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#DCDCDC',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 75,
        marginTop: '7%',
    },
    activitySection: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionBtns: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityTitle: {
        color: '#777777',
        fontSize: 13,
        textAlign: 'center',
    },
    activityCounts: {
        color: '#3DC373',
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 20,
    },
    customerServiceView: {
        flex: 1,
        marginTop: '10%',
    },
    serviceTtitle: {
        fontSize: 13,
        color: '#646464',
    },
    serviceText: {
        fontSize: 14,
    },
    serviceView: {
        marginTop: '4%',
    },
    rowView: {
        flexDirection: 'row',
    },
    rowItems: {
        flex: 1,
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomBtnStyles: {
        paddingHorizontal: '5%',
    },
    bottomText: {
        fontSize: 13,
        color: '#ABABAB',
    },
});

export default MyPage;
