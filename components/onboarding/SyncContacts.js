import { View, Text, StyleSheet, Image, Button } from 'react-native';
import MainButton from '../MainButton'
import MovieThumbnail from '../../assets/movie-thumbnail.png'

function SyncContacts({navigation}) {
    return (
        <View style={styles.mainView}>
            <Text>hello</Text>
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
});

export default SyncContacts;
