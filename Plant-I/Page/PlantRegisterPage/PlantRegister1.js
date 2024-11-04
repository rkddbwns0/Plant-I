import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Image,
    FlatList,
    Text,
    TextInput,
} from 'react-native';
import axios from 'axios';
import AlertModal from '../../Components/ModalComponents/AlertModal';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import { TopContainerComponent } from '../../Components/TopContainerComponents/TopContainerComponent';
import { BottomContainer } from '../../Components/BottomContainerComponents/BottomContainerComponent';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import imageUrls from '../../JSONData/imageUrls.json';

const PlantRegister1 = () => {
    const navigation = useNavigation();
    const [Search, setSearch] = useState('');
    const [PlantList, setPlantList] = useState([]);
    const [filterPlantList, setFilterPlantList] = useState([]);
    const [selectData, setSelectData] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [failSelectData, setFailSelectData] = useState(false);
    const [showProgress, setShowProgress] = useState(false);

    const handleDataSelect = (selected) => {
        setSelectData(selected);
    };

    const handleNextPage = () => {
        if (selectData === '') {
            setFailSelectData(true);
        } else {
            setDisabled(true);
            navigation.navigate('PlantRegister2', { Pname: selectData.Pname, progress: 0.5 });
            setSelectData('');
        }
    };

    useEffect(() => {
        const SearchData = () => {
            axios
                .get(`${SERVER_ADDRESS}/plantdb/Pname`)
                .then((response) => {
                    const data = response.data;
                    setPlantList(data);
                    setFilterPlantList(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        SearchData();
    }, []);

    useEffect(() => {
        if (Search === '') {
            setFilterPlantList(PlantList);
        } else {
            const filteredData = PlantList.filter((item) => item.Pname.toLowerCase().includes(Search.toLowerCase()));
            setFilterPlantList(filteredData);
        }
    }, [Search, PlantList]);

    const renderItems = ({ item }) => {
        return (
            <View style={styles.ScrollContainer}>
                {showProgress && <Progress.Bar progress={0.25} width={200} />}
                <TouchableOpacity
                    style={[styles.PlantData, selectData == item ? styles.ClickDataColors : null]}
                    activeOpacity={0.5}
                    onPress={() => {
                        handleDataSelect(item);
                    }}
                >
                    {item.Image && <Image style={styles.ImageStyles} source={{ uri: item?.Image }} />}
                    <Text style={styles.PlantDataText} allowFontScaling={false}>
                        {item?.Pname}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <TopContainerComponent onPress={() => navigation.pop()} text="식물선택" />

            <KeyboardAvoidingView>
                <View style={styles.searchContainer}>
                    {Search === '' && <Image source={{ uri: imageUrls.searchBtn }} style={styles.iconImage} />}
                    <TextInput
                        style={{ ...styles.searchInput, ...(Search !== '' && { paddingLeft: 8 }) }}
                        placeholder="식물 이름을 검색하세요."
                        value={Search}
                        onChangeText={setSearch}
                        keyboardShouldPersistTaps="handled"
                        allowFontScaling={false}
                    />
                </View>
            </KeyboardAvoidingView>

            <View style={{ flex: 1 }}>
                <FlatList
                    data={filterPlantList}
                    renderItem={renderItems}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

            <BottomContainer onPress={handleNextPage} ButtonText="다음" />

            <AlertModal
                visible={failSelectData}
                onRequestClose={() => setFailSelectData(false)}
                title="식물을 선택해 주세요."
                BtnText="확인"
                onPress={() => setFailSelectData(false)}
                showBtn={true}
            />
        </View>
    );
};

export default PlantRegister1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: '5%',
        borderWidth: 0.5,
        borderColor: '#F8F8F8',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#F8F8F8',
        width: '95%',
    },
    searchInput: {
        flex: 1,
        includeFontPadding: false,
        height: 50,
        marginLeft: 10,
    },
    ScrollContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    PlantData: {
        width: '95%',
        alignItems: 'center',
        flexDirection: 'row',
        padding: '1%',
        height: 95,
    },
    ImageStyles: {
        width: '25%',
        height: '100%',
        resizeMode: 'cover',
    },
    PlantDataText: {
        flex: 1,
        left: '25%',
        fontSize: 13,
    },
    selected: {
        backgroundColor: 'transparent',
    },
    ClickDataColors: {
        backgroundColor: '#F4F6F7',
    },
    iconImage: {
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '3%',
    },
});
