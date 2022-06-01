import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import RegisterProgressBar from './RegisterProgressBar';
import Ionicons from 'react-native-vector-icons/Ionicons';

function CreateNewPassword({ navigation }) {
    const [password, onChangePassword] = useState("");
    const [confirmPassword, onChangeConfirmPassword] = useState("")

    const [passwordDisabled, setPasswordDisabled] = useState(true)
    const [confirmPasswordDisabled, setConfirmPasswordDisabled] = useState(true)

    const [validPassword, setValidPassword] = useState(false)
    const [seePassword, setSeePassword] = useState(false)
    const [seeConfirmPassword, setSeeConfirmPassword] = useState(false)

    const [lowercaseLetter, setLowercaseLetter] = useState(false)
    const [capitalLetter, setCapitalLetter] = useState(false)
    const [number, setNumber] = useState(false)
    const [overEight, setOverEight] = useState(false)

    const [infoMessage, setInfoMessage] = useState('')
    const [passwordsMatch, setPasswordsMatch] = useState(false)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Ionicons name="chevron-back-outline" size={25} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        if ((password === confirmPassword) && validPassword) {
            setPasswordsMatch(true)
            setInfoMessage('')
        } else {
            setPasswordsMatch(false)
            if (confirmPassword.length !== 0) {
                setInfoMessage('Passwords do not match.')
            }
        }
    })

    const onChangeInput = (text) => {
        onChangePassword(text)

        if (text.length === 0) {
            setPasswordDisabled(true)
            setLowercaseLetter(false)
            setCapitalLetter(false)
            setNumber(false)
            setOverEight(false)
            setValidPassword(false)
        } else {
            setPasswordDisabled(false)
            if (isPasswordFormatted(text)) {
                setValidPassword(true)
            } else {
                setValidPassword(false)
            }
        }
    }

    const onChangeConfirmInput = (text) => {
        onChangeConfirmPassword(text)

        if (text.length === 0) {
            setConfirmPasswordDisabled(true)
            setPasswordsMatch(false)
            setInfoMessage('')
        } else {
            setConfirmPasswordDisabled(false)
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
            <View style={styles.subView}>
                <Text style={styles.inputInfo}>NEW PASSWORD</Text>
                <View>
                    <TextInput
                        style={[styles.input, { borderBottomColor: passwordDisabled ? "black" : "#E9E9E9" }]}
                        selectionColor={"#FF3D60"}
                        onChangeText={onChangeInput}
                        autoCapitalize={"none"}
                        value={password}
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

                <Text style={styles.inputInfo}>CONFIRM NEW PASSWORD</Text>
                <View>
                    <TextInput
                        style={[styles.input, { borderBottomColor: confirmPasswordDisabled ? "black" : (passwordsMatch ? "#E9E9E9" : "#FF3D3E") }]}
                        selectionColor={"#FF3D60"}
                        onChangeText={onChangeConfirmInput}
                        autoCapitalize={"none"}
                        value={confirmPassword}
                        secureTextEntry={seeConfirmPassword ? false : true}
                    />
                    <TouchableOpacity style={styles.viewPassword}
                        onPress={() => {
                            const newStatus = !seeConfirmPassword;
                            setSeeConfirmPassword(newStatus)
                        }}>
                        <Ionicons name={seeConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color={"#A6A6A7"} />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.info, { color: passwordsMatch ? "black" : "#FF3D3E" }]}>{infoMessage}</Text>

                <TouchableOpacity disabled={passwordsMatch ? false : true} style={[styles.btnContainer, { backgroundColor: passwordsMatch ? "#FF3D60" : "#D2D3D3" }]} onPress={() => { navigation.navigate("SignIn") }}>
                    <Text style={{ fontWeight: "bold", fontSize: 16, color: "white" }}>Save</Text>
                </TouchableOpacity>
            </View>
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
        marginTop: -10
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
        fontWeight: "bold",
        marginTop: 20
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

export default CreateNewPassword;
