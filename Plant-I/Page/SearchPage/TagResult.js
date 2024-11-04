import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, FlatList, Text } from 'react-native';
import { TopContainerComponent } from '../../Components/TopContainerComponents/TopContainerComponent';
import { useNavigation } from '@react-navigation/native';

const TagResult = ({ route }) => {
    const navigation = useNavigation();
    const { result, plantTypeTag, child } = route.params;

    const renderItems = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.plantBtnStyles}
                onPress={() => navigation.navigate('PlantDetail', { Pname: item.Pname })}
            >
                {item.Image && <Image style={styles.imageStyles} source={{ uri: item?.Image }} />}
                <Text style={styles.pnameFonts} allowFontScaling={false} numberOfLines={2}>
                    {item?.Pname}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <TopContainerComponent onPress={() => navigation.pop()} />
            <View style={styles.tagView}>
                <View style={styles.tagBtnView}>
                    {plantTypeTag && (
                        <TouchableOpacity style={{ ...styles.tagBtnStyles, width: '28%' }}>
                            <Text style={styles.tagFont} allowFontScaling={false}>
                                {plantTypeTag}
                            </Text>
                        </TouchableOpacity>
                    )}
                    {child === 1 && (
                        <TouchableOpacity style={{ ...styles.tagBtnStyles, width: '48%' }}>
                            <Text style={styles.tagFont} allowFontScaling={false}>
                                아이 또는 반려동물이 있어요
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <View style={styles.resultView}>
                <FlatList
                    data={result}
                    renderItem={renderItems}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                />
            </View>
        </View>
    );
};

export default TagResult;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    tagView: {
        flex: 1,
        maxHeight: 55,
    },
    tagBtnView: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: '3%',
    },
    tagBtnStyles: {
        backgroundColor: '#F8F8F8',
        height: 35,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#E3E3E3',
        marginRight: '3%',
    },
    tagFont: {
        fontSize: 13,
        lineHeight: 20,
    },
    resultView: {
        flex: 1,
        marginHorizontal: '2%',
    },
    plantBtnStyles: {
        width: '30%',
        height: 140,
        marginTop: '5%',
        marginRight: '4%',
    },
    imageStyles: {
        alignSelf: 'center',
        height: 110,
        width: '100%',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#8E8E8E',
    },
    pnameFonts: {
        textAlign: 'center',
        fontSize: 13,
    },
});
