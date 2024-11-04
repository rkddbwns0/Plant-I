import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView, Animated, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import imageUrls from '../../JSONData/imageUrls.json';
import PlantRegistModal from '../ModalComponents/PlantRegistModal';

const UserPlantDataComponent = ({ userPlantData }) => {
    const navigation = useNavigation();
    const [modalVisibled, setModalVisibled] = useState(false);
    const rotation = useRef(new Animated.Value(0)).current;

    const rotateIcon = () => {
        setModalVisibled(!modalVisibled);

        Animated.timing(rotation, {
            toValue: modalVisibled ? 0 : 1,
            duration: 250,
            useNativeDriver: true,
        }).start(() => {
            setModalVisibled(!modalVisibled);
        });
    };

    const rotationInterpolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-45deg'],
    });

    const animatedStyle = {
        transform: [{ rotate: rotationInterpolate }],
    };
    return (
        <View style={styles.DataContainer}>
            <View style={styles.ScrollContainer}>
                <View style={{ height: 30, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 14, lineHeight: 25 }} allowFontScaling={false}>
                        등록된 식물 ({userPlantData[0]?.total_count})
                    </Text>
                </View>
                <ScrollView showsHorizontalScrollIndicator={true} removeClippedSubviews={true}>
                    {userPlantData.map((data, index) => (
                        <View key={index} style={styles.ScrollData}>
                            <TouchableOpacity
                                style={styles.UserPlantView}
                                onPress={() => {
                                    navigation.navigate('UserPlantInfo', {
                                        No: data?.No,
                                        Pname: data?.Pname,
                                        PNname: data?.PNname,
                                        Plant_Date: data?.Plant_Date,
                                        Last_Watered: data?.Last_Watered,
                                        Place: data?.Place,
                                        image: data?.Image,
                                    });
                                }}
                            >
                                <Image style={styles.ImageStyles} source={{ uri: data?.Image }} />
                                <Text style={styles.pnameText} allowFontScaling={false}>
                                    {data?.PNname} ({data?.Pname})
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.AddBtnCotainer}>
                <TouchableOpacity style={styles.AddBtnStyles} onPress={rotateIcon}>
                    <Animated.View style={animatedStyle}>
                        <Image source={{ uri: imageUrls?.add_white }} style={styles.iconImage} />
                    </Animated.View>
                </TouchableOpacity>
            </View>

            <PlantRegistModal
                visible={modalVisibled}
                onRequestClose={() => {
                    setModalVisibled(false);
                    rotateIcon();
                }}
                onPress={() => {
                    setModalVisibled(false);
                    rotateIcon(), navigation.navigate('PlantRegister1');
                }}
            />
        </View>
    );
};

export default UserPlantDataComponent;

const styles = StyleSheet.create({
    DataContainer: {
        flex: 1,
    },
    ScrollContainer: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        maxHeight: 500,
        padding: '3%',
    },
    ScrollData: {
        width: '100%',
        height: 80,
        alignSelf: 'center',
        marginVertical: 15,
        backgroundColor: 'white',
        marginTop: '1%',
    },
    UserPlantView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    ImageStyles: {
        width: '20%',
        height: '90%',
        resizeMode: 'cover',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#3DC373',
        resizeMode: 'cover',
    },
    AddBtnCotainer: {
        position: 'absolute',
        bottom: 8,
        right: 15,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    AddBtnStyles: {
        backgroundColor: '#3DC373',
        borderRadius: 40,
        width: 68,
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pnameText: {
        fontSize: 13,
        marginLeft: '5%',
        fontWeight: '500',
    },
    iconImage: {
        width: 35,
        height: 35,
    },
});
