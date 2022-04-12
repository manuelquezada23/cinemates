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
                        find recommendations based on over 100 million ratings in our database.</Text>
                </View>
                <MainButton buttonColor="#FF3D60" textColor="white" text="Create an Account" onPress={() => navigation.navigate("Sign Up Your Account")} />
                <MainButton buttonColor="white" textColor="#FF3D60" text="Sign In" onPress={() => navigation.navigate("Sign In Your Account")} />
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
        maxWidth: "50%",
        alignSelf: "flex-start",
        color: "black",
        width: "100%",
        fontWeight: "bold",
        // fontFamily: "Circular Std",
        fontSize: 32,
        left: 0,
        width: "100%",
        bottom: 0
    },
    welcomeSubMessage: {
        margin: 16,
        color: "#777777",
        // fontFamily: "Circular Std",
        fontSize: 15,
        marginTop: 0,
    }
});

export default WelcomePage;
