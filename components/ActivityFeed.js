import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity, Button, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react'
import RBSheet from "react-native-raw-bottom-sheet";
import MoreOptions from "../components/MoreOptions"
import Stars from 'react-native-stars';
import { useNavigation } from '@react-navigation/native';

function ActivityFeed(props) {
    const navigation = useNavigation()
    const refRBSheet = useRef();
    const activities = props.activities
    const movies = props.movies

    function moreInfoOnMovie() {
        refRBSheet.current.open()
    }
    return (
        <React.Fragment>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOn
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >
                <MoreOptions sheet={refRBSheet} />
            </RBSheet>
            {activities.map((ac) => (
                <TouchableOpacity style={styles.activity} key={ac.text}>
                    <View style={styles.reviewHeader}>
                        <Image source={ac.picture} style={styles.reviewPicture}></Image>
                        <View style={styles.activityHeaderInfo}>
                            {(ac.text.includes("recently enjoyed watching")) &&
                                <Text style={styles.reviewName}>{ac.name} <Text style={{ fontWeight: "normal" }}>{ac.text} </Text> <Ionicons name="thumbs-up-outline" size={20} color={"#FF3D60"} /><Text style={{ color: "gray", fontWeight: "normal", fontSize: 14 }}> {ac.date}</Text></Text>
                            }
                            {(ac.text.includes("recently disliked watching")) &&
                                <Text style={styles.reviewName}>{ac.name} <Text style={{ fontWeight: "normal" }}>{ac.text} </Text> <Ionicons name="thumbs-down-outline" size={20} color={"#FF3D60"} /><Text style={{ color: "gray", fontWeight: "normal", fontSize: 14 }}> {ac.date}</Text></Text>
                            }
                            {((ac.text.includes("watch later")) || (ac.text.includes("reviewed"))) &&
                                <Text style={styles.reviewName}>{ac.name} <Text style={{ fontWeight: "normal" }}>{ac.text}</Text> <Text style={{ color: "gray", fontWeight: "normal", fontSize: 14 }}>{ac.date}</Text></Text>
                            }
                        </View>
                    </View>

                    {((ac.text.includes("recently enjoyed watching")) || (ac.text.includes("recently disliked watching")) || (ac.text.includes("watch later"))) &&
                        <FlatList
                            data={movies}
                            style={styles.activityMovieGrid}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.activityItemContainer} onPress={() => { navigation.navigate("MovieDisplay") }}>
                                    <Image style={styles.item} source={item.uri}></Image>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id}
                            horizontal={true} />
                    }

                    {(ac.text.includes("reviewed")) &&
                        <TouchableOpacity style={styles.activityReview}>
                            <TouchableOpacity style={styles.reviewItemContainer} onPress={() => { navigation.navigate("MovieDisplay") }}>
                                <Image style={styles.item} source={ac.movie}></Image>
                            </TouchableOpacity>
                            <View style={styles.activityReviewBodyInfo}>
                                <View style={styles.reviewRating}>
                                    <Stars
                                        half={true}
                                        default={ac.rating}
                                        spacing={4}
                                        display={ac.rating}
                                        count={5}
                                        fullStar={<Ionicons name="star"></Ionicons>}
                                        emptyStar={<Ionicons name="star-outline"></Ionicons>}
                                        halfStar={<Ionicons name="star-half-outline"></Ionicons>} />
                                </View>
                                <Text style={styles.activityReviewText} numberOfLines={4}>{ac.movieText}</Text>
                                <View style={styles.activityReviewPostInfo}>
                                    <View style={styles.activityReviewPostIcon}>
                                        <Ionicons name="chatbubble-outline" size={15}></Ionicons>
                                    </View>
                                    <Text style={styles.activityReviewPostText}>{ac.numberOfReviews} Reviews <Text style={{ color: "gray" }}> |</Text></Text>
                                    {(ac.reviewLiked === false) &&
                                        <View style={styles.activityReviewPostIcon}>
                                            <Ionicons name="thumbs-up-outline" size={15}></Ionicons>
                                        </View>
                                    }
                                    {(ac.reviewLiked === true) &&
                                        <View style={styles.activityReviewPostIcon}>
                                            <Ionicons name="thumbs-up" size={15}></Ionicons>
                                        </View>
                                    }
                                    <Text style={styles.activityReviewPostText}>{ac.numberOfLikes} Likes</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }

                    <View style={styles.activityPostInfo}>
                        <View style={styles.reviewPostIcon}>
                            <Ionicons name="chatbubble-outline" size={20}></Ionicons>
                        </View>
                        <Text style={styles.reviewPostText}>{ac.comments} Comments <Text style={{ color: "gray" }}> |</Text></Text>
                        {(ac.liked === false) &&
                            <View style={styles.reviewPostIcon}>
                                <Ionicons name="thumbs-up-outline" size={20}></Ionicons>
                            </View>
                        }
                        {(ac.liked === true) &&
                            <View style={styles.reviewPostIcon}>
                                <Ionicons name="thumbs-up" size={20}></Ionicons>
                            </View>
                        }
                        <Text style={styles.reviewPostText}>{ac.likes} Likes</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    mainView: {
        width: "100%",
        height: "100%",
        backgroundColor: "white"
    },
    userHeader: {
        width: "100%",
        height: "auto",
        marginTop: 60,
        display: "flex",
        flexDirection: "row"
    },
    userPicture: {
        width: 80,
        height: 80,
        left: 20,
    },
    userInfo: {
        display: "flex",
        flexDirection: "column",
        left: 30
    },
    userName: {
        fontWeight: "bold",
        fontSize: 20,
        color: "black",
        marginTop: 5
    },
    userBio: {
        fontSize: 14,
        color: "#777777",
        marginTop: 5
    },
    userData: {
        fontSize: 14,
        color: "black",
        marginTop: 10,
    },
    settingsIcon: {
        position: "absolute",
        right: 20,
        top: 5
    },
    sectionHeader: {
        width: "100%",
        height: 50,
        marginTop: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    buttonHeader: {
        width: "100%",
        height: 50,
        marginTop: 25,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
        zIndex: 1
    },
    title: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        fontSize: 16,
        lineHeight: 50,
        fontWeight: "bold",
        left: 20,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        right: 15,
        fontSize: 12,
        maxWidth: 80,
    },
    subButton: {
        color: "#777777",
        fontSize: 14
    },
    movieGrid: {
        width: "auto",
        maxHeight: 130,
        flexGrow: 1,
        marginLeft: 20,
        height: "auto",
    },
    movieGridBig: {
        width: "auto",
        maxHeight: 140,
        flexGrow: 1,
        marginLeft: 20,
        height: "auto",
    },
    itemContainer: {
        width: 90,
        height: 130,
    },
    activityItemContainer: {
        width: 100,
        height: 135
    },
    item: {
        flex: 1,
        margin: 3,
        backgroundColor: 'lightblue',
        width: null,
        height: null,
        resizeMode: 'stretch',
        borderRadius: 8,
    },
    subPage: {
        width: "100%",
        marginTop: -30
    },
    review: {
        display: "flex",
        flexDirection: 'column',
        paddingTop: 20,
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        paddingBottom: 20,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20
    },
    reviewHeader: {
        display: "flex",
        flexDirection: "row",
        marginLeft: 20
    },
    reviewPicture: {
        width: 50,
        height: 50,
    },
    reviewHeaderInfo: {
        display: "flex",
        flexDirection: "column",
        paddingLeft: 5
    },
    reviewName: {
        fontSize: 16,
        fontWeight: "bold",
        paddingTop: 5
    },
    reviewDate: {
        fontSize: 12,
        color: "#777777",
        paddingTop: 5
    },
    reviewBody: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        paddingRight: 20
    },
    reviewMovieContainer: {
        width: 90,
        height: 130,
        marginTop: 10,
        left: 20
    },
    reviewMovieItem: {
        flex: 1,
        margin: 3,
        backgroundColor: 'lightblue',
        width: null,
        height: null,
        resizeMode: 'stretch',
        borderRadius: 8,
    },
    reviewBodyInfo: {
        display: "flex",
        flexDirection: "column",
        marginLeft: 25,
        marginTop: 20
    },
    reviewMovieTitle: {
        fontSize: 18,
        fontWeight: "bold",
        paddingBottom: 10
    },
    reviewText: {
        fontSize: 14,
        marginBottom: 10
    },
    reviewRating: {
        left: 0,
        alignItems: "flex-start",
        paddingBottom: 10
    },
    reviewPostInfo: {
        display: "flex",
        flexDirection: "row",
        left: 115,
        marginTop: 0,
        alignItems: "center",
        width: "70%",
        height: 30,
        marginBottom: -5
    },
    reviewPostIcon: {
        height: 30,
        width: 30,
        top: 3,
    },
    reviewPostText: {
        marginRight: 10
    },
    activity: {
        display: "flex",
        flexDirection: 'column',
        paddingTop: 20,
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        paddingBottom: 20,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        width: "100%",
        flexWrap: "wrap"
    },
    activityHeaderInfo: {
        display: "flex",
        flexDirection: "column",
        paddingLeft: 5,
        width: "80%",
    },
    activityMovieGrid: {
        alignSelf: "flex-start",
        marginTop: 10,
        marginLeft: 70,
        height: "auto",
    },
    activityPostInfo: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10,
        marginLeft: 70,
        alignItems: "center",
        width: "70%",
    },
    activityReview: {
        marginLeft: 70,
        backgroundColor: "#F4F4F4",
        borderRadius: 8,
        height: "auto",
        display: "flex",
        flexDirection: "row",
        width: "77%"
    },
    activityReviewBodyInfo: {
        display: "flex",
        flexDirection: "column",
        marginLeft: 5,
        marginTop: 15,
    },
    reviewItemContainer: {
        width: 90,
        height: 130,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10
    },
    activityReviewText: {
        fontSize: 14,
        width: "25%",
    },
    activityReviewPostInfo: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
        width: "70%",
        height: 20
    },
    activityReviewPostIcon: {
        height: 20,
        width: 20,
        top: 2,
    },
    activityReviewPostText: {
        marginRight: 10,
        fontSize: 12
    }
});


export default ActivityFeed;