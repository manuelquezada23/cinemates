import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import IconFiller from '../assets/icon-filler.png'
import ActivityFeed from '../components/ActivityFeed';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";

const storiesData = [
  { name: "Annette Black", request: "Guys, any recently good fam movies?", color: "#0E766C", recommended: false },
  { name: "Rimmi Black", request: "I want to see best comedy movies, can you please suggest me?", color: "#147CF3", recommended: false }
]

const sentByFriendsData = [
  { name: "Bessie", text: "Best thriller & suspense movies till this date.", uri: require('../assets/1.jpg') },
  { name: "Savannah", text: "Lorem ipsum dolor sit amet, consectetur adipiscing for the...", uri: require('../assets/2.jpg') },
  { name: "Courtney", text: "Aliquam commodo nec tortor a semper for motion", uri: require('../assets/3.jpg') }
]

const movies = [
  { id: "1", uri: require('../assets/1.jpg') },
  { id: "2", uri: require('../assets/2.jpg') },
  { id: "3", uri: require('../assets/3.jpg') },
  { id: "4", uri: require('../assets/4.jpg') },
  { id: "5", uri: require('../assets/5.jpg') },
]

const activities = [
  { name: "Leslie Alexander", picture: require('../assets/icon-filler.png'), text: "recently enjoyed watching Mamma Mia and 12 other movies.", date: "5d", comments: 14, likes: 324, liked: false, movie: null },
  { name: "Leslie Alexander", picture: require('../assets/icon-filler.png'), text: "recently disliked watching Disaster Movie.", date: "5d", comments: 14, likes: 324, liked: false, movie: null },
  { name: "Leslie Alexander", picture: require('../assets/icon-filler.png'), text: "reviewed Dead To Me.", date: "5d", comments: 32, likes: 143, liked: true, movie: require('../assets/1.jpg'), rating: 4, movieText: "The acting in this masterpiece of a show is astronomical. Like I’m WAY too invested in this show... Read More", numberOfReviews: 14, numberOfLikes: 324, reviewLiked: false },
  { name: "Leslie Alexander", picture: require('../assets/icon-filler.png'), text: "added Hannah Montana and 3 other movies in her watch later.", date: "5d", comments: 14, likes: 324, liked: false, movie: null }
]

