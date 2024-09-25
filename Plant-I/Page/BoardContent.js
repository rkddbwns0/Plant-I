import React, { useContext, useEffect, useState, useCallback, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Image, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome, Ionicons, Entypo } from '@expo/vector-icons';
import CustomText from '../Components/CustomComponents/CustomText';
import axios from 'axios';
import AlertModal from '../Components/ModalComponents/AlertModal';
import CustomInput from '../Components/CustomComponents/CustomInput';
import PostModal from '../Components/ModalComponents/PostModal';
import { SERVER_ADDRESS } from '../Components/ServerAddress';
import imageUrls from '../JSONData/imageUrls.json';

const BoardContent = ({ route, navigation }) => {
    const [image, setImage] = useState([]);
    const { No, user_image, Category } = route.params;
    const [checkUser, setCheckUser] = useState(false);
    const [DeleteBoardVisibled, setDeleteBoardVisibled] = useState(false);
    const [nullCommentsVisibled, setNullCommentsVisibled] = useState(false);
    const [Comments, setComments] = useState('');
    const [CommentData, setCommentData] = useState([]);
    const [postVisibled, setPostVisibled] = useState(false);
    const [commentVisibled, setCommentVisibled] = useState(false);
    const [modalPosition, setModalPosition] = useState({ y: 0, right: 0 });
    const [userId, setUserId] = useState(null);
    const buttonRef = useRef(null);
    const [userPost, setUserPost] = useState([]);

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

    useEffect(() => {
        if (userPost[0]?.Image) {
            try {
                const ParsedImage = JSON.parse(userPost[0]?.Image);
                setImage(ParsedImage.map((item) => item.replace(/\\"/g, '')));
            } catch (error) {
                console.error(error);
            }
        }
    }, [userPost[0]?.Image]);

    const Time = (time) => {
        if (!time) return '';
        return time.slice(0, 16);
    };

    useEffect(() => {
        const userPostData = async () => {
            if (No) {
                try {
                    const response = await axios.post(
                        `${SERVER_ADDRESS}/postdb/select`,
                        { No: No },
                        { withCredentials: true }
                    );
                    const data = response.data.data;
                    const writerData = response.data.writer;
                    setUserPost(data);
                    setCheckUser(writerData);
                    console.log(data);
                    console.log(writerData);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        userPostData();
    }, [No]);

    const DeleteBoard = () => {
        axios
            .post(
                `${SERVER_ADDRESS}/Postdb/delete`,
                {
                    Writer: Writer,
                    Title: Title,
                    Content: Content,
                },
                { withCredentials: true }
            )
            .then((response) => {
                navigation.pop();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleUpdateBoard = () => {
        navigation.navigate('EditBoardContent', {
            Writer: Writer,
            Title: Title,
            Content: Content,
            image: image,
            RegDate: RegDate,
        });
        setPostVisibled(false);
    };

    const SelectComments = () => {
        axios
            .post(`${SERVER_ADDRESS}/Commentdb/select`, { Post_Id: No })
            .then((response) => {
                const data = response.data;
                setCommentData(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const InsertComments = useCallback(() => {
        if (Comments === '') {
            setNullCommentsVisibled(true);
        } else {
            axios
                .post(
                    `${SERVER_ADDRESS}/Commentdb/insert`,
                    {
                        Post_Id: No,
                        Content: Comments,
                    },
                    { withCredentials: true }
                )
                .then((response) => {})
                .catch((error) => {
                    console.error(error);
                });
            setComments('');
        }
    }, [No, Comments]);

    const DeleteComments = useCallback(() => {
        axios
            .post(
                `${SERVER_ADDRESS}/Commentdb/delete`,
                {
                    No: CommentData[0].No,
                },
                { withCredentials: true }
            )
            .then((response) => {})
            .catch((error) => {
                console.error(error);
            });
    });

    useFocusEffect(
        useCallback(() => {
            SelectComments();
        }, [SelectComments])
    );

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.TopContainer}>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'flex-start' }} onPress={() => navigation.pop()}>
                        <Image source={{ uri: imageUrls.left }} style={styles.iconImage} />
                    </TouchableOpacity>

                    <CustomText
                        medium
                        style={{ fontSize: 18, textAlign: 'center', lineHeight: 25 }}
                        allowFontScaling={false}
                    >
                        {Category}
                    </CustomText>
                    <View style={{ flex: 1 }} />
                </View>

                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flexGrow: 1, flex: 1 }}>
                        <View style={styles.WriteContaier}>
                            {checkUser ? (
                                <View style={styles.BtnContainer}>
                                    <TouchableOpacity ref={buttonRef} onPress={togglePostModal}>
                                        <Entypo name="dots-three-vertical" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>
                            ) : null}
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={{ uri: user_image }} style={styles.profileImage} />
                                <View style={styles.WriterView}>
                                    <CustomText
                                        medium
                                        style={{ fontSize: 15, lineHeight: 20 }}
                                        allowFontScaling={false}
                                    >
                                        {userPost[0]?.Writer}
                                    </CustomText>
                                    <CustomText
                                        medium
                                        style={{ color: '#979797', lineHeight: 20, fontSize: 10 }}
                                        allowFontScaling={false}
                                    >
                                        {Time(userPost[0]?.RegDate)}
                                    </CustomText>
                                </View>
                            </View>
                            <View style={styles.TitleView}>
                                <CustomText medium style={{ fontSize: 18, lineHeight: 25 }} allowFontScaling={false}>
                                    {userPost[0]?.Title}
                                </CustomText>
                            </View>
                            <View style={styles.ContentView}>
                                <CustomText style={{ fontSize: 14, lineHeight: 25 }} allowFontScaling={false}>
                                    {userPost[0]?.Content}
                                </CustomText>
                            </View>
                            <ScrollView horizontal={true}>
                                <View style={styles.ImageView}>
                                    {image.map((item, index) => (
                                        <View
                                            key={index}
                                            style={{ flex: 1, marginLeft: 5, marginRight: 5, marginTop: 5 }}
                                        >
                                            <Image
                                                source={{ uri: item }}
                                                style={{ width: 120, height: 120, borderRadius: 5 }}
                                            />
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>

                        <View style={styles.line}></View>

                        <View>
                            {CommentData.map((data, index) => (
                                <View key={index} style={styles.CommentsView}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={{ uri: data?.image }} style={styles.commentProfileImage} />
                                        <View style={styles.commentWriterStyles}>
                                            <CustomText
                                                medium
                                                style={{ fontSize: 13, lineHeight: 20 }}
                                                allowFontScaling={false}
                                            >
                                                {checkUser ? (
                                                    <View>
                                                        <CustomText
                                                            medium
                                                            style={{ color: '#3D8B4A', fontSize: 13, lineHeight: 20 }}
                                                        >
                                                            {data.User} (작성자)
                                                        </CustomText>
                                                    </View>
                                                ) : (
                                                    data.User
                                                )}
                                            </CustomText>
                                            <CustomText
                                                medium
                                                style={{ fontSize: 10, color: '#979797', lineHeight: 18 }}
                                                allowFontScaling={false}
                                            >
                                                {Time(data.RegDate)}
                                            </CustomText>
                                        </View>
                                    </View>
                                    <CustomText style={styles.ContentText} allowFontScaling={false}>
                                        {data.Content}
                                    </CustomText>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.TextinputContainer}>
                    <View style={styles.TextinputView}>
                        <CustomInput
                            style={styles.TextinputStyle}
                            placeholder="댓글을 입력하세요."
                            value={Comments}
                            onChangeText={setComments}
                        />
                        <TouchableOpacity style={styles.regBtnStyle} onPress={InsertComments}>
                            <Image source={{ uri: imageUrls.submit }} style={styles.iconImage} />
                        </TouchableOpacity>
                    </View>
                </View>

                <AlertModal
                    visible={DeleteBoardVisibled}
                    onRequestClose={() => setDeleteBoardVisibled(false)}
                    title="작성한 글을 삭제할까요?"
                    CancelBtnText="아니오"
                    BtnText="삭제하기"
                    onPress={DeleteBoard}
                    onCancel={() => setDeleteBoardVisibled(false)}
                    showBtn={true}
                />
                <AlertModal
                    visible={nullCommentsVisibled}
                    onRequestClose={() => setNullCommentsVisibled(false)}
                    title="댓글을 입력해 주세요."
                    BtnText="확인"
                    onPress={() => setNullCommentsVisibled(false)}
                    showBtn={true}
                />
                <PostModal
                    visible={postVisibled}
                    position={modalPosition}
                    onEditPress={handleUpdateBoard}
                    onDeletePress={() => setDeleteBoardVisibled(true)}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

export default BoardContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    TopContainer: {
        flexDirection: 'row',
        padding: '3%',
        alignItems: 'center',
    },
    WriteContaier: {
        backgroundColor: 'white',
        height: 'auto',
        margin: '3%',
        padding: '3%',
    },
    WriterView: {
        padding: '2%',
    },
    TitleView: {
        margin: '1%',
    },
    ContentView: {
        padding: '2%',
    },
    line: {
        borderBottomWidth: 2,
        borderBottomColor: '#EDEDED',
        marginTop: '1%',
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
    TextinputContainer: {
        alignItems: 'center',
        padding: '2%',
    },
    TextinputView: {
        flexDirection: 'row',
        borderRadius: 15,
        height: 50,
        width: '98%',
        includeFontPadding: false,
        justifyContent: 'space-between',
        backgroundColor: '#F4F6F7',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    TextinputStyle: {
        flex: 1,
        height: '100%',
        padding: 10,
    },
    regBtnStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '3%',
    },
    CommentsView: {
        padding: '2.5%',
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#B1B6AE',
    },
    ContentText: {
        marginLeft: '1%',
        fontSize: 14,
        lineHeight: 25,
        margin: '1%',
    },
    ImageView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 30,
    },
    commentProfileImage: {
        width: 30,
        height: 30,
        borderRadius: 30,
    },
    commentWriterStyles: {
        flex: 1,
        marginLeft: '3%',
    },
});
