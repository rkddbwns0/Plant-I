import React, { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import MyActComponents from '../../Components/MyPage/MyActComponents';

const MyPlants = ({ route }) => {
    const navigation = useNavigation();
    const [userPlantData, setUserPlantData] = useState([]);
    const { userplant_counts } = route.params;

    const getPlantData = async () => {
        try {
            const response = await axios.get(`${SERVER_ADDRESS}/userplantdb/select`, { withCredentials: true });
            const data = response.data;
            setUserPlantData(data);
        } catch (error) {
            console.log(error);
        }
    };
    useFocusEffect(
        useCallback(() => {
            getPlantData();
        }, [])
    );

    const renderItems = ({ item }) => {
        return (
            <View style={styles.plantsView}>
                <TouchableOpacity
                    style={styles.btnView}
                    onPress={() => {
                        navigation.navigate('UserPlantInfo', {
                            No: item?.No,
                            Pname: item?.Pname,
                            PNname: item?.PNname,
                            Plant_Date: item?.Plant_Date,
                            Last_Watered: item?.Last_Watered,
                            Place: item?.Place,
                            image: item?.Image,
                        });
                    }}
                >
                    <View style={styles.imageView}>
                        <Image source={{ uri: item.Image }} style={styles.imageStyles} />
                    </View>
                    <Text medium style={styles.pnameText} allowFontScaling={false}>
                        {item.Pname}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <MyActComponents
            topText="내 식물 보관함"
            text="등록된 식물"
            data_counts={userplant_counts}
            data={userPlantData}
            renderItem={renderItems}
        />
    );
};

export default MyPlants;

const styles = StyleSheet.create({
    btnView: {
        flexDirection: 'row',
        height: 100,
        alignItems: 'center',
    },
    imageView: {
        width: '25%',
        marginLeft: '3%',
    },
    imageStyles: {
        width: '90%',
        height: '80%',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#3DC373',
        resizeMode: 'cover',
    },
    pnameText: {
        fontSize: 13,
        marginLeft: '5%',
        lineHeight: 20,
        fontWeight: '500',
    },
});
