import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import SendToFriend from '../assets/send_to_friend.png'
import WatchLater from '../assets/watch_later.png'
import AddToRecent from '../assets/add_to_recent.png'

function MoreOptions() {
    function addToRecent() {
        console.log("add to recent")
    }

    function watchLater() {
        console.log("watch later")
    }

    function sendToFriend() {
        console.log("send to friend")
    }

    return (
        <View style={styles.mainView}>
            <TouchableOpacity style={styles.sectionView} onPress={addToRecent}>
                <Image style={styles.icon} source={AddToRecent}></Image>
                <Text style={styles.text}> Add to Recent Watches </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sectionView} onPress={watchLater}>
                <Image style={styles.icon} source={WatchLater}></Image>
                <Text style={styles.text}> Add to Watch Later </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sectionView} onPress={sendToFriend}>
                <Image style={styles.icon} source={SendToFriend}></Image>
                <Text style={styles.text}> Send to Friend </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        display: "flex",
        flexDirection: "column",
        // height: "100%",
        height: "70%",
        // backgroundColor: "red"
    },
    sectionView: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: '#777777',
        borderBottomWidth: 1,
        borderBottomStartRadius: 100
    },
    icon: {
        height: 30,
        width: 30,
        left: 20
    },
    text: {
        left: 30,
        fontSize: 16,
        fontWeight: "bold"
    }
});


export default MoreOptions;
