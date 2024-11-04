import React, { useCallback, useState } from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Text,
    ScrollView,
    TextInput,
} from 'react-native';
import imageUrls from '../JSONData/imageUrls.json';
import { BottomContainer } from '../Components/BottomContainerComponents/BottomContainerComponent';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ChatbotImageSelectModal from '../Components/ModalComponents/ChatbotImageSelectModal';
import { uploadImage } from '../Components/imageComponents/chatbotImageUpload';
import AlertModal from '../Components/ModalComponents/AlertModal';
import { TopContainerComponent2 } from '../Components/TopContainerComponents/TopContainerComponent';
import axios from 'axios';
import { SERVER_ADDRESS } from '../Components/ServerAddress';

const Chatbot = () => {
    const navigation = useNavigation();
    const [modalVisibled, setModalVisibled] = useState(false);
    const [image, setImage] = useState('');
    const [selectImage, setSelectImage] = useState('');
    const [message, setMessage] = useState('');
    const [selectMessage, setSelectMessage] = useState('');
    const [chatbotResponse, setChatbotResponse] = useState(false);
    const [chatbotResult, setChatResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [warnModalVisibled, setWarnModalVisibled] = useState(false);
    const [selectData, setSelectData] = useState(false);
    const [saveCheck, setSaveCheck] = useState(false);

    const handleImageSelected = async (uri) => {
        setImage(uri);
        setModalVisibled(false);
    };

    const handleSubmit = async () => {
        if (!image || !message) {
            setWarnModalVisibled(true);
            return;
        } else {
            setSelectData(true);
            setSelectImage(image);
            setSelectMessage(message);
            setImage('');
            setMessage('');

            setLoading(true);

            const selectImage = image;
            const selectMessage = message;

            try {
                const response = await uploadImage(selectImage, selectMessage);
                setChatResult(response);
                setChatbotResponse(true);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleInsert = async () => {
        try {
            const response = await axios.post(
                `${SERVER_ADDRESS}/chatbotresultdb/insert`,
                {
                    userMessage: selectMessage,
                    image: selectImage,
                    result: chatbotResult,
                },
                { withCredentials: true }
            );
            setSaveCheck(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <TopContainerComponent2 text="챗봇AI" fontWeight="600" onPress={() => navigation.pop()} />

            <View style={styles.mainView}>
                <ScrollView showsHorizontalScrollIndicator={true} removeClippedSubviews={true}>
                    <View style={styles.resultView}>
                        <View style={styles.chatbot}>
                            <Image source={{ uri: imageUrls.chatbot }} style={styles.chatbotImage} />
                            <Text style={styles.chatbotText} allowFontScaling={false}>
                                인공지능 파릇이
                            </Text>
                        </View>
                        <View style={styles.resultStyle}>
                            <Text style={styles.resultFont}>
                                안녕하세요! 저는 여러분의 식물 건강 도우미 파릇이 입니다.{'\n'}식물의 상태 체크가
                                필요하시면 언제든지 물어보세요.{'\n'}상태 체크를 위해 식물 사진과 상태에 대한 설명을
                                간단하게 작성해 주세요!
                            </Text>
                        </View>
                    </View>
                    {selectData ? (
                        <View style={styles.userTextContainer}>
                            <View style={styles.userTextView}>
                                <Text style={styles.userText}>{selectMessage}</Text>
                            </View>
                            <Image source={{ uri: selectImage }} style={styles.userImage} />
                        </View>
                    ) : null}
                    {loading ? (
                        <View style={styles.resultView}>
                            <View style={styles.chatbot}>
                                <Image source={{ uri: imageUrls.chatbot }} style={styles.chatbotImage} />
                                <Text style={styles.chatbotText} allowFontScaling={false}>
                                    인공지능 파릇이
                                </Text>
                            </View>
                            <View style={styles.resultStyle}>
                                <ActivityIndicator size="small" color="#3DC373" />
                                <Text style={styles.loadingText} allowFontScaling={false}>
                                    분석 중입니다.{'\n'}잠시만 기다려주세요.
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <View>
                            {chatbotResponse ? (
                                <View style={styles.resultView}>
                                    <View style={styles.chatbot}>
                                        <Image source={{ uri: imageUrls.chatbot }} style={styles.chatbotImage} />
                                        <Text style={styles.chatbotText} allowFontScaling={false}>
                                            인공지능 파릇이
                                        </Text>
                                    </View>
                                    <View style={styles.resultStyle}>
                                        <Text style={styles.resultFont} allowFontScaling={false}>
                                            {chatbotResult}
                                            {'\n\n'}결과를 저장하려면 아래의 버튼을 눌러주세요!
                                        </Text>
                                        <TouchableOpacity style={styles.saveBtn} onPress={handleInsert}>
                                            <Text style={styles.saveBtnText}>저장하기</Text>
                                        </TouchableOpacity>
                                        {saveCheck ? (
                                            <View>
                                                <Text style={styles.saveText}>상담 내역이 저장되었습니다✔</Text>
                                            </View>
                                        ) : null}
                                    </View>
                                </View>
                            ) : null}
                        </View>
                    )}
                </ScrollView>
            </View>
            <View>
                {image ? <Image source={{ uri: image }} style={styles.textinputImage} /> : null}
                <View style={styles.inputView}>
                    <TouchableOpacity onPress={() => setModalVisibled(true)}>
                        <Image
                            source={{ uri: imageUrls?.chatbotImage }}
                            style={{ width: 22, height: 22, marginLeft: '2%', resizeMode: 'contain', left: '6%' }}
                        />
                    </TouchableOpacity>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="메시지"
                            placeholderTextColor="#B1B1B1"
                            value={message}
                            onChangeText={setMessage}
                            maxLength={100}
                        />
                        <Text style={styles.countText}>{message.length} / 100</Text>
                    </View>

                    <TouchableOpacity onPress={handleSubmit}>
                        <Image source={{ uri: imageUrls?.submit }} style={styles.iconImage} />
                    </TouchableOpacity>
                </View>
            </View>

            <ChatbotImageSelectModal
                visible={modalVisibled}
                onCancel={() => setModalVisibled(false)}
                onCloseRequest={() => setModalVisibled(false)}
                onImageSelected={handleImageSelected}
            />
            <AlertModal
                visible={warnModalVisibled}
                title="이미지 혹은 증상을 입력해 주세요."
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
    iconImage: {
        width: 28,
        height: 28,
        marginLeft: '3%',
        resizeMode: 'contain',
    },
    mainView: {
        flex: 1,
        justifyContent: 'center',
    },
    resultView: {
        marginBottom: '5%',
        marginTop: '5%',
    },
    chatbot: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '5%',
    },
    chatbotImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    chatbotText: {
        fontSize: 13,
        marginLeft: '2%',
    },
    userTextContainer: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: '5%',
    },
    userTextView: {
        flex: 1,
        backgroundColor: '#EBFCF2',
        width: '70%',
        minHeight: 70,
        maxHeight: 'auto',
        padding: '3%',
        borderRadius: 10,
        justifyContent: 'center',
    },
    userText: {
        fontSize: 13,
        lineHeight: 20,
        color: '#444343',
    },
    userImage: {
        width: 165,
        height: 165,
        borderWidth: 0.5,
        borderColor: '#8E8E8E',
        borderRadius: 10,
        resizeMode: 'cover',
        marginTop: '3%',
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 13,
    },
    resultStyle: {
        width: '72%',
        backgroundColor: '#F5F5F5',
        padding: '3%',
        alignSelf: 'center',
        borderRadius: 10,
    },
    resultFont: {
        fontSize: 13,
        lineHeight: 20,
        color: '#444343',
        textAlign: 'left',
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: 60,
    },
    textInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInputStyle: {
        width: '100%',
        height: 40,
        borderWidth: 0.5,
        borderColor: '#ECECEC',
        borderRadius: 20,
        fontSize: 12,
        paddingLeft: 18,
        paddingRight: 55,
    },
    countText: {
        position: 'absolute',
        right: '5%',
        fontSize: 9,
        color: '#B1B1B1',
    },
    textinputImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#8E8E8E',
        resizeMode: 'cover',
        alignSelf: 'center',
    },
    saveBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3DC373',
        height: 40,
        borderRadius: 10,
        marginTop: '6%',
    },
    saveBtnText: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
    },
    saveText: {
        fontSize: 10,
        color: '#3DC373',
        marginTop: '3%',
        textAlign: 'center',
    },
});
