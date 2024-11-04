import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, FlatList, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import imageUrls from '../../JSONData/imageUrls.json';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import axios from 'axios';

const SearchResult = () => {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const SearchData = async () => {
            try {
                const response = await axios.get(`${SERVER_ADDRESS}/plantdb/search`);
                const data = response.data;

                if (search === '') {
                    setSearchResults([]);
                } else {
                    const filterData = data.filter((item) => item.Pname.toLowerCase().includes(search.toLowerCase()));
                    setSearchResults(filterData);
                }
            } catch (error) {
                console.log(error);
            }
        };
        SearchData();
    }, [search]);

    const renderItems = ({ item }) => {
        return (
            <View style={styles.searchResultView}>
                <TouchableOpacity
                    style={styles.searchDataBtn}
                    onPress={() => {
                        navigation.navigate('PlantDetail', { Pname: item.Pname });
                    }}
                >
                    {item.Image && <Image source={{ uri: item?.Image }} style={styles.imageStyles} />}
                    <Text style={styles.searchDataText}>{item?.Pname}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.topView}>
                <TouchableOpacity style={styles.btnStyle} onPress={() => navigation.pop()}>
                    <Image source={{ uri: imageUrls?.left }} style={styles.iconImage} />
                </TouchableOpacity>
                <TextInput
                    style={styles.searchBar}
                    value={search}
                    onChangeText={setSearch}
                    placeholder="식물 이름을 검색하세요."
                    allowFontScaling={false}
                />
            </View>

            <View style={styles.listView}>
                <FlatList
                    data={searchResults}
                    renderItem={renderItems}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    );
};

export default SearchResult;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topView: {
        flex: 1,
        flexDirection: 'row',
        maxHeight: 70,
        alignItems: 'center',
    },
    btnStyle: {
        marginLeft: '3%',
    },
    iconImage: {
        width: 25,
        height: 25,
    },
    searchBar: {
        backgroundColor: '#F8F8F8',
        width: '85%',
        height: 50,
        borderRadius: 10,
        paddingLeft: 15,
    },
    listView: {
        flex: 1,
        marginTop: '3%',
    },
    searchResultView: {
        flex: 1,
        justifyContent: 'center',
    },
    searchDataBtn: {
        height: 95,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: '1%',
    },
    imageStyles: {
        width: '25%',
        height: '100%',
        marginLeft: '8%',
        resizeMode: 'contain',
    },
    searchDataText: {
        flex: 1,
        left: '20%',
        fontSize: 13,
    },
});
