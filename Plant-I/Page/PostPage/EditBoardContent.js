import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import AlertModal from '../../Components/ModalComponents/AlertModal';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import MultiImagesModal from '../../Components/ModalComponents/multiImagesModal';
import PostContainer from '../../Components/PostComponents/WritePostComponent';

const EditBoardContent = ({ route, navigation }) => {
    const { Id, No, Title, Content, RegDate } = route.params;
    const [image, setImage] = useState(route.params.image);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [updateBoardVisibled, setUpdateBoardVisibled] = useState(false);
    const [imageVisibled, setImageVisibled] = useState(false);

    useEffect(() => {
        setEditTitle(route.params?.Title);
        setEditContent(route.params?.Content);
    }, [route.params?.Title, route.params?.Content]);

    const EditBoard = () => {
        axios
            .post(`${SERVER_ADDRESS}/Postdb/update`, {
                Id: Id,
                No: No,
                Title: editTitle,
                Content: editContent,
                RegDate: RegDate,
                Image: JSON.stringify(image),
            })
            .then((response) => {
                navigation.pop();
                navigation.pop();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleEditBoard = () => {
        EditBoard();
    };

    const handleDeleteImage = (index) => {
        setImage((prevImage) => prevImage.filter((_, i) => i !== index));
    };

    return (
        <View style={{ flex: 1 }}>
            <PostContainer
                RegOnPress={() => setUpdateBoardVisibled(true)}
                Title={editTitle}
                setTitle={setEditTitle}
                Content={editContent}
                setContent={setEditContent}
                image={image}
                ImageVisibled={() => setImageVisibled(true)}
                deleteImageOnPress={handleDeleteImage}
            />

            <AlertModal
                visible={updateBoardVisibled}
                onRequestClose={() => setUpdateBoardVisibled(false)}
                title="작성한 글을 수정할까요?"
                BtnText="수정하기"
                CancelBtnText="아니오"
                onCancel={() => setUpdateBoardVisibled(false)}
                onPress={handleEditBoard}
                showBtn={true}
            />

            <MultiImagesModal
                visible={imageVisibled}
                onCloseRequest={() => setImageVisibled(false)}
                onCancel={() => setImageVisibled(false)}
                onImageSelected={(url) => {
                    setImage((prevImage) => [...prevImage, url]);
                    setImageVisibled(false);
                }}
                Routes="postImageUploads"
            />
        </View>
    );
};

export default EditBoardContent;
