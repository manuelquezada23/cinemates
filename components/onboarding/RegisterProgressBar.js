import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

function RegisterProgressBar(props) {

    const styles = StyleSheet.create({
        header: {
            width: "100%",
            height: 100,
        },
        goBack: {
            position: "absolute",
            left: 20,
            bottom: 0,
            paddingBottom: 15
        },
        progressBar: {
            width: "100%",
            height: 5,
            backgroundColor: "#E9E9E9",
            position: "absolute",
            bottom: 0
        },
        progress: {
            backgroundColor: "red",
            width: props.progress,
            height: 5
        }
    });

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => { props.navigation.goBack() }} style={styles.goBack}>
                <Ionicons name="chevron-back-outline" size={25} />
            </TouchableOpacity>
            <View style={styles.progressBar}>
                <View style={styles.progress}></View>
            </View>
        </View>
    );
}

export default RegisterProgressBar;
