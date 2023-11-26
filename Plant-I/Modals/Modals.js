import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Modal from 'react-native-modal';

const Modal1 = ({ isVisible, closeModal }) => {

    return (
        <Modal 
            isVisible = { isVisible }
            onBackdropPress = { closeModal }
            onBackButtonPress = { closeModal }
            style = { styles.ModalView }
            animationIn = { "slideInUp" }
            animationOut = { "slideOutDown" }
            animationInTiming = { 300 }
            animationOutTiming = { 300 }
            backdropTransitionOutTiming = { 0 }
            avoidKeyboard = { false }
            backdropColor = "grey"
        >
            <View>
                <View style = { styles.TextInputStlye }>
                    <Text style = {{ fontSize: 22, fontWeight: 'bold' }}>식물 이름</Text>
                    <TextInput style = { styles.Input }></TextInput>
                </View>

                <View  style = { styles.TextInputStlye }>
                    <Text style = {{ fontSize: 22, fontWeight: 'bold' }}>식물 별명</Text>
                    <TextInput style = { styles.Input }></TextInput>
                </View>

                    <View style = { styles.ModalBtn }>
                        <TouchableOpacity 
                            style = { [styles.ModalBtnStyle, styles.ModalBtnColor1] }
                            onPress = { closeModal } 
                        >
                            <Text style = {{ fontSize: 20, fontWeight: 'bold', marginBottom: 2 }}>취소</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style = { [styles.ModalBtnStyle, styles.ModalBtnColor2] }
                        >
                            <Text style = {{ fontSize: 20, fontWeight: 'bold', marginBottom: 2 }}>등록</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
    )
}

export default Modal1; 


const styles = StyleSheet.create({
    ModalView: { // 모달창 화면
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        width: '100%',
        minHeight: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 60,
        margin: 150,
    },
    ModalBtn: { // 모달창 버튼 배치
        flexDirection: 'row',
        position: 'relative',
        width: '80%',
        justifyContent: 'space-around',
    },
    ModalBtnStyle: { // 모달창 버튼
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 45,
        borderRadius: 15
    },
    ModalBtnColor1: {
        backgroundColor: '#CDD0CB'
    },
    ModalBtnColor2: {
        backgroundColor: '#CBDDB4'
    },
    Input: { // 입력창 스타일
        marginVertical: 25,
        fontSize: 20,
        width: 180,
        borderBottomWidth: 0.8,
        borderBottomColor: '#000000'
    },
    TextInputStlye: {
        flexDirection: "row",
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center'
    }
})