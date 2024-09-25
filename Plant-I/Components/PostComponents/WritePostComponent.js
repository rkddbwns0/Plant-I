import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesome, FontAwesome6, Octicons } from '@expo/vector-icons';
import CustomText from '../CustomComponents/CustomText';
import CustomInput from '../CustomComponents/CustomInput';
import { useNavigation } from '@react-navigation/native';
import imageUrls from '../../JSONData/imageUrls.json';

const PostContainer = ({
    RegOnPress,
    Title,
    setTitle,
    Content,
    setContent,
    image,
    deleteImageOnPress,
    ImageVisibled,
}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.TopConatiner}>
                <TouchableOpacity style={styles.BackBtn} onPress={() => navigation.pop()}>
                    <Image source={{ uri: imageUrls?.left }} style={styles.iconImage} />
                </TouchableOpacity>

                <View style={styles.centerText}>
                    <CustomText medium style={{ fontSize: 18, lineHeight: 25 }} allowFontScaling={false}>
                        글 쓰기
                    </CustomText>
                </View>

                <TouchableOpacity style={styles.RegisterBtn} onPress={RegOnPress}>
                    <CustomText style={{ fontSize: 15, lineHeight: 20, color: 'white' }} allowFontScaling={false}>
                        완료
                    </CustomText>
                </TouchableOpacity>
            </View>

            <View style={styles.WriteContaier}>
                <CustomInput
                    style={styles.WriteTitleView}
                    placeholder="제목"
                    placeholderTextColor="#979797"
                    value={Title}
                    onChangeText={setTitle}
                    fontSize={18}
                />
                <View style={styles.WriteContentView}>
                    <ScrollView>
                        <CustomInput
                            style={{ textAlignVertical: 'top', padding: 8, marginVertical: 8 }}
                            multiline={true}
                            numberOfLines={10}
                            placeholder="내용을 입력하세요."
                            placeholderTextColor="#979797"
                            value={Content}
                            onChangeText={setContent}
                            fontSize={15}
                        />
                    </ScrollView>
                </View>
            </View>

            <View style={styles.BottomContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CustomText>사진 첨부</CustomText>
                    <CustomText style={styles.imageCountText}>{`(${image.length}/5)`}</CustomText>
                </View>
                <ScrollView horizontal={true} keyboardShouldPersistTaps="handled">
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        {image.map((item, index) => (
                            <View key={index} style={styles.ImageViewStyle}>
                                <TouchableOpacity
                                    style={styles.deleteIconStyle}
                                    onPress={() => deleteImageOnPress(index)}
                                >
                                    <Octicons name="x-circle-fill" size={17} color="#757575" />
                                </TouchableOpacity>
                                <Image style={styles.imageStyle} source={{ uri: item }} />
                            </View>
                        ))}
                        {image.length < 5 && (
                            <View style={styles.ImageViewStyle}>
                                <TouchableOpacity style={styles.ImageBtn} onPress={ImageVisibled}>
                                    <Image source={{ uri: imageUrls?.add }} style={{ width: 35, height: 35 }} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};
export default PostContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    TopConatiner: {
        flex: 1,
        maxHeight: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '3%',
        justifyContent: 'space-between',
    },
    WriteContaier: {
        flex: 1,
        borderBottomWidth: 2,
        borderBottomColor: '#EDEDED',
    },
    WriteTitleView: {
        felx: 0.2,
        borderBottomWidth: 2,
        borderBottomColor: '#EDEDED',
        width: '100%',
        padding: 10,
    },
    WriteContentView: {
        flex: 1,
    },
    BackBtn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerText: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    RegisterBtn: {
        backgroundColor: '#39C769',
        alignItems: 'center',
        justifyContent: 'center',
        width: '17%',
        height: 35,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    BottomContainer: {
        width: '98%',
        height: 180,
        padding: '1%',
        marginHorizontal: '1%',
        justifyContent: 'center',
    },
    imageCountText: {
        marginLeft: '1%',
    },
    imageStyle: {
        width: 100,
        height: 110,
        borderWidth: 0.5,
        borderColor: '#D1D1D1',
        borderRadius: 5,
    },
    ImageViewStyle: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: '2%',
    },
    deleteIconStyle: {
        position: 'absolute',
        top: -5,
        right: -6,
        zIndex: 2,
    },
    ImageBtn: {
        borderWidth: 0.5,
        borderColor: '#D1D1D1',
        width: 100,
        height: 110,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconImage: {
        width: 25,
        height: 25,
    },
});
