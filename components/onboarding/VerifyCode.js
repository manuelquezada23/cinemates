import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import MainButton from '../MainButton'
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

function VerifyCode({ navigation, route }) {
    const userEmail = route.params.email
    const [verificationCode, setValue] = useState('');
    const ref = useBlurOnFulfill({ value: verificationCode, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value: verificationCode, setValue, });
    const [validCode, setValidCode] = useState(false)

    const CELL_COUNT = 6;

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
        if (verificationCode.length < 6) {
            setValidCode(false)
        } else {
            setValidCode(true)
        }
    })

    function action() {
        //here you would do whatever you want with the email
        navigation.navigate("CreateNewPassword")
    }

    function resendCode() {
        Alert.alert("A code was resent to " + userEmail);
    }

    return (
        <View style={styles.mainView}>
            <Text style={styles.largeTitle}>Please enter the 6 digit code sent to <Text style={{ fontWeight: "bold" }}>{userEmail}</Text></Text>
            <CodeField
                ref={ref}
                {...props}
                value={verificationCode}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />

            <TouchableOpacity onPress={() => { resendCode() }}><Text style={styles.resend}>Resend Code</Text></TouchableOpacity>
            <MainButton buttonColor={validCode ? "#FF3D60" : "#D2D3D3"} textColor="white" text="Verify" onPress={() => action()} disabled={validCode ? false : true}/>
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
    largeTitle: {
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
    },

    root: {
        flex: 1, padding: 20
    },
    title: {
        textAlign: 'center', fontSize: 30
    },
    codeFieldRoot: {
        marginTop: -10,
        width: "90%"
    },
    cell: {
        width: 42,
        height: 42,
        justifyContent: "center",
        alignItems: "center",
        fontSize: 24,
        lineHeight: 35,
        borderWidth: 2,
        borderColor: '#E9E9E9',
        textAlign: 'center',
        borderRadius: 5
    },
    focusCell: {
        borderColor: '#000',
    },
});

export default VerifyCode;
