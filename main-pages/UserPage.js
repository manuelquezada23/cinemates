import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity, Button, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState, useEffect } from 'react'
import RBSheet from "react-native-raw-bottom-sheet";
import MoreOptions from "../components/MoreOptions"
import Stars from 'react-native-stars';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import ReadMore from '@fawazahmed/react-native-read-more';

const currentUser = [
  { name: "Leslie Alexander", picture: require('../assets/icon-filler.png'), bio: "Radio jockey, music lover", followers: "12k", following: "850" },
]

const movies = [
  { id: "1", uri: require('../assets/1.jpg') },
  { id: "2", uri: require('../assets/2.jpg') },
  { id: "3", uri: require('../assets/3.jpg') },
  { id: "4", uri: require('../assets/4.jpg') },
  { id: "5", uri: require('../assets/5.jpg') },
]

const reviews = [
  { name: "Leslie Alexander", picture: require('../assets/icon-filler.png'), date: "10 Mar 2021", movie: require('../assets/1.jpg'), movieTitle: "Dead To Me", rating: 4, text: "The acting in this masterpiece of a show is astronomical. Like I'm WAY too invested in this show it is so good I am so excited for the next one", numberOfReviews: 14, numberOfLikes: 324, liked: false },
  { name: "Leslie Alexander", picture: require('../assets/icon-filler.png'), date: "10 Mar 2021", movie: require('../assets/2.jpg'), movieTitle: "The Good Place", rating: 4, text: "This is one of the best Sitcom shows that I have ever watched. If I didn't had any other stuffs to do filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler  ", numberOfReviews: 14, numberOfLikes: 325, liked: true },
  { name: "Leslie Alexander", picture: require('../assets/icon-filler.png'), date: "10 Mar 2021", movie: require('../assets/3.jpg'), movieTitle: "When We First Met", rating: 4, text: "Picture this you're bored scrolling through Netflix and  you find when we first me you got nothing filler filler filler filler filler filler filler ", numberOfReviews: 14, numberOfLikes: 324, liked: false },
]

const activities = [
  { name: "Leslie Alexander", picture: require('../assets/icon-filler.png'), text: "recently enjoyed watching Mamma Mia and 12 other movies.", date: "5d", comments: 14, likes: 324, liked: false, movie: null },
  { name: "Leslie Alexander", picture: require('../assets/icon-filler.png'), text: "recently disliked watching Disaster Movie.", date: "5d", comments: 14, likes: 324, liked: false, movie: null },
  { name: "Leslie Alexander", picture: require('../assets/icon-filler.png'), text: "reviewed Dead To Me.", date: "5d", comments: 32, likes: 143, liked: true, movie: require('../assets/1.jpg'), rating: 4, movieText: "The acting in this masterpiece of a show is astronomical. Like I’m WAY too invested in this show... Read More", numberOfReviews: 14, numberOfLikes: 324, reviewLiked: false },
  { name: "Leslie Alexander", picture: require('../assets/icon-filler.png'), text: "added Hannah Montana and 3 other movies in her watch later.", date: "5d", comments: 14, likes: 324, liked: false, movie: null }
]

function ActivityPage() {
  const navigation = useNavigation()
  const refRBSheet = useRef();
  function moreInfoOnMovie() {
    refRBSheet.current.open()
  }
  return (
    <View style={{ maxHeight: 350 }}>
      <ScrollView style={styles.subPage}>
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
      </ScrollView>
    </View>
  );

}

