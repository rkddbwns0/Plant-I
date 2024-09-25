import React, { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TopContainerComponent2 } from '../../Components/TopContainerComponents/TopContainerComponent';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import CustomText from '../../Components/CustomComponents/CustomText';
import imageUrls from '../../JSONData/imageUrls.json';

const EditProfile = () => {
    const navigation = useNavigation();
    const [userProfile, setUserProfile] = useState([]);

    const userData = async () => {
        try {
            const response = await axios.post(`${SERVER_ADDRESS}/userdb/select`, {}, { withCredentials: true });

            const data = response.data;
            setUserProfile(data);
        } catch (error) {
            console.error(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            userData();
        }, [])
    );

    return (
        <View style={styles.container}>
            <TopContainerComponent2 text="내 정보 수정" onPress={() => navigation.pop()} />
            <View style={styles.imageView}>
                <Image source={{ uri: userProfile[0]?.image }} style={styles.imageStyle} />
                <TouchableOpacity style={styles.iconBtn}>
                    <Image source={{ uri: imageUrls?.editProfile }} style={styles.iconImage} />
                </TouchableOpacity>
            </View>

            <View style={styles.profileContainer}>
                <View style={styles.profileView}>
                    <View
                        style={{ ...styles.profileSectionStyles, borderBottomWidth: 0.5, borderBottomColor: '#CDCDCD' }}
                    >
                        <CustomText style={styles.sectionText}>닉네임</CustomText>
                        <TouchableOpacity
                            style={styles.userDataSections}
                            onPress={() => navigation.navigate('EditNname', { Nname: userProfile[0]?.Nname })}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <CustomText style={styles.userDataText} numberOfLines={1} ellipsizeMode="tail">
                                    {userProfile[0]?.Nname}님
                                </CustomText>
                                <Image source={{ uri: imageUrls?.right }} style={styles.rightIcon} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ ...styles.profileSectionStyles, borderBottomWidth: 0.5, borderColor: '#CDCDCD' }}>
                        <CustomText style={styles.sectionText}>이름</CustomText>
                        <View style={styles.userDataSections}>
                            <CustomText style={styles.userDataText}>{userProfile[0]?.name}</CustomText>
                        </View>
                    </View>
                    <View style={{ ...styles.profileSectionStyles, borderBottomWidth: 0.5, borderColor: '#CDCDCD' }}>
                        <CustomText style={styles.sectionText}>아이디</CustomText>
                        <View style={styles.userDataSections}>
                            <CustomText style={styles.userDataText}>{userProfile[0]?.id}</CustomText>
                        </View>
                    </View>
                    <View style={styles.profileSectionStyles}>
                        <CustomText style={styles.sectionText}>휴대폰 번호</CustomText>
                        <View style={styles.userDataSections}>
                            <CustomText style={styles.userDataText}>{userProfile[0]?.Phone}</CustomText>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 180,
    },
    imageStyle: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    iconBtn: {
        position: 'absolute',
        bottom: '33%',
        left: '53%',
    },
    iconImage: {
        width: 20,
        height: 20,
    },
    profileContainer: {
        flex: 1,
        paddingHorizontal: '8%',
    },
    profileView: {
        borderWidth: 0.5,
        borderColor: '#CDCDCD',
        borderRadius: 20,
        flexDirection: 'column',
        alignItems: 'center',
    },
    profileSectionStyles: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: '1%',
        paddingHorizontal: '5%',
    },
    sectionText: {
        flex: 1,
    },
    userDataSections: {
        width: 'auto',
    },
    userDataText: {
        color: '#888888',
    },
    rightIcon: {
        width: 20,
        height: 20,
    },
});
