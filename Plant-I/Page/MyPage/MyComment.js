import React, { useState, useContext, useEffect } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { MyActivityTopComponent } from '../../Components/TopContainerComponents/TopContainerComponent';
import CustomText from '../../Components/CustomComponents/CustomText';
import MyActComponents from '../../Components/MyPage/MyActComponents';

const MyComment = () => {
    const navigation = useNavigation();
    const [postData, setPostDate] = useState([]);

    const Time = (time) => {
        return time.slice(0, 10);
    };

    useEffect(() => {
        const userPostData = () => {
            axios
                .post(`${SERVER_ADDRESS}/postdb/myComment`, {}, { withCredentials: true })
                .then((response) => {
                    const data = response.data;
                    setPostDate(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        };
        userPostData();
    }, []);

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
                        <CustomText medium style={styles.contentText}>
                            {item?.Content}
                        </CustomText>
                        <CustomText medium style={styles.titleText}>
                            [{item.Title}] 게시글에서
                        </CustomText>
                        <View style={{ top: '8%' }}>
                            <CustomText style={styles.regDateText}>{Time(item?.RegDate)}</CustomText>
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
            data_counts={postData[0]?.total_count}
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
    },
    btnView: {
        flexDirection: 'row',
        height: 100,
        alignItems: 'center',
    },
    contentView: {
        flex: 1,
    },
    contentText: {
        fontSize: 12,
        lineHeight: 25,
    },
    titleText: {
        fontSize: 12,
        lineHeight: 20,
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
    },
});
