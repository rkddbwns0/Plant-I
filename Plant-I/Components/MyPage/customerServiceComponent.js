import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomerServiceComponent = () => {
    const customerService = ['공지사항', '자주 묻는 질문', '고객센터', '약관 및 정책'];
    const navigation = useNavigation();

    const rows = [];
    for (let i = 0; i < customerService.length; i += 2) {
        rows.push(customerService.slice(i, i + 2));
    }
    return (
        <View style={styles.customerServiceView}>
            <View>
                <Text style={styles.serviceTtitle} allowFontScaling={false}>
                    식물 챗봇 AI
                </Text>
                <View>
                    <TouchableOpacity>
                        <Text
                            style={styles.serviceText}
                            allowFontScaling={false}
                            onPress={() => navigation.navigate('MyChatbotResult')}
                        >
                            챗봇 상담 내역
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={styles.serviceTtitle} allowFontScaling={false}>
                    혜택 정보
                </Text>
                <View>
                    <TouchableOpacity>
                        <Text style={styles.serviceText} allowFontScaling={false}>
                            진행 중인 이벤트
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.serviceView}>
                <Text style={styles.serviceTtitle} allowFontScaling={false}>
                    문의 및 알림
                </Text>
                {rows.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.rowView}>
                        {row.map((item, index) => (
                            <View key={index} style={styles.rowItems}>
                                <TouchableOpacity>
                                    <Text style={styles.serviceText}>{item}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
};

export default CustomerServiceComponent;

const styles = StyleSheet.create({
    customerServiceView: {
        flex: 1,
        marginTop: '10%',
    },
    serviceTtitle: {
        fontSize: 13,
        color: '#646464',
        lineHeight: 20,
        fontWeight: '500',
    },
    serviceText: {
        fontSize: 14,
        lineHeight: 50,
        fontWeight: '500',
    },
    serviceView: {
        marginTop: '4%',
    },
    rowView: {
        flexDirection: 'row',
    },
    rowItems: {
        flex: 1,
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomBtnStyles: {
        paddingHorizontal: '5%',
    },
    bottomText: {
        fontSize: 13,
        color: '#ABABAB',
        fontWeight: '500',
    },
});
