import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import axios from 'axios';
import { TopContainerComponent } from '../Components/TopContainerComponents/TopContainerComponent';
import { BottomContainer } from '../Components/BottomContainerComponents/BottomContainerComponent';
import { SERVER_ADDRESS } from '../Components/ServerAddress';
import { useNavigation } from '@react-navigation/native';
import AlertModal from '../Components/ModalComponents/AlertModal';

const EditPlace = ({ route }) => {
    const navigation = useNavigation();
    const { No, Pname, PNname, Plant_Date, Last_Watered, image } = route.params;
    const [selectPlace, setSelectPlace] = useState('');
    const [place, setPlace] = useState([]);
    const [modalVisibled, setModalVisibled] = useState(false);

    const handleSelectPlace = (selected) => {
        setSelectPlace(selected);
    };

    const handleNextPage = () => {
        if (selectPlace === '') {
            setModalVisibled(true);
        } else {
            navigation.navigate('EditPlantInfo', {
                No: No,
                Pname: Pname,
                PNname: PNname,
                Plant_Date: Plant_Date,
                Last_Watered: Last_Watered,
                image: image,
                Place: selectPlace,
            });
        }
    };

    const chunkArray = (arr, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunks.push(arr.slice(i, i + chunkSize));
        }
        return chunks;
    };

    useEffect(() => {
        const selectPlace = () => {
            axios
                .post(`${SERVER_ADDRESS}/selectplacedb/select`)
                .then((response) => {
                    const data = response.data;
                    setPlace(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        };
        selectPlace();
    }, []);

    const placeChunks = chunkArray(place, 2);

    return (
        <View style={styles.container}>
            <TopContainerComponent onPress={() => navigation.pop()} />

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 1, maxHeight: '20%', top: '5%' }}>
                    <Text style={{ fontSize: 20, fontWeight: '600' }} allowFontScaling={false}>
                        변경하실 공간을 선택해 주세요!
                    </Text>
                </View>

                <View style={{ flex: 1, width: '100%', bottom: '5%', justifyContent: 'center' }}>
                    {placeChunks.map((chunk, index) => (
                        <View key={index} style={styles.placeContainer}>
                            {chunk.map((item) => (
                                <View key={item?.No} style={styles.placeView}>
                                    <TouchableOpacity
                                        style={[styles.btnStyle, selectPlace === item?.Place && styles.selectStyle]}
                                        onPress={() => handleSelectPlace(item?.Place)}
                                    >
                                        <Image source={{ uri: item?.Image }} style={[styles.imageStyles]} />
                                        <Text style={styles.fontStyles} allowFontScaling={false}>
                                            {item?.Place}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            </View>

            <BottomContainer ButtonText="변경하기" onPress={handleNextPage} />

            <AlertModal
                visible={modalVisibled}
                title="키우는 장소를 선택해 주세요."
                showBtn={true}
                onPress={() => setModalVisibled(false)}
                onRequestClose={() => setModalVisibled(false)}
                BtnText="확인"
            />
        </View>
    );
};

export default EditPlace;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    placeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    placeView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnStyle: {
        width: '90%',
        marginHorizontal: 15,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    imageStyles: {
        marginTop: '3%',
        width: 160,
        height: 125,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: 'black',
    },
    fontStyles: {
        textAlign: 'center',
        fontSize: 14,
    },
    selectStyle: {
        backgroundColor: '#F4F6F7',
    },
});
