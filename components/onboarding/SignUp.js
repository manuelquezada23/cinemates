import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import MainButton from '../MainButton';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

function SignUp({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')
    const [seePassword, setSeePassword] = useState(false)
    const [seeConfirmPassword, setSeeConfirmPassword] = useState(false)

    function signUpToCinemates() {
        if (email.length !== 0 && password.length !== 0 && confirmPassword.length !== 0 && username.length !== 0) {
            if (password !== confirmPassword) {
                Alert.alert("Passwords do not match");
            } else {
                navigation.navigate("Sync Contacts")
            }
        } else {
            Alert.alert("One of the required fields was left blank");
        }
    }

    return (
        <View style={styles.mainView}>
            <View style={styles.inputs}>
                <TextInput autoCapitalize='none' style={styles.input} selectionColor={"black"} placeholder="Email Address" value={email} onChangeText={(text) => { setEmail(text) }}></TextInput>
                <View>
                    <TextInput secureTextEntry={seePassword ? false : true} autoCapitalize='none' style={styles.input} selectionColor={"black"} placeholder="Password" value={password} onChangeText={(text) => { setPassword(text) }}></TextInput>
                    <TouchableOpacity style={styles.viewPasswordIcon} onPress={() => { seePassword ? setSeePassword(false) : setSeePassword(true) }}>
                        <Ionicons name={seePassword ? "eye-off-outline" : "eye-outline"} color="#777777" size={20}></Ionicons>
                    </TouchableOpacity>
                </View>
                <View>
                    <TextInput secureTextEntry={seeConfirmPassword ? false : true} autoCapitalize='none' style={styles.input} selectionColor={"black"} placeholder="Confirm Password" value={confirmPassword} onChangeText={(text) => { setConfirmPassword(text) }}></TextInput>
                    <TouchableOpacity style={styles.viewPasswordIcon} onPress={() => { seeConfirmPassword ? setSeeConfirmPassword(false) : setSeeConfirmPassword(true) }}>
                        <Ionicons name={seeConfirmPassword ? "eye-off-outline" : "eye-outline"} color="#777777" size={20}></Ionicons>
                    </TouchableOpacity>
                </View>
                <TextInput autoCapitalize='none' style={styles.input} selectionColor={"black"} placeholder="Username" value={username} onChangeText={(text) => { setUsername(text) }}></TextInput>
            </View>
            <MainButton buttonColor="#FF3D60" textColor="white" text="Sign Up" onPress={() => signUpToCinemates()} />
            <Text style={styles.textLogIn} onPress={() => navigation.navigate("Sign In Your Account")}>Already have an account? <Text style={styles.bold} onPress={() => navigation.navigate("Sign In Your Account")}>Sign In</Text></Text>
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

export default SignUp;
