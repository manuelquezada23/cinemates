import { View, Image, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import MainButton from '../MainButton'
import WelcomeFiller from '../../assets/welcome-filler.png'

function WelcomePage({ navigation }) {
    return (
        <View style={styles.mainView}>
            <Image style={styles.welcomeFiller} source={WelcomeFiller}></Image>
            <View style={styles.bottomElements}>
                <View style={{ position: "absolute", bottom: 0, marginBottom: 50 }}>
                    <View style={styles.textView}>
                        <Text style={styles.welcomeMessage}>Welcome to Cinemates</Text>
                        <Text style={styles.welcomeSubMessage}>
                            Save time searching for movies and television shows through our community-based recommendation system.
                        </Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", width: Dimensions.get('window').width }}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: "#FF3D60", borderColor: "#FF3D60", marginTop: 15, marginBottom: 15 }]} onPress={() => navigation.navigate("RegisterFirstName")}>
                            <Text style={[styles.buttonText, { color: "white" }]}>Get Started</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { backgroundColor: "white", borderColor: "#FF3D60" }]} onPress={() => navigation.navigate("SignIn")}>
                            <Text style={[styles.buttonText, { color: "#FF3D60" }]}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        width: "100%",
        height: "100%",
    },
    welcomeFiller: {
        width: "100%",
        height: "55%",
    },
    bottomElements: {
        height: "45%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
    },
    textView: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 0,
        width: "100%",
    },
    welcomeMessage: {
        marginLeft: 20,
        maxWidth: "60%",
        alignSelf: "flex-start",
        color: "black",
        width: "100%",
        fontWeight: "bold",
        fontSize: 32,
        left: 0,
        width: "100%",
        bottom: 0,
        marginBottom: 15
    },
    welcomeSubMessage: {
        marginLeft: 20,
        color: "#777777",
        fontSize: 15,
        marginBottom: 15,
        maxWidth: "90%",
    },
    button: {
        borderRadius: 100,
        width: "90%",
        marginLeft: 20,
        marginRight: 20,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold"
    }
});

export default WelcomePage;
