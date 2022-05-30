import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import React, { useState } from 'react';
import RegisterProgressBar from './RegisterProgressBar';
import Ionicons from 'react-native-vector-icons/Ionicons';

function RegisterPassword({ navigation }) {
    const [text, onChangeText] = useState("");
    const [disabled, setDisabled] = useState(true)

    const [validPassword, setValidPassword] = useState(false)
    const [seePassword, setSeePassword] = useState(false)

    const [lowercaseLetter, setLowercaseLetter] = useState(false)
    const [capitalLetter, setCapitalLetter] = useState(false)
    const [number, setNumber] = useState(false)
    const [overEight, setOverEight] = useState(false)

    const onChangeInput = (text) => {
        onChangeText(text)

        if (text.length === 0) {
            setDisabled(true)
            setLowercaseLetter(false)
            setCapitalLetter(false)
            setNumber(false)
            setOverEight(false)
            setValidPassword(false)
        } else {
            setDisabled(false)
            if (isPasswordFormatted(text)) {
                setValidPassword(true)
            } else {
                setValidPassword(false)
            }
        }
    }

    function isPasswordFormatted(password) {
        let formattedPassword = true;

        let hasLowercaseLetter = /[a-z]/;
        if (hasLowercaseLetter.test(password)) {
            setLowercaseLetter(true)
        } else {
            setLowercaseLetter(false)
            formattedPassword = false;
        }

        let hasCapitalLetter = /[A-Z]/;
        if (hasCapitalLetter.test(password)) {
            setCapitalLetter(true)
        } else {
            setCapitalLetter(false)
            formattedPassword = false;
        }

        let number = /\d/;
        if (number.test(password)) {
            setNumber(true)
        } else {
            setNumber(false)
            formattedPassword = false;
        }

        if (password.length > 8) {
            setOverEight(true)
        } else {
            setOverEight(false)
            formattedPassword = false;
        }

        return formattedPassword;
    }

    return (
        <View style={styles.mainView}>
            <RegisterProgressBar navigation={navigation} progress="80%" />
            <View style={styles.subView}>
                <Text style={styles.title}>My password</Text>
                <Text style={styles.title}>is</Text>

                <Text style={styles.inputInfo}>PASSWORD</Text>
                <View>
                    <TextInput
                        style={[styles.input, { borderBottomColor: disabled ? "black" : "#E9E9E9" }]}
                        selectionColor={"#FF3D60"}
                        onChangeText={onChangeInput}
                        autoCapitalize={"none"}
                        value={text}
                        secureTextEntry={seePassword ? false : true}
                    />
                    <TouchableOpacity style={styles.viewPassword}
                        onPress={() => {
                            const newStatus = !seePassword;
                            setSeePassword(newStatus)
                        }}>
                        <Ionicons name={seePassword ? "eye-off-outline" : "eye-outline"} size={20} color={"#A6A6A7"} />
                    </TouchableOpacity>
                </View>
                <View style={{ display: "flex", flexDirection: "row", marginBottom: -5 }}>
                    <Ionicons style={styles.checkmark} name="checkmark" size={15} color={lowercaseLetter ? "#17A35F" : "#A6A6A7"} />
                    <Text style={[styles.info, { color: lowercaseLetter ? "#17A35F" : "#A6A6A7" }]}>A lowercase letter</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", marginBottom: -5 }}>
                    <Ionicons style={styles.checkmark} name="checkmark" size={15} color={capitalLetter ? "#17A35F" : "#A6A6A7"} />
                    <Text style={[styles.info, { color: capitalLetter ? "#17A35F" : "#A6A6A7" }]}>A capital letter</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", marginBottom: -5 }}>
                    <Ionicons style={styles.checkmark} name="checkmark" size={15} color={number ? "#17A35F" : "#A6A6A7"} />
                    <Text style={[styles.info, { color: number ? "#17A35F" : "#A6A6A7" }]}>A number</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", marginBottom: -5 }}>
                    <Ionicons style={styles.checkmark} name="checkmark" size={15} color={overEight ? "#17A35F" : "#A6A6A7"} />
                    <Text style={[styles.info, { color: overEight ? "#17A35F" : "#A6A6A7" }]}>Over 8 characters</Text>
                </View>
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <TouchableOpacity disabled={validPassword ? false : true} style={[styles.btnContainer, { backgroundColor: validPassword ? "#FF3D60" : "#D2D3D3" }]} onPress={() => { navigation.navigate("SyncContactsPopUp") }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16, color: "white" }}>Done</Text>
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
    viewPassword: {
        position: "absolute",
        right: 30,
        bottom: 10,
    },
    checkmark: {
        marginTop: 7,
        marginRight: 5
    }
});

export default RegisterPassword;
