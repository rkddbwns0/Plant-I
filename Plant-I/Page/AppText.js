import React from "react";
import { Text } from "react-native";
import { useFonts } from "expo-font";

const AppText = (props) => {
    const [fontsLoaded] = useFonts({
        Binggrae: require("../assets/fonts/Binggrae-Bold.ttf"),
    });

    if(!fontsLoaded) {
        return null;
    }

    return (
        <Text
            {...props}
            style = {{
                ...props.style,
                fontFamily: props.bold ? "Binggrae-Bold" : "Binggrae",
            }}
        >
            {props.children}
        </Text>
    );
};

export default AppText;