import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from  'react-native'

const Favorite = () => {
    return (
        <View>
            <View style = {styles.btnContainer}>
                <TouchableOpacity 
                    style = {
                        styles.btnStyle
                    }>
                    <Text style = { styles.fontStyle }>전체</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.btnStyle}>
                    <Text style = { styles.fontStyle }>허브</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.btnStyle}>
                    <Text style = { styles.fontStyle }>꽃식물</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.btnStyle}>
                    <Text style = { styles.fontStyle }>다육이</Text>
                </TouchableOpacity>
            </View>

            <View style = { styles.btnCobtainer2 }>
                <TouchableOpacity><Text style = { styles.fontStyle }>분류별 보기</Text></TouchableOpacity>
                <Text style = {{ fontSize: 15}}> | </Text>
                <TouchableOpacity><Text style = { styles.fontStyle }>편집</Text></TouchableOpacity>
            </View>
            <ScrollView 
                style = { styles.ScrollContainer }
            >
                <Text>ㅎㅇ</Text>
            </ScrollView>
        </View>
    );
};

export default Favorite;

const styles = StyleSheet.create({ 
    btnContainer: {
        flexDirection: 'row',
        marginLeft: 12
    },
    btnCobtainer2: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
        marginRight: 17
    },
    btnStyle: {
        backgroundColor: '#CDD0CB',
        width: 50,
        height: 25,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 40,
    },
    fontStyle: {
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 2
    },
    ScrollContainer: {
        borderColor: 'black',
        borderWidth: 1,
        height: '100%',
        marginTop: 10
    }
})