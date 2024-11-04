import React, { useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ScrollView, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import ToggleButton from '../../Components/ToggleButton';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import imageUrls from '../../JSONData/imageUrls.json';
import AlertModal from '../../Components/ModalComponents/AlertModal';

const Search = ({ navigation }) => {
    const [tagResults, setTagResults] = useState([]);
    const [selectTypeTag, setSelectTypeTag] = useState('');
    const [popularPlants, setPopularPlants] = useState([]);
    const [toggleValue, setToggleValue] = useState(0);
    const [modalVisibled, setModalVisibled] = useState(false);

    const handleToggleChange = (value) => {
        setToggleValue(value);
    };

    const chunkedData = [];

    const plantTypeTag = ['선인장', '관엽식물', '허브', '다육이', '난초', '그 외'];

    const selectTagData = () => {
        axios
            .post(`${SERVER_ADDRESS}/plantdb/selectTag`, {
                PlantType: selectTypeTag,
                Children: toggleValue,
            })
            .then((response) => {
                const data = response.data;
                setTagResults(data);
                if (selectTypeTag === '') {
                    setModalVisibled(true);
                } else {
                    navigation.navigate('TagResult', {
                        result: data,
                        plantTypeTag: selectTypeTag,
                        child: toggleValue,
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        const popularPlantsData = () => {
            axios
                .post(`${SERVER_ADDRESS}/userplantdb/popular`)
                .then((response) => {
                    const data = response.data;
                    setPopularPlants(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        };
        popularPlantsData();
    }, []);

    for (let i = 0; i < popularPlants.length; i += 3) {
        chunkedData.push(popularPlants.slice(i, i + 3));
    }

    const handleTypeTagSelect = (tag) => {
        if (selectTypeTag === tag) {
            setSelectTypeTag('');
        } else {
            setSelectTypeTag(tag);
        }
    };

    useFocusEffect(
        useCallback(() => {
            setSelectTypeTag('');
        }, [])
    );

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.topContainer}>
                    <Text style={styles.topFont} allowFontScaling={false}>
                        궁금한 식물을 찾아보세요.
                    </Text>
                </View>
                <View style={styles.searchContainer}>
                    <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('SearchResult')}>
                        <Image source={{ uri: imageUrls?.searchBtn }} style={styles.iconImage} />
                        <Text style={styles.searchBtnText} allowFontScaling={false}>
                            식물 이름을 검색하세요.
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.tagContainer}>
                    <View style={styles.tagView}>
                        <View style={styles.fontView}>
                            <Text
                                style={{ ...styles.fontStyles, marginBottom: '8%', fontWeight: '600' }}
                                allowFontScaling={false}
                            >
                                원하는 식물의 종류가 있으시나요?
                            </Text>
                        </View>
                        <View style={styles.tagItems}>
                            {plantTypeTag.map((tag, index) => (
                                <View key={index} style={styles.tagBtnView}>
                                    <TouchableOpacity
                                        style={[styles.tagBtnStyles, selectTypeTag === tag && styles.tagBtnSelected]}
                                        onPress={() => handleTypeTagSelect(tag)}
                                    >
                                        <Text style={styles.tagFontStyles} allowFontScaling={false}>
                                            {tag}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>

                        <View style={styles.childToggleView}>
                            <View style={styles.fontView}>
                                <Text style={{ ...styles.fontStyles, fontWeight: '600' }} allowFontScaling={false}>
                                    반려동물 또는 아이랑 같이 지내시나요?
                                </Text>
                            </View>
                            <View style={styles.toggleView}>
                                <ToggleButton onToggle={handleToggleChange} />
                            </View>
                        </View>

                        <View style={styles.btnView}>
                            <TouchableOpacity
                                style={styles.btnStyle}
                                onPress={() => {
                                    selectTagData();
                                }}
                            >
                                <Text style={styles.btnFont} allowFontScaling={false}>
                                    검색하기
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.popularView}>
                    <Text style={styles.popularText} allowFontScaling={false}>
                        인기있는 식물
                    </Text>
                    {chunkedData.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.popularPlantStyles}>
                            {row.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.plantBtnStyles}
                                    onPress={() => navigation.navigate('PlantDetail', { Pname: item?.Pname })}
                                >
                                    <Image source={{ uri: item?.Image }} style={styles.plantImages} />
                                    <Text style={styles.plantText} allowFontScaling={false}>
                                        {item?.Pname}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </View>
            </ScrollView>
            <AlertModal
                title="식물 종류를 선택해 주세요."
                visible={modalVisibled}
                showBtn={true}
                onRequestClose={() => setModalVisibled(false)}
                onPress={() => setModalVisibled(false)}
                BtnText="확인"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topContainer: {
        flex: 1,
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED',
        justifyContent: 'center',
    },
    topFont: {
        fontSize: 15,
        marginLeft: '4%',
        fontWeight: '500',
    },
    searchContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: '3%',
        width: '100%',
    },
    searchInput: {
        flex: 1,
        includeFontPadding: false,
        height: 50,
    },
    searchButton: {
        borderRadius: 10,
        backgroundColor: '#F8F8F8',
        width: '95%',
        height: 50,
        marginTop: '5%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    searchBtnText: {
        color: '#757575',
        fontSize: 13,
        marginLeft: '2%',
    },
    resultItem: {
        height: 185,
        marginTop: '3%',
        marginRight: '4%',
        borderRadius: 5,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 160,
        width: '100%',
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 5,
    },
    PnameStyles: {
        alignSelf: 'center',
        fontSize: 12,
    },
    iconImage: {
        width: 25,
        height: 25,
        marginLeft: '3%',
    },
    tagContainer: {
        flex: 1,
        marginTop: '2%',
        width: '95%',
        alignSelf: 'center',
    },
    tagView: {
        flex: 1,
        width: '100%',
        height: 250,
        backgroundColor: '#F8F8F8',
        borderRadius: 8,
        justifyContent: 'center',
    },
    tagItems: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        bottom: '10%',
        alignItems: 'center',
    },
    tagBtnView: {
        width: '28%',
        marginHorizontal: '2.5%',
        marginVertical: '2%',
        justifyContent: 'center',
    },
    tagBtnStyles: {
        backgroundColor: 'white',
        width: '100%',
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#B1B6AE',
    },
    tagFontStyles: {
        fontSize: 13,
    },
    fontView: {
        flex: 1,
        marginTop: '2%',
        marginLeft: '4%',
        marginVertical: '1%',
        justifyContent: 'center',
    },
    fontStyles: {
        fontSize: 12,
        lineHeight: 20,
    },
    childToggleView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '5%',
    },
    toggleView: {
        marginRight: '5%',
    },
    btnView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: '8%',
    },
    btnStyle: {
        backgroundColor: '#3DC373',
        width: '85%',
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnFont: {
        fontSize: 17,
        color: 'white',
        fontWeight: '600',
    },
    tagBtnSelected: {
        borderColor: '#3DC373',
    },
    popularView: {
        flex: 1,
        paddingHorizontal: '3%',
        marginTop: '3%',
    },
    popularText: {
        fontSize: 15,
    },
    popularPlantStyles: {
        flex: 1,
        flexDirection: 'row',
    },
    plantBtnStyles: {
        height: 140,
        marginTop: '2%',
        marginRight: '4%',
        width: '30%',
    },
    plantImages: {
        alignSelf: 'center',
        height: 100,
        width: '100%',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#8E8E8E',
        resizeMode: 'cover',
    },
    plantText: {
        fontSize: 13,
        textAlign: 'center',
        top: '3%',
    },
});

export default Search;
