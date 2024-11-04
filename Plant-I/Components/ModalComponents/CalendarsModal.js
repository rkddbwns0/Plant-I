import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text, Image } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import imageUrls from '../../JSONData/imageUrls.json';

LocaleConfig.locales['ko'] = {
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: '오늘',
};
LocaleConfig.defaultLocale = 'ko';

const CalendarsModal = ({ visible, onRequestClose, onSelect }) => {
    const today = new Date();
    const todayDateString = today.toISOString().split('T')[0];

    return (
        <View>
            <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onRequestClose}>
                <View style={styles.container}>
                    <View style={styles.ModalView}>
                        <View style={styles.BtnContainer}>
                            <TouchableOpacity style={styles.BtnStyle} onPress={onRequestClose}>
                                <Text style={{ color: '#757575', fontWeight: '600' }} allowFontScaling={false}>
                                    닫기
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.CalendarContainer}>
                            <Calendar
                                style={styles.CalendarStyle}
                                theme={{
                                    textMonthFontSize: 18,
                                    textDayFontSize: 14,
                                    textDayHeaderFontSize: 14,
                                    textMonthFontWeight: 'bold',
                                    arrowColor: 'black',
                                    weekVerticalMargin: 10,
                                }}
                                renderArrow={(direction) =>
                                    direction === 'left' ? (
                                        <Image source={{ uri: imageUrls?.left }} style={styles.iconStyles} />
                                    ) : (
                                        <Image source={{ uri: imageUrls?.right2 }} style={styles.iconStyles} />
                                    )
                                }
                                onDayLongPress={(day) => {
                                    setSelected(day.dateString);
                                }}
                                monthFormat={'yyyy년 M월'}
                                onDayPress={onSelect}
                                maxDate={todayDateString}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
export default CalendarsModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    BtnContainer: {
        flex: 1,
        maxHeight: '10%',
        justifyContent: 'center',
    },
    BtnStyle: {
        alignSelf: 'flex-end',
        marginRight: '7%',
        top: '10%',
    },
    ModalView: {
        flex: 1,
        backgroundColor: 'white',
        width: '80%',
        maxHeight: '60%',
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#CBDDB4',
        justifyContent: 'center',
    },
    CalendarContainer: {
        flex: 1,
    },
    CalendarStyle: {
        justifyContent: 'center',
    },
    iconStyles: {
        width: 20,
        height: 20,
    },
});
