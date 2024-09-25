import React from 'react';
import { Modal, View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

const AlarmModal = ({ visible, onRequestClose, onPress }) => {
    const numbers = ['주기를 선택해 주세요.', ...Array.from({ length: 180 }, (_, i) => i + 1)];

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onRequestClose}>
            <View style={styles.ListContainer}>
                <View style={styles.modalContainer}>
                    <FlatList
                        data={numbers}
                        keyExtractor={(item) => item.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.numbersView}>
                                <TouchableOpacity
                                    style={styles.item}
                                    onPress={() => {
                                        onPress(item);
                                    }}
                                >
                                    <Text style={styles.itemText}>{item}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    ListContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        width: '80%',
        maxHeight: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    numbersView: {
        flex: 1,
    },
    item: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 55,
    },
    itemText: {
        marginLeft: '5%',
        fontSize: 18,
    },
});

export default AlarmModal;
