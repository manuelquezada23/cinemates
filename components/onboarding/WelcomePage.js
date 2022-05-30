import { View, Image, StyleSheet, Text } from 'react-native';
import MainButton from '../MainButton'
import WelcomeFiller from '../../assets/welcome-filler.png'

function WelcomePage({ navigation }) {
    return (
        <View style={styles.mainView}>
            <Image style={styles.welcomeFiller} source={WelcomeFiller}></Image>
            <View style={styles.bottomElements}>
                <View style={styles.textView}>
                    <Text style={styles.welcomeMessage}>Welcome to Cinemates</Text>
                    <Text style={styles.welcomeSubMessage}>Discover the movies you love and
                        find recommendations based on over 100 million ratings in our database.
                    </Text>
                </View>
                <View style={{ marginLeft: 15, marginBottom: 15 }}>
                    <MainButton buttonColor="#FF3D60" textColor="white" text="Get Started" onPress={() => navigation.navigate("RegisterFirstName")} />
                </View>
                <View style={{ marginLeft: 15 }}>
                    <MainButton buttonColor="white" textColor="#FF3D60" text="Sign In" onPress={() => navigation.navigate("SignIn")} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    welcomeFiller: {
        width: "100%",
        height: "55%",
        position: "absolute",
        top: 0
    },
    bottomElements: {
        position: "absolute",
        bottom: 50
    },
    mainView: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    textView: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 0,
        width: "100%",
    },
    welcomeMessage: {
        margin: 16,
        maxWidth: "60%",
        alignSelf: "flex-start",
        color: "black",
        width: "100%",
        fontWeight: "bold",
        fontSize: 32,
        left: 0,
        width: "100%",
        bottom: 0
    },
    welcomeSubMessage: {
        margin: 16,
        color: "#777777",
        fontSize: 15,
        marginTop: 0,
    }
});

export default WelcomePage;
