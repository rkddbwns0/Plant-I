import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import CustomText from '../CustomComponents/CustomText';
import { TopContainerComponent } from '../TopContainerComponents/TopContainerComponent';
import * as Progress from 'react-native-progress';

const QuestionComponents = ({ image, currentPage, totalPages, questionNnum, questionText, onBack }) => {
    const [progress, setProgress] = useState(currentPage / totalPages);

    useEffect(() => {
        setProgress(currentPage / totalPages);
    }, [currentPage, totalPages]);

    return (
        <View style={styles.container}>
            <TopContainerComponent onPress={onBack} />
            <View style={styles.progressView}>
                <Progress.Bar
                    progress={progress}
                    width={300}
                    height={20}
                    color="#3DC373"
                    borderRadius={20}
                    borderColor="#F8F8F8"
                    unfilledColor="#F8F8F8"
                />
            </View>
            <View style={styles.topTextView}>
                <CustomText bold style={styles.questionNumText} allowFontScaling={false}>
                    {questionNnum}
                </CustomText>
                <CustomText bold style={styles.qustionText} allowFontScaling={false}>
                    {questionText}
                </CustomText>
            </View>
            <View style={styles.imageView}>
                <Image source={{ uri: image }} style={styles.imageStyle} />
            </View>
        </View>
    );
};

export default QuestionComponents;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    progressView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 40,
    },
    topTextView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    questionNumText: {
        fontSize: 20,
        lineHeight: 25,
        color: '#1C4723',
    },
    qustionText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#1C4723',
        lineHeight: 30,
    },
    imageView: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        width: '75%',
        height: 270,
        borderRadius: 20,
    },
    btnView: {
        alignItems: 'center',
        marginVertical: '3%',
        bottom: '3%',
    },
});
