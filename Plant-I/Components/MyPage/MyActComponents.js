import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MyActivityTopComponent } from '../../Components/TopContainerComponents/TopContainerComponent';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../../Components/CustomComponents/CustomText';

const MyActComponents = ({ topText, text, data_counts, data, renderItem }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <MyActivityTopComponent text={topText} onPress={() => navigation.pop()} />

            <View style={styles.dataView}>
                <CustomText medium style={styles.countText}>
                    {text} ({data_counts})
                </CustomText>
                <View style={styles.listView}>
                    <FlatList data={data} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
                </View>
            </View>
        </View>
    );
};

export default MyActComponents;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    dataView: {
        flex: 1,
    },
    countText: {
        marginLeft: '2%',
    },
    listView: {
        flex: 1,
    },
});
