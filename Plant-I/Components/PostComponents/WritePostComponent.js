import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import imageUrls from '../../JSONData/imageUrls.json';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
                    <Text style={{ fontSize: 18, lineHeight: 25, fontWeight: '500' }} allowFontScaling={false}>
                        글 쓰기
                    </Text>
                </View>

                <TouchableOpacity style={styles.RegisterBtn} onPress={RegOnPress}>
                    <Text style={{ fontSize: 15, color: 'white' }} allowFontScaling={false}>
                        완료
                    </Text>
                </TouchableOpacity>
            </View>
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={{ flexGrow: 1 }}
                scrollEnabled={true}
            >
                <View style={{ flex: 1 }}>
                    <View style={styles.WriteContaier}>
                        <TextInput
                            style={styles.WriteTitleView}
                            placeholder="제목"
                            placeholderTextColor="#979797"
                            value={Title}
                            onChangeText={setTitle}
                            fontSize={18}
                            allowFontScaling={false}
                        />
                        <View style={styles.WriteContentView}>
                            <ScrollView>
                                <TextInput
                                    style={{ textAlignVertical: 'top', padding: 8, top: '5%' }}
                                    multiline={true}
                                    numberOfLines={10}
                                    placeholder="내용을 입력하세요."
                                    placeholderTextColor="#979797"
                                    value={Content}
                                    onChangeText={setContent}
                                    fontSize={15}
                                    allowFontScaling={false}
                                />
                            </ScrollView>
                        </View>
                    </View>
                </View>
                <View style={styles.BottomContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text allowFontScaling={false}>사진 첨부</Text>
                        <Text style={styles.imageCountText}>{`(${image.length}/5)`}</Text>
                    </View>
                    <ScrollView horizontal={true} keyboardShouldPersistTaps="handled">
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            {image.map((item, index) => (
                                <View key={index} style={styles.ImageViewStyle}>
                                    <TouchableOpacity
                                        style={styles.deleteIconStyle}
                                        onPress={() => deleteImageOnPress(index)}
                                    >
                                        <Image
                                            source={{ uri: imageUrls?.post_delete }}
                                            style={{ width: 18, height: 18, resizeMode: 'contain' }}
                                        />
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
            </KeyboardAwareScrollView>
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
        height: 160,
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
        justifyContent: 'center',
    },
    deleteIconStyle: {
        position: 'absolute',
        top: 5,
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
