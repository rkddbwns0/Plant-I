import React, { useState, useEffect } from 'react';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import axios from 'axios';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import CustomText from '../../Components/CustomComponents/CustomText';
import { useNavigation } from '@react-navigation/native';
import { MyActivityTopComponent } from '../../Components/TopContainerComponents/TopContainerComponent';
import MyActComponents from '../../Components/MyPage/MyActComponents';

const MyPost = () => {
    const navigation = useNavigation();
    const [postData, setPostDate] = useState([]);
    const Time = (time) => {
        return time.slice(0, 10);
    };

    useEffect(() => {
        const userPostData = async () => {
            try {
                const response = await axios.post(`${SERVER_ADDRESS}/postdb/myPost`, {}, { withCredentials: true });
                const data = response.data;
                setPostDate(data);
            } catch (error) {
                console.error(error);
            }
        };
        userPostData();
    }, []);

    const renderItems = ({ item }) => {
        const imageUrls = JSON.parse(item.Image);
        const firstImageUrls = imageUrls.length > 0 ? imageUrls[0] : null;
        return (
            <View style={styles.postView}>
                <TouchableOpacity
                    style={styles.postStyles}
                    onPress={() =>
                        navigation.navigate('BoardContent', {
                            No: item.No,
                            Category: item.Category,
                            user_image: item.user_image,
                        })
                    }
                >
                    <View style={styles.imageView}>
                        {firstImageUrls && <Image source={{ uri: firstImageUrls }} style={styles.imageStyles} />}
                    </View>
                    <View style={styles.contentView}>
                        <View style={styles.categoryView}>
                            <View style={styles.categoryStyle}>
                                <CustomText style={styles.categoryText}>{item.Category}</CustomText>
                            </View>
                            <CustomText medium style={styles.dateText}>
                                {Time(item?.RegDate)}
                            </CustomText>
                        </View>
                        <CustomText medium style={styles.postTitleText}>
                            {item.Title}
                        </CustomText>
                        <View>
                            <CustomText style={styles.contentText}>{item.Content}</CustomText>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <MyActComponents
            topText="게시글 활동"
            text="게시글 내역"
            data_counts={postData[0]?.total_count}
            data={postData}
            renderItem={renderItems}
        />
    );
};

export default MyPost;

const styles = StyleSheet.create({
    postView: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED',
    },
    postStyles: {
        flexDirection: 'row',
        height: 100,
        alignItems: 'center',
    },
    contentView: {
        flex: 1,
    },
    categoryView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryStyle: {
        backgroundColor: '#F2F2F2',
        width: '20%',
        height: 20,
        justifyContent: 'center',
    },
    categoryText: {
        fontSize: 8,
        color: '#757575',
        textAlign: 'center',
        lineHeight: 12,
    },
    dateText: {
        fontSize: 10,
        color: '#757575',
        textAlign: 'center',
        marginLeft: '2%',
    },
    postTitleText: {
        fontSize: 14,
        lineHeight: 25,
    },
    contentText: {
        fontSize: 12,
        lineHeight: 25,
    },
    imageView: {
        width: '25%',
        marginLeft: '3%',
    },
    imageStyles: {
        width: '90%',
        height: '80%',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#8E8E8E',
    },
});
