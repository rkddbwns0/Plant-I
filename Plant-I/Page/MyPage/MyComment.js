import React, { useState, useEffect, useCallback } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import axios from 'axios';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MyActComponents from '../../Components/MyPage/MyActComponents';

const MyComment = () => {
    const navigation = useNavigation();
    const [postData, setPostDate] = useState([]);
    const [commentCount, setCommentCount] = useState('');

    const Time = (time) => {
        return time.slice(0, 10);
    };

    const userPostData = () => {
        axios
            .post(`${SERVER_ADDRESS}/postdb/myComment`, {}, { withCredentials: true })
            .then((response) => {
                const data = response.data.result;
                const countData = response.data.countResult;
                setPostDate(data);
                setCommentCount(countData);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useFocusEffect(
        useCallback(() => {
            userPostData();
        }, [userPostData])
    );

    const renderItems = ({ item }) => {
        const imageUrls = JSON.parse(item.Image);
        const firstImageUrls = imageUrls.length > 0 ? imageUrls[0] : null;
        return (
            <View style={styles.commentView}>
                <TouchableOpacity
                    style={styles.btnView}
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
                        <Text style={styles.contentText} allowFontScaling={false} numberOfLines={2}>
                            {item?.Content}
                        </Text>
                        <Text style={styles.titleText} allowFontScaling={false}>
                            [{item.Title}] 게시글에서
                        </Text>
                        <View style={{ top: '8%' }}>
                            <Text style={styles.regDateText} allowFontScaling={false}>
                                {Time(item?.RegDate)}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <MyActComponents
            topText="댓글 활동"
            text="답글 내역"
            data_counts={commentCount}
            data={postData}
            renderItem={renderItems}
        />
    );
};

export default MyComment;

const styles = StyleSheet.create({
    commentView: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED',
        justifyContent: 'center',
    },
    btnView: {
        flex: 1,
        minHeight: 100,
        maxHeight: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentView: {
        flex: 1,
        marginLeft: '2%',
    },
    contentText: {
        fontSize: 12,
        lineHeight: 20,
        fontWeight: '500',
        width: '80%',
    },
    titleText: {
        fontSize: 12,
        lineHeight: 20,
        fontWeight: '500',
    },
    regDateText: {
        color: '#757575',
        fontSize: 11,
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
