import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import React, { useState } from 'react';
import RegisterProgressBar from './RegisterProgressBar';
import Ionicons from 'react-native-vector-icons/Ionicons';

function RegisterEmail({ navigation }) {
    const [text, onChangeText] = useState("");
    const [infoMessage, setInfoMessage] = useState("")
    const [validEmail, setValidEmail] = useState(false)

    const onChangeInput = (text) => {
        onChangeText(text)

        if (text.length === 0) {
            setInfoMessage("")
            setValidEmail(false)
        } else {
            if (checkEmail(text) === true) {
                setValidEmail(true)
                setInfoMessage("")
            } else {
                setValidEmail(false)
                setInfoMessage("Invalid Email Address")
            }
        }
    }

    function checkEmail(email) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        return reg.test(email)
    }

    return (
        <View style={styles.mainView}>
            <RegisterProgressBar navigation={navigation} progress="40%" />
            <View style={styles.subView}>
                <Text style={styles.title}>My email</Text>
                <Text style={styles.title}>address is</Text>

                <Text style={styles.inputInfo}>EMAIL ADDRESS</Text>
                <View>
                    <TextInput
                        style={[styles.input, { borderBottomColor: (text.length === 0) ? "black" : (validEmail ? "#E9E9E9" : "#FF3D3E") }]}
                        selectionColor={"#FF3D60"}
                        onChangeText={onChangeInput}
                        autoCapitalize={"none"}
                        value={text}
                    />
                    <View style={[styles.checkmark, { display: validEmail ? "" : "none" }]}>
                        <Ionicons name="checkmark" size={20} color={"#17A35F"} />
                    </View>
                </View>
                <Text style={styles.info}>{infoMessage}</Text>
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <TouchableOpacity disabled={validEmail ? false : true} style={[styles.btnContainer, { backgroundColor: validEmail ? "#FF3D60" : "#D2D3D3" }]} onPress={() => { navigation.navigate("RegisterUsername") }}>
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
        marginRight: 30,
        borderBottomColor: "black"
    },
    info: {
        marginTop: 10,
        color: "#A6A6A7",
        fontSize: 10,
        color: "#FF3D3E"
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
    },
    checkmark: {
        position: "absolute",
        right: 30,
        bottom: 10,
    }
});

export default RegisterEmail;
