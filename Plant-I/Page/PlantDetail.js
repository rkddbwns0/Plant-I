import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList, Text } from 'react-native';
import CustomStausBar from '../Components//CustomComponents/CustomStatusBar';
import axios from 'axios';
import { SERVER_ADDRESS } from '../Components/ServerAddress';
import { useNavigation } from '@react-navigation/native';
import imageUrls from '../JSONData/imageUrls.json';

const PlantDetail = ({ route }) => {
    const navigation = useNavigation();
    const { Pname } = route.params;
    const [plantDetail, setPlantDetail] = useState([]);
    const [plantRecommend, setPlantRecommend] = useState([]);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const fetchPlantDetail = async () => {
            try {
                const response = await axios.get(`${SERVER_ADDRESS}/plantdb/plantInfo`, {
                    params: {
                        Pname: Pname,
                    },
                });
                const data = response.data;
                setPlantDetail(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPlantDetail();
    }, [Pname]);

    useEffect(() => {
        const PlantRecommend = () => {
            axios
                .post(`${SERVER_ADDRESS}/plantdb/PlantRecommend`)
                .then((response) => {
                    const data = response.data;
                    setPlantRecommend(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        };
        PlantRecommend();
    }, []);

    useEffect(() => {}, [plantDetail]);

    const insertLike = () => {
        axios
            .post(
                `${SERVER_ADDRESS}/userfavoritedb/like`,
                {
                    Pname: plantDetail[0].Pname,
                },
                { withCredentials: true }
            )
            .then((response) => {
                setIsLiked(true);
            })
            .catch((error) => {
                console.log(error, '즐겨찾기 활성화 에러');
            });
    };

    const deleteLike = () => {
        axios
            .post(
                `${SERVER_ADDRESS}/userfavoritedb/unlike`,
                {
                    Pname: plantDetail[0].Pname,
                },
                { withCredentials: true }
            )
            .then((response) => {
                setIsLiked(false);
            })
            .catch((error) => {
                console.log(error, '즐겨찾기 비활성화 에러');
            });
    };

    useEffect(() => {
        const checkLike = () => {
            axios
                .post(
                    `${SERVER_ADDRESS}/userfavoritedb/checkLike`,
                    {
                        Pname: Pname,
                    },
                    { withCredentials: true }
                )
                .then((response) => {
                    const data = response.data;
                    if (data.length > 0) {
                        setIsLiked(true);
                    } else {
                        setIsLiked(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        checkLike();
    }, []);

    const renderItems = ({ item, index }) => {
        return (
            <View style={styles.RecommendContainer}>
                <TouchableOpacity
                    style={styles.RecommendView}
                    onPress={() => {
                        {
                            navigation.push('PlantDetail', { Pname: item?.Pname });
                        }
                    }}
                >
                    {item.Image && <Image style={styles.RecommendImageStyles} source={{ uri: item?.Image }} />}
                    <Text
                        style={{ fontSize: 11, fontWeight: '500', top: '3%' }}
                        allowFontScaling={false}
                        numberOfLines={2}
                    >
                        {item?.Pname}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <CustomStausBar translucent={false} />
            <ScrollView contentContainerStyle={styles.Scrollcontainer}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    {plantDetail[0]?.Image && (
                        <Image
                            style={{
                                width: '100%',
                                height: 350,
                                resizeMode: 'cover',
                            }}
                            source={{ uri: plantDetail[0]?.Image }}
                        />
                    )}
                    <View style={styles.TopBtnContainer}>
                        <View>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Image
                                    source={{ uri: imageUrls?.left }}
                                    style={{ ...styles.iconImages, marginLeft: '1%' }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.NnameView}>
                    <View style={styles.NameinfoContainer}>
                        <Text
                            style={{
                                fontSize: 18,
                                lineHeight: 25,
                                fontWeight: '600',
                            }}
                            allowFontScaling={false}
                            numberOfLines={2}
                        >
                            {plantDetail[0]?.Pname}
                        </Text>
                    </View>
                    <View style={styles.heart}>
                        <TouchableOpacity onPress={isLiked ? deleteLike : insertLike} style={styles.heartBtn}>
                            {isLiked ? (
                                <Image source={{ uri: imageUrls?.like_heart }} style={styles.heartIcon} />
                            ) : (
                                <Image source={{ uri: imageUrls?.heart }} style={styles.heartIcon} />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <View style={{ flex: 1, margin: '2%' }}>
                        <Text style={{ fontSize: 18, lineHeight: 25, fontWeight: '500' }} allowFontScaling={false}>
                            식물 소개
                        </Text>
                        <Text style={styles.characterText} allowFontScaling={false}>
                            {plantDetail[0]?.PlantCharacter}
                        </Text>
                    </View>

                    <View style={styles.PlantInfoView}>
                        <View style={styles.infoView}>
                            <Image source={{ uri: imageUrls.flower }} style={styles.iconImages} />
                            <Text style={styles.TextDes} allowFontScaling={false}>
                                {plantDetail[0]?.PlantType}
                            </Text>
                        </View>

                        <View style={styles.infoView}>
                            <Image source={{ uri: imageUrls.light }} style={styles.iconImages} />
                            <Text style={styles.TextDes} allowFontScaling={false}>
                                {plantDetail[0]?.Sunshine}
                            </Text>
                        </View>

                        <View style={styles.infoView}>
                            <Image source={{ uri: imageUrls.humidity }} style={styles.iconImages} />
                            <Text style={styles.TextDes} allowFontScaling={false}>
                                {plantDetail[0]?.Humidity}%
                            </Text>
                        </View>
                        <View style={styles.infoView}>
                            <Image source={{ uri: imageUrls.temp }} style={{ ...styles.iconImages, left: 3 }} />
                            <Text style={styles.TextDes} allowFontScaling={false}>
                                {plantDetail[0]?.Temperature}
                            </Text>
                        </View>
                        <View style={styles.infoView}>
                            <Image source={{ uri: imageUrls.water }} style={{ ...styles.iconImages, left: 2 }} />
                            <Text style={styles.TextDes} allowFontScaling={false}>
                                {plantDetail[0]?.Water_Period}
                            </Text>
                        </View>
                        {plantDetail[0]?.Floriography && (
                            <View style={styles.infoView}>
                                <Image
                                    source={{ uri: imageUrls.florography }}
                                    style={{ width: 18, height: 18, marginLeft: '1.5%' }}
                                />
                                <Text style={styles.TextDes} allowFontScaling={false}>
                                    {plantDetail[0]?.Floriography}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                <View style={styles.RecommendListContainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 15, fontWeight: '500', left: '2%' }} allowFontScaling={false}>
                            다른 식물도 있어요.
                        </Text>
                    </View>
                    <FlatList
                        data={plantRecommend}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItems}
                        horizontal={true}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    TopBtnContainer: {
        position: 'absolute',
        top: '4%',
        left: '2%',
        width: '100%',
        zIndex: 1,
    },
    Scrollcontainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    NnameView: {
        flex: 1,
        width: '100%',
        marginTop: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    NameinfoContainer: {
        marginLeft: '4%',
        width: '60%',
    },
    heart: {
        width: '30%',
    },
    heartBtn: {
        backgroundColor: '#F8F8F8',
        width: '80%',
        height: 60,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    characterText: {
        fontSize: 13,
        lineHeight: 20,
        marginTop: '3%',
    },
    infoContainer: {
        flex: 1,
        marginBottom: '2%',
        width: '100%',
        justifyContent: 'center',
        borderRadius: 15,
    },
    PlantInfoView: {
        alignSelf: 'center',
        flex: 1,
        width: '95%',
        borderWidth: 0.5,
        borderRadius: 5,
        padding: '2%',
        backgroundColor: '#F8F8F8',
        borderColor: '#F8F8F8',
        marginTop: '3%',
    },
    infoView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    TextDes: {
        marginLeft: '3%',
        lineHeight: 40,
    },
    RecommendListContainer: {
        flex: 1,
        marginTop: '3%',
    },
    RecommendContainer: {
        flex: 1,
        marginTop: '4%',
        top: '5%',
    },
    RecommendView: {
        width: 130,
        height: 130,
        alignItems: 'center',
        marginRight: 8,
        marginLeft: 8,
    },
    RecommendImageStyles: {
        width: '100%',
        height: '100%',
        borderWidth: 0.5,
        borderColor: '#757575',
        resizeMode: 'contain',
    },
    iconImages: {
        width: 25,
        height: 25,
    },
    heartIcon: {
        width: 30,
        height: 30,
    },
});

export default PlantDetail;
