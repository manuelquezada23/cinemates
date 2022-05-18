import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import MainButton from '../components/MainButton'
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from "react-native";
import MatchingViewImage from '../assets/matching-view-image.png'

const stories = [
  { name: "Annette Black", text: "Guys, any good fam movies?" },
  { name: "Rimmi Black", text: "I want to see best comedy movies, can you please suggest me?" }
]

function HomePage() {
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

      <ScrollView horizontal={true} style={styles.storiesScrollView}>
        <View style={styles.stories}>
          <View style={styles.addStory}>
            <View style={styles.addStoryTop}></View>
            <View style={styles.addStoryBottom}></View>
            <TouchableOpacity style={styles.addStoryButton}>
              <Ionicons name="add-circle" size={30} color="#FF3D60"  />
            </TouchableOpacity>
          </View>
          {stories.map((item) => (
            <View style={styles.story} key={item.name}>

            </View>
          ))}
        </View>
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
    backgroundColor: "blue",
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
    // backgroundColor: "green",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  addStoryBottom: {
    height: "50%",
    width: "100%",
    // backgroundColor: "yellow",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12
  },
  story: {
    borderColor: "#FF3D60",
    borderWidth: 1,
    borderRadius: 12,
    height: 110,
    width: 160,
    marginRight: 15
  },
  addStoryButton: {
    position: "absolute",
    alignSelf: "center",
    top: 38,
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
