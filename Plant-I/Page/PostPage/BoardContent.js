import React, { useEffect, useState, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Image, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AlertModal from '../../Components/ModalComponents/AlertModal';
import PostModal from '../../Components/ModalComponents/PostModal';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import imageUrls from '../../JSONData/imageUrls.json';
import { TopContainerComponent2 } from '../../Components/TopContainerComponents/TopContainerComponent';
import BoardContentComponent from '../../Components/PostComponents/BoradContentComponent';
import CommentComponent from '../../Components/PostComponents/CommentComponent';

const BoardContent = ({ route, navigation }) => {
    const [image, setImage] = useState([]);
    const { No, user_image, Category } = route.params;
    const [checkUser, setCheckUser] = useState(false);
    const [postId, setPostId] = useState('');
    const [DeleteBoardVisibled, setDeleteBoardVisibled] = useState(false);
    const [nullCommentsVisibled, setNullCommentsVisibled] = useState(false);
    const [Comments, setComments] = useState('');
    const [CommentData, setCommentData] = useState([]);
    const [countComment, setCountComment] = useState('');
    const [postVisibled, setPostVisibled] = useState(false);
    const [modalPosition, setModalPosition] = useState({ y: 0, right: 0 });
    const [userPost, setUserPost] = useState([]);

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
        const monthDay = time.slice(5, 10).replace('-', '/');
        const hourMinute = time.slice(11, 16);
        return `${monthDay} ${hourMinute}`;
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
                    const postId = response.data.postId;
                    setUserPost(data);
                    setCheckUser(writerData);
                    setPostId(postId);
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
                    No: No,
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
            No: No,
            Title: userPost[0].title,
            Content: userPost[0].content,
            image: image,
            RegDate: userPost[0].RegDate,
        });
        setPostVisibled(false);
    };

    const SelectComments = () => {
        axios
            .post(`${SERVER_ADDRESS}/Commentdb/select`, { Post_Id: No })
            .then((response) => {
                const data = response.data.result;
                const countData = response.data.countResult;
                setCommentData(data);
                setCountComment(countData);
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
        <KeyboardAvoidingView style={{ flex: 1, flexGrow: 1 }}>
            <View style={styles.container}>
                <TopContainerComponent2 text={Category} onPress={() => navigation.pop()} />

                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }}>
                        <BoardContentComponent
                            checkUser={checkUser}
                            userPost={userPost}
                            image={image}
                            user_image={user_image}
                            countComment={countComment}
                            Time={Time}
                            setModalPosition={setModalPosition}
                            postVisibled={postVisibled}
                            setPostVisibled={setPostVisibled}
                        />

                        <CommentComponent CommentData={CommentData} postId={postId} Time={Time} />
                    </ScrollView>
                </View>

                <View style={styles.TextinputContainer}>
                    <View style={styles.TextinputView}>
                        <TextInput
                            style={styles.TextinputStyle}
                            placeholder="댓글을 입력하세요."
                            value={Comments}
                            onChangeText={setComments}
                            allowFontScaling={false}
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
                    onRequestClose={() => setPostVisibled(false)}
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
        padding: '1%',
        alignItems: 'center',
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
});
