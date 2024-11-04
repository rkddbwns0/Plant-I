import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import imageUrls from '../../JSONData/imageUrls.json';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import PostComponent from '../../Components/PostComponents/PostComponent';

const CommunitySearch = () => {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const SearchResult = async () => {
            try {
                const response = await axios.post(`${SERVER_ADDRESS}/postdb/search`);
                const data = response.data;

                if (search === '') {
                    setSearchResults([]);
                } else {
                    const filterData = data.filter((item) => item.Title.toLowerCase().includes(search.toLowerCase()));
                    setSearchResults(filterData);
                }
            } catch (error) {
                console.log(error);
            }
        };
        SearchResult();
    }, [search]);

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
                    placeholder="게시글을 검색하세요."
                    allowFontScaling={false}
                />
            </View>

            <PostComponent data={searchResults} showCategory={true} />
        </View>
    );
};

export default CommunitySearch;

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
});
