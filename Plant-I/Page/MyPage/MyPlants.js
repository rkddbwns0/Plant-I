import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MyActivityTopComponent } from '../../Components/TopContainerComponents/TopContainerComponent';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../Components/ServerAddress';
import CustomText from '../../Components/CustomComponents/CustomText';
import MyActComponents from '../../Components/MyPage/MyActComponents';

const MyPlants = () => {
    const navigation = useNavigation();
    const [userPlantData, setUserPlantData] = useState([]);

    useEffect(() => {
        const getPlantData = async () => {
            try {
                const response = await axios.get(`${SERVER_ADDRESS}/userplantdb/select`, { withCredentials: true });
                const data = response.data;
                setUserPlantData(data);
            } catch (error) {
                console.log(error);
            }
        };
        getPlantData();
    });

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
                    <CustomText medium style={styles.pnameText}>
                        {item.Pname}
                    </CustomText>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <MyActComponents
            topText="내 식물 보관함"
            text="등록된 식물"
            data_counts={userPlantData[0]?.total_count}
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
        width: '100%',
        height: '85%',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#8E8E8E',
    },
    pnameText: {
        fontSize: 13,
        marginLeft: '5%',
        lineHeight: 20,
    },
});
