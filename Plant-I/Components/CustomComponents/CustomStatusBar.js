import React from 'react';
import { StatusBar } from 'react-native';

const CustomStatusBar = ({ color, translucent }) => {
    return <StatusBar backgroundColor={color} barStyle="dark-content" animated={true} translucent={translucent} />;
};
export default CustomStatusBar;
