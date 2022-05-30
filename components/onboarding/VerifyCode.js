import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import MainButton from '../MainButton'
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

function VerifyCode({ navigation, route }) {

    const [email, setEmail] = useState('')

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Ionicons name="chevron-back-outline" size={25} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    function action() {
        //here you would do whatever you want with the email
        navigation.navigate("VerifyCode")
    }

    return (
        <View style={styles.mainView}>
            <Text style={styles.title}>Please enter the 6 digit code sent to <Text style={{fontWeight: "bold"}}>{route.params.email}</Text></Text>
            <Text style={styles.resend}>Resend Code</Text>
            
            {/* <View style={styles.inputs}>
                <Text style={styles.inputInfo}>EMAIL ADDRESS</Text>
                <TextInput
                    style={styles.input}
                    selectionColor={"#FF3D60"}
                    onChangeText={(text) => { setEmail(text) }}
                    value={email}
                    autoCapitalize={"none"}
                />
            </View> */}
            <MainButton buttonColor="#FF3D60" textColor="white" text="Verify" onPress={() => action()} />
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
    title: {
        fontSize: 14,
        textAlign: "center",
        marginTop: 30,
        marginBottom: 40,
        width: "85%",
        lineHeight: 23,
    },
    resend: {
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20
    }
});

export default VerifyCode;
