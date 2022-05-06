import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Stars from 'react-native-stars';

function AddAReview() {
    const [stars, setStars] = useState(0)
    const [reviewText, onChangeText] = useState("");

    function sendReview() {
        console.log("review sent")
    }

    return (
        <View style={styles.mainView}>
            <Text style={styles.header}>ADD A REVIEW</Text>
            <TextInput style={styles.input}
                placeholder="Write Your Thoughts"
                onChangeText={onChangeText}
                value={reviewText}
                multiline={true}
            />
            <Text style={styles.subHeader}>Your Rating</Text>
            <View style={styles.ratingsFilterStars}>
                <Stars
                    half={true}
                    default={0}
                    update={(val) => { setStars(val) }}
                    spacing={4}
                    count={5}
                    fullStar={<Ionicons name="star" size={40}></Ionicons>}
                    emptyStar={<Ionicons name="star-outline" size={40}></Ionicons>}
                    halfStar={<Ionicons name="star-half-outline" size={40}></Ionicons>} />
            </View>
            <View style={styles.applyButton}>
                <Button onPress={sendReview} title="Send" color="white" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        left: 20
    },
    header: {
        fontSize: 14,
        color: "#777777"
    },
    subHeader: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold"
    },
    applyButton: {
        width: "90%",
        marginTop: 15,
        height: 48,
        backgroundColor: "#FF3D60",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#F2F2F2",
        borderWidth: 1,
    },
    ratingsFilterStars: {
        justifyContent: "flex-start",
        marginTop: 10,
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    input: {
        height: 180,
        marginRight: 40,
        marginTop: 10,
        fontSize: 16,
    }
});


export default AddAReview;
