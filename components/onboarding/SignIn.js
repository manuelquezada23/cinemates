import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import MainButton from '../MainButton'
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

function SignIn({ navigation }) {

    const [username, setUserNameOrEmail] = useState('')
    const [password, setPassword] = useState('')
    const [seePassword, setSeePassword] = useState(false)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Ionicons name="chevron-back-outline" size={25} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    function signInToCinemates() {
        if (username.length !== 0 && password.length !== 0) {
            navigation.navigate("Main");
        } else {
            Alert.alert("One of the required fields was left blank");
        }
    }

    return (
        <View style={styles.mainView}>
            <View style={styles.inputs}>
                <Text style={styles.inputInfo}>USER NAME</Text>
                <TextInput
                    style={styles.input}
                    selectionColor={"#FF3D60"}
                    onChangeText={(text) => { setUserNameOrEmail(text) }}
                    value={username}
                    autoCapitalize={"none"}
                />
                <Text style={styles.inputInfo}>PASSWORD</Text>
                <View>
                    <TextInput
                        style={styles.input}
                        selectionColor={"#FF3D60"}
                        onChangeText={(text) => { setPassword(text) }}
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
                <TouchableOpacity onPress={() => {navigation.navigate("ForgotPassword")}}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
            <MainButton buttonColor="#FF3D60" textColor="white" text="Sign In" onPress={() => signInToCinemates()} />
            <TouchableOpacity onPress={() => navigation.navigate("RegisterFirstName")}><Text style={styles.textLogIn}>Don't have an account? <Text style={styles.bold}>Create One</Text></Text></TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center"
    },
    inputs: {
        width: "100%",
        marginTop: 10,
        marginBottom: 5
    },
    inputInfo: {
        marginTop: 15,
        color: "#A6A6A7",
        fontSize: 12,
        marginLeft: 20
    },
    input: {
        height: 40,
        fontSize: 18,
        borderBottomWidth: 1,
        marginRight: 30,
        marginLeft: 20,
        borderBottomColor: "#E9E9E9"
    },
    viewPassword: {
        position: "absolute",
        right: 30,
        bottom: 10,
    },
    textLogIn: {
        marginTop: 10,
        color: "black"
    },
    bold: {
        fontWeight: "bold",
        color: "#FF3D60"
    },
    viewPasswordIcon: {
        position: "absolute",
        right: 0,
        marginRight: 25,
        marginTop: 27
    },
    forgotPassword: {
        marginTop: 30,
        marginBottom: 20,
        textAlign: "right",
        marginRight: 20,
        fontWeight: "bold"
    }
});

export default SignIn;