function HomePage({ navigation, route }) {
  const [stories, setStories] = useState(storiesData)
  const isFocused = useIsFocused();

  let name;
  let request;
  let color;

  useEffect(() => {
    if (isFocused) {
      if (typeof (route.params) !== 'undefined') {
        name = route.params.name
        request = route.params.request
        color = route.params.color

        let newStories = stories.slice()
        const index = newStories.findIndex((obj => obj.name === name && obj.request === request && obj.color === color))
        newStories[index].recommended = true
        newStories.push(newStories.splice(index, 1)[0]);
        setStories(newStories)
      }
    }
  }, [isFocused])

  const [trailers, setTrailers] = useState(false)
  const [home, setHome] = useState(true)
  const [matching, setMatching] = useState(false)

  function changeTab(tab) {
    if (tab === "trailers") {
      setTrailers(true)
      setHome(false)
      setMatching(false)
    } else if (tab === "home") {
      setTrailers(false)
      setHome(true)
      setMatching(false)
    } else {
      setTrailers(false)
      setHome(false)
      setMatching(true)
    }
  }

  return (
    <View style={{ backgroundColor: "white", height: "100%", width: "100%" }}>
      <View style={styles.topHeader}>
        <Text style={styles.topHeaderText}>CINEMATES</Text>
        <TouchableOpacity style={styles.topHeaderLeftIcon}>
          <Ionicons name="play-outline" size={25} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.topHeaderRightIcon}>
          <Ionicons name="paper-plane-outline" size={25} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.storiesScrollView}>
        <View style={styles.stories}>
          <TouchableOpacity style={styles.addStory} onPress={() => { navigation.navigate("AskForRecommendation") }}>
            <View style={styles.addStoryTop}>
              <Image style={styles.addStoryTopImage} source={require('../assets/profile-image-filler.png')} />
            </View>
            <View style={styles.addStoryBottom}>
              <Text style={styles.addStoryBottomText}>Ask for a recommendation</Text>
            </View>
            <TouchableOpacity style={styles.addStoryButton} onPress={() => { navigation.navigate("AskForRecommendation") }}>
              <Ionicons style={styles.addStoryButtonIcon} name="add-circle" size={30} color="#FF3D60" />
            </TouchableOpacity>
          </TouchableOpacity>
          {stories.map((item) => {
            if (item.recommended) {
              return (
                <TouchableOpacity style={[styles.story, { borderColor: "#797A7C", backgroundColor: "white" }]} key={item.name} onPress={() => { navigation.navigate('MovieRequest', { name: item.name, request: item.request, color: item.color }) }}>
                  <View style={[styles.storyTextView, { backgroundColor: "#797A7C" }]}>
                    <Text style={styles.storyText} numberOfLines={3}>{item.request}</Text>
                  </View>
                  <View style={[styles.storyProfileViewFiller, { backgroundColor: "#797A7C" }]}></View>
                  <View style={styles.storyProfileView}>
                    <Image style={styles.storyImage} source={IconFiller}></Image>
                    <Text style={styles.storyName}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )
            } else {
              return (
                <TouchableOpacity style={[styles.story, { borderColor: item.color, backgroundColor: "white" }]} key={item.name} onPress={() => { navigation.navigate('MovieRequest', { name: item.name, request: item.request, color: item.color }) }}>
                  <View style={[styles.storyTextView, { backgroundColor: item.color }]}>
                    <Text style={styles.storyText} numberOfLines={3}>{item.request}</Text>
                  </View>
                  <View style={[styles.storyProfileViewFiller, { backgroundColor: item.color }]}></View>
                  <View style={styles.storyProfileView}>
                    <Image style={styles.storyImage} source={IconFiller}></Image>
                    <Text style={styles.storyName}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )
            }
          }

          )}
        </View>
      </ScrollView>

      <ScrollView maxHeight={"70%"} showsVerticalScrollIndicator={false}>
        <View style={styles.sentByFriends}>
          <View style={styles.sentByFriendsHeader}>
            <Text style={styles.sentByFriendsTitle}>SENT BY FRIENDS</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.sentByFriendsScrollView}>
            {sentByFriendsData.map((item) => (
              <TouchableOpacity style={styles.sentByFriendsContainer} key={item.name}>
                <Image style={styles.sentByFriendsImage} source={item.uri}></Image>
                <Text style={styles.sentByFriendsText}>{item.text}</Text>
                <View style={{ display: "flex", flexDirection: "row", marginTop: 5 }}>
                  <Image style={styles.sentByFriendsProfilePicture} source={IconFiller}></Image>
                  <Text style={styles.sentByFriendsName}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <ActivityFeed activities={activities} movies={movies} />
      </ScrollView>

      {/* These are the tabs trailers-home-matching that are not done yet in the Figma but the setup is done here. */}

      {/* <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.header}>
          <View style={styles.tabs}>
            <TouchableOpacity onPress={() => { changeTab("trailers") }}>
              <Text style={trailers ? styles.tabsTextSelected : styles.tabsText}>Trailers</Text>
            </TouchableOpacity>
            <Text style={{ color: "white", opacity: 0.5, marginRight: 5, marginLeft: 5 }}>|</Text>
            <TouchableOpacity onPress={() => { changeTab("home") }}>
              <Text style={home ? styles.tabsTextSelected : styles.tabsText}>Home</Text>
            </TouchableOpacity>
            <Text style={{ color: "white", opacity: 0.5, marginRight: 5, marginLeft: 5 }}>|</Text>
            <TouchableOpacity onPress={() => { changeTab("matching") }}>
              <Text style={matching ? styles.tabsTextSelected : styles.tabsText}>Matching</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton}>
              <Ionicons name="paper-plane-outline" size={25} color={"white"}></Ionicons>
            </TouchableOpacity>
          </View>
        </View>

        {matching &&
          <View style={styles.matchingView}>
            <Image style={styles.matchingViewImage} source={MatchingViewImage}></Image>
            <Text style={styles.matchingHeader}>Coming Soon...</Text>
            <Text style={styles.matchingText}>A group matching feature that finds the perfect movie or show for you to watch with your friend or friends</Text>
            <TouchableOpacity style={styles.notifyMeButton}>
              <Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>Notify Me</Text>
            </TouchableOpacity>
          </View>
        }

      </SafeAreaView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    width: "100%",
    height: 80,
    alignItems: "center"
  },
  topHeaderText: {
    fontWeight: "bold",
    position: "absolute",
    bottom: 0,
    fontSize: 16
  },
  topHeaderLeftIcon: {
    position: "absolute",
    left: 20,
    bottom: 0
  },
  topHeaderRightIcon: {
    position: "absolute",
    right: 20,
    bottom: 0
  },
  stories: {
    width: "100%",
    height: 150,
    alignItems: "center",
    marginLeft: 20,
    // backgroundColor: "blue",
    display: "flex",
    flexDirection: "row"
  },
  addStory: {
    borderColor: "#FF3D60",
    borderWidth: 1,
    borderRadius: 12,
    height: 110,
    width: 100,
    marginRight: 15,
    display: "flex",
    flexDirection: "column"
  },
  addStoryTop: {
    height: "50%",
    width: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  addStoryTopImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11
  },
  addStoryBottom: {
    height: "50%",
    width: "100%",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    textAlign: "center",
    alignItems: "center"
  },
  addStoryBottomText: {
    fontWeight: "bold",
    color: "#FF3D60",
    fontSize: 11,
    textAlign: "center",
    position: "absolute",
    bottom: 10
  },
  story: {
    borderWidth: 1,
    borderRadius: 12,
    height: 110,
    width: 160,
    marginRight: 15,
  },
  storyTextView: {
    maxHeight: "60%",
    flex: 1,
    justifyContent: "center",
    borderTopRightRadius: 11,
    borderTopLeftRadius: 11,
    borderBottomRightRadius: 11
  },
  storyText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 14,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 12,
  },
  storyImage: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    marginRight: 10,
    marginLeft: 10
  },
  storyName: {

  },
  storyProfileViewFiller: {
    position: "absolute",
    width: "100%",
    height: "40%",
    bottom: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  storyProfileView: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    height: "40%",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 12,
    alignItems: "center"
  },
  addStoryButton: {
    position: "absolute",
    alignSelf: "center",
    top: 38,
    backgroundColor: "white",
    borderRadius: 20,
  },
  addStoryButtonIcon: {
    marginLeft: 2,
  },
  storiesScrollView: {
    width: "100%",
    maxHeight: 150
  },
  sentByFriends: {
    height: 410,
    width: "100%",
    backgroundColor: "#F2F2F2",
  },
  sentByFriendsHeader: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10
  },
  sentByFriendsTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 20,
    marginTop: 10
  },
  viewAllButton: {
    position: "absolute",
    top: 12,
    right: 20
  },
  viewAllText: {
    color: "#FF3D60",
    fontWeight: "bold",
    fontSize: 16
  },
  sentByFriendsScrollView: {
    marginTop: 20,
    marginLeft: 20,
  },
  sentByFriendsContainer: {
    height: "95%",
    width: 145,
    marginRight: 15,
    borderRadius: 12,
    backgroundColor: "white",
  },
  sentByFriendsImage: {
    height: "65%",
    width: "100%",
    resizeMode: "cover",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  sentByFriendsText: {
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 13,
    lineHeight: 17
  },
  sentByFriendsProfilePicture: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginLeft: 5,
    marginTop: 5
  },
  sentByFriendsName: {
    lineHeight: 30,
    marginLeft: 5,
    fontSize: 13,
    marginTop: 5
  },









  header: {
    height: 30,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tabs: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tabsText: {
    fontSize: 16,
    color: "white",
    marginRight: 5,
    marginLeft: 5
  },
  tabsTextSelected: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginRight: 5,
    marginLeft: 5
  },
  sendButton: {
    position: "absolute",
    right: 0,
    marginRight: 20
  },
  safeAreaView: {
    backgroundColor: "black",
    height: "100%",
  },
  matchingView: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
  },
  matchingViewImage: {
    height: "35%",
    resizeMode: "contain"
  },
  matchingHeader: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    marginTop: 35
  },
  matchingText: {
    color: "white",
    fontSize: 14,
    marginTop: 15,
    width: "85%",
    textAlign: "center"
  },
  notifyMeButton: {
    marginTop: 20,
    backgroundColor: "#FF3D60",
    borderRadius: 100,
    color: "white",
    width: "35%",
    height: 35,
    justifyContent: 'center',
    alignItems: "center"
  }
})

export default HomePage;