function RecentWatches() {
  const navigation = useNavigation()
  const refRBSheet = useRef();
  function moreInfoOnMovie() {
    refRBSheet.current.open()
  }

  return (
    <View style={{ maxHeight: 350 }}>
      <ScrollView style={styles.subPage}>
        <View style={styles.sectionHeader}>
          <Text style={styles.title}><Ionicons name="thumbs-up-outline" size={20} color={"#FF3D60"} />  Movies <Text style={{ fontWeight: "normal", fontSize: 12 }}>(Watched)</Text></Text>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => {
              navigation.navigate("AssetsDisplay", { title: "Movies (Watched)" })
            }}>
              <Text style={{ color: "#FF3D60", fontSize: 16, marginRight: 5 }}>View All</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={movies}
          style={styles.movieGridBig}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.activityItemContainer} onPress={moreInfoOnMovie}>
              <Image style={styles.item} source={item.uri}></Image>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          horizontal={true} />

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
        <View style={styles.sectionHeader}>
          <Text style={styles.title}><Ionicons name="thumbs-up-outline" size={20} color={"#FF3D60"} />  TV Shows <Text style={{ fontWeight: "normal", fontSize: 12 }}>(Watched)</Text></Text>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => {
              navigation.navigate("AssetsDisplay", { title: "TV Shows (Watched)" })
            }}>
              <Text style={{ color: "#FF3D60", fontSize: 16, marginRight: 5 }}>View All</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={movies}
          style={styles.movieGridBig}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.activityItemContainer} onPress={moreInfoOnMovie}>
              <Image style={styles.item} source={item.uri}></Image>

            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          horizontal={true} />

        <View style={styles.sectionHeader}>
          <Text style={styles.title}><Ionicons name="thumbs-down-outline" size={20} color={"#FF3D60"} />  Movies + TV Shows <Text style={{ fontWeight: "normal", fontSize: 12 }}>(Watched)</Text></Text>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => {
              navigation.navigate("AssetsDisplay", { title: "TV Shows (Watched)" })
            }}>
              <Text style={{ color: "#FF3D60", fontSize: 16, marginRight: 5 }}>View All</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={movies}
          style={styles.movieGridBig}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.activityItemContainer} onPress={moreInfoOnMovie}>
              <Image style={styles.item} source={item.uri}></Image>

            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          horizontal={true} />
      </ScrollView>
    </View>
  );
}

function WatchLater() {
  const navigation = useNavigation()
  const refRBSheet = useRef();
  function moreInfoOnMovie() {
    refRBSheet.current.open()
  }

  return (
    <View style={{ maxHeight: 350 }}>
      <ScrollView style={styles.subPage} >
        <View style={styles.sectionHeader}>
          <Text style={styles.title}>Movies</Text>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => {
              navigation.navigate("AssetsDisplay", { title: "Movies" })
            }}>
              <Text style={{ color: "#FF3D60", fontSize: 16, marginRight: 5 }}>View All</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={movies}
          style={styles.movieGridBig}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.activityItemContainer} onPress={moreInfoOnMovie}>
              <Image style={styles.item} source={item.uri}></Image>

            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          horizontal={true} />

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
        <View style={styles.sectionHeader}>
          <Text style={styles.title}>TV Shows</Text>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => {
              navigation.navigate("AssetsDisplay", { title: "TV Shows" })
            }}>
              <Text style={{ color: "#FF3D60", fontSize: 16, marginRight: 5 }}>View All</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={movies}
          style={styles.movieGridBig}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.activityItemContainer} onPress={moreInfoOnMovie}>
              <Image style={styles.item} source={item.uri}></Image>

            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          horizontal={true} />
      </ScrollView>
    </View>
  );
}

