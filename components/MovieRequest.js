import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IconFiller from '../assets/icon-filler.png'

function MovieRequest({ navigation, route }) {
    const { color } = route.params;
    const { name } = route.params
    const { request } = route.params

    const styles = StyleSheet.create({
        mainView: {
            height: "100%",
            width: "100%",
            backgroundColor: color,
        },
        topHeader: {
            width: "100%",
            height: 100,
            alignItems: "center",
        },
        topHeaderLeftIcon: {
            position: "absolute",
            left: 20,
            bottom: 10
        },
        profilePicture: {
            width: 45,
            height: 45,
            marginBottom: 10
        },
        inner: {
            padding: 20,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 100
        },
        btnContainer: {
            backgroundColor: "white",
            marginTop: 12,
            width: "80%",
            borderRadius: 100,
            height: 50,
            justifyContent: "center",
            alignItems: "center"
        },
        btnContainerText: {
            color: color,
            fontWeight: "bold",
            fontSize: 18
        },
        name: {
            color: "white",
            fontSize: 16,
            marginBottom: 40
        },
        request: {
            fontWeight: "bold",
            color: "white",
            fontSize: 22,
            textAlign: "center",
            marginBottom: 40,
            width: "95%"
        }
    });

    return (
        <View style={styles.mainView}>
            <View style={styles.topHeader}>
                <TouchableOpacity style={styles.topHeaderLeftIcon} onPress={() => { navigation.goBack() }}>
                    <Ionicons name="chevron-back-outline" size={25} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.inner}>
                <Image style={styles.profilePicture} source={IconFiller}></Image>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.request}>{request}</Text>
                <TouchableOpacity style={styles.btnContainer} onPress={() => {navigation.navigate("SendRecommendation", {name: name, request: request, color: color})}}>
                    <Text style={styles.btnContainerText}>Send Recommendation</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MovieRequest;