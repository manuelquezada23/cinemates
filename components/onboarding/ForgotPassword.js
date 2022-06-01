import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import MainButton from '../MainButton'
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

function ForgotPassword({ navigation }) {

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Ionicons name="chevron-back-outline" size={25} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const onChangeValue = (text) => {
        setEmail(text)
        if (checkEmail(text)) {
            setValidEmail(true)
        } else {
            setValidEmail(false)
        }
    }


    function action() {
        //here you would do whatever you want with the email e.g. (check if email is registered to the app)
        navigation.navigate("VerifyCode", { email: email })
    }

    function checkEmail(email) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        return reg.test(email)
    }

    return (
        <View style={styles.mainView}>
            <Text style={styles.largeTitle}>Please enter your registered email address to receive your verification code</Text>
            <View style={styles.inputs}>
                <Text style={styles.inputInfo}>EMAIL ADDRESS</Text>
                <TextInput
                    style={styles.input}
                    selectionColor={"#FF3D60"}
                    onChangeText={onChangeValue}
                    value={email}
                    autoCapitalize={"none"}
                />
            </View>
            <MainButton buttonColor={validEmail ? "#FF3D60" : "#D2D3D3"} textColor="white" text="Send" onPress={() => action()} disabled={validEmail ? false : true}/>
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
        marginBottom: 25
    },
    largeTitle: {
        fontSize: 14,
        textAlign: "center",
        marginTop: 30,
        marginBottom: 40,
        width: "85%",
        lineHeight: 23,
    },
    inputInfo: {
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
    },
});

export default ForgotPassword;
