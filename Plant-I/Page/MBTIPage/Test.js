import React from 'react';
import Start from '../../Components/MBTIComponents/Start';
import { useNavigation } from '@react-navigation/native';

const Test = () => {
    const navigation = useNavigation();
    return <Start onPress={() => navigation.navigate('MbtiQuestions')} />;
};

export default Test;
