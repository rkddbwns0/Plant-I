import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, ScrollView, Image, Text } from 'react-native';
import imageUrls from '../JSONData/imageUrls.json';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { SERVER_ADDRESS } from '../Components/ServerAddress';

const Favorite = () => {
    const [favoritePlants, setFavoritePlants] = useState([]);
    const navigation = useNavigation();
    const [isEditing, setIsEditing] = useState(false);
    const [selectedType, setSelectedType] = useState('전체');
    const [selectData, setSelectData] = useState(null);

    const userFavoritePlants = () => {
        axios
            .post(`${SERVER_ADDRESS}/userfavoritedb/select`, {}, { withCredentials: true })
            .then((response) => {
                const data = response.data;
                setFavoritePlants(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const deleteFavoritePlant = () => {
        axios
            .post(
                `${SERVER_ADDRESS}/userfavoritedb/unlike`,
                {
                    Pname: selectData,
                },
                { withCredentials: true }
            )
            .then((response) => {
                setFavoritePlants((prevFavoritePlants) =>
                    prevFavoritePlants.filter((item) => item.Pname !== selectData)
                );
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleTypeSelect = async (type) => {
        setSelectedType(type);
        fetchLikedPlantsByType(type);
    };

    const fetchLikedPlantsByType = async (type) => {
        try {
            const response = await axios.post(
                `${SERVER_ADDRESS}/userfavoritedb/liked?type=${type}`,
                {},
                { withCredentials: true }
            );
            const data = response.data.map((item) => item);
            setFavoritePlants(data);
        } catch (error) {
            console.error(error);
        }
    };

    const selectPlant = (selected) => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            if (selectData === selected) {
                setSelectData(null);
            }
        } else {
            setIsEditing(false);
        }
    };

    const cancelEditing = () => {
        setSelectData(null);
        setIsEditing(false);
    };

    useFocusEffect(
        useCallback(() => {
            setSelectedType('전체');
            userFavoritePlants();
        }, [])
    );

    const renderItem = ({ item }) => {
        const isSelected = selectData === item.Pname;

        return (
            <TouchableOpacity
                style={[
                    styles.resultItem,
                    isSelected ? { backgroundColor: '#F4F6F7', borderRadius: 5, padding: 5 } : null,
                    { width: item.Image ? '30%' : '30%' },
                ]}
                onPress={() => {
                    if (isEditing) {
                        setSelectData(item.Pname);
                    } else {
                        navigation.navigate('PlantDetail', {
                            Pname: item.Pname,
                        });
                    }
                }}
            >
                <Image source={{ uri: item?.Image }} style={styles.imageContainer} />
                <Image
                    source={{ uri: imageUrls?.like_heart }}
                    style={{
                        width: 23,
                        height: 23,
                        alignSelf: 'flex-end',
                        right: '3%',
                        bottom: '18%',
                        zIndex: 30,
                    }}
                />
                <Text style={styles.PnameStyles} numberOfLines={3}>
                    {item.Pname}
                </Text>
            </TouchableOpacity>
        );
    };

    const getButtonStyle = (type) => {
        return {
            borderBottomColor: selectedType === type ? '#3DC373' : '#DFDFDF',
            borderBottomWidth: selectedType === type ? 2 : null,
            width: 'auto',
            alignItems: 'center',
            height: 25,
            margin: 8,
            flex: 1,
        };
    };

    const getButtonTextStyle = (type) => {
        return {
            color: selectedType === type ? '#3DC373' : '#000000',
        };
    };

    return (
        <View style={styles.container}>
            <View style={{ height: 55 }}>
                <ScrollView
                    horizontal={true}
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.scrollContentContainer}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={{
                                ...getButtonStyle('전체'),
                            }}
                            onPress={() => handleTypeSelect('전체')}
                        >
                            <Text style={getButtonTextStyle('전체')} allowFontScaling={false}>
                                전체
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={getButtonStyle('허브')} onPress={() => handleTypeSelect('허브')}>
                            <Text style={{ ...getButtonTextStyle('허브'), fontWeight: '500' }} allowFontScaling={false}>
                                허브
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={getButtonStyle('다육이')} onPress={() => handleTypeSelect('다육이')}>
                            <Text
                                style={{ ...getButtonTextStyle('다육이'), fontWeight: '500' }}
                                allowFontScaling={false}
                            >
                                다육이
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={getButtonStyle('선인장')} onPress={() => handleTypeSelect('선인장')}>
                            <Text
                                style={{ ...getButtonTextStyle('선인장'), fontWeight: '500' }}
                                allowFontScaling={false}
                            >
                                선인장
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={getButtonStyle('관엽식물')}
                            onPress={() => handleTypeSelect('관엽식물')}
                        >
                            <Text
                                style={{ ...getButtonTextStyle('관엽식물'), fontWeight: '500' }}
                                allowFontScaling={false}
                            >
                                관엽식물
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={getButtonStyle('그 외')} onPress={() => handleTypeSelect('그 외')}>
                            <Text
                                style={{ ...getButtonTextStyle('그 외'), fontWeight: '500' }}
                                allowFontScaling={false}
                            >
                                그 외
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

            <View style={styles.EditbtnContainer}>
                <TouchableOpacity style={styles.fontStyle} onPress={isEditing ? cancelEditing : selectPlant}>
                    <Text style={styles.fontStyle} allowFontScaling={false}>
                        {isEditing ? '취소' : '편집'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, marginBottom: '3%' }}>
                <FlatList
                    data={favoritePlants}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    numColumns={3}
                />
            </View>

            {isEditing && (
                <View style={styles.editingButtonsContainer}>
                    <View style={styles.editingButtonsViewStyle}>
                        <TouchableOpacity style={[styles.cancelButton, styles.editingButton]} onPress={cancelEditing}>
                            <Text allowFontScaling={false}>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.deleteButton, styles.editingButton]}
                            onPress={deleteFavoritePlant}
                        >
                            <Text style={{ color: 'white' }} allowFontScaling={false}>
                                삭제
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
    },
    scrollContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnContainer: {
        flexDirection: 'row',
        marginTop: '3%',
        padding: '2%',
    },
    EditbtnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: '1%',
        marginRight: '4%',
        height: 23,
    },
    resultItem: {
        height: 150,
        marginTop: '10%',
        marginLeft: '2%',
    },
    imageContainer: {
        alignSelf: 'center',
        height: 110,
        width: '100%',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#8E8E8E',
        resizeMode: 'cover',
    },
    PnameStyles: {
        textAlign: 'center',
        fontSize: 13,
        bottom: '15%',
    },
    editingButtonsContainer: {
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: '#DADADA',
        height: '10%',
    },
    editingButtonsViewStyle: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    editingButton: {
        borderRadius: 8,
        width: '42%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteButton: {
        backgroundColor: '#3DC373',
    },
    cancelButton: {
        backgroundColor: '#DADADA',
    },
    fontStyle: {
        fontSize: 13,
        lineHeight: 20,
    },
});

export default Favorite;
