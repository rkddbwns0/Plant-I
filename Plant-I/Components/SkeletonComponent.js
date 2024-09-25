import React, { useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const SkeletonComponent = () => {
    const animation = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.loop(
            Animated.timing(animation, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(animation, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            })
        ).start();
    }, [animation]);

    const backgroundColor = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['#E1E9EE', '#F2F8FC'],
    });

    return (
        <View style={styles.SkeletonContainer}>
            <View style={{ flexDirection: 'row' }}>
                <Animated.View style={[styles.WeatherIconView, { backgroundColor }]} />
                <Animated.View style={[styles.WeatherDataView, { backgroundColor }]} />
                <View style={styles.ContentContainer}>
                    <Animated.View style={[styles.ContentView, { backgroundColor }]} />
                    <Animated.View style={[styles.ContentView, { backgroundColor }]} />
                </View>
            </View>
        </View>
    );
};

export default SkeletonComponent;

const styles = StyleSheet.create({
    SkeletonContainer: {
        flex: 1,
        width: '95%',
        maxHeight: '11%',
        borderWidth: 1,
        borderColor: '#ECEEE9',
        borderRadius: 5,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    WeatherIconView: {
        width: '13%',
        height: 45,
        borderRadius: 10,
        marginLeft: '2%',
        marginRight: '1%',
    },
    WeatherDataView: {
        width: '25%',
        height: 45,
        borderRadius: 10,
    },
    ContentContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ContentView: {
        width: '90%',
        height: 20,
        borderRadius: 5,
        marginVertical: '1%',
    },
});
