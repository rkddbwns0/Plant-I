import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const CommentComponent = ({ CommentData, postId, Time }) => {
    return (
        <View>
            {CommentData.map((data, index) => (
                <View key={index} style={styles.CommentsView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: data?.image }} style={styles.commentProfileImage} />
                        <View style={styles.commentWriterStyles}>
                            {data.User_Id === postId ? (
                                <View>
                                    <Text
                                        style={{
                                            color: '#00913B',
                                            fontSize: 13,
                                            lineHeight: 20,
                                            fontWeight: '500',
                                        }}
                                        allowFontScaling={false}
                                    >
                                        {data.User} (작성자)
                                    </Text>
                                    <Text
                                        style={{ fontSize: 9, color: '#00913B', lineHeight: 15 }}
                                        allowFontScaling={false}
                                    >
                                        {Time(data.RegDate)}
                                    </Text>
                                </View>
                            ) : (
                                <View>
                                    <Text>{data.User}</Text>
                                    <Text
                                        style={{ fontSize: 9, color: '#757575', lineHeight: 15 }}
                                        allowFontScaling={false}
                                    >
                                        {Time(data.RegDate)}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.ContentText} allowFontScaling={false}>
                            {data.Content}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

export default CommentComponent;

const styles = StyleSheet.create({
    CommentsView: {
        justifyContent: 'center',
        padding: '2%',
        minHeight: 90,
        maxHeight: 'auto',
        borderBottomWidth: 0.5,
        borderBottomColor: '#EDEDED',
        margin: 1,
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
});
