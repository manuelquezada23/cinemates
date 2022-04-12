import { View, Text, StyleSheet, Image, Button } from 'react-native';
import MainButton from '../MainButton'
import MovieThumbnail from '../../assets/movie-thumbnail.png'

function InterestGuide({ navigation }) {
    return (
        <View style={styles.mainView}>
            <Text style={styles.title}>Select Your Interest</Text>
            <Image style={styles.mainPicture} source={MovieThumbnail}></Image>
            <View style={styles.button}>
                <Button title="Let's Start" color="white" onPress={() => navigation.navigate("Select Your Interest")}></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        width: "100%",
        height: "80%",
        flexDirection: "column",
        alignItems: "center"
    },
    title: {
        color: "black",
        width: "100%",
        marginTop: 70,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16
    },
    mainPicture: {
        marginTop: 20,
        height: "90%",
        width: "90%",
        borderRadius: 24
    },
    button: {
        width: "40%",
        marginTop: 20,
        height: 48,
        backgroundColor: "#FF3D60",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#F2F2F2",
        borderWidth: 1,
    }
});

export default InterestGuide;
