import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { MyActivityTopComponent } from '../../Components/TopContainerComponents/TopContainerComponent';
import { useNavigation } from '@react-navigation/native';

const MyActComponents = ({ topText, text, data_counts, data, renderItem }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <MyActivityTopComponent text={topText} onPress={() => navigation.pop()} />

            <View style={styles.dataView}>
                <View style={styles.countTextView}>
                    <Text style={styles.countText} allowFontScaling={false}>
                        {text} ({data_counts})
                    </Text>
                </View>

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
    countTextView: {
        height: 40,
        justifyContent: 'center',
    },
    countText: {
        marginLeft: '2%',
        fontWeight: '400',
    },
    listView: {
        flex: 1,
    },
});
