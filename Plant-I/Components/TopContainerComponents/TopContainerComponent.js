import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import imageUrls from '../../JSONData/imageUrls.json';

export const TopContainerComponent = ({ onPress, text, color, textcolor }) => {
    return (
        <View style={styles.TopContainer}>
            <View style={styles.BackBtnContainer}>
                <TouchableOpacity style={{ ...styles.BackBtn, width: '10%' }} onPress={onPress}>
                    <Image source={{ uri: imageUrls?.left }} style={{ ...styles.imageStyles, color: color }} />
                </TouchableOpacity>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ ...styles.fontStyles, color: textcolor }} allowFontScaling={false}>
                        {text}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export const TopContainerComponent2 = ({ text, onPress, fontWeight }) => {
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

            <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: fontWeight }} allowFontScaling={false}>
                {text}
            </Text>
            <View style={{ flex: 1 }} />
        </View>
    );
};

export const TopContainerComponent3 = ({ text, onPress, btnOnpress, btnText }) => {
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

            <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: '400' }} allowFontScaling={false}>
                {text}
            </Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={btnOnpress} style={styles.btnStyle}>
                    <Text style={{ color: 'white', fontWeight: '500' }}>{btnText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export const MyActivityTopComponent = ({ text, onPress }) => {
    return (
        <View style={styles.actTopContainer}>
            <TouchableOpacity style={styles.actBackBtn} onPress={onPress}>
                <Image source={{ uri: imageUrls?.left }} style={styles.imageStyles} />
            </TouchableOpacity>
            <Text medium style={styles.actTitleText}>
                {text}
            </Text>
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
        fontSize: 18,
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
    },
    btnStyle: {
        backgroundColor: '#39C769',
        width: '40%',
        height: 35,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
