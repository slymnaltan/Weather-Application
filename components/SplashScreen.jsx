import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Home');
        }, 2000);
    }, []);

    return (
        <View style={styles.splashContainer}>
            <Image source={require('../assets/rain-bg.jpg')} style={styles.logo} />
            <Text style={styles.appName}>WeatherApp</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    splashContainer: {
        backgroundColor:"lightblue",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
    },
});

export default SplashScreen;
