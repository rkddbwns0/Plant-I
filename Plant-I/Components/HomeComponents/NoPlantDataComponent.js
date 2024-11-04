import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import imageUrls from '../../JSONData/imageUrls.json';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NoPlantDataComponent = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={{ height: 30, justifyContent: 'center' }}>
                <Text style={styles.regCountText} allowFontScaling={false}>
                    등록된 식물 (0)
                </Text>
            </View>
            <View style={styles.mainView}>
                <View style={styles.logoView}>
                    <Image source={{ uri: imageUrls?.logo }} style={styles.logoStyle} />
                </View>
                <Text style={styles.textStyle} allowFontScaling={false}>
                    아직 등록된 식물이 없어요!{'\n'}나만의 반려식물을 등록해 예쁘게 키워보세요!
                </Text>
                <View style={styles.btnView}>
                    <TouchableOpacity style={styles.btnStyle} onPress={() => navigation.navigate('PlantRegister1')}>
                        <Image source={{ uri: imageUrls?.add_white }} style={styles.iconImage} />
                        <Text style={styles.btnText} allowFontScaling={false}>
                            식물 추가
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default NoPlantDataComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    regCountText: {
        fontSize: 14,
        marginLeft: '3%',
        lineHeight: 25,
    },
    mainView: {
        flex: 1,
        marginTop: '20%',
    },
    logoView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoStyle: {
        width: 40,
        height: 40,
    },
    textStyle: {
        textAlign: 'center',
        color: '#989898',
        fontSize: 13,
        marginTop: '2%',
    },
    btnView: {
        alignItems: 'center',
        marginTop: '4%',
    },
    btnStyle: {
        backgroundColor: '#39C769',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%',
        height: 45,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 7,
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
    },
    iconImage: {
        width: 20,
        height: 20,
    },
});
