import { View, Button, StyleSheet, Alert} from 'react-native';

function MovieCard() {
    return (
        <View style={styles.mainButtonView}>
            <Button
                onPress={() => Alert.alert('Button pressed')}
                title="Text goes here"
                color="white"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    movieCardView: {
        width: "90%", 
        margin: 10, 
        height: 48,
        backgroundColor: "#FF3D60",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
  });

export default MovieCard;
