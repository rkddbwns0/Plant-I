import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import QuestionComponents from '../../Components/MBTIComponents/QuestionComponents';
import imageUrls from '../../JSONData/imageUrls.json';
import { useNavigation } from '@react-navigation/native';
import questionsData from '../../JSONData/question.json';

const MbtiQuestions = () => {
    const navigation = useNavigation();
    const [currentPage, setCurrentPage] = useState(1);
    const [mbtiCounts, setMbtiCounts] = useState({ I: 0, E: 0, P: 0, J: 0 });
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectAnswers, setSelectAnswers] = useState({});

    const questions = [
        {
            question: questionsData.question1.question,
            answers: questionsData.question1.answers,
        },
        {
            question: questionsData.question2.question,
            answers: questionsData.question2.answers,
        },
        ...questionsData.ieQuestions,
        ...questionsData.jpQuestions,
    ];

    const totalPages = questions.length;

    const currentQuestion = questions[questionIndex];

    const handleAnswer = (mbtiType, answerValue) => {
        if (questionIndex < 2) {
            setSelectAnswers((prev) => ({
                ...prev,
                [`answer${questionIndex + 1}`]: answerValue,
            }));
        }

        if (mbtiType) {
            setMbtiCounts((prevCounts) => ({
                ...prevCounts,
                [mbtiType]: prevCounts[mbtiType] + 1,
            }));
        }

        if (questionIndex < questions.length - 1) {
            setQuestionIndex(questionIndex + 1);
            setCurrentPage((prevPage) => prevPage + 1);
        } else {
            const ie = mbtiCounts.I >= mbtiCounts.E ? 'I' : 'E';
            const jp = mbtiCounts.J >= mbtiCounts.P ? 'J' : 'P';
            const resultMbti = `${ie}${jp}`;

            navigation.navigate('Result', { selectAnswers, resultMbti });
        }
    };

    const questionImages = (page) => {
        switch (page) {
            case 1:
                return imageUrls.question1;
            case 2:
                return imageUrls.question2;
            case 3:
                return imageUrls.question3;
            default:
                return imageUrls.mbti;
        }
    };

    const handleBack = () => {
        if (questionIndex > 0) {
            setQuestionIndex(questionIndex - 1);
            setCurrentPage((prevPage) => prevPage - 1);
        } else {
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <QuestionComponents
                image={questionImages(currentPage)}
                questionNnum={`Q${currentPage}`}
                questionText={currentQuestion.question}
                currentPage={currentPage}
                totalPages={totalPages}
                onBack={handleBack}
            />
            <View style={styles.btnContainer}>
                {questionIndex === 0 ? (
                    <View style={styles.gridContainer}>
                        {currentQuestion.answers.map((answer, index) => (
                            <View key={index} style={styles.gridView}>
                                <TouchableOpacity
                                    style={styles.btnStyles}
                                    onPress={() => handleAnswer(answer.mbti, answer.value)}
                                >
                                    <Text style={styles.btnText} allowFontScaling={false}>
                                        {answer.text || answer.value}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                ) : (
                    currentQuestion.answers.map((answer, index) => (
                        <View key={index} style={styles.btnView}>
                            <TouchableOpacity
                                style={styles.btnStyles}
                                onPress={() => handleAnswer(answer.mbti, answer.value)}
                            >
                                <Text style={styles.btnText} allowFontScaling={false}>
                                    {answer.text || answer.value}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </View>
        </View>
    );
};

export default MbtiQuestions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    btnContainer: {
        flex: 1,
        maxHeight: 230,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: '10%',
        marginVertical: '3%',
    },
    gridView: {
        width: '50%',
        alignItems: 'center',
        marginVertical: '3%',
    },
    btnView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '5%',
        marginVertical: '3%',
    },
    btnStyles: {
        backgroundColor: '#F9F9F9',
        width: '80%',
        height: 50,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1%',
    },
    btnText: {
        fontSize: 14,
        lineHeight: 20,
    },
});
