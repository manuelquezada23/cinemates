import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react'
import RBSheet from "react-native-raw-bottom-sheet";
import Stars from 'react-native-stars';
import { useNavigation } from '@react-navigation/native';
import ReadMore from '@fawazahmed/react-native-read-more';

function ActivityFeed(props) {
    const [height, setHeight] = useState(375)
    const [expandedSheet, setExpandedSheet] = useState(false)

    const navigation = useNavigation()
    const refRBSheet = useRef();
    const activities = props.activities
    const movies = props.movies

    function expandBottomSheet() {
        const windowHeight = Dimensions.get('window').height;
        if (height === 375) {
            setHeight(windowHeight - 50)
            setExpandedSheet(true)
        } else {
            setHeight(375)
            setExpandedSheet(false)
        }
    }

    function openAssetInfo() {
        refRBSheet.current.open()
    }

    function AssetBottomSheet() {

        const asset = {
            id: "1",
            uri: require('../assets/1.jpg'),
            title: "Joker",
            info: ["12+", "2015", "2 hr 22 min", "Sci-Fi & Fantasy"],
            castAndCrews: [{ firstName: "Todd", lastName: "Phillips", role: "Director", image: require('../assets/icon-filler.png') },
            { firstName: "Joaquin", lastName: "Phoenix", role: "Actor", image: require('../assets/icon-filler.png') },
            { firstName: "Robert", lastName: "de Niro", role: "Actor", image: require('../assets/icon-filler.png') },
            { firstName: "Zazie", lastName: "Beetz", role: "Actress", image: require('../assets/icon-filler.png') }],
            about: "Forever alone in a crowd, failed comedian Arthur Fleck seeks connection as he walks the streets of Gotham City. Arthur wears two masks -- the one he paints for his day job as a clown, and the guise he projects in a futile attempt to feel like he's part of the world around him. Isolated, bullied and disregarded by society, Fleck begins a slow descent into madness as he transforms into the criminal mastermind known as the Joker.",
            reviews: [{ name: "Aramide Tinubu", time: "10 min", image: require('../assets/icon-filler.png'), rating: 4, review: "The Martian is a film about human error, the will to survive, and the responsibility that we have as human beings." },
            { name: "Dwight Brown", time: "10 min", image: require('../assets/icon-filler.png'), rating: 4, review: "A half-hour into The Martian any seasoned moviegoer can figure out where the plotline in this feel-good movie has to go. That's a shame and the film's biggest transgression." }],
        }

        const [watchLater, setWL] = useState(false)
        const [alreadyWatch, setAW] = useState(false)

        function setWatchLater() {
            const newStatus = !watchLater;
            setWL(newStatus)
        }

        function setAlreadyWatched() {
            const newStatus = !alreadyWatch;
            setAW(newStatus)
        }

        return (
            <React.Fragment>
                <ScrollView style={bottomSheetStyles.mainView} showsVerticalScrollIndicator={false}>
                    <TouchableOpacity activeOpacity={1}>
                        <View style={bottomSheetStyles.movieHeader}>
                            <View style={bottomSheetStyles.itemContainer}>
                                <Image style={bottomSheetStyles.item} source={asset.uri}></Image>
                            </View>
                            <View style={bottomSheetStyles.movieInfo}>
                                <Text style={bottomSheetStyles.movieTitle}>{asset.title}</Text>
                                <View style={bottomSheetStyles.infos}>
                                    <View style={bottomSheetStyles.infoSpace}>
                                        {asset.info.map((item) => (
                                            <View style={bottomSheetStyles.infoContainer} key={item}>
                                                <Text style={bottomSheetStyles.infoText}>{item}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={bottomSheetStyles.metaDataView}>
                            <TouchableOpacity style={bottomSheetStyles.metaDataBox} onPress={() => { navigation.navigate("Reviews", { sheet: refRBSheet }) }}>
                                <Ionicons style={bottomSheetStyles.metaDataBoxIcon} name="chatbubble-outline" size={35} />
                                <Text style={bottomSheetStyles.metaDataBoxText}>32 reviews</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={bottomSheetStyles.metaDataBox} onPress={() => { navigation.navigate("SendToFriend", { sheet: refRBSheet }) }}>
                                <Ionicons style={bottomSheetStyles.metaDataBoxIcon} name="paper-plane-outline" size={35} />
                                <Text style={bottomSheetStyles.metaDataBoxText}>Send to Friends</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={bottomSheetStyles.metaDataBox} onPress={() => { setWatchLater() }}>
                                <Ionicons style={bottomSheetStyles.metaDataBoxIcon} name={watchLater ? "star" : "star-outline"} size={35} />
                                <Text style={bottomSheetStyles.metaDataBoxText}>Watch Later</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={bottomSheetStyles.metaDataBoxLast} onPress={() => { setAlreadyWatched() }}>
                                <Ionicons style={bottomSheetStyles.metaDataBoxIcon} name={alreadyWatch ? "checkmark-circle" : "checkmark-circle-outline"} size={35} />
                                <Text style={bottomSheetStyles.metaDataBoxText}>Already Watched</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={bottomSheetStyles.moreInfoView} onPress={() => { expandBottomSheet() }}>
                            <Text style={bottomSheetStyles.moreInfoText}>{expandedSheet ? "Less Info" : "More Info"}</Text>
                            <Ionicons style={bottomSheetStyles.moreInfoIcon} name={expandedSheet ? "chevron-up-outline" : "chevron-down-outline"} size={20} color={"#FF3D60"} />
                        </TouchableOpacity>
                        <View style={bottomSheetStyles.container}>
                            <Text style={bottomSheetStyles.subTitle}>Cast & Crews</Text>
                            <View style={bottomSheetStyles.castAndCrewsView}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <TouchableOpacity activeOpacity={1} style={{ display: "flex", flexDirection: "row" }}>
                                        {asset.castAndCrews.map((item) => (
                                            <View style={bottomSheetStyles.castAndCrewInfo} key={item.firstName}>
                                                <Image style={bottomSheetStyles.castAndCrewImage} source={item.image}></Image>
                                                <Text style={bottomSheetStyles.castAndCrewName}>{item.firstName}</Text>
                                                <Text style={bottomSheetStyles.castAndCrewName}>{item.lastName}</Text>
                                                <Text style={bottomSheetStyles.castAndCrewRole}>{item.role}</Text>
                                            </View>
                                        ))}
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                        </View>
                        <View style={bottomSheetStyles.container}>
                            <Text style={bottomSheetStyles.subTitle}>About</Text>
                            <ReadMore numberOfLines={4} style={bottomSheetStyles.movieAbout}
                                seeMoreText="Read More"
                                seeMoreStyle={{ color: "black", fontWeight: "bold" }}
                                seeLessText="Read Less"
                                seeLessStyle={{ color: "black", fontWeight: "bold" }}>{asset.about} </ReadMore>
                        </View>
                        <View>
                            <Text style={bottomSheetStyles.subTitle}>Reviews</Text>
                            {asset.reviews.map((r) => (
                                <View style={bottomSheetStyles.container} key={r.name}>
                                    <View style={bottomSheetStyles.review}>
                                        <Image style={bottomSheetStyles.reviewImage} source={r.image}></Image>
                                        <View style={bottomSheetStyles.reviewBody}>
                                            <View style={bottomSheetStyles.reviewHeader}>
                                                <Text style={bottomSheetStyles.reviewName}>{r.name}</Text>
                                                <Text style={bottomSheetStyles.reviewTime}>{r.time}</Text>
                                            </View>
                                            <Text style={bottomSheetStyles.reviewText}>{r.review}</Text>
                                        </View>
                                    </View>
                                    <View style={bottomSheetStyles.reviewRating}>
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
                                    <Text style={bottomSheetStyles.disclaimerText}>Was this review helpful to you?</Text>
                                    <View style={bottomSheetStyles.disclaimerContainer}>
                                        <View style={bottomSheetStyles.disclaimerButtons}>
                                            <TouchableOpacity style={bottomSheetStyles.disclaimerButton}><Text>Yes</Text></TouchableOpacity>
                                            <TouchableOpacity style={bottomSheetStyles.disclaimerButton}><Text>No</Text></TouchableOpacity>
                                        </View>
                                        <TouchableOpacity style={bottomSheetStyles.report}><Text style={bottomSheetStyles.reportText}>Report Abuse</Text></TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                            <TouchableOpacity onPress={() => { navigation.navigate("Reviews") }}>
                                <Text style={bottomSheetStyles.subTitleBottom} >View All Reviews</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    container: {
                        height: height
                    }
                }}
            >
                <AssetBottomSheet />
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
                                <TouchableOpacity style={styles.activityItemContainer} onPress={() => { openAssetInfo() }}>
                                    <Image style={styles.item} source={item.uri}></Image>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id}
                            horizontal={true} />
                    }

                    {(ac.text.includes("reviewed")) &&
                        <TouchableOpacity style={styles.activityReview}>
                            <TouchableOpacity style={styles.reviewItemContainer} onPress={() => { openAssetInfo() }}>
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

const bottomSheetStyles = StyleSheet.create({
    mainView: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        marginLeft: 20,
        marginRight: 20,
    },
    movieHeader: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10,
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
        maxWidth: "180%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    infoContainer: {
        borderRadius: 100,
        backgroundColor: "#F2F2F2",
        height: 30,
        width: "auto",
        textAlign: "center",
        justifyContent: "center",
        marginBottom: 10,
        marginRight: 10,
        alignSelf: "flex-start"
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
    },
    metaDataView: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: 100,
        marginTop: 25
    },
    metaDataBox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "25%",
        borderRightColor: "lightgrey",
        borderRightWidth: 1,
    },
    metaDataBoxLast: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "25%",
    },
    metaDataBoxIcon: {
        position: "absolute",
        top: 10,
    },
    metaDataBoxText: {
        position: "absolute",
        top: 55,
        width: "70%",
        textAlign: "center"
    },
    moreInfoView: {
        display: "flex",
        marginTop: 30,
        flexDirection: "row",
        marginBottom: 10,
        marginLeft: 5
    },
    moreInfoText: {
        color: "#FF3D60",
        fontWeight: "bold",
        fontSize: 16,
        marginRight: 10
    }
});


export default ActivityFeed;