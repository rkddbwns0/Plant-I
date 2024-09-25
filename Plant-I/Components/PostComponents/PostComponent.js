import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import CustomText from '../CustomComponents/CustomText';
import { TopContainerComponent } from '../TopContainerComponents/TopContainerComponent';
import imageUrl from '../../JSONData/imageUrls.json';
import { useNavigation } from '@react-navigation/native';

const PostComponent = ({ data, showTopView, showCategory }) => {
    const navigation = useNavigation();

    const Time = (time) => {
        return time.slice(0, 16);
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
            >
                <View style={styles.BoardView}>
                    <View>
                        <View style={styles.profileView}>
                            <Image source={{ uri: item?.user_image }} style={styles.profileStyle} />
                            <View style={{ justifyContent: 'center', marginLeft: '8%' }}>
                                <CustomText medium style={styles.WriterStyle} allowFontScaling={false}>
                                    {item?.Writer}
                                </CustomText>
                                <CustomText style={styles.RegDateStyle} allowFontScaling={false}>
                                    {Time(item?.RegDate)}
                                </CustomText>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <CustomText medium style={styles.TitleStyle} allowFontScaling={false}>
                                {item?.Title}
                            </CustomText>
                        </View>
                        <View style={styles.commentView}>
                            <Image source={{ uri: imageUrl?.comment }} style={styles.iconImage} />
                            <CustomText style={styles.commnetStyle} allowFontScaling={false}>
                                {item?.comment_count}
                            </CustomText>
                        </View>
                    </View>

                    {firstImageUrls && (
                        <View style={styles.ImageContainer}>
                            <Image style={styles.ImageStyles} source={{ uri: firstImageUrls }} />
                        </View>
                    )}
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
        flexDirection: 'row',
        borderBottomWidth: 0.8,
        borderBottomColor: '#B1B6AE',
        paddingHorizontal: '3%',
        paddingVertical: '2%',
    },
    categoryText: {
        lineHeight: 20,
        marginLeft: '3%',
    },
    profileView: {
        flexDirection: 'row',
        marginTop: '2%',
    },
    profileStyle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        resizeMode: 'contain',
    },
    WriterStyle: {
        fontSize: 14,
        lineHeight: 23,
    },
    RegDateStyle: {
        fontSize: 10,
        color: '#757575',
        lineHeight: 15,
    },
    TitleStyle: {
        fontSize: 15,
        padding: '1%',
        lineHeight: 22,
        marginTop: '7%',
        left: '3%',
    },
    commentView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '2%',
        marginTop: '3%',
    },
    commnetStyle: {
        fontSize: 12,
        color: '#3DC373',
        marginLeft: '2%',
        lineHeight: 15,
    },
    ImageContainer: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: '3%',
        justifyContent: 'center',
    },
    ImageStyles: {
        width: 100,
        height: 100,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#8E8E8E',
    },
    iconImage: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
    },
});
