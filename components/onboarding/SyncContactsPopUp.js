import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import PopUpImage from '../../assets/sync-contacts-popup.png'

function SyncContactsPopUp({ navigation }) {
    return (
        <View style={styles.mainView}>
            <Image style={styles.image} source={PopUpImage} />
            <Text style={styles.title}>Sync your contacts</Text>
            <Text style={styles.subTitle}>Allow "Cinemates" to sync your contacts while you are using the app</Text>
            <TouchableOpacity style={[styles.button, { backgroundColor: "#FF3D60" }]} onPress={() => {navigation.navigate("SyncContacts")}}>
                <Text style={[styles.buttonText, { color: "white" }]}>Allow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: "white", borderColor: "#FF3D60", borderWidth: 1 }]} onPress={() => {navigation.navigate("Main")}}>
                <Text style={[styles.buttonText, { color: "#FF3D60" }]}>Don't Allow</Text>
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
        resizeMode: "contain"
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
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        marginTop: 20,
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 14,
    }
});

export default SyncContactsPopUp;
