import { View, Text, StyleSheet, TextInput } from 'react-native';
import MainButton from '../MainButton'

function SignUp({ navigation }) {
    return (
        <View style={styles.mainView}>
            <View style={styles.inputs}>
                <TextInput style={styles.input} placeholder="Email Address"></TextInput>
                <TextInput style={styles.input} placeholder="Password"></TextInput>
                <TextInput style={styles.input} placeholder="Confirm Password"></TextInput>
                <TextInput style={styles.input} placeholder="Username"></TextInput>
            </View>
            <MainButton buttonColor="#FF3D60" textColor="white" text="Sign Up" onPress={() => navigation.navigate("Sync Contacts")}/>
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
    }
});

export default SignUp;
