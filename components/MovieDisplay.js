import { View, TouchableOpacity, StyleSheet, Image, Text, FlatList, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import RBSheet from "react-native-raw-bottom-sheet";
import MoreOptions from "../components/MoreOptions"
import React, { useRef, useState, useEffect } from 'react'
import ReadMore from '@fawazahmed/react-native-read-more';
import Stars from 'react-native-stars';

function MovieDisplay({ buttonColor, textColor, text, onPress, width }) {

    const asset = {
        id: "1",
        uri: require('../assets/1.jpg'),
        title: "Joker",
        info: ["12+", "2 hr 22 min", "2015", "Sci-Fi & Fantasy"],
        castAndCrews: [{ firstName: "Todd", lastName: "Phillips", role: "Director", image: require('../assets/icon-filler.png') },
        { firstName: "Joaquin", lastName: "Phoenix", role: "Actor", image: require('../assets/icon-filler.png') },
        { firstName: "Robert", lastName: "de Niro", role: "Actor", image: require('../assets/icon-filler.png') },
        { firstName: "Zazie", lastName: "Beetz", role: "Actress", image: require('../assets/icon-filler.png') }],
        about: "Forever alone in a crowd, failed comedian Arthur Fleck seeks connection as he walks the streets of Gotham City. Arthur wears two masks -- the one he paints for his day job as a clown, and the guise he projects in a futile attempt to feel like he's part of the world around him. Isolated, bullied and disregarded by society, Fleck begins a slow descent into madness as he transforms into the criminal mastermind known as the Joker.",
        reviews: [{ name: "Aramide Tinubu", time: "10 min", image: require('../assets/icon-filler.png'), rating: 4, review: "The Martian is a film about human error, the will to survive, and the responsibility that we have as human beings." },
        { name: "Dwight Brown", time: "10 min", image: require('../assets/icon-filler.png'), rating: 4, review: "A half-hour into The Martian any seasoned moviegoer can figure out where the plotline in this feel-good movie has to go. That's a shame and the film's biggest transgression." }],

    }

    const navigation = useNavigation()
    const refRBSheet = useRef();

    function moreInfoOnMovie() {
        refRBSheet.current.open()
    }

    return (
        <React.Fragment>
            <View style={styles.customHeader}>
                <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }}>
                    <Ionicons name="arrow-back-outline" size={25}></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity style={styles.moreInfoButton} onPress={() => { moreInfoOnMovie() }}>
                    <Ionicons name="ellipsis-vertical" size={25}></Ionicons>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.mainView} showsVerticalScrollIndicator={false}>
                <RBSheet
                    ref={refRBSheet}
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
                    <MoreOptions />
                </RBSheet>
                <View style={styles.movieHeader}>
                    <View style={styles.itemContainer}>
                        <Image style={styles.item} source={asset.uri}></Image>
                    </View>
                    <View style={styles.movieInfo}>
                        <Text style={styles.movieTitle}>{asset.title}</Text>
                        <View style={styles.infos}>
                            <FlatList
                                data={asset.info}
                                scrollEnabled={false}
                                columnWrapperStyle={styles.infoSpace}
                                renderItem={({ item }) => (
                                    <View style={styles.infoContainer}>
                                        <Text style={styles.infoText}>{item}</Text>
                                    </View>
                                )}
                                keyExtractor={item => item}
                                numColumns={3} />
                        </View>
                    </View>
                </View>
                <View style={styles.container}>
                    <Text style={styles.subTitle}>Cast & Crews</Text>
                    <View style={styles.castAndCrewsView}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {asset.castAndCrews.map((item) => (
                                <View style={styles.castAndCrewInfo} key={item.firstName}>
                                    <Image style={styles.castAndCrewImage} source={item.image}></Image>
                                    <Text style={styles.castAndCrewName}>{item.firstName}</Text>
                                    <Text style={styles.castAndCrewName}>{item.lastName}</Text>
                                    <Text style={styles.castAndCrewRole}>{item.role}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.container}>
                    <Text style={styles.subTitle}>About</Text>
                    <ReadMore numberOfLines={4} style={styles.movieAbout}
                        seeMoreText="Read More"
                        seeMoreStyle={{ color: "black", fontWeight: "bold" }}
                        seeLessText="Read Less"
                        seeLessStyle={{ color: "black", fontWeight: "bold" }}>{asset.about} </ReadMore>
                </View>
                <View>
                    <Text style={styles.subTitle}>Reviews</Text>
                    {asset.reviews.map((r) => (
                        <View style={styles.container}>
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
                    <Text style={styles.subTitleBottom}>View All Reviews</Text>
                </View>
            </ScrollView>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    mainView: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        marginLeft: 20,
        marginRight: 20,
    },
    customHeader: {
        display: "flex",
        flexDirection: "row",
        height: 90,
        marginLeft: 20,
        marginRight: 20
    },
    backButton: {
        position: "absolute",
        bottom: 0,
        left: 0
    },
    moreInfoButton: {
        position: "absolute",
        bottom: 0,
        right: 0
    },
    movieHeader: {
        display: "flex",
        flexDirection: "row",
        marginTop: 20,
        height: "auto"
    },
    itemContainer: {
        width: 90,
        height: 130,
    },
    item: {
        flex: 1,
        backgroundColor: 'white',
        width: null,
        height: null,
        resizeMode: 'stretch',
        borderRadius: 8,
    },
    movieInfo: {
        marginLeft: 20
    },
    movieTitle: {
        fontSize: 20,
        fontWeight: "bold"
    },
    infos: {
        marginTop: 10,
        flexDirection: "column",
    },
    infoSpace: {
        marginRight: "auto",
        flex: 1,
        justifyContent: "space-between"
    },
    infoContainer: {
        borderRadius: 100,
        backgroundColor: "lightgrey",
        height: 30,
        textAlign: "center",
        justifyContent: "center",
        marginBottom: 10,
        marginRight: 10,
    },
    infoText: {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 14,
        color: "black"
    },
    subTitle: {
        fontWeight: "bold",
        marginTop: 20,
        fontSize: 16
    },
    subTitleBottom: {
        fontWeight: "bold",
        marginTop: 20,
        fontSize: 16,
        paddingBottom: 50,
        color: "#FF3D60"
    },
    castAndCrewsView: {
        marginTop: 10,
        display: "flex",
        flexDirection: "row"
    },
    castAndCrewInfo: {
        display: "flex",
        flexDirection: "column",
        width: 80,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 10
    },
    castAndCrewImage: {
        height: 60,
        width: 60,
        resizeMode: 'contain',
        marginTop: 10,
        marginBottom: 5
    },
    castAndCrewName: {
        fontSize: 14,
        fontWeight: "bold",
    },
    castAndCrewRole: {
        fontSize: 12,
        color: "#777777",
        marginTop: 5
    },
    container: {
        borderBottomColor: 'black',
        borderBottomWidth: 0.2,
        paddingBottom: 20
    },
    movieAbout: {
        fontSize: 14,
        marginTop: 15,
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
        backgroundColor: "lightgrey",
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

export default MovieDisplay;
