import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../CustomComponents/CustomText';
import imageUrls from '../../JSONData/imageUrls.json';

export const TopContainerComponent = ({ onPress, text, color, textcolor }) => {
    return (
        <View style={styles.TopContainer}>
            <View style={styles.BackBtnContainer}>
                <TouchableOpacity style={{ ...styles.BackBtn, width: '10%' }} onPress={onPress}>
                    <Image source={{ uri: imageUrls?.left }} style={{ ...styles.imageStyles, color: color }} />
                </TouchableOpacity>
                <View style={{ justifyContent: 'center' }}>
                    <CustomText style={{ ...styles.fontStyles, color: textcolor }}>{text}</CustomText>
                </View>
            </View>
        </View>
    );
};

export const TopContainerComponent2 = ({ text, onPress }) => {
    return (
        <View style={{ ...styles.TopContainer, padding: '3%' }}>
            <TouchableOpacity
                style={{
                    flex: 1,
                    alignItems: 'flex-start',
                }}
                onPress={onPress}
            >
                <Image source={{ uri: imageUrls?.left }} style={styles.imageStyles} />
            </TouchableOpacity>

            <CustomText medium style={{ fontSize: 18, textAlign: 'center', lineHeight: 25 }} allowFontScaling={false}>
                {text}
            </CustomText>
            <View style={{ flex: 1 }} />
        </View>
    );
};

export const MyActivityTopComponent = ({ text, onPress }) => {
    return (
        <View style={styles.actTopContainer}>
            <TouchableOpacity style={styles.actBackBtn} onPress={onPress}>
                <Image source={{ uri: imageUrls?.left }} style={styles.imageStyles} />
            </TouchableOpacity>
            <CustomText medium style={styles.actTitleText}>
                {text}
            </CustomText>
            <View style={{ flex: 1 }}></View>
        </View>
    );
};

export const IconTopContainer = ({ onPress, deleteOnPress, EditOnPress, AlarmOnPress }) => {
    return (
        <View style={styles.TopContainer}>
            <View style={styles.BackBtnContainer}>
                <TouchableOpacity style={{ ...styles.BackBtn }} onPress={onPress}>
                    <Image source={{ uri: imageUrls?.left }} style={styles.imageStyles} />
                </TouchableOpacity>
            </View>
            <View style={styles.IconContainer}>
                <TouchableOpacity style={styles.AlarmBtn} onPress={AlarmOnPress}>
                    <Ionicons name="alarm-outline" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.UpdateBtn} onPress={EditOnPress}>
                    <Image source={{ uri: imageUrls?.write_grey }} style={styles.imageStyles} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.DeleteBtn} onPress={deleteOnPress}>
                    <Image source={{ uri: imageUrls?.delete }} style={styles.imageStyles} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    TopContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        maxHeight: 55,
    },
    BackBtnContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    BackBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        left: '3%',
    },
    CancelBtnContainer: {
        flex: 1,
        alignItems: 'flex-end',
        padding: '3%',
        right: '10%',
    },
    IconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginRight: '2%',
    },
    DeleteBtn: {
        marginHorizontal: '1%',
    },
    UpdateBtn: {
        marginHorizontal: '1%',
    },
    AlarmBtn: {
        marginHorizontal: '1%',
    },
    fontStyles: {
        fontSize: 17,
        lineHeight: 25,
    },
    imageStyles: {
        width: 25,
        height: 25,
    },
    actTopContainer: {
        flex: 1,
        maxHeight: 55,
        borderBottomWidth: 2,
        borderBottomColor: '#EDEDED',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3%',
        flexDirection: 'row',
    },
    actBackBtn: {
        flex: 1,
    },
    actTitleText: {
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 25,
    },
});
