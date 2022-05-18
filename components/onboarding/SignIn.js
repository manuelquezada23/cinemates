import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import MainButton from '../MainButton'
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

function SignIn({ navigation }) {

    const [userNameOrEmail, setUserNameOrEmail] = useState('')
    const [password, setPassword] = useState('')
    const [seePassword, setSeePassword] = useState(false)

    function signInToCinemates() {
        if (userNameOrEmail.length !== 0 && password.length !== 0) {
            navigation.navigate("Main");
        } else {
            Alert.alert("One of the required fields was left blank");
        }
    }


    return (
        <View style={styles.mainView}>
            <View style={styles.inputs}>
                <TextInput autoCapitalize='none' style={styles.input} selectionColor={"black"} placeholder="Username or Email Address" value={userNameOrEmail} onChangeText={(text) => { setUserNameOrEmail(text) }}></TextInput>
                <View>
                    <TextInput secureTextEntry={seePassword ? false : true} autoCapitalize='none' style={styles.input} selectionColor={"black"} placeholder="Password" value={password} onChangeText={(text) => { setPassword(text) }}></TextInput>
                    <TouchableOpacity style={styles.viewPasswordIcon} onPress={() => { seePassword ? setSeePassword(false) : setSeePassword(true) }}>
                        <Ionicons name={seePassword ? "eye-off-outline" : "eye-outline"} color="#777777" size={20}></Ionicons>
                    </TouchableOpacity>
                </View>
            </View>
            <MainButton buttonColor="#FF3D60" textColor="white" text="Sign In" onPress={() => signInToCinemates()} />
            <Text style={styles.textLogIn} onPress={() => navigation.navigate("Sign Up Your Account")}>Don't have an account? <Text style={styles.bold} onPress={() => navigation.navigate("Sign Up Your Account")}>Sign Up</Text></Text>
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
    },
    input: {
        height: 50,
        margin: 12,
        borderRadius: 8,
        borderWidth: 2,
        padding: 10,
        borderColor: "#F2F2F2",
        marginBottom: 0
    },
    textLogIn: {
        margin: 0,
        color: "#777777"
    },
    bold: {
        fontWeight: "bold",
        color: "black"
    },
    viewPasswordIcon: {
        position: "absolute",
        right: 0,
        marginRight: 25,
        marginTop: 27
    }
});

export default SignIn;
