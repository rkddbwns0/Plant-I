import React, { useCallback, useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { TopContainerComponent } from '../../Components/TopContainerComponents/TopContainerComponent';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import imageUrls from '../../JSONData/imageUrls.json';
import ProfileImageModal from '../../Components/ModalComponents/ProfileImageModal';
import AlertModal from '../../Components/ModalComponents/AlertModal';

const EditProfile = () => {
    const navigation = useNavigation();
    const [userProfile, setUserProfile] = useState([]);
    const [modalVisibled, setModalVisibled] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [updateModalVisibled, setUpdateModalVisibled] = useState(false);
    const [updateMessage, setUpdateMessage] = useState('');

    const userData = async () => {
        try {
            const response = await axios.post(`${SERVER_ADDRESS}/userdb/select`, {}, { withCredentials: true });

            const data = response.data;
            setUserProfile(data);
            setProfileImage(data[0].image);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const updateProfile = async (imageUri) => {
        try {
            const response = await axios.post(
                `${SERVER_ADDRESS}/userdb/updateprofile`,
                { image: imageUri },
                { withCredentials: true }
            );
            const messageData = response.data.message;
            setUpdateMessage(messageData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateProfile = async (url) => {
        setProfileImage(url);
        await updateProfile(url);
        setModalVisibled(false);
    };

    useFocusEffect(
        useCallback(() => {
            userData();
        }, [])
    );

    return (
        <View style={styles.container}>
            <TopContainerComponent text="내 정보 수정" onPress={() => navigation.pop()} />
            <View style={styles.imageView}>
                {profileImage && <Image source={{ uri: profileImage }} style={styles.imageStyle} />}

                <TouchableOpacity style={styles.iconBtn} onPress={() => setModalVisibled(true)}>
                    <Image source={{ uri: imageUrls?.editprofile }} style={styles.iconImage} />
                </TouchableOpacity>
            </View>

            <View style={styles.profileContainer}>
                <View style={styles.profileView}>
                    <View
                        style={{ ...styles.profileSectionStyles, borderBottomWidth: 0.5, borderBottomColor: '#CDCDCD' }}
                    >
                        <Text style={styles.sectionText} allowFontScaling={false}>
                            닉네임
                        </Text>
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
                                <Text
                                    style={styles.userDataText}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    allowFontScaling={false}
                                >
                                    {userProfile[0]?.Nname}님
                                </Text>
                                <Image source={{ uri: imageUrls?.right }} style={styles.rightIcon} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ ...styles.profileSectionStyles, borderBottomWidth: 0.5, borderColor: '#CDCDCD' }}>
                        <Text style={styles.sectionText} allowFontScaling={false}>
                            이름
                        </Text>
                        <View style={styles.userDataSections}>
                            <Text style={styles.userDataText} allowFontScaling={false}>
                                {userProfile[0]?.name}
                            </Text>
                        </View>
                    </View>
                    <View style={{ ...styles.profileSectionStyles, borderBottomWidth: 0.5, borderColor: '#CDCDCD' }}>
                        <Text style={styles.sectionText} allowFontScaling={false}>
                            아이디
                        </Text>
                        <View style={styles.userDataSections}>
                            <Text style={styles.userDataText} allowFontScaling={false}>
                                {userProfile[0]?.id}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.profileSectionStyles}>
                        <Text style={styles.sectionText} allowFontScaling={false}>
                            휴대폰 번호
                        </Text>
                        <View style={styles.userDataSections}>
                            <Text style={styles.userDataText} allowFontScaling={false}>
                                {userProfile[0]?.Phone}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <ProfileImageModal
                visible={modalVisibled}
                onRequestClose={() => setModalVisibled(false)}
                onImageSelected={handleUpdateProfile}
                Routes="profileImage"
            />
            <AlertModal
                visible={updateModalVisibled}
                onRequestClose={() => setUpdateModalVisibled(false)}
                title={updateMessage}
                showBtn={true}
                BtnText="확인"
                onPress={() => {
                    setUpdateModalVisibled(false);
                    navigation.pop();
                }}
            />
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
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D8D8D8',
    },
    iconBtn: {
        position: 'absolute',
        bottom: '30%',
        left: '54%',
    },
    iconImage: {
        width: 22,
        height: 22,
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
        paddingHorizontal: '7%',
        height: 50,
    },
    sectionText: {
        flex: 1,
        fontWeight: '500',
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
