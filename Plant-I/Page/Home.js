import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo} from '@expo/vector-icons';

import Modal1 from '../Modals/Modals';

const Home = () => {

    const [ModalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
         setModalVisible(false);
    }

    return (
       <View style = { styles.container }>
            {/* 추천 받기 버튼 */}
            <View style = { styles.BtnView }>
                <TouchableOpacity style = { styles.Btn } onPress={() => alert('버튼')}>
                    <Text style = {{ fontSize: 20, fontWeight: 'bold', marginBottom: 2}} >식물 추천받기</Text>
                </TouchableOpacity >

                <TouchableOpacity style = { styles.Btn }>
                    <Text style = {{ fontSize: 20, fontWeight: 'bold', marginBottom: 2}}>테스트 하러 가기</Text>
                </TouchableOpacity>
            </View>
            
            {/* 나의 식물 */}
            <Text style = {{ fontSize: 22, fontWeight: 'bold', left: 25}}>나의 식물</Text>

            {/* 등록한 식물 */}
            <View style =  { styles.PlantView }>
                <View>
                    <TouchableOpacity>
                        
                    </TouchableOpacity>
                </View>
            </View>

            {/* 플로팅 버튼 */}
            <TouchableOpacity style = { styles.FABbtn } onPress = { showModal }>
                <Entypo name="plus" size={ 30 } left = {10} color="black" />
                <Text style = {{ fontSize: 20, fontWeight: 'bold', right: 12, marginBottom: 2 }}>식물 추가하기</Text>
            </TouchableOpacity>

            <Modal1 isVisible = { ModalVisible } closeModal = { closeModal } />
       </View>
    )
};

export default Home;


//#region 스타일
const styles = StyleSheet.create({
    container: { // 전체 뷰
        flex: 1
    },
    BtnView: { // 추천 및 테스트 버튼 배치
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center',
    },
    Btn: { // 버튼 (추천, 테스트)
        backgroundColor: '#ECEDEB',
        width: 170,
        height: 50,
        borderRadius: 15,
        marginTop: 30,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    FABbtn: { // 플로팅 버튼
        flexDirection: 'row',
        position: 'absolute',
        bottom: 15,
        right: 10,
        backgroundColor: '#ECEDEB',
        borderRadius: 15,
        width: 180,
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
//#endregion