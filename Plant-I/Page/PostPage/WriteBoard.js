import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import AlertModal from '../../Components/ModalComponents/AlertModal';
import MultiImagesModal from '../../Components/ModalComponents/multiImagesModal';
import PostContainer from '../../Components/PostComponents/WritePostComponent';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';

const WriteBoard = ({ navigation, route }) => {
    const [userData, setUserData] = useState([]);
    const [Title, setTitle] = useState('');
    const [Content, setContent] = useState('');
    const [imageVisibled, setImageVisibled] = useState(false);
    const [SuccessVisibled, setSuccessVisibled] = useState(false);
    const [NullVisibled, setNullVisibled] = useState(false);
    const [image, setImage] = useState([]);
    const { selectedCategory } = route.params;

    useEffect(() => {
        const SelectUser = () => {
            axios
                .post(`${SERVER_ADDRESS}/userdb/userId`, {}, { withCredentials: true })
                .then((response) => {
                    const data = response.data;
                    setUserData(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        SelectUser();
    }, []);

    const InsertBoard = async () => {
        if (Title === '' || Content === '') {
            setNullVisibled(true);
            return;
        }

        try {
            const response = await axios.post(
                `${SERVER_ADDRESS}/Postdb/insert`,
                {
                    Title: Title,
                    Content: Content,
                    Category: selectedCategory,
                    Image: JSON.stringify(image),
                },
                { withCredentials: true }
            );
            setSuccessVisibled(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteImage = (index) => {
        setImage((prevImage) => prevImage.filter((_, i) => i !== index));
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} enabled>
            <PostContainer
                RegOnPress={InsertBoard}
                Title={Title}
                setTitle={setTitle}
                Content={Content}
                setContent={setContent}
                image={image}
                ImageVisibled={() => setImageVisibled(true)}
                deleteImageOnPress={handleDeleteImage}
            />
            <AlertModal
                visible={SuccessVisibled}
                onRequestClose={() => setSuccessVisibled(false)}
                showBtn={true}
                title="글이 작성되었습니다."
                BtnText="확인"
                onPress={() => {
                    setSuccessVisibled(false);
                    navigation.pop();
                }}
            />
            <AlertModal
                visible={NullVisibled}
                onRequestClose={() => setNullVisibled(false)}
                showBtn={true}
                title="제목 혹은 내용을 작성해 주세요."
                BtnText="확인"
                onPress={() => setNullVisibled(false)}
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
        </KeyboardAvoidingView>
    );
};

export default WriteBoard;
