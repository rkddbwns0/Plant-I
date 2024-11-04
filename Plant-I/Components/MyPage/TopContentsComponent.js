import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import imageUrls from '../../JSONData/imageUrls.json';

const TopContentsComponent = ({ userData, countData }) => {
    const navigation = useNavigation();
    return (
        <View>
            <View style={styles.topViewStyle}>
                <Text style={{ fontSize: 18, lineHeight: 25 }} allowFontScaling={false}>
                    마이페이지
                </Text>
            </View>
            <View style={styles.profileView}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: userData[0]?.image }} style={styles.imageStyle} />
                </View>
                <View style={styles.profileContainer}>
                    <Text style={styles.profileName} allowFontScaling={false}>
                        {userData[0]?.Nname}님
                    </Text>
                </View>
                <TouchableOpacity style={styles.editProfileBtn} onPress={() => navigation.navigate('EditProfile')}>
                    <Image source={{ uri: imageUrls?.right }} style={styles.iconImages} />
                </TouchableOpacity>
            </View>
            <View style={styles.userActivityView}>
                <View style={styles.activitySection}>
                    <TouchableOpacity
                        style={styles.sectionBtns}
                        onPress={() => {
                            navigation.navigate('MyPlants', { userplant_counts: countData[0]?.userplant_counts });
                        }}
                    >
                        <Text style={styles.activityTitle} allowFontScaling={false}>
                            키우는 식물
                        </Text>
                        <Text style={styles.activityCounts} allowFontScaling={false}>
                            {countData[0]?.userplant_counts}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.activitySection}>
                    <TouchableOpacity
                        style={styles.sectionBtns}
                        onPress={() => {
                            navigation.navigate('MyPost', { post_counts: countData[0]?.post_counts });
                        }}
                    >
                        <Text style={styles.activityTitle} allowFontScaling={false}>
                            작성한 글
                        </Text>
                        <Text style={styles.activityCounts} allowFontScaling={false}>
                            {countData[0]?.post_counts || 0}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.activitySection}>
                    <TouchableOpacity
                        style={styles.sectionBtns}
                        onPress={() => {
                            navigation.navigate('MyComment', { comment_counts: countData[0]?.comment_counts });
                        }}
                    >
                        <Text style={styles.activityTitle} allowFontScaling={false}>
                            작성한 댓글
                        </Text>
                        <Text style={styles.activityCounts} allowFontScaling={false}>
                            {countData[0]?.comment_counts}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default TopContentsComponent;

const styles = StyleSheet.create({
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
        borderRadius: 10,
        width: 55,
        height: 55,
        borderWidth: 1,
        borderColor: '#D8D8D8',
        resizeMode: 'cover',
    },
    profileName: {
        fontSize: 15,
        fontWeight: '500',
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
        fontWeight: '400',
        lineHeight: 30,
    },
    activityCounts: {
        color: '#3DC373',
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '400',
    },
});
