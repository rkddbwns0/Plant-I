import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Image, Text, Dimensions } from 'react-native';
import imageUrls from '../../JSONData/imageUrls.json';

const BoardContentComponent = ({
    userPost,
    checkUser,
    image,
    user_image,
    countComment,
    Time,
    setModalPosition,
    setPostVisibled,
    postVisibled,
}) => {
    const buttonRef = useRef(null);

    const togglePostModal = () => {
        if (postVisibled) {
            setPostVisibled(false);
        } else {
            buttonRef.current.measure((fx, fy, width, height, px, py) => {
                const screenWidth = Dimensions.get('window').width;
                setModalPosition({ y: py + height, right: screenWidth - px + 135 });
                setPostVisibled(true);
            });
        }
    };
    return (
        <View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#EDEDED' }}>
                <View style={styles.WriteContaier}>
                    {checkUser ? (
                        <View style={styles.BtnContainer}>
                            <TouchableOpacity ref={buttonRef} onPress={togglePostModal}>
                                <Image source={{ uri: imageUrls?.vertical }} style={{ width: 15, height: 15 }} />
                            </TouchableOpacity>
                        </View>
                    ) : null}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: user_image }} style={styles.profileImage} />
                        <View style={styles.WriterView}>
                            <Text style={{ fontSize: 15, lineHeight: 20, fontWeight: '500' }} allowFontScaling={false}>
                                {userPost[0]?.Writer}
                            </Text>
                            <Text style={{ color: '#757575', lineHeight: 15, fontSize: 9 }} allowFontScaling={false}>
                                {Time(userPost[0]?.RegDate)}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.TitleView}>
                        <Text style={{ fontSize: 18, lineHeight: 25, fontWeight: '500' }} allowFontScaling={false}>
                            {userPost[0]?.title}
                        </Text>
                    </View>
                    <View style={styles.ContentView}>
                        <Text style={{ fontSize: 14, lineHeight: 25 }} allowFontScaling={false}>
                            {userPost[0]?.content}
                        </Text>
                    </View>
                    <ScrollView horizontal={true}>
                        <View style={styles.ImageView}>
                            {image.map((item, index) => (
                                <View key={index} style={{ flex: 1, marginLeft: 5, marginRight: 5, marginTop: 5 }}>
                                    <Image
                                        source={{ uri: item }}
                                        style={{
                                            width: 330,
                                            height: 250,
                                            borderRadius: 5,
                                            resizeMode: 'cover',
                                            borderWidth: 1,
                                            borderColor: '#D8D8D8',
                                        }}
                                    />
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                    <View style={styles.countComment}>
                        <Image source={{ uri: imageUrls?.comment }} style={styles.commentIcon} />
                        <Text style={styles.countText}>{countComment}</Text>
                    </View>
                </View>
            </View>

            <Text style={{ fontSize: 14, lineHeight: 40, marginLeft: '3%' }}>답글</Text>

            <View style={styles.line}></View>
        </View>
    );
};

export default BoardContentComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    TopContainer: {
        flexDirection: 'row',
        padding: '1%',
        alignItems: 'center',
    },
    WriteContaier: {
        padding: '2%',
        marginLeft: '2%',
    },
    WriterView: {
        marginLeft: '2%',
    },
    TitleView: {
        margin: '1%',
    },
    ContentView: {
        padding: '1%',
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED',
        width: '100%',
        alignSelf: 'center',
    },
    BtnContainer: {
        position: 'absolute',
        flexDirection: 'row',
        top: 10,
        right: -8,
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginHorizontal: 15,
    },
    BtnStyles: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    FontStyles: {
        fontSize: 12,
        lineHeight: 18,
    },
    iconImage: {
        width: 25,
        height: 25,
    },
    ContentText: {
        marginLeft: '2%',
        fontSize: 14,
        lineHeight: 20,
        width: '85%',
        height: 'auto',
    },
    ImageView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D8D8D8',
        resizeMode: 'cover',
    },
    commentProfileImage: {
        width: 35,
        height: 35,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D8D8D8',
        resizeMode: 'cover',
        marginLeft: '2%',
    },
    commentWriterStyles: {
        flex: 1,
        marginLeft: '3%',
    },
    countComment: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '3%',
        marginLeft: '1%',
    },
    countText: {
        fontSize: 13,
        marginLeft: '1%',
    },
    commentIcon: {
        width: 11,
        height: 11,
        resizeMode: 'contain',
    },
});
