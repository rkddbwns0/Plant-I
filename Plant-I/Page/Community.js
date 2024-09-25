import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import CustomText from '../Components/CustomComponents/CustomText';
import { SERVER_ADDRESS } from '../Components/ServerAddress';
import imageUrls from '../JSONData/imageUrls.json';
import PostComponent from '../Components/PostComponents/PostComponent';

const Community = ({ navigation }) => {
    const [boardData, setBoardData] = useState([]);
    const [selectedCategory, setSelectCategory] = useState(1);
    const [category, setCategory] = useState([]);

    const CountComment = useCallback(async () => {
        try {
            const response = await axios.post(`${SERVER_ADDRESS}/postdb/selectCategory`, {
                Category: selectedCategory,
            });
            const data = response.data;
            setBoardData(data);
        } catch (error) {
            console.error(error);
        }
    }, [selectedCategory]);

    useFocusEffect(
        useCallback(() => {
            CountComment();
        }, [CountComment])
    );

    useEffect(() => {
        const postCategory = () => {
            axios
                .post(`${SERVER_ADDRESS}/postcategory/category`)
                .then((response) => {
                    const data = response.data;
                    setCategory(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        };
        postCategory();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.searchView}>
                <TouchableOpacity style={styles.searchBtn} onPress={() => navigation.navigate('CommunitySearch')}>
                    <Image source={{ uri: imageUrls?.searchBtn }} style={styles.searchIconImage} />
                    <CustomText style={styles.searchBtnText}>게시글을 입력하세요.</CustomText>
                </TouchableOpacity>
            </View>

            <View style={styles.categoryView}>
                {category.map((item) => (
                    <TouchableOpacity
                        key={item.Id}
                        onPress={() => setSelectCategory(item.Id)}
                        style={[styles.CategoryStyles, selectedCategory === item.Id ? styles.FocusCategory : null]}
                    >
                        <CustomText
                            bold={selectedCategory === item.Id}
                            style={{
                                color: selectedCategory === item.Id ? 'black' : '#979797',
                                lineHeight: 30,
                            }}
                            allowFontScaling={false}
                        >
                            {item.category}
                        </CustomText>
                    </TouchableOpacity>
                ))}
            </View>

            <PostComponent data={boardData} showTopView={false} showCategory={false} />

            <View style={styles.WriteBtnContainer}>
                <TouchableOpacity
                    style={styles.WriteBtnStyle}
                    onPress={() => navigation.navigate('WriteBoard', { selectedCategory: selectedCategory })}
                >
                    <Image source={{ uri: imageUrls.write_white }} style={styles.iconImage} />
                    <CustomText bold style={styles.writeFont} allowFontScaling={false}>
                        글 쓰기
                    </CustomText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Community;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchView: {
        flex: 1,
        maxHeight: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBtn: {
        borderRadius: 10,
        backgroundColor: '#F8F8F8',
        width: '95%',
        height: 50,
        marginTop: '5%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    searchIconImage: {
        width: 25,
        height: 25,
        marginLeft: '3%',
    },
    searchBtnText: {
        color: '#757575',
        fontSize: 13,
        lineHeight: 20,
        marginLeft: '2%',
    },
    iconImage: {
        width: 25,
        height: 25,
    },
    categoryView: {
        flexDirection: 'row',
        padding: '2%',
        marginTop: '5%',
        marginBottom: '2%',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: '1%',
        alignItems: 'center',
    },
    CategoryStyles: {
        alignItems: 'center',
    },
    FocusCategory: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    WriteBtnContainer: {
        flex: 1,
        maxHeight: 70,
        width: '100%',
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    WriteBtnStyle: {
        flexDirection: 'row',
        backgroundColor: '#3DC373',
        alignItems: 'center',
        justifyContent: 'center',
        width: '35%',
        height: 45,
        borderRadius: 20,
    },
    writeFont: {
        fontSize: 18,
        color: 'white',
        lineHeight: 25,
    },
    iconImage: {
        width: 25,
        height: 25,
        marginRight: '5%',
    },
});
