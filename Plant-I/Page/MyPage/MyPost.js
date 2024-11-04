import React, { useState, useEffect, useCallback } from 'react';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import axios from 'axios';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MyActComponents from '../../Components/MyPage/MyActComponents';

const MyPost = () => {
    const navigation = useNavigation();
    const [postData, setPostDate] = useState([]);
    const [postCount, setPostCount] = useState('');
    const Time = (time) => {
        return time.slice(0, 10);
    };

    const userPostData = async () => {
        try {
            const response = await axios.post(`${SERVER_ADDRESS}/postdb/myPost`, {}, { withCredentials: true });
            const data = response.data.result;
            const countData = response.data.countResult;
            setPostDate(data);
            setPostCount(countData);
        } catch (error) {
            console.error(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            userPostData();
        }, [])
    );

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
                                <Text style={styles.categoryText}>{item.Category}</Text>
                            </View>
                            <Text style={styles.dateText} allowFontScaling={false}>
                                {Time(item?.RegDate)}
                            </Text>
                        </View>
                        <Text style={styles.postTitleText} allowFontScaling={false}>
                            {item.Title}
                        </Text>
                        <View>
                            <Text style={styles.contentText} allowFontScaling={false} numberOfLines={1}>
                                {item.Content}
                            </Text>
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
            data_counts={postCount}
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
        fontWeight: '500',
    },
    contentText: {
        fontSize: 12,
        lineHeight: 25,
        width: '75%',
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
        resizeMode: 'cover',
    },
});
