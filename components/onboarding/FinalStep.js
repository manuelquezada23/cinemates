import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import PopUpImage from '../../assets/final-step-image.png'

function FinalStep({ navigation }) {
    return (
        <View style={styles.mainView}>
            <Image style={styles.image} source={PopUpImage} />
            <Text style={styles.title}>Final step!</Text>
            <Text style={styles.subTitle}>Play our 40 second game so we can learn more about what movies and television shows you enjoy!</Text>
            <TouchableOpacity style={[styles.button, { backgroundColor: "#FF3D60" }]} onPress={() => {navigation.navigate("InterestGuide")}}>
                <Text style={[styles.buttonText, { color: "white" }]}>Let's start!</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        resizeMode: "contain",
        width: 120,
        height: 120
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 30
    },
    subTitle: {
        fontSize: 14,
        marginTop: 20,
        width: "80%",
        textAlign: "center",
        marginBottom: 10
    },
    button: {
        width: "90%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        marginTop: 20,
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 16,
    }
});

export default FinalStep;
