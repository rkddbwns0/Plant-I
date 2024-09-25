import React, { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import CustomText from '../Components/CustomComponents/CustomText';
import imageUrls from '../JSONData/imageUrls.json';
import { BottomContainer } from '../Components/BottomContainerComponents/BottomContainerComponent';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ChatbotImageSelectModal from '../Components/ModalComponents/ChatbotImageSelectModal';
import { uploadImage } from '../Components/imageComponents/chatbotImageUpload';
import AlertModal from '../Components/ModalComponents/AlertModal';

const Chatbot = () => {
    const navigation = useNavigation();
    const [modalVisibled, setModalVisibled] = useState(false);
    const [image, setImage] = useState('');
    const [chatbotResult, setChatResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [warnModalVisibled, setWarnModalVisibled] = useState(false);

    const handleImageSelected = async (uri) => {
        setImage(uri);
        setModalVisibled(false);
    };

    const imageResult = async () => {
        if (image === '') {
            setWarnModalVisibled(true);
        } else {
            setLoading(true);
            try {
                const response = await uploadImage(image);
                setChatResult(response);
                setLoading(false);
                navigation.navigate('ChatbotResult', { image: image, result: response });
            } catch (error) {
                console.error(error);
            }
        }
    };

    useFocusEffect(
        useCallback(() => {
            setImage('');
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.topView}>
                <TouchableOpacity style={styles.topBtnStyle} onPress={() => navigation.pop()}>
                    <Image source={{ uri: imageUrls?.left }} style={styles.iconImages} />
                </TouchableOpacity>

                <CustomText bold style={styles.topFont}>
                    챗봇 AI
                </CustomText>
                <View style={{ flex: 1 }} />
            </View>

            <View style={styles.mainView}>
                <View style={styles.fontsView}>
                    <CustomText bold style={styles.mainBoldFont}>
                        상태가 궁금한 식물의 사진을{'\n'}업로드해 주세요.
                    </CustomText>
                    <CustomText style={styles.mainFont}>
                        이제 사진을 업로드하시면{'\n'}식물의 상태를 분석해 드릴 수 있습니다.
                    </CustomText>
                </View>

                <View style={styles.imageContainer}>
                    <TouchableOpacity style={styles.imageBtn} onPress={() => setModalVisibled(true)}>
                        {image ? (
                            <Image source={{ uri: image }} style={styles.imageStyle} />
                        ) : (
                            <>
                                <Image source={{ uri: imageUrls.image }} style={styles.mainIcon} />
                                <CustomText style={styles.imageFont}>
                                    사진을 업로드하여{'\n'}식물의 모습을 담아주세요.
                                </CustomText>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.bottomView}>
                <BottomContainer ButtonText="식물 분석하기" onPress={imageResult} />
            </View>

            <ChatbotImageSelectModal
                visible={modalVisibled}
                onCancel={() => setModalVisibled(false)}
                onCloseRequest={() => setModalVisibled(false)}
                onImageSelected={handleImageSelected}
            />
            {loading && (
                <View style={styles.loadingView}>
                    <ActivityIndicator size="large" color="#3DC373" />
                    <CustomText medium style={styles.loadingText}>
                        분석 중입니다.{'\n'}잠시만 기다려주세요.
                    </CustomText>
                </View>
            )}
            <AlertModal
                visible={warnModalVisibled}
                title="이미지를 등록해 주세요."
                showBtn={true}
                BtnText="확인"
                onPress={() => setWarnModalVisibled(false)}
                onRequestClose={() => setWarnModalVisibled(false)}
            />
        </View>
    );
};

export default Chatbot;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: '3%',
        borderBottomWidth: 2,
        borderBottomColor: '#EDEDED',
    },
    topBtnStyle: {
        flex: 1,
    },
    iconImages: {
        width: 25,
        height: 25,
        marginLeft: '3%',
    },
    topFont: {
        fontSize: 18,
        lineHeight: 25,
    },
    mainView: {
        flex: 1,
        justifyContent: 'center',
        top: '5%',
    },
    fontsView: {
        flex: 1,
        justifyContent: 'center',
    },
    mainBoldFont: {
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 25,
    },
    mainFont: {
        fontSize: 13,
        textAlign: 'center',
        color: '#757575',
        top: '5%',
    },
    imageContainer: {
        flex: 2,
        alignItems: 'center',
    },
    imageBtn: {
        width: '65%',
        height: 250,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
    },
    imageFont: {
        textAlign: 'center',
        color: '#757575',
        fontSize: 13,
        lineHeight: 25,
    },
    mainIcon: {
        width: 30,
        height: 30,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    loadingView: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
    },
});