function Reviews() {
  const refRBSheet = useRef();

  function moreInfoOnMovie() {
    refRBSheet.current.open()
  }

  return (
    <View style={{ maxHeight: 350 }}>
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

      <ScrollView style={styles.subPage}>
        {reviews.map((review) => (
          <TouchableOpacity style={styles.review} key={review.movieTitle}>

            <View style={styles.reviewHeader}>
              <Image source={review.picture} style={styles.reviewPicture}></Image>
              <View style={styles.reviewHeaderInfo}>
                <Text style={styles.reviewName}>{review.name}</Text>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
            </View>

            <View style={styles.reviewBody}>
              <TouchableOpacity style={styles.reviewMovieContainer} onPress={moreInfoOnMovie}>
                <Image style={styles.reviewMovieItem} source={review.movie}></Image>

              </TouchableOpacity>

              <View style={styles.reviewBodyInfo}>
                <View style={styles.reviewRating}>
                  <Stars
                    half={true}
                    default={review.rating}
                    spacing={4}
                    display={review.rating}
                    count={5}
                    fullStar={<Ionicons name="star"></Ionicons>}
                    emptyStar={<Ionicons name="star-outline"></Ionicons>}
                    halfStar={<Ionicons name="star-half-outline"></Ionicons>} />
                </View>
                <Text style={styles.reviewMovieTitle}>{review.movieTitle}</Text>
                <ReadMore numberOfLines={3} style={styles.reviewText}
                  seeMoreText="Read More"
                  seeMoreStyle={{ color: "black", fontWeight: "bold" }}
                  seeLessText="Read Less"
                  seeLessStyle={{ color: "black", fontWeight: "bold" }}>{review.text}</ReadMore>
              </View>

            </View>
            <View style={styles.reviewPostInfo}>
              <View style={styles.reviewPostIcon}>
                <Ionicons name="chatbubble-outline" size={20}></Ionicons>
              </View>
              <Text style={styles.reviewPostText}>{review.numberOfReviews} Reviews <Text style={{ color: "gray" }}> |</Text></Text>
              {(review.liked === false) &&
                <View style={styles.reviewPostIcon}>
                  <Ionicons name="thumbs-up-outline" size={20}></Ionicons>
                </View>
              }
              {(review.liked === true) &&
                <View style={styles.reviewPostIcon}>
                  <Ionicons name="thumbs-up" size={20}></Ionicons>
                </View>
              }
              <Text style={styles.reviewPostText}>{review.numberOfLikes} Likes</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

function UserPage() {
  const refRBSheet = useRef();
  const navigation = useNavigation()

  const [selection, setSelection] = useState(0);

  useEffect(() => {
    console.log(selection, '- Has changed')
  }, [selection])

  function moreInfoOnMovie() {
    refRBSheet.current.open()
  }

  return (
    <View style={styles.mainView}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.userHeader}>
        <Image source={currentUser[0].picture} style={styles.userPicture}></Image>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{currentUser[0].name}</Text>
          <Text style={styles.userBio}>{currentUser[0].bio}</Text>
          <Text style={styles.userData}>{currentUser[0].followers} Followers <Text style={{ color: "lightgray" }}>|</Text> {currentUser[0].following} Following</Text>
        </View>
        <TouchableOpacity style={styles.settingsIcon}>
          <Ionicons name="settings-outline" size={24}></Ionicons>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.title}>Favorite Movies/TV Shows</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => {
            navigation.navigate("AssetsDisplay", { title: "Favorite Movies/TV Shows" })
          }}>
            <Text style={{ color: "#FF3D60", fontSize: 16, marginRight: 5 }}>View All</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={movies}
        style={styles.movieGrid}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => { navigation.navigate("MovieDisplay") }}>
            <Image style={styles.item} source={item.uri}></Image>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        horizontal={true} />

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

      <View style={styles.buttonHeader}>
        <TouchableOpacity style={[selection === 0 ? { color: "#777777", borderBottomColor: 'black', borderBottomWidth: 2, marginBottom: 20 } : null]} onPress={() => setSelection(0)}>
          <Text style={[styles.subButton, selection === 0 ? { color: "black", fontWeight: "bold" } : null]}>Activity</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[selection === 1 ? { color: "#777777", borderBottomColor: 'black', borderBottomWidth: 2, marginBottom: 20 } : null]} onPress={() => setSelection(1)}>
          <Text style={[styles.subButton, selection === 1 ? { color: "black", fontWeight: "bold" } : null]}>Recent Watches</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[selection === 2 ? { color: "#777777", borderBottomColor: 'black', borderBottomWidth: 2, marginBottom: 20 } : null]} onPress={() => setSelection(2)}>
          <Text style={[styles.subButton, selection === 2 ? { color: "black", fontWeight: "bold" } : null]}>Watch Later</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[selection === 3 ? { color: "#777777", borderBottomColor: 'black', borderBottomWidth: 2, marginBottom: 20 } : null]} onPress={() => setSelection(3)}>
          <Text style={[styles.subButton, selection === 3 ? { color: "black", fontWeight: "bold" } : null]}>Reviews</Text>
        </TouchableOpacity>
      </View>

      {(selection === 0) && <ActivityPage />}
      {(selection === 1) && <RecentWatches />}
      {(selection === 2) && <WatchLater />}
      {(selection === 3) && <Reviews />}
    </View>
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

export default UserPage;
