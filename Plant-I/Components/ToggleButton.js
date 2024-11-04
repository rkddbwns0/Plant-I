import React, { useRef, useState } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';

const ToggleButton = ({ onToggle }) => {
    const [isToggled, setIsToggled] = useState(false);
    const toggleAnim = useRef(new Animated.Value(0)).current;

    const handleToggle = () => {
        const toValue = isToggled ? 0 : 1;
        Animated.timing(toggleAnim, {
            toValue,
            duration: 300,
            useNativeDriver: false,
        }).start();
        setIsToggled(!isToggled);

        if (onToggle) {
            onToggle(toValue);
        }
    };

    const toggleBackgroundStyle = {
        backgroundColor: toggleAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['#ccc', '#66bb6a'],
        }),
    };

    const toggleStyle = {
        transform: [
            {
                translateX: toggleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 30],
                }),
            },
        ],
        backgroundColor: toggleAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['white', 'white'],
        }),
    };
    return (
        <TouchableOpacity onPress={handleToggle}>
            <Animated.View style={[styles.toggleBackground, toggleBackgroundStyle]}>
                <Animated.View style={[styles.toggleButton, toggleStyle]} />
            </Animated.View>
        </TouchableOpacity>
    );
};

export default ToggleButton;

const styles = StyleSheet.create({
    toggleBackground: {
        width: 60,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        padding: 3,
    },
    toggleButton: {
        width: 25,
        height: 25,
        borderRadius: 15,
    },
});
