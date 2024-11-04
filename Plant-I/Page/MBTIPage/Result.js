import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View, StatusBar, Text } from 'react-native';
import imageUrls from '../../JSONData/imageUrls.json';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Result = ({ route }) => {
    const navigation = useNavigation();
    const { selectAnswers, resultMbti } = route.params;
    const [resultData, setResultData] = useState([]);
    const [mbtiType, setMbtiType] = useState('');
    const [mbtiResult, setMbtiResult] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const result = () => {
            axios
                .post(`${SERVER_ADDRESS}/plantdb/Result`, {
                    purpose: selectAnswers.answer1,
                    Child: selectAnswers.answer2,
                    MBTI: resultMbti,
                })
                .then((response) => {
                    const data = response.data.data;
                    const mbtiData = response.data.resultType;
                    const mbtiResult = response.data.mbtiResult;
                    setResultData(data);
                    setMbtiType(mbtiData);
                    setMbtiResult(mbtiResult);
                })
                .catch((error) => {
                    console.error(error);
                });
        };
        result();
    }, []);

    useEffect(() => {
        const updateMBTI = async () => {
            try {
                const response = await axios.post(
                    `${SERVER_ADDRESS}/userdb/updateMBTI`,
                    { Ptype: mbtiType },
                    { withCredentials: true }
                );
            } catch (error) {
                console.error(error);
            }
        };
        updateMBTI();
    }, [mbtiType]);

    useEffect(() => {
        const userNname = async () => {
            try {
                const response = await axios.post(`${SERVER_ADDRESS}/userdb/select`, {}, { withCredentials: true });
                setUserData(response.data[0].Nname);
            } catch (error) {
                console.error(error);
            }
        };
        userNname();
    }, []);

    const mbtiBackgroundColor = (mbtiType) => {
        switch (mbtiType) {
            case '활기찬 해바라기형':
                return '#FEFFDE';
            case '튼튼한 선인장형':
                return '#FFFACF';
            case '차분한 이끼형':
                return '#DEF4ED';
            case '신비로운 다육형':
                return '#D6F4D8';
        }
    };

    useEffect(() => {
        mbtiBackgroundColor();
        console.log(resultMbti);
    });

    const rows = [];
    for (let i = 0; i < resultData.length; i += 3) {
        rows.push(resultData.slice(i, i + 3));
    }

    return (
        <View style={[styles.container, { backgroundColor: mbtiBackgroundColor(mbtiType) }]}>
            {mbtiType && <StatusBar backgroundColor={mbtiBackgroundColor(mbtiType)} />}

            <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={{ paddingBottom: 50 }}>
                <View style={styles.topView}>
                    <TouchableOpacity style={styles.topBtnStyle} onPress={() => navigation.navigate('Home')}>
                        <Image source={{ uri: imageUrls?.cancel }} style={styles.topIconImage} />
                    </TouchableOpacity>
                </View>
                <View style={styles.mbtiResultView}>
                    <Text style={styles.mbtiResultText} allowFontScaling={false}>
                        {userData}님은
                        {'\n'}
                        {mbtiType} 입니다.
                    </Text>
                </View>
                <View style={styles.mbtiImageView}>
                    <Image source={{ uri: mbtiResult[0]?.Image }} style={styles.mbtiImage} />
                </View>
                <View style={styles.resultContainer}>
                    <View>
                        <Text style={styles.textStyles} allowFontScaling={false}>
                            {mbtiResult[0]?.feature}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.textStyles} allowFontScaling={false}>
                            {mbtiResult[0]?.recommend}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.textStyles} allowFontScaling={false}>
                            {mbtiType}인 당신에게{'\n'}이런 식물을 추천드려요.
                        </Text>
                    </View>
                    <View style={styles.resultView}>
                        {rows.map((row, rowIndex) => (
                            <View key={rowIndex} style={styles.rowView}>
                                {row.map((item, index) => (
                                    <View key={index} style={styles.itemView}>
                                        <TouchableOpacity
                                            style={styles.plantBtns}
                                            onPress={() => navigation.navigate('PlantDetail', { Pname: item.Pname })}
                                        >
                                            {item.Image && (
                                                <Image source={{ uri: item?.Image }} style={styles.plantImages} />
                                            )}

                                            <Text style={styles.plantText} allowFontScaling={false}>
                                                {item?.Pname}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Result;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topView: {
        alignItems: 'flex-end',
    },
    topBtnStyle: {
        marginTop: '1%',
        marginRight: '2%',
    },
    topIconImage: {
        width: 45,
        height: 45,
    },
    mbtiResultView: {
        justifyContent: 'center',
        marginTop: '5%',
    },
    mbtiResultText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '500',
    },
    mbtiImageView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%',
    },
    mbtiImage: {
        width: '90%',
        height: 380,
        borderRadius: 20,
    },
    resultContainer: {
        backgroundColor: 'white',
        width: '85%',
        borderWidth: 0.5,
        borderColor: '#757575',
        borderRadius: 20,
        alignSelf: 'center',
        padding: '8%',
        marginTop: '10%',
    },
    textStyles: {
        textAlign: 'center',
        marginVertical: '2%',
        fontWeight: '500',
    },
    resultView: {
        flex: 1,
        height: 300,
    },
    rowView: {
        flexDirection: 'row',
        marginTop: '8%',
        justifyContent: 'center',
    },
    itemView: {
        marginHorizontal: 5,
        width: '35%',
    },
    plantBtns: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    plantImages: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
    },
    plantText: {
        fontSize: 12,
        textAlign: 'center',
    },
});
