import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View, StatusBar } from 'react-native';
import CustomText from '../../Components/CustomComponents/CustomText';
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
                    <CustomText bold style={styles.mbtiResultText} allowFontScaling={false}>
                        당신은{'\n'}
                        {mbtiType} 입니다.
                    </CustomText>
                </View>
                <View style={styles.mbtiImageView}>
                    <Image source={{ uri: mbtiResult[0]?.Image }} style={styles.mbtiImage} />
                </View>
                <View style={styles.resultContainer}>
                    <View>
                        <CustomText medium style={styles.textStyles} allowFontScaling={false}>
                            {mbtiResult[0]?.feature}
                        </CustomText>
                    </View>
                    <View>
                        <CustomText medium style={styles.textStyles} allowFontScaling={false}>
                            {mbtiResult[0]?.recommend}
                        </CustomText>
                    </View>
                    <View>
                        <CustomText medium style={styles.textStyles} allowFontScaling={false}>
                            {mbtiType}인 당신에게{'\n'}이런 식물을 추천드려요.
                        </CustomText>
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

                                            <CustomText style={styles.plantText} allowFontScaling={false}>
                                                {item?.Pname}
                                            </CustomText>
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
        justifyContent: 'center',
    },
    plantBtns: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    plantImages: {
        width: '100%',
        height: 100,
    },
    plantText: {
        fontSize: 12,
        lineHeight: 20,
        textAlign: 'center',
    },
});
