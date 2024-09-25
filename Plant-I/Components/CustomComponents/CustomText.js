import React from 'react';
import { Text } from 'react-native';

const CustomText = ({ style, addStyles, children, bold, black, light, medium, semiBold, ...props }) => {
    let fontFamily = 'NotoSansKR';

    if (bold) fontFamily = 'NotoSansKRBold';
    else if (black) fontFamily = 'NotoSansKRBlack';
    else if (light) fontFamily = 'NotoSansKRLight';
    else if (medium) fontFamily = 'NotoSansKRMedium';
    else if (semiBold) fontFamily = 'NotoSansKRSemiBold';

    return (
        <Text {...props} style={[style, { fontFamily }, addStyles]}>
            {children}
        </Text>
    );
};

export default CustomText;
