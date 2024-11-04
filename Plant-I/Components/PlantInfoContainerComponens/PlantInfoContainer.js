import React from 'react';
import { View, TouchableOpacity, Image, ScrollView, StyleSheet, Text, TextInput } from 'react-native';

const PlantInfoContainer = ({
    imageOnPress,
    image,
    Pname,
    Plant_DateOnPress,
    Plant_Date,
    value,
    onChangeText,
    PlaceOnPress,
    Place,
    Last_WateredOnPress,
    Last_Watered,
    disabled,
    editable,
    PnameOnPress,
    PnameDisabled,
    showWater_Period,
    Watering_DateOnPress,
    Watering_Time,
}) => {
    return (
        <ScrollView style={styles.container}>
            <View>
                <TouchableOpacity
                    style={styles.ImgbtnStyle}
                    onPress={disabled ? null : imageOnPress}
                    disabled={disabled}
                >
                    <Image style={styles.ImageStyle} source={{ uri: image }} />
                </TouchableOpacity>
            </View>

            <View style={styles.PlantNameContainer}>
                <TouchableOpacity style={styles.PlantNameStyle} onPress={PnameOnPress} disabled={PnameDisabled}>
                    <Text style={{ fontSize: 18, fontWeight: '500' }} allowFontScaling={false}>
                        {Pname}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.UserPlantInfoContainer}>
                <View style={styles.InfoStyle}>
                    <Text style={styles.infoText} allowFontScaling={false}>
                        키우기 시작한 날
                    </Text>
                    <TouchableOpacity
                        style={styles.InfoDataStyles}
                        onPress={disabled ? null : Plant_DateOnPress}
                        disabled={disabled}
                    >
                        <Text style={styles.DataStyles} allowFontScaling={false}>
                            {Plant_Date}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.InfoStyle}>
                    <Text style={styles.infoText} allowFontScaling={false}>
                        식물 별명
                    </Text>
                    <TextInput
                        style={styles.InfoDataStyles}
                        textAlign="left"
                        value={value}
                        onChangeText={onChangeText}
                        editable={editable}
                    />
                </View>

                <View style={styles.InfoStyle}>
                    <Text style={styles.infoText} allowFontScaling={false}>
                        키우는 곳
                    </Text>
                    <TouchableOpacity
                        style={styles.InfoDataStyles}
                        onPress={disabled ? null : PlaceOnPress}
                        disabled={disabled}
                    >
                        <Text style={styles.DataStyles} allowFontScaling={false}>
                            {Place}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.InfoStyle}>
                    <Text style={styles.infoText} allowFontScaling={false}>
                        마지막으로 물 준 날
                    </Text>
                    <TouchableOpacity
                        style={styles.InfoDataStyles}
                        onPress={disabled ? null : Last_WateredOnPress}
                        disabled={disabled}
                    >
                        <Text style={styles.infoText} allowFontScaling={false}>
                            {Last_Watered}
                        </Text>
                    </TouchableOpacity>
                </View>

                {showWater_Period && (
                    <View style={styles.InfoStyle}>
                        <Text style={styles.infoText} allowFontScaling={false}>
                            물 주는 날
                        </Text>
                        <TouchableOpacity
                            style={styles.InfoDataStyles}
                            onPress={disabled ? null : Watering_DateOnPress}
                            disabled={disabled}
                        >
                            <Text style={styles.infoText} allowFontScaling={false}>
                                {Watering_Time}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default PlantInfoContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ImgbtnStyle: {
        marginTop: '8%',
        width: '100%',
        height: 240,
        alignItems: 'center',
    },
    ImageStyle: {
        width: '65%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 30,
        borderWidth: 0.5,
        borderColor: '#3DC373',
    },
    PlantNameContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: '2%',
    },
    PlantNameStyle: {
        justifyContent: 'center',
    },
    UserPlantInfoContainer: {
        flex: 1,
        marginTop: '10%',
    },
    InfoStyle: {
        alignContent: 'center',
        alignItems: 'flex-start',
        marginLeft: '5%',
        marginVertical: '2%',
    },
    infoText: {
        fontSize: 15,
        lineHeight: 18,
    },
    DataStyles: {
        fontSize: 15,
        alignSelf: 'left',
    },
    InfoDataStyles: {
        borderWidth: 1,
        borderColor: '#B1B6AE',
        width: '92%',
        height: 45,
        fontSize: 15,
        marginVertical: '3%',
        borderRadius: 5,
        justifyContent: 'center',
        paddingLeft: '4%',
        color: 'black',
    },
});
