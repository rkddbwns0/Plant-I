import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import { TopContainerComponent } from '../TopContainerComponents/TopContainerComponent';
import imageUrl from '../../JSONData/imageUrls.json';
import { useNavigation } from '@react-navigation/native';

const PostComponent = ({ data, showTopView }) => {
    const navigation = useNavigation();

    const Time = (time) => {
        if (!time) return '';
        const monthDay = time.slice(5, 10).replace('-', '/');
        const hourMinute = time.slice(11, 16);
        return `${monthDay} ${hourMinute}`;
    };

    const renderItems = ({ item }) => {
        const imageUrls = JSON.parse(item.Image);
        const firstImageUrls = imageUrls.length > 0 ? imageUrls[0] : null;
        return (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('BoardContent', {
                        No: item.No,
                        Category: item.Category,
                        user_image: item.user_image,
                    })
                }
                style={styles.BoardView}
            >
                <View style={styles.mainContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={styles.textContainer}>
                            <Text style={styles.TitleStyle} allowFontScaling={false}>
                                {item?.Title}
                            </Text>
                            <Text style={styles.contentStyle} numberOfLines={1}>
                                {item?.Content}
                            </Text>
                            <View style={styles.commentView}>
                                <Image source={{ uri: imageUrl?.comment }} style={styles.iconImage} />
                                <Text style={styles.commnetStyle} allowFontScaling={false}>
                                    {item?.comment_count}
                                </Text>
                                <Text style={styles.commnetStyle}> | {Time(item?.RegDate)}</Text>
                            </View>
                        </View>
                        {firstImageUrls ? (
                            <View style={styles.ImageContainer}>
                                <Image style={styles.ImageStyles} source={{ uri: firstImageUrls }} />
                            </View>
                        ) : null}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {showTopView && <TopContainerComponent onPress={() => navigation.pop()} />}
            <FlatList data={data} renderItem={renderItems} keyExtractor={(item, index) => index.toString()} />
        </View>
    );
};

export default PostComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    BoardView: {
        flex: 1,
        borderBottomWidth: 0.8,
        borderBottomColor: '#B1B6AE',
        paddingHorizontal: '3%',
        paddingVertical: '1%',
    },
    mainContainer: {
        marginLeft: '2%',
        justifyContent: 'center',
        height: 85,
    },
    textContainer: {
        width: '65%',
    },
    TitleStyle: {
        fontSize: 15,
        textAlign: 'left',
        fontWeight: '500',
    },
    contentStyle: {
        fontSize: 12,
        width: 'auto',
        lineHeight: 30,
    },
    commentView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    commnetStyle: {
        fontSize: 11,
        marginLeft: '1%',
    },
    ImageStyles: {
        width: 80,
        height: 80,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#8E8E8E',
        resizeMode: 'cover',
    },
    iconImage: {
        width: 11,
        height: 11,
        resizeMode: 'contain',
    },
});
