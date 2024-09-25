import React from 'react';
import { TextInput } from 'react-native';
import { useFonts } from 'expo-font';

const CustomInput = (props) => {
    const [fontsLoaded] = useFonts({
        NotoSansKR: require('../../assets/fonts/NotoSansKR-Regular.ttf'),
        NotoSansKRBold: require('../../assets/fonts/NotoSansKR-Bold.ttf'),
        NotoSansKRBlack: require('../../assets/fonts/NotoSansKR-Black.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    let fontFamily = 'NotoSansKR';

    if (props.bold) {
        fontFamily = 'NotoSansKRBold';
    }

    if (props.black) {
        fontFamily = 'NotoSansKRBlack';
    }

    return (
        <TextInput
            {...props}
            style={{
                ...props.style,
                fontFamily: fontFamily,
                includeFontPadding: false,
                fontSize: props.fontSize || 14,
            }}
        />
    );
};

export default CustomInput;
