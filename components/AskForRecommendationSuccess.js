import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChillAndRelaxIcon from '../assets/chillAndRelaxIcon.png'

function AskForRecommendationSuccess() {
    const navigation = useNavigation();

    return (
        <View style={styles.mainView}>
            <Image source={ChillAndRelaxIcon} style={styles.icon} />
            <Text style={styles.title}>Just Chill & Relax</Text>
            <Text style={styles.subtitle}>Your friends will send you the best recommendation as per your request</Text>
            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("Cinemates") }}>
                <Text style={styles.buttonText}>Explore More</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        width: "90%",
        resizeMode: "contain"
    },
    title: {
        fontWeight: "bold",
        fontSize: 26,
        marginTop: 50,
    },
    subtitle: {
        color: "#797A7C",
        fontSize: 14,
        width: "65%",
        textAlign: "center",
        marginTop: 10
    },
    button: {
        backgroundColor: "#FF3D60",
        borderRadius: 100,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        width: 140,
        marginTop: 50
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    }
});

export default AskForRecommendationSuccess;