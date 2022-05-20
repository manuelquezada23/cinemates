import { View, TouchableOpacity, StyleSheet, Image, Text, ScrollView, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import IconFiller from '../assets/icon-filler.png';
import SendIcon from '../assets/send-icon.png'
import Stars from 'react-native-stars';
import RBSheet from "react-native-raw-bottom-sheet";
import React, { useRef, useEffect } from 'react'
import FilterReviews from './FilterReviews';
import AddAReview from './AddAReview.js'

function Reviews({ navigation, route }) {

    useEffect(() => {
        const RBSheet = route.params.sheet;
        RBSheet.current.close();
    })


    const refRBSheet = useRef();
    const refRBSheetTwo = useRef();
    function filterReviewsClick() {
        refRBSheet.current.open()
    }

    function addAReview() {
        refRBSheetTwo.current.open()
    }

    const asset = {
        reviews: [{ name: "Aramide Tinubu", time: "10 min", image: require('../assets/icon-filler.png'), rating: 4, review: "The Martian is a film about human error, the will to survive, and the responsibility that we have as human beings." },
        { name: "Dwight Brown", time: "10 min", image: require('../assets/icon-filler.png'), rating: 4, review: "A half-hour into The Martian any seasoned moviegoer can figure out where the plotline in this feel-good movie has to go. That's a shame and the film's biggest transgression." },
        { name: "Kip Mooney", time: "10 min", image: require('../assets/icon-filler.png'), rating: 4, review: "The best blockbuster of the year arrived later than anticipated." },
        { name: "Jason Bailey", time: "10 min", image: require('../assets/icon-filler.png'), rating: 4, review: "It's just a cracklingly good entertainment, a crowd-pleaser that's compelling and emotional and even a little inspirational." }],
    }

    return (
        <React.Fragment>
            <View style={styles.customHeader}>
                <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }}>
                    <Ionicons name="arrow-back-outline" size={25}></Ionicons>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Reviews</Text>
                <TouchableOpacity style={styles.filterIcon} onPress={() => { filterReviewsClick() }}>
                    <Ionicons name="filter-outline" size={24}></Ionicons>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ backgroundColor: "white" }}>
                {asset.reviews.map((r) => (
                    <View style={styles.container} key={r.review}>
                        <View style={styles.review} key={r.name}>
                            <Image style={styles.reviewImage} source={r.image}></Image>
                            <View style={styles.reviewBody}>
                                <View style={styles.reviewHeader}>
                                    <Text style={styles.reviewName}>{r.name}</Text>
                                    <Text style={styles.reviewTime}>{r.time}</Text>
                                </View>
                                <Text style={styles.reviewText}>{r.review}</Text>
                            </View>
                        </View>
                        <View style={styles.reviewRating}>
                            <Stars
                                half={true}
                                default={r.rating}
                                spacing={4}
                                display={r.rating}
                                count={5}
                                fullStar={<Ionicons name="star"></Ionicons>}
                                emptyStar={<Ionicons name="star-outline"></Ionicons>}
                                halfStar={<Ionicons name="star-half-outline"></Ionicons>} />
                        </View>
                        <Text style={styles.disclaimerText}>Was this review helpful to you?</Text>
                        <View style={styles.disclaimerContainer}>
                            <View style={styles.disclaimerButtons}>
                                <TouchableOpacity style={styles.disclaimerButton}><Text>Yes</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.disclaimerButton}><Text>No</Text></TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.report}><Text style={styles.reportText}>Report Abuse</Text></TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.input} onPress={() => { addAReview() }}>
                    <Text style={{ color: "lightgray" }}>Add a Comment</Text>
                </TouchableOpacity>
                <View>
                    <Image style={styles.sendIcon} source={require('../assets/icon-filler.png')}></Image>
                </View>
            </View>


            <RBSheet
                ref={refRBSheet}
                height={425}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >
                <FilterReviews />
            </RBSheet>

            <RBSheet
                ref={refRBSheetTwo}
                height={425}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >
                <AddAReview />
            </RBSheet>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    mainView: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        flexGrow: 1,
        backgroundColor: "white"
    },
    customHeader: {
        display: "flex",
        flexDirection: "row",
        height: 90,
        backgroundColor: "white",
    },
    headerTitle: {
        position: "absolute",
        bottom: 0,
        left: 40,
        fontWeight: "bold",
        fontSize: 18,
        marginLeft: 20,
    },
    backButton: {
        position: "absolute",
        bottom: 0,
        left: 0,
        marginLeft: 20,
    },
    filterIcon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        marginRight: 20
    },
    searchBar: {
        position: "absolute",
        bottom: 10,
        left: 0,
        backgroundColor: "#F2F2F2",
        marginLeft: 20,
        height: 30,
        width: "90%",
    },
    checkIcon: {
        justifyContent: "center"
    },
    itemContainer: {
        width: "93%",
        height: 55,
        display: "flex",
        flexDirection: "row",
        marginBottom: 10,
        marginLeft: 20
    },
    contactPicture: {
        margin: 3,
        width: 40,
        height: 40,
        resizeMode: 'stretch',
        borderRadius: 8,
        alignSelf: "center",
        marginLeft: 10,
    },
    contactName: {
        fontSize: 16,
        fontWeight: "bold"
    },
    subName: {
        color: "#777777",
        fontSize: 12
    },
    contactInfo: {
        display: "flex",
        flexDirection: "column",
        marginLeft: 10,
        width: "77%",
        justifyContent: "center"
    },
    bottomBar: {
        width: "100%",
        height: 100,
        backgroundColor: "#F2F2F2",
    },
    input: {
        position: "absolute",
        top: 15,
        left: 70,
        height: 45,
        width: "75%",
        borderRadius: 100,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "white",
        borderColor: "#F2F2F2",
        justifyContent: "center"
    },
    sendIcon: {
        width: 40,
        height: 40,
        position: "absolute",
        top: 20,
        left: 20
    },
    container: {
        backgroundColor: "white",
        marginLeft: 20,
        marginRight: 20,
        paddingBottom: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 0.2,
        paddingBottom: 20,
        marginTop: 10
    },
    review: {
        display: "flex",
        flexDirection: "row",
        marginTop: 20,
        width: "100%",
    },
    reviewBody: {
        width: "85%"
    },
    reviewImage: {
        width: 40,
        height: 40,
        left: 0
    },
    reviewHeader: {
        display: "flex",
        flexDirection: "row",
        marginLeft: 5,
        marginBottom: 10,
    },
    reviewName: {
        fontWeight: "bold",
        fontSize: 14
    },
    reviewTime: {
        fontSize: 12,
        color: "#777777",
        marginLeft: 5,
        marginTop: 2
    },
    reviewText: {
        marginLeft: 5,
    },
    reviewRating: {
        paddingBottom: 10,
        paddingTop: 10,
        alignSelf: "flex-start",
        left: 45
    },
    disclaimerText: {
        color: "#777777",
        fontSize: 12,
        left: 45,
        marginTop: 5
    },
    disclaimerButtons: {
        display: "flex",
        flexDirection: "row",
        left: 45,
        marginTop: 10
    },
    disclaimerButton: {
        backgroundColor: "#F2F2F2",
        borderRadius: 100,
        width: 60,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10
    },
    disclaimerContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    report: {
        position: "absolute",
        right: 0,
        top: 20
    },
    reportText: {
        fontSize: 12,
        color: "grey"
    }
});

export default Reviews;
