import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import React, { useState } from 'react';
import RegisterProgressBar from './RegisterProgressBar';

function RegisterLastName({ navigation }) {
    const [text, onChangeText] = useState("");
    const [disabled, setDisabled] = useState(true)

    const onChangeInput = (text) => {
        onChangeText(text)

        if (text.length === 0) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }

    return (
        <View style={styles.mainView}>
            <RegisterProgressBar navigation={navigation} progress="20%" />
            <View style={styles.subView}>
                <Text style={styles.title}>My last</Text>
                <Text style={styles.title}>name is</Text>

                <Text style={styles.inputInfo}>LAST NAME</Text>
                <TextInput
                    style={[styles.input, { borderBottomColor: disabled ? "black" : "#E9E9E9" }]}
                    selectionColor={"#FF3D60"}
                    onChangeText={onChangeInput}
                    value={text}
                />
                <Text style={styles.info}>This is how it will appear in Cinemates</Text>
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <TouchableOpacity disabled={disabled ? true : false} style={[styles.btnContainer, { backgroundColor: disabled ? "#D2D3D3" : "#FF3D60" }]} onPress={() => { navigation.navigate("RegisterEmail") }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16, color: "white" }}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        width: "100%",
        height: "100%",
    },
    subView: {
        marginLeft: 30,
        marginTop: 25,
    },
    title: {
        fontSize: 32,
        lineHeight: 44,
        fontWeight: "bold",
    },
    inputInfo: {
        marginTop: 35,
        color: "#A6A6A7",
        fontSize: 12
    },
    input: {
        height: 40,
        fontSize: 18,
        borderBottomWidth: 1,
        marginRight: 30
    },
    info: {
        marginTop: 10,
        color: "#A6A6A7",
        fontSize: 10
    },
    container: {
        flex: 1
    },
    inner: {
        width: "100%",
        flex: 1,
        justifyContent: "flex-end",
        marginTop: 10,
        alignItems: "center"
    },
    btnContainer: {
        marginBottom: 20,
        width: "90%",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        color: "white",
        fontWeight: "bold"
    }
});

export default RegisterLastName;
